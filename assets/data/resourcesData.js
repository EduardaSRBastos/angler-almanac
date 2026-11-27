window.EQUIP_DATA = window.EQUIP_DATA || {};

EQUIP_DATA.recursos = [
  {
    id: "licencas",
    categoria: {
      pt: "Licenças de Pesca",
      en: "Fishing Licenses",
    },
    links: [
      {
        nome: {
          pt: "DGRM / BMar - Licença de Pesca Lúdica (Mar e Ria)",
          en: "DGRM / BMar - Recreational Saltwater & Lagoon License",
        },
        url: "https://www.dgrm.pt/licenciamento-da-pesca?articleId=423819",
        desc: {
          pt: "Obrigatória a partir dos 16 anos (apeada, embarcada ou submarina), emitida via BMar ou Multibanco e acompanhada de documento de identificação.",
          en: "Mandatory from age 16 (shore, boat, or spearfishing), issued via BMar or ATM and carried alongside ID.",
        },
      },
      {
        nome: {
          pt: "BMar - Balcão Eletrónico do Mar (Emissão e 2.ª Via)",
          en: "BMar - Maritime Portal (Issue & Download License)",
        },
        url: "https://www.bmar.pt/",
        desc: {
          pt: "Portal oficial para pedir, renovar ou voltar a descarregar o comprovativo PDF da licença de pesca lúdica no telemóvel.",
          en: "Official portal to apply for, renew, or re-download your recreational saltwater fishing license PDF on your phone.",
        },
      },
      {
        nome: {
          pt: "ICNF - Licenças de Pesca em Águas Interiores (Rios e Albufeiras)",
          en: "ICNF - Freshwater Fishing Licenses (Rivers & Reservoirs)",
        },
        url: "https://www.icnf.pt/pesca/pescaludicaedesportiva/licencas",
        desc: {
          pt: "Regras, taxas e emissão de licenças regionais e nacionais para pesca desportiva em água doce.",
          en: "Rules, fees, and issuance of regional and national freshwater recreational fishing licenses.",
        },
      },
    ],
  },
  {
    id: "regras-interdicoes",
    categoria: {
      pt: "Regras, Tamanhos & Interdições",
      en: "Rules, Minimum Sizes & Closures",
    },
    links: [
      {
        nome: {
          pt: "DGRM - Tamanhos Mínimos, Limite de 10 kg e Defesos (Mar)",
          en: "DGRM - Minimum Sizes, 10 kg Limit & Closed Seasons (Saltwater)",
        },
        url: "https://www.dgrm.pt/pesca_cpt_especies",
        desc: {
          pt: "Tabela oficial de tamanhos mínimos, defesos, limite diário de 10 kg por pescador (sem contar com o exemplar de maior peso) e proibição de venda.",
          en: "Official chart of minimum legal sizes, closed seasons, 10 kg daily catch limit per angler (excluding the single heaviest fish), and sale ban.",
        },
      },
      {
        nome: {
          pt: "DGRM - Zonas Proibidas & Distâncias de Segurança",
          en: "DGRM - Prohibited Fishing Zones & Safety Distances",
        },
        url: "https://www.dgrm.pt/zonas-de-pesca",
        desc: {
          pt: "Proibido pescar em portos comerciais, canais de navegação/barras, áreas de aquicultura, a menos de 100 m de esgotos e em praias concessionadas na época balnear.",
          en: "Fishing is prohibited in commercial ports, navigation channels/inlets, aquaculture areas, within 100 m of outfalls, and on lifeguarded beaches during bathing season.",
        },
      },
      {
        nome: {
          pt: "IPMA - Bivalves, Interdições Sanitárias & Apanha de Isco",
          en: "IPMA - Shellfish Closures & Bait Harvesting",
        },
        url: "https://www.ipma.pt/pt/bivalves/index.jsp",
        desc: {
          pt: "Consulta obrigatória de interdições por biotoxinas antes de apanhar bivalves; apanha de isco permitida apenas para uso próprio (até 0,5 L de poliquetas/dia).",
          en: "Mandatory check for biotoxin closures before collecting shellfish; bait harvesting is allowed for personal use only (up to 0.5 L of marine worms/day).",
        },
      },
      {
        nome: {
          pt: "ICNF - Calendário e Dimensões Mínimas (Águas Interiores)",
          en: "ICNF - Fishing Calendar & Minimum Sizes (Freshwater)",
        },
        url: "https://www.icnf.pt/api/file/doc/87075de8bab93a1c",
        desc: {
          pt: "Tabela oficial (PDF) com períodos de pesca, defesos, dimensões mínimas e espécies de devolução obrigatória/proibida.",
          en: "Official chart (PDF) with fishing seasons, closed periods, minimum sizes, and mandatory/prohibited catch-and-release species.",
        },
      },
    ],
  },
  {
    id: "seguranca-condicoes",
    categoria: {
      pt: "Segurança Costeira & Estado do Mar",
      en: "Coastal Safety & Live Sea Conditions",
    },
    links: [
      {
        nome: {
          pt: "IPMA - Previsão Marítima Costeira (Ondas e Temp. Água)",
          en: "IPMA - Coastal Sea Forecast (Swell & Water Temp)",
        },
        url: "https://www.ipma.pt/pt/maritima/costeira/index.jsp?selLocal=114&idLocal=114",
        desc: {
          pt: "Consulta simples e direta da altura da ondulação, período da vaga e temperatura da água por praia.",
          en: "Clean, straightforward forecast of wave height, swell period, and water temperature by beach.",
        },
      },
      {
        nome: {
          pt: "Instituto Hidrográfico - Bóias Ondógrafo & Marés",
          en: "Hydrographic Institute - Wave Buoys & Tides",
        },
        url: "https://www.hidrografico.pt/paginas-genericas/dt/dcdt/acesso-a-dados/previsoes-meteo-oceanograficas/?child=navegacao-de-recreio&categoria=portugal-continental-norte",
        desc: {
          pt: "Dados reais das bóias costeiras (altura, período e direção da ondulação) e tábuas de marés oficiais da Marinha.",
          en: "Live coastal wave buoy measurements (swell height, period, and direction) and official Navy tide tables.",
        },
      },
      {
        nome: {
          pt: "Beachcam - Praias em Direto",
          en: "Beachcam - Beaches Live Webcams",
        },
        url: "https://beachcam.meo.pt/livecams",
        desc: {
          pt: "Vê o estado real do mar, a rebentação e o vento em direto. Regra de ouro: evita molhes expostos com ondulação > 2 m ou período longo (> 13 s).",
          en: "Check real-time swell, surf, and wind live. Golden rule: avoid exposed jetties when swell exceeds 2 m or has a long period (> 13 s).",
        },
      },
    ],
  },
  {
    id: "guias-comunidade",
    categoria: {
      pt: "Guias, Ideias & Comunidade",
      en: "Guides, Ideas & Community",
    },
    links: [
      {
        nome: {
          pt: "Pesca Portugal - Guias, Espécies e Locais",
          en: "Pesca Portugal - Guides, Species & Locations",
        },
        url: "https://pescaportugal.pt/",
        desc: {
          pt: "Artigos práticos sobre técnicas, fichas de espécies, escolha de material e dicas para iniciantes.",
          en: "Practical articles on techniques, species profiles, gear selection, and beginner tips.",
        },
      },
      {
        nome: {
          pt: "Pesca-PT - Técnicas, Montagens e Glossário",
          en: "Pesca-PT - Techniques, Rigs & Glossary",
        },
        url: "https://www.pesca-pt.com/",
        desc: {
          pt: "Informação detalhada sobre nós, montagens de mar e água doce, iscos e listas de espécies.",
          en: "Detailed information on knots, saltwater and freshwater rigs, baits, and species lists.",
        },
      },
      {
        nome: {
          pt: "Pesqueiro.pt - Portal e Fórum de Pesca",
          en: "Pesqueiro.pt - Fishing Portal & Forum",
        },
        url: "https://www.pesqueiro.pt/index.php",
        desc: {
          pt: "Comunidade portuguesa de pescadores lúdicos com relatos, dicas gerais e partilha de experiências.",
          en: "Portuguese recreational angling community with catch reports, general tips, and shared experiences.",
        },
      },
    ],
  },
];
