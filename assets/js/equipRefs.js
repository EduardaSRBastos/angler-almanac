let tooltipHideTimer = null;
let tooltipLockedTrigger = null;

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripHtmlTags(str) {
  if (!str) return "";
  return String(str)
    .replace(/<a\b[^>]*>?/gi, "")
    .replace(/<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function normalizeRefText(str) {
  return stripHtmlTags(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/s$/, "")
    .trim();
}

function isAlsoFishSpecies(term) {
  const normTerm = normalizeRefText(term);
  if (!normTerm || normTerm.length < 3) return false;

  if (typeof rows !== "undefined" && Array.isArray(rows)) {
    return rows.some((r) => {
      if (!r.peixe) return false;
      const p = normalizeRefText(r.peixe);
      return (
        p === normTerm ||
        p.startsWith(`${normTerm}-`) ||
        p.startsWith(`${normTerm} `) ||
        normTerm.startsWith(`${p}-`) ||
        normTerm.startsWith(`${p} `)
      );
    });
  }

  const sel = document.getElementById("peixe");
  if (sel) {
    return Array.from(sel.options).some((opt) => {
      if (!opt.value) return false;
      const p = normalizeRefText(opt.value);
      return (
        p === normTerm ||
        p.startsWith(`${normTerm}-`) ||
        p.startsWith(`${normTerm} `)
      );
    });
  }

  return false;
}

function buildEquipRefEntries(lang) {
  const activeLang =
    lang || (typeof currentLang !== "undefined" ? currentLang : "pt");
  const entries = [];
  const addTerms = (subtab, item) => {
    const rawTerms = new Set();
    if (Array.isArray(item.matches)) {
      item.matches.forEach((m) => m && rawTerms.add(m.trim()));
    }
    const nameObj = item.name || item.nome || {};
    [nameObj[activeLang], nameObj.pt, nameObj.en, item.nomeAlt].forEach((n) => {
      if (!n) return;
      const clean = stripHtmlTags(n)
        .replace(/\s*\([^)]*\)/g, "")
        .trim();
      if (clean) {
        rawTerms.add(clean);
        clean.split(/\s*\/\s*/).forEach((part) => {
          const p = part.trim();
          if (p.length >= 4) rawTerms.add(p);
        });
      }
      if (subtab === "nos") {
        const withoutPrefix = clean
          .replace(/^Nó\s+(de\s+|do\s+|da\s+)?/i, "")
          .replace(/\s+Knot$/i, "")
          .trim();
        if (
          withoutPrefix &&
          withoutPrefix.length >= 4 &&
          !/^correr$/i.test(withoutPrefix)
        ) {
          rawTerms.add(withoutPrefix);
        }
      }
    });

    rawTerms.forEach((term) => {
      if (term.length >= 3) {
        entries.push({ subtab, id: item.id, term });
      }
    });
  };

  if (typeof EQUIP_DATA !== "undefined") {
    (EQUIP_DATA.amostras || []).forEach((item) => addTerms("amostras", item));
    (EQUIP_DATA.iscos || []).forEach((item) => addTerms("iscos", item));
    (EQUIP_DATA.nos || []).forEach((item) => addTerms("nos", item));
    (EQUIP_DATA.montagens || []).forEach((item) => addTerms("montagens", item));
  }

  entries.sort((a, b) => b.term.length - a.term.length);
  return entries;
}

function formatAmostraWithLinks(text) {
  if (!text || text === "—") return text;
  let result = String(text);

  if (typeof EQUIP_DATA !== "undefined" && Array.isArray(EQUIP_DATA.amostras)) {
    EQUIP_DATA.amostras.forEach((item) => {
      if (!Array.isArray(item.matches) || !item.matches.length) return;
      const pattern = new RegExp(`\\b(${item.matches.join("|")})\\b`, "gi");
      result = result.replace(pattern, (match) => {
        const dualAttr = isAlsoFishSpecies(match)
          ? ` data-dual-species="${match}"`
          : "";
        return `<button type="button" class="amostra-ref" data-equip-subtab="amostras" data-amostra-id="${item.id}"${dualAttr}>${match}</button>`;
      });
    });
  }

  if (typeof EQUIP_DATA !== "undefined" && Array.isArray(EQUIP_DATA.iscos)) {
    const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
    const parts = result.split(/(<[^>]+>)/g);
    result = parts
      .map((part) => {
        if (part.startsWith("<")) return part;
        let seg = part;
        EQUIP_DATA.iscos.forEach((item) => {
          const terms = new Set();
          const nameObj = item.nome || item.name || {};
          [nameObj[lang], nameObj.pt, nameObj.en, item.nomeAlt].forEach((n) => {
            if (!n) return;
            const clean = stripHtmlTags(n)
              .replace(/\s*\([^)]*\)/g, "")
              .trim();
            if (clean.length >= 4) terms.add(clean);
            clean.split(/\s*\/\s*/).forEach((p) => {
              if (p.trim().length >= 4) terms.add(p.trim());
            });
          });
          if (!terms.size) return;
          const sorted = Array.from(terms).sort((a, b) => b.length - a.length);
          const pattern = new RegExp(
            `(?<![\\wÀ-ÿ])(${sorted.map(escapeRegExp).join("|")})(?![\\wÀ-ÿ])`,
            "gi",
          );
          seg = seg.replace(pattern, (match) => {
            const dualAttr = isAlsoFishSpecies(match)
              ? ` data-dual-species="${match}"`
              : "";
            return `<button type="button" class="amostra-ref" data-equip-subtab="iscos" data-amostra-id="${item.id}"${dualAttr}>${match}</button>`;
          });
        });
        return seg;
      })
      .join("");
  }

  return result;
}

function formatMontagemWithLinks(text, lang) {
  const activeLang =
    lang || (typeof currentLang !== "undefined" ? currentLang : "pt");
  if (text && typeof text === "object") {
    text = text[activeLang] || text.pt || "";
  }
  if (typeof text !== "string" || !text || text === "—") return text || "";

  const entries = buildEquipRefEntries(activeLang);
  if (!entries.length) return text;

  const parts = text.split(/(<[^>]+>)/g);
  return parts
    .map((part) => {
      if (part.startsWith("<")) return part;
      let seg = part;
      const placeholders = [];

      entries.forEach(({ subtab, id, term }) => {
        const isKnot = subtab === "nos";
        const startsWithNo = /^n[óo]\b/i.test(term);
        const prefixGuard =
          isKnot && !startsWithNo
            ? "(?<!\\b(?:b[óo]ia|chumbada|montagem|sistema|linha|anzol|fio)\\s+(?:de\\s+|do\\s+|da\\s+)?)"
            : "";

        const pattern = new RegExp(
          `${prefixGuard}(?<![\\wÀ-ÿ])(${escapeRegExp(term)})(?![\\wÀ-ÿ])`,
          "gi",
        );

        seg = seg.replace(pattern, (match) => {
          const idx = placeholders.length;
          const dualAttr = isAlsoFishSpecies(match)
            ? ` data-dual-species="${match}"`
            : "";
          placeholders.push(
            `<button type="button" class="amostra-ref equip-ref" data-equip-subtab="${subtab}" data-amostra-id="${id}"${dualAttr}>${match}</button>`,
          );
          return `@@EQUIPREF_${idx}@@`;
        });
      });

      return seg.replace(
        /@@EQUIPREF_(\d+)@@/g,
        (_, idx) => placeholders[Number(idx)],
      );
    })
    .join("");
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
      if (!tooltipLockedTrigger) {
        hideAmostraTooltip();
      }
    });
  }
  return tip;
}

function positionTooltip(tip, triggerEl) {
  const rect = triggerEl.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return;

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

function showAmostraTooltip(
  triggerEl,
  amostraId,
  subtab = "amostras",
  isDualExpanded = false,
) {
  const list =
    (typeof EQUIP_DATA !== "undefined" && EQUIP_DATA[subtab]) ||
    (typeof EQUIP_DATA !== "undefined" && EQUIP_DATA.amostras) ||
    [];
  const item = list.find((a) => a.id === amostraId);
  if (!item) return;

  clearTimeout(tooltipHideTimer);
  const tip = getOrCreateTooltip();
  const lang = typeof currentLang !== "undefined" ? currentLang : "pt";
  const titleObj = item.name || item.nome || {};
  const cleanTitle = stripHtmlTags(titleObj[lang] || titleObj.pt || "");
  const summaryText =
    (item.short && (item.short[lang] || item.short.pt)) ||
    (item.desc && (item.desc[lang] || item.desc.pt)) ||
    "";

  const dualSpecies =
    triggerEl.dataset.dualSpecies ||
    (isAlsoFishSpecies(triggerEl.textContent)
      ? triggerEl.textContent.trim()
      : "");

  const svgHtml = item.svg
    ? `<div class="amostra-tooltip-svg">${item.svg}</div>`
    : "";

  const equipDestLabel =
    subtab === "iscos"
      ? lang === "pt"
        ? "Isco Natural"
        : "Natural Bait"
      : subtab === "amostras"
        ? lang === "pt"
          ? "Amostra"
          : "Lure"
        : subtab === "nos"
          ? lang === "pt"
            ? "Nó"
            : "Knot"
          : lang === "pt"
            ? "Montagem"
            : "Rig";

  if (dualSpecies && isDualExpanded) {
    tooltipLockedTrigger = triggerEl;
    const spotsLabel = lang === "pt" ? "Pesqueiros:" : "Fishing Spots:";
    const spotsLinkText =
      lang === "pt"
        ? `Ver pesqueiros de ${dualSpecies} →`
        : `View spots for ${dualSpecies} →`;
    const equipLinkText = `${cleanTitle} →`;

    tip.innerHTML = `
      ${svgHtml}
      <div class="amostra-tooltip-body">
        <strong>${cleanTitle}</strong>
        <p>${summaryText}</p>
        <div class="amostra-tooltip-choices" style="display:flex;flex-direction:column;gap:6px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(128,128,128,0.25);">
          <button type="button" class="amostra-tooltip-choice-btn" data-dual-action="species" data-species="${dualSpecies}" style="background:none;border:none;padding:2px 0;text-align:left;cursor:pointer;color:inherit;font:inherit;font-size:0.84rem;">
            <strong style="opacity:0.85;">${spotsLabel}</strong> <span class="amostra-tooltip-hint" style="display:inline;text-decoration:underline;">${spotsLinkText}</span>
          </button>
          <button type="button" class="amostra-tooltip-choice-btn" data-dual-action="equip" data-id="${amostraId}" data-subtab="${subtab}" style="background:none;border:none;padding:2px 0;text-align:left;cursor:pointer;color:inherit;font:inherit;font-size:0.84rem;">
            <strong style="opacity:0.85;">${equipDestLabel}:</strong> <span class="amostra-tooltip-hint" style="display:inline;text-decoration:underline;">${equipLinkText}</span>
          </button>
        </div>
      </div>
    `;
  } else {
    const hintText = dualSpecies
      ? lang === "pt"
        ? "Clica para escolher Pesqueiros ou Isco →"
        : "Click to choose Spots or Bait →"
      : subtab === "nos"
        ? lang === "pt"
          ? "Clica para ver este nó →"
          : "Click to view this knot →"
        : subtab === "montagens"
          ? lang === "pt"
            ? "Clica para ver esta montagem →"
            : "Click to view this rig →"
          : subtab === "iscos"
            ? lang === "pt"
              ? "Clica para ver este isco →"
              : "Click to view this bait →"
            : subtab === "amostras"
              ? lang === "pt"
                ? "Clica para ver esta amostra →"
                : "Click to view this lure →"
              : lang === "pt"
                ? "Clica para ver no guia →"
                : "Click to view in guide →";

    tip.innerHTML = `
      ${svgHtml}
      <div class="amostra-tooltip-body">
        <strong>${cleanTitle}</strong>
        <p>${summaryText}</p>
        <span class="amostra-tooltip-hint">${hintText}</span>
      </div>
    `;
  }

  tip.hidden = false;
  positionTooltip(tip, triggerEl);
}

function hideAmostraTooltip(delay = 140, force = false) {
  if (!force && tooltipLockedTrigger) return;
  clearTimeout(tooltipHideTimer);
  tooltipHideTimer = setTimeout(() => {
    const tip = document.getElementById("amostra-tooltip");
    if (tip) tip.hidden = true;
    tooltipLockedTrigger = null;
  }, delay);
}

function jumpToAmostra(amostraId, targetSubtab = "amostras") {
  tooltipLockedTrigger = null;
  hideAmostraTooltip(0, true);

  if (typeof skipNextScrollToTop !== "undefined") {
    skipNextScrollToTop = true;
  }

  if (typeof activateMainTab === "function") {
    activateMainTab("equipamento");
  } else {
    const equipTab = document.getElementById("tab-equipamento");
    if (equipTab) equipTab.click();
  }

  currentEquipSubtab = targetSubtab;
  sessionStorage.setItem("almanac-equip-subtab", currentEquipSubtab);

  if (targetSubtab === "nos") {
    const knotItem = (EQUIP_DATA.nos || []).find((n) => n.id === amostraId);
    if (knotItem) {
      if (
        currentKnotCategory !== "todos" &&
        knotItem.category !== currentKnotCategory
      ) {
        currentKnotCategory = "todos";
        sessionStorage.setItem("almanac-knot-cat", "todos");
      }
      if (
        currentKnotDifficulty !== "todos" &&
        knotItem.difficulty !== currentKnotDifficulty
      ) {
        currentKnotDifficulty = "todos";
        sessionStorage.setItem("almanac-knot-diff", "todos");
      }
    }
  }

  if (targetSubtab === "iscos" && typeof currentIscoCategory !== "undefined") {
    const iscoItem = (EQUIP_DATA.iscos || []).find((i) => i.id === amostraId);
    if (
      iscoItem &&
      currentIscoCategory !== "todos" &&
      iscoItem.categoria !== currentIscoCategory
    ) {
      currentIscoCategory = "todos";
      sessionStorage.setItem("almanac-isco-cat", "todos");
    }
  }

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
  if (tooltipLockedTrigger) return;
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    showAmostraTooltip(
      btn,
      btn.dataset.amostraId,
      btn.dataset.equipSubtab || "amostras",
      false,
    );
  }
});

document.addEventListener("mouseout", (e) => {
  if (tooltipLockedTrigger) return;
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    hideAmostraTooltip();
  }
});

document.addEventListener("focusin", (e) => {
  if (tooltipLockedTrigger) return;
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    showAmostraTooltip(
      btn,
      btn.dataset.amostraId,
      btn.dataset.equipSubtab || "amostras",
      false,
    );
  }
});

document.addEventListener("focusout", (e) => {
  if (tooltipLockedTrigger) return;
  const btn = e.target.closest(".amostra-ref");
  if (btn) {
    hideAmostraTooltip(0);
  }
});

// Fase de captura (true) para intercetar antes de qualquer <a class="species-ref"> pai
document.addEventListener(
  "click",
  (e) => {
    const choiceBtn = e.target.closest(".amostra-tooltip-choice-btn");
    if (choiceBtn) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const action = choiceBtn.dataset.dualAction;
      tooltipLockedTrigger = null;
      hideAmostraTooltip(0, true);

      if (action === "species") {
        if (typeof window.jumpToSpecies === "function") {
          window.jumpToSpecies(choiceBtn.dataset.species);
        }
      } else if (action === "equip") {
        jumpToAmostra(
          choiceBtn.dataset.id,
          choiceBtn.dataset.subtab || "amostras",
        );
      }
      return;
    }

    const btn = e.target.closest(".amostra-ref");
    if (btn) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const dualSpecies =
        btn.dataset.dualSpecies ||
        (isAlsoFishSpecies(btn.textContent) ? btn.textContent.trim() : "");

      if (dualSpecies) {
        showAmostraTooltip(
          btn,
          btn.dataset.amostraId,
          btn.dataset.equipSubtab || "amostras",
          true,
        );
      } else {
        jumpToAmostra(
          btn.dataset.amostraId,
          btn.dataset.equipSubtab || "amostras",
        );
      }
      return;
    }

    const tip = document.getElementById("amostra-tooltip");
    if (tooltipLockedTrigger && tip && !tip.contains(e.target)) {
      tooltipLockedTrigger = null;
      hideAmostraTooltip(0, true);
    }
  },
  true,
);
