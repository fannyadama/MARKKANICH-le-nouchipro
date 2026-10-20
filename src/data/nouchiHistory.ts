import { HistoryEvent, HistorySection } from '../types';

export const HISTORY_TIMELINE: HistoryEvent[] = [
  {
    year: '1970 - 1978',
    title: 'Genèse dans les rues d’Adjamé et Treichville',
    description: 'Les jeunes déscolarisés et loubards des cinémas Roxy et El Mansour adoptent une moustache fine virile ("poil de nez" = Nou-chi en dioula) et créent un cryptolecte pour échapper à la surveillance policière.',
    impact: 'Naissance du code secret de la rue abidjanaise.',
    badge: 'Origine & Étymologie'
  },
  {
    year: '1980 - 1989',
    title: 'Diffusion dans les cours communes et transports',
    description: 'Le Nouchi s’étend aux chauffeurs de gbaka, aux apprentis, aux lycéens et aux quartiers populaires comme Yopougon. Il intègre le baoulé, le bété, l’anglais et le français populaire.',
    impact: 'Transformation en créole urbain véhiculaire interethnique.',
    badge: 'Expansion Urbaine'
  },
  {
    year: '1990 - 1999',
    title: 'Révolution du Zouglou et Premier Gaou',
    description: 'Les étudiants de Yopougon créent le Zouglou pour chanter leurs galères. Le groupe Magic System fait exploser le terme "Gaou" sur la scène internationale.',
    impact: 'Le nouchi devient la voix de la jeunesse ivoirienne.',
    badge: 'Vague Zouglou'
  },
  {
    year: '2000 - 2010',
    title: 'L’Ère du Coupé-Décalé & La Jet Set',
    description: 'Douk Saga, DJ Arafat et les boucantiers imposent un nouchi flamboyant de fête, de défi et de résilience face à la crise sociopolitique.',
    impact: 'Rayonnement dans toute l’Afrique subsaharienne et la diaspora.',
    badge: 'Coupé-Décalé'
  },
  {
    year: '2019 - 2020',
    title: 'Consécration mondiale au Dictionnaire Larousse',
    description: 'Le verbe "S’enjailler" (2019) puis le nom "Boucantier" (2020) entrent officiellement dans le Petit Larousse illustré.',
    impact: 'Reconnaissance académique et institutionnelle internationale.',
    badge: 'Larousse Officiel'
  },
  {
    year: '2023 - 2026',
    title: 'Entrée au Robert & L’Avènement du Rap Ivoire',
    description: 'Le Petit Robert intègre "Go" et "Brouteur". Les artistes de Rap Ivoire (Didi B, Suspect 95, Nash, Himra) hissent le nouchi au rang d’art linguistique mondial.',
    impact: 'Symbole officiel de la créativité linguistique francophone.',
    badge: 'Le Robert & Modernité'
  }
];

export const HISTORY_SECTIONS: HistorySection[] = [
  {
    id: 'intro',
    title: 'I. Introduction & Identité Fondamentale',
    subtitle: "L'âme vivante et le poumon linguistique de la Côte d'Ivoire",
    icon: 'Sparkles',
    summary: "Le Nouchi n'est pas un simple argot : c'est un miroir sociologique, une passerelle interculturelle unissant plus de 60 ethnies et une célébration de la débrouillardise ivoirienne.",
    content: [
      "Né au confluent du français et des langues vernaculaires ivoiriennes, le Nouchi est aujourd'hui bien plus qu'un jargon de rue : il incarne l'identité contemporaine de la Côte d'Ivoire et de sa capitale économique, Abidjan.",
      "Alors que le français standard demeure la langue administrative officielle, le Nouchi s'est imposé comme la véritable langue véhiculaire du cœur, des marchés, de la musique, du sport et des échanges du quotidien.",
      "Dans un pays mosaïque comptant plus de 60 groupes ethniques (Akan, Krou, Mandé du Nord, Mandé du Sud, Gur), le Nouchi a joué un rôle historique inattendu : celui de puissant ciment social et de neutralisateur des clivages ethniques chez les jeunes générations."
    ],
    keyPoints: [
      "Passerelle interethnique neutralisant les barrières linguistiques régionales",
      "Langue vivante en perpétuelle réinvention lexicale et sémantique",
      "Marqueur de fierté nationale et d'appartenance à la culture abidjanaise ('Babi')"
    ],
    quote: {
      text: "Le français est la langue officielle de la Côte d'Ivoire, mais le Nouchi en est l'âme véritable.",
      author: "Adage populaire abidjanais"
    }
  },
  {
    id: 'etymologie',
    title: 'II. Étymologie & Genèse Urbaine (Années 1970)',
    subtitle: 'Des cinémas Roxy et El Mansour d’Adjamé aux cours de Treichville',
    icon: 'History',
    summary: 'Le mot "Nouchi" provient du dioula : "Nou" (nez) + "Chi" (poil/moustache), en hommage aux loubards virils des années 70.',
    content: [
      "Sur le plan morphologique et étymologique, le terme 'Nouchi' puise directement ses racines dans le dioula (mandé). Il est composé du substantif 'Nou' (le nez) et du morphème 'Chi' (le poil).",
      "Littéralement, 'Nouchi' désigne donc le 'poil de nez' ou par métonymie la 'fine moustache virile'. Dans les années 1970, les jeunes marginaux et loubards qui écumaient les abords des cinémas populaires d'Adjamé (les mythiques cinémas Roxy et El Mansour) portaient avec fierté une fine moustache pour affirmer leur maturité et leur virilité dans la jungle urbaine.",
      "Par extension, la population a désigné ces jeunes loubards sous le nom de 'nouchis', avant que le terme ne finisse par qualifier leur langage codé secret. Ce cryptolecte visait initialement deux objectifs précis : masquer leurs activités aux forces de l'ordre ('gômons') et forger une fraternité soudée d'initiés face à la précarité."
    ],
    keyPoints: [
      "Étymologie dioula : 'Nou' (nez) + 'Chi' (poil / moustache)",
      "Berceau géographique : Adjamé (Cinémas Roxy, El Mansour), Treichville, Yopougon",
      "Fonction originelle : Cryptolecte de survie et code secret des jeunes marginaux"
    ]
  },
  {
    id: 'developpement',
    title: 'III. Développement & Vecteurs Musicaux',
    subtitle: 'Du Zouglou contestataire au Coupé-Décalé et au Rap Ivoire',
    icon: 'Music',
    summary: 'La musique a été le propulseur universel du Nouchi à travers le monde : Zouglou des années 90, Coupé-Décalé flamboyant des années 2000, et Rap Ivoire triomphant.',
    content: [
      "L'ascension fulgurante du Nouchi est indissociable des grands mouvements musicaux de Côte d'Ivoire. Dès le début des années 1990, sur les campus universitaires d'Abidjan (notamment à la cité de Yopougon), les étudiants créent le Zouglou. Mené par des groupes pionniers comme Les Parents du Campus, Les Salopards, Les Garagistes ou Yodé & Siro, le Zouglou utilise le nouchi pour dénoncer avec humour et métaphores les difficultés sociales.",
      "En 1999, le titre 'Premier Gaou' du groupe Magic System devient un raz-de-marée planétaire. Le mot 'Gaou' (personne naïve que l'on dupe) entre instantanément dans le vocabulaire francophone mondial.",
      "Au début des années 2000, en pleine crise ivoirienne, Douk Saga et le collectif de la Jet Set lancent le Coupé-Décalé. Le nouchi change de dimension : il devient l'hymne de la fête, du 'travaillement' (jet de billets), des 'boucantiers' et du défi joyeux à l'adversité.",
      "Aujourd'hui, le Rap Ivoire porté par des artistes comme Didi B, Suspect 95, Nash (surnommée la Go Cracra du rap nouchi) et Himra perfectionne une poésie de rue virtuose où le nouchi rivalise d'orfèvrerie avec les plus grands argots mondiaux (argot new-yorkais, verlan parisien)."
    ],
    keyPoints: [
      "Zouglou (1990) : Conscience sociale, chroniques de vie estudiantine et humour salvateur",
      "Coupé-Décalé (2002) : Farot, atalakon, boucan et résilience festive",
      "Rap Ivoire (2015-Aujourd'hui) : Punchlines aiguisées, poésie métropolitaine et streaming mondial"
    ]
  },
  {
    id: 'linguistique',
    title: 'IV. Structure Linguistique & Caractéristiques',
    subtitle: 'Créolisation, resémantisation et inventivité permanente',
    icon: 'BookOpen',
    summary: 'Le Nouchi est un système linguistique dynamique empruntant à plus de 60 langues et détournant le français avec un génie métaphorique.',
    content: [
      "Les linguistes s'accordent à décrire le Nouchi comme une interlangue ou un créole urbain en gestation avancée. Sa vitalité repose sur des procédés morphosyntaxiques et stylistiques remarquables :",
      "1. La Polyglossie et les Emprunts : Le Nouchi greffe harmonieusement des racines dioula ('môgô', 'djê', 'soutra'), baoulé ('kpakpato', 'acloidahi'), bété ('gaou', 'agbolo'), anglais ('to enjoy' -> s'enjailler, 'girl' -> go, 'die' -> affaire est daye) et français populaire.",
      "2. La Resémantisation Métaphorique : Le nouchi détourne les mots français ordinaires pour créer des images percutantes. Ainsi, 'perdre réseau' signifie être fauché ou ivre, un 'cargo' désigne le fourgon de police, 'siffler' veut dire boire, et 'chicooter' signifie vaincre sèchement un concurrent.",
      "3. La Reduplication Expressive : Comme dans les langues ouest-africaines, la répétition intensifie le sens ('façon façon' = très bizarre, 'kpata kpata' = d'une beauté parfaite, 'cra cra' = extrêmement difficile).",
      "4. L'Oralité Poétique et les Proverbes : Le nouchi produit des maximes philosophiques d'une redoutable acuité : 'Le gbê est mieux que le flôcô' (La vérité vaut mieux que le mensonge) ou 'Abidjan c'est technique'."
    ],
    keyPoints: [
      "Emprunts polyglottes (Dioula, Baoulé, Bété, Anglais, Français)",
      "Resémantisation poétique et métaphorique du quotidien",
      "Reduplication intensive et création de proverbes urbains"
    ]
  },
  {
    id: 'reconnaissance',
    title: 'V. Rayonnement International & Consécration',
    subtitle: 'De la rue aux dictionnaires de référence de l’Académie francophone',
    icon: 'Award',
    summary: 'Avec son entrée triomphale aux dictionnaires Larousse et Robert, le Nouchi a acquis ses lettres de noblesse dans la francophonie.',
    content: [
      "Longtemps qualifié à tort de 'français dégradé' par les puristes académiques, le Nouchi a mené une conquête culturelle éclatante, démontrant la puissance créative de la francophonie du Sud.",
      "En 2019, le prestigieux dictionnaire Le Petit Larousse illustré ouvre ses portes au verbe emblématique 'S’enjailler' (s'amuser, se réjouir, se faire plaisir). L'année suivante en 2020, c'est le substantif 'Boucantier' (personne qui aime faire la fête et afficher son aisance financière) qui y fait son entrée officielle.",
      "En 2023, Le Petit Robert valide à son tour 'Go' (jeune femme, petite amie) et 'Brouteur' (cyber-escroc).",
      "Aujourd'hui, des thèses universitaires à la Sorbonne, à Harvard et à l'Université Félix-Houphouët-Boigny d'Abidjan étudient la syntaxe et la sociolinguistique du nouchi. L'argot abidjanais est devenu une fierté panafricaine et un trésor immatériel mondial."
    ],
    keyPoints: [
      "2019 : Entrée de 'S’enjailler' au Larousse",
      "2020 : Entrée de 'Boucantier' au Larousse",
      "2023 : Entrée de 'Go' et 'Brouteur' au Robert",
      "Reconnaissance universitaire et rayonnement dans toute la Francophonie"
    ]
  },
  {
    id: 'conclusion',
    title: 'VI. Conclusion & Perspectives d’Avenir',
    subtitle: 'Le Nouchi dans l’ère du numérique, de l’IA et du cinéma mondial',
    icon: 'Flame',
    summary: 'Le Nouchi poursuit son épopée avec le cinéma, les réseaux sociaux et l’intelligence artificielle, restant à jamais l’étendard de la résilience ivoirienne.',
    content: [
      "En un demi-siècle d'existence, le Nouchi a accompli une trajectoire exceptionnelle : parti d'un code secret de jeunes marginaux devant les cinémas d'Adjamé, il est devenu le langage d'une nation entière et un vecteur d'exportation culturelle sans équivalent en Afrique.",
      "À l'ère des réseaux sociaux (TikTok, X, Instagram) et des séries télévisées ivoiriennes diffusées sur les plateformes mondiales comme Netflix et Canal+, le Nouchi continue d'inventer chaque semaine de nouvelles expressions au rythme de l'actualité.",
      "Avec des initiatives numériques comme l'application Markkanich Le NouchiPro, ce patrimoine linguistique vivant est désormais documenté, valorisé et transmis aux futures générations avec toute la rigueur et l'élégance qu'il mérite.",
      "Vivant, impertinent, poétique et profondément humain, le Nouchi prouve chaque jour que lorsqu'une langue naît du cœur battant du peuple, rien ne peut en arrêter l'essor."
    ],
    keyPoints: [
      "Trajectoire historique unique : du cryptolecte marginal au trésor culturel mondial",
      "Vitalité démultipliée par le numérique, les séries et les réseaux sociaux",
      "Symbole éternel de l'optimisme, de l'humour et de la créativité d'Abidjan"
    ]
  }
];

export const ABIDJAN_HOTSPOTS = [
  {
    commune: 'Adjamé',
    role: 'Berceau originel & Cœur commercial',
    description: 'Quartier des gares, des grands marchés et des mythiques cinémas Roxy et El Mansour où les premiers loubards créèrent le code Nou-chi.',
    icon: 'ShoppingBag'
  },
  {
    commune: 'Yopougon (Yop City)',
    role: 'Capitale du Zouglou & de l’Enjaillement',
    description: 'Plus grande commune de Côte d’Ivoire, célèbre pour la rue Princesse, ses maquis géants et les étudiants qui ont popularisé le nouchi en musique.',
    icon: 'Music'
  },
  {
    commune: 'Treichville',
    role: 'Sanctuaire historique & Cosmopolite',
    description: 'Quartier historique des cabarets, des jazzmen et du brassage des travailleurs venus de toute l’Afrique de l’Ouest dès les années 60.',
    icon: 'Radio'
  },
  {
    commune: 'Marcory & Koumassi',
    role: 'Laboratoire du Coupé-Décalé & Populaire',
    description: 'Quartiers vibrants rythmés par les maquis branchés, les Wôrô-wôrô verts et la culture des boucantiers.',
    icon: 'Flame'
  },
  {
    commune: 'Cocody & Plateau',
    role: 'Diffusion choco & Consécration institutionnelle',
    description: 'Du quartier des affaires aux universités et lycées modernes, le nouchi s’est imposé dans toutes les strates sociales sans distinction.',
    icon: 'Building'
  }
];
