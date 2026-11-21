let currentEquipSubtab = "amostras";
let currentKnotCategory = "todos";
let currentKnotDifficulty = "todos";
let tooltipHideTimer = null;

function formatAmostraWithLinks(text) {
  if (!text || text === "—") return text;
  let result = text;
  EQUIP_DATA.amostras.forEach((item) => {
    const pattern = new RegExp(`\\b(${item.matches.join("|")})\\b`, "gi");
    result = result.replace(
      pattern,
      `<button type="button" class="amostra-ref" data-amostra-id="${item.id}">$1</button>`,
    );
  });
  return result;
}

function getOrCreateTooltip() {
  let tip = document.getElementById("amostra-tooltip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "amostra-tooltip";
    tip.className = "amostra-tooltip";
    tip.setAttribute("role", "tooltip");
    tip.hidden = true;
    document.body.appendChild(tip);

    tip.addEventListener("mouseenter", () => {
      clearTimeout(tooltipHideTimer);
    });
    tip.addEventListener("mouseleave", () => {
      hideAmostraTooltip();
    });
  }
  return tip;
}

function showAmostraTooltip(triggerEl, amostraId) {
  const item = EQUIP_DATA.amostras.find((a) => a.id === amostraId);
  if (!item) return;

  clearTimeout(tooltipHideTimer);
  const tip = getOrCreateTooltip();
  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";

  tip.innerHTML = `
    <div class="amostra-tooltip-svg">${item.svg}</div>
    <div class="amostra-tooltip-body">
      <strong>${item.name[lang]}</strong>
      <p>${item.short[lang]}</p>
      <span class="amostra-tooltip-hint">${lang === "pt" ? "Clica para ver no guia →" : "Click to view in guide →"}</span>
    </div>
  `;
  tip.hidden = false;

  const rect = triggerEl.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();
  let top = rect.top + window.scrollY - tipRect.height - 10;
  if (top < window.scrollY + 8) {
    top = rect.bottom + window.scrollY + 10;
  }
  let left = rect.left + window.scrollX + rect.width / 2 - tipRect.width / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - tipRect.width - 12));

  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;
}

function hideAmostraTooltip(delay = 140) {
  clearTimeout(tooltipHideTimer);
  tooltipHideTimer = setTimeout(() => {
    const tip = document.getElementById("amostra-tooltip");
    if (tip) tip.hidden = true;
  }, delay);
}

function renderEquipamento() {
  const panel = document.getElementById("panel-equipamento");
  if (!panel) return;

  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const labels = {
    pt: {
      amostras: "Amostras",
      nos: "Nós de Pesca",
      uso: "Quando / como usar",
      usoNo: "Para que serve / quando usar",
      decathlon: "Ver na Decathlon ↗",
      tutorialImg: "Imagem Tutorial ↗",
      tutorialVid: "Vídeo Tutorial ↗",
      catLabel: "Finalidade:",
      diffLabel: "Dificuldade:",
      emptyNos: "Nenhum nó encontrado com esta combinação de filtros.",
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
      uso: "When / how to use",
      usoNo: "Purpose & when to use",
      decathlon: "View on Decathlon ↗",
      tutorialImg: "Image Tutorial ↗",
      tutorialVid: "Video Tutorial ↗",
      catLabel: "Purpose:",
      diffLabel: "Difficulty:",
      emptyNos: "No knots match the selected filters.",
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

  let items = EQUIP_DATA[currentEquipSubtab] || [];

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

  const knotsFiltersHtml =
    currentEquipSubtab === "nos"
      ? `
    <div class="equip-filters-box" style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:14px;align-items:center;">
      <div class="distritos" style="margin-bottom:0;align-items:center;">
        <span style="font-size:0.82rem;opacity:0.8;margin-right:4px;">${labels.catLabel}</span>
        ${Object.entries(labels.cats)
          .map(
            ([key, text]) =>
              `<button type="button" class="distrito-btn equip-cat-btn ${currentKnotCategory === key ? "active" : ""}" data-cat="${key}">${text}</button>`,
          )
          .join("")}
      </div>
      <div class="distritos" style="margin-bottom:0;align-items:center;">
        <span style="font-size:0.82rem;opacity:0.8;margin-right:4px;">${labels.diffLabel}</span>
        ${Object.entries(labels.diffs)
          .map(
            ([key, text]) =>
              `<button type="button" class="distrito-btn equip-diff-btn ${currentKnotDifficulty === key ? "active" : ""}" data-diff="${key}">${text}</button>`,
          )
          .join("")}
      </div>
    </div>`
      : "";

  const diffColors = {
    facil:
      "background:rgba(34,197,94,0.16);color:#15803d;border:1px solid rgba(34,197,94,0.35);",
    medio:
      "background:rgba(234,179,8,0.16);color:#a16207;border:1px solid rgba(234,179,8,0.35);",
    avancado:
      "background:rgba(239,68,68,0.16);color:#b91c1c;border:1px solid rgba(239,68,68,0.35);",
  };

  const usoLabel = currentEquipSubtab === "nos" ? labels.usoNo : labels.uso;

  panel.innerHTML = `
    <div class="distritos equip-subtabs" role="tablist">
      <button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "amostras" ? "active" : ""}" data-subtab="amostras">${labels.amostras}</button>
      <button type="button" class="distrito-btn equip-subtab-btn ${currentEquipSubtab === "nos" ? "active" : ""}" data-subtab="nos">${labels.nos}</button>
    </div>
    ${knotsFiltersHtml}
    ${
      items.length === 0
        ? `<p style="padding:16px;opacity:0.75;">${labels.emptyNos}</p>`
        : `<div class="equip-grid">
      ${items
        .map((item) => {
          const badgesHtml =
            currentEquipSubtab === "nos"
              ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  ${item.category ? `<span class="equip-tag">${labels.cats[item.category] || item.category}</span>` : ""}
                  ${
                    item.difficulty
                      ? `<span class="equip-tag" style="${diffColors[item.difficulty] || ""}">${labels.diffs[item.difficulty] || item.difficulty}</span>`
                      : ""
                  }
                </div>`
              : `<span class="equip-tag">${item.tag[lang]}</span>`;

          const links = [];
          if (item.decathlonUrl) {
            links.push(
              `<a href="${item.decathlonUrl}" target="_blank" rel="noopener noreferrer" class="equip-decathlon-link">${labels.decathlon}</a>`,
            );
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

          return `
        <article class="equip-card" id="equip-${item.id}">
          <div class="equip-card-visual">${item.svg}</div>
          <div class="equip-card-content">
            <div class="equip-card-header" style="flex-direction:column;align-items:flex-start;gap:4px;">
              <h3>${item.name[lang]}</h3>
              ${badgesHtml}
            </div>
            <p class="equip-desc">${item.desc[lang]}</p>
            <p class="equip-use"><strong>${usoLabel}:</strong> ${item.use[lang]}</p>
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

  panel.querySelectorAll(".equip-subtab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentEquipSubtab = btn.dataset.subtab;
      renderEquipamento();
    });
  });

  panel.querySelectorAll(".equip-cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentKnotCategory = btn.dataset.cat;
      renderEquipamento();
    });
  });

  panel.querySelectorAll(".equip-diff-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentKnotDifficulty = btn.dataset.diff;
      renderEquipamento();
    });
  });
}

function jumpToAmostra(amostraId) {
  hideAmostraTooltip(0);

  if (typeof skipNextScrollToTop !== "undefined") {
    skipNextScrollToTop = true;
  }

  const equipTab = document.getElementById("tab-equipamento");
  if (equipTab) {
    equipTab.click();
  }

  currentEquipSubtab = "amostras";
  renderEquipamento();

  if (typeof syncStickyHeights === "function") {
    syncStickyHeights();
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof syncStickyHeights === "function") {
        syncStickyHeights();
      }
      const card = document.getElementById(`equip-${amostraId}`);
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      card.classList.remove("destaque");
      void card.offsetWidth;
      card.classList.add("destaque");
      setTimeout(() => card.classList.remove("destaque"), 2200);
    });
  });
}

document.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    showAmostraTooltip(btn, btn.dataset.amostraId);
  }
});

document.addEventListener("mouseout", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    hideAmostraTooltip();
  }
});

document.addEventListener("focusin", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    showAmostraTooltip(btn, btn.dataset.amostraId);
  }
});

document.addEventListener("focusout", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    hideAmostraTooltip(0);
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    e.preventDefault();
    jumpToAmostra(btn.dataset.amostraId);
  }
});
