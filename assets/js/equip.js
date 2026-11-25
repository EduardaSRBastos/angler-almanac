let currentEquipSubtab =
  sessionStorage.getItem("almanac-equip-subtab") || "amostras";
let currentKnotCategory = sessionStorage.getItem("almanac-knot-cat") || "todos";
let currentKnotDifficulty =
  sessionStorage.getItem("almanac-knot-diff") || "todos";
let mobileKnotFiltersOpen =
  sessionStorage.getItem("almanac-knot-filters-open") === "1";
let currentIscoCategory = sessionStorage.getItem("almanac-isco-cat") || "todos";

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

function getAvailableSpeciesSet() {
  const set = new Set();
  const norm = (s) =>
    String(s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/s$/, "")
      .trim();

  if (typeof rows !== "undefined" && Array.isArray(rows) && rows.length > 0) {
    rows.forEach((r) => {
      if (r.peixe) set.add(norm(r.peixe));
    });
  } else {
    const sel = document.getElementById("peixe");
    if (sel) {
      Array.from(sel.options).forEach((o) => {
        if (o.value) set.add(norm(o.value));
      });
    }
  }
  return set;
}

function linkifySpeciesNames(text, lang) {
  if (!text) return "";
  const availableSpecies = getAvailableSpeciesSet();
  const norm = (s) =>
    String(s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/s$/, "")
      .trim();

  const speciesList = [
    {
      query: "Robalo",
      patterns: [
        "robalos",
        "robaletes",
        "robalo",
        "robalete",
        "sea bass",
        "seabass",
      ],
    },
    {
      query: "Dourada",
      patterns: [
        "douradas",
        "douradotas",
        "dourada",
        "douradota",
        "gilt-head bream",
        "gilthead bream",
      ],
    },
    {
      query: "Sargo",
      patterns: ["sargos", "sarguinhos", "sargo", "white seabream", "seabream"],
    },
    {
      query: "Corvina",
      patterns: ["corvinas", "corvina", "meagre"],
    },
    {
      query: "Linguado",
      patterns: ["linguados", "linguado", "sole"],
    },
    {
      query: "Solha",
      patterns: ["solhas", "solha", "flounder", "plaice"],
    },
    {
      query: "Tainha",
      patterns: ["tainhas", "tainha", "fataça", "fataças", "mullet"],
    },
    {
      query: "Enguia",
      patterns: ["enguias", "enguia", "eel"],
    },
    {
      query: "Choco",
      patterns: ["chocos", "choco", "cuttlefish"],
    },
    {
      query: "Lula",
      patterns: ["lulas", "lula", "squid"],
    },
    {
      query: "Polvo",
      patterns: ["polvos", "polvo", "octopus"],
    },
    {
      query: "Bailas",
      patterns: ["bailas", "baila", "spotted seabass"],
    },
    {
      query: "Faneca",
      patterns: ["fanecas", "faneca", "pouting"],
    },
    {
      query: "Safio",
      patterns: ["safios", "safio", "congro", "conger"],
    },
    {
      query: "Achigã",
      patterns: ["achigãs", "achigã", "largemouth bass", "black bass"],
    },
    {
      query: "Carpa",
      patterns: ["carpas", "carpa", "carp"],
    },
    {
      query: "Barbo",
      patterns: ["barbos", "barbo", "barbel"],
    },
  ];

  const availableArr = Array.from(availableSpecies);
  const isAvailable = (queryName) => {
    if (availableArr.length === 0) return true;
    const target = norm(queryName);
    return availableArr.some(
      (entry) =>
        entry === target ||
        entry.startsWith(`${target}-`) ||
        entry.startsWith(`${target} `) ||
        target.startsWith(`${entry}-`) ||
        target.startsWith(`${entry} `),
    );
  };

  const allPatterns = [];
  const patternToQuery = new Map();
  speciesList.forEach((sp) => {
    if (!isAvailable(sp.query)) {
      return;
    }
    sp.patterns.forEach((p) => {
      allPatterns.push(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      patternToQuery.set(p.toLowerCase(), sp.query);
    });
  });

  if (!allPatterns.length) return String(text);

  allPatterns.sort((a, b) => b.length - a.length);
  const regex = new RegExp(
    `(?<![\\p{L}-])(${allPatterns.join("|")})(?![\\p{L}-])`,
    "giu",
  );

  const parts = String(text).split(/(<[^>]+>)/g);
  return parts
    .map((part) => {
      if (part.startsWith("<")) return part;
      return part.replace(regex, (match) => {
        const query = patternToQuery.get(match.toLowerCase()) || match;
        const titleHint =
          lang === "pt"
            ? `Filtrar pesqueiros por ${query}`
            : `Filter spots by ${query}`;
        return `<a href="#panel-pesqueiros" class="cana-inline-link species-jump-link" data-species="${query}" title="${titleHint}">${match}</a>`;
      });
    })
    .join("");
}

function formatStructuredEquipLines(value, lang, linkify = true) {
  if (!value) return "";
  if (Array.isArray(value)) {
    const lis = value
      .map((line) => {
        let formatted = linkify ? formatMontagemWithLinks(line, lang) : line;
        formatted = linkifySpeciesNames(formatted, lang);
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
          let formatted = linkify
            ? formatMontagemWithLinks(withBoldLabel, lang)
            : withBoldLabel;
          formatted = linkifySpeciesNames(formatted, lang);
          return `<li>${formatted}</li>`;
        })
        .join("");
      return `<ul class="cana-use-list">${lis}</ul>`;
    }
  }
  let formatted = linkify ? formatMontagemWithLinks(text, lang) : text;
  formatted = linkifySpeciesNames(formatted, lang);
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
      iscos: "Iscos Naturais",
      nos: "Nós de Pesca",
      montagens: "Montagens",
      canas: "Canas",
      checklist: "Checklist",
      uso: "Quando / como usar",
      usoIsco: "Espécies-alvo e dicas",
      condicoesLabel: "Condições",
      quandoUsarLabel: "Quando usar",
      usoNo: "Para que serve / quando usar",
      usoMontagem: "Porquê usar esta montagem",
      usoCana: "Material compatível e recomendações:",
      anzolLabel: "Anzol",
      iscagemLabel: "Iscagem",
      conservacaoLabel: "Conservação",
      decathlon: "Ver na Decathlon ↗",
      tutorialImg: "Imagem Tutorial ↗",
      tutorialVid: "Vídeo Tutorial ↗",
      catLabel: "Finalidade:",
      diffLabel: "Dificuldade:",
      iscoCatLabel: "Categoria:",
      clearFilters: "✕ Limpar filtros",
      filterToggle: "Filtrar nós",
      allKnots: "Todos os nós",
      emptyNos: "Nenhum nó encontrado com esta combinação de filtros.",
      emptyIscos: "Nenhum isco encontrado nesta categoria.",
      recursos: "Links Úteis",
      iscoCats: {
        todos: "Todos",
        minhocas: "Minhocas",
        "moluscos-crustaceos": "Moluscos e Crustáceos",
        cefalopodes: "Cefalópodes",
        peixe: "Peixe",
        "engodos-atrativos": "Engodos e Atrativos",
      },
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
      iscos: "Natural Baits",
      nos: "Fishing Knots",
      montagens: "Rigs",
      canas: "Rods",
      checklist: "Checklist",
      uso: "When / how to use",
      usoIsco: "Target species & tips",
      condicoesLabel: "Conditions",
      quandoUsarLabel: "When to use",
      usoNo: "Purpose & when to use",
      usoMontagem: "Why use this rig",
      usoCana: "Compatible tackle & recommendations:",
      anzolLabel: "Hook",
      iscagemLabel: "Rigging",
      conservacaoLabel: "Storage",
      decathlon: "View on Decathlon ↗",
      tutorialImg: "Image Tutorial ↗",
      tutorialVid: "Video Tutorial ↗",
      catLabel: "Purpose:",
      diffLabel: "Difficulty:",
      iscoCatLabel: "Category:",
      clearFilters: "✕ Clear filters",
      filterToggle: "Filter knots",
      allKnots: "All knots",
      emptyNos: "No knots match the selected filters.",
      emptyIscos: "No baits match this category.",
      recursos: "Useful Links",
      iscoCats: {
        todos: "All",
        minhocas: "Worms",
        "moluscos-crustaceos": "Shellfish & Crabs",
        cefalopodes: "Cephalopods",
        peixe: "Baitfish",
        "engodos-atrativos": "Groundbaits & Scents",
      },
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

  const hasIscos =
    Array.isArray(EQUIP_DATA.iscos) && EQUIP_DATA.iscos.length > 0;
  const hasMontagens =
    Array.isArray(EQUIP_DATA.montagens) && EQUIP_DATA.montagens.length > 0;
  const hasCanas =
    Array.isArray(EQUIP_DATA.canas) && EQUIP_DATA.canas.length > 0;
  const hasChecklist =
    Boolean(EQUIP_DATA.checklist) && Array.isArray(EQUIP_DATA.checklist.grupos);

  if (currentEquipSubtab === "iscos" && !hasIscos) {
    currentEquipSubtab = "amostras";
  }
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
      ${
        hasIscos
          ? `<button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "iscos" ? "active" : ""}" data-subtab="iscos">${labels.iscos}</button>`
          : ""
      }
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

  if (currentEquipSubtab === "iscos" && currentIscoCategory !== "todos") {
    items = items.filter((item) => item.categoria === currentIscoCategory);
  }

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

  const iscosFiltersHtml =
    currentEquipSubtab === "iscos"
      ? `
    <div class="equip-filters-box" style="margin-bottom:14px;">
      <div class="knot-filters-grid">
        <div class="distritos knot-filter-group">
          <span class="knot-filter-label">${labels.iscoCatLabel}</span>
          ${Object.entries(labels.iscoCats)
            .map(
              ([key, text]) =>
                `<button type="button" class="distrito-btn equip-isco-cat-btn ${currentIscoCategory === key ? "active" : ""}" data-isco-cat="${key}">${text}</button>`,
            )
            .join("")}
        </div>
        ${
          currentIscoCategory !== "todos"
            ? `<div class="knot-clear-row"><button type="button" id="btn-reset-iscos" class="distrito-btn" style="border-color:var(--channel);color:var(--channel);font-weight:600;">${labels.clearFilters}</button></div>`
            : ""
        }
      </div>
    </div>`
      : "";

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
    currentEquipSubtab === "iscos"
      ? labels.usoIsco
      : currentEquipSubtab === "nos"
        ? labels.usoNo
        : currentEquipSubtab === "montagens"
          ? labels.usoMontagem
          : currentEquipSubtab === "canas"
            ? labels.usoCana
            : labels.uso;

  panel.innerHTML = `   
    ${subtabsHtml}
    ${iscosFiltersHtml}
    ${knotsFiltersHtml}
    ${
      items.length === 0
        ? `<div class="vazio" style="padding:18px;">
            <p style="margin:0 0 10px 0;opacity:0.8;">${currentEquipSubtab === "iscos" ? labels.emptyIscos : labels.emptyNos}</p>
            <button type="button" id="${currentEquipSubtab === "iscos" ? "btn-reset-iscos-empty" : "btn-reset-knots-empty"}" class="btn-limpar">${labels.clearFilters}</button>
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

          const isIsco = currentEquipSubtab === "iscos";
          const anzolVal =
            typeof item.anzol === "string"
              ? item.anzol
              : item.anzol?.[lang] || item.anzol?.pt || "";
          const iscagemVal =
            typeof item.iscagem === "string"
              ? item.iscagem
              : item.iscagem?.[lang] || item.iscagem?.pt || "";
          const conservacaoVal =
            typeof item.conservacao === "string"
              ? item.conservacao
              : item.conservacao?.[lang] || item.conservacao?.pt || "";

          const specsHtml =
            currentEquipSubtab === "canas" && item.specs
              ? formatSpecsBlock(item.specs[lang])
              : isIsco
                ? `
                <ul class="cana-specs-list">
                  ${anzolVal ? `<li><strong>${labels.anzolLabel}:</strong> ${anzolVal}</li>` : ""}
                  ${iscagemVal ? `<li><strong>${labels.iscagemLabel}:</strong> ${iscagemVal}</li>` : ""}
                  ${conservacaoVal ? `<li><strong>${labels.conservacaoLabel}:</strong> ${conservacaoVal}</li>` : ""}
                </ul>`
                : "";

          const condicoesRaw =
            isIsco && item.condicoes
              ? typeof item.condicoes === "string"
                ? item.condicoes
                : item.condicoes[lang] || item.condicoes.pt || ""
              : "";
          const condicoesHtml = condicoesRaw
            ? `<p class="equip-use"><strong>${labels.condicoesLabel}:</strong> ${condicoesRaw}</p>`
            : "";

          const quandoUsarRaw =
            isIsco && item.quandoUsar
              ? typeof item.quandoUsar === "string"
                ? item.quandoUsar
                : item.quandoUsar[lang] || item.quandoUsar.pt || ""
              : "";
          const quandoUsarHtml = quandoUsarRaw
            ? `<p class="equip-use"><strong>${labels.quandoUsarLabel}:</strong> ${linkifySpeciesNames(quandoUsarRaw, lang)}</p>`
            : "";

          const legalNoticeHtml =
            isIsco && (item.avisoLegal?.[lang] || item.avisoLegal?.pt)
              ? `<p style="font-size:0.82rem;color:var(--muted);margin:6px 0 0 0;">⚠️ ${item.avisoLegal[lang] || item.avisoLegal.pt}</p>`
              : "";

          const links = [];
          if (currentEquipSubtab !== "canas") {
            if (item.decathlonUrl) {
              const decLbl =
                item.decathlonLabel && typeof item.decathlonLabel === "object"
                  ? item.decathlonLabel[lang] || item.decathlonLabel.pt
                  : item.decathlonLabel || labels.decathlon;
              links.push(
                `<a href="${item.decathlonUrl}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${decLbl}</a>`,
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

          const rawDesc =
            typeof item.desc === "object"
              ? item.desc?.[lang] || item.desc?.pt || ""
              : item.desc || "";

          const descHtml =
            typeof formatMontagemWithLinks === "function"
              ? formatMontagemWithLinks(rawDesc, lang)
              : rawDesc;

          const useRaw =
            (item.use && (item.use[lang] || item.use.pt)) ||
            (item.especies && (item.especies[lang] || item.especies.pt)) ||
            "";

          const useFormatted = linkifySpeciesNames(
            shouldLinkify ? formatMontagemWithLinks(useRaw, lang) : useRaw,
            lang,
          );

          const useHtml =
            currentEquipSubtab === "canas"
              ? `<div class="equip-use" style="margin-top:8px;"><strong>${usoLabel}</strong>${formatStructuredEquipLines(useRaw, lang, true)}</div>`
              : useRaw
                ? `<p class="equip-use"><strong>${usoLabel}:</strong> ${useFormatted}</p>`
                : "";

          const visualHtml = item.svg
            ? `<div class="equip-card-visual">${item.svg}</div>`
            : "";

          return `
        <article class="equip-card ${item.svg ? "" : "equip-card--no-visual"}" id="equip-${item.id}">
          ${visualHtml}
          <div class="equip-card-content">
            <div class="equip-card-header" style="flex-direction:column;align-items:flex-start;gap:4px;">
              <h3>${renderedTitle}</h3>
              ${badgesHtml}
            </div>
            ${specsHtml}
            ${condicoesHtml}
            ${quandoUsarHtml}
            <p class="equip-desc">${descHtml}</p>
            ${useHtml}
            ${legalNoticeHtml}
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

  panel.querySelectorAll(".species-jump-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sp = link.dataset.species;
      if (sp && typeof jumpToSpecies === "function") {
        jumpToSpecies(sp);
      }
    });
  });

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

  panel.querySelectorAll(".equip-isco-cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentIscoCategory = btn.dataset.iscoCat;
      sessionStorage.setItem("almanac-isco-cat", currentIscoCategory);
      renderEquipamento();
    });
  });

  const resetIscosFn = () => {
    currentIscoCategory = "todos";
    sessionStorage.setItem("almanac-isco-cat", "todos");
    renderEquipamento();
  };

  const resetIscosBtn = panel.querySelector("#btn-reset-iscos");
  if (resetIscosBtn) resetIscosBtn.addEventListener("click", resetIscosFn);

  const resetIscosEmptyBtn = panel.querySelector("#btn-reset-iscos-empty");
  if (resetIscosEmptyBtn)
    resetIscosEmptyBtn.addEventListener("click", resetIscosFn);

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
