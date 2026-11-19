const MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];
const RANK = {
  Baixa: 1,
  "Baixa a média": 2,
  Média: 3,
  "Média a boa": 4,
  Boa: 5,
};

const I18N = {
  pt: {
    title: "Almanaque do Pescador",
    sub: "Guia prático de pesqueiros, épocas, iscos e regras.",
    toggleBtn: "EN",
    tabPesqueiros: "Pesqueiros",
    tabEquipamento: "Equipamento",
    lblMes: "Mês",
    lblTipo: "Tipo de água",
    lblPeixe: "Espécie",
    lblHip: "Hipóteses de captura",
    allMonths: "Todos os meses",
    allTypes: "Todos os tipos",
    allSpecies: "Todas as espécies",
    hipAny: "Qualquer",
    hipMed: "Média ou melhor",
    hipGood: "Só Boa",
    months: [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ],
    count: (hits, total) => `${hits} de ${total} entradas`,
    empty:
      "Nada com estes filtros. Experimenta outro mês ou baixa o mínimo de hipóteses.",
    minLabel: "mín.",
    fHorario: "Horário",
    fMare: "Maré / corrente",
    fIsco: "Isco",
    fAmostra: "Amostra",
    fTecnica: "Técnica",
    fMovimento: "Movimento",
    regrasTitulo: "Regras a confirmar antes de ires",
    equipPlaceholder: "Em breve: guia de tipos de canas, montagens e carretos.",
    metaDesc:
      "Almanaque do Pescador — um guia de pesca com os melhores locais, o que apanhar e quando, dicas de equipamento, regras e muito mais.",
  },
  en: {
    title: "Angler's Almanac",
    sub: "Practical guide to fishing spots, seasons, baits, and regulations.",
    toggleBtn: "PT",
    tabPesqueiros: "Spots",
    tabEquipamento: "Gear & Rods",
    lblMes: "Month",
    lblTipo: "Water type",
    lblPeixe: "Species",
    lblHip: "Catch odds",
    allMonths: "All months",
    allTypes: "All types",
    allSpecies: "All species",
    hipAny: "Any",
    hipMed: "Medium or better",
    hipGood: "Good only",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    count: (hits, total) => `${hits} of ${total} entries`,
    empty:
      "No matches for these filters. Try another month or lower the minimum catch odds.",
    minLabel: "min.",
    fHorario: "Best time",
    fMare: "Tide / current",
    fIsco: "Bait",
    fAmostra: "Lure",
    fTecnica: "Technique",
    fMovimento: "Retrieve / action",
    regrasTitulo: "Rules to check before heading out",
    equipPlaceholder: "Coming soon: guide to rod types, rigs, and reels.",
    metaDesc:
      "Angler's Almanac — a fishing guide with top spots, what to catch and when, gear tips, rules, and much more.",
  },
};

const $ = (id) => document.getElementById(id);

let currentLang = "pt";
let currentDistrito = "aveiro";

// --- Gestão de Tema (Claro / Escuro) ---
const themeBtn = $("theme-toggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("almanac-theme", theme);
}

const savedTheme =
  localStorage.getItem("almanac-theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const next =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  applyTheme(next);
});

// Ano no rodapé
$("year").textContent = new Date().getFullYear();

function seasonMonths(text) {
  const set = new Set();
  text.split(" e ").forEach((part) => {
    const [a, b] = part.toLowerCase().split("-");
    const start = MONTHS.indexOf(a);
    const end = b === undefined ? start : MONTHS.indexOf(b);
    for (let k = start; ; k = (k + 1) % 12) {
      set.add(k);
      if (k === end) break;
    }
  });
  return set;
}

// Parse do objeto RAW definido em data.js
const rows = [];
Object.entries(RAW).forEach(([distrito, rawText]) => {
  let tipo = "",
    local = "";
  rawText
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.startsWith("#")) {
        [tipo, local] = line
          .slice(1)
          .split("|")
          .map((s) => s.trim());
        return;
      }
      if (line.startsWith("//") || !line.trim()) return;
      const f = line.split("|").map((s) => s.trim());
      rows.push({
        distrito,
        tipo,
        local,
        peixe: f[0],
        epoca: f[1],
        horario: f[2],
        mare: f[3],
        isco: f[4],
        amostra: f[5],
        preferencia: f[6],
        tecnica: f[7],
        movimento: f[8],
        min: f[9],
        hip: f[10],
        meses: seasonMonths(f[1]),
        rank: RANK[f[10]] || 0,
      });
    });
});

const els = {
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
  $("site-title").textContent = t.title;
  $("site-sub").textContent = t.sub;
  $("lang-toggle").textContent = t.toggleBtn;
  $("tab-pesqueiros").textContent = t.tabPesqueiros;
  $("tab-equipamento").textContent = t.tabEquipamento;
  $("lbl-mes").textContent = t.lblMes;
  $("lbl-tipo").textContent = t.lblTipo;
  $("lbl-peixe").textContent = t.lblPeixe;
  $("lbl-hip").textContent = t.lblHip;
  $("regras-titulo").textContent = t.regrasTitulo;
  $("equipamento-placeholder").textContent = t.equipPlaceholder;

  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl) metaDescEl.setAttribute("content", t.metaDesc);

  populateFilters(false);
  render();
}

function field(label, value) {
  return value && value !== "—"
    ? `<div><dt>${label}</dt><dd>${value}</dd></div>`
    : "";
}

function render() {
  const t = I18N[currentLang];
  const districtRows = rows.filter((r) => r.distrito === currentDistrito);
  const mes = els.mes.value;
  const minRank = Number(els.hip.value) || 0;

  const hits = districtRows.filter(
    (r) =>
      (mes === "" || r.meses.has(Number(mes))) &&
      (!els.tipo.value || r.tipo === els.tipo.value) &&
      (!els.peixe.value || r.peixe === els.peixe.value) &&
      r.rank >= minRank,
  );

  const groups = new Map();
  hits.forEach((r) => groups.set(r.local, [...(groups.get(r.local) || []), r]));

  updateMapMarkers(groups); // <--- ADICIONA ESTA LINHA

  els.contagem.textContent = t.count(hits.length, districtRows.length);
  if (!hits.length) {
    els.lista.innerHTML = `<p class="vazio">${t.empty}</p>`;
    return;
  }

  els.lista.innerHTML = [...groups]
    .map(
      ([name, items]) => `
    <section class="local">
      <h2>${name}</h2>
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
            ${field(t.fHorario, r.horario)}${field(t.fMare, r.mare)}
            ${field(t.fIsco, r.isco)}${field(t.fAmostra, r.amostra)}
            ${field(t.fTecnica, r.tecnica)}${field(t.fMovimento, r.movimento)}
          </dl>
        </details>`,
        )
        .join("")}
    </section>`,
    )
    .join("");
}

// Eventos dos filtros
["mes", "tipo", "peixe", "hip"].forEach((id) =>
  els[id].addEventListener("change", render),
);

// Evento do botão PT / EN
$("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  applyLanguage();
});

// Eventos dos separadores (Tabs)
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    const target = btn.dataset.tab;
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.hidden = panel.id !== `panel-${target}`;
    });
  });
});

// Eventos dos botões de Distrito
document.querySelectorAll(".distrito-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".distrito-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentDistrito = btn.dataset.distrito;
    populateFilters(false);
    render();
  });
});

// Coordenadas GPS reais dos pesqueiros (Aveiro)
const COORDS = {
  "Cais da Tijosa / Canal de Ovar (Ovar)": [40.8615, -8.651],
  "Cais do Carregal (Ovar)": [40.8481, -8.6582],
  "Cais da Cova do Chegado (Ovar)": [40.8355, -8.663],
  "Cais do Torrão (Válega, Ovar)": [40.818, -8.6595],
  "Cais da Ribeira da Aldeia (Pardilhó, Estarreja)": [40.7995, -8.6435],
  "Cais da Ribeira do Mourão (Bunheiro, Murtosa)": [40.7685, -8.6655],
  "Cais da Ribeira de Pardelhas (Murtosa)": [40.7425, -8.6672],
  "Cais do Bico (Murtosa)": [40.7289, -8.6698],
  "Cais da Béstida (Torreira, Murtosa)": [40.7638, -8.6865],
  "Ponte da Varela (Torreira, Murtosa)": [40.7589, -8.6881],
  "Canal de Ovar / Murtosa (Carregal / Torreira)": [40.795, -8.674],
  "Praia do Furadouro (Ovar)": [40.8712, -8.6775],
  "Praia da Torreira (Murtosa)": [40.7618, -8.7135],
  "Molhe Norte da Barra / São Jacinto (Aveiro)": [40.6448, -8.7555],
  "Quebramar Norte da Barra / São Jacinto (Aveiro)": [40.653, -8.7495],
  "Praia de São Jacinto (Aveiro)": [40.6685, -8.746],
  "Canal de Mira / Jardim Oudinot (Gafanha da Nazaré, Ílhavo)": [
    40.6355, -8.729,
  ],
  "Triângulo / Meia Laranja (Canal de Mira, Ílhavo)": [40.6378, -8.7385],
  "Cais da Bruxa / Gafanha da Encarnação (Ílhavo)": [40.6135, -8.741],
  "Molhe Sul da Barra / Costa Nova (Ílhavo)": [40.6415, -8.754],
  "Molhes da Costa Nova (Ílhavo)": [40.612, -8.7565],
  "Praia da Barra / Costa Nova (Ílhavo)": [40.6285, -8.752],
};

// Conversão de Latitude/Longitude da Ria de Aveiro para coordenadas SVG (viewBox 0 0 600 420)
function geoToSvg(lat, lon) {
  const minLat = 40.595,
    maxLat = 40.89;
  const minLon = -8.785,
    maxLon = -8.615;
  const x = ((lon - minLon) / (maxLon - minLon)) * 600;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 420;
  return [Math.round(x), Math.round(y)];
}

let mapView = { x: 0, y: 0, w: 600, h: 420 };

function initMap() {
  const box = document.getElementById("mapa-pesqueiros");
  if (!box) return;

  box.innerHTML = `
    <svg id="mapa-svg" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-label="Mapa da Ria de Aveiro" style="cursor:grab">
      <!-- Continente estendido (margem nascente) -->
      <path class="mapa-terra" d="M 380,-300 L 1000,-300 L 1000,800 L 120,800 L 200,350 L 260,310 L 340,260 L 395,210 L 415,150 L 450,110 L 470,50 Z" />
      <!-- Restinga de São Jacinto / Torreira / Furadouro (norte da Barra) -->
      <path class="mapa-terra" d="M 365,-300 L 475,-300 L 445,0 L 420,95 L 365,175 L 330,235 L 250,295 L 145,342 L 112,346 L 118,325 L 210,245 L 295,140 Z" />
      <!-- Restinga da Costa Nova / Barra (sul da Barra) -->
      <path class="mapa-terra" d="M 105,360 L 165,362 L 110,800 L 20,800 Z" />
      <!-- Ilhas interiores da Ria (Murtosa / Monte Branco) -->
      <path class="mapa-terra" d="M 355,195 L 385,190 L 380,225 L 345,235 Z" />
      <path class="mapa-terra" d="M 285,270 L 325,260 L 315,295 L 275,300 Z" />

      <!-- Etiquetas geográficas -->
      <text class="mapa-label" x="45" y="160">OCEANO ATLÂNTICO</text>
      <text class="mapa-label" x="480" y="75">Ovar</text>
      <text class="mapa-label" x="505" y="140">Estarreja</text>
      <text class="mapa-label" x="430" y="215">Murtosa</text>
      <text class="mapa-label" x="395" y="330">Aveiro</text>
      <text class="mapa-label" x="245" y="395">Ílhavo</text>

      <!-- Camada dinâmica dos marcadores -->
      <g id="mapa-pins"></g>
    </svg>
    <div style="position:absolute;top:10px;right:10px;display:flex;flex-direction:column;gap:4px;z-index:3;">
      <button type="button" id="zoom-in" class="icon-btn" style="padding:0.25rem 0.55rem;" title="Aproximar">+</button>
      <button type="button" id="zoom-out" class="icon-btn" style="padding:0.25rem 0.55rem;" title="Afastar">−</button>
      <button type="button" id="zoom-reset" class="icon-btn" style="padding:0.25rem 0.45rem;font-size:0.75rem;" title="Repor">↺</button>
    </div>
    <div id="mapa-popup" class="mapa-popup" hidden></div>
  `;

  const svg = document.getElementById("mapa-svg");
  // Limites máximos do mapa (onde existem polígonos desenhados)
  const BOUNDS = { minX: -150, maxX: 850, minY: -180, maxY: 650 };

  function clampView() {
    mapView.x = Math.max(
      BOUNDS.minX,
      Math.min(BOUNDS.maxX - mapView.w, mapView.x),
    );
    mapView.y = Math.max(
      BOUNDS.minY,
      Math.min(BOUNDS.maxY - mapView.h, mapView.y),
    );
  }

  const updateViewBox = () => {
    clampView();
    svg.setAttribute(
      "viewBox",
      `${mapView.x} ${mapView.y} ${mapView.w} ${mapView.h}`,
    );
  };

  function zoomBy(factor) {
    const minW = 180;
    const maxW = 900; // Máximo de zoom out permitido dentro dos limites
    const newW = Math.min(maxW, Math.max(minW, mapView.w * factor));
    const newH = newW * (420 / 600);
    mapView.x -= (newW - mapView.w) / 2;
    mapView.y -= (newH - mapView.h) / 2;
    mapView.w = newW;
    mapView.h = newH;
    updateViewBox();
  }

  // Botões de Zoom
  document
    .getElementById("zoom-in")
    .addEventListener("click", () => zoomBy(0.8));
  document
    .getElementById("zoom-out")
    .addEventListener("click", () => zoomBy(1.25));

  document.getElementById("zoom-reset").addEventListener("click", () => {
    mapView = { x: 0, y: 0, w: 600, h: 420 };
    updateViewBox();
  });

  // Zoom suave com roda do rato
  svg.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 0.85 : 1.15);
    },
    { passive: false },
  );

  // Arrastar (Pan) limitado às bordas do mapa
  let isDragging = false,
    startX = 0,
    startY = 0;
  svg.addEventListener("pointerdown", (e) => {
    if (e.target.classList.contains("mapa-pin")) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    svg.style.cursor = "grabbing";
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const scaleX = mapView.w / svg.clientWidth;
    const scaleY = mapView.h / svg.clientHeight;
    mapView.x -= (e.clientX - startX) * scaleX;
    mapView.y -= (e.clientY - startY) * scaleY;
    startX = e.clientX;
    startY = e.clientY;
    updateViewBox();
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
    svg.style.cursor = "grab";
  });

  // Fechar popup ao clicar fora dele (ou fora dos marcadores)
  document.addEventListener("click", (e) => {
    const popup = document.getElementById("mapa-popup");
    if (!popup || popup.hidden) return;
    if (!popup.contains(e.target) && !e.target.classList.contains("mapa-pin")) {
      popup.hidden = true;
    }
  });
}

function updateMapMarkers(groups) {
  const pinsLayer = document.getElementById("mapa-pins");
  const popup = document.getElementById("mapa-popup");
  if (!pinsLayer) return;

  pinsLayer.innerHTML = "";
  if (popup) popup.hidden = true;

  const svgNS = pinsLayer.namespaceURI;

  groups.forEach((items, localName) => {
    const coords = COORDS[localName];
    if (!coords) return;

    const [cx, cy] = geoToSvg(coords[0], coords[1]);
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", "6");
    circle.setAttribute("fill", "#5aa7c6");
    circle.setAttribute("stroke", "#ffffff");
    circle.setAttribute("stroke-width", "1.8");
    circle.setAttribute("class", "mapa-pin");

    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!popup) return;
      const peixes = items
        .map((i) => `<strong>${i.peixe}</strong> (${i.epoca})`)
        .join(" · ");
      popup.innerHTML = `
        <div class="mapa-popup-header">
          <div>
            <strong>${localName}</strong><br>
            <span style="color:var(--channel);font-size:0.8rem">${items[0].tipo}</span>
          </div>
          <button type="button" class="mapa-popup-close" aria-label="Fechar">✕</button>
        </div>
        <div>${peixes}</div>
      `;
      popup.hidden = false;
      popup.querySelector(".mapa-popup-close").addEventListener("click", () => {
        popup.hidden = true;
      });
    });

    pinsLayer.appendChild(circle);
  });
}

// Inicialização
initMap();
populateFilters(true);
render();
