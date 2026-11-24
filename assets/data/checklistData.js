window.EQUIP_DATA = window.EQUIP_DATA || {};

EQUIP_DATA.checklist = {
  titulo: {
    pt: "Checklist antes de sair de casa",
    en: "Pre-Trip Fishing Checklist",
  },
  subtitulo: {
    pt: "Filtra pela técnica do dia e marca o que já puseste na mochila (guardado automaticamente).",
    en: "Filter by today's technique and check off what's packed (saved automatically).",
  },
  tecnicas: [
    { id: "todas", pt: "Todas", en: "All" },
    { id: "spinning", pt: "Spinning", en: "Spinning" },
    { id: "boia", pt: "Bóia", en: "Float" },
    { id: "fundo", pt: "Fundo", en: "Bottom" },
    { id: "eging", pt: "Eging (Choco/Lula)", en: "Eging (Squid)" },
  ],
  grupos: [
    {
      id: "docs-seguranca",
      nome: {
        pt: "1. Documentação & Segurança",
        en: "1. Documents & Safety",
      },
      itens: [
        {
          id: "licenca",
          tags: ["todas"],
          pt: "Licença de pesca lúdica válida (Multibanco) + Cartão de Cidadão",
          en: "Valid recreational fishing license + ID card",
        },
        {
          id: "telemovel-bateria",
          tags: ["todas"],
          pt: "Telemóvel carregado (100%) + bolsa impermeável ou saco zip",
          en: "Fully charged phone + waterproof pouch or zip bag",
        },
        {
          id: "lanterna-frontal",
          tags: ["todas", "eging", "spinning"],
          pt: "Lanterna frontal (essencial ao amanhecer, anoitecer ou eging noturno)",
          en: "Headlamp (essential at dawn, dusk or night eging)",
        },
        {
          id: "calcado-aderente",
          tags: ["todas"],
          pt: "Calçado antiderrapante (pedras dos molhes e cais escorregadios)",
          en: "Non-slip footwear (slippery pier rocks and docks)",
        },
        {
          id: "luvas-pesca",
          tags: ["todas"],
          pt: "Luvas de pesca antiderrapantes (segurar o peixe com firmeza e proteger de anzóis, barbatanas e cortes)",
          en: "Non-slip fishing gloves (firm grip on fish and protection from hooks, spines, and cuts)",
        },
      ],
    },
    {
      id: "ferramentas",
      nome: {
        pt: "2. Ferramentas & Manuseamento",
        en: "2. Tools & Fish Handling",
      },
      itens: [
        {
          id: "alicate-tesoura",
          tags: ["todas"],
          pt: "Alicate de pontas (tirar anzóis) + tesoura ou corta-fios",
          en: "Needle-nose pliers (unhooking) + braid scissors / line clipper",
        },
        {
          id: "desembochador",
          tags: ["boia", "fundo"],
          pt: "Desembochador (para anzóis engolidos por sargos ou robaletes)",
          en: "Disgorger (for deep-hooked bream or school bass)",
        },
        {
          id: "xalavar",
          tags: ["todas"],
          pt: "Xalavar telescópico (essencial em cais e muralhas altas da Ria)",
          en: "Telescopic landing net (essential on high Ria docks and walls)",
        },
        {
          id: "pano-balde",
          tags: ["todas"],
          pt: "Pano velho para limpar as mãos + balde dobrável",
          en: "Old rag for hands + collapsible bucket with rope",
        },
        {
          id: "regua-medida",
          tags: ["todas"],
          pt: "Fita métrica para verificar tamanhos mínimos legais",
          en: "Measuring tape to check legal minimum sizes",
        },
      ],
    },
    {
      id: "cana-terminal",
      nome: {
        pt: "3. Cana, Montagens & Iscos",
        en: "3. Rod, Terminal Tackle & Bait",
      },
      itens: [
        {
          id: "cana-carreto",
          tags: ["todas"],
          pt: "Cana Caperlan U Fish 2.40 m + carreto Bauxit 3000 (travão testado)",
          en: "Caperlan U Fish 2.40 m rod + Bauxit 3000 reel (drag checked)",
        },
        {
          id: "bobine-estrope",
          tags: ["todas"],
          pt: "Bobine de Fluorocarbono (0,22–0,26 mm) para refazer estralhos",
          en: "Fluorocarbon spool (0.22–0.26 mm) for tying new leaders",
        },
        {
          id: "anzois-destorcedores",
          tags: ["boia", "fundo"],
          pt: "Caixa com anzóis (n.º 4 a 10), destorcedores simples e missangas",
          en: "Tackle box with hooks (#4 to #10), barrel swivels and beads",
        },
        {
          id: "chumbadas-fundo",
          tags: ["fundo"],
          pt: "Chumbadas de correr / pêra (10–25 g) + destorcedores com alfinete",
          en: "Running / pear sinkers (10–25 g) + snap swivels",
        },
        {
          id: "boias-correr",
          tags: ["boia"],
          pt: "Bóias de correr (8–20 g) + nós de correr (stop knots) + chumbos fendidos",
          en: "Sliding floats (8–20 g) + stop knots + split shot weights",
        },
        {
          id: "amostras-spinning",
          tags: ["spinning"],
          pt: "Caixa de spinning: Minnow (7–9 cm), Vinis (7–15 g), Colher e Snaps (alfinetes)",
          en: "Spinning box: Minnow (7–9 cm), Soft Plastics (7–15 g), Spoon & Snaps",
        },
        {
          id: "toneiras-eging",
          tags: ["eging"],
          pt: "Toneiras / Palhaços (#2.5–#3.0) + Egi Snaps (sem destorcedor) + chumbo pêra 10–20 g",
          en: "Squid Jigs (#2.5–#3.0) + Egi Snaps (no swivel) + 10–20 g pear sinker",
        },
        {
          id: "iscos-naturais",
          tags: ["boia", "fundo"],
          pt: "Isco natural (minhoca, camarão, berbigão, pão/massa) + faca pequena",
          en: "Natural bait (worms, shrimp, cockles, bread/paste) + small bait knife",
        },
      ],
    },
    {
      id: "conforto-transporte",
      nome: {
        pt: "4. Conforto & Transporte do Peixe",
        en: "4. Comfort & Catch Storage",
      },
      itens: [
        {
          id: "corta-vento",
          tags: ["todas"],
          pt: "Casaco corta-vento / impermeável leve",
          en: "Windbreaker / light waterproof jacket",
        },
        {
          id: "agua-snack",
          tags: ["todas"],
          pt: "Garrafa de água + snack",
          en: "Water bottle + snack",
        },
        {
          id: "protecao-sol",
          tags: ["todas"],
          pt: "Protetor solar / boné",
          en: "Sunscreen / cap",
        },
        {
          id: "cadeira-pesca",
          tags: ["boia", "fundo"],
          pt: "Cadeira ou banco dobrável (conforto nas esperas)",
          en: "Folding fishing chair or stool (comfort during waiting sessions)",
        },
        {
          id: "saco-lixo",
          tags: ["todas"],
          pt: "Saco para o lixo (trazer sempre linhas partidas, embalagens e pontas de fio)",
          en: "Trash bag (always pack out cut lines, packaging and tag ends)",
        },
        {
          id: "saco-termico",
          tags: ["todas"],
          pt: "Saco térmico com acumuladores de gelo (se fores guardar peixe para comer)",
          en: "Cooler bag with ice packs (if keeping fish for the table)",
        },
      ],
    },
  ],
};
