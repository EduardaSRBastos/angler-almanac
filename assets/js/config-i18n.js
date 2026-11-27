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
    sub: "Guia prático de pesqueiros, identificação de espécies, marés, épocas, iscos, montagens e regras de Portugal.",
    metaDesc:
      "Almanaque do Pescador: guia prático de pesca com os melhores pesqueiros, identificação de espécies, marés, épocas, iscos naturais, amostras, montagens, nós, pós-captura, checklist e regras de pesca lúdica em Portugal.",
    toggleBtn: "EN",
    tabPesqueiros: "Pesqueiros",
    tabEquipamento: "Equipamento",
    tabLinks: "Links Úteis",
    tabEspecies: "Espécies",
    lblBusca: "Local",
    buscaPlaceholder: "Pesquisar local...",
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
    clearFilters: "Limpar filtros",
    verDetalhes: "Ver detalhes ↓",
    verNoMapa: "Ver no mapa",
    minLabel: "mín.",
    fHorario: "Horário",
    fMare: "Maré / corrente",
    fIsco: "Isco",
    fAmostra: "Amostra",
    fPreferencia: "Preferência de isco",
    fTecnica: "Técnica",
    fMovimento: "Movimento",
    regrasTitulo: "Regras a confirmar antes de ires",
    subManuseamento: "Pós-Captura",
  },
  en: {
    title: "Angler's Almanac",
    sub: "Practical guide to fishing spots, species identification, tides, seasons, baits, rigs, and regulations of Portugal.",
    metaDesc:
      "Angler's Almanac: practical fishing guide with top spots, species identification, tides, seasons, natural baits, lures, rigs, knots, catch care, checklist, and recreational fishing rules in Portugal.",
    toggleBtn: "PT",
    tabPesqueiros: "Spots",
    tabEquipamento: "Gear & Rods",
    tabLinks: "Useful Links",
    tabEspecies: "Species",
    lblBusca: "Spot",
    buscaPlaceholder: "Search spot...",
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
    clearFilters: "Clear filters",
    verDetalhes: "View details ↓",
    verNoMapa: "Show on map",
    minLabel: "min.",
    fHorario: "Best time",
    fMare: "Tide / current",
    fIsco: "Bait",
    fAmostra: "Lure",
    fPreferencia: "Bait preference",
    fTecnica: "Technique",
    fMovimento: "Retrieve / action",
    regrasTitulo: "Rules to check before heading out",
    subManuseamento: "Catch Care",
  },
};

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

const rows = [];
Object.entries(PLACES_DATA).forEach(([distrito, rawText]) => {
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
