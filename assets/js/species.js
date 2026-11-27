// =========================================================
// ABA ESPÉCIES: Identificação Visual (SVG), Pesquisa e Salto Direto
// =========================================================

let speciesSearchQuery = "";
let speciesHabitatFilter = "";

const SPECIES_SVGS = {
  robalo: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Robalo">
    <path d="M18 45 C42 23, 98 22, 134 38 L164 22 L156 45 L164 68 L134 52 C98 68, 42 67, 18 45 Z" fill="#8fa3ad" stroke="currentColor" stroke-width="2"/>
    <path d="M22 46 C46 64, 98 65, 132 50" fill="#dbe6eb" opacity="0.75"/>
    <path d="M62 27 L78 13 L88 27 Z" fill="#6f8591" stroke="currentColor" stroke-width="1.6"/>
    <path d="M94 28 L112 16 L118 31 Z" fill="#6f8591" stroke="currentColor" stroke-width="1.6"/>
    <path d="M98 59 L114 73 L118 56 Z" fill="#7d939e" stroke="currentColor" stroke-width="1.5"/>
    <path d="M56 48 L72 60 L66 47 Z" fill="#9fb2bc" stroke="currentColor" stroke-width="1.4"/>
    <path d="M48 33 C53 40, 53 50, 48 57" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="46" cy="40" r="3.4" fill="#18262b"/>
    <circle cx="33" cy="40" r="3" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="33" cy="40" r="1.4" fill="#111"/>
    <path d="M52 44 C82 41, 108 42, 134 45" stroke="#475b63" stroke-width="1.2" stroke-dasharray="3 2"/>
  </svg>`,

  baila: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Baila">
    <path d="M18 45 C42 23, 98 22, 134 38 L164 22 L156 45 L164 68 L134 52 C98 68, 42 67, 18 45 Z" fill="#96aab3" stroke="currentColor" stroke-width="2"/>
    <path d="M62 27 L78 13 L88 27 Z" fill="#728894" stroke="currentColor" stroke-width="1.6"/>
    <path d="M94 28 L112 16 L118 31 Z" fill="#728894" stroke="currentColor" stroke-width="1.6"/>
    <path d="M48 33 C53 40, 53 50, 48 57" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="46" cy="40" r="3.2" fill="#18262b"/>
    <circle cx="33" cy="40" r="3" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="33" cy="40" r="1.4" fill="#111"/>
    <g fill="#1d2d33">
      <circle cx="62" cy="36" r="1.6"/><circle cx="72" cy="34" r="1.6"/><circle cx="82" cy="35" r="1.6"/><circle cx="92" cy="34" r="1.6"/><circle cx="102" cy="36" r="1.6"/><circle cx="112" cy="37" r="1.6"/>
      <circle cx="67" cy="41" r="1.6"/><circle cx="77" cy="40" r="1.6"/><circle cx="87" cy="41" r="1.6"/><circle cx="97" cy="40" r="1.6"/><circle cx="107" cy="42" r="1.6"/><circle cx="117" cy="42" r="1.6"/>
    </g>
  </svg>`,

  dourada: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Dourada">
    <path d="M18 46 C38 18, 96 17, 134 39 L164 21 L155 45 L164 69 L134 51 C96 71, 38 70, 18 46 Z" fill="#b7c6ce" stroke="currentColor" stroke-width="2"/>
    <path d="M54 23 C78 14, 106 16, 124 32" fill="#98abb5" stroke="currentColor" stroke-width="1.6"/>
    <path d="M92 61 L114 72 L120 55 Z" fill="#98abb5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M27 36 C33 32, 41 32, 46 36" stroke="#eab308" stroke-width="3" stroke-linecap="round"/>
    <circle cx="50" cy="43" r="3.4" fill="#18262b"/>
    <circle cx="49" cy="42" r="1.5" fill="#f97316"/>
    <circle cx="34" cy="41" r="3.2" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="34" cy="41" r="1.5" fill="#111"/>
    <path d="M47 34 C52 42, 52 50, 47 58" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,

  sargo: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sargo">
    <path d="M20 46 C38 17, 94 16, 132 38 L163 20 L154 45 L163 70 L132 52 C94 72, 38 71, 20 46 Z" fill="#c3cfd6" stroke="currentColor" stroke-width="2"/>
    <path d="M52 22 C76 13, 106 15, 124 31" fill="#9aaab3" stroke="currentColor" stroke-width="1.6"/>
    <line x1="64" y1="22" x2="64" y2="65" stroke="#475569" stroke-width="1.6" opacity="0.65"/>
    <line x1="76" y1="21" x2="76" y2="66" stroke="#475569" stroke-width="1.6" opacity="0.65"/>
    <line x1="88" y1="22" x2="88" y2="65" stroke="#475569" stroke-width="1.6" opacity="0.65"/>
    <line x1="100" y1="25" x2="100" y2="62" stroke="#475569" stroke-width="1.6" opacity="0.65"/>
    <rect x="122" y="36" width="9" height="18" rx="4" fill="#18262b"/>
    <circle cx="35" cy="41" r="3.1" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="35" cy="41" r="1.5" fill="#111"/>
  </svg>`,

  besugo: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Besugo">
    <path d="M20 46 C40 20, 96 19, 133 39 L163 22 L154 45 L163 68 L133 51 C96 70, 40 69, 20 46 Z" fill="#e5b8b7" stroke="currentColor" stroke-width="2"/>
    <path d="M54 24 C78 16, 106 18, 124 33" fill="#d49a98" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="36" cy="40" r="4.6" fill="#fff" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="36" cy="40" r="2.2" fill="#111"/>
    <circle cx="56" cy="39" r="3" fill="#292524" opacity="0.8"/>
    <path d="M56 48 L76 58 L70 46 Z" fill="#f59e0b" opacity="0.6" stroke="currentColor" stroke-width="1.3"/>
  </svg>`,

  tainha: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tainha">
    <path d="M18 45 C42 25, 102 25, 135 39 L165 23 L156 45 L165 67 L135 51 C102 65, 42 65, 18 45 Z" fill="#899ca6" stroke="currentColor" stroke-width="2"/>
    <path d="M64 28 L77 15 L84 28 Z" fill="#6b7f8a" stroke="currentColor" stroke-width="1.5"/>
    <path d="M98 29 L112 17 L117 31 Z" fill="#6b7f8a" stroke="currentColor" stroke-width="1.5"/>
    <line x1="52" y1="36" x2="128" y2="38" stroke="#475569" stroke-width="1.2"/>
    <line x1="50" y1="42" x2="130" y2="43" stroke="#475569" stroke-width="1.2"/>
    <line x1="52" y1="48" x2="128" y2="48" stroke="#475569" stroke-width="1.2"/>
    <circle cx="31" cy="41" r="3" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="31" cy="41" r="1.4" fill="#111"/>
  </svg>`,

  linguado: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Linguado">
    <path d="M22 45 C32 22, 114 20, 148 39 L164 33 L164 57 L148 51 C114 70, 32 68, 22 45 Z" fill="#9c8265" stroke="currentColor" stroke-width="2"/>
    <circle cx="35" cy="39" r="2.5" fill="#fff" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="35" cy="39" r="1.2" fill="#111"/>
    <circle cx="37" cy="47" r="2.5" fill="#fff" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="37" cy="47" r="1.2" fill="#111"/>
    <path d="M52 45 L142 45" stroke="#5c4934" stroke-width="1.4"/>
    <path d="M148 41 L158 41" stroke="#18262b" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,

  solha: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Solha">
    <path d="M22 45 C42 15, 108 15, 142 38 L164 29 L160 45 L164 61 L142 52 C108 75, 42 75, 22 45 Z" fill="#8b7355" stroke="currentColor" stroke-width="2"/>
    <circle cx="35" cy="39" r="2.5" fill="#fff" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="35" cy="39" r="1.2" fill="#111"/>
    <circle cx="37" cy="47" r="2.5" fill="#fff" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="37" cy="47" r="1.2" fill="#111"/>
    <circle cx="64" cy="33" r="2.6" fill="#f97316"/>
    <circle cx="88" cy="29" r="2.6" fill="#f97316"/>
    <circle cx="112" cy="35" r="2.6" fill="#f97316"/>
    <circle cx="72" cy="54" r="2.6" fill="#f97316"/>
    <circle cx="98" cy="57" r="2.6" fill="#f97316"/>
    <circle cx="118" cy="48" r="2.6" fill="#f97316"/>
  </svg>`,

  safio: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Safio">
    <path d="M16 42 C46 32, 92 48, 128 40 C145 36, 158 40, 168 44 C158 48, 145 48, 128 50 C92 58, 46 44, 16 48 Z" fill="#64748b" stroke="currentColor" stroke-width="2"/>
    <path d="M44 37 C76 31, 114 39, 166 43" stroke="#94a3b8" stroke-width="2.5" fill="none"/>
    <circle cx="27" cy="41" r="2.6" fill="#fff" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="27" cy="41" r="1.2" fill="#111"/>
    <path d="M40 45 L50 51 L48 44 Z" fill="#94a3b8" stroke="currentColor" stroke-width="1.3"/>
  </svg>`,

  cavala: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cavala">
    <path d="M16 45 C42 26, 104 26, 138 40 L165 23 L156 45 L165 67 L138 50 C104 64, 42 64, 16 45 Z" fill="#3b82f6" fill-opacity="0.35" stroke="currentColor" stroke-width="2"/>
    <path d="M56 30 Q60 37 64 30 Q68 37 72 30 Q76 37 80 30 Q84 37 88 30 Q92 37 96 30 Q100 37 104 30 Q108 37 112 30 Q116 37 120 30" stroke="#1e3a8a" stroke-width="2" fill="none"/>
    <path d="M62 29 L75 16 L82 29 Z" fill="#60a5fa" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="31" cy="42" r="3.2" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="31" cy="42" r="1.5" fill="#111"/>
  </svg>`,

  choco: `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Choco">
    <path d="M54 26 C92 18, 146 24, 158 45 C146 66, 92 72, 54 64 Z" fill="#c2a385" stroke="currentColor" stroke-width="2"/>
    <path d="M64 32 C94 28, 128 32, 144 45 C128 58, 94 62, 64 58" stroke="#6b4f35" stroke-width="1.6" stroke-dasharray="4 3"/>
    <path d="M54 34 L22 28 M54 40 L18 38 M54 46 L18 48 M54 52 L22 58 M54 58 L28 64" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="50" cy="36" r="3.2" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
    <path d="M48 36 L52 36" stroke="#111" stroke-width="1.8"/>
  </svg>`,
};

function getSpeciesSvg(id) {
  return (
    SPECIES_SVGS[id] ||
    `<svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 45 C48 22, 102 22, 136 39 L164 22 L155 45 L164 68 L136 51 C102 68, 48 68, 22 45 Z" fill="#9ab5b8" stroke="currentColor" stroke-width="2"/><circle cx="36" cy="41" r="3" fill="#111"/></svg>`
  );
}

function normalizeSpeciesKey(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function findSpeciesEntryByName(rawName) {
  if (!rawName || typeof SPECIES_DATA === "undefined") return null;
  const target = normalizeSpeciesKey(rawName);
  if (!target) return null;

  return (
    SPECIES_DATA.find((sp) => {
      const idKey = normalizeSpeciesKey(sp.id);
      const ptKey = normalizeSpeciesKey(sp.nome.pt);
      const enKey = normalizeSpeciesKey(sp.nome.en);
      return (
        idKey === target ||
        ptKey === target ||
        enKey === target ||
        ptKey.includes(target) ||
        target.includes(ptKey) ||
        enKey.includes(target) ||
        target.includes(enKey)
      );
    }) || null
  );
}

function renderSpeciesTab() {
  const panel = document.getElementById("panel-especies");
  if (!panel || typeof SPECIES_DATA === "undefined") return;

  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";

  const labels = {
    pt: {
      searchPlaceholder: "Pesquisar espécie (ex.: robalo, dourada, solha)...",
      allHabitats: "Todos os habitats",
      salobra: "Salobra / Ria",
      mar: "Mar / Praia / Barra",
      minSize: "Tam. mín.",
      season: "Época",
      idTitle: "Como identificar",
      confusaoTitle: "Não confundir com",
      iscaTitle: "Iscos & Técnicas",
      verPesqueiros: "Ver pesqueiros desta espécie →",
      empty: "Nenhuma espécie encontrada com esse filtro.",
    },
    en: {
      searchPlaceholder:
        "Search species (e.g., seabass, gilthead, flounder)...",
      allHabitats: "All habitats",
      salobra: "Brackish / Lagoon",
      mar: "Sea / Beach / Inlet",
      minSize: "Min. size",
      season: "Season",
      idTitle: "How to identify",
      confusaoTitle: "Do not confuse with",
      iscaTitle: "Baits & Techniques",
      verPesqueiros: "View spots for this species →",
      empty: "No species found matching this filter.",
    },
  }[lang];

  const q = speciesSearchQuery.trim().toLowerCase();
  const filtered = SPECIES_DATA.filter((sp) => {
    const nameStr =
      `${sp.nome.pt} ${sp.nome.en} ${sp.cientifico}`.toLowerCase();
    const habPt = sp.habitat.pt.toLowerCase();
    const matchQuery = !q || nameStr.includes(q);
    const matchHab =
      !speciesHabitatFilter ||
      (speciesHabitatFilter === "salobra" && habPt.includes("salobra")) ||
      (speciesHabitatFilter === "mar" && habPt.includes("mar"));
    return matchQuery && matchHab;
  });

  const cardsHtml = filtered.length
    ? `<div class="equip-grid species-grid">${filtered
        .map((sp) => {
          const title = sp.nome[lang] || sp.nome.pt;
          const secondaryName = lang === "pt" ? sp.nome.en : sp.nome.pt;
          return `
          <article class="equip-card species-card" id="species-card-${sp.id}" data-species-id="${sp.id}">
            <div class="equip-card-visual species-visual">
              ${getSpeciesSvg(sp.id)}
            </div>
            <div class="equip-card-body">
              <div class="equip-card-header">
                <div>
                  <h3>${title} <span class="species-alt-name">(${secondaryName})</span></h3>
                  <p class="species-sci-name">${sp.cientifico}</p>
                </div>
                <span class="equip-tag diff-facil">${labels.minSize} ${sp.minCm}</span>
              </div>

              <div class="species-meta-row">
                <span class="species-meta-pill">📅 ${labels.season}: ${sp.epoca}</span>
                <span class="species-meta-pill">🌊 ${sp.habitat[lang]}</span>
              </div>

              <p class="equip-desc"><strong>🔍 ${labels.idTitle}:</strong> ${sp.identificacao[lang]}</p>
              <p class="equip-use"><strong>⚠️ ${labels.confusaoTitle}:</strong> ${sp.confusao[lang]}</p>
              <p class="equip-use" style="margin-top:4px;"><strong>🎣 ${labels.iscaTitle}:</strong> ${sp.iscaTecnica[lang]}</p>

              <div class="equip-link-wrap">
                <button type="button" class="equip-decathlon-link species-to-spots-btn" data-species-name="${sp.nome.pt}">
                  ${labels.verPesqueiros}
                </button>
              </div>
            </div>
          </article>`;
        })
        .join("")}</div>`
    : `<div class="vazio"><p style="margin:0;">${labels.empty}</p></div>`;

  panel.innerHTML = `
    <div class="equip-filters-box species-filters-box">
      <div class="species-filters-row">
        <input
          type="search"
          id="species-search-input"
          value="${speciesSearchQuery.replace(/"/g, "&quot;")}"
          placeholder="${labels.searchPlaceholder}"
        />
        <div class="species-hab-btns">
          <button type="button" class="distrito-btn ${speciesHabitatFilter === "" ? "active" : ""}" data-sp-hab="">${labels.allHabitats}</button>
          <button type="button" class="distrito-btn ${speciesHabitatFilter === "salobra" ? "active" : ""}" data-sp-hab="salobra">${labels.salobra}</button>
          <button type="button" class="distrito-btn ${speciesHabitatFilter === "mar" ? "active" : ""}" data-sp-hab="mar">${labels.mar}</button>
        </div>
      </div>
    </div>
    ${cardsHtml}
  `;

  const searchInput = document.getElementById("species-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const pos = e.target.selectionStart;
      speciesSearchQuery = e.target.value;
      renderSpeciesTab();
      const nextInput = document.getElementById("species-search-input");
      if (nextInput) {
        nextInput.focus();
        if (typeof pos === "number") nextInput.setSelectionRange(pos, pos);
      }
    });
  }

  panel.querySelectorAll("[data-sp-hab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      speciesHabitatFilter = btn.dataset.spHab || "";
      renderSpeciesTab();
    });
  });

  panel.querySelectorAll(".species-to-spots-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof window.jumpToSpecies === "function") {
        window.jumpToSpecies(btn.dataset.speciesName);
      }
    });
  });
}

window.jumpToSpeciesCard = function (speciesName) {
  if (!speciesName) return;
  const entry = findSpeciesEntryByName(speciesName);

  speciesSearchQuery = "";
  speciesHabitatFilter = "";

  if (typeof activateMainTab === "function") {
    activateMainTab("especies");
  } else {
    const tabBtn = document.querySelector('.tab[data-tab="especies"]');
    if (tabBtn) tabBtn.click();
  }

  renderSpeciesTab();

  if (!entry) return;
  requestAnimationFrame(() => {
    const card = document.getElementById(`species-card-${entry.id}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("destaque");
      setTimeout(() => {
        card.classList.remove("destaque");
      }, 2200);
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderSpeciesTab);
} else {
  renderSpeciesTab();
}
