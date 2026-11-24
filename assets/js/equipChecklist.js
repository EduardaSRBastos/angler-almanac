let currentChecklistTech =
  localStorage.getItem("pesca_checklist_tech_v1") || "todas";

function isChecklistItemVisible(item, tech) {
  if (!tech || tech === "todas") return true;
  const tags = Array.isArray(item.tags) ? item.tags : ["todas"];
  return tags.includes("todas") || tags.includes(tech);
}

function getChecklistCounts(tech = currentChecklistTech) {
  const data = typeof EQUIP_DATA !== "undefined" && EQUIP_DATA.checklist;
  if (!data || !Array.isArray(data.grupos)) return { marcados: 0, total: 0 };
  const saved = JSON.parse(localStorage.getItem("pesca_checklist_v1") || "{}");

  let total = 0;
  let marcados = 0;

  data.grupos.forEach((grupo) => {
    grupo.itens.forEach((item) => {
      if (isChecklistItemVisible(item, tech)) {
        total += 1;
        if (saved[item.id]) marcados += 1;
      }
    });
  });

  return { marcados, total };
}

function updateChecklistTabCounter() {
  const { marcados, total } = getChecklistCounts(currentChecklistTech);
  const activeBtn = document.querySelector(
    '.equip-subtab-btn[data-subtab="checklist"]',
  );
  if (activeBtn && total > 0) {
    activeBtn.textContent = `Checklist (${marcados}/${total})`;
  }
}

function renderChecklist(lang = "pt") {
  const container = document.getElementById("equip-checklist");
  const data = EQUIP_DATA.checklist;
  if (!container || !data) return;

  const saved = JSON.parse(localStorage.getItem("pesca_checklist_v1") || "{}");

  const tecnicas = Array.isArray(data.tecnicas)
    ? data.tecnicas
    : [
        { id: "todas", pt: "Todas", en: "All" },
        { id: "spinning", pt: "Spinning", en: "Spinning" },
        { id: "boia", pt: "Bóia", en: "Float" },
        { id: "fundo", pt: "Fundo", en: "Bottom" },
        {
          id: "eging",
          pt: "Eging (Choco/Lula)",
          en: "Eging (Squid/Cuttlefish)",
        },
      ];

  const { marcados, total: totalItens } =
    getChecklistCounts(currentChecklistTech);

  const techFilterHtml = `
    <div class="distritos checklist-tech-bar" role="group" aria-label="${lang === "pt" ? "Filtrar por técnica" : "Filter by technique"}">
      <span class="knot-filter-label">${lang === "pt" ? "Técnica:" : "Technique:"}</span>
      ${tecnicas
        .map(
          (t) =>
            `<button type="button" class="distrito-btn checklist-tech-btn ${currentChecklistTech === t.id ? "active" : ""}" data-tech="${t.id}">${t[lang] || t.pt}</button>`,
        )
        .join("")}
    </div>
  `;

  const gruposHtml = data.grupos
    .map((grupo) => {
      const visibleItens = grupo.itens.filter((item) =>
        isChecklistItemVisible(item, currentChecklistTech),
      );
      if (!visibleItens.length) return "";

      return `
        <div class="checklist-card">
          <h3>${grupo.nome[lang]}</h3>
          <ul class="checklist-list">
            ${visibleItens
              .map((item) => {
                const checked = saved[item.id] ? "checked" : "";
                return `
                  <li>
                    <label class="checklist-item ${checked}">
                      <input type="checkbox" data-check-id="${item.id}" ${checked} />
                      <span>${item[lang]}</span>
                    </label>
                  </li>`;
              })
              .join("")}
          </ul>
        </div>`;
    })
    .join("");

  container.innerHTML = `
    <div class="checklist-header">
      <div>
        <h2>${data.titulo[lang]}</h2>
        <p>${data.subtitulo[lang]}</p>
      </div>
            <div class="checklist-actions">
        <span class="checklist-counter">${marcados} / ${totalItens}</span>
        <button type="button" id="checklist-reset-btn" class="btn-limpar">
          ${lang === "pt" ? "Desmarcar tudo" : "Reset all"}
        </button>
      </div>
    </div>
    ${techFilterHtml}
    <div class="checklist-grid">
      ${gruposHtml}
    </div>
  `;

  container.querySelectorAll(".checklist-tech-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentChecklistTech = btn.dataset.tech;
      localStorage.setItem("pesca_checklist_tech_v1", currentChecklistTech);
      updateChecklistTabCounter();
      renderChecklist(lang);
    });
  });

  container.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const id = e.target.dataset.checkId;
      saved[id] = e.target.checked;
      localStorage.setItem("pesca_checklist_v1", JSON.stringify(saved));
      updateChecklistTabCounter();
      renderChecklist(lang);
    });
  });

  const resetBtn = document.getElementById("checklist-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem("pesca_checklist_v1");
      updateChecklistTabCounter();
      renderChecklist(lang);
    });
  }
}
