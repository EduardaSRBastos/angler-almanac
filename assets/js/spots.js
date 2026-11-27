// =========================================================
// PESQUEIROS: Filtros, Idioma e Renderização
// =========================================================

const SPOTS_STATE_KEY = "almanac-spots-state-v1";

function getDefaultMonthStr() {
  return String(new Date().getMonth());
}

function saveSpotsState() {
  try {
    const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
    sessionStorage.setItem("almanac-lang", lang);
    const state = {
      lang,
      busca: els.busca ? els.busca.value : "",
      mes: els.mes ? els.mes.value : getDefaultMonthStr(),
      tipo: els.tipo ? els.tipo.value : "",
      peixe: els.peixe ? els.peixe.value : "",
      hip: els.hip ? els.hip.value : "",
    };
    sessionStorage.setItem(SPOTS_STATE_KEY, JSON.stringify(state));
  } catch (e) {}
}

function loadSpotsState() {
  try {
    const raw = sessionStorage.getItem(SPOTS_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

const savedSpotsState = loadSpotsState();
if (
  savedSpotsState &&
  savedSpotsState.lang &&
  typeof currentLang !== "undefined"
) {
  currentLang = savedSpotsState.lang;
}

const els = {
  busca: $("busca"),
  mes: $("mes"),
  tipo: $("tipo"),
  peixe: $("peixe"),
  hip: $("hip"),
  lista: $("lista"),
  contagem: $("contagem"),
};

function setTextIfExists(id, text) {
  const el = $(id);
  if (el && typeof text === "string") {
    el.textContent = text;
  }
}

function fill(select, values, first, keepValue) {
  if (!select) return;
  select.innerHTML =
    `<option value="">${first}</option>` +
    values.map((v) => `<option value="${v}">${v}</option>`).join("");
  if (keepValue && values.includes(keepValue)) select.value = keepValue;
}

const unique = (list, key) =>
  [...new Set(list.map((r) => r[key]))].sort((a, b) =>
    a.localeCompare(b, "pt"),
  );

function populateFilters(initial = false) {
  const t = I18N[currentLang];
  const defaultMes = getDefaultMonthStr();

  const prevMes = initial
    ? savedSpotsState && typeof savedSpotsState.mes === "string"
      ? savedSpotsState.mes
      : defaultMes
    : els.mes.value;

  const prevTipo =
    initial && savedSpotsState ? savedSpotsState.tipo || "" : els.tipo.value;
  const prevPeixe =
    initial && savedSpotsState ? savedSpotsState.peixe || "" : els.peixe.value;
  const prevHip =
    initial && savedSpotsState ? savedSpotsState.hip || "" : els.hip.value;

  if (initial && savedSpotsState && typeof savedSpotsState.busca === "string") {
    els.busca.value = savedSpotsState.busca;
  }

  const districtRows = rows.filter((r) => r.distrito === currentDistrito);

  els.mes.innerHTML =
    `<option value="">${t.allMonths}</option>` +
    t.months.map((m, i) => `<option value="${i}">${m}</option>`).join("");
  els.mes.value = prevMes;

  fill(els.tipo, unique(districtRows, "tipo"), t.allTypes, prevTipo);
  fill(els.peixe, unique(districtRows, "peixe"), t.allSpecies, prevPeixe);

  els.hip.innerHTML = `<option value="">${t.hipAny}</option><option value="3">${t.hipMed}</option><option value="5">${t.hipGood}</option>`;
  els.hip.value = prevHip;
}

let mobileFiltersExpanded = false;

function getActiveFilterCount() {
  const defaultMes = getDefaultMonthStr();
  let count = 0;
  if (els.busca && els.busca.value.trim() !== "") count++;
  if (els.mes && els.mes.value !== defaultMes) count++;
  if (els.tipo && els.tipo.value !== "") count++;
  if (els.peixe && els.peixe.value !== "") count++;
  if (els.hip && els.hip.value !== "") count++;
  return count;
}

function ensureMobileFilterToggle() {
  const form = document.querySelector(".filtros");
  if (!form) return;

  let bar = document.getElementById("mobile-filtros-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "mobile-filtros-bar";
    bar.className = "mobile-filtros-bar";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btn-toggle-filtros-mobile";
    btn.className = "mobile-filtros-toggle";
    btn.addEventListener("click", () => {
      mobileFiltersExpanded = !mobileFiltersExpanded;
      updateMobileFilterToggle();
      if (typeof syncStickyHeights === "function") {
        syncStickyHeights();
      }
    });

    const summary = document.createElement("span");
    summary.id = "mobile-filtros-summary";
    summary.className = "mobile-filtros-summary";

    bar.appendChild(btn);
    bar.appendChild(summary);
    form.insertAdjacentElement("beforebegin", bar);
  }

  updateMobileFilterToggle();
}

function updateMobileFilterToggle() {
  const form = document.querySelector(".filtros");
  const btn = document.getElementById("btn-toggle-filtros-mobile");
  const summary = document.getElementById("mobile-filtros-summary");
  if (!form || !btn) return;

  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const activeCount = getActiveFilterCount();

  if (mobileFiltersExpanded) {
    form.classList.remove("is-collapsed-mobile");
    btn.textContent = lang === "pt" ? "▲ Ocultar filtros" : "▲ Hide filters";
  } else {
    form.classList.add("is-collapsed-mobile");
    const badge = activeCount > 0 ? ` (${activeCount})` : "";
    btn.textContent =
      lang === "pt" ? `▼ Filtrar pesqueiros${badge}` : `▼ Filter spots${badge}`;
  }

  if (summary) {
    const parts = [];
    if (els.mes && els.mes.selectedIndex >= 0) {
      parts.push(els.mes.options[els.mes.selectedIndex].text);
    }
    if (els.peixe && els.peixe.value) {
      parts.push(els.peixe.value);
    } else if (els.tipo && els.tipo.value) {
      parts.push(els.tipo.value);
    }
    summary.textContent = parts.join(" · ");
  }
}

function ensureFilterResetButton() {
  const form = document.querySelector(".filtros");
  if (!form) return null;

  let wrap = document.getElementById("filtros-reset-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "filtros-reset-wrap";
    wrap.className = "filtros-reset-wrap";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btn-clear-filtros-top";
    btn.className = "btn-limpar";
    btn.addEventListener("click", resetAllFilters);

    wrap.appendChild(btn);
    form.appendChild(wrap);
  }

  return document.getElementById("btn-clear-filtros-top");
}

function hasActiveFilters() {
  const defaultMes = getDefaultMonthStr();
  return Boolean(
    (els.busca && els.busca.value.trim() !== "") ||
    (els.mes && els.mes.value !== defaultMes) ||
    (els.tipo && els.tipo.value !== "") ||
    (els.peixe && els.peixe.value !== "") ||
    (els.hip && els.hip.value !== ""),
  );
}

function updateFilterResetButton() {
  ensureMobileFilterToggle();
  const btn = ensureFilterResetButton();
  const wrap = document.getElementById("filtros-reset-wrap");
  if (!btn || !wrap) return;

  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  btn.textContent = lang === "pt" ? "✕ Limpar filtros" : "✕ Reset filters";
  wrap.style.display = hasActiveFilters() ? "flex" : "none";
}

function applyLanguage() {
  const t = I18N[currentLang];
  document.documentElement.lang = currentLang;
  document.title = t.title;
  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl) metaDescEl.setAttribute("content", t.metaDesc);

  setTextIfExists("site-title", t.title);
  setTextIfExists("site-sub", t.sub);
  setTextIfExists("lang-toggle", t.toggleBtn);
  setTextIfExists("tab-pesqueiros", t.tabPesqueiros);
  setTextIfExists("tab-especies", t.tabEspecies);
  setTextIfExists("tab-equipamento", t.tabEquipamento);
  setTextIfExists("tab-links", t.tabLinks);
  setTextIfExists("lbl-busca", t.lblBusca);
  if (els.busca) els.busca.placeholder = t.buscaPlaceholder;
  setTextIfExists("lbl-mes", t.lblMes);
  setTextIfExists("lbl-tipo", t.lblTipo);
  setTextIfExists("lbl-peixe", t.lblPeixe);
  setTextIfExists("lbl-hip", t.lblHip);
  setTextIfExists("regras-titulo", t.regrasTitulo);

  populateFilters(false);
  render();

  if (typeof renderEquipamento === "function") {
    renderEquipamento();
  }

  if (typeof renderLinksTab === "function") {
    renderLinksTab();
  }

  if (typeof renderSpeciesTab === "function") {
    renderSpeciesTab();
  }

  if (typeof syncStickyHeights === "function") {
    syncStickyHeights();
  }
  saveSpotsState();
}

function field(label, value) {
  return value && value !== "—"
    ? `<div><dt>${label}</dt><dd>${value}</dd></div>`
    : "";
}

function slugify(text) {
  return "local-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function resetAllFilters() {
  if (els.busca) els.busca.value = "";
  if (els.mes) els.mes.value = getDefaultMonthStr();
  if (els.tipo) els.tipo.value = "";
  if (els.peixe) els.peixe.value = "";
  if (els.hip) els.hip.value = "";
  selectedLocal = null;
  render();
  if (typeof syncStickyHeights === "function") {
    syncStickyHeights();
  }
  if (typeof scrollPageToTop === "function") {
    scrollPageToTop();
  }
}

function render() {
  const t = I18N[currentLang];
  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const districtRows = rows.filter((r) => r.distrito === currentDistrito);
  const query = els.busca ? els.busca.value.trim().toLowerCase() : "";
  const mes = els.mes ? els.mes.value : "";
  const minRank = els.hip ? Number(els.hip.value) || 0 : 0;

  saveSpotsState();
  updateFilterResetButton();
  if (typeof renderTideBar === "function") {
    renderTideBar(els.contagem);
  }

  const hits = districtRows.filter(
    (r) =>
      (!query || r.local.toLowerCase().includes(query)) &&
      (mes === "" || r.meses.has(Number(mes))) &&
      (!els.tipo.value || r.tipo === els.tipo.value) &&
      (!els.peixe.value || r.peixe === els.peixe.value) &&
      r.rank >= minRank,
  );

  const groups = new Map();
  hits.forEach((r) => groups.set(r.local, [...(groups.get(r.local) || []), r]));
  currentGroups = groups;

  if (typeof updateMapMarkers === "function") {
    updateMapMarkers(groups);
  }

  if (els.contagem) {
    els.contagem.textContent = t.count(hits.length, districtRows.length);
  }

  if (!els.lista) return;

  if (!hits.length) {
    els.lista.innerHTML = `
      <div class="vazio">
        <p style="margin:0">${t.empty}</p>
        <button type="button" id="btn-reset-filters" class="btn-limpar">${t.clearFilters}</button>
      </div>`;
    $("btn-reset-filters").addEventListener("click", resetAllFilters);
    return;
  }

  const tideLinkLabel = lang === "pt" ? "🌊 Marés ↗" : "🌊 Tides ↗";
  const tideLinkTitle =
    lang === "pt"
      ? "Ver tábua de marés específica deste pesqueiro"
      : "View specific tide table for this spot";
  const speciesJumpTitle =
    lang === "pt"
      ? "Ver ficha de identificação desta espécie"
      : "View species identification card";

  els.lista.innerHTML = [...groups]
    .map(([name, items]) => {
      const tideHref =
        typeof getLocalTideUrl === "function"
          ? getLocalTideUrl(name)
          : "https://tabuademares.com/pt/aveiro/aveiro#_mares";
      return `
    <section class="local" id="${slugify(name)}">
      <h2 class="local-header">
        <button type="button" class="local-link" data-local="${name}" title="${t.verNoMapa}">
          <span>${name}</span>
        </button>
        <a href="${tideHref}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link local-tide-link" title="${tideLinkTitle}">${tideLinkLabel}</a>
      </h2>
      <p class="tipo">${[...new Set(items.map((i) => i.tipo))].join(" · ")}</p>
      ${items
        .map(
          (r) => `
        <details class="peixe">
          <summary>
            <button type="button" class="species-jump-link" data-species="${r.peixe}" title="${speciesJumpTitle}" style="background:none;border:none;padding:0;font:inherit;font-weight:700;color:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer;">${r.peixe}</button>
            <span class="epoca">${r.epoca}</span>
            <span class="min" title="Tamanho mínimo legal">${t.minLabel} ${r.min} cm</span>
            <span class="chip c${r.rank}">${r.hip}</span>
          </summary>
          <dl>
            ${field(t.fHorario, r.horario)}
            ${field(t.fMare, r.mare)}
            ${field(t.fPreferencia, r.preferencia)}
            ${field(
              t.fIsco,
              typeof formatAmostraWithLinks === "function"
                ? formatAmostraWithLinks(r.isco)
                : r.isco,
            )}
            ${field(
              t.fAmostra,
              typeof formatAmostraWithLinks === "function"
                ? formatAmostraWithLinks(r.amostra)
                : r.amostra,
            )}
            ${field(t.fTecnica, r.tecnica)}
            ${field(t.fMovimento, r.movimento)}
          </dl>
        </details>`,
        )
        .join("")}
    </section>`;
    })
    .join("");

  els.lista.querySelectorAll(".local-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof focusLocalOnMap === "function") {
        focusLocalOnMap(btn.dataset.local);
      }
    });
  });

  els.lista.querySelectorAll(".species-jump-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.jumpToSpeciesCard === "function") {
        window.jumpToSpeciesCard(btn.dataset.species);
      }
    });
  });
}

window.jumpToSpecies = function (speciesName) {
  if (!speciesName) return;

  if (typeof activateMainTab === "function") {
    activateMainTab("pesqueiros");
  } else {
    const pesqBtn = document.getElementById("tab-pesqueiros");
    if (pesqBtn) pesqBtn.click();
  }

  if (els.busca) els.busca.value = "";
  if (els.tipo) els.tipo.value = "";
  if (els.hip) els.hip.value = "";
  selectedLocal = null;

  if (els.peixe) {
    const normalize = (s) =>
      String(s || "")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/s$/, "")
        .trim();

    const target = normalize(speciesName);
    const matchOpt = Array.from(els.peixe.options).find((opt) => {
      if (!opt.value) return false;
      const val = normalize(opt.value);
      return val === target || val.includes(target) || target.includes(val);
    });

    if (matchOpt) {
      els.peixe.value = matchOpt.value;
    }
  }

  render();

  if (typeof syncStickyHeights === "function") {
    syncStickyHeights();
  }
  if (typeof scrollPageToTop === "function") {
    scrollPageToTop();
  }
};

// Eventos dos filtros
["mes", "tipo", "peixe", "hip"].forEach((id) => {
  if (els[id]) els[id].addEventListener("change", render);
});
if (els.busca) els.busca.addEventListener("input", render);

// Evento do botão PT / EN
const langToggleBtn = $("lang-toggle");
if (langToggleBtn) {
  langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    applyLanguage();
  });
}

// Inicialização
if (typeof initMap === "function") {
  initMap();
}
populateFilters(true);
if (savedSpotsState && savedSpotsState.lang) {
  applyLanguage();
} else {
  render();
  if (typeof renderEquipamento === "function") {
    renderEquipamento();
  }
  if (typeof renderLinksTab === "function") {
    renderLinksTab();
  }
  if (typeof renderSpeciesTab === "function") {
    renderSpeciesTab();
  }
}
if (typeof syncStickyHeights === "function") {
  syncStickyHeights();
}
