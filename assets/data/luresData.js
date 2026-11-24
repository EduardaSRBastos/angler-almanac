window.EQUIP_DATA = window.EQUIP_DATA || {};

EQUIP_DATA.amostras = [
  {
    id: "minnow",
    matches: ["minnow"],
    name: { pt: "Minnow", en: "Minnow (Hard Lure)" },
    tag: { pt: "Peixe artificial rígido", en: "Hard minnow plug" },
    decathlonUrl: "https://www.decathlon.pt/search?Ntt=amostra+pesca+minnow",
    short: {
      pt: "Peixe artificial rígido com pala frontal que imita um pequeno peixe em fuga.",
      en: "Rigid baitfish imitation with a front lip that wobbles on retrieve.",
    },
    desc: {
      pt: "A pala frontal faz a amostra mergulhar e nadar com um movimento sinuoso (wobbling) ao recolher. Excelente para explorar canais, molhes e zonas de rebentação.",
      en: "The front diving lip makes the lure dive and swim with a tight wobble when retrieved. Ideal for channels, jetties, and surf zones.",
    },
    use: {
      pt: "Robalo, baila · Recolha contínua lenta com pausas ou pequenos toques de ponteira (twitching).",
      en: "Sea bass, spotted bass · Slow steady retrieve with pauses or light rod twitches.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 32 L6 24 M18 32 L6 40" stroke-width="1.5"/>
      <path d="M18 32 L34 32"/>
      <path d="M34 32 C65 14, 125 18, 162 32 C125 46, 65 50, 34 32 Z" fill="var(--channel)" fill-opacity="0.14"/>
      <circle cx="48" cy="29" r="3" fill="currentColor"/>
      <path d="M162 32 L174 22 L171 32 L174 42 Z" fill="var(--channel)" fill-opacity="0.25"/>
      <path d="M78 44 L78 52 M78 52 L73 57 M78 52 L83 57" stroke-width="1.6"/>
      <path d="M134 42 L134 50 M134 50 L129 55 M134 50 L139 55" stroke-width="1.6"/>
    </svg>`,
  },
  {
    id: "vinil",
    matches: ["vinil"],
    name: { pt: "Vinil (Soft Bait)", en: "Soft Plastic (Shad / Grub)" },
    tag: {
      pt: "Amostra flexível com cabeça plombada",
      en: "Soft lure on jighead",
    },
    decathlonUrl: "https://www.decathlon.pt/search?Ntt=vinil+pesca",
    short: {
      pt: "Corpo macio em silicone montado numa cabeça plombada (jighead) com vibração natural.",
      en: "Supple silicone body rigged on a weighted jighead with natural tail action.",
    },
    desc: {
      pt: "A cauda em pá (paddle tail) ou afilada vibra intensamente mesmo a velocidades muito baixas, permitindo pescar rente ao fundo sem prender facilmente.",
      en: "The paddle or tapered tail vibrates even at ultra-slow speeds, letting you work close to the bottom with reduced snag risk.",
    },
    use: {
      pt: "Robalo, linguado, baila · Recolha linear junto ao fundo ou dentes de serra (levantar e deixar cair).",
      en: "Sea bass, flounder · Slow bottom-hugging retrieve or lift-and-drop.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M26 32 C26 22, 42 22, 44 32 C42 42, 26 42, 26 32 Z" fill="var(--channel)" fill-opacity="0.35"/>
      <circle cx="34" cy="29" r="2.5" fill="currentColor"/>
      <path d="M44 25 C75 21, 115 26, 152 30 L166 20 L162 42 L152 34 C115 38, 75 41, 44 39 Z" fill="var(--channel)" fill-opacity="0.14"/>
      <path d="M35 22 L35 15 L68 15 C75 15, 78 20, 74 24" stroke-width="2"/>
      <path d="M74 24 L70 21" stroke-width="1.8"/>
    </svg>`,
  },
  {
    id: "passeante",
    matches: ["passeante"],
    name: { pt: "Passeante (Topwater)", en: "Topwater Stickbait" },
    tag: { pt: "Amostra de superfície", en: "Surface walk-the-dog lure" },
    decathlonUrl:
      "https://www.decathlon.pt/search?Ntt=amostra+superficie+pesca",
    short: {
      pt: "Amostra flutuante sem pala que desliza em ziguezague à superfície da água.",
      en: "Lipless floating lure designed to zig-zag across the water surface.",
    },
    desc: {
      pt: "Trabalhada com toques rítmicos de ponteira (técnica 'walking the dog'), cria um rasto ruidoso à superfície que provoca ataques explosivos de predadores.",
      en: "Worked with rhythmic rod twitches ('walking the dog'), it creates a noisy surface wake that triggers explosive predator strikes.",
    },
    use: {
      pt: "Robalo · Amanhecer, entardecer ou águas calmas/ligeiramente encrespadas sobre fundos baixos.",
      en: "Sea bass · Dawn, dusk, or calm-to-rippled water over shallow flats and jetties.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 18 Q 30 13, 50 18 T 90 18 T 130 18 T 170 18" stroke="var(--channel)" stroke-width="1.3" stroke-dasharray="3 3"/>
      <path d="M26 32 C55 20, 125 20, 158 32 C125 44, 55 44, 26 32 Z" fill="var(--channel)" fill-opacity="0.16"/>
      <circle cx="42" cy="29" r="2.8" fill="currentColor"/>
      <path d="M76 41 L76 49 M76 49 L71 54 M76 49 L81 54" stroke-width="1.6"/>
      <path d="M132 41 L132 49 M132 49 L127 54 M132 49 L137 54" stroke-width="1.6"/>
    </svg>`,
  },
  {
    id: "sabiki",
    matches: ["sabiki"],
    name: { pt: "Sabiki (Metralha)", en: "Sabiki Rig" },
    tag: {
      pt: "Montagem multi-anzol com brilhos",
      en: "Multi-hook feather/skin rig",
    },
    decathlonUrl: "https://www.decathlon.pt/search?Ntt=metralha+sabiki+pesca",
    short: {
      pt: "Linha madre com vários estralhos curtos e pequenos anzóis revestidos a pele de peixe ou fios brilhantes.",
      en: "Mainline rig with multiple short droppers tipped with fish-skin or tinsel flies.",
    },
    desc: {
      pt: "Simula um pequeno cardume de alevins em deslocação. Usa-se com uma chumbada ou pequeno jig na extremidade para lançar longe e trabalhar a meia-água.",
      en: "Imitates a small school of fleeing fry. Weighted at the bottom with a sinker or casting jig for long casts and mid-water retrieval.",
    },
    use: {
      pt: "Cavala, carapau, sarda · Lançar e recolher com pequenos puxões suaves a meia-água.",
      en: "Mackerel, horse mackerel · Cast and retrieve with gentle lifts through mid-water.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="32" x2="152" y2="32"/>
      <path d="M42 32 L56 18 L66 14 M56 18 L67 21" stroke="var(--channel)"/>
      <path d="M78 32 L92 46 L102 43 M92 46 L103 50" stroke="var(--channel)"/>
      <path d="M114 32 L128 18 L138 14 M128 18 L139 21" stroke="var(--channel)"/>
      <path d="M152 27 L168 25 L168 39 L152 37 Z" fill="var(--channel)" fill-opacity="0.3"/>
    </svg>`,
  },
  {
    id: "colher",
    matches: ["colher"],
    name: { pt: "Colher / Casting Jig", en: "Metal Spoon / Casting Jig" },
    tag: {
      pt: "Amostra metálica de longo alcance",
      en: "Long-casting metal lure",
    },
    decathlonUrl:
      "https://www.decathlon.pt/search?Ntt=colher+casting+jig+pesca",
    short: {
      pt: "Lâmina metálica côncava ou compacta que reflete a luz e alcança grandes distâncias de lançamento.",
      en: "Concave or compact metal blade that flashes light and achieves extreme casting distances.",
    },
    desc: {
      pt: "A forma hidrodinâmica corta o vento e produz reflexos intensos e vibração errática durante a recolha ou na queda livre.",
      en: "Its aerodynamic profile cuts through headwinds and creates intense flash and erratic flutter on retrieve or free-fall.",
    },
    use: {
      pt: "Cavala, robalo, baila · Recolha rápida à superfície/meia-água ou dente de serra.",
      en: "Mackerel, sea bass · Fast surface/mid-water retrieve or vertical/diagonal jigging.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="32" r="4"/>
      <path d="M32 32 C58 14, 118 14, 144 32 C118 50, 58 50, 32 32 Z" fill="var(--channel)" fill-opacity="0.22"/>
      <path d="M52 27 C75 21, 102 21, 122 27" stroke="var(--channel)" stroke-width="1.5"/>
      <circle cx="148" cy="32" r="4"/>
      <path d="M152 32 L166 24 M152 32 L168 32 M152 32 L166 40" stroke-width="1.8"/>
    </svg>`,
  },
  {
    id: "toneira",
    matches: ["palhaço", "toneira"],
    name: { pt: "Toneira / Palhaço (Egi)", en: "Squid Jig (Egi)" },
    tag: {
      pt: "Amostra específica para cefalópodes",
      en: "Weighted squid & cuttlefish jig",
    },
    decathlonUrl: "https://www.decathlon.pt/search?Ntt=toneira+palhaco+pesca",
    short: {
      pt: "Amostra em forma de camarão com quilha de chumbo frontal e dupla coroa de agulhas na cauda.",
      en: "Shrimp-shaped lure with a keel weight under the head and dual barbless crown hooks at the tail.",
    },
    desc: {
      pt: "Equilibrada para descer num ângulo de ~45° sem prender as coroas no fundo. Ideal para pescar chocos e lulas junto a paredões, cais e fundos mistos.",
      en: "Balanced to sink at a ~45° angle keeping tail crowns off the bottom. Built for targeting cuttlefish and squid near piers and mixed ground.",
    },
    use: {
      pt: "Choco, lula · Deixar tocar no fundo, dar 2 a 3 puxões secos (darting) e deixar planar novamente.",
      en: "Cuttlefish, squid · Let sink to bottom, impart 2–3 sharp upward jerks, then allow a controlled glide.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 32 C48 18, 108 20, 144 32 C108 42, 48 42, 24 32 Z" fill="var(--channel)" fill-opacity="0.18"/>
      <path d="M46 40 L56 50 L68 41 Z" fill="currentColor"/>
      <circle cx="42" cy="29" r="3" fill="currentColor"/>
      <path d="M144 32 L156 22 M144 32 L158 28 M144 32 L158 36 M144 32 L156 42" stroke-width="1.6"/>
      <path d="M154 32 L166 22 M154 32 L168 32 M154 32 L166 42" stroke-width="1.6"/>
    </svg>`,
  },
];
