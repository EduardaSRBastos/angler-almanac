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
};
