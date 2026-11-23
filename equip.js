let currentEquipSubtab =
  sessionStorage.getItem("almanac-equip-subtab") || "amostras";
let currentKnotCategory = sessionStorage.getItem("almanac-knot-cat") || "todos";
let currentKnotDifficulty =
  sessionStorage.getItem("almanac-knot-diff") || "todos";
let mobileKnotFiltersOpen =
  sessionStorage.getItem("almanac-knot-filters-open") === "1";
let currentChecklistTech =
  localStorage.getItem("pesca_checklist_tech_v1") || "todas";
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
    .cana-title-link {
      color: inherit;
      text-decoration: underline;
      text-decoration-color: var(--accent, #0ea5e9);
      text-underline-offset: 3px;
      transition: color 0.15s ease;
    }
    .cana-title-link:hover {
      color: var(--accent, #0ea5e9);
    }
    .cana-specs-list {
      list-style: none;
      margin: 8px 0 10px 0;
      padding: 8px 10px;
      background: var(--bg-soft, rgba(14, 165, 233, 0.08));
      border-left: 3px solid var(--accent, #0ea5e9);
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.88rem;
    }
    .cana-specs-list li {
      line-height: 1.4;
    }
    .cana-use-list {
      list-style: disc;
      margin: 6px 0 10px 18px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 0.9rem;
    }
    .cana-use-list li {
      line-height: 1.45;
    }
    .cana-inline-link {
      color: var(--accent, #0ea5e9);
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .cana-inline-link:hover {
      opacity: 0.82;
    }
    .checklist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 0.85rem;
      padding: 0.9rem 1rem;
      background: var(--card, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--border, rgba(128, 128, 128, 0.25));
      border-radius: 10px;
    }
    .checklist-header h2 {
      margin: 0 0 0.25rem 0;
      font-size: 1.15rem;
    }
    .checklist-header p {
      margin: 0;
      font-size: 0.88rem;
      opacity: 0.8;
    }
    .checklist-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .checklist-counter {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--accent, #0ea5e9);
    }
    #checklist-reset-btn {
      background: transparent;
      border: 1px solid var(--border, rgba(128, 128, 128, 0.35));
      color: inherit;
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.82rem;
      cursor: pointer;
    }
    #checklist-reset-btn:hover {
      border-color: var(--accent, #0ea5e9);
      color: var(--accent, #0ea5e9);
    }
    .checklist-tech-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin-bottom: 1rem;
    }
    .checklist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
    }
    .checklist-card {
      background: var(--card, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--border, rgba(128, 128, 128, 0.25));
      padding: 1rem;
      border-radius: 10px;
    }
    .checklist-card h3 {
      margin: 0 0 0.65rem 0;
      font-size: 0.98rem;
      color: var(--accent, #0ea5e9);
    }
    .checklist-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }
    .checklist-item {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      cursor: pointer;
      line-height: 1.38;
      font-size: 0.9rem;
    }
    .checklist-item input[type="checkbox"] {
      margin-top: 0.2rem;
      width: 1.1rem;
      height: 1.1rem;
      flex-shrink: 0;
      accent-color: var(--accent, #0ea5e9);
      cursor: pointer;
    }
    .checklist-item.checked span {
      text-decoration: line-through;
      opacity: 0.55;
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

function stripHtmlTags(str) {
  if (!str) return "";
  return String(str)
    .replace(/<a\b[^>]*>?/gi, "")
    .replace(/<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function formatCanaTitle(rawTitle, fallbackUrl) {
  if (!rawTitle) return "";
  const str = String(rawTitle).trim();
  const hrefMatch = str.match(/href\s*=\s*["']([^"']+)["']/i);
  const url = (hrefMatch && hrefMatch[1]) || fallbackUrl || "";
  const cleanText = stripHtmlTags(str);

  if (url) {
    const labelWithArrow = cleanText.endsWith("↗")
      ? cleanText
      : `${cleanText} ↗`;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="cana-title-link">${labelWithArrow}</a>`;
  }
  return cleanText;
}

function buildEquipRefEntries(lang) {
  const entries = [];
  const addTerms = (subtab, item) => {
    const rawTerms = new Set();
    if (Array.isArray(item.matches)) {
      item.matches.forEach((m) => m && rawTerms.add(m.trim()));
    }
    const nameObj = item.name || item.nome || {};
    [nameObj[lang], nameObj.pt, nameObj.en].forEach((n) => {
      if (!n) return;
      const clean = stripHtmlTags(n)
        .replace(/\s*\([^)]*\)/g, "")
        .trim();
      if (clean) rawTerms.add(clean);
      if (subtab === "nos") {
        const withoutPrefix = clean
          .replace(/^Nó\s+(de\s+|do\s+|da\s+)?/i, "")
          .replace(/\s+Knot$/i, "")
          .trim();
        if (
          withoutPrefix &&
          withoutPrefix.length >= 4 &&
          !/^correr$/i.test(withoutPrefix)
        ) {
          rawTerms.add(withoutPrefix);
        }
      }
    });

    rawTerms.forEach((term) => {
      if (term.length >= 3) {
        entries.push({ subtab, id: item.id, term });
      }
    });
  };

  if (typeof EQUIP_DATA !== "undefined") {
    (EQUIP_DATA.amostras || []).forEach((item) => addTerms("amostras", item));
    (EQUIP_DATA.nos || []).forEach((item) => addTerms("nos", item));
    (EQUIP_DATA.montagens || []).forEach((item) => addTerms("montagens", item));
  }

  entries.sort((a, b) => b.term.length - a.term.length);
  return entries;
}

function formatAmostraWithLinks(text) {
  if (!text || text === "—") return text;
  let result = text;
  EQUIP_DATA.amostras.forEach((item) => {
    const pattern = new RegExp(`\\b(${item.matches.join("|")})\\b`, "gi");
    result = result.replace(
      pattern,
      `<button type="button" class="amostra-ref" data-equip-subtab="amostras" data-amostra-id="${item.id}">$1</button>`,
    );
  });
  return result;
}

function formatMontagemWithLinks(text, lang) {
  if (!text || text === "—") return text;
  const entries = buildEquipRefEntries(lang);
  if (!entries.length) return text;

  const parts = text.split(/(<[^>]+>)/g);
  return parts
    .map((part) => {
      if (part.startsWith("<")) return part;
      let seg = part;
      const placeholders = [];

      entries.forEach(({ subtab, id, term }) => {
        const isKnot = subtab === "nos";
        const startsWithNo = /^n[óo]\b/i.test(term);
        const prefixGuard =
          isKnot && !startsWithNo
            ? "(?<!\\b(?:b[óo]ia|chumbada|montagem|sistema|linha|anzol|fio)\\s+(?:de\\s+|do\\s+|da\\s+)?)"
            : "";

        const pattern = new RegExp(
          `${prefixGuard}(?<![\\wÀ-ÿ])(${escapeRegExp(term)})(?![\\wÀ-ÿ])`,
          "gi",
        );

        seg = seg.replace(pattern, (match) => {
          const idx = placeholders.length;
          placeholders.push(
            `<button type="button" class="amostra-ref equip-ref" data-equip-subtab="${subtab}" data-amostra-id="${id}">${match}</button>`,
          );
          return `@@EQUIPREF_${idx}@@`;
        });
      });

      return seg.replace(
        /@@EQUIPREF_(\d+)@@/g,
        (_, idx) => placeholders[Number(idx)],
      );
    })
    .join("");
}

function formatStructuredEquipLines(value, lang, linkify = true) {
  if (!value) return "";
  if (Array.isArray(value)) {
    const lis = value
      .map((line) => {
        const formatted = linkify ? formatMontagemWithLinks(line, lang) : line;
        return `<li>${formatted}</li>`;
      })
      .join("");
    return `<ul class="cana-use-list">${lis}</ul>`;
  }
  const text = String(value);
  if (text.includes(" · ")) {
    const parts = text
      .split(/\s*·\s*/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length > 1) {
      const lis = parts
        .map((line) => {
          const withBoldLabel = line.replace(
            /^([^:]{2,32}:)/,
            "<strong>$1</strong>",
          );
          const formatted = linkify
            ? formatMontagemWithLinks(withBoldLabel, lang)
            : withBoldLabel;
          return `<li>${formatted}</li>`;
        })
        .join("");
      return `<ul class="cana-use-list">${lis}</ul>`;
    }
  }
  const formatted = linkify ? formatMontagemWithLinks(text, lang) : text;
  return `<p class="equip-use">${formatted}</p>`;
}

function formatSpecsBlock(specsValue) {
  if (!specsValue) return "";
  const lines = Array.isArray(specsValue)
    ? specsValue
    : String(specsValue)
        .split(/\s*·\s*/)
        .map((s) => s.trim())
        .filter(Boolean);
  if (!lines.length) return "";
  return `<ul class="cana-specs-list">${lines
    .map((line) => {
      const htmlLine = line.replace(/^([^:]{2,30}:)/, "<strong>$1</strong>");
      return `<li>${htmlLine}</li>`;
    })
    .join("")}</ul>`;
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

function showAmostraTooltip(triggerEl, amostraId, subtab = "amostras") {
  const list =
    (typeof EQUIP_DATA !== "undefined" && EQUIP_DATA[subtab]) ||
    (typeof EQUIP_DATA !== "undefined" && EQUIP_DATA.amostras) ||
    [];
  const item = list.find((a) => a.id === amostraId);
  if (!item) return;

  clearTimeout(tooltipHideTimer);
  const tip = getOrCreateTooltip();
  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const titleObj = item.name || item.nome || {};
  const cleanTitle = stripHtmlTags(titleObj[lang] || titleObj.pt || "");
  const summaryText =
    (item.short && item.short[lang]) || (item.desc && item.desc[lang]) || "";
  const hintText =
    subtab === "nos"
      ? lang === "pt"
        ? "Clica para ver este nó →"
        : "Click to view this knot →"
      : subtab === "montagens"
        ? lang === "pt"
          ? "Clica para ver esta montagem →"
          : "Click to view this rig →"
        : lang === "pt"
          ? "Clica para ver no guia →"
          : "Click to view in guide →";

  tip.innerHTML = `
    <div class="amostra-tooltip-svg">${item.svg}</div>
    <div class="amostra-tooltip-body">
      <strong>${cleanTitle}</strong>
      <p>${summaryText}</p>
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

function isChecklistItemVisible(item, tech) {
  if (!tech || tech === "todas") return true;
  const tags = Array.isArray(item.tags) ? item.tags : ["todas"];
  return tags.includes("todas") || tags.includes(tech);
}

function getChecklistCounts(tech = currentChecklistTech) {
  const data = typeof EQUIP_DATA !== "undefined" && EQUIP_DATA.checklist;
  if (!data || !Array.isArray(data.grupos)) return { marcados: 0, total: 0 };
  const saved = JSON.parse(localStorage.getItem("pesca_checklist_v1") || "{}");

  let total = 0;
  let marcados = 0;

  data.grupos.forEach((grupo) => {
    grupo.itens.forEach((item) => {
      if (isChecklistItemVisible(item, tech)) {
        total += 1;
        if (saved[item.id]) marcados += 1;
      }
    });
  });

  return { marcados, total };
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
      canas: "Canas",
      checklist: "Checklist",
      uso: "Quando / como usar",
      usoNo: "Para que serve / quando usar",
      usoMontagem: "Porquê usar esta montagem",
      usoCana: "Material compatível e recomendações:",
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
      canas: "Rods",
      checklist: "Checklist",
      uso: "When / how to use",
      usoNo: "Purpose & when to use",
      usoMontagem: "Why use this rig",
      usoCana: "Compatible tackle & recommendations:",
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

  const hasMontagens =
    Array.isArray(EQUIP_DATA.montagens) && EQUIP_DATA.montagens.length > 0;
  const hasCanas =
    Array.isArray(EQUIP_DATA.canas) && EQUIP_DATA.canas.length > 0;
  const hasChecklist =
    Boolean(EQUIP_DATA.checklist) &&
    Array.isArray(EQUIP_DATA.checklist.grupos);

  if (currentEquipSubtab === "canas" && !hasCanas) {
    currentEquipSubtab = "amostras";
  }
  if (currentEquipSubtab === "checklist" && !hasChecklist) {
    currentEquipSubtab = "amostras";
  }

  const { marcados, total } = getChecklistCounts(currentChecklistTech);
  const checklistTabLabel =
    total > 0 ? `${labels.checklist} (${marcados}/${total})` : labels.checklist;

  if (currentEquipSubtab === "checklist" && hasChecklist) {
    panel.innerHTML = `
      <div class="distritos equip-subtabs" role="tablist">
        <button type="button" class="distrito-btn equip-subtab-btn" data-subtab="amostras">${labels.amostras}</button>
        <button type="button" class="distrito-btn equip-subtab-btn" data-subtab="nos">${labels.nos}</button>
        ${
          hasMontagens
            ? `<button type="button" class="distrito-btn equip-subtab-btn" data-subtab="montagens">${labels.montagens}</button>`
            : ""
        }
        ${
          hasCanas
            ? `<button type="button" class="distrito-btn equip-subtab-btn" data-subtab="canas">${labels.canas}</button>`
            : ""
        }
        <button type="button" class="distrito-btn equip-subtab-btn active" data-subtab="checklist">${checklistTabLabel}</button>
      </div>
      <div id="equip-checklist"></div>
    `;

    panel.querySelectorAll(".equip-subtab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentEquipSubtab = btn.dataset.subtab;
        sessionStorage.setItem("almanac-equip-subtab", currentEquipSubtab);
        renderEquipamento();
      });
    });

    renderChecklist(lang);
    return;
  }

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
        : currentEquipSubtab === "canas"
          ? labels.usoCana
          : labels.uso;

  panel.innerHTML = `
    <div class="distritos equip-subtabs" role="tablist">
      <button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "amostras" ? "active" : ""}" data-subtab="amostras">${labels.amostras}</button>
      <button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "nos" ? "active" : ""}" data-subtab="nos">${labels.nos}</button>
      ${
        hasMontagens
          ? `<button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "montagens" ? "active" : ""}" data-subtab="montagens">${labels.montagens}</button>`
          : ""
      }
      ${
        hasCanas
          ? `<button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "canas" ? "active" : ""}" data-subtab="canas">${labels.canas}</button>`
          : ""
      }
      ${
        hasChecklist
          ? `<button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "checklist" ? "active" : ""}" data-subtab="checklist">${checklistTabLabel}</button>`
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
          const titleObj = item.name || item.nome || {};
          const rawTitle = titleObj[lang] || titleObj.pt || "";
          const renderedTitle =
            currentEquipSubtab === "canas"
              ? formatCanaTitle(rawTitle, item.decathlonUrl)
              : rawTitle;
          const tagObj = item.tag || item.tipo || {};

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
              : tagObj[lang]
                ? `<span class="equip-tag">${tagObj[lang]}</span>`
                : "";

          const specsHtml =
            currentEquipSubtab === "canas" && item.specs
              ? formatSpecsBlock(item.specs[lang])
              : "";

          const links = [];
          if (currentEquipSubtab !== "canas") {
            if (item.decathlonUrl) {
              links.push(
                `<a href="${item.decathlonUrl}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${labels.decathlon}</a>`,
              );
            }
            if (Array.isArray(item.extraLinks)) {
              item.extraLinks.forEach((lnk) => {
                const lbl =
                  typeof lnk.label === "object"
                    ? lnk.label[lang] || lnk.label.pt
                    : lnk.label;
                if (lnk.url && lbl) {
                  links.push(
                    `<a href="${lnk.url}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${lbl}</a>`,
                  );
                }
              });
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
          }

          const shouldLinkify =
            currentEquipSubtab === "montagens" ||
            currentEquipSubtab === "canas";

          const descHtml = shouldLinkify
            ? formatMontagemWithLinks(item.desc[lang], lang)
            : item.desc[lang];

          const useHtml =
            currentEquipSubtab === "canas"
              ? `<div class="equip-use" style="margin-top:8px;"><strong>${usoLabel}</strong>${formatStructuredEquipLines(item.use[lang], lang, true)}</div>`
              : `<p class="equip-use"><strong>${usoLabel}:</strong> ${
                  shouldLinkify
                    ? formatMontagemWithLinks(item.use[lang], lang)
                    : item.use[lang]
                }</p>`;

          return `
        <article class="equip-card" id="equip-${item.id}">
          <div class="equip-card-visual">${item.svg}</div>
          <div class="equip-card-content">
            <div class="equip-card-header" style="flex-direction:column;align-items:flex-start;gap:4px;">
              <h3>${renderedTitle}</h3>
              ${badgesHtml}
            </div>
            ${specsHtml}
            <p class="equip-desc">${descHtml}</p>
            ${useHtml}
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

function jumpToAmostra(amostraId, targetSubtab = "amostras") {
  hideAmostraTooltip(0);

  if (typeof skipNextScrollToTop !== "undefined") {
    skipNextScrollToTop = true;
  }

  const equipTab = document.getElementById("tab-equipamento");
  if (equipTab) {
    equipTab.click();
  }

  currentEquipSubtab = targetSubtab;
  sessionStorage.setItem("almanac-equip-subtab", currentEquipSubtab);

  if (targetSubtab === "nos") {
    const knotItem = (EQUIP_DATA.nos || []).find((n) => n.id === amostraId);
    if (knotItem) {
      if (
        currentKnotCategory !== "todos" &&
        knotItem.category !== currentKnotCategory
      ) {
        currentKnotCategory = "todos";
        sessionStorage.setItem("almanac-knot-cat", "todos");
      }
      if (
        currentKnotDifficulty !== "todos" &&
        knotItem.difficulty !== currentKnotDifficulty
      ) {
        currentKnotDifficulty = "todos";
        sessionStorage.setItem("almanac-knot-diff", "todos");
      }
    }
  }

  renderEquipamento();

  if (typeof syncStickyHeights === "function") {
    syncStickyHeights();
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof syncStickyHeights === "function") {
        syncStickyHeights();
      }
      const card = document.getElementById(`equip-${amostraId}`);
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      card.classList.remove("destaque");
      void card.offsetWidth;
      card.classList.add("destaque");
      setTimeout(() => card.classList.remove("destaque"), 2200);
    });
  });
}

document.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    showAmostraTooltip(
      btn,
      btn.dataset.amostraId,
      btn.dataset.equipSubtab || "amostras",
    );
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
    showAmostraTooltip(
      btn,
      btn.dataset.amostraId,
      btn.dataset.equipSubtab || "amostras",
    );
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
    jumpToAmostra(btn.dataset.amostraId, btn.dataset.equipSubtab || "amostras");
  }
});

function updateChecklistTabCounter() {
  const { marcados, total } = getChecklistCounts(currentChecklistTech);
  const activeBtn = document.querySelector(
    '.equip-subtab-btn[data-subtab="checklist"]',
  );
  if (activeBtn && total > 0) {
    activeBtn.textContent = `Checklist (${marcados}/${total})`;
  }
}

function renderChecklist(lang = "pt") {
  const container = document.getElementById("equip-checklist");
  const data = EQUIP_DATA.checklist;
  if (!container || !data) return;

  const saved = JSON.parse(localStorage.getItem("pesca_checklist_v1") || "{}");

  const tecnicas = Array.isArray(data.tecnicas)
    ? data.tecnicas
    : [
        { id: "todas", pt: "Todas", en: "All" },
        { id: "spinning", pt: "Spinning", en: "Spinning" },
        { id: "boia", pt: "Bóia", en: "Float" },
        { id: "fundo", pt: "Fundo", en: "Bottom" },
        { id: "eging", pt: "Eging (Choco/Lula)", en: "Eging (Squid/Cuttlefish)" },
      ];

  const { marcados, total: totalItens } = getChecklistCounts(currentChecklistTech);

  const techFilterHtml = `
    <div class="distritos checklist-tech-bar" role="group" aria-label="${lang === "pt" ? "Filtrar por técnica" : "Filter by technique"}">
      <span class="knot-filter-label">${lang === "pt" ? "Técnica:" : "Technique:"}</span>
      ${tecnicas
        .map(
          (t) =>
            `<button type="button" class="distrito-btn checklist-tech-btn ${currentChecklistTech === t.id ? "active" : ""}" data-tech="${t.id}">${t[lang] || t.pt}</button>`,
        )
        .join("")}
    </div>
  `;

  const gruposHtml = data.grupos
    .map((grupo) => {
      const visibleItens = grupo.itens.filter((item) =>
        isChecklistItemVisible(item, currentChecklistTech),
      );
      if (!visibleItens.length) return "";

      return `
        <div class="checklist-card">
          <h3>${grupo.nome[lang]}</h3>
          <ul class="checklist-list">
            ${visibleItens
              .map((item) => {
                const checked = saved[item.id] ? "checked" : "";
                return `
                  <li>
                    <label class="checklist-item ${checked}">
                      <input type="checkbox" data-check-id="${item.id}" ${checked} />
                      <span>${item[lang]}</span>
                    </label>
                  </li>`;
              })
              .join("")}
          </ul>
        </div>`;
    })
    .join("");

  container.innerHTML = `
    <div class="checklist-header">
      <div>
        <h2>${data.titulo[lang]}</h2>
        <p>${data.subtitulo[lang]}</p>
      </div>
      <div class="checklist-actions">
        <span class="checklist-counter">${marcados} / ${totalItens}</span>
        <button type="button" id="checklist-reset-btn">
          ${lang === "pt" ? "Desmarcar tudo" : "Reset all"}
        </button>
      </div>
    </div>
    ${techFilterHtml}
    <div class="checklist-grid">
      ${gruposHtml}
    </div>
  `;

  container.querySelectorAll(".checklist-tech-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentChecklistTech = btn.dataset.tech;
      localStorage.setItem("pesca_checklist_tech_v1", currentChecklistTech);
      updateChecklistTabCounter();
      renderChecklist(lang);
    });
  });

  container.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const id = e.target.dataset.checkId;
      saved[id] = e.target.checked;
      localStorage.setItem("pesca_checklist_v1", JSON.stringify(saved));
      updateChecklistTabCounter();
      renderChecklist(lang);
    });
  });

  const resetBtn = document.getElementById("checklist-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem("pesca_checklist_v1");
      updateChecklistTabCounter();
      renderChecklist(lang);
    });
  }
}
