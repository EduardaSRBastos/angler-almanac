let currentEquipSubtab =
  sessionStorage.getItem("almanac-equip-subtab") || "amostras";
let currentKnotCategory = sessionStorage.getItem("almanac-knot-cat") || "todos";
let currentKnotDifficulty =
  sessionStorage.getItem("almanac-knot-diff") || "todos";
let mobileKnotFiltersOpen =
  sessionStorage.getItem("almanac-knot-filters-open") === "1";

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

function renderEquipamento() {
  const panel = document.getElementById("panel-equipamento");
  if (!panel) return;

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
      recursos: "Links Úteis",
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
      recursos: "Useful Links",
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
    Boolean(EQUIP_DATA.checklist) && Array.isArray(EQUIP_DATA.checklist.grupos);

  if (currentEquipSubtab === "canas" && !hasCanas) {
    currentEquipSubtab = "amostras";
  }
  if (currentEquipSubtab === "checklist" && !hasChecklist) {
    currentEquipSubtab = "amostras";
  }

  const { marcados, total } = getChecklistCounts(currentChecklistTech);
  const checklistTabLabel =
    total > 0 ? `${labels.checklist} (${marcados}/${total})` : labels.checklist;

  const hasRecursos =
    Array.isArray(EQUIP_DATA.recursos) && EQUIP_DATA.recursos.length > 0;

  if (currentEquipSubtab === "recursos" && !hasRecursos) {
    currentEquipSubtab = "amostras";
  }

  const subtabsHtml = `
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
      ${
        hasRecursos
          ? `<button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "recursos" ? "active" : ""}" data-subtab="recursos">${labels.recursos}</button>`
          : ""
      }
    </div>
  `;

  if (currentEquipSubtab === "checklist" && hasChecklist) {
    panel.innerHTML = `
      ${subtabsHtml}
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

  if (currentEquipSubtab === "recursos" && hasRecursos) {
    const grupos = EQUIP_DATA.recursos || [];
    panel.innerHTML = `
      ${subtabsHtml}
      <div class="checklist-grid">
        ${grupos
          .map(
            (g) => `
          <div class="checklist-card">
            <h4>${g.categoria[lang] || g.categoria.pt}</h4>
            <ul class="cana-use-list" style="margin-left: 14px;">
              ${g.links
                .map(
                  (item) => `
                <li>
                  <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="cana-inline-link">
                    ${item.nome[lang] || item.nome.pt} ↗
                  </a>
                  <br>
                  <span style="font-size: 0.85rem; color: var(--muted);">${item.desc[lang] || item.desc.pt}</span>
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>
        `,
          )
          .join("")}
      </div>
    `;

    panel.querySelectorAll(".equip-subtab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentEquipSubtab = btn.dataset.subtab;
        sessionStorage.setItem("almanac-equip-subtab", currentEquipSubtab);
        renderEquipamento();
      });
    });

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
    ${subtabsHtml}
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
