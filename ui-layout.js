// =========================================================
// UI, TEMA, NAVEGAÇÃO E SINCRONIZAÇÃO DE LAYOUT (STICKY)
// =========================================================
const $ = (id) => document.getElementById(id);

let currentLang = "pt";
let currentDistrito = "aveiro";
let selectedLocal = null;
let currentGroups = new Map();
let skipNextScrollToTop = false;

// --- Gestão de Tema (Claro / Escuro) ---
const themeBtn = $("theme-toggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeBtn) {
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  localStorage.setItem("almanac-theme", theme);
}

const savedTheme =
  localStorage.getItem("almanac-theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(next);
  });
}

const yearEl = $("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// --- Botão Voltar ao Topo ---
const goTopBtn = $("go-top");
if (goTopBtn) {
  window.addEventListener(
    "scroll",
    () => {
      goTopBtn.hidden = window.scrollY < 320;
    },
    { passive: true },
  );

  goTopBtn.addEventListener("click", () => {
    scrollPageToTop();
  });
}

function scrollPageToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  document.body.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Sincronização de Alturas Sticky ---
function syncStickyHeights() {
  const root = document.documentElement;
  const header = document.querySelector(".topo");
  const tabs = document.querySelector(".tabs");
  const activePanel = document.querySelector(".tab-panel:not([hidden])");
  const activeSubtabs = activePanel
    ? activePanel.querySelector(".distritos, .equip-subtabs")
    : null;
  const activeFilters = activePanel
    ? activePanel.querySelector(".filtros, .equip-filters-box")
    : null;

  if (header && header.offsetHeight > 0) {
    root.style.setProperty("--sticky-header-h", `${header.offsetHeight}px`);
  }
  if (tabs && tabs.offsetHeight > 0) {
    root.style.setProperty("--sticky-tabs-h", `${tabs.offsetHeight}px`);
  }
  if (activeSubtabs && activeSubtabs.offsetHeight > 0) {
    root.style.setProperty(
      "--sticky-subtabs-h",
      `${activeSubtabs.offsetHeight}px`,
    );
  }
  if (activeFilters && activeFilters.offsetHeight > 0) {
    root.style.setProperty(
      "--sticky-filters-h",
      `${activeFilters.offsetHeight}px`,
    );
  } else {
    root.style.setProperty("--sticky-filters-h", "0px");
  }
}

const equipPanel = $("panel-equipamento");
if (equipPanel && typeof MutationObserver !== "undefined") {
  const observer = new MutationObserver(() => {
    requestAnimationFrame(syncStickyHeights);
  });
  observer.observe(equipPanel, {
    childList: true,
    subtree: true,
  });
}

window.addEventListener("load", syncStickyHeights);
window.addEventListener("resize", syncStickyHeights);

// --- Eventos de Navegação (Tabs, Distritos e Scroll Automático) ---
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
    syncStickyHeights();
  });
});

document
  .querySelectorAll(".distrito-btn:not(.equip-subtab-btn)")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".distrito-btn:not(.equip-subtab-btn)")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentDistrito = btn.dataset.distrito;
      selectedLocal = null;
      if (typeof populateFilters === "function") populateFilters(false);
      if (typeof render === "function") render();
    });
  });

document.addEventListener("click", (e) => {
  const clickedNav = e.target.closest(
    ".tab, .equip-subtab-btn, .distrito-btn:not(.equip-cat-btn):not(.equip-diff-btn)",
  );
  const clickedEquipFilter = e.target.closest(
    ".equip-cat-btn, .equip-diff-btn",
  );

  if (clickedNav || clickedEquipFilter || e.target.closest("#lang-toggle")) {
    const shouldScrollTop = Boolean(clickedNav) && !skipNextScrollToTop;
    skipNextScrollToTop = false;

    requestAnimationFrame(() => {
      syncStickyHeights();
      requestAnimationFrame(() => {
        syncStickyHeights();
        if (shouldScrollTop) {
          scrollPageToTop();
        }
      });
    });
  }
});
