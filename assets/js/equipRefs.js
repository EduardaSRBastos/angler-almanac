let tooltipHideTimer = null;

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripHtmlTags(str) {
  if (!str) return "";
  return String(str)
    .replace(/<a\b[^>]*>?/gi, "")
    .replace(/<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function buildEquipRefEntries(lang) {
  const entries = [];
  const addTerms = (subtab, item) => {
    const rawTerms = new Set();
    if (Array.isArray(item.matches)) {
      item.matches.forEach((m) => m && rawTerms.add(m.trim()));
    }
    const nameObj = item.name || item.nome || {};
    [nameObj[lang], nameObj.pt, nameObj.en].forEach((n) => {
      if (!n) return;
      const clean = stripHtmlTags(n)
        .replace(/\s*\([^)]*\)/g, "")
        .trim();
      if (clean) rawTerms.add(clean);
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
    (EQUIP_DATA.nos || []).forEach((item) => addTerms("nos", item));
    (EQUIP_DATA.montagens || []).forEach((item) => addTerms("montagens", item));
  }

  entries.sort((a, b) => b.term.length - a.term.length);
  return entries;
}

function formatAmostraWithLinks(text) {
  if (!text || text === "—") return text;
  let result = text;
  EQUIP_DATA.amostras.forEach((item) => {
    const pattern = new RegExp(`\\b(${item.matches.join("|")})\\b`, "gi");
    result = result.replace(
      pattern,
      `<button type="button" class="amostra-ref" data-equip-subtab="amostras" data-amostra-id="${item.id}">$1</button>`,
    );
  });
  return result;
}

function formatMontagemWithLinks(text, lang) {
  if (!text || text === "—") return text;
  const entries = buildEquipRefEntries(lang);
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
          placeholders.push(
            `<button type="button" class="amostra-ref equip-ref" data-equip-subtab="${subtab}" data-amostra-id="${id}">${match}</button>`,
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
      hideAmostraTooltip();
    });
  }
  return tip;
}

function showAmostraTooltip(triggerEl, amostraId, subtab = "amostras") {
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
    (item.short && item.short[lang]) || (item.desc && item.desc[lang]) || "";
  const hintText =
    subtab === "nos"
      ? lang === "pt"
        ? "Clica para ver este nó →"
        : "Click to view this knot →"
      : subtab === "montagens"
        ? lang === "pt"
          ? "Clica para ver esta montagem →"
          : "Click to view this rig →"
        : lang === "pt"
          ? "Clica para ver no guia →"
          : "Click to view in guide →";

  tip.innerHTML = `
    <div class="amostra-tooltip-svg">${item.svg}</div>
    <div class="amostra-tooltip-body">
      <strong>${cleanTitle}</strong>
      <p>${summaryText}</p>
      <span class="amostra-tooltip-hint">${hintText}</span>
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

function jumpToAmostra(amostraId, targetSubtab = "amostras") {
  hideAmostraTooltip(0);

  if (typeof skipNextScrollToTop !== "undefined") {
    skipNextScrollToTop = true;
  }

  const equipTab = document.getElementById("tab-equipamento");
  if (equipTab) {
    equipTab.click();
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
    showAmostraTooltip(
      btn,
      btn.dataset.amostraId,
      btn.dataset.equipSubtab || "amostras",
    );
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
    showAmostraTooltip(
      btn,
      btn.dataset.amostraId,
      btn.dataset.equipSubtab || "amostras",
    );
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
    jumpToAmostra(btn.dataset.amostraId, btn.dataset.equipSubtab || "amostras");
  }
});
