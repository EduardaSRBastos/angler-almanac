// =========================================================
// UI, TEMA, NAVEGAÇÃO E SINCRONIZAÇÃO DE LAYOUT (STICKY)
// =========================================================
const $ = (id) => document.getElementById(id);

let currentLang = sessionStorage.getItem("almanac-lang") || "pt";
let currentDistrito = sessionStorage.getItem("almanac-distrito") || "aveiro";
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
    ? activePanel.querySelector(
        ".mobile-filtros-bar, .filtros, .equip-filters-box",
      )
    : null;

  if (header && header.offsetHeight > 0) {
    root.style.setProperty("--sticky-header-h", `${header.offsetHeight}px`);
  }
  if (tabs && tabs.offsetHeight > 0) {
    root.style.setProperty("--sticky-tabs-h", `${tabs.offsetHeight}px`);
  }
  const activeTide = activePanel
    ? activePanel.querySelector(".tide-bar, #tide-bar")
    : null;
  root.style.setProperty(
    "--sticky-tide-h",
    activeTide && activeTide.offsetHeight > 0
      ? `${activeTide.offsetHeight}px`
      : "0px",
  );

  if (activeSubtabs && activeSubtabs.offsetHeight > 0) {
    root.style.setProperty(
      "--sticky-subtabs-h",
      `${activeSubtabs.offsetHeight}px`,
    );
  } else {
    root.style.setProperty("--sticky-subtabs-h", "0px");
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

// --- Ativação e Persistência de Tab e Distrito ---
function activateMainTab(target) {
  document.querySelectorAll(".tab").forEach((b) => {
    const isMatch = b.dataset.tab === target;
    b.classList.toggle("active", isMatch);
    b.setAttribute("aria-selected", isMatch ? "true" : "false");
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.hidden = panel.id !== `panel-${target}`;
  });

  if (target === "links" && typeof renderLinksTab === "function") {
    renderLinksTab();
  }

  sessionStorage.setItem("almanac-active-tab", target);
  syncStickyHeights();
}

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    activateMainTab(btn.dataset.tab);
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
      sessionStorage.setItem("almanac-distrito", currentDistrito);
      selectedLocal = null;
      if (typeof saveSpotsState === "function") saveSpotsState();
      if (typeof populateFilters === "function") populateFilters(false);
      if (typeof render === "function") render();
    });
  });

// Restaura tab e distrito guardados na sessão ao carregar a página
const savedTab = sessionStorage.getItem("almanac-active-tab");
if (savedTab && document.querySelector(`.tab[data-tab="${savedTab}"]`)) {
  activateMainTab(savedTab);
}

const savedDistritoBtn = document.querySelector(
  `.distrito-btn:not(.equip-subtab-btn)[data-distrito="${currentDistrito}"]`,
);
if (savedDistritoBtn) {
  document
    .querySelectorAll(".distrito-btn:not(.equip-subtab-btn)")
    .forEach((b) => b.classList.remove("active"));
  savedDistritoBtn.classList.add("active");
}

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
