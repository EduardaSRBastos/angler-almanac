// =========================================================
// PESQUEIROS: FILTROS, IDIOMA E RENDERIZAÇÃO DA LISTA
// =========================================================
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
  if (el) el.textContent = text;
}

function saveSpotsFilters() {
  sessionStorage.setItem(
    "almanac-spots-filters",
    JSON.stringify({
      busca: els.busca ? els.busca.value : "",
      mes: els.mes ? els.mes.value : "",
      tipo: els.tipo ? els.tipo.value : "",
      peixe: els.peixe ? els.peixe.value : "",
      hip: els.hip ? els.hip.value : "",
    }),
  );
}

function loadSpotsFilters() {
  try {
    const raw = sessionStorage.getItem("almanac-spots-filters");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
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
  const saved = initial ? loadSpotsFilters() : null;

  const prevMes = saved
    ? saved.mes
    : initial
      ? String(new Date().getMonth())
      : els.mes.value;
  const prevTipo = saved ? saved.tipo : els.tipo.value;
  const prevPeixe = saved ? saved.peixe : els.peixe.value;
  const prevHip = saved ? saved.hip : els.hip.value;

  if (saved && typeof saved.busca === "string" && els.busca) {
    els.busca.value = saved.busca;
  }

  const districtRows = rows.filter((r) => r.distrito === currentDistrito);

  if (els.mes) {
    els.mes.innerHTML =
      `<option value="">${t.allMonths}</option>` +
      t.months.map((m, i) => `<option value="${i}">${m}</option>`).join("");
    els.mes.value = prevMes;
  }

  fill(els.tipo, unique(districtRows, "tipo"), t.allTypes, prevTipo);
  fill(els.peixe, unique(districtRows, "peixe"), t.allSpecies, prevPeixe);

  if (els.hip) {
    els.hip.innerHTML = `<option value="">${t.hipAny}</option><option value="3">${t.hipMed}</option><option value="5">${t.hipGood}</option>`;
    els.hip.value = prevHip;
  }
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
  if (typeof syncStickyHeights === "function") {
    syncStickyHeights();
  }
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
  if (els.mes) els.mes.value = "";
  if (els.tipo) els.tipo.value = "";
  if (els.peixe) els.peixe.value = "";
  if (els.hip) els.hip.value = "";
  selectedLocal = null;
  saveSpotsFilters();
  render();
}

function render() {
  const t = I18N[currentLang];
  const districtRows = rows.filter((r) => r.distrito === currentDistrito);
  const query = els.busca ? els.busca.value.trim().toLowerCase() : "";
  const mes = els.mes ? els.mes.value : "";
  const minRank = els.hip ? Number(els.hip.value) || 0 : 0;

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
    const resetBtn = $("btn-reset-filters");
    if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
    return;
  }

  els.lista.innerHTML = [...groups]
    .map(
      ([name, items]) => `
    <section class="local" id="${slugify(name)}">
      <h2>
        <button type="button" class="local-link" data-local="${name}" title="${t.verNoMapa}">
          <span>${name}</span>
        </button>
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
            ${field(t.fAmostra, typeof formatAmostraWithLinks === "function" ? formatAmostraWithLinks(r.amostra) : r.amostra)}
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

// --- Eventos de Filtros e Idioma ---
["mes", "tipo", "peixe", "hip"].forEach((id) => {
  if (els[id]) {
    els[id].addEventListener("change", () => {
      saveSpotsFilters();
      render();
      if (typeof scrollPageToTop === "function") scrollPageToTop();
    });
  }
});

if (els.busca) {
  els.busca.addEventListener("input", () => {
    saveSpotsFilters();
    render();
    if (typeof scrollPageToTop === "function") scrollPageToTop();
  });
}

const langToggleBtn = $("lang-toggle");
if (langToggleBtn) {
  langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    sessionStorage.setItem("almanac-lang", currentLang);
    applyLanguage();
  });
}

// --- Inicialização da Aplicação ---
if (typeof initMap === "function") {
  initMap();
}
populateFilters(true);
applyLanguage();
