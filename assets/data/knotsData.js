// ============================================================================
window.EQUIP_DATA = window.EQUIP_DATA || {};

EQUIP_DATA.nos = [
  {
    id: "no-palomar",
    category: "anzol",
    difficulty: "facil",
    name: { pt: "Nó Palomar", en: "Palomar Knot" },
    tag: {
      pt: "Anzóis, destorcedores e snaps",
      en: "Hooks, swivels & snaps",
    },
    tutorialUrl: EQUIP_LINKS.tutoriais.noPalomar,
    videoUrl:
      "https://www.youtube.com/results?search_query=como+fazer+no+palomar+pesca",
    desc: {
      pt: "Nó de fixação direta compacto e de altíssima resistência que passa a linha dobrada pelo olhal, evitando que o multifilamento escorregue ou parta sob tração.",
      en: "Compact, high-strength terminal knot that passes doubled line through the eye, preventing braided line from slipping or cutting under load.",
    },
    use: {
      pt: "Serve para prender destorcedores, snaps (alfinetes), anzóis de olhal largo e amostras diretamente à linha. Usa-se no spinning, bóia ou fundo — sobretudo com multifilamento ou quando precisas de trocar rápido de montagem ao vento ou à noite.",
      en: "Used to tie swivels, snaps, wide-eye hooks, and lures directly to the line. Best for spinning, float, or bottom fishing—especially with slippery braid or when re-rigging quickly at night or in wind.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="34" cy="32" r="10" stroke="var(--channel)" stroke-width="2.5"/>
      <path d="M10 29 L38 29 C54 29, 54 18, 68 18 C82 18, 82 46, 96 46 C110 46, 110 26, 126 32 L168 32"/>
      <path d="M10 35 L38 35 C54 35, 54 46, 68 46 C82 46, 82 18, 96 18 C110 18, 110 38, 126 32" stroke="var(--channel)"/>
    </svg>`,
  },
  {
    id: "no-clinch",
    category: "anzol",
    difficulty: "facil",
    name: { pt: "Nó Clinch Melhorado", en: "Improved Clinch Knot" },
    tag: {
      pt: "Anzóis de olhal pequeno e chumbadas",
      en: "Small-eye hooks & sinkers",
    },
    tutorialUrl: "https://www.animatedknots.com/improved-clinch-knot",
    videoUrl:
      "https://www.youtube.com/results?search_query=como+fazer+no+clinch+melhorado+pesca",
    desc: {
      pt: "Nó clássico de espiras enroladas sobre a linha principal e travadas na base, apresentando um perfil mais fino junto ao olhal do que o nó Palomar.",
      en: "Classic wrapped terminal knot locked at the base, offering a slimmer entry at the hook eye than the Palomar knot.",
    },
    use: {
      pt: "Serve para atar anzóis pequenos, destorcedores, chumbadas com argola ou amostras onde a linha dobrada não cabe no olhal. Ideal com monofilamento e fluorocarbono fino/médio na pesca à bóia, ao fundo ou spinning ligeiro.",
      en: "Used to tie small hooks, swivels, ringed sinkers, or lures where doubled line will not fit through the eye. Ideal with mono and light-to-medium fluorocarbon in float, bottom, or light spinning.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="32" r="9" stroke="var(--channel)" stroke-width="2.5"/>
      <path d="M168 32 L36 32"/>
      <path d="M36 32 C46 18, 56 46, 66 32 C76 18, 86 46, 96 32 C106 18, 116 46, 126 32 C134 22, 142 18, 128 14 C105 10, 55 14, 44 26" stroke="var(--channel)"/>
    </svg>`,
  },
  {
    id: "no-cirurgiao-laco",
    category: "laco",
    difficulty: "facil",
    name: { pt: "Laço de Cirurgião Duplo", en: "Surgeon's Loop" },
    tag: {
      pt: "Laço rápido na ponta do estralho",
      en: "Quick loop at leader end",
    },
    tutorialUrl: "https://www.animatedknots.com/surgeons-loop-knot",
    videoUrl:
      "https://www.youtube.com/results?search_query=como+fazer+laco+cirurgiao+pesca",
    desc: {
      pt: "Nó de argola fixa com dupla passagem que trava firmemente sob tração sem correr nem estrangular a linha, sendo muito mais seguro que um laço simples.",
      en: "Double-passed fixed loop knot that locks securely under tension without slipping or closing, far stronger than a simple overhand loop.",
    },
    use: {
      pt: "Serve para criar uma argola na ponta do estralho para engatar num destorcedor (sistema laço-com-laço) ou trocar anzóis empatados sem cortar linha. Usa-se na pesca ao fundo, surfcasting e bóia para substituir rapidamente estralhos partidos ou embaraçados.",
      en: "Used to form an end loop on a leader for loop-to-loop swivel connections or quick hook-length swaps without cutting line. Very practical in bottom, surfcasting, and float fishing.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M168 32 L96 32"/>
      <path d="M96 32 C84 20, 72 44, 62 32 C54 22, 46 42, 38 32" stroke="var(--channel)" stroke-width="2.2"/>
      <path d="M38 32 C14 14, 14 50, 38 32 Z" stroke="var(--channel)" stroke-width="2.4" fill="var(--channel)" fill-opacity="0.14"/>
    </svg>`,
  },
  {
    id: "no-rapala",
    category: "laco",
    difficulty: "medio",
    name: { pt: "Nó Rapala (Laço Fixo)", en: "Rapala Knot (Non-Slip Loop)" },
    tag: {
      pt: "Laço aberto para amostras sem snap",
      en: "Open loop for lures without snap",
    },
    tutorialUrl: "https://www.animatedknots.com/rapala-knot",
    videoUrl:
      "https://www.youtube.com/results?search_query=como+fazer+no+rapala+pesca",
    desc: {
      pt: "Laço rígido e aberto atado diretamente no olhal da amostra que não fecha sob esforço, dando total liberdade de articulação ao artificial.",
      en: "Open, non-slip loop tied directly to a lure eye that stays open under load, giving hard lures unrestricted swimming freedom.",
    },
    use: {
      pt: "Serve para prender amostras (minnows, passeantes, toneiras) diretamente ao fluorocarbono sem usar snap metálico. Usa-se em águas muito claras, com robalos desconfiados de dia ou em amostras pequenas cujo nadar ficaria pesado com um alfinete.",
      en: "Used to attach lures (minnows, topwaters, squid jigs) directly to fluorocarbon without a metal snap. Best in clear water, for wary daytime sea bass, or with small lures whose action a clip would dampen.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M168 32 L112 32"/>
      <path d="M112 32 C104 22, 96 42, 88 32 C80 22, 72 42, 64 32" stroke="var(--channel)"/>
      <path d="M64 32 C50 18, 22 18, 22 32 C22 46, 50 46, 64 32" stroke="var(--channel)" stroke-width="2.4"/>
      <circle cx="22" cy="32" r="5" fill="var(--channel)" fill-opacity="0.25"/>
    </svg>`,
  },
  {
    id: "no-uni-duplo",
    category: "uniao",
    difficulty: "facil",
    name: { pt: "Nó Uni Duplo (Uni-to-Uni)", en: "Double Uni Knot" },
    tag: {
      pt: "União fácil de duas linhas",
      en: "Easy line-to-line connection",
    },
    tutorialUrl: EQUIP_LINKS.tutoriais.noUniDuplo,
    videoUrl:
      "https://www.youtube.com/results?search_query=como+fazer+no+uni+duplo+pesca",
    desc: {
      pt: "Nó de emenda simétrico composto por dois nós Uni opostos que deslizam um contra o outro até encostarem e travarem com segurança.",
      en: "Symmetrical line-to-line splice made of two opposing Uni knots that slide together and lock securely against each other.",
    },
    use: {
      pt: "Serve para unir duas linhas de diâmetro igual ou semelhante — por exemplo, ligar a linha mãe (multifilamento ou nylon) a um estralho de fluorocarbono, ou emendar uma linha partida na praia. Ideal no spinning, bóia ou surfcasting em qualquer pesqueiro.",
      en: "Used to join two lines of equal or similar diameter—such as connecting mainline braid or mono to a fluorocarbon leader, or repairing a snapped line on the beach. Great for spinning, float, or surfcasting.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="30" x2="112" y2="30" stroke="var(--channel)" stroke-width="2.2"/>
      <line x1="68" y1="34" x2="168" y2="34" stroke-width="2.2"/>
      <path d="M56 24 L56 40 M64 24 L64 40 M72 24 L72 40" stroke="var(--channel)"/>
      <path d="M108 24 L108 40 M116 24 L116 40 M124 24 L124 40"/>
    </svg>`,
  },
  {
    id: "no-albright",
    category: "uniao",
    difficulty: "medio",
    name: { pt: "Nó Albright", en: "Albright Knot" },
    tag: {
      pt: "Multifilamento fino ↔ chicote grosso",
      en: "Thin braid ↔ thicker leader",
    },
    tutorialUrl: "https://www.animatedknots.com/albright-knot",
    videoUrl: EQUIP_LINKS.tutoriais.noAlbright,
    desc: {
      pt: "Nó cónico de perfil alongado em que a linha mais fina envolve uma dobra da linha mais grossa, evitando dobras bruscas e reduzindo o atrito.",
      en: "Slim, tapered splice where the thinner line wraps over a doubled loop of the thicker line, avoiding sharp bends and reducing guide friction.",
    },
    use: {
      pt: "Serve para unir um multifilamento fino a um baixo de fluorocarbono grosso ou a um chicote de arranque. Usa-se em molhes, rochas e zonas com mexilhão onde precisas de um estralho resistente à abrasão sem um nó volumoso que bata nos passadores.",
      en: "Used to join thin braided mainline to a heavy fluorocarbon leader or surfcasting shock leader. Essential around rocky jetties and mussel beds where abrasion resistance and smooth guide passage matter.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 27 L122 27 C134 27, 134 37, 122 37 L12 37" stroke="var(--channel)" stroke-width="2.5"/>
      <path d="M168 32 L116 32 M114 23 L108 41 M104 23 L98 41 M94 23 L88 41 M84 23 L78 41 M74 23 L68 41"/>
    </svg>`,
  },
  {
    id: "no-fg",
    category: "uniao",
    difficulty: "avancado",
    name: { pt: "Nó FG", en: "FG Knot" },
    tag: {
      pt: "União ultrafina para lançamentos longos",
      en: "Ultra-slim casting leader knot",
    },
    tutorialUrl: "https://www.animatedknots.com/fg-knot",
    videoUrl:
      "https://www.youtube.com/results?search_query=como+fazer+no+fg+pesca+facil",
    desc: {
      pt: "Nó de fricção ultrafino em que o multifilamento entrelaça o fluorocarbono em linha reta sem criar caroço nem dobrar o estralho.",
      en: "Ultra-slim friction splice where braided line grips a straight fluorocarbon leader without creating a bulky knot or bending the leader.",
    },
    use: {
      pt: "Serve para ligar multifilamento a estralhos compridos de fluorocarbono (1,5 m a 3 m) que entram dentro dos passadores ao lançar. Usa-se no spinning de praia ou molhes quando precisas de ganhar metros extra no lançamento sem prender nos passadores.",
      en: "Used to join braided mainline to long fluorocarbon leaders (1.5 m–3 m) that wind through rod guides during the cast. Ideal for beach or jetty spinning when maximum casting distance is needed.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="32" x2="128" y2="32" stroke="var(--channel)" stroke-width="3"/>
      <path d="M168 32 L124 32 M122 25 L118 39 M114 25 L110 39 M106 25 L102 39 M98 25 L94 39 M90 25 L86 39 M82 25 L78 39 M74 25 L70 39"/>
    </svg>`,
  },
  {
    id: "no-correr",
    category: "montagens",
    difficulty: "facil",
    name: {
      pt: "Nó de Correr (Stop Knot)",
      en: "Stopper Knot (Float Fishing)",
    },
    tag: { pt: "Pesca à bóia de correr", en: "Sliding float fishing" },
    tutorialUrl: EQUIP_LINKS.tutoriais.noDeCorrer,
    videoUrl:
      "https://www.youtube.com/results?search_query=como+fazer+no+de+correr+pesca+boia",
    desc: {
      pt: "Pequeno nó auxiliar atado à volta da linha principal que desliza por fricção quando ajustado à mão, funcionando como batente regulável.",
      en: "Small auxiliary thread knot tied around the mainline that slides under finger pressure to act as an adjustable depth stop.",
    },
    use: {
      pt: "Serve para definir a profundidade a que o isco trabalha nas montagens de bóia de correr (acompanhado de uma missanga). Usa-se em molhes fundos, pontões ou cais onde a altura da água é maior que o comprimento da cana.",
      en: "Used to set bait depth on sliding float rigs (paired with a small bead). Essential off deep jetties, piers, or harbors where water depth exceeds rod length.",
    },
    svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="32" x2="168" y2="32"/>
      <path d="M54 20 L72 26 M72 26 C78 22, 82 42, 88 26 C94 22, 98 42, 104 26 L124 20" stroke="var(--channel)" stroke-width="2.2"/>
      <circle cx="136" cy="32" r="4" fill="var(--channel)"/>
    </svg>`,
  },
];
