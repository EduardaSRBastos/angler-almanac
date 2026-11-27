// =========================================================
// DADOS DAS ESPÉCIES: Identificação Visual, Biologia e Regras
// =========================================================

window.SPECIES_DATA = [
  {
    id: "robalo",
    nome: { pt: "Robalo", en: "European Seabass" },
    cientifico: "Dicentrarchus labrax",
    minCm: "36 cm",
    habitat: {
      pt: "Salobra / Mar (canais, barras, praias)",
      en: "Brackish / Sea (channels, inlets, beaches)",
    },
    epoca: "Out–Dez e Mar–Abr",
    identificacao: {
      pt: "Corpo alongado e fusiforme, dorso cinzento-azulado ou esverdeado e flancos prateados lisos (sem pintas pretas nos adultos; os juvenis podem ter algumas pintas que desaparecem com a idade). Possui uma mancha escura difusa no bordo superior do opérculo (guelra) e duas barbatanas dorsais bem separadas (a primeira com espinhos rígidos).",
      en: "Elongated fusiform body with a grey-blue or greenish back and plain silver flanks (no black spots in adults; juveniles may have faint spots that fade with age). Features a dark diffuse blotch on the upper gill cover (operculum) and two clearly separated dorsal fins (the first with stiff spines).",
    },
    confusao: {
      pt: "Baila (Dicentrarchus punctatus): a baila tem inúmeras pintas pretas espalhadas pelos flancos mesmo em adulta e olhos proporcionalmente maiores.",
      en: "Spotted seabass (Dicentrarchus punctatus): retains numerous black spots scattered across its flanks into adulthood and has proportionally larger eyes.",
    },
    iscaTecnica: {
      pt: "Camarão vivo/fresco, sardinha, casulo, minhoca-da-lama; minnows, vinis e passeantes em spinning ou surfcasting.",
      en: "Live/fresh shrimp, sardine, ragworm, lugworm; minnows, soft plastics, and topwaters via spinning or surfcasting.",
    },
  },
  {
    id: "baila",
    nome: { pt: "Baila", en: "Spotted Seabass" },
    cientifico: "Dicentrarchus punctatus",
    minCm: "20 cm",
    habitat: {
      pt: "Mar / praia e zonas de rebentação",
      en: "Sea / beaches and surf zones",
    },
    epoca: "Out–Mar",
    identificacao: {
      pt: "Muito semelhante na silhueta ao robalo, mas de porte mais pequeno e corpo ligeiramente mais alto. Distingue-se facilmente pelas dezenas de pequenas pintas pretas bem marcadas ao longo dos flancos prateados e pela mancha negra nítida no opérculo.",
      en: "Very similar in silhouette to the European seabass, though smaller and slightly deeper-bodied. Easily distinguished by dozens of distinct small black spots across its silver flanks and a sharp black spot on the gill cover.",
    },
    confusao: {
      pt: "Robalo juvenil: o robalo perde as pintas à medida que cresce e tem o focinho mais pontiagudo.",
      en: "Juvenile European seabass: loses its spots as it grows and has a more pointed snout.",
    },
    iscaTecnica: {
      pt: "Casulo, minhoca-da-lama e camarão em surfcasting junto às valas e espumas da praia.",
      en: "Ragworm, lugworm, and shrimp in surfcasting along beach troughs and whitewater.",
    },
  },
  {
    id: "dourada",
    nome: { pt: "Dourada", en: "Gilthead Seabream" },
    cientifico: "Sparus aurata",
    minCm: "19 cm",
    habitat: {
      pt: "Salobra / Mar (ria, molhes, fundos de areia e cascalho)",
      en: "Brackish / Sea (lagoon, jetties, sand & gravel bottoms)",
    },
    epoca: "Mai–Nov",
    identificacao: {
      pt: "Corpo oval e alto, comprimido lateralmente, de cor cinzento-prateada. A marca inconfundível é uma faixa dourada brilhante em forma de meia-lua entre os olhos, acompanhada por uma mancha negra na origem da linha lateral (junto ao opérculo) e uma borda avermelhada no opérculo. Boca com dentes molares fortes para esmagar conchas.",
      en: "Oval, deep, laterally compressed silver-grey body. Unmistakable golden crescent band between the eyes, accompanied by a black blotch at the start of the lateral line (near the gill cover) and a reddish gill-cover edge. Strong molar teeth designed to crush shells.",
    },
    confusao: {
      pt: "Sargo ou Besugo: nenhum outro esparídeo tem a barra dourada frontal entre os olhos.",
      en: "White seabream or axillary seabream: no other seabream has the golden frontal bar between the eyes.",
    },
    iscaTecnica: {
      pt: "Caranguejo-verde/pilado, berbigão, amêijoa, mexilhão e tiras de lula em pesca ao fundo ou surfcasting.",
      en: "Green/velvet crab, cockle, clam, mussel, and squid strips on bottom ledgering or surfcasting rigs.",
    },
  },
  {
    id: "sargo-legitimo",
    nome: { pt: "Sargo-legítimo", en: "White Seabream" },
    cientifico: "Diplodus sargus",
    minCm: "17 cm",
    habitat: {
      pt: "Mar / barra (molhes, pedras, zonas de espuma)",
      en: "Sea / inlet (jetties, rocks, whitewater)",
    },
    epoca: "Mai–Nov",
    identificacao: {
      pt: "Corpo alto, oval e muito achatado lateralmente, prateado com 7 a 9 riscas verticais escuras nos flancos (mais nítidas nos jovens) e uma mancha preta característica no pedúnculo caudal (antes da cauda, em forma de sela que não fecha totalmente por baixo). Bordo traseiro da barbatana caudal debruado a preto.",
      en: "Deep, oval, strongly laterally compressed silver body with 7 to 9 dark vertical bars on the flanks (stronger in juveniles) and a characteristic black saddle blotch on the caudal peduncle (just before the tail, not fully meeting underneath). Rear edge of the tail fin bordered in black.",
    },
    confusao: {
      pt: "Sargo-safia (Diplodus vulgaris): o safia tem duas bandas pretas largas (uma na nuca e outra antes da cauda) e não tem riscas verticais finas.",
      en: "Two-banded seabream (Diplodus vulgaris): has two broad black bands (one behind the head, one before the tail) and lacks thin vertical bars.",
    },
    iscaTecnica: {
      pt: "Camarão, mexilhão, caranguejo e casulo à bóia junto às pedras/espuma ou ao fundo.",
      en: "Shrimp, mussel, crab, and ragworm float-fished near rocks and whitewater or on bottom rigs.",
    },
  },
  {
    id: "besugo-alcorraz",
    nome: { pt: "Besugo / Alcorraz", en: "Axillary Seabream" },
    cientifico: "Pagellus acarne",
    minCm: "18/14 cm",
    habitat: {
      pt: "Salobra / Mar (fundos de areia e lodo da ria)",
      en: "Brackish / Sea (sand and mud lagoon bottoms)",
    },
    epoca: "Mai–Out",
    identificacao: {
      pt: "Corpo alongado e oval, de tom rosado-prateado pálido no dorso e branco-prateado no ventre. Caracteriza-se por uma pequena mancha escura (castanho-avermelhada ou preta) mesmo na axila (base) da barbatana peitoral e olhos relativamente grandes.",
      en: "Elongated oval body with a pale pinkish-silver back and silvery-white belly. Distinguished by a small dark (reddish-brown or black) spot right at the axil (base) of the pectoral fin and relatively large eyes.",
    },
    confusao: {
      pt: "Goraz juvenil (Pagellus bogaraveo): o goraz tem a mancha preta mais acima e atrás do opérculo, e não na base da barbatana peitoral.",
      en: "Juvenile blackspot seabream (Pagellus bogaraveo): has its black spot higher up behind the gill cover rather than at the pectoral fin base.",
    },
    iscaTecnica: {
      pt: "Camarão descascado, berbigão e minhoca-da-lama ao fundo ou à bóia com anzóis pequenos.",
      en: "Peeled shrimp, cockle, and lugworm on bottom or float rigs with small hooks.",
    },
  },
  {
    id: "tainha",
    nome: { pt: "Tainha", en: "Thicklip / Flathead Grey Mullet" },
    cientifico: "Chelon labrosus / Mugil cephalus",
    minCm: "20 cm",
    habitat: {
      pt: "Salobra / Mar (cais, canais, zonas portuárias)",
      en: "Brackish / Sea (piers, channels, harbor areas)",
    },
    epoca: "Mai–Out",
    identificacao: {
      pt: "Corpo cilíndrico e hidrodinâmico, cabeça larga e achatada no topo, boca pequena terminal sem dentes visíveis e olhos grandes (com pálpebra adiposa bem visível na tainha-olhalvo). Dorso cinzento-azulado ou acastanhado e flancos prateados percorridos por 6 a 7 riscas longitudinais escuras.",
      en: "Cylindrical streamlined body, broad flat-topped head, small terminal mouth without visible teeth, and large eyes (with a prominent adipose eyelid in flathead mullet). Grey-blue or brownish back and silver flanks striped with 6 to 7 dark longitudinal lines.",
    },
    confusao: {
      pt: "Robalo: a tainha tem boca muito pequena, cabeça achatada e duas barbatanas dorsais curtas e bem afastadas (a primeira com apenas 4 espinhos).",
      en: "Seabass: mullet have a very small mouth, flattened head, and two short, widely spaced dorsal fins (the first with only 4 spines).",
    },
    iscaTecnica: {
      pt: "Pão, massa de farinha/queijo e larvas de mosca (asticot) à bóia leve com engodagem moderada.",
      en: "Bread, flour/cheese paste, and maggots on light float tackle with moderate groundbaiting.",
    },
  },
  {
    id: "linguado",
    nome: { pt: "Linguado", en: "Common / Senegalese Sole" },
    cientifico: "Solea solea / Solea senegalensis",
    minCm: "24 cm",
    habitat: {
      pt: "Salobra / Mar (fundos de areia e vasa)",
      en: "Brackish / Sea (sand and mud bottoms)",
    },
    epoca: "Out–Mar",
    identificacao: {
      pt: "Peixe chato bentónico com ambos os olhos no lado direito do corpo. Forma oval alongada (língua), focinho arredondado que ultrapassa a boca curva e pequena. Face superior castanho-acinzentada ou areia mimética e face inferior branca. No linguado-legítimo, a barbatana peitoral tem uma mancha preta bem marcada na ponta.",
      en: "Benthic flatfish with both eyes on the right side of the body. Elongated tongue-like oval shape with a rounded snout overhanging a small curved mouth. Camouflaged grey-brown upper side and white underside. Common sole features a distinct black blotch at the tip of the pectoral fin.",
    },
    confusao: {
      pt: "Solha-da-pedra (Platichthys flesus): a solha é mais larga (losangular), tem pele mais áspera com tubérculos ósseos ao longo da linha lateral e manchas alaranjadas.",
      en: "European flounder (Platichthys flesus): wider diamond shape, rougher skin with bony tubercles along the lateral line, and often orange spots.",
    },
    iscaTecnica: {
      pt: "Minhoca-da-lama, tiras finas de lula e camarão ao fundo com estralhos rasantes ao substrato.",
      en: "Lugworm, thin squid strips, and shrimp on bottom rigs kept flush with the seabed.",
    },
  },
  {
    id: "solha-da-pedra",
    nome: { pt: "Solha-da-pedra", en: "European Flounder" },
    cientifico: "Platichthys flesus",
    minCm: "22 cm",
    habitat: {
      pt: "Salobra (estuários, canais da ria, fundos de vasa/areia)",
      en: "Brackish (estuaries, lagoon channels, mud/sand bottoms)",
    },
    epoca: "Nov–Mar",
    identificacao: {
      pt: "Peixe chato de contorno mais largo e losangular do que o linguado, boca terminal mais reta e olhos geralmente no lado direito (embora até 30% possam ser esquerdinos). Pele castanho-esverdeada com pequenas manchas avermelhadas/alaranjadas irregulares e fila de nódulos ósseos ásperos na base das barbatanas e linha lateral.",
      en: "Flatfish with a broader diamond-shaped outline than sole, a straighter terminal mouth, and eyes usually on the right side (though up to 30% are left-eyed). Greenish-brown skin with irregular reddish/orange spots and a row of rough bony nodules along the fin bases and lateral line.",
    },
    confusao: {
      pt: "Linguado: o linguado é muito mais estreito e alongado, com focinho redondo e pele aveludada sem nódulos ásperos.",
      en: "Sole: much narrower and more elongated, with a rounded snout and velvety skin lacking rough nodules.",
    },
    iscaTecnica: {
      pt: "Minhoca-da-lama, camarão e tiras de lula ao fundo em canais de maré.",
      en: "Lugworm, shrimp, and squid strips fished on the bottom in tidal channels.",
    },
  },
  {
    id: "safio",
    nome: { pt: "Safio / Congro", en: "European Conger" },
    cientifico: "Conger conger",
    minCm: "58 cm",
    habitat: {
      pt: "Mar / barra (molhes de pedra, enrocamentos, buracos)",
      en: "Sea / inlet (rocky jetties, breakwaters, crevices)",
    },
    epoca: "Out–Mar",
    identificacao: {
      pt: "Corpo serpentiforme (tipo enguia), cilíndrico à frente e comprimido atrás, pele lisa sem escamas de cor cinzento-escura ou acastanhada no dorso e esbranquiçada no ventre. Boca grande com maxilar superior ligeiramente saliente, poros brancos visíveis ao longo da linha lateral e barbatana dorsal contínua com a caudal e anal (debruadas a preto).",
      en: "Eel-like cylindrical body compressed toward the tail, smooth scaleless skin coloured dark grey or brownish above and whitish below. Large mouth with a slightly projecting upper jaw, visible white pores along the lateral line, and a continuous dorsal-caudal-anal fin edged in black.",
    },
    confusao: {
      pt: "Enguia (Anguilla anguilla) ou Moreia: o safio tem os poros brancos da linha lateral bem marcados e a barbatana dorsal começa logo acima das peitorais (na enguia começa muito mais atrás).",
      en: "European eel or moray: conger has prominent white lateral-line pores and its dorsal fin starts right above the pectorals (much further back in eels).",
    },
    iscaTecnica: {
      pt: "Meia sardinha, filete de cavala ou lula inteira ao fundo junto às pedras à noite, com estralho grosso.",
      en: "Half sardine, mackerel fillet, or whole squid on heavy bottom tackle near rocks at night.",
    },
  },
  {
    id: "cavala",
    nome: { pt: "Cavala", en: "Atlantic Chub Mackerel" },
    cientifico: "Scomber colias",
    minCm: "20 cm",
    habitat: {
      pt: "Mar / barra (águas abertas junto aos molhes)",
      en: "Sea / inlet (open water off jetties)",
    },
    epoca: "Mai–Out",
    identificacao: {
      pt: "Corpo fusiforme e musculado de nadador pelágico, dorso azul-esverdeado atravessado por riscas escuras onduladas e flancos prateados com pequenas pintas e manchas cinzentas esbatidas abaixo da linha lateral. Possui pínulas (pequenas barbatanas triangulares) antes da cauda bifurcada.",
      en: "Streamlined muscular pelagic swimmer with a blue-green back crossed by wavy dark bars and silver flanks marked with faint grey spots and mottling below the lateral line. Features finlets ahead of a deeply forked tail.",
    },
    confusao: {
      pt: "Sarda (Scomber scombrus): a sarda tem o ventre completamente prateado e liso (sem pintas cinzentas) e riscas dorsais mais contrastadas.",
      en: "Atlantic mackerel (Scomber scombrus): has a completely plain silver belly (no grey spots) and sharper dorsal stripes.",
    },
    iscaTecnica: {
      pt: "Sabiki (metralha), colheres metálicas, pequenos jigs e iscada de sardinha à bóia ou corrico rápido.",
      en: "Sabiki rigs, metal spoons, micro jigs, and sardine strips on floats or fast retrieve.",
    },
  },
  {
    id: "choco",
    nome: { pt: "Choco", en: "Common Cuttlefish" },
    cientifico: "Sepia officinalis",
    minCm: "10 cm (manto)",
    habitat: {
      pt: "Salobra / Mar (cais, molhes, fundos de areia e algas)",
      en: "Brackish / Sea (piers, jetties, sand & weed beds)",
    },
    epoca: "Out–Abr",
    identificacao: {
      pt: "Molusco cefalópode de corpo oval e achatado dorso-ventralmente, rodeado por uma barbatana ondulante contínua em toda a volta do manto. Dorso zebrado (riscas castanhas e claras que mudam de cor instantaneamente), 8 braços curtos e 2 tentáculos retráteis longos, além de osso interno calcário (siba).",
      en: "Cephalopod mollusc with an oval, dorso-ventrally flattened body fringed by a continuous undulating fin around the mantle. Zebra-striped back (brown and pale bands that shift colour instantly), 8 short arms plus 2 long retractable tentacles, and an internal calcareous cuttlebone.",
    },
    confusao: {
      pt: "Lula (Loligo vulgaris): a lula tem corpo cilíndrico esguio em forma de torpedo e barbatanas triangulares apenas na metade traseira.",
      en: "European squid (Loligo vulgaris): has a slender torpedo-shaped cylindrical body and triangular fins confined to the rear half.",
    },
    iscaTecnica: {
      pt: "Palhaço (toneira/egi) trabalhado com toques lentos junto ao fundo em eging ou pesca ao fundo.",
      en: "Squid jig (egi) worked with slow twitches close to the bottom in eging or bottom rigs.",
    },
  },
];
