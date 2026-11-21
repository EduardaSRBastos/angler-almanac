let currentEquipSubtab =
  sessionStorage.getItem("almanac-equip-subtab") || "amostras";
let currentKnotCategory = sessionStorage.getItem("almanac-knot-cat") || "todos";
let currentKnotDifficulty =
  sessionStorage.getItem("almanac-knot-diff") || "todos";
let mobileKnotFiltersOpen =
  sessionStorage.getItem("almanac-knot-filters-open") === "1";
let tooltipHideTimer = null;

function ensureEquipMobileStyles() {
  if (document.getElementById("equip-mobile-filter-styles")) return;
  const style = document.createElement("style");
  style.id = "equip-mobile-filter-styles";
  style.textContent = `
    .knot-mobile-bar {
      display: none;
    }
    .knot-filters-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
    .knot-filter-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      margin-bottom: 0;
    }
    .knot-filter-label {
      font-size: 0.82rem;
      opacity: 0.8;
      margin-right: 4px;
    }
    @media (max-width: 768px) {
      .equip-filters-box {
        background: var(--card, rgba(255, 255, 255, 0.04));
        border: 1px solid var(--border, rgba(128, 128, 128, 0.25));
        border-radius: 10px;
        padding: 8px 10px;
        background: var(--paper);
        margin-bottom: 12px !important;
      }
      .knot-mobile-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        width: 100%;
      }
      .knot-mobile-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        border: 1px solid var(--border, rgba(128, 128, 128, 0.35));
        color: inherit;
        border-radius: 8px;
        padding: 6px 10px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
      }
      .knot-mobile-summary {
        font-size: 0.78rem;
        opacity: 0.78;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .equip-filters-box.is-collapsed .knot-filters-grid {
        display: none;
      }
      .equip-filters-box:not(.is-collapsed) .knot-filters-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--border, rgba(128, 128, 128, 0.2));
        align-items: start;
      }
      .knot-filter-group {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        min-width: 0;
      }
      .knot-filter-label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        opacity: 0.72;
        margin-right: 0;
        margin-bottom: 2px;
      }
      .knot-filter-group .distrito-btn {
        width: 100%;
        text-align: left;
        padding: 5px 8px;
        font-size: 0.78rem;
        margin: 0 !important;
      }
      .knot-clear-row {
        grid-column: 1 / -1;
        display: flex;
        justify-content: flex-end;
      }
    }
  `;
  document.head.appendChild(style);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildEquipRefMatchers() {
  const entries = [];
  if (typeof EQUIP_DATA === "undefined") return entries;

  ["amostras", "nos"].forEach((subtab) => {
    const list = EQUIP_DATA[subtab];
    if (!Array.isArray(list)) return;

    list.forEach((item) => {
      const terms = new Set();

      if (Array.isArray(item.matches)) {
        item.matches.forEach((m) => {
          if (m && m.trim()) terms.add(m.trim());
        });
      }

      if (item.name && typeof item.name === "object") {
        Object.values(item.name).forEach((n) => {
          if (!n || typeof n !== "string") return;
          const clean = n.trim();
          if (clean) terms.add(clean);
          const noParens = clean.replace(/\s*\([^)]*\)/g, "").trim();
          if (noParens) terms.add(noParens);
          const withoutPrefix = noParens.replace(/^(Nó|No|Knot)\s+/i, "").trim();
          if (withoutPrefix && withoutPrefix.length >= 4) {
            terms.add(withoutPrefix);
          }
        });
      }

      terms.forEach((term) => {
        entries.push({
          term,
          subtab,
          id: item.id,
        });
      });
    });
  });

  // Sort longest match first so "Nó Uni Duplo" matches before "Uni"
  entries.sort((a, b) => b.term.length - a.term.length);
  return entries;
}

function findEquipItem(subtab, itemId) {
  if (typeof EQUIP_DATA === "undefined" || !Array.isArray(EQUIP_DATA[subtab])) {
    return null;
  }
  return EQUIP_DATA[subtab].find((entry) => entry.id === itemId) || null;
}

function formatEquipWithLinks(text, allowedSubtabs = ["amostras", "nos"]) {
  if (!text || text === "—") return text;

  const matchers = buildEquipRefMatchers().filter((m) =>
    allowedSubtabs.includes(m.subtab),
  );
  if (matchers.length === 0) return text;

  const termToMeta = new Map();
  matchers.forEach((m) => {
    const key = m.term.toLowerCase();
    if (!termToMeta.has(key)) {
      termToMeta.set(key, { subtab: m.subtab, id: m.id });
    }
  });

  const alternation = Array.from(
    new Set(matchers.map((m) => escapeRegExp(m.term))),
  ).join("|");
  if (!alternation) return text;

  // Match whole terms outside of existing HTML tags
  const pattern = new RegExp(
    `(<[^>]+>)|(?<![\\p{L}\\p{N}_])(${alternation})(?![\\p{L}\\p{N}_])`,
    "giu",
  );

  return text.replace(pattern, (full, tag, matchedTerm) => {
    if (tag) return tag;
    const meta = termToMeta.get(matchedTerm.toLowerCase());
    if (!meta) return full;
    return `<button type="button" class="amostra-ref equip-ref" data-equip-subtab="${meta.subtab}" data-equip-id="${meta.id}" data-amostra-id="${meta.id}">${matchedTerm}</button>`;
  });
}

function formatAmostraWithLinks(text) {
  return formatEquipWithLinks(text, ["amostras"]);
}

function getOrCreateTooltip() {
  let tip = document.getElementById("amostra-tooltip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "amostra-tooltip";
    tip.className = "amostra-tooltip";
    tip.setAttribute("role", "tooltip");
    tip.hidden = true;
    document.body.appendChild(tip);

    tip.addEventListener("mouseenter", () => {
      clearTimeout(tooltipHideTimer);
    });
    tip.addEventListener("mouseleave", () => {
      hideAmostraTooltip();
    });
  }
  return tip;
}

function showAmostraTooltip(triggerEl, itemId, subtab = "amostras") {
  let resolvedSubtab = subtab || "amostras";
  let item = findEquipItem(resolvedSubtab, itemId);
  if (!item) {
    resolvedSubtab = resolvedSubtab === "amostras" ? "nos" : "amostras";
    item = findEquipItem(resolvedSubtab, itemId);
  }
  if (!item) return;

  clearTimeout(tooltipHideTimer);
  const tip = getOrCreateTooltip();
  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";

  const shortText =
    (item.short && item.short[lang]) ||
    (item.desc && item.desc[lang]) ||
    "";
  const hintText =
    lang === "pt"
      ? resolvedSubtab === "nos"
        ? "Clica para ver este nó →"
        : "Clica para ver esta amostra →"
      : resolvedSubtab === "nos"
        ? "Click to view this knot →"
        : "Click to view this lure →";

  tip.innerHTML = `
    <div class="amostra-tooltip-svg">${item.svg || ""}</div>
    <div class="amostra-tooltip-body">
      <strong>${item.name[lang]}</strong>
      <p>${shortText}</p>
      <span class="amostra-tooltip-hint">${hintText}</span>
    </div>
  `;
  tip.hidden = false;

  const rect = triggerEl.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();
  let top = rect.top + window.scrollY - tipRect.height - 10;
  if (top < window.scrollY + 8) {
    top = rect.bottom + window.scrollY + 10;
  }
  let left = rect.left + window.scrollX + rect.width / 2 - tipRect.width / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - tipRect.width - 12));

  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;
}

function hideAmostraTooltip(delay = 140) {
  clearTimeout(tooltipHideTimer);
  tooltipHideTimer = setTimeout(() => {
    const tip = document.getElementById("amostra-tooltip");
    if (tip) tip.hidden = true;
  }, delay);
}

function renderEquipamento() {
  const panel = document.getElementById("panel-equipamento");
  if (!panel) return;

  ensureEquipMobileStyles();

  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const labels = {
    pt: {
      amostras: "Amostras",
      nos: "Nós de Pesca",
      montagens: "Montagens",
      uso: "Quando / como usar",
      usoNo: "Para que serve / quando usar",
      usoMontagem: "Porquê usar esta montagem",
      decathlon: "Ver na Decathlon ↗",
      tutorialImg: "Imagem Tutorial ↗",
      tutorialVid: "Vídeo Tutorial ↗",
      catLabel: "Finalidade:",
      diffLabel: "Dificuldade:",
      clearFilters: "✕ Limpar filtros",
      filterToggle: "Filtrar nós",
      allKnots: "Todos os nós",
      emptyNos: "Nenhum nó encontrado com esta combinação de filtros.",
      cats: {
        todos: "Todos",
        anzol: "Anzol / Snap",
        laco: "Laço na Ponta",
        uniao: "Unir Linhas",
        montagens: "Montagens / Bóia",
      },
      diffs: {
        todos: "Todos os níveis",
        facil: "Fácil (Iniciante)",
        medio: "Médio",
        avancado: "Avançado",
      },
    },
    en: {
      amostras: "Lures",
      nos: "Fishing Knots",
      montagens: "Rigs",
      uso: "When / how to use",
      usoNo: "Purpose & when to use",
      usoMontagem: "Why use this rig",
      decathlon: "View on Decathlon ↗",
      tutorialImg: "Image Tutorial ↗",
      tutorialVid: "Video Tutorial ↗",
      catLabel: "Purpose:",
      diffLabel: "Difficulty:",
      clearFilters: "✕ Clear filters",
      filterToggle: "Filter knots",
      allKnots: "All knots",
      emptyNos: "No knots match the selected filters.",
      cats: {
        todos: "All",
        anzol: "Hook / Snap",
        laco: "End Loop",
        uniao: "Line-to-Line",
        montagens: "Rigs / Float",
      },
      diffs: {
        todos: "All levels",
        facil: "Easy (Beginner)",
        medio: "Intermediate",
        avancado: "Advanced",
      },
    },
  }[lang];

  let items = EQUIP_DATA[currentEquipSubtab] || [];

  const activeFilterCount =
    (currentKnotCategory !== "todos" ? 1 : 0) +
    (currentKnotDifficulty !== "todos" ? 1 : 0);
  const hasActiveKnotFilter = activeFilterCount > 0;

  if (currentEquipSubtab === "nos") {
    items = items.filter((item) => {
      const catOk =
        currentKnotCategory === "todos" ||
        item.category === currentKnotCategory;
      const diffOk =
        currentKnotDifficulty === "todos" ||
        item.difficulty === currentKnotDifficulty;
      return catOk && diffOk;
    });
  }

  const summaryParts = [];
  if (currentKnotCategory !== "todos") {
    summaryParts.push(labels.cats[currentKnotCategory] || currentKnotCategory);
  }
  if (currentKnotDifficulty !== "todos") {
    summaryParts.push(
      labels.diffs[currentKnotDifficulty] || currentKnotDifficulty,
    );
  }
  const mobileSummary =
    summaryParts.length > 0 ? summaryParts.join(" · ") : labels.allKnots;

  const knotsFiltersHtml =
    currentEquipSubtab === "nos"
      ? `
    <div class="equip-filters-box ${mobileKnotFiltersOpen ? "" : "is-collapsed"}" style="margin-bottom:14px;">
      <div class="knot-mobile-bar">
        <button type="button" id="btn-toggle-knot-filters" class="knot-mobile-toggle" aria-expanded="${mobileKnotFiltersOpen ? "true" : "false"}">
          <span>${mobileKnotFiltersOpen ? "▲" : "▼"} ${labels.filterToggle}${activeFilterCount ? ` (${activeFilterCount})` : ""}</span>
        </button>
        <span class="knot-mobile-summary">${mobileSummary}</span>
      </div>
      <div class="knot-filters-grid">
        <div class="distritos knot-filter-group">
          <span class="knot-filter-label">${labels.catLabel}</span>
          ${Object.entries(labels.cats)
            .map(
              ([key, text]) =>
                `<button type="button" class="distrito-btn equip-cat-btn ${currentKnotCategory === key ? "active" : ""}" data-cat="${key}">${text}</button>`,
            )
            .join("")}
        </div>
        <div class="distritos knot-filter-group">
          <span class="knot-filter-label">${labels.diffLabel}</span>
          ${Object.entries(labels.diffs)
            .map(
              ([key, text]) =>
                `<button type="button" class="distrito-btn equip-diff-btn ${currentKnotDifficulty === key ? "active" : ""}" data-diff="${key}">${text}</button>`,
            )
            .join("")}
        </div>
        ${
          hasActiveKnotFilter
            ? `<div class="knot-clear-row"><button type="button" id="btn-reset-knots" class="distrito-btn" style="border-color:var(--channel);color:var(--channel);font-weight:600;">${labels.clearFilters}</button></div>`
            : ""
        }
      </div>
    </div>`
      : "";

  const diffClasses = {
    facil: "diff-facil",
    medio: "diff-medio",
    avancado: "diff-avancado",
  };

  const usoLabel =
    currentEquipSubtab === "nos"
      ? labels.usoNo
      : currentEquipSubtab === "montagens"
        ? labels.usoMontagem
        : labels.uso;

  const hasMontagens =
    Array.isArray(EQUIP_DATA.montagens) && EQUIP_DATA.montagens.length > 0;

  panel.innerHTML = `
    <div class="distritos equip-subtabs" role="tablist">
      <button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "amostras" ? "active" : ""}" data-subtab="amostras">${labels.amostras}</button>
      <button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "nos" ? "active" : ""}" data-subtab="nos">${labels.nos}</button>
      ${
        hasMontagens
          ? `<button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "montagens" ? "active" : ""}" data-subtab="montagens">${labels.montagens}</button>`
          : ""
      }
    </div>
    ${knotsFiltersHtml}
    ${
      items.length === 0
        ? `<div class="vazio" style="padding:18px;">
            <p style="margin:0 0 10px 0;opacity:0.8;">${labels.emptyNos}</p>
            <button type="button" id="btn-reset-knots-empty" class="btn-limpar">${labels.clearFilters}</button>
          </div>`
        : `<div class="equip-grid">
      ${items
        .map((item) => {
          const badgesHtml =
            currentEquipSubtab === "nos"
              ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  ${item.category ? `<span class="equip-tag">${labels.cats[item.category] || item.category}</span>` : ""}
                  ${
                    item.difficulty
                      ? `<span class="equip-tag ${diffClasses[item.difficulty] || ""}">${labels.diffs[item.difficulty] || item.difficulty}</span>`
                      : ""
                  }
                </div>`
              : `<span class="equip-tag">${item.tag[lang]}</span>`;

          const links = [];
          if (item.decathlonUrl) {
            links.push(
              `<a href="${item.decathlonUrl}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${labels.decathlon}</a>`,
            );
          }
          if (item.tutorialUrl) {
            links.push(
              `<a href="${item.tutorialUrl}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${labels.tutorialImg}</a>`,
            );
          }
          if (item.videoUrl) {
            links.push(
              `<a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${labels.tutorialVid}</a>`,
            );
          }

          const descHtml =
            currentEquipSubtab === "montagens"
              ? formatEquipWithLinks(item.desc[lang], ["amostras", "nos"])
              : item.desc[lang];
          const useHtml =
            currentEquipSubtab === "montagens"
              ? formatEquipWithLinks(item.use[lang], ["amostras", "nos"])
              : item.use[lang];

          return `
        <article class="equip-card" id="equip-${item.id}">
          <div class="equip-card-visual">${item.svg}</div>
          <div class="equip-card-content">
            <div class="equip-card-header" style="flex-direction:column;align-items:flex-start;gap:4px;">
              <h3>${item.name[lang]}</h3>
              ${badgesHtml}
            </div>
            <p class="equip-desc">${descHtml}</p>
            <p class="equip-use"><strong>${usoLabel}:</strong> ${useHtml}</p>
            ${
              links.length
                ? `<p class="equip-link-wrap" style="display:flex;flex-wrap:wrap;gap:8px;">${links.join("")}</p>`
                : ""
            }
          </div>
        </article>`;
        })
        .join("")}
    </div>`
    }
  `;

  const toggleKnotFiltersBtn = panel.querySelector("#btn-toggle-knot-filters");
  if (toggleKnotFiltersBtn) {
    toggleKnotFiltersBtn.addEventListener("click", () => {
      mobileKnotFiltersOpen = !mobileKnotFiltersOpen;
      sessionStorage.setItem(
        "almanac-knot-filters-open",
        mobileKnotFiltersOpen ? "1" : "0",
      );
      renderEquipamento();
      if (typeof syncStickyHeights === "function") {
        syncStickyHeights();
      }
    });
  }

  panel.querySelectorAll(".equip-subtab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentEquipSubtab = btn.dataset.subtab;
      sessionStorage.setItem("almanac-equip-subtab", currentEquipSubtab);
      renderEquipamento();
    });
  });

  panel.querySelectorAll(".equip-cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentKnotCategory = btn.dataset.cat;
      sessionStorage.setItem("almanac-knot-cat", currentKnotCategory);
      renderEquipamento();
    });
  });

  panel.querySelectorAll(".equip-diff-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentKnotDifficulty = btn.dataset.diff;
      sessionStorage.setItem("almanac-knot-diff", currentKnotDifficulty);
      renderEquipamento();
    });
  });

  const resetKnotsFn = () => {
    currentKnotCategory = "todos";
    currentKnotDifficulty = "todos";
    sessionStorage.setItem("almanac-knot-cat", "todos");
    sessionStorage.setItem("almanac-knot-diff", "todos");
    renderEquipamento();
  };

  const resetBtn = panel.querySelector("#btn-reset-knots");
  if (resetBtn) resetBtn.addEventListener("click", resetKnotsFn);

  const resetEmptyBtn = panel.querySelector("#btn-reset-knots-empty");
  if (resetEmptyBtn) resetEmptyBtn.addEventListener("click", resetKnotsFn);
}

function jumpToEquipItem(subtab, itemId) {
  hideAmostraTooltip(0);

  if (typeof skipNextScrollToTop !== "undefined") {
    skipNextScrollToTop = true;
  }

  const equipTab = document.getElementById("tab-equipamento");
  if (equipTab) {
    equipTab.click();
  }

  let targetSubtab = subtab || "amostras";
  if (!findEquipItem(targetSubtab, itemId)) {
    const altSubtab = targetSubtab === "amostras" ? "nos" : "amostras";
    if (findEquipItem(altSubtab, itemId)) {
      targetSubtab = altSubtab;
    }
  }

  // If jumping to a knot that is currently hidden by knot filters, clear filters so the card is visible
  if (targetSubtab === "nos") {
    const targetItem = findEquipItem("nos", itemId);
    if (targetItem) {
      const catHidden =
        currentKnotCategory !== "todos" &&
        targetItem.category !== currentKnotCategory;
      const diffHidden =
        currentKnotDifficulty !== "todos" &&
        targetItem.difficulty !== currentKnotDifficulty;
      if (catHidden || diffHidden) {
        currentKnotCategory = "todos";
        currentKnotDifficulty = "todos";
        sessionStorage.setItem("almanac-knot-cat", "todos");
        sessionStorage.setItem("almanac-knot-diff", "todos");
      }
    }
  }

  currentEquipSubtab = targetSubtab;
  sessionStorage.setItem("almanac-equip-subtab", currentEquipSubtab);
  renderEquipamento();

  if (typeof syncStickyHeights === "function") {
    syncStickyHeights();
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof syncStickyHeights === "function") {
        syncStickyHeights();
      }
      const card = document.getElementById(`equip-${itemId}`);
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      card.classList.remove("destaque");
      void card.offsetWidth;
      card.classList.add("destaque");
      setTimeout(() => card.classList.remove("destaque"), 2200);
    });
  });
}

function jumpToAmostra(amostraId) {
  jumpToEquipItem("amostras", amostraId);
}

document.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    const itemId = btn.dataset.equipId || btn.dataset.amostraId;
    const subtab = btn.dataset.equipSubtab || "amostras";
    showAmostraTooltip(btn, itemId, subtab);
  }
});

document.addEventListener("mouseout", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    hideAmostraTooltip();
  }
});

document.addEventListener("focusin", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    const itemId = btn.dataset.equipId || btn.dataset.amostraId;
    const subtab = btn.dataset.equipSubtab || "amostras";
    showAmostraTooltip(btn, itemId, subtab);
  }
});

document.addEventListener("focusout", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    hideAmostraTooltip(0);
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    e.preventDefault();
    const itemId = btn.dataset.equipId || btn.dataset.amostraId;
    const subtab = btn.dataset.equipSubtab || "amostras";
    jumpToEquipItem(subtab, itemId);
  }
});
