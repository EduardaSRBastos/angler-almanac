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

function fill(select, values, first, keepValue) {
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
  const prevMes = initial ? String(new Date().getMonth()) : els.mes.value;
  const prevTipo = els.tipo.value;
  const prevPeixe = els.peixe.value;
  const prevHip = els.hip.value;

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

function applyLanguage() {
  const t = I18N[currentLang];
  document.documentElement.lang = currentLang;
  document.title = t.title;
  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl) metaDescEl.setAttribute("content", t.metaDesc);

  $("site-title").textContent = t.title;
  $("site-sub").textContent = t.sub;
  $("lang-toggle").textContent = t.toggleBtn;
  $("tab-pesqueiros").textContent = t.tabPesqueiros;
  $("tab-equipamento").textContent = t.tabEquipamento;
  $("lbl-busca").textContent = t.lblBusca;
  $("busca").placeholder = t.buscaPlaceholder;
  $("lbl-mes").textContent = t.lblMes;
  $("lbl-tipo").textContent = t.lblTipo;
  $("lbl-peixe").textContent = t.lblPeixe;
  $("lbl-hip").textContent = t.lblHip;
  $("regras-titulo").textContent = t.regrasTitulo;
  const equipPlaceholder = $("equipamento-placeholder");
  if (equipPlaceholder) equipPlaceholder.textContent = t.equipPlaceholder;

  populateFilters(false);
  render();
  if (typeof renderEquipamento === "function") {
    renderEquipamento();
  }
  syncStickyHeights();
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
  els.busca.value = "";
  els.mes.value = "";
  els.tipo.value = "";
  els.peixe.value = "";
  els.hip.value = "";
  selectedLocal = null;
  render();
}

function render() {
  const t = I18N[currentLang];
  const districtRows = rows.filter((r) => r.distrito === currentDistrito);
  const query = els.busca.value.trim().toLowerCase();
  const mes = els.mes.value;
  const minRank = Number(els.hip.value) || 0;

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

  els.contagem.textContent = t.count(hits.length, districtRows.length);
  if (!hits.length) {
    els.lista.innerHTML = `
      <div class="vazio">
        <p style="margin:0">${t.empty}</p>
        <button type="button" id="btn-reset-filters" class="btn-limpar">${t.clearFilters}</button>
      </div>`;
    $("btn-reset-filters").addEventListener("click", resetAllFilters);
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
["mes", "tipo", "peixe", "hip"].forEach((id) =>
  els[id].addEventListener("change", () => {
    render();
    scrollPageToTop();
  }),
);

els.busca.addEventListener("input", () => {
  render();
  scrollPageToTop();
});

$("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  applyLanguage();
});

// --- Inicialização da Aplicação ---
if (typeof initMap === "function") {
  initMap();
}
populateFilters(true);
render();
if (typeof renderEquipamento === "function") {
  renderEquipamento();
}
syncStickyHeights();
