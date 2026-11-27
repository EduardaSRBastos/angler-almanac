// =========================================================
// MARÉS & LUAS: Cálculo astronómico, estado e links locais
// =========================================================

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
    seaLinkText:
      lang === "pt" ? "Ondulação & Vento (IPMA) ↗" : "Swell & Wind (IPMA) ↗",
  };
}

const TIDE_SLUG_RULES = [
  { keys: ["meia laranja"], slug: "aveiro" },
  { keys: ["carregal"], slug: "carregal" },
  { keys: ["varela"], slug: "varela" },
  { keys: ["torreira", "bestida"], slug: "torreira" },
  { keys: ["sao jacinto", "quebramar norte"], slug: "sao-jacinto" },
  {
    keys: ["costa nova", "praia da barra", "quebramar sul"],
    slug: "costa-nova",
  },
  { keys: ["vagueira"], slug: "vagueira" },
  { keys: ["furadouro", "tijosa"], slug: "furadouro" },
  { keys: ["esmoriz"], slug: "esmoriz" },
  { keys: ["espinho"], slug: "espinho" },
  { keys: ["cais do bico", "mourao", "pardelhas"], slug: "cais-do-bico" },
  { keys: ["pardilho", "ribeira da aldeia"], slug: "pardilho" },
  { keys: ["ovar", "cova do chegado", "torrao"], slug: "ovar" },
  { keys: ["estarreja"], slug: "estarreja" },
  { keys: ["salreu"], slug: "salreu" },
  { keys: ["canelas"], slug: "canelas" },
  { keys: ["cacia"], slug: "cacia" },
  { keys: ["esgueira"], slug: "esgueira" },
  { keys: ["vista alegre"], slug: "vista-alegre" },
  { keys: ["gafanha do carmo"], slug: "gafanha-do-carmo" },
  { keys: ["cais comercial"], slug: "cais-comercial" },
  { keys: ["cais da pedra"], slug: "cais-da-pedra" },
  { keys: ["ponte cais"], slug: "ponte-cais-n-2" },
  { keys: ["lota"], slug: "lota" },
  { keys: ["miradouro"], slug: "miradouro" },
  { keys: ["moranzel"], slug: "moranzel" },
  { keys: ["parrachil"], slug: "parrachil" },
  { keys: ["puxadouro"], slug: "puxadouro" },
  { keys: ["manchao"], slug: "ribeira-do-manchao" },
  { keys: ["vala rainha"], slug: "vala-rainha" },
  { keys: ["boco"], slug: "boco" },
];

function getLocalTideUrl(localName) {
  const normalized = (localName || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const match = TIDE_SLUG_RULES.find((rule) =>
    rule.keys.some((k) => normalized.includes(k)),
  );
  const slug = match ? match.slug : "aveiro";
  return `https://tabuademares.com/pt/aveiro/${slug}#_mares`;
}

function renderTideBar(anchorEl) {
  if (!anchorEl) return;

  let bar = document.getElementById("tide-moon-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "tide-moon-bar";
    bar.className = "tide-moon-bar";
    anchorEl.insertAdjacentElement("afterend", bar);
  }

  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const info = getMoonAndTideInfo(lang);

  bar.innerHTML = `
    <div class="tide-moon-info">
      <div class="tide-moon-badges">
        <span class="tide-badge-wrap" tabindex="0" title="${info.tideTip}">
          <span class="tide-pill">🌊 ${info.tideLabel}</span>
          <span class="tide-badge-tip" role="tooltip">${info.tideTip}</span>
        </span>
        <span class="tide-badge-wrap" tabindex="0" title="${info.amplitudeTip}">
          <span class="tide-pill">🌓 ${info.amplitudeLabel}</span>
          <span class="tide-badge-tip" role="tooltip">${info.amplitudeTip}</span>
        </span>
      </div>
      ${
        info.scheduleText
          ? `<div class="tide-schedule">${info.scheduleText}</div>`
          : ""
      }
      <div class="tide-note">${info.note}</div>
    </div>
    <div class="tide-moon-link" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      <a href="https://tabuademares.com/pt/aveiro/aveiro#_mares" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${info.linkText}</a>
      <a href="https://www.ipma.pt/pt/otempo/prev.localidade.hora/#Aveiro&Praia%20de%20S%C3%A3o%20Jacinto" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${info.seaLinkText}</a>
    </div>
  `;
}
