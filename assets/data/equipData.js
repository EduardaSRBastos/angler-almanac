const EQUIP_DATA = {
  amostras: [
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
  ],
  nos: [
    {
      id: "no-palomar",
      category: "anzol",
      difficulty: "facil",
      name: { pt: "Nó Palomar", en: "Palomar Knot" },
      tag: {
        pt: "Anzóis, destorcedores e snaps",
        en: "Hooks, swivels & snaps",
      },
      tutorialUrl: "https://www.animatedknots.com/palomar-knot",
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
      tutorialUrl: "https://www.animatedknots.com/double-uni-knot",
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
      videoUrl:
        "https://www.youtube.com/results?search_query=como+fazer+no+albright+pesca",
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
      tutorialUrl: "https://www.animatedknots.com/uni-knot",
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
  ],
  canas: [
    {
      id: "caperlan-ufish-240",
      nome: {
        pt: '<a href="https://www.decathlon.pt/p/conjunto-de-descoberta-da-pesca-u-fish-2-40/350584/m8843245" target="_blank" rel="noopener noreferrer">Caperlan U Fish 2.40 m (Conjunto Bauxit 100 3000)</a>',
        en: '<a href="https://www.decathlon.pt/p/conjunto-de-descoberta-da-pesca-u-fish-2-40/350584/m8843245" target="_blank" rel="noopener noreferrer">Caperlan U Fish 2.40 m (Bauxit 100 3000 Combo)</a>',
      },
      tipo: {
        pt: "Telescópica Polivalente · 2,40 m · Ação 10–30 g",
        en: "All-round Telescopic · 2.40 m · 10–30 g",
      },
      specs: {
        pt: [
          "Cana: 2,40 m (55 cm fechada, fibra de vidro, ação 10–30 g)",
          "Carreto: Bauxit 100 tamanho 3000 (travão dianteiro)",
          "Linha incluída: Nylon 0,25 mm (25/100)",
        ],
        en: [
          "Rod: 2.40 m (55 cm closed, fiberglass, 10–30 g casting weight)",
          "Reel: Bauxit 100 size 3000 (front drag)",
          "Included line: 0.25 mm Nylon",
        ],
      },
      desc: {
        pt: "Cana curta, leve e muito resistente (fibra de vidro), ideal para pescar perto da margem em cais, pontões, muralhas e canais calmos da Ria.<br>Por ter ação leve (10–30 g) e 2,40 m, não serve para lançamentos longos na praia com mar agitado, mas é excelente para aprender, pescar à bóia, spinning ligeiro ou chumbadinha perto de estruturas.",
        en: "Short, light and durable fiberglass rod, ideal for fishing close to the bank from piers, docks, walls and calm Ria channels.<br>With a light 10–30 g casting weight and 2.40 m length, it is not meant for long surfcasting in rough surf, but excels for learning, float fishing, light spinning or light bottom fishing near structures.",
      },
      use: {
        pt: [
          '<strong>Linhas:</strong><br>• <em><a href="https://www.decathlon.pt/search?Ntt=Monofilamento&facets=attributes.svt395:Poliamida_attributes.svt395:Nylon_attributes.sizeGroupItemLabels:22%2F100_attributes.sizeGroupItemLabels:23%2F100_attributes.sizeGroupItemLabels:23.5%2F100_attributes.sizeGroupItemLabels:25%2F100_attributes.sizeGroupItemLabels:26%2F100_attributes.sizeGroupItemLabels:28%2F100_attributes.sizeGroupItemLabels:0.22%2F100_attributes.sizeGroupItemLabels:0.25%2F100_attributes.sizeGroupItemLabels:0.28%2F100_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Monofilamento 0,22–0,28 mm</a>:</em> O 0,25 mm de origem serve perfeitamente para começar na bóia e chumbadinha.<br>• <em><a href="https://www.decathlon.pt/search?Ntt=Multifilamento&facets=attributes.sizeGroupItemLabels:14%2F100_attributes.sizeGroupItemLabels:0.14%20-%200.37%20mm_attributes.sizeGroupItemLabels:0.14%2F100_attributes.sizeGroupItemLabels:0.10%2F100_attributes.sizeGroupItemLabels:12%2F100_attributes.sizeGroupItemLabels:13%2F100_attributes.sizeGroupItemLabels:10%2F100_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Multifilamento 0,10–0,14 mm</a> + <a href="https://www.decathlon.pt/search?Ntt=Fluorocarbono&facets=attributes.sizeGroupItemLabels:0.24%2F100_attributes.sizeGroupItemLabels:23.5%2F100_attributes.sizeGroupItemLabels:0.23%2F100_attributes.sizeGroupItemLabels:22%2F100_attributes.sizeGroupItemLabels:0.26%2F100_attributes.sizeGroupItemLabels:25%2F100_attributes.sizeGroupItemLabels:0.22%2F100_attributes.sizeGroupItemLabels:26%2F100_attributes.commercialProductNatureLabel:Linha_attributes.commercialProductNatureLabel:Estralho_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Fluorocarbono 0,22–0,26 mm</a>:</em> Maior sensibilidade e resistência à abrasão usando estralho unido com Nó Uni Duplo.',
          '<strong>Anzóis (<a href="https://www.decathlon.pt/search?Ntt=Anzol&facets=attributes.commercialProductNatureLabel:Estralho_attributes.commercialProductNatureLabel:Anzol_attributes.commercialProductNatureLabel:Anzol%20montado_attributes.sizeGroupItemLabels:4_attributes.sizeGroupItemLabels:6_attributes.sizeGroupItemLabels:8_attributes.sizeGroupItemLabels:10_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">n.º 4 a n.º 10</a>):</strong><br>• <em>Anzóis n.º 8 e n.º 10:</em> Ideais para tainhas, sargos pequenos, bogas, carapaus, linguados e robaletes com isco fino (minhoca de sangue, coreano fino, pedacinhos de camarão ou massa/pão).<br>• <em>Anzol n.º 6:</em> O tamanho mais polivalente para a tua cana, funciona bem para sargos médios, robaletes, douradotas e solhas.<br>• <em>Anzol n.º 4:</em> Permite iscar camarão inteiro, casulo inteiro ou tira de lula/sardinha, abrindo porta a douradas, bailas, robalos maiores e fanecas sem que os peixes pequenos roubem o isco tão depressa.',
          '<strong>Chumbadas e bóias:</strong><br>• <em><a href="https://www.decathlon.pt/todos-os-desportos/pesca/chumbos-chumbadas-pesca" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Chumbadas de 10 g a 25 g</a>:</em> Ideais para chumbadinha ou fundo ligeiro (nunca ultrapassar os 30 g!).<br>• <em><a href="https://www.decathlon.pt/search?Ntt=boia+pesca&facets=attributes.sizeGroupItemLabels:8%20g_attributes.sizeGroupItemLabels:10%20g_attributes.sizeGroupItemLabels:20%20g_attributes.sizeGroupItemLabels:15%20g_attributes.sizeGroupItemLabels:T3_attributes.sizeGroupItemLabels:T2_attributes.commercialProductNatureLabel:Acess%C3%B3rios%20de%20pesca" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Bóia de correr de 8 g a 20 g</a>:</em> Perfeita para pescar junto a muralhas, cais e canais com corrente.',
          '<strong>Amostras até 25 g:</strong><br>• <em><a href="https://www.decathlon.pt/search?Ntt=minnow&facets=attributes.svt609:9%20cm_attributes.svt609:8%20cm_attributes.svt609:7%2C5%20cm_attributes.svt609:7%20cm_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Minnow pequeno (7–9 cm)</a>:</em> Ideal para robalos e bailas perto da superfície ou a meia-água.<br>• <em><a href="https://www.decathlon.pt/search?Ntt=vinis+shads&facets=attributes.svt589:15%20g_attributes.svt589:14g%20-%201%2F2oz_attributes.svt589:13%20g_attributes.svt589:12%20g_attributes.svt589:11%20g_attributes.svt589:10%20g_attributes.svt589:9%20g_attributes.svt589:8%20g_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Vinil com cabeça de 7–15 g</a>:</em> Excelente para trabalhar junto ao fundo nos canais e pontões atrás de robalos e linguados.<br>• <em><a href="https://www.decathlon.pt/todos-os-desportos/pesca/colheres-rotativas-spinners-pesca" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Colher ondulante</a>:</em> Muito eficaz em recolha contínua para cavala, carapau, baila e robalo.<br>• <em><a href="https://www.decathlon.pt/todos-os-desportos/pesca/palhacos-toneiras-amostras-cefalopodes-pesca/f-sg_10-3-cm_36-tamanho-unico" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Toneira (#2.5–#3.0)</a>:</em> Específica para pescar choco e lula nos cais e zonas iluminadas.',
        ],
        en: [
          '<strong>Lines:</strong><br>• <em><a href="https://www.decathlon.pt/search?Ntt=Monofilamento&facets=attributes.svt395:Poliamida_attributes.svt395:Nylon_attributes.sizeGroupItemLabels:22%2F100_attributes.sizeGroupItemLabels:23%2F100_attributes.sizeGroupItemLabels:23.5%2F100_attributes.sizeGroupItemLabels:25%2F100_attributes.sizeGroupItemLabels:26%2F100_attributes.sizeGroupItemLabels:28%2F100_attributes.sizeGroupItemLabels:0.22%2F100_attributes.sizeGroupItemLabels:0.25%2F100_attributes.sizeGroupItemLabels:0.28%2F100_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">0.22–0.28 mm Monofilament</a>:</em> The stock 0.25 mm works great to start with float and light bottom fishing.<br>• <em><a href="https://www.decathlon.pt/search?Ntt=Multifilamento&facets=attributes.sizeGroupItemLabels:14%2F100_attributes.sizeGroupItemLabels:0.14%20-%200.37%20mm_attributes.sizeGroupItemLabels:0.14%2F100_attributes.sizeGroupItemLabels:0.10%2F100_attributes.sizeGroupItemLabels:12%2F100_attributes.sizeGroupItemLabels:13%2F100_attributes.sizeGroupItemLabels:10%2F100_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">0.10–0.14 mm Braid</a> + <a href="https://www.decathlon.pt/search?Ntt=Fluorocarbono&facets=attributes.sizeGroupItemLabels:0.24%2F100_attributes.sizeGroupItemLabels:23.5%2F100_attributes.sizeGroupItemLabels:0.23%2F100_attributes.sizeGroupItemLabels:22%2F100_attributes.sizeGroupItemLabels:0.26%2F100_attributes.sizeGroupItemLabels:25%2F100_attributes.sizeGroupItemLabels:0.22%2F100_attributes.sizeGroupItemLabels:26%2F100_attributes.commercialProductNatureLabel:Linha_attributes.commercialProductNatureLabel:Estralho_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">0.22–0.26 mm Fluorocarbon</a>:</em> Higher sensitivity and abrasion resistance using a leader tied with a Double Uni Knot.',
          '<strong>Hooks (<a href="https://www.decathlon.pt/search?Ntt=Anzol&facets=attributes.commercialProductNatureLabel:Estralho_attributes.commercialProductNatureLabel:Anzol_attributes.commercialProductNatureLabel:Anzol%20montado_attributes.sizeGroupItemLabels:4_attributes.sizeGroupItemLabels:6_attributes.sizeGroupItemLabels:8_attributes.sizeGroupItemLabels:10_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Size #4 to #10</a>):</strong><br>• <em>Size #8 & #10 hooks:</em> Ideal for mullet, small bream, bogue, horse mackerel, flounder and school bass using fine bait (bloodworm, ragworm, small shrimp pieces or bread/paste).<br>• <em>Size #6 hook:</em> The most versatile size for this rod, works great for medium bream, school bass, gilthead bream and sole.<br>• <em>Size #4 hook:</em> Fits whole shrimp, whole lugworm or squid/sardine strips, targeting gilthead bream, spotted bass, keeper sea bass and pouting while preventing small fish from stealing the bait.',
          '<strong>Sinkers & floats:</strong><br>• <em><a href="https://www.decathlon.pt/todos-os-desportos/pesca/chumbos-chumbadas-pesca" target="_blank" rel="noopener noreferrer" class="cana-inline-link">10 g to 25 g weights</a>:</em> Ideal for light bottom fishing (never exceed 30 g!).<br>• <em><a href="https://www.decathlon.pt/search?Ntt=boia+pesca&facets=attributes.sizeGroupItemLabels:8%20g_attributes.sizeGroupItemLabels:10%20g_attributes.sizeGroupItemLabels:20%20g_attributes.sizeGroupItemLabels:15%20g_attributes.sizeGroupItemLabels:T3_attributes.sizeGroupItemLabels:T2_attributes.commercialProductNatureLabel:Acess%C3%B3rios%20de%20pesca" target="_blank" rel="noopener noreferrer" class="cana-inline-link">8 g to 20 g Sliding Float</a>:</em> Great for fishing near walls, piers and channels with current.',
          '<strong>Lures up to 25 g:</strong><br>• <em><a href="https://www.decathlon.pt/search?Ntt=minnow&facets=attributes.svt609:9%20cm_attributes.svt609:8%20cm_attributes.svt609:7%2C5%20cm_attributes.svt609:7%20cm_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Small Minnow (7–9 cm)</a>:</em> Ideal for sea bass and spotted bass near the surface or mid-water.<br>• <em><a href="https://www.decathlon.pt/search?Ntt=vinis+shads&facets=attributes.svt589:15%20g_attributes.svt589:14g%20-%201%2F2oz_attributes.svt589:13%20g_attributes.svt589:12%20g_attributes.svt589:11%20g_attributes.svt589:10%20g_attributes.svt589:9%20g_attributes.svt589:8%20g_" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Soft Plastic (7–15 g jighead)</a>:</em> Great for bouncing along the bottom in channels and piers for bass and flounder.<br>• <em><a href="https://www.decathlon.pt/todos-os-desportos/pesca/colheres-rotativas-spinners-pesca" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Spoon</a>:</em> Very effective on a steady retrieve for mackerel, horse mackerel, spotted bass and sea bass.<br>• <em><a href="https://www.decathlon.pt/todos-os-desportos/pesca/palhacos-toneiras-amostras-cefalopodes-pesca/f-sg_10-3-cm_36-tamanho-unico" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Squid Jig (#2.5–#3.0)</a>:</em> Specifically designed for cuttlefish and squid from piers and lit areas.',
        ],
      },
      svg: `<svg viewBox="0 0 220 90" fill="none" xmlns="http://w3.org">
        <line x1="15" y1="68" x2="205" y2="22" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="15" y1="68" x2="48" y2="60" stroke="var(--accent, #0ea5e9)" stroke-width="6" stroke-linecap="round"/>
        <circle cx="58" cy="65" r="7" stroke="currentColor" stroke-width="2"/>
        <line x1="58" y1="57" x2="58" y2="60" stroke="currentColor" stroke-width="2"/>
        <circle cx="95" cy="48" r="2.5" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="135" cy="38" r="2.2" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="172" cy="29" r="1.8" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="205" cy="22" r="1.5" fill="var(--accent, #0ea5e9)"/>
        <path d="M58 72 C 95 78, 155 62, 205 23" stroke="var(--accent, #0ea5e9)" stroke-width="1.2" stroke-dasharray="3 2"/>
      </svg>`,
    },
  ],
  checklist: {
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
  },
};

if (typeof EQUIP_DATA !== "undefined") {
  EQUIP_DATA.montagens = [
    {
      id: "montagem-spinning",
      name: {
        pt: "Montagem de Spinning (Robalo / Baila)",
        en: "Spinning Rig (Sea Bass / Spotted Bass)",
      },
      tag: {
        pt: "Ria, Molhes e Praia · Amostras Artificiais",
        en: "Estuary, Jetties & Surf · Artificial Lures",
      },
      desc: {
        pt: '<strong>Como montar (do carreto para a amostra):</strong><br>• <strong>1. Linha do carreto:</strong> Multifilamento (0,14–0,18 mm).<br>• <strong>2. União:</strong> Liga ao estralho com <a href="https://www.animatedknots.com/uni-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Nó Uni Duplo</a> ou <a href="https://www.youtube.com/watch?v=Fhn7Zd1Wxdw" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Nó Albright</a>.<br>• <strong>3. Estralho:</strong> 1 m a 1,5 m de Fluorocarbono (0,30–0,40 mm).<br>• <strong>4. Ponta:</strong> Ata um <strong>Alfinete (Snap)</strong> sem destorcedor com <a href="https://www.animatedknots.com/palomar-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Nó Palomar</a> e engata a amostra (Minnow, Vinil ou Passeante).',
        en: '<strong>How to rig (reel to lure):</strong><br>• <strong>1. Mainline:</strong> Braided line (0.14–0.18 mm).<br>• <strong>2. Connection:</strong> Join to leader using a <a href="https://www.animatedknots.com/uni-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Double Uni Knot</a> or <a href="https://www.youtube.com/watch?v=Fhn7Zd1Wxdw" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Albright Knot</a>.<br>• <strong>3. Leader:</strong> 1 m to 1.5 m of Fluorocarbon (0.30–0.40 mm).<br>• <strong>4. Terminal end:</strong> Tie a <strong>Snap</strong> (no swivel) with a <a href="https://www.animatedknots.com/palomar-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Palomar Knot</a> and clip on the lure (Minnow, Soft Plastic, or Topwater).',
      },
      use: {
        pt: "O fluorocarbono torna a linha invisível junto à amostra e aguenta o roçar nas pedras e ostras dos cais da Ria de Aveiro e molhes da Barra. Usa-se apenas o <strong>Alfinete (Snap)</strong> (sem destorcedor) para não desequilibrar o nadar da amostra e trocá-la em segundos.",
        en: "Fluorocarbon keeps the terminal end invisible and resists abrasion against rocks and oysters in Aveiro's piers and jetties. Use a plain <strong>Snap</strong> (no swivel) so the lure swims naturally and can be swapped in seconds.",
      },
      svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="32" x2="54" y2="32" stroke-width="2.2"/>
        <circle cx="58" cy="32" r="3.5" fill="var(--channel)"/>
        <line x1="62" y1="32" x2="112" y2="32" stroke="var(--channel)" stroke-width="2" stroke-dasharray="4 2"/>
        <rect x="112" y="29" width="10" height="6" rx="3" stroke="currentColor"/>
        <path d="M124 32 C138 22, 158 24, 170 32 C158 40, 138 42, 124 32 Z" fill="var(--channel)" fill-opacity="0.22"/>
        <circle cx="132" cy="30" r="1.8" fill="currentColor"/>
      </svg>`,
    },
    {
      id: "montagem-fundo",
      name: {
        pt: "Montagem de Fundo com Chumbada (Dourada / Linguado)",
        en: "Running Ledger Bottom Rig (Bream / Flounder)",
      },
      tag: {
        pt: "Cais, Canais e Surfcasting · Isco Natural",
        en: "Piers, Channels & Surf · Natural Bait",
      },
      desc: {
        pt: '<strong>Como montar (de cima para baixo):</strong><br>• <strong>1. Linha do carreto:</strong> Monofilamento (0,30–0,35 mm) passa livremente por dentro de um <strong>Destorcedor com Alfinete</strong> (onde penduras a chumbada de 40 g a 120 g) e depois por uma missanga de borracha.<br>• <strong>2. Travão:</strong> Ata a ponta da linha do carreto a um <strong>Destorcedor simples</strong> com <a href="https://www.animatedknots.com/palomar-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Nó Palomar</a> (a missanga protege este nó do impacto da chumbada).<br>• <strong>3. Estralho:</strong> Na outra argola do destorcedor simples, ata 60 cm a 1,2 m de Fluorocarbono (0,22–0,30 mm).<br>• <strong>4. Ponta:</strong> Anzol (n.º 1 a 4) com isco natural.',
        en: '<strong>How to rig (top to bottom):</strong><br>• <strong>1. Mainline:</strong> Thread Monofilament (0.30–0.35 mm) freely through a <strong>Snap Swivel</strong> (clipping on a 40–120 g sinker) followed by a rubber bead.<br>• <strong>2. Stopper:</strong> Tie the end of the mainline to a plain <strong>Swivel</strong> using a <a href="https://www.animatedknots.com/palomar-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Palomar Knot</a> (the bead cushions the knot from the sliding sinker).<br>• <strong>3. Hooklength:</strong> Tie 60 cm to 1.2 m of Fluorocarbon (0.22–0.30 mm) to the bottom ring of the swivel.<br>• <strong>4. Terminal end:</strong> Hook (size 1–4) with natural bait.',
      },
      use: {
        pt: "Como o <strong>Destorcedor com Alfinete</strong> da chumbada desliza livremente na linha, o peixe (dourada, sargo ou linguado) morde o isco sem sentir o peso do chumbo e não desconfia. O destorcedor simples evita que a corrente enrole o estralho.",
        en: "Because the sinker's <strong>Snap Swivel</strong> slides freely along the mainline, cautious fish like gilthead bream can pick up bait without feeling lead resistance. The inline swivel prevents line twist in strong currents.",
      },
      svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="24" x2="86" y2="24"/>
        <circle cx="62" cy="24" r="3" stroke="var(--channel)"/>
        <line x1="62" y1="27" x2="62" y2="38"/>
        <polygon points="56,38 68,38 65,52 59,52" fill="var(--channel)" fill-opacity="0.3"/>
        <circle cx="89" cy="24" r="3" fill="currentColor"/>
        <line x1="92" y1="24" x2="152" y2="24" stroke="var(--channel)"/>
        <path d="M152 24 L164 24 C170 24, 170 33, 163 33 C159 33, 158 30, 159 28" stroke-width="2"/>
      </svg>`,
    },
    {
      id: "montagem-boia",
      name: {
        pt: "Montagem à Bóia de Correr (Sargo / Tainha)",
        en: "Sliding Float Rig (White Bream / Mullet)",
      },
      tag: {
        pt: "Molhes e Cais Fundos · Profundidade Regulável",
        en: "Deep Jetties & Harbors · Adjustable Depth",
      },
      desc: {
        pt: "<strong>Como montar (de cima para baixo):</strong><br>• <strong>1. Travão de profundidade:</strong> Faz um Nó de Correr (Stop Knot)</a> na linha do carreto e coloca uma missanga pequena por baixo.<br>• <strong>2. Bóia:</strong> Passa a linha pelo olhal da bóia de correr (5 g a 20 g) — a bóia desliza livremente até bater na missanga.<br>• <strong>3. Calibragem e ligação:</strong> Coloca chumbos fendidos (ou olivette) até a bóia ficar direita na água e ata um <strong>Destorcedor simples</strong> pequeno na ponta.<br>• <strong>4. Estralho e anzol:</strong> Ata 50–80 cm de Fluorocarbono (0,18–0,24 mm) ao destorcedor e um anzol (n.º 6 a 10).",
        en: "<strong>How to rig (top to bottom):</strong><br>• <strong>1. Depth stopper:</strong> Tie a Stopper Knot</a> on the mainline and slide on a small bead below it.<br>• <strong>2. Float:</strong> Thread the line through the sliding float (5–20 g) — it slides freely until hitting the bead.<br>• <strong>3. Shotting & swivel:</strong> Add split shot (or an olivette) until the float sits upright and tie a small plain <strong>Swivel</strong> at the end.<br>• <strong>4. Hooklength & hook:</strong> Tie 50–80 cm of Fluorocarbon (0.18–0.24 mm) to the swivel and attach a size 6–10 hook.",
      },
      use: {
        pt: "Permite pescar a 4, 6 ou 8 metros de profundidade com uma cana curta: basta deslizar o <strong>Nó de Correr</strong> para cima ou para baixo na linha para escolher a altura a que o isco fica.",
        en: "Lets you fish 4–8 meters deep with a short rod simply by sliding the <strong>Stopper Knot</strong> up or down the mainline to set bait depth.",
      },
      svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="30" x2="112" y2="30"/>
        <line x1="28" y1="25" x2="28" y2="35" stroke="var(--channel)" stroke-width="2.4"/>
        <circle cx="34" cy="30" r="2.2" fill="var(--channel)"/>
        <ellipse cx="62" cy="30" rx="14" ry="7" fill="var(--channel)" fill-opacity="0.25"/>
        <circle cx="90" cy="30" r="2.5" fill="currentColor"/>
        <circle cx="98" cy="30" r="2" fill="currentColor"/>
        <circle cx="115" cy="30" r="2.5"/>
        <line x1="118" y1="30" x2="156" y2="30" stroke="var(--channel)"/>
        <path d="M156 30 L166 30 C171 30, 171 38, 165 38 C162 38, 161 35, 162 33"/>
      </svg>`,
    },
    {
      id: "montagem-eging",
      name: {
        pt: "Montagem de Eging (Choco e Lula)",
        en: "Eging Rig (Cuttlefish & Squid)",
      },
      tag: {
        pt: "Cais do Bico, Barra e Molhes · Cefalópodes",
        en: "Cais do Bico & Jetties · Cephalopods",
      },
      desc: {
        pt: '<strong>Como montar (do carreto para a toneira):</strong><br>• <strong>1. Linha do carreto:</strong> Multifilamento fino (0,10–0,14 mm).<br>• <strong>2. União:</strong> Liga ao estralho com <a href="https://www.animatedknots.com/uni-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Nó Uni Duplo</a>.<br>• <strong>3. Estralho:</strong> ~1,2 m de Fluorocarbono (0,24–0,30 mm).<br>• <strong>4. Ponta:</strong> Ata um <strong>Alfinete largo (Egi Snap)</strong> sem destorcedor com <a href="https://www.animatedknots.com/palomar-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Nó Palomar</a> e engata o Palhaço / Toneira (#2.5 a #3.5).',
        en: '<strong>How to rig (reel to squid jig):</strong><br>• <strong>1. Mainline:</strong> Thin Braided line (0.10–0.14 mm).<br>• <strong>2. Connection:</strong> Join to leader with a <a href="https://www.animatedknots.com/uni-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Double Uni Knot</a>.<br>• <strong>3. Leader:</strong> ~1.2 m of Fluorocarbon (0.24–0.30 mm).<br>• <strong>4. Terminal end:</strong> Tie a wide <strong>Egi Snap</strong> (no swivel) using a <a href="https://www.animatedknots.com/palomar-knot" target="_blank" rel="noopener noreferrer" class="cana-inline-link">Palomar Knot</a> and clip on the Squid Jig (#2.5–#3.5).',
      },
      use: {
        pt: "Usa-se apenas o <strong>Alfinete (Egi Snap)</strong> (sem destorcedor) para o palhaço afundar no ângulo certo de 45°. Se houver muita corrente no cais ou molhe, podes engatar uma chumbada tipo pêra (10–30 g) no mesmo alfinete.",
        en: "Uses a direct <strong>Egi Snap</strong> (no swivel) so the jig sinks at the proper 45° angle. In strong current, clip a pear sinker (10–30 g) onto the same snap to stay near the bottom.",
      },
      svg: `<svg viewBox="0 0 180 64" width="180" height="64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="30" x2="54" y2="30" stroke-width="2"/>
        <circle cx="58" cy="30" r="3" fill="var(--channel)"/>
        <line x1="61" y1="30" x2="106" y2="30" stroke="var(--channel)" stroke-dasharray="4 2"/>
        <path d="M106 30 L114 27 L114 33 Z" fill="currentColor"/>
        <path d="M116 30 C130 20, 150 22, 162 30 C150 37, 130 37, 116 30 Z" fill="var(--channel)" fill-opacity="0.22"/>
        <path d="M126 35 L131 41 L136 36 Z" fill="currentColor"/>
        <path d="M162 30 L170 24 M162 30 L171 30 M162 30 L170 36"/>
      </svg>`,
    },
  ];
}
