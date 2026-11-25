// --- Mapa Interativo SVG ---
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
  "Molhe de São Jacinto (Aveiro)": [40.6462, -8.7535],
  "Molhe Norte da Barra / São Jacinto (Aveiro)": [40.6442, -8.7568],
  "Quebramar Norte da Barra / São Jacinto (Aveiro)": [40.653, -8.7495],
  "Praia de São Jacinto (Aveiro)": [40.6685, -8.746],
  "Canal de Mira / Jardim Oudinot (Gafanha da Nazaré, Ílhavo)": [
    40.6355, -8.729,
  ],
  "Molhe da Meia Laranja (Praia da Barra, Ílhavo)": [40.6388, -8.7398],
  "Triângulo / Meia Laranja (Canal de Mira, Ílhavo)": [40.6368, -8.7368],
  "Cais da Bruxa / Gafanha da Encarnação (Ílhavo)": [40.6135, -8.741],
  "Quebramar Sul da Barra / Costa Nova (Ílhavo)": [40.6408, -8.7565],
  "Molhe Sul da Barra / Costa Nova (Ílhavo)": [40.6422, -8.7525],
  "Molhes da Costa Nova (Ílhavo)": [40.612, -8.7565],
  "Praia da Barra / Costa Nova (Ílhavo)": [40.6285, -8.752],
};

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

function updateViewBox() {
  const svg = $("mapa-svg");
  if (!svg) return;
  clampView();
  svg.setAttribute(
    "viewBox",
    `${mapView.x} ${mapView.y} ${mapView.w} ${mapView.h}`,
  );
}

function setSelectedPin(localName) {
  selectedLocal = localName;
  document.querySelectorAll(".mapa-pin").forEach((pin) => {
    pin.classList.toggle("selected", pin.dataset.local === localName);
  });
}

function openMapPopup(localName, items) {
  const popup = $("mapa-popup");
  if (!popup || !items) return;
  const t = I18N[currentLang];
  const peixes = items
    .map((i) => `<strong>${i.peixe}</strong> (${i.epoca})`)
    .join(" · ");
  const tipos = [...new Set(items.map((i) => i.tipo))].join(" · ");

  setSelectedPin(localName);

  popup.innerHTML = `
    <div class="mapa-popup-header">
      <div>
        <strong>${localName}</strong><br>
        <span style="color:var(--channel);font-size:0.8rem">${tipos}</span>
      </div>
      <button type="button" class="mapa-popup-close" aria-label="Fechar">✕</button>
    </div>
    <div>${peixes}</div>
    <button type="button" class="mapa-popup-btn">${t.verDetalhes}</button>
  `;
  popup.hidden = false;

  popup.querySelector(".mapa-popup-close").addEventListener("click", () => {
    popup.hidden = true;
    setSelectedPin(null);
  });

  popup.querySelector(".mapa-popup-btn").addEventListener("click", () => {
    popup.hidden = true;
    const targetEl = $(slugify(localName));
    if (targetEl) {
      const headerH = document.querySelector(".topo")?.offsetHeight || 0;
      const tabsH = document.querySelector(".tabs")?.offsetHeight || 0;
      const subtabsH =
        document.querySelector("#panel-pesqueiros .distritos")?.offsetHeight ||
        0;
      const filtersH =
        document.querySelector("#panel-pesqueiros .mobile-filtros-bar")
          ?.offsetHeight ||
        document.querySelector("#panel-pesqueiros .filtros")?.offsetHeight ||
        0;
      const tideH = document.getElementById("tide-bar")?.offsetHeight || 0;

      const offset = headerH + tabsH + subtabsH + filtersH + tideH + 12;
      const targetTop =
        targetEl.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });

      targetEl.classList.add("destaque");
      setTimeout(() => targetEl.classList.remove("destaque"), 2000);
    }
  });
}

function focusLocalOnMap(localName) {
  const coords = COORDS[localName];
  const items = currentGroups.get(localName);
  const mapBox = $("mapa-pesqueiros");
  if (!coords || !items || !mapBox) return;

  mapBox.scrollIntoView({ behavior: "smooth", block: "center" });

  const [cx, cy] = geoToSvg(coords[0], coords[1]);
  mapView.w = 380;
  mapView.h = 380 * (420 / 600);
  mapView.x = cx - mapView.w / 2;
  mapView.y = cy - mapView.h / 2 + 25;
  updateViewBox();

  openMapPopup(localName, items);
}

function initMap() {
  const box = $("mapa-pesqueiros");
  if (!box) return;

  box.innerHTML = `
    <svg id="mapa-svg" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-label="Mapa da Ria de Aveiro" style="cursor:grab">
      <path class="mapa-terra" d="M 380,-300 L 1000,-300 L 1000,800 L 120,800 L 200,350 L 260,310 L 340,260 L 395,210 L 415,150 L 450,110 L 470,50 Z" />
      <path class="mapa-terra" d="M 365,-300 L 475,-300 L 445,0 L 420,95 L 365,175 L 330,235 L 250,295 L 145,342 L 112,346 L 118,325 L 210,245 L 295,140 Z" />
      <path class="mapa-terra" d="M 105,360 L 165,362 L 110,800 L 20,800 Z" />
      <path class="mapa-terra" d="M 355,195 L 385,190 L 380,225 L 345,235 Z" />
      <path class="mapa-terra" d="M 285,270 L 325,260 L 315,295 L 275,300 Z" />

      <text class="mapa-label" x="45" y="160">OCEANO ATLÂNTICO</text>
      <text class="mapa-label" x="480" y="75">Ovar</text>
      <text class="mapa-label" x="505" y="140">Estarreja</text>
      <text class="mapa-label" x="430" y="215">Murtosa</text>
      <text class="mapa-label" x="395" y="330">Aveiro</text>
      <text class="mapa-label" x="245" y="395">Ílhavo</text>

      <g id="mapa-pins"></g>
    </svg>
    <div style="position:absolute;top:10px;right:10px;display:flex;flex-direction:column;gap:4px;z-index:3;">
      <button type="button" id="zoom-in" class="icon-btn" style="padding:0.25rem 0.55rem;" title="Aproximar">+</button>
      <button type="button" id="zoom-out" class="icon-btn" style="padding:0.25rem 0.55rem;" title="Afastar">−</button>
      <button type="button" id="zoom-reset" class="icon-btn" style="padding:0.25rem 0.45rem;font-size:0.75rem;" title="Repor">↺</button>
    </div>
    <div id="mapa-popup" class="mapa-popup" hidden></div>
  `;

  const svg = $("mapa-svg");

  function zoomBy(factor) {
    const minW = 450;
    const maxW = 900;
    const newW = Math.min(maxW, Math.max(minW, mapView.w * factor));
    const newH = newW * (420 / 600);
    mapView.x -= (newW - mapView.w) / 2;
    mapView.y -= (newH - mapView.h) / 2;
    mapView.w = newW;
    mapView.h = newH;
    updateViewBox();
  }

  $("zoom-in").addEventListener("click", () => zoomBy(0.8));
  $("zoom-out").addEventListener("click", () => zoomBy(1.25));
  $("zoom-reset").addEventListener("click", () => {
    mapView = { x: 0, y: 0, w: 600, h: 420 };
    updateViewBox();
  });

  svg.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 0.85 : 1.15);
    },
    { passive: false },
  );

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

  document.addEventListener("click", (e) => {
    const popup = $("mapa-popup");
    if (!popup || popup.hidden) return;
    if (
      !popup.contains(e.target) &&
      !e.target.classList.contains("mapa-pin") &&
      !e.target.closest(".local-link")
    ) {
      popup.hidden = true;
      setSelectedPin(null);
    }
  });
}

function updateMapMarkers(groups) {
  const pinsLayer = $("mapa-pins");
  const popup = $("mapa-popup");
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
    circle.setAttribute("stroke", "#ffffff");
    circle.setAttribute("stroke-width", "1.8");
    circle.setAttribute("class", "mapa-pin");
    circle.dataset.local = localName;
    if (selectedLocal === localName) {
      circle.classList.add("selected");
    }

    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      openMapPopup(localName, items);
    });

    pinsLayer.appendChild(circle);
  });
}
