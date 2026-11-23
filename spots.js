// =========================================================
// PESQUEIROS: Filtros, Idioma, Marés/Lua e Renderização
// =========================================================

const SPOTS_STATE_KEY = "almanac-spots-state-v1";

function getDefaultMonthStr() {
  return String(new Date().getMonth());
}

function saveSpotsState() {
  try {
    const state = {
      lang: typeof currentLang !== "undefined" ? currentLang : "pt",
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

function injectResponsiveAndTooltipStyles() {
  if (document.getElementById("spots-responsive-styles")) return;
  const style = document.createElement("style");
  style.id = "spots-responsive-styles";
  style.textContent = `
    .tide-badge-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: help;
    }
    .tide-badge-tip {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      bottom: calc(100% + 8px);
      left: 0;
      width: min(290px, 82vw);
      padding: 8px 11px;
      border-radius: 8px;
      background: #141c24;
      color: #f4f7fa;
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
      font-size: 0.78rem;
      font-weight: 400;
      line-height: 1.4;
      z-index: 60;
      pointer-events: none;
      transition: opacity 0.14s ease, visibility 0.14s ease;
    }
    .tide-badge-wrap:hover .tide-badge-tip,
    .tide-badge-wrap:focus-within .tide-badge-tip,
    .tide-badge-wrap:active .tide-badge-tip {
      visibility: visible;
      opacity: 1;
    }

    /* Barra de filtros recolhível e fixa por baixo da barra do distrito (Aveiro) em mobile */
    .mobile-filtros-bar {
      display: none;
    }

    @media (max-width: 768px) {
      .mobile-filtros-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        width: 100%;
        position: sticky;
        top: var(--sticky-top-offset, 0px);
        z-index: 35;
        background: var(--paper);
        padding: 8px 0;
        margin-bottom: 8px;
        border-bottom: 1px solid var(--line);
      }
      .mobile-filtros-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 12px;
        border-radius: 8px;
        border: 1px solid var(--line);
        background: var(--panel-alt, var(--panel));
        color: var(--text);
        font-size: 0.84rem;
        font-weight: 600;
        cursor: pointer;
        flex-shrink: 0;
      }
      .mobile-filtros-summary {
        font-size: 0.78rem;
        color: var(--muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .filtros.is-collapsed-mobile {
        display: none !important;
      }
      .filtros:not(.is-collapsed-mobile) {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 8px !important;
        position: sticky;
        top: calc(var(--sticky-top-offset, 0px) + 46px);
        z-index: 34;
        background: var(--paper, var(--bg, #0d131a));
        padding-bottom: 10px;
        border-bottom: 1px solid var(--line);
      }
      .filtros:not(.is-collapsed-mobile) > *:first-child {
        grid-column: 1 / -1 !important;
      }
      .filtros:not(.is-collapsed-mobile) label {
        font-size: 0.75rem !important;
        margin-bottom: 2px !important;
      }
      .filtros:not(.is-collapsed-mobile) input,
      .filtros:not(.is-collapsed-mobile) select {
        padding: 6px 8px !important;
        font-size: 0.84rem !important;
        min-height: 34px !important;
      }
    }
  `;
  document.head.appendChild(style);
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

function updateStickyHeaderOffset() {
  const bar = document.getElementById("mobile-filtros-bar");
  const candidates = document.querySelectorAll(
    "header, .topbar, .site-header, .tabs, .nav-tabs, .distrito-bar, .district-bar, [class*='distrito'], [class*='header'], [class*='nav']",
  );
  let maxBottom = 0;

  candidates.forEach((el) => {
    if (!el || (bar && (el === bar || el.contains(bar)))) return;
    const style = window.getComputedStyle(el);
    if (style.position === "sticky" || style.position === "fixed") {
      const rect = el.getBoundingClientRect();
      if (rect.height > 0 && rect.top >= -1 && rect.bottom > maxBottom && rect.bottom < window.innerHeight * 0.6) {
        maxBottom = Math.ceil(rect.bottom);
      }
    }
  });

  if (maxBottom === 0) {
    const fallback = document.querySelector("header, .topbar, .site-header");
    if (fallback) {
      maxBottom = Math.ceil(fallback.getBoundingClientRect().height);
    }
  }

  document.documentElement.style.setProperty("--sticky-top-offset", `${maxBottom}px`);
}

function ensureMobileFilterToggle() {
  const form = document.querySelector(".filtros");
  if (!form) return;

  injectResponsiveAndTooltipStyles();

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
      updateStickyHeaderOffset();
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

  updateStickyHeaderOffset();
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
    wrap.style.cssText =
      "grid-column: 1 / -1; width: 100%; display: flex; align-items: center; justify-content: flex-end; margin-top: 2px;";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btn-clear-filtros-top";
    btn.className = "btn-limpar";
    btn.style.cssText =
      "white-space: nowrap; height: fit-content; margin-left: auto;";
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

  const active = hasActiveFilters();
  wrap.style.display = active ? "flex" : "none";
}

function formatHourMinute(totalHours) {
  let h = Math.floor(totalHours) % 24;
  if (h < 0) h += 24;
  let m = Math.round((totalHours - Math.floor(totalHours)) * 60);
  if (m === 60) {
    m = 0;
    h = (h + 1) % 24;
  }
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function getMoonAndTideInfo(lang = "pt") {
  const now = new Date();
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14, 0);
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000;
  const phaseRatio =
    ((((now.getTime() - knownNewMoon) % synodicMonth) + synodicMonth) %
      synodicMonth) /
    synodicMonth;
  const lunarAgeDays = phaseRatio * 29.530588853;

  const springTide =
    phaseRatio < 0.0625 ||
    phaseRatio >= 0.9375 ||
    (phaseRatio >= 0.4375 && phaseRatio < 0.5625);

  const tidePeriodHours = 12.4206;
  const halfPeriod = tidePeriodHours / 2;
  const currentHours = now.getHours() + now.getMinutes() / 60;
  const highWaterOffset = (lunarAgeDays * 0.812 + 2.25) % tidePeriodHours;
  let hoursSinceHigh = (currentHours - highWaterOffset) % tidePeriodHours;
  if (hoursSinceHigh < 0) hoursSinceHigh += tidePeriodHours;

  const tideCyclePos = hoursSinceHigh / tidePeriodHours;
  let tideStatePt = "";
  let tideStateEn = "";
  let tideTipPt = "";
  let tideTipEn = "";

  if (tideCyclePos < 0.08 || tideCyclePos > 0.92) {
    tideStatePt = "Preia-mar (estofa) ⏸";
    tideStateEn = "High tide (slack) ⏸";
    tideTipPt =
      "Maré cheia parada (reponto): a corrente abranda antes de virar. Ótimo momento nos molhes, canais e praias antes de começar a vazar.";
    tideTipEn =
      "High slack water: current slows down before turning. Great window along jetties, channels, and beaches before the ebb starts.";
  } else if (tideCyclePos >= 0.42 && tideCyclePos <= 0.58) {
    tideStatePt = "Baixa-mar (estofa) ⏸";
    tideStateEn = "Low tide (slack) ⏸";
    tideTipPt =
      "Maré vazia parada (reponto): água no nível mínimo. Bom para pescar nos fundões e canais principais da Ria e preparar a enchente.";
    tideTipEn =
      "Low slack water: water at its lowest level. Good for deep channels in the lagoon and preparing for the incoming flood.";
  } else if (tideCyclePos < 0.5) {
    tideStatePt = "Maré a vazar (a descer) ↘";
    tideStateEn = "Ebbing tide (falling) ↘";
    tideTipPt =
      "A água está a sair da Ria para o mar, arrastando alimento. Muito produtivo junto à barra, pontes, canais estreitos e molhes.";
    tideTipEn =
      "Water is draining out to sea, carrying bait. Very productive near the inlet, bridges, narrow channels, and jetties.";
  } else {
    tideStatePt = "Maré a encher (a subir) ↗";
    tideStateEn = "Flooding tide (rising) ↗";
    tideTipPt =
      "Água limpa e oxigenada a entrar pela Ria e praias, trazendo peixe para comer nos baixios, esteiros e rebentação.";
    tideTipEn =
      "Fresh, oxygenated water pushing into the lagoon and surf, bringing feeding fish onto flats, creeks, and sandbars.";
  }

  const events = [];
  for (let k = -2; k <= 3; k++) {
    const hw = highWaterOffset + k * tidePeriodHours;
    if (hw >= 0 && hw < 24) {
      events.push({ time: hw, type: "HW" });
    }
    const lw = hw + halfPeriod;
    if (lw >= 0 && lw < 24) {
      events.push({ time: lw, type: "LW" });
    }
  }
  events.sort((a, b) => a.time - b.time);

  const scheduleParts = events.map((ev) => {
    const hhmm = formatHourMinute(ev.time);
    if (ev.type === "HW") {
      return lang === "pt" ? `Preia-mar ${hhmm}` : `High water ${hhmm}`;
    }
    return lang === "pt" ? `Baixa-mar ${hhmm}` : `Low water ${hhmm}`;
  });

  const amplitudePt = springTide ? "Marés vivas" : "Marés mortas / intermédias";
  const amplitudeEn = springTide ? "Spring tides" : "Neap / moderate tides";

  const amplitudeTipPt = springTide
    ? "Maré mais forte (Lua Nova / Cheia): correntes intensas e fundos remexidos atraem mais peixe (robalo, dourada), mas exige chumbadas pesadas e atenção às algas."
    : "Maré mais calma (Quarto Crescente / Minguante): corrente fraca a moderada e água mais limpa; permite pescar com chumbadas leves, mas com menos movimento de peixe.";

  const amplitudeTipEn = springTide
    ? "Stronger tide (New / Full Moon): heavy currents stir up food and trigger more fish activity, but require heavier sinkers and watching for weed drift."
    : "Calmer tide (Quarter Moons): weak-to-moderate current and clearer water; lets you fish lighter sinkers, though fish activity is steadier/slower.";

  return {
    amplitudeLabel: lang === "pt" ? amplitudePt : amplitudeEn,
    amplitudeTip: lang === "pt" ? amplitudeTipPt : amplitudeTipEn,
    tideLabel: lang === "pt" ? tideStatePt : tideStateEn,
    tideTip: lang === "pt" ? tideTipPt : tideTipEn,
    scheduleText:
      scheduleParts.length > 0
        ? (lang === "pt" ? "Marés hoje: " : "Today's tides: ") +
          scheduleParts.join(" · ")
        : "",
    note:
      lang === "pt"
        ? "Est. Aveiro (interior da Ria atrasa +45 a +90 min)"
        : "Est. Aveiro (inner lagoon lags +45 to +90 min)",
    linkText: lang === "pt" ? "Tábua de Marés Aveiro ↗" : "Aveiro Tide Table ↗",
  };
}

function getLocalTideUrl(localName) {
  const n = (localName || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  let slug = "aveiro";

  if (n.includes("meia laranja")) slug = "aveiro";
  else if (n.includes("carregal")) slug = "carregal";
  else if (n.includes("varela")) slug = "varela";
  else if (n.includes("torreira") || n.includes("bestida")) slug = "torreira";
  else if (n.includes("sao jacinto") || n.includes("quebramar norte"))
    slug = "sao-jacinto";
  else if (
    n.includes("costa nova") ||
    n.includes("praia da barra") ||
    n.includes("quebramar sul")
  )
    slug = "costa-nova";
  else if (n.includes("vagueira")) slug = "vagueira";
  else if (n.includes("furadouro") || n.includes("tijosa")) slug = "furadouro";
  else if (n.includes("esmoriz")) slug = "esmoriz";
  else if (n.includes("espinho")) slug = "espinho";
  else if (
    n.includes("cais do bico") ||
    n.includes("mourao") ||
    n.includes("pardelhas")
  )
    slug = "cais-do-bico";
  else if (n.includes("pardilho") || n.includes("ribeira da aldeia"))
    slug = "pardilho";
  else if (
    n.includes("ovar") ||
    n.includes("cova do chegado") ||
    n.includes("torrao")
  )
    slug = "ovar";
  else if (n.includes("estarreja")) slug = "estarreja";
  else if (n.includes("salreu")) slug = "salreu";
  else if (n.includes("canelas")) slug = "canelas";
  else if (n.includes("cacia")) slug = "cacia";
  else if (n.includes("esgueira")) slug = "esgueira";
  else if (n.includes("vista alegre")) slug = "vista-alegre";
  else if (n.includes("gafanha do carmo")) slug = "gafanha-do-carmo";
  else if (n.includes("cais comercial")) slug = "cais-comercial";
  else if (n.includes("cais da pedra")) slug = "cais-da-pedra";
  else if (n.includes("ponte cais")) slug = "ponte-cais-n-2";
  else if (n.includes("lota")) slug = "lota";
  else if (n.includes("miradouro")) slug = "miradouro";
  else if (n.includes("moranzel")) slug = "moranzel";
  else if (n.includes("parrachil")) slug = "parrachil";
  else if (n.includes("puxadouro")) slug = "puxadouro";
  else if (n.includes("manchao")) slug = "ribeira-do-manchao";
  else if (n.includes("vala rainha")) slug = "vala-rainha";
  else if (n.includes("boco")) slug = "boco";

  return `https://tabuademares.com/pt/aveiro/${slug}#_mares`;
}

function renderTideBar() {
  if (!els.contagem) return;
  injectResponsiveAndTooltipStyles();

  let bar = document.getElementById("tide-moon-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "tide-moon-bar";
    bar.style.cssText =
      "display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:10px 14px;margin:10px 0 14px;border-radius:10px;background:var(--panel);border:1px solid var(--line);font-size:0.86rem;";
    els.contagem.insertAdjacentElement("afterend", bar);
  }

  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const info = getMoonAndTideInfo(lang);

  bar.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:5px;">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
        <span class="tide-badge-wrap" tabindex="0" title="${info.tideTip}">
          <span style="padding:3px 10px;border-radius:999px;background:var(--panel-alt);border:1px solid var(--line);font-weight:600;">🌊 ${info.tideLabel}</span>
          <span class="tide-badge-tip" role="tooltip">${info.tideTip}</span>
        </span>
        <span class="tide-badge-wrap" tabindex="0" title="${info.amplitudeTip}">
          <span style="padding:3px 10px;border-radius:999px;background:var(--panel-alt);border:1px solid var(--line);font-weight:600;">🌓 ${info.amplitudeLabel}</span>
          <span class="tide-badge-tip" role="tooltip">${info.amplitudeTip}</span>
        </span>
      </div>
      ${
        info.scheduleText
          ? `<div style="font-size:0.82rem;color:var(--text);">${info.scheduleText}</div>`
          : ""
      }
      <div style="font-size:0.78rem;color:var(--muted);">${info.note}</div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      <a href="https://tabuademares.com/pt/aveiro/aveiro#_mares" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${info.linkText}</a>
    </div>
  `;
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
  setTextIfExists("tab-equipamento", t.tabEquipamento);
  setTextIfExists("lbl-busca", t.lblBusca);
  if (els.busca) els.busca.placeholder = t.buscaPlaceholder;
  setTextIfExists("lbl-mes", t.lblMes);
  setTextIfExists("lbl-tipo", t.lblTipo);
  setTextIfExists("lbl-peixe", t.lblPeixe);
  setTextIfExists("lbl-hip", t.lblHip);
  setTextIfExists("regras-titulo", t.regrasTitulo);
  setTextIfExists("equipamento-placeholder", t.equipPlaceholder);

  populateFilters(false);
  render();
  if (typeof renderEquipamento === "function") {
    renderEquipamento();
  }
  updateStickyHeaderOffset();
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
  updateStickyHeaderOffset();
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
  renderTideBar();

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

  els.lista.innerHTML = [...groups]
    .map(
      ([name, items]) => `
    <section class="local" id="${slugify(name)}">
      <h2 style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">
        <button type="button" class="local-link" data-local="${name}" title="${t.verNoMapa}">
          <span>${name}</span>
        </button>
        <a href="${getLocalTideUrl(name)}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link" style="font-size:0.78rem;font-weight:500;" title="${tideLinkTitle}">${tideLinkLabel}</a>
      </h2>
      <p class="tipo">${[...new Set(items.map((i) => i.tipo))].join(" · ")}</p>
      ${items
        .map(
          (r) => `
        <details class="peixe">
          <summary>
            <span class="nome">${r.peixe}</span>
            <span class="epoca">${r.epoca}</span>
            <span class="min" title="Tamanho mínimo legal">${t.minLabel} ${r.min} cm</span>
            <span class="chip c${r.rank}">${r.hip}</span>
          </summary>
          <dl>
            ${field(t.fHorario, r.horario)}
            ${field(t.fMare, r.mare)}
            ${field(t.fPreferencia, r.preferencia)}
            ${field(t.fIsco, r.isco)}
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
    </section>`,
    )
    .join("");

  els.lista.querySelectorAll(".local-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof focusLocalOnMap === "function") {
        focusLocalOnMap(btn.dataset.local);
      }
    });
  });
}

// Eventos dos filtros
["mes", "tipo", "peixe", "hip"].forEach((id) => {
  if (els[id]) els[id].addEventListener("change", render);
});
if (els.busca) els.busca.addEventListener("input", render);
window.addEventListener("resize", updateStickyHeaderOffset);
window.addEventListener("scroll", updateStickyHeaderOffset, { passive: true });

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
}
updateStickyHeaderOffset();
if (typeof syncStickyHeights === "function") {
  syncStickyHeights();
}
