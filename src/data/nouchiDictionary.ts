import { NouchiWord } from '../types';
import { ADDITIONAL_NOUCHI_WORDS } from './additionalNouchiWords';

const INITIAL_NOUCHI_DICTIONARY: NouchiWord[] = [
  {
    "id": "abidjan-cest-technique",
    "term": "Abidjan, c'est technique",
    "phonetic": "/a.bi.dʒɑ̃ sɛ tɛk.nik/",
    "grammaticalCategory": "Locution proverbiale",
    "definition": "Adage fondamental signifiant que la vie dans la métropole abidjanaise exige de la ruse, de la débrouillardise, de l'adaptation et de l'intelligence pratique face aux imprévus.",
    "frenchTranslation": "La vie à Abidjan exige un sens aigu de la débrouillardise (système D).",
    "literalMeaning": "Abidjan demande de la méthode et du sang-froid.",
    "originLanguage": "Français ivoirien / Argot urbain",
    "etymologyDetails": "Popularisé dans les années 90 par les chauffeurs de gbaka et la jeunesse active face aux défis du quotidien.",
    "examples": [
      {
        "nouchi": "Si tu n'as pas l'œil ici, on va te logobby en deux secondes : Abidjan, c'est technique !",
        "french": "Si tu n'es pas vigilant ici, on va t'arnaquer en un éclair : vivre à Abidjan demande beaucoup d'astuce !"
      }
    ],
    "synonyms": [
      "On se cherche",
      "Système D ivoirien",
      "La vie c'est combat"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Culture",
      "Philosophie",
      "Abidjan",
      "Proverbe"
    ]
  },
  {
    "id": "acloidahi",
    "term": "Acloidahi",
    "phonetic": "/a.klwa.da.i/",
    "grammaticalCategory": "Adjectif / Interjection",
    "definition": "Désigne quelque chose de flambant neuf, de resplendissant, d'impeccable ou d'extrêmement élégant.",
    "frenchTranslation": "Tout neuf, éclatant, impeccable.",
    "literalMeaning": "Étincelant comme sorti du magasin.",
    "originLanguage": "Baoulé & Argot",
    "etymologyDetails": "Emprunt phonétique baoulé marquant la brillance et la perfection.",
    "examples": [
      {
        "nouchi": "Le djo est venu avec une paire acloidahi !",
        "french": "Le gars est arrivé avec des chaussures toutes neuves !"
      }
    ],
    "synonyms": [
      "Kpata-kpata",
      "Zo",
      "Choco",
      "Propre"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Style",
      "Sape",
      "Mode"
    ]
  },
  {
    "id": "adjouffou",
    "term": "Adjouffou",
    "phonetic": "/ad.ʒu.fu/",
    "grammaticalCategory": "Nom propre / Quartier",
    "definition": "Quartier populaire de la commune de Port-Bouët à Abidjan, près de l'aéroport, symbole de la ferveur populaire et de l'authenticité urbaine.",
    "frenchTranslation": "Quartier historique d'Abidjan.",
    "originLanguage": "Toponyme ivoirien",
    "examples": [
      {
        "nouchi": "Le môgô a grandi à Adjouffou, il connaît tous les glôglôs.",
        "french": "Le gars a grandi à Adjouffou, il connaît tous les recoins du quartier."
      }
    ],
    "synonyms": [
      "Babi",
      "Glôglô"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Classique",
    "tags": [
      "Lieux",
      "Abidjan",
      "Géographie"
    ]
  },
  {
    "id": "affairage",
    "term": "Affairage",
    "phonetic": "/a.fɛ.ʁaʒ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Action de colporter des ragots, des commérages, d'épier la vie d'autrui ou de s'immiscer dans des discussions privées.",
    "frenchTranslation": "Commérage, colportage de rumeurs, indiscrétion.",
    "originLanguage": "Français déformé (Affaires + suffixe -age)",
    "examples": [
      {
        "nouchi": "Laisse l'affairage du quartier et concentre-toi sur ton djossi !",
        "french": "Laisse les commérages du quartier et concentre-toi sur ton travail !"
      }
    ],
    "synonyms": [
      "Kpakpatoya",
      "Gbairè",
      "Kongossa"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Relations",
      "Société",
      "Parler"
    ]
  },
  {
    "id": "affaire",
    "term": "Affairé",
    "phonetic": "/a.fe.ʁe/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne toujours occupée par des combines.",
    "frenchTranslation": "Personne toujours occupée par des combines",
    "literalMeaning": "Origine : Français détourné",
    "originLanguage": "Français détourné",
    "examples": [
      {
        "nouchi": "Il est trop affairé pour nous voir.",
        "french": "Sens : « Personne toujours occupée par des combines » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "affaire-est-daye",
    "term": "Affaire est daye",
    "phonetic": "/a.fɛʁ ɛ daj/",
    "grammaticalCategory": "Locution verbale",
    "definition": "Expression marquant la fin irrévocable d'une situation, un échec définitif, ou une conclusion sans appel.",
    "frenchTranslation": "C'est complètement terminé, il n'y a plus aucun espoir.",
    "literalMeaning": "L'affaire est morte / scellée.",
    "originLanguage": "Anglais (to die) + Français",
    "etymologyDetails": "Daye est la nouchisation du verbe anglais 'to die' (mourir).",
    "examples": [
      {
        "nouchi": "Il a raté le dernier car, affaire est daye !",
        "french": "Il a raté le dernier bus, c'est plié, c'est foutu !"
      }
    ],
    "synonyms": [
      "C'est gâté",
      "C'est calé",
      "Affaire est classée"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Expression",
      "Quotidien",
      "Fin"
    ]
  },
  {
    "id": "affairer",
    "term": "Affairer",
    "phonetic": "/a.fe.ʁe/",
    "grammaticalCategory": "Locution / État",
    "definition": "Être occupé par des combines.",
    "frenchTranslation": "Être occupé par des combines",
    "literalMeaning": "Origine : Dérivé de Affairé",
    "originLanguage": "Dérivé de Affairé",
    "examples": [
      {
        "nouchi": "Il est en train d'affairer.",
        "french": "Sens : « Être occupé par des combines » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "agbolo",
    "term": "Agbolo",
    "phonetic": "/aɡ.bo.lo/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Personne particulièrement musclée, robuste, colosse ou agent de sécurité à la carrure impressionnante.",
    "frenchTranslation": "Homme très musclé, colosse, costaud.",
    "originLanguage": "Bété / Dioula",
    "examples": [
      {
        "nouchi": "Le vigile de la boîte de nuit est un vrai agbolo !",
        "french": "Le vigile de la discothèque est un véritable colosse !"
      }
    ],
    "synonyms": [
      "Digba",
      "Gbôlôzailli",
      "Armoire à glace",
      "Crapaud"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Physique",
      "Force",
      "Personne"
    ]
  },
  {
    "id": "agboloh",
    "term": "Agboloh",
    "phonetic": "/a.gbo.lo/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Muscles, musclé, musculature.",
    "frenchTranslation": "Muscles, musclé, musculature",
    "literalMeaning": "Origine : Langue locale (Agni/Baoulé)",
    "originLanguage": "Langue locale (Agni/Baoulé)",
    "examples": [
      {
        "nouchi": "Il a des agboloh.",
        "french": "Sens : « Muscles, musclé, musculature » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "agnon",
    "term": "Agnon",
    "phonetic": "/a.ɲɔ̃/",
    "grammaticalCategory": "Nom masculin (invariable)",
    "definition": "Vêtements, garde-robe, habits élégants ou tenues de sortie.",
    "frenchTranslation": "Vêtements, habits, sapes.",
    "originLanguage": "Langues akan / Baoulé",
    "examples": [
      {
        "nouchi": "Il a acheté des agnons de marque pour la fête d'Abidjan.",
        "french": "Il s'est acheté de superbes vêtements pour la soirée d'Abidjan."
      },
      {
        "nouchi": "Il a acheté de nouveaux agnon.",
        "french": "Sens : « Habits, vêtements » en contexte familier."
      }
    ],
    "synonyms": [
      "Sapes",
      "Légué",
      "Tissus"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Sape",
      "Mode",
      "Objets"
    ]
  },
  {
    "id": "ahoulaba",
    "term": "Ahoulaba",
    "phonetic": "/a.u.la.ba/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Femme élégante, généreusement pourvue par la nature, aux rondeurs harmonieuses et incarnant les canons de beauté traditionnels ivoiriens.",
    "frenchTranslation": "Femme voluptueuse et élégante aux formes généreuses.",
    "originLanguage": "Akan / Baoulé",
    "etymologyDetails": "Donne aussi son nom au prestigieux concours de beauté 'Awoulaba' célébrant la femme africaine naturelle.",
    "examples": [
      {
        "nouchi": "La fille qui danse là-bas a une allure de vraie ahoulaba !",
        "french": "La femme qui danse là-bas a une prestance et des rondeurs magnifiques !"
      }
    ],
    "synonyms": [
      "Apoutchou",
      "BobaraBa",
      "Matos"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Beauté",
      "Femme",
      "Culture"
    ]
  },
  {
    "id": "alloco",
    "term": "Alloco",
    "phonetic": "/a.lo.ko/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Banane plantain frite.",
    "frenchTranslation": "Banane plantain frite",
    "literalMeaning": "Origine : Nom du plat",
    "originLanguage": "Nom du plat",
    "examples": [
      {
        "nouchi": "J'adore l'alloco.",
        "french": "Sens : « Banane plantain frite » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "allumer-la-lumiere",
    "term": "Allumer la lumière",
    "phonetic": "/a.ly.me la ly.mjɛʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Allumer.",
    "frenchTranslation": "Allumer",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Allume la lumière.",
        "french": "Sens : « Allumer » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "anango-plan",
    "term": "Anango plan",
    "phonetic": "/a.nɑ̃.ɡo plɑ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Promesse non tenue, arrangement douteux, offre trompeuse ou rendez-vous auquel l'interlocuteur fait faux bond.",
    "frenchTranslation": "Promesse en l’air, plan foireux, lapin.",
    "originLanguage": "Yoruba / Populaire",
    "examples": [
      {
        "nouchi": "Il m'a juré qu'il arrivait à 14h mais il m'a fait un anango plan !",
        "french": "Il m'a promis d'être là à 14h mais il m'a posé un lapin !"
      }
    ],
    "synonyms": [
      "Faux bond",
      "Plan gâté",
      "Flôcô"
    ],
    "category": "argent",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Arnaque",
      "Rendez-vous",
      "Méfiance"
    ]
  },
  {
    "id": "apoutchou",
    "term": "Apoutchou",
    "phonetic": "/a.put.ʃu/",
    "grammaticalCategory": "Nom féminin / Adjectif",
    "definition": "Désigne affectueusement une femme pulpeuse, aux courbes très généreuses et fière de ses formes.",
    "frenchTranslation": "Femme très pulpeuse et fière de ses rondeurs.",
    "originLanguage": "Création nouchi urbaine",
    "examples": [
      {
        "nouchi": "Les apoutchous font sensation lors des concerts à Treichville.",
        "french": "Les femmes aux formes généreuses font sensation lors des concerts à Treichville."
      },
      {
        "nouchi": "C'est une apoutchou.",
        "french": "C'est une femme aux formes généreuses."
      }
    ],
    "synonyms": [
      "Ahoulaba",
      "Tassaba",
      "BobaraBa"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Tendance",
    "tags": [
      "Femme",
      "Beauté",
      "Société"
    ]
  },
  {
    "id": "atalakon",
    "term": "Atalakon",
    "phonetic": "/a.ta.la.kɔ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Éloge public rythmé, dédicace dithyrambique prononcée par un DJ ou un chanteur pour flatter un bienfaiteur ou un 'boucantier'.",
    "frenchTranslation": "Éloge, louange publique rythmée, encensement.",
    "originLanguage": "Dioula (Atala : prends-le / élève-le)",
    "etymologyDetails": "Élément central de la culture Coupé-Décalé et Zouglou.",
    "examples": [
      {
        "nouchi": "Le DJ lui a fait un gros atalakon quand il a commandé les bouteilles.",
        "french": "Le DJ a crié son nom en musique et lui a fait un grand éloge dès qu'il a commandé."
      }
    ],
    "synonyms": [
      "Dédicace",
      "Farot",
      "Louange"
    ],
    "category": "musique_culture",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Musique",
      "Coupé-Décalé",
      "Fête"
    ]
  },
  {
    "id": "atalaku",
    "term": "Atalaku",
    "phonetic": "/a.ta.la.ku/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Animateur, celui qui met l'ambiance.",
    "frenchTranslation": "Animateur, celui qui met l'ambiance",
    "literalMeaning": "Origine : Lingala (RDC), adopté à Abidjan",
    "originLanguage": "Lingala (RDC), adopté à Abidjan",
    "examples": [
      {
        "nouchi": "C'est notre atalaku.",
        "french": "Sens : « Animateur, celui qui met l'ambiance » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "avoir-jeton",
    "term": "Avoir jeton",
    "phonetic": "/a.vwaʁ ʒə.tɔ̃/",
    "grammaticalCategory": "Locution / État",
    "definition": "Avoir de l'argent.",
    "frenchTranslation": "Avoir de l'argent",
    "literalMeaning": "Origine : Métaphore ivoirienne",
    "originLanguage": "Métaphore ivoirienne",
    "examples": [
      {
        "nouchi": "Il a du jeton.",
        "french": "Sens : « Avoir de l'argent » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "avoir-pierre",
    "term": "Avoir pierre",
    "phonetic": "/a.vwaʁ pjɛʁ/",
    "grammaticalCategory": "Locution / État",
    "definition": "Avoir de l'argent.",
    "frenchTranslation": "Avoir de l'argent",
    "literalMeaning": "Origine : Métaphore ivoirienne",
    "originLanguage": "Métaphore ivoirienne",
    "examples": [
      {
        "nouchi": "Il a la pierre en ce moment.",
        "french": "Sens : « Avoir de l'argent » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "babre",
    "term": "Babre",
    "phonetic": "/ba.bʁe/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Père, vieux, ancien.",
    "frenchTranslation": "Père, vieux, ancien",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Écoute le babre.",
        "french": "Sens : « Père, vieux, ancien » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "baby-compteur",
    "term": "Baby-compteur",
    "phonetic": "/be.bi kɔ̃p.tœʁ/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Surnom populaire donné aux anciennes voitures Citroën 2 CV circulant à Abidjan.",
    "frenchTranslation": "Citroën 2 CV.",
    "originLanguage": "Français populaire ivoirien",
    "examples": [
      {
        "nouchi": "Le tonton roule toujours dans sa baby-compteur d'époque.",
        "french": "Le vieil oncle roule encore dans sa 2 CV d'antan."
      }
    ],
    "synonyms": [
      "Taille-crayon",
      "Borifin"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "expert",
    "officialStatus": "Classique",
    "tags": [
      "Transport",
      "Voiture",
      "Rétro"
    ]
  },
  {
    "id": "badou",
    "term": "Badou",
    "phonetic": "/ba.du/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Manger, grailler.",
    "frenchTranslation": "Manger, grailler",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "On va badou.",
        "french": "on va aller se restaurer."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "badrô",
    "term": "Badrô",
    "phonetic": "/ba.dʁo/",
    "grammaticalCategory": "Verbe transitif / intransitif",
    "definition": "Consommer de la boisson, souvent en grande quantité lors d’une fête entre amis.",
    "frenchTranslation": "Boire, trinquer, picoler.",
    "originLanguage": "Argot Abidjan",
    "examples": [
      {
        "nouchi": "On va badrô du bon jus ce soir pour fêter le nouveau djossi !",
        "french": "On va boire un bon coup ce soir pour célébrer mon nouvel emploi !"
      },
      {
        "nouchi": "On va badrô un peu.",
        "french": "Sens : « Boire » en contexte familier."
      }
    ],
    "synonyms": [
      "Siffler",
      "Se doser",
      "Glouglouter"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Boisson",
      "Fête",
      "Sortie"
    ]
  },
  {
    "id": "baga-baga",
    "term": "Baga baga",
    "phonetic": "/ba.ɡa ba.ɡa/",
    "grammaticalCategory": "Verbe / Nom",
    "definition": "Intimider, effrayer quelqu'un par des menaces, des gestes brusques ou des démonstrations de force.",
    "frenchTranslation": "Intimider, faire peur, terroriser.",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "Ne viens pas me faire baga baga, je connais tes manières !",
        "french": "Ne viens pas essayer de m'impressionner ou de me faire peur, je te connais !"
      }
    ],
    "synonyms": [
      "Effrayer",
      "Chauffer le cœur",
      "Menacer"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Conflit",
      "Rue",
      "Émotion"
    ]
  },
  {
    "id": "balayer-la-cour",
    "term": "Balayer la cour",
    "phonetic": "/ba.le.je la kuʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Nettoyer.",
    "frenchTranslation": "Nettoyer",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Il est en train de balayer la cour.",
        "french": "Sens : « Nettoyer » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "balladur",
    "term": "Balladur",
    "phonetic": "/ba.la.dyʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Ancien bus public ou taxi collectif importé d'occasion, réputé lent mais robuste, baptisé ironiquement d'après l'ancien Premier ministre français.",
    "frenchTranslation": "Vieux bus ou car de transport d'occasion.",
    "originLanguage": "Français / Politique",
    "examples": [
      {
        "nouchi": "On a pris le Balladur pour aller jusqu'à Dabou.",
        "french": "On a pris le vieux car collectif pour se rendre à Dabou."
      }
    ],
    "synonyms": [
      "Gbaka",
      "Panneau",
      "France-au-revoir"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "expert",
    "officialStatus": "Classique",
    "tags": [
      "Transport",
      "Histoire",
      "Abidjan"
    ]
  },
  {
    "id": "banger",
    "term": "Banger",
    "phonetic": "/bɑ̃.ɡe/",
    "grammaticalCategory": "Nom masculin / Verbe",
    "definition": "Feu d'artifice, pétard de fête ou par extension un son musical incroyable qui explose dans les clubs.",
    "frenchTranslation": "Pétard, feu d’artifice, ou tube musical retentissant.",
    "originLanguage": "Anglais & Nouchi",
    "examples": [
      {
        "nouchi": "Pendant la Saint-Sylvestre, les petits ont allumé plein de bangers !",
        "french": "Pendant le réveillon du Nouvel An, les jeunes ont tiré plein de pétards !"
      },
      {
        "nouchi": "Il a banger son examen.",
        "french": "Sens : « Feu d'artifice, éclater, réussir avec fracas » en contexte familier."
      }
    ],
    "synonyms": [
      "Pétard",
      "Hit",
      "Balle"
    ],
    "category": "musique_culture",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Tendance",
    "tags": [
      "Fête",
      "Musique",
      "Nuit"
    ]
  },
  {
    "id": "banzon",
    "term": "Banzon",
    "phonetic": "/bɑ̃.zɔ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Argent, richesse, chose de valeur.",
    "frenchTranslation": "Argent, richesse, chose de valeur",
    "literalMeaning": "Origine : Création lexicale urbaine",
    "originLanguage": "Création lexicale urbaine",
    "examples": [
      {
        "nouchi": "Il a trouvé le banzon.",
        "french": "Il a trouvé la richesse."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "banzonner",
    "term": "Banzonner",
    "phonetic": "/bɑ̃.zɔ.ne/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Travailler dur pour gagner de l'argent.",
    "frenchTranslation": "Travailler dur pour gagner de l'argent",
    "literalMeaning": "Origine : Dérivé de Banzon",
    "originLanguage": "Dérivé de Banzon",
    "examples": [
      {
        "nouchi": "Je dois banzonner ce mois-ci.",
        "french": "Sens : « Travailler dur pour gagner de l'argent » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "bara",
    "term": "Bara",
    "phonetic": "/ba.ʁa/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Travail.",
    "frenchTranslation": "Travail",
    "literalMeaning": "Origine : Arabe/Dioula (travail)",
    "originLanguage": "Arabe/Dioula (travail)",
    "examples": [
      {
        "nouchi": "Je vais au bara tous les jours.",
        "french": "Je vais au travail tous les jours."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "barre",
    "term": "Barre",
    "phonetic": "/baʁ/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Billet ou somme de 1 000 Francs CFA.",
    "frenchTranslation": "1 000 Francs CFA.",
    "originLanguage": "Français argotique ivoirien",
    "examples": [
      {
        "nouchi": "Donne-moi une barre pour que je puisse payer mon transport.",
        "french": "Donne-moi mille francs CFA pour que je puisse régler mon taxi."
      },
      {
        "nouchi": "Le taxi coûte deux barres.",
        "french": "Le taxi coûte deux mille francs CFA."
      }
    ],
    "synonyms": [
      "Krika",
      "1000 CFA"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Argent",
      "Monnaie",
      "CFA"
    ]
  },
  {
    "id": "bawa",
    "term": "Bawa",
    "phonetic": "/ba.wa/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Grand frère, aîné respecté.",
    "frenchTranslation": "Grand frère, aîné respecté",
    "literalMeaning": "Origine : Dioula",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "Oui, bawa.",
        "french": "Sens : « Grand frère, aîné respecté » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "bedou",
    "term": "Bédou",
    "phonetic": "/be.du/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Portefeuille, porte-monnaie, ou pochette où l'on garde son argent et ses pièces d'identité.",
    "frenchTranslation": "Portefeuille, porte-monnaie.",
    "originLanguage": "Argot nouchi abidjanais",
    "examples": [
      {
        "nouchi": "Fais attention à ton bédou dans la foule du marché !",
        "french": "Fais bien attention à ton portefeuille au milieu de la foule du marché !"
      },
      {
        "nouchi": "Où est mon bédou ?",
        "french": "Où est mon portefeuille ?"
      }
    ],
    "synonyms": [
      "Porte-monnaie",
      "Poche",
      "Caisse"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Objets",
      "Sécurité"
    ]
  },
  {
    "id": "bee",
    "term": "Bêê",
    "phonetic": "/be/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Exclamation de surprise ou d'approbation.",
    "frenchTranslation": "Exclamation de surprise ou d'approbation",
    "literalMeaning": "Origine : Interjection ivoirienne",
    "originLanguage": "Interjection ivoirienne",
    "examples": [
      {
        "nouchi": "Bêê ! C'est vrai ?",
        "french": "Sens : « Exclamation de surprise ou d'approbation » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "befou",
    "term": "Bêfou",
    "phonetic": "/be.fu/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Nouveau, récent.",
    "frenchTranslation": "Nouveau, récent",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "C'est du bêfou.",
        "french": "Sens : « Nouveau, récent » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "beko",
    "term": "Beko",
    "phonetic": "/be.ko/",
    "grammaticalCategory": "Nom masculin / Verbe",
    "definition": "Baiser affectueux, bisou sur la joue ou marque de tendresse.",
    "frenchTranslation": "Bisou, baiser, embrassade.",
    "originLanguage": "Dioula (Bɛkɔ : bisou)",
    "examples": [
      {
        "nouchi": "Fais un beko à ta maman avant de partir à l'école.",
        "french": "Fais un bisou à ta mère avant de partir en classe."
      }
    ],
    "synonyms": [
      "Bisou",
      "Poutou"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Affection",
      "Amour",
      "Famille"
    ]
  },
  {
    "id": "bele-bele",
    "term": "Bélé bélé",
    "phonetic": "/be.le be.le/",
    "grammaticalCategory": "Adjectif / Nom",
    "definition": "Personne corpulente, imposante, grasse ou chose de très grand format.",
    "frenchTranslation": "Corpulant, gros, géant, énorme.",
    "originLanguage": "Dioula (Bèlèbèlè : grand, gros)",
    "examples": [
      {
        "nouchi": "Le djo là est devenu bélé bélé depuis qu'il a trouvé son bon djossi !",
        "french": "Ce gars a pris beaucoup d'embonpoint depuis qu'il a un bon travail !"
      }
    ],
    "synonyms": [
      "Digba",
      "Gros",
      "Massif"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Physique",
      "Description"
    ]
  },
  {
    "id": "belle-mere-wobe",
    "term": "Belle-mère Wobé",
    "phonetic": "/bɛl mɛʁ wɔ.be/",
    "grammaticalCategory": "Nom propre / Surnom",
    "definition": "Surnom humoristique donné aux berlines allemandes BMW à Abidjan, symbolisant le prestige et la puissance.",
    "frenchTranslation": "Voiture BMW.",
    "originLanguage": "Français + Éthnie Wobé",
    "examples": [
      {
        "nouchi": "Le groto est descendu de sa Belle-mère Wobé vitres teintées.",
        "french": "Le notable fortuné est descendu de sa BMW aux vitres teintées."
      }
    ],
    "synonyms": [
      "BMW",
      "Grosse caisse",
      "Borifin"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "expert",
    "officialStatus": "Classique",
    "tags": [
      "Voiture",
      "Humour",
      "Abidjan"
    ]
  },
  {
    "id": "beou",
    "term": "Beou",
    "phonetic": "/be.u/",
    "grammaticalCategory": "Verbe intransitif",
    "definition": "Quitter précipitamment un endroit, s'esquiver discrètement ou s'enfuir devant un danger.",
    "frenchTranslation": "Partir, s'en aller, fuir, s'éclipser.",
    "originLanguage": "Argot urbain d’Adjamé",
    "examples": [
      {
        "nouchi": "Dès que le gômon est arrivé, tout le monde a beou !",
        "french": "Dès que la police est arrivée, tout le monde s'est enfui !"
      }
    ],
    "synonyms": [
      "Fraya",
      "Flo",
      "Pantougouler",
      "Prendre la clé des champs"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Fuite",
      "Action",
      "Rue"
    ]
  },
  {
    "id": "beou-1",
    "term": "Béou",
    "phonetic": "/be.u/",
    "grammaticalCategory": "Verbe intransitif",
    "definition": "Fuir, aller.",
    "frenchTranslation": "Fuir, aller",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Je vais béou.",
        "french": "Sens : « Fuir, aller » en contexte familier."
      }
    ],
    "synonyms": [
      "Fraya",
      "Pantougouler",
      "Prendre la tangente"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "bigo",
    "term": "Bigo",
    "phonetic": "/bi.ɡo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Téléphone portable ou smartphone (parfois désigne un œuf selon le contexte culinaire d'Abidjan).",
    "frenchTranslation": "Téléphone, smartphone.",
    "originLanguage": "Français argotique (Bigo)",
    "examples": [
      {
        "nouchi": "Mon bigo est déchargé, prête-moi ton chargeur s'il te plaît.",
        "french": "Mon téléphone n'a plus de batterie, prête-moi ton chargeur s'il te plaît."
      }
    ],
    "synonyms": [
      "Lalé",
      "Cellulaire",
      "Appareil"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Tech",
      "Objets",
      "Quotidien"
    ]
  },
  {
    "id": "bingue",
    "term": "Bingue",
    "phonetic": "/biŋɡ/",
    "grammaticalCategory": "Nom propre géographique",
    "definition": "L'Europe, et plus particulièrement la France ou l'Occident dans l'imaginaire urbain ivoirien.",
    "frenchTranslation": "L'Europe, la France, l'Occident.",
    "originLanguage": "Création nouchi",
    "etymologyDetails": "Apparu dans les années 80 pour désigner l'eldorado migratoire rêvé par les jeunes d'Abidjan.",
    "examples": [
      {
        "nouchi": "Mon grand frère est parti à Bingue pour poursuivre ses études.",
        "french": "Mon frère aîné est parti en Europe pour continuer ses études."
      }
    ],
    "synonyms": [
      "Mbeng",
      "Paris",
      "L’Hexagone",
      "Poto"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Voyage",
      "Diaspora",
      "Culture"
    ]
  },
  {
    "id": "binguiste",
    "term": "Binguiste",
    "phonetic": "/biŋ.ɡist/",
    "grammaticalCategory": "Nom masculin / féminin",
    "definition": "Personne originaire d'Afrique vivant en Europe (à Bingue) ou revenant au pays avec des signes extérieurs d'aisance financière.",
    "frenchTranslation": "Ressortissant de la diaspora vivant en Europe / voyageur de retour de France.",
    "originLanguage": "Nouchi (Bingue + suffixe -iste)",
    "examples": [
      {
        "nouchi": "Pendant les fêtes de décembre, les binguistes remplissent les maquis de Cocody.",
        "french": "Pendant les fêtes de fin d'année, les membres de la diaspora remplissent les restaurants en plein air de Cocody."
      },
      {
        "nouchi": "Il parle comme un binguiste.",
        "french": "Sens : « Quelqu'un qui vient d'Europe, de la France » en contexte familier."
      }
    ],
    "synonyms": [
      "Diaspo",
      "Parigot",
      "Benguiste"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Diaspora",
      "Personne",
      "Société"
    ]
  },
  {
    "id": "bissap",
    "term": "Bissap",
    "phonetic": "/bi.sap/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Jus d'hibiscus.",
    "frenchTranslation": "Jus d'hibiscus",
    "literalMeaning": "Origine : Nom traditionnel",
    "originLanguage": "Nom traditionnel",
    "examples": [
      {
        "nouchi": "Le bissap est frais.",
        "french": "Sens : « Jus d'hibiscus » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "blakoro",
    "term": "Blakoro",
    "phonetic": "/bla.ko.ʁo/",
    "grammaticalCategory": "Nom masculin / Invective",
    "definition": "À l'origine en mandingue, jeune homme non circoncis; en nouchi, garnement insolent, écervelé, impoli ou immature.",
    "frenchTranslation": "Gamin insolent, novice, irresponsable.",
    "originLanguage": "Dioula / Mandingue (Bilakoro)",
    "examples": [
      {
        "nouchi": "Petit blakoro là, tu oses manquer de respect aux grands du quartier ?",
        "french": "Espèce de petit insolent, tu oses manquer de respect à tes aînés ?"
      }
    ],
    "synonyms": [
      "Gamin",
      "Gaou",
      "Insolent"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Jeunesse",
      "Insulte légère",
      "Tradition"
    ]
  },
  {
    "id": "bobaraba",
    "term": "BobaraBa",
    "phonetic": "/bo.ba.ʁa.ba/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Fesses très volumineuses et rebondies. A donné son nom à une danse et un genre musical culte en Côte d'Ivoire.",
    "frenchTranslation": "Postérieur très développé, fessier imposant.",
    "originLanguage": "Dioula (Bɔbɔra : fesses + Ba : grand/gros)",
    "examples": [
      {
        "nouchi": "La chanson du BobaraBa a fait danser toute l'Afrique de l'Ouest.",
        "french": "Le tube musical sur les fessiers généreux a fait danser toute l'Afrique de l'Ouest."
      },
      {
        "nouchi": "Elle a un bobaraba.",
        "french": "Sens : « Postérieur généreux » en contexte familier."
      }
    ],
    "synonyms": [
      "Tassaba",
      "Bôtchô",
      "Matos"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Musique",
      "Corps",
      "Danse"
    ]
  },
  {
    "id": "bobarafitini",
    "term": "Bobarafitini",
    "phonetic": "/bo.ba.ʁa.fi.ti.ni/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Postérieur fin.",
    "frenchTranslation": "Postérieur fin",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Elle a un bobarafitini.",
        "french": "Sens : « Postérieur fin » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "bogo",
    "term": "Bôgô",
    "phonetic": "/bo.go/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Tête, esprit.",
    "frenchTranslation": "Tête, esprit",
    "literalMeaning": "Origine : Dioula",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "Ça tourne dans mon bôgô.",
        "french": "Sens : « Tête, esprit » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "boire-le-dja",
    "term": "Boire le dja",
    "phonetic": "/bwɑʁ lə dʒa/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Boire de l'alcool fort.",
    "frenchTranslation": "Boire de l'alcool fort",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Il est en train de boire le dja.",
        "french": "Sens : « Boire de l'alcool fort » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "borifin",
    "term": "Borifin",
    "phonetic": "/bo.ʁi.fɛ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Véhicule automobile, voiture, bagnole en général.",
    "frenchTranslation": "Voiture, automobile, véhicule.",
    "originLanguage": "Dioula (Bori : course/vitesse + Fin : chose/engin)",
    "examples": [
      {
        "nouchi": "Il a garé son borifin devant la cour.",
        "french": "Il a stationné sa voiture devant la concession."
      }
    ],
    "synonyms": [
      "Gamos",
      "Caisse",
      "Voiture"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Transport",
      "Voiture"
    ]
  },
  {
    "id": "borlai",
    "term": "Borlaï",
    "phonetic": "/bɔʁ.laj/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Ignorant, naïf.",
    "frenchTranslation": "Ignorant, naïf",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "C'est un vrai borlaï.",
        "french": "Sens : « Ignorant, naïf » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "borlaiser",
    "term": "Borlaïser",
    "phonetic": "/bɔʁ.laj.ze/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Agir en ignorant.",
    "frenchTranslation": "Agir en ignorant",
    "literalMeaning": "Origine : Dérivé de Borlaï",
    "originLanguage": "Dérivé de Borlaï",
    "examples": [
      {
        "nouchi": "Ne borlaïse pas.",
        "french": "Sens : « Agir en ignorant » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "borofin",
    "term": "Borofin",
    "phonetic": "/bo.ʁo.fɛ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Minibus de transport en commun.",
    "frenchTranslation": "Minibus de transport en commun",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Je prends le borofin.",
        "french": "Sens : « Minibus de transport en commun » en contexte familier."
      }
    ],
    "synonyms": [
      "Gbaka",
      "Wôrô-wôrô"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "botcho",
    "term": "Bôtchô",
    "phonetic": "/bo.tʃo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Fesses.",
    "frenchTranslation": "Fesses",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Il a mal aux bôtchô.",
        "french": "Sens : « Fesses » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "boucaner",
    "term": "Boucaner",
    "phonetic": "/bu.ka.ne/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Faire la fête, s'afficher.",
    "frenchTranslation": "Faire la fête, s'afficher",
    "literalMeaning": "Origine : Dérivé de Boucantier",
    "originLanguage": "Dérivé de Boucantier",
    "examples": [
      {
        "nouchi": "Il aime boucaner.",
        "french": "Sens : « Faire la fête, s'afficher » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "boucantier",
    "term": "Boucantier",
    "phonetic": "/bu.kɑ̃.tje/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne qui aime faire la fête avec faste, étaler sa richesse, dépenser sans compter en public et faire du 'boucan' (bruit/renommée). Mot officiel du dictionnaire Larousse.",
    "frenchTranslation": "Fêtard flamboyant qui affiche ostensiblement son aisance financière.",
    "originLanguage": "Français (Boucan) + Nouchi ivoirien",
    "etymologyDetails": "Intronisé au Petit Larousse illustré en 2020 grâce à la vague Coupé-Décalé de Douk Saga et de la Jet Set ivoirienne.",
    "examples": [
      {
        "nouchi": "Les boucantiers commandent du champagne et distribuent les coupures sur la piste.",
        "french": "Les fêtards flamboyants commandent du champagne et jettent des billets sur la piste de danse."
      },
      {
        "nouchi": "C'est un vrai boucantier.",
        "french": "Sens : « Personne qui aime s'afficher, faire la fête » en contexte familier."
      }
    ],
    "synonyms": [
      "Faroteur",
      "Travailleur",
      "Showman",
      "Groto"
    ],
    "category": "musique_culture",
    "difficultyLevel": "debutant",
    "officialStatus": "Larousse",
    "officialYear": "2020",
    "tags": [
      "Coupé-Décalé",
      "Larousse",
      "Fête",
      "Argent"
    ]
  },
  {
    "id": "bouffer",
    "term": "Bouffer",
    "phonetic": "/bu.fe/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Manger.",
    "frenchTranslation": "Manger",
    "literalMeaning": "Origine : Français populaire",
    "originLanguage": "Français populaire",
    "examples": [
      {
        "nouchi": "On va bouffer.",
        "french": "Sens : « Manger » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "bourou",
    "term": "Bourou",
    "phonetic": "/bu.ʁu/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Pain (notamment la baguette de pain consommée au petit déjeuner ou avec des brochettes).",
    "frenchTranslation": "Pain, baguette.",
    "originLanguage": "Dioula (Burukisi / Bourou)",
    "examples": [
      {
        "nouchi": "Va acheter deux bourous avec du garba chez le boutiquier.",
        "french": "Va acheter deux baguettes de pain avec du poisson et de l'attiéké chez le commerçant."
      },
      {
        "nouchi": "Je veux du bourou.",
        "french": "Sens : « Pain » en contexte familier."
      }
    ],
    "synonyms": [
      "Pain",
      "Baguette"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Nourriture",
      "Repas"
    ]
  },
  {
    "id": "braise",
    "term": "Braise",
    "phonetic": "/bʁɛz/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Poulet ou poisson grillé, ou ambiance chaude.",
    "frenchTranslation": "Poulet ou poisson grillé, ou ambiance chaude",
    "literalMeaning": "Origine : Français adapté",
    "originLanguage": "Français adapté",
    "examples": [
      {
        "nouchi": "On va manger la braise.",
        "french": "Sens : « Poulet ou poisson grillé, ou ambiance chaude » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "braiseur",
    "term": "Braiseur",
    "phonetic": "/bʁe.zœʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Celui qui vend de la braise.",
    "frenchTranslation": "Celui qui vend de la braise",
    "literalMeaning": "Origine : Dérivé de Braise",
    "originLanguage": "Dérivé de Braise",
    "examples": [
      {
        "nouchi": "Le braiseur est là.",
        "french": "Sens : « Celui qui vend de la braise » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "bramogo",
    "term": "Bramogo",
    "phonetic": "/bʁa.mo.go/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Ami, frère de cœur, partenaire de confiance.",
    "frenchTranslation": "Ami, frère de cœur, partenaire de confiance",
    "literalMeaning": "Origine : Contraction de Bram (frère) et Môgô",
    "originLanguage": "Contraction de Bram (frère) et Môgô",
    "examples": [
      {
        "nouchi": "C'est mon bramogo depuis l'enfance.",
        "french": "C'est mon ami fidèle depuis l'enfance."
      }
    ],
    "synonyms": [
      "Môgô",
      "Djo",
      "Frérot"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "brobro",
    "term": "Brobro",
    "phonetic": "/bʁo.bʁo/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Chercher, travailler dur.",
    "frenchTranslation": "Chercher, travailler dur",
    "literalMeaning": "Origine : Redoublement expressif",
    "originLanguage": "Redoublement expressif",
    "examples": [
      {
        "nouchi": "Il est en train de brobro.",
        "french": "Sens : « Chercher, travailler dur » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "brobroli",
    "term": "Brobroli",
    "phonetic": "/bʁo.bʁo.li/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Petit boulot, job précaire.",
    "frenchTranslation": "Petit boulot, job précaire",
    "literalMeaning": "Origine : Redoublement expressif",
    "originLanguage": "Redoublement expressif",
    "examples": [
      {
        "nouchi": "Je fais un petit brobroli en ce moment.",
        "french": "Je fais un petit petit boulot de dépannage en ce moment."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "broutage",
    "term": "Broutage",
    "phonetic": "/bʁu.taʒ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Activité illégale de cyber-escroquerie en ligne.",
    "frenchTranslation": "Cyber-arnaque, escroquerie sur le web.",
    "originLanguage": "Nouchi dérivé de Brouteur",
    "examples": [
      {
        "nouchi": "Il a abandonné le broutage pour lancer un commerce honnête.",
        "french": "Il a arrêté les cyber-arnaques pour ouvrir un commerce légal."
      },
      {
        "nouchi": "Il vit du broutage.",
        "french": "Sens : « Arnaque (surtout sur internet) » en contexte familier."
      }
    ],
    "synonyms": [
      "Arnaque web",
      "Scamming"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Internet",
      "Droit",
      "Argot"
    ]
  },
  {
    "id": "brouter",
    "term": "Brouter",
    "phonetic": "/bʁu.te/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Arnaquer sur internet.",
    "frenchTranslation": "Arnaquer sur internet",
    "literalMeaning": "Origine : Dérivé de Brouteur",
    "originLanguage": "Dérivé de Brouteur",
    "examples": [
      {
        "nouchi": "Il essaie de me brouter.",
        "french": "Sens : « Arnaquer sur internet » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "brouteur",
    "term": "Brouteur",
    "phonetic": "/bʁu.tœʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Cybercriminel ou escroc opérant sur Internet (arnaques sentimentales, fausses transactions). Mot entré au Petit Robert.",
    "frenchTranslation": "Cyber-escroc, arnaqueur sur Internet.",
    "originLanguage": "Français métaphorique ivoirien",
    "etymologyDetails": "Métaphore du mouton qui broute l'herbe sans se soucier du propriétaire; entré au dictionnaire Le Robert en 2023.",
    "examples": [
      {
        "nouchi": "La police scientifique a démantelé un réseau de brouteurs dans la commune.",
        "french": "La police spécialisée a arrêté un réseau de cyber-arnaqueurs dans la commune."
      },
      {
        "nouchi": "C'est un brouteur professionnel.",
        "french": "Sens : « Arnaqueur opérant sur internet » en contexte familier."
      }
    ],
    "synonyms": [
      "Arnaqueur",
      "Scammer",
      "Piqueur de réseau"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Robert",
    "officialYear": "2023",
    "tags": [
      "Cybercriminalité",
      "Robert",
      "Société"
    ]
  },
  {
    "id": "c-est-comment",
    "term": "C'est comment ?",
    "phonetic": "/sɛ kɔ.mɑ̃/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Comment ça va ?",
    "frenchTranslation": "Comment ça va ?",
    "literalMeaning": "Origine : Salutation ivoirienne",
    "originLanguage": "Salutation ivoirienne",
    "examples": [
      {
        "nouchi": "C'est comment, le frère ?",
        "french": "Sens : « Comment ça va ? » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "c-est-du-chaud",
    "term": "C'est du chaud",
    "phonetic": "/sɛ dy ʃo/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est dangereux, c'est intense.",
    "frenchTranslation": "C'est dangereux, c'est intense",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Cette zone, c'est du chaud.",
        "french": "Sens : « C'est dangereux, c'est intense » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-doux",
    "term": "C'est du doux",
    "phonetic": "/sɛ dy du/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est agréable, c'est bon.",
    "frenchTranslation": "C'est agréable, c'est bon",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Cette musique, c'est du doux.",
        "french": "Sens : « C'est agréable, c'est bon » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-dur",
    "term": "C'est du dur",
    "phonetic": "/sɛ dy dyʁ/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est difficile, c'est pénible.",
    "frenchTranslation": "C'est difficile, c'est pénible",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "La vie, c'est du dur.",
        "french": "Sens : « C'est difficile, c'est pénible » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-facile",
    "term": "C'est du facile",
    "phonetic": "/sɛ dy fa.sil/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est simple, c'est aisé.",
    "frenchTranslation": "C'est simple, c'est aisé",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Cet exercice, c'est du facile.",
        "french": "Sens : « C'est simple, c'est aisé » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-froid",
    "term": "C'est du froid",
    "phonetic": "/sɛ dy fʁwa/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est calme, c'est paisible.",
    "frenchTranslation": "C'est calme, c'est paisible",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Ici, c'est du froid.",
        "french": "Sens : « C'est calme, c'est paisible » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-leger",
    "term": "C'est du léger",
    "phonetic": "/sɛ dy le.ʒe/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "C'est sans importance, c'est facile.",
    "frenchTranslation": "C'est sans importance, c'est facile",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Cet examen, c'était du léger.",
        "french": "Sens : « C'est sans importance, c'est facile » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-lent",
    "term": "C'est du lent",
    "phonetic": "/sɛ dy lɑ̃/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est long, c'est traînant.",
    "frenchTranslation": "C'est long, c'est traînant",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Ce service, c'est du lent.",
        "french": "Sens : « C'est long, c'est traînant » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-lourd",
    "term": "C'est du lourd",
    "phonetic": "/sɛ dy luʁ/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est important, c'est sérieux.",
    "frenchTranslation": "C'est important, c'est sérieux",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Ce projet, c'est du lourd.",
        "french": "Sens : « C'est important, c'est sérieux » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-nouchi",
    "term": "C'est du nouchi",
    "phonetic": "/sɛ dy nu.ʃi/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "C'est de l'argot ivoirien.",
    "frenchTranslation": "C'est de l'argot ivoirien",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Ce qu'il dit, c'est du nouchi.",
        "french": "Sens : « C'est de l'argot ivoirien » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "c-est-du-nouveau",
    "term": "C'est du nouveau",
    "phonetic": "/sɛ dy nu.vo/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est récent, c'est inédit.",
    "frenchTranslation": "C'est récent, c'est inédit",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "C'est du nouveau, ça.",
        "french": "Sens : « C'est récent, c'est inédit » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-propre",
    "term": "C'est du propre",
    "phonetic": "/sɛ dy pʁɔpʁ/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est bien fait, c'est net.",
    "frenchTranslation": "C'est bien fait, c'est net",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Son travail, c'est du propre.",
        "french": "Sens : « C'est bien fait, c'est net » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-rapide",
    "term": "C'est du rapide",
    "phonetic": "/sɛ dy ʁa.pid/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est vite fait, c'est expédié.",
    "frenchTranslation": "C'est vite fait, c'est expédié",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Son travail, c'est du rapide.",
        "french": "Sens : « C'est vite fait, c'est expédié » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-sale",
    "term": "C'est du sale",
    "phonetic": "/sɛ dy sal/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est mal fait, c'est moche.",
    "frenchTranslation": "C'est mal fait, c'est moche",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "C'est du sale, ce travail.",
        "french": "Sens : « C'est mal fait, c'est moche » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-du-serieux",
    "term": "C'est du sérieux",
    "phonetic": "/sɛ dy se.ʁjø/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "C'est vrai, c'est important.",
    "frenchTranslation": "C'est vrai, c'est important",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Ce n'est pas une blague, c'est du sérieux.",
        "french": "Sens : « C'est vrai, c'est important » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "c-est-du-vieux",
    "term": "C'est du vieux",
    "phonetic": "/sɛ dy vjø/",
    "grammaticalCategory": "Locution d’appréciation",
    "definition": "C'est ancien, c'est dépassé.",
    "frenchTranslation": "C'est ancien, c'est dépassé",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Cette mode, c'est du vieux.",
        "french": "Sens : « C'est ancien, c'est dépassé » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "c-est-gate",
    "term": "C'est gâté",
    "phonetic": "/sɛ gɑ.te/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "C'est ruiné, c'est fini, ou c'est fou/méchant.",
    "frenchTranslation": "C'est ruiné, c'est fini, ou c'est fou/méchant",
    "literalMeaning": "Origine : Français populaire ivoirien",
    "originLanguage": "Français populaire ivoirien",
    "examples": [
      {
        "nouchi": "Le projet est gâté.",
        "french": "Sens : « C'est ruiné, c'est fini, ou c'est fou/méchant » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "c-est-mon-go",
    "term": "C'est mon go",
    "phonetic": "/sɛ mɔ̃ go/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "C'est ma petite amie.",
    "frenchTranslation": "C'est ma petite amie",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Ne la regarde pas, c'est mon go.",
        "french": "Sens : « C'est ma petite amie » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "ca-c-est-du-djafoule",
    "term": "Ça c'est du djafoule",
    "phonetic": "/sa se dy dʒa.ful/",
    "grammaticalCategory": "Expression imagée",
    "definition": "C'est impressionnant.",
    "frenchTranslation": "C'est impressionnant",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Son spectacle, ça c'est du djafoule.",
        "french": "Sens : « C'est impressionnant » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "ca-c-est-le-niveau",
    "term": "Ça c'est le niveau",
    "phonetic": "/sa se lə ni.vo/",
    "grammaticalCategory": "Expression imagée",
    "definition": "C'est de haute qualité, c'est sérieux.",
    "frenchTranslation": "C'est de haute qualité, c'est sérieux",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Cette voiture, ça c'est le niveau.",
        "french": "Sens : « C'est de haute qualité, c'est sérieux » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "ca-ne-marche-pas",
    "term": "Ça ne marche pas",
    "phonetic": "/sa nə maʁʃ pa/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Ça ne fonctionne pas.",
    "frenchTranslation": "Ça ne fonctionne pas",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Mon téléphone, ça ne marche pas.",
        "french": "Sens : « Ça ne fonctionne pas » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "ca-ne-ment-pas",
    "term": "Ça ne ment pas",
    "phonetic": "/sa nə mɑ̃ pa/",
    "grammaticalCategory": "Formule d’affirmation",
    "definition": "Expression utilisée pour appuyer une vérité incontestable, un fait avéré ou une évidence absolue.",
    "frenchTranslation": "C'est indiscutable, c'est la pure vérité, aucun doute là-dessus.",
    "literalMeaning": "La réalité ne ment jamais.",
    "originLanguage": "Français ivoirien",
    "examples": [
      {
        "nouchi": "Le gars a beaucoup travaillé, sa réussite là, ça ne ment pas !",
        "french": "Il a énormément travaillé, son succès est incontestable !"
      },
      {
        "nouchi": "Ce plat est bon, ça ne ment pas.",
        "french": "Sens : « C'est la vérité, c'est sûr » en contexte familier."
      }
    ],
    "synonyms": [
      "Gbê",
      "C’est clair",
      "C’est le terrain qui commande"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Vérité",
      "Expression",
      "Validation"
    ]
  },
  {
    "id": "ca-va-aller",
    "term": "Ça va aller",
    "phonetic": "/sa va a.le/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Tout ira bien.",
    "frenchTranslation": "Tout ira bien",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "T'inquiète, ça va aller.",
        "french": "Sens : « Tout ira bien » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "cargo",
    "term": "Cargo",
    "phonetic": "/kaʁ.ɡo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Fourgon de police cellulaire ou camionnette des forces de l'ordre utilisée pour les patrouilles et arrestations.",
    "frenchTranslation": "Fourgon de police, panier à salade.",
    "originLanguage": "Français réapproprié",
    "examples": [
      {
        "nouchi": "Le cargo de la police a tourné au carrefour, tout le monde est resté tranquille.",
        "french": "Le fourgon de police a patrouillé au carrefour, tout le monde s'est calmé."
      },
      {
        "nouchi": "Il est parti en cargo.",
        "french": "Sens : « Panier à salade, fourgon de police » en contexte familier."
      }
    ],
    "synonyms": [
      "Panier à salade",
      "Camion de flics"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Classique",
    "tags": [
      "Police",
      "Sécurité",
      "Véhicule"
    ]
  },
  {
    "id": "chantier",
    "term": "Chantier",
    "phonetic": "/ʃɑ̃.tje/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Lieu de travail, ou situation désordonnée.",
    "frenchTranslation": "Lieu de travail, ou situation désordonnée",
    "literalMeaning": "Origine : Français détourné",
    "originLanguage": "Français détourné",
    "examples": [
      {
        "nouchi": "Sa chambre est un chantier.",
        "french": "Sens : « Lieu de travail, ou situation désordonnée » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "charo",
    "term": "Charo",
    "phonetic": "/ʃa.ʁo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Voyou, bandit.",
    "frenchTranslation": "Voyou, bandit",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "C'est un charo.",
        "french": "Sens : « Voyou, bandit » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "chicooter",
    "term": "Chicotter",
    "phonetic": "/ʃi.kɔ.te/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Frapper avec une chicotte (fouet), corriger physiquement ou, par métaphore, battre largement un adversaire dans une compétition sportive.",
    "frenchTranslation": "Fouetter, corriger, infliger une sévère défaite.",
    "originLanguage": "Français colonial & Portugais (Chicote : fouet)",
    "examples": [
      {
        "nouchi": "Les Éléphants ont chicotté leur adversaire 3 à 0 en finale !",
        "french": "L'équipe de Côte d'Ivoire a battu sèchement son adversaire 3-0 en finale !"
      }
    ],
    "synonyms": [
      "Daba",
      "Laler",
      "Mettre la fessée",
      "Corriger"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Sport",
      "Victoire",
      "Action"
    ]
  },
  {
    "id": "chier",
    "term": "Chier",
    "phonetic": "/ʃje/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Crier, réprimander (sens détourné).",
    "frenchTranslation": "Crier, réprimander (sens détourné)",
    "literalMeaning": "Origine : Français populaire",
    "originLanguage": "Français populaire",
    "examples": [
      {
        "nouchi": "Le patron m'a chié dessus.",
        "french": "Sens : « Crier, réprimander (sens détourné) » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "choco",
    "term": "Choco",
    "phonetic": "/ʃo.ko/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne riche, nantie.",
    "frenchTranslation": "Personne riche, nantie",
    "literalMeaning": "Origine : Référence au chocolat (douceur de vie)",
    "originLanguage": "Référence au chocolat (douceur de vie)",
    "examples": [
      {
        "nouchi": "Il vit comme un choco.",
        "french": "Sens : « Personne riche, nantie » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "coco",
    "term": "Côcô",
    "phonetic": "/ko.ko/",
    "grammaticalCategory": "Verbe intransitif / Nom",
    "definition": "Quémander avec insistance, demander de l'argent ou des faveurs matérielles à répétition.",
    "frenchTranslation": "Quémander, gratter de l'argent, mendier poliment.",
    "originLanguage": "Dioula / Onomatopée",
    "examples": [
      {
        "nouchi": "Chaque fin de mois, il vient côcô chez son oncle.",
        "french": "Chaque fin de mois, il vient quémander un peu d'argent chez son oncle."
      },
      {
        "nouchi": "Arrête de côcô partout.",
        "french": "Sens : « Quémander, demander de l'argent » en contexte familier."
      }
    ],
    "synonyms": [
      "Taper",
      "Gratter",
      "Demander soutra"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Argent",
      "Entraide",
      "Demande"
    ]
  },
  {
    "id": "cocota",
    "term": "Côcôta",
    "phonetic": "/ko.ko.ta/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne qui a l'habitude de quémander continuellement auprès de son entourage sans jamais rien apporter en retour.",
    "frenchTranslation": "Pique-assiette, quémandeur régulier, parasite.",
    "originLanguage": "Nouchi dérivé de Côcô",
    "examples": [
      {
        "nouchi": "Celui-là c'est un vrai côcôta, il ne paie jamais son verre.",
        "french": "Celui-là est un vrai pique-assiette, il n'offre jamais sa tournée."
      },
      {
        "nouchi": "Il a pris un côcôta.",
        "french": "Sens : « Coup sur la tête » en contexte familier."
      }
    ],
    "synonyms": [
      "Pique-assiette",
      "Tapeur"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Relations",
      "Caractère"
    ]
  },
  {
    "id": "cohan",
    "term": "Cohan",
    "phonetic": "/ko.ɑ̃/",
    "grammaticalCategory": "Adverbe de manière",
    "definition": "De cette manière précise, comme cela, ainsi.",
    "frenchTranslation": "Comme ça, de cette façon.",
    "originLanguage": "Dioula (K'o tan / Tan : ainsi)",
    "examples": [
      {
        "nouchi": "Fais le travail cohan, c'est comme ça qu'on réussit !",
        "french": "Fais le travail de cette manière, c'est ainsi qu'on réussit !"
      }
    ],
    "synonyms": [
      "Comme ça",
      "De cette façon"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Grammaire",
      "Expression"
    ]
  },
  {
    "id": "col-blanc",
    "term": "Col blanc",
    "phonetic": "/kɔl blɑ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Surnom donné à certaines bouteilles de bière ou de vin local (comme la Flag ou le vin de table) à col blanc.",
    "frenchTranslation": "Bière ou bouteille de boisson de marque.",
    "originLanguage": "Français imagé",
    "examples": [
      {
        "nouchi": "Garçon, envoie-nous deux cols blancs bien glacés !",
        "french": "Serveur, apporte-nous deux bières bien fraîches !"
      }
    ],
    "synonyms": [
      "Power",
      "Bière",
      "Mousse"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Maquis",
      "Boisson",
      "Sortie"
    ]
  },
  {
    "id": "courir-le-fraya",
    "term": "Courir le fraya",
    "phonetic": "/ku.ʁiʁ lə fʁa.ja/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Courir, fuir.",
    "frenchTranslation": "Courir, fuir",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Il est en train de courir le fraya.",
        "french": "Sens : « Courir, fuir » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "cra-cra",
    "term": "Cra-cra",
    "phonetic": "/kʁa kʁa/",
    "grammaticalCategory": "Adjectif / Nom",
    "definition": "Situation tendue, complexe, périlleuse ou difficile à démêler financièrement ou socialement.",
    "frenchTranslation": "Dur, tendu, très compliqué, situation rude.",
    "originLanguage": "Onomatopée nouchi",
    "examples": [
      {
        "nouchi": "Ce mois-ci les finances sont cra-cra mais on tient bon.",
        "french": "Ce mois-ci le budget est très serré mais on garde le moral."
      }
    ],
    "synonyms": [
      "Chaud",
      "Tendu",
      "Compliqué"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Difficulté",
      "Vie",
      "Économie"
    ]
  },
  {
    "id": "cuisiner-le-repas",
    "term": "Cuisiner le repas",
    "phonetic": "/kɥi.zi.ne lə ʁə.pa/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Préparer à manger.",
    "frenchTranslation": "Préparer à manger",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Elle est en train de cuisiner le repas.",
        "french": "Sens : « Préparer à manger » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "daba",
    "term": "Daba",
    "phonetic": "/da.ba/",
    "grammaticalCategory": "Verbe transitif / Nom",
    "definition": "Manger copieusement, se restaurer avec appétit, ou dans un contexte pugilistique, asséner des coups lors d'une bagarre.",
    "frenchTranslation": "Manger (ou frapper selon le contexte).",
    "originLanguage": "Langues akan / mandingue",
    "examples": [
      {
        "nouchi": "On va daba un bon plat d'attiéké garba au maquis.",
        "french": "On va manger un délicieux plat d'attiéké au thon frit au restaurant."
      },
      {
        "nouchi": "Si tu t'approches trop, je vais te daba !",
        "french": "Si tu t'approches trop près, je vais te frapper !"
      },
      {
        "nouchi": "Je vais daba le riz.",
        "french": "Je vais manger l'assiette de riz."
      }
    ],
    "synonyms": [
      "Manger",
      "Poto",
      "Enfourner",
      "Corriger"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Nourriture",
      "Cuisine",
      "Polysémique"
    ]
  },
  {
    "id": "dabali",
    "term": "Dabali",
    "phonetic": "/da.ba.li/",
    "grammaticalCategory": "Nom masculin",
    "definition": "La nourriture, le repas, le festin ou les vivres préparés.",
    "frenchTranslation": "Nourriture, repas, pitance.",
    "originLanguage": "Dioula / Nouchi",
    "examples": [
      {
        "nouchi": "Le dabali de ce restaurant est trop doux !",
        "french": "Le repas de ce restaurant est délicieux !"
      },
      {
        "nouchi": "Le dabali est prêt.",
        "french": "le repas est enfin prêt."
      }
    ],
    "synonyms": [
      "Fangban",
      "Manger",
      "Repas"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Gastronomie",
      "Nourriture"
    ]
  },
  {
    "id": "dedja",
    "term": "Dédja",
    "phonetic": "/de.dʒa/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Ouvrir, ouvert, blessé.",
    "frenchTranslation": "Ouvrir, ouvert, blessé",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "La porte est dédja.",
        "french": "Sens : « Ouvrir, ouvert, blessé » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "dendjo",
    "term": "Dendjô",
    "phonetic": "/dɛn.dʒo/",
    "grammaticalCategory": "Verbe transitif / intransitif",
    "definition": "Comprendre clairement un message, saisir le sous-entendu, piger une subtilité.",
    "frenchTranslation": "Comprendre, saisir, piger.",
    "originLanguage": "Dioula (Dendon / Dendjo)",
    "examples": [
      {
        "nouchi": "Est-ce que tu as dendjô ce que le vieux père a expliqué ?",
        "french": "Est-ce que tu as bien compris ce que l'aîné t'a expliqué ?"
      },
      {
        "nouchi": "Tu dendjô ou quoi ?",
        "french": "Sens : « Comprendre, piger, ou déshabiller » en contexte familier."
      }
    ],
    "synonyms": [
      "Piger",
      "Capter",
      "Comprendre"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Intelligence",
      "Communication"
    ]
  },
  {
    "id": "deux-poches",
    "term": "Deux poches",
    "phonetic": "/dø pɔʃ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Homme mûr ayant atteint la quarantaine (40 ans), faisant référence métaphorique à l'âge et à la maturité sociale.",
    "frenchTranslation": "Homme quadragénaire (environ 40 ans).",
    "originLanguage": "Français argotique imagé",
    "examples": [
      {
        "nouchi": "C'est un deux poches respecté dans tout le quartier.",
        "french": "C'est un quadragénaire respecté dans tout le quartier."
      }
    ],
    "synonyms": [
      "Quadragénaire",
      "Vieux père"
    ],
    "category": "personnes",
    "difficultyLevel": "expert",
    "officialStatus": "Classique",
    "tags": [
      "Âge",
      "Société",
      "Génération"
    ]
  },
  {
    "id": "dibi-dibi",
    "term": "Dibi-dibi",
    "phonetic": "/di.bi di.bi/",
    "grammaticalCategory": "Adjectif / Nom",
    "definition": "Chose ou comportement louche, suspect, fait en cachette dans l’obscurité ou de manière peu claire.",
    "frenchTranslation": "Louche, suspect, douteux, manigance en douce.",
    "originLanguage": "Dioula (Dibi : obscurité/ombre)",
    "examples": [
      {
        "nouchi": "Je n'aime pas tes affaires de dibi-dibi là, sois transparent !",
        "french": "Je n'aime pas tes manigances suspectes, sois franc et clair !"
      }
    ],
    "synonyms": [
      "Louche",
      "Douteux",
      "En cachette"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Méfiance",
      "Caractère"
    ]
  },
  {
    "id": "digba",
    "term": "Digba",
    "phonetic": "/diɡ.ba/",
    "grammaticalCategory": "Adjectif / Nom",
    "definition": "Homme très corpulent, imposant, balèze ou costaud.",
    "frenchTranslation": "Balèze, costaud, imposant.",
    "originLanguage": "Langues mandées / Bété",
    "examples": [
      {
        "nouchi": "Le nouveau garde du corps est digba !",
        "french": "Le nouveau garde du corps est carrément balèze !"
      }
    ],
    "synonyms": [
      "Agbolo",
      "Bélé bélé",
      "Gbôlôzailli"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Physique",
      "Force"
    ]
  },
  {
    "id": "dindin",
    "term": "Dindin",
    "phonetic": "/dɛ̃.dɛ̃/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Regarder fixement du coin de l’œil, lorgner, surveiller discrètement ou observer avec convoitise.",
    "frenchTranslation": "Lorgner, reluquer, regarder en douce, épier.",
    "originLanguage": "Onomatopée nouchi",
    "examples": [
      {
        "nouchi": "Pourquoi tu dindin le téléphone de ton voisin comme ça ?",
        "french": "Pourquoi reluques-tu discrètement le téléphone de ton voisin ainsi ?"
      },
      {
        "nouchi": "Il est en train de dindin la go.",
        "french": "Sens : « Regarder, lorgner une affaire ou une personne » en contexte familier."
      }
    ],
    "synonyms": [
      "Reluquer",
      "Épier",
      "Lorgner"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Regard",
      "Curiosité"
    ]
  },
  {
    "id": "dja",
    "term": "Dja",
    "phonetic": "/dʒa/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Tuer au sens propre, ou au figuré impressionner profondément, faire mourir de rire, ou séduire totalement.",
    "frenchTranslation": "Tuer, achever, ou épater complètement.",
    "originLanguage": "Dioula (Dja / Fa : tuer)",
    "examples": [
      {
        "nouchi": "Sa blague m'a dja de rire !",
        "french": "Sa plaisanterie m'a fait mourir de rire !"
      },
      {
        "nouchi": "Il a dja la concurrence.",
        "french": "Sens : « Tuer » en contexte familier."
      }
    ],
    "synonyms": [
      "Mourou-mourou",
      "Tuer",
      "Impressionner"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Action",
      "Humour",
      "Intensité"
    ]
  },
  {
    "id": "djafoule",
    "term": "Djafoule",
    "phonetic": "/dʒa.ful/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Tout donner, impressionner.",
    "frenchTranslation": "Tout donner, impressionner",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Il a djafoulé ce soir.",
        "french": "Sens : « Tout donner, impressionner » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "djandjou",
    "term": "Djandjou",
    "phonetic": "/dʒɑ̃.dʒu/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne aux mœurs légères.",
    "frenchTranslation": "Personne aux mœurs légères",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Ne fais pas le djandjou.",
        "french": "Sens : « Personne aux mœurs légères » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "djandjouer",
    "term": "Djandjouer",
    "phonetic": "/dʒɑ̃.dʒwe/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Se comporter comme une personne aux mœurs légères.",
    "frenchTranslation": "Se comporter comme une personne aux mœurs légères",
    "literalMeaning": "Origine : Dérivé de Djandjou",
    "originLanguage": "Dérivé de Djandjou",
    "examples": [
      {
        "nouchi": "Arrête de djandjouer.",
        "french": "Sens : « Se comporter comme une personne aux mœurs légères » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "djanterman",
    "term": "Djanterman",
    "phonetic": "/dʒɑ̃.tɛʁ.man/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Homme élégant, galant, toujours bien habillé et courtois avec les femmes.",
    "frenchTranslation": "Gentleman, homme raffiné et élégant.",
    "originLanguage": "Anglais (Gentleman) adapté à l'accent nouchi",
    "examples": [
      {
        "nouchi": "Ce djo se comporte en vrai djanterman avec sa chérie.",
        "french": "Ce garçon se conduit en véritable gentleman avec sa compagne."
      },
      {
        "nouchi": "C'est un vrai djanterman.",
        "french": "Sens : « Homme stylé, élégant » en contexte familier."
      }
    ],
    "synonyms": [
      "Zango",
      "Choco",
      "Gentleman"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Élégance",
      "Séduction",
      "Style"
    ]
  },
  {
    "id": "djantou",
    "term": "Djantra",
    "phonetic": "/dʒɑ̃.tʁa/",
    "grammaticalCategory": "Nom féminin / Invective",
    "definition": "Femme aux mœurs légères ou personne qui mène une vie nocturne débridée.",
    "frenchTranslation": "Fille de mauvaise vie, prostituée.",
    "originLanguage": "Dioula (Janturu)",
    "examples": [
      {
        "nouchi": "Il a évité les mauvaises fréquentations avec les djantras de la rue.",
        "french": "Il a évité de fréquenter les filles de mauvaise vie de la rue."
      },
      {
        "nouchi": "Il traîne avec les djantres.",
        "french": "Sens : « Prostituée » en contexte familier."
      }
    ],
    "synonyms": [
      "Djandjou",
      "Kpôclé"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Nuit",
      "Société"
    ]
  },
  {
    "id": "dje",
    "term": "Djê",
    "phonetic": "/dʒe/",
    "grammaticalCategory": "Nom masculin (invariable)",
    "definition": "L'argent, la monnaie, les billets de banque ou la richesse financière en général.",
    "frenchTranslation": "L'argent, le fric, le pèze, les sous.",
    "originLanguage": "Dioula (Jɛ : argent blanc/métal)",
    "etymologyDetails": "L'un des mots les plus employés de tout le lexique nouchi.",
    "examples": [
      {
        "nouchi": "Quand le djê entre dans la poche, le cœur est tranquille !",
        "french": "Quand l'argent arrive dans les poches, on a l'esprit serein !"
      },
      {
        "nouchi": "Le djê ne dort jamais.",
        "french": "l'argent ne dort jamais."
      }
    ],
    "synonyms": [
      "Pierre",
      "Zoto",
      "Jetons",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Incontournable",
      "Finance"
    ]
  },
  {
    "id": "djo",
    "term": "Djo",
    "phonetic": "/dʒo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Le gars, l'homme, le jeune homme, le frère, le compagnon ou l'ami.",
    "frenchTranslation": "Le gars, le mec, le type, le frère.",
    "originLanguage": "Anglais (Joe) & Création urbaine d'Abidjan",
    "examples": [
      {
        "nouchi": "Le djo qui habite à côté de chez moi est très travailleur.",
        "french": "Le gars qui habite à côté de chez moi est très travailleur."
      }
    ],
    "synonyms": [
      "Môgô",
      "Gars",
      "Frère",
      "Type"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Individu",
      "Incontournable",
      "Amitié"
    ]
  },
  {
    "id": "djossi",
    "term": "Djossi",
    "phonetic": "/dʒɔ.si/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Le travail, le gagne-pain, l'emploi rémunéré, le petit boulot ou l'activité quotidienne.",
    "frenchTranslation": "Le travail, le boulot, le taf, l’emploi.",
    "originLanguage": "Français argotique (Job) + suffixe africain -ssi",
    "examples": [
      {
        "nouchi": "Je pars à mon djossi tous les matins dès 6 heures.",
        "french": "Je me rends à mon travail tous les matins dès 6 heures."
      },
      {
        "nouchi": "Le djossi est dur en ce moment.",
        "french": "le travail est dur en ce moment."
      }
    ],
    "synonyms": [
      "Boulot",
      "Gagne-pain",
      "Taf",
      "Brobroli"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Travail",
      "Emploi",
      "Incontournable"
    ]
  },
  {
    "id": "dohi",
    "term": "Dôhi",
    "phonetic": "/do.i/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Mensonge.",
    "frenchTranslation": "Mensonge",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Ne dis pas de dôhi.",
        "french": "Sens : « Mensonge » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "dormir-le-dodo",
    "term": "Dormir le dodo",
    "phonetic": "/dɔʁ.miʁ lə do.do/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Dormir.",
    "frenchTranslation": "Dormir",
    "literalMeaning": "Origine : Expression enfantine adaptée",
    "originLanguage": "Expression enfantine adaptée",
    "examples": [
      {
        "nouchi": "Je vais dormir le dodo.",
        "french": "Sens : « Dormir » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "drap",
    "term": "Drap",
    "phonetic": "/dʁap/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Problème majeur, ennui grave, complication inattendue ('Y'a drap !' = il y a un gros souci).",
    "frenchTranslation": "Gros problème, embrouille, complication sérieuse.",
    "originLanguage": "Français argotique dévié",
    "examples": [
      {
        "nouchi": "Attention, y'a drap au carrefour, les policiers contrôlent tout le monde !",
        "french": "Attention, il y a de gros ennuis au carrefour, la police contrôle tout le monde !"
      }
    ],
    "synonyms": [
      "Gnaga",
      "Gros problème",
      "Embrouille"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Alerte",
      "Problème",
      "Expression"
    ]
  },
  {
    "id": "elle-est-gatee",
    "term": "Elle est gâtée",
    "phonetic": "/ɛl ɛ gɑ.te/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Elle est folle, méchante.",
    "frenchTranslation": "Elle est folle, méchante",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Cette fille est gâtée.",
        "french": "Sens : « Elle est folle, méchante » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "enjaillement",
    "term": "Enjaillement",
    "phonetic": "/ɑ̃.ʒaj.mɑ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "L'action de s'amuser, la réjouissance, la fête intense, l'euphorie partagée et la joie de vivre.",
    "frenchTranslation": "Fête, ambiance festive, amusement total, réjouissance.",
    "originLanguage": "Anglais (Enjoy) + suffixe français -ment",
    "examples": [
      {
        "nouchi": "Ce weekend à Grand-Bassam, c'était l'enjaillement total !",
        "french": "Ce weekend à Grand-Bassam, c'était la fête et l'amusement complets !"
      },
      {
        "nouchi": "C'est l'enjaillement total.",
        "french": "C'est la fête totale et la joie."
      }
    ],
    "synonyms": [
      "Fête",
      "Ambiance",
      "Kiff",
      "Show"
    ],
    "category": "musique_culture",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Fête",
      "Joie",
      "Culture"
    ]
  },
  {
    "id": "enjailler",
    "term": "Enjailler",
    "phonetic": "/ɑ̃.ʒa.je/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "S'amuser, plaire, faire la fête.",
    "frenchTranslation": "S'amuser, plaire, faire la fête",
    "literalMeaning": "Origine : Entré au Petit Larousse",
    "originLanguage": "Entré au Petit Larousse",
    "examples": [
      {
        "nouchi": "Ça m'enjaille de te voir.",
        "french": "Ça me fait énormément plaisir de te voir."
      }
    ],
    "synonyms": [
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Larousse",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "eteindre-le-feu",
    "term": "Éteindre le feu",
    "phonetic": "/e.tɛ̃dʁ lə fø/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Éteindre.",
    "frenchTranslation": "Éteindre",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Éteins le feu.",
        "french": "Sens : « Éteindre » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "etre-dai",
    "term": "Être daï",
    "phonetic": "/ɛtʁ daj/",
    "grammaticalCategory": "Locution verbale",
    "definition": "Être complètement ivre, saoul après avoir trop bu lors d’une célébration.",
    "frenchTranslation": "Être ivre, être saoul, éméché.",
    "originLanguage": "Anglais (Die / Dead drunk)",
    "examples": [
      {
        "nouchi": "Après trois verres de koutoukou, le gars était complètement daï.",
        "french": "Après trois verres d'alcool fort, il était totalement ivre."
      }
    ],
    "synonyms": [
      "Perdre réseau",
      "Être plein",
      "Être bourré"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Boisson",
      "Nuit",
      "État"
    ]
  },
  {
    "id": "etre-enjaille",
    "term": "Être enjaillé",
    "phonetic": "/ɛ.tʁɑ̃.ʒa.je/",
    "grammaticalCategory": "Locution / État",
    "definition": "Être content, s'amuser.",
    "frenchTranslation": "Être content, s'amuser",
    "literalMeaning": "Origine : Dérivé de Enjailler",
    "originLanguage": "Dérivé de Enjailler",
    "examples": [
      {
        "nouchi": "Je suis enjaillé ce soir.",
        "french": "Sens : « Être content, s'amuser » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "facon-facon",
    "term": "Façon façon",
    "phonetic": "/fa.sɔ̃ fa.sɔ̃/",
    "grammaticalCategory": "Adjectif / Adverbe",
    "definition": "Très bizarre, douteux, anormal ou difficile à qualifier de manière saine.",
    "frenchTranslation": "Très bizarre, suspect, étrange, peu recommandable.",
    "originLanguage": "Redoublement expressif nouchi",
    "examples": [
      {
        "nouchi": "Le comportement de ce type est devenu façon façon ces derniers temps.",
        "french": "L'attitude de cet individu est devenue très suspecte ces derniers temps."
      }
    ],
    "synonyms": [
      "Bizarre",
      "Dibi-dibi",
      "Louche"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Comportement",
      "Méfiance"
    ]
  },
  {
    "id": "faire-charnier",
    "term": "Faire charnier",
    "phonetic": "/fɛʁ ʃaʁ.nje/",
    "grammaticalCategory": "Locution verbale",
    "definition": "Acheter un très grand nombre de bouteilles de boissons pour les aligner ostensiblement sur la table d'un maquis lors d'une fête.",
    "frenchTranslation": "Remplir sa table de discothèque ou de maquis d'innombrables bouteilles.",
    "originLanguage": "Français métaphorique nouchi",
    "examples": [
      {
        "nouchi": "Pour son anniversaire, le boucantier a fait charnier au club.",
        "french": "Pour son anniversaire, le fêtard a commandé une montagne de bouteilles au club."
      }
    ],
    "synonyms": [
      "Boucanter",
      "Commander en gros",
      "Faire farot"
    ],
    "category": "musique_culture",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Classique",
    "tags": [
      "Fête",
      "Coupé-Décalé",
      "Maquis"
    ]
  },
  {
    "id": "fal",
    "term": "Fal",
    "phonetic": "/fal/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Cigarette.",
    "frenchTranslation": "Cigarette",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Donne-moi un fal.",
        "french": "Sens : « Cigarette » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "faler",
    "term": "Faler",
    "phonetic": "/fa.le/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Fumer une cigarette ou du tabac.",
    "frenchTranslation": "Fumer.",
    "originLanguage": "Argot Abidjan",
    "examples": [
      {
        "nouchi": "Il est sorti dehors pour faler une cigarette.",
        "french": "Il est sorti à l'extérieur pour fumer une cigarette."
      },
      {
        "nouchi": "Il est en train de faler.",
        "french": "Sens : « Fumer » en contexte familier."
      }
    ],
    "synonyms": [
      "Crapoter",
      "Fumer"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Habitude",
      "Tabac"
    ]
  },
  {
    "id": "fangban",
    "term": "Fangban",
    "phonetic": "/fɑ̃ɡ.bɑ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "La nourriture, le manger, les provisions alimentaires quotidiennes.",
    "frenchTranslation": "Nourriture, manger, provisions.",
    "originLanguage": "Langues akan",
    "examples": [
      {
        "nouchi": "Apporte le fangban, la faim commence à me fatiguer !",
        "french": "Apporte le repas, la faim commence à me tenailler !"
      }
    ],
    "synonyms": [
      "Dabali",
      "Repas",
      "Bouffe"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Nourriture",
      "Vie"
    ]
  },
  {
    "id": "farot",
    "term": "Farot",
    "phonetic": "/fa.ʁo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "L'art de frimer, de faire l'important, d'afficher son style ou de montrer sa supériorité matérielle.",
    "frenchTranslation": "Frime, ostentation, vantardise avec panache.",
    "originLanguage": "Création nouchi urbaine",
    "examples": [
      {
        "nouchi": "Il a mis ses plus beaux habits juste pour faire le farot au mariage.",
        "french": "Il a sorti ses plus beaux habits uniquement pour parader au mariage."
      }
    ],
    "synonyms": [
      "Pose",
      "Boucan",
      "Frime",
      "Show"
    ],
    "category": "musique_culture",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Style",
      "Sape",
      "Attitude"
    ]
  },
  {
    "id": "fata",
    "term": "Fata",
    "phonetic": "/fa.ta/",
    "grammaticalCategory": "Verbe transitif / intransitif",
    "definition": "Tomber par terre ou, dans le commerce de rue, écouler/vendre une marchandise.",
    "frenchTranslation": "Tomber, chuter (ou liquider/vendre).",
    "originLanguage": "Dioula (Fata : tomber)",
    "examples": [
      {
        "nouchi": "Le petit a couru trop vite et il a fait une grosse fatali.",
        "french": "L'enfant a couru trop vite et a fait une lourde chute."
      },
      {
        "nouchi": "La marchandise a fata rapidement.",
        "french": "Sens : « Tomber, vendre, réussir une vente » en contexte familier."
      }
    ],
    "synonyms": [
      "Tomber",
      "Chuter",
      "Liquider"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Action",
      "Mouvement"
    ]
  },
  {
    "id": "fatali",
    "term": "Fatali",
    "phonetic": "/fa.ta.li/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Chute, échec commercial.",
    "frenchTranslation": "Chute, échec commercial",
    "literalMeaning": "Origine : Dérivé de Fata",
    "originLanguage": "Dérivé de Fata",
    "examples": [
      {
        "nouchi": "C'est un fatali ce business.",
        "french": "Sens : « Chute, échec commercial » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "faut-pas-jouer",
    "term": "Faut pas jouer",
    "phonetic": "/fo pa ʒwe/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Il ne faut pas plaisanter.",
    "frenchTranslation": "Il ne faut pas plaisanter",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Faut pas jouer avec ça.",
        "french": "Sens : « Il ne faut pas plaisanter » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "faux-type",
    "term": "Faux-type",
    "phonetic": "/fo.tɪp/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Hypocrite, malhonnête.",
    "frenchTranslation": "Hypocrite, malhonnête",
    "literalMeaning": "Origine : Français détourné",
    "originLanguage": "Français détourné",
    "examples": [
      {
        "nouchi": "Méfie-toi, c'est un faux-type.",
        "french": "Sens : « Hypocrite, malhonnête » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "fermer-la-porte",
    "term": "Fermer la porte",
    "phonetic": "/fɛʁ.me la pɔʁt/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Fermer.",
    "frenchTranslation": "Fermer",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Ferme la porte.",
        "french": "Sens : « Fermer » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "fiengal",
    "term": "Fiengal",
    "phonetic": "/fjɛ̃.gal/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Maigrichon.",
    "frenchTranslation": "Maigrichon",
    "literalMeaning": "Origine : Français populaire",
    "originLanguage": "Français populaire",
    "examples": [
      {
        "nouchi": "Il est trop fiengal.",
        "french": "Sens : « Maigrichon » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "fiengaliser",
    "term": "Fiengaliser",
    "phonetic": "/fjɛ̃.ga.li.ze/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Devenir maigrichon.",
    "frenchTranslation": "Devenir maigrichon",
    "literalMeaning": "Origine : Dérivé de Fiengal",
    "originLanguage": "Dérivé de Fiengal",
    "examples": [
      {
        "nouchi": "Il a fiengalisé avec la maladie.",
        "french": "Sens : « Devenir maigrichon » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "floco",
    "term": "Flôcô",
    "phonetic": "/flo.ko/",
    "grammaticalCategory": "Nom masculin / Verbe",
    "definition": "Mensonge éhonté, bobard, invention sans fondement ou fait de mentir.",
    "frenchTranslation": "Mensonge, bobard, racontar.",
    "originLanguage": "Dioula / Argot ivoirien",
    "examples": [
      {
        "nouchi": "Ne crois pas à ses histoires, c'est du pur flôcô !",
        "french": "Ne crois pas à ce qu'il raconte, ce ne sont que des bobards !"
      },
      {
        "nouchi": "C'est du flôcô.",
        "french": "Sens : « Mentir, mensonge » en contexte familier."
      }
    ],
    "synonyms": [
      "Dôhi",
      "Mensonge",
      "Bobard",
      "Mytho"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Vérité",
      "Parole"
    ]
  },
  {
    "id": "fongnon",
    "term": "Fongnon",
    "phonetic": "/fɔ̃.ɲɔ̃/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Se positionner pour se battre, frimer.",
    "frenchTranslation": "Se positionner pour se battre, frimer",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Il est en train de fongnon.",
        "french": "Sens : « Se positionner pour se battre, frimer » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "foutou",
    "term": "Foutou",
    "phonetic": "/fu.tu/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Plat à base d'igname ou banane pilée.",
    "frenchTranslation": "Plat à base d'igname ou banane pilée",
    "literalMeaning": "Origine : Nom du plat",
    "originLanguage": "Nom du plat",
    "examples": [
      {
        "nouchi": "On mange foutou sauce graine.",
        "french": "Sens : « Plat à base d'igname ou banane pilée » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "fraichnie",
    "term": "Fraichnie",
    "phonetic": "/fʁɛʃ.ni/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Petite amie, demoiselle.",
    "frenchTranslation": "Petite amie, demoiselle",
    "literalMeaning": "Origine : Français 'fraîche' + suffixe ivoirien",
    "originLanguage": "Français 'fraîche' + suffixe ivoirien",
    "examples": [
      {
        "nouchi": "Il a présenté sa fraichnie.",
        "french": "Il a présenté sa petite amie élégante."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "frapper-ahoco",
    "term": "Frapper Ahoco",
    "phonetic": "/fʁa.pe a.o.ko/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Se masturber.",
    "frenchTranslation": "Se masturber",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Arrête de frapper ahoco.",
        "french": "Sens : « Se masturber » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "fraya",
    "term": "Fraya",
    "phonetic": "/fʁa.ja/",
    "grammaticalCategory": "Verbe intransitif",
    "definition": "Prendre la fuite à toute vitesse, s’échapper rapidement pour éviter un danger.",
    "frenchTranslation": "Fuir en courant, déguerpir, détaler.",
    "originLanguage": "Anglais (Fly away) déformé en nouchi",
    "examples": [
      {
        "nouchi": "Quand la pluie a commencé à tomber fort, tout le monde a fraya !",
        "french": "Quand l'averse a éclaté violemment, tout le monde s'est enfui à l'abri !"
      },
      {
        "nouchi": "Il a pris le fraya.",
        "french": "Il a pris la fuite."
      }
    ],
    "synonyms": [
      "Beou",
      "Pantougouler",
      "Prendre ses jambes à son cou"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Fuite",
      "Vitesse"
    ]
  },
  {
    "id": "fumer-le-fal",
    "term": "Fumer le fal",
    "phonetic": "/fy.me lə fal/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Fumer la cigarette.",
    "frenchTranslation": "Fumer la cigarette",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Il est en train de fumer le fal.",
        "french": "Sens : « Fumer la cigarette » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "gaou",
    "term": "Gaou",
    "phonetic": "/ɡa.u/",
    "grammaticalCategory": "Nom masculin / Adjectif",
    "definition": "Personne naïve, provinciale, crédule qui ne maîtrise pas les codes de la rue abidjanaise. Rendu mondialement célèbre par Magic System ('Premier Gaou').",
    "frenchTranslation": "Personne naïve, plouc, dupe, provincial non averti.",
    "originLanguage": "Bété / Dioula (Gaou : naïf)",
    "etymologyDetails": "Immense succès planétaire en 1999 avec le tube 'Premier Gaou' du groupe Magic System.",
    "examples": [
      {
        "nouchi": "Le premier gaou n'est pas gaou, c'est le deuxième gaou qui est gnata !",
        "french": "Se faire avoir une première fois arrive à tout le monde, mais se faire duper deux fois est impardonnable !"
      },
      {
        "nouchi": "Ne fais pas le gaou.",
        "french": "ne sois pas naïf."
      }
    ],
    "synonyms": [
      "Naïf",
      "Plouc",
      "Gnakoué",
      "Gnata",
      "Borlaï"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Incontournable",
      "Musique",
      "Magic System",
      "Société"
    ]
  },
  {
    "id": "garba",
    "term": "Garba",
    "phonetic": "/gaʁ.ba/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Plat de l'attiéké avec du thon.",
    "frenchTranslation": "Plat de l'attiéké avec du thon",
    "literalMeaning": "Origine : Nom du plat populaire",
    "originLanguage": "Nom du plat populaire",
    "examples": [
      {
        "nouchi": "On va prendre un garba.",
        "french": "Sens : « Plat de l'attiéké avec du thon » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "gbagboter",
    "term": "Gbagboter",
    "phonetic": "/gba.gbo.te/",
    "grammaticalCategory": "Verbe intransitif",
    "definition": "Marcher beaucoup et sur une longue distance.",
    "frenchTranslation": "Marcher beaucoup et sur une longue distance",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "J'ai gbagboté toute la journée.",
        "french": "J'ai marché à pied sur une très longue distance toute la journée."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "gbaha",
    "term": "Gbahé",
    "phonetic": "/ɡba.e/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Gronder sévèrement, réprimander vertement, sermonner ou donner des conseils fermes.",
    "frenchTranslation": "Gronder, sermonner, admonester.",
    "originLanguage": "Bété / Langues kru",
    "examples": [
      {
        "nouchi": "Le père de famille a gbahé ses enfants pour leur retard.",
        "french": "Le père de famille a réprimandé ses enfants pour leur retard."
      },
      {
        "nouchi": "Il m'a gbahé ce matin.",
        "french": "Sens : « Gronder, conseiller, sermonner, s'absenter » en contexte familier."
      }
    ],
    "synonyms": [
      "Sermonner",
      "Gronder",
      "Cadencer"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Éducation",
      "Famille"
    ]
  },
  {
    "id": "gbai",
    "term": "Gbaï",
    "phonetic": "/ɡba.i/",
    "grammaticalCategory": "Nom masculin / Interjection",
    "definition": "La pure vérité sans détour, le conseil d'or, la franchise absolue ('Donner le gbaï' = dire les vérités en face).",
    "frenchTranslation": "La vérité crue, le conseil franc et direct.",
    "originLanguage": "Dioula / Bété",
    "examples": [
      {
        "nouchi": "Assieds-toi, je vais te donner le gbaï sur ta situation.",
        "french": "Assieds-toi, je vais te dire franchement la vérité sur ta situation."
      }
    ],
    "synonyms": [
      "Gbê",
      "La vérité",
      "La franchise"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Sagesse",
      "Vérité"
    ]
  },
  {
    "id": "gbai-1",
    "term": "Gbai",
    "phonetic": "/gbaj/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Vérité, conseil, sermon.",
    "frenchTranslation": "Vérité, conseil, sermon",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Écoute mon gbai.",
        "french": "Sens : « Vérité, conseil, sermon » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "gbaire",
    "term": "Gbairè",
    "phonetic": "/gbaj.ʁe/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Commérage, ragot, médisance.",
    "frenchTranslation": "Commérage, ragot, médisance",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Arrête le gbairè.",
        "french": "Sens : « Commérage, ragot, médisance » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "gbaka",
    "term": "Gbaka",
    "phonetic": "/ɡba.ka/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Minibus de transport en commun populaire à Abidjan, célèbre pour ses apprentis cascadeurs ('apoutchous' ou 'balanceurs') et son ambiance survoltée.",
    "frenchTranslation": "Minibus de transport en commun à Abidjan.",
    "originLanguage": "Dioula (Gbaka : véhicule de charge)",
    "examples": [
      {
        "nouchi": "On a sauté dans le gbaka pour aller d'Adjamé à Yopougon.",
        "french": "On est montés dans le minibus pour relier Adjamé à Yopougon."
      },
      {
        "nouchi": "Le gbaka est plein.",
        "french": "le minibus populaire est plein."
      }
    ],
    "synonyms": [
      "Minibus",
      "Wôrô-wôrô",
      "Transport babi"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Transport",
      "Abidjan",
      "Incontournable"
    ]
  },
  {
    "id": "gbe",
    "term": "Gbê",
    "phonetic": "/ɡbɛ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "La vérité pure, évidente et sans fard. Utilisé dans la formule culte 'Le gbê est mieux que le flôcô' (La vérité vaut mieux que le mensonge).",
    "frenchTranslation": "La vérité indiscutable, la réalité nue.",
    "originLanguage": "Dioula (Jɛ / Gbɛ : clair, limpide, vrai)",
    "examples": [
      {
        "nouchi": "Moi je ne te mens pas, je te parle le gbê !",
        "french": "Moi je ne te mens pas, je te dis toute la vérité !"
      }
    ],
    "synonyms": [
      "Gbaï",
      "Vérité",
      "Transparence"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Valeur",
      "Philosophie",
      "Incontournable"
    ]
  },
  {
    "id": "gbede",
    "term": "Gbêdê",
    "phonetic": "/gbe.de/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Baiser, avoir un rapport sexuel.",
    "frenchTranslation": "Baiser, avoir un rapport sexuel",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Il veut gbêdê.",
        "french": "Sens : « Baiser, avoir un rapport sexuel » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "gbenerie",
    "term": "Gbênerie",
    "phonetic": "/gbe.ne.ʁi/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de parler, bavardage.",
    "frenchTranslation": "Action de parler, bavardage",
    "literalMeaning": "Origine : Dérivé de Gbê",
    "originLanguage": "Dérivé de Gbê",
    "examples": [
      {
        "nouchi": "C'est de la gbênerie.",
        "french": "Sens : « Action de parler, bavardage » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "gbess",
    "term": "Gbêss",
    "phonetic": "/ɡbɛs/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Pièce ou somme de 500 Francs CFA.",
    "frenchTranslation": "500 Francs CFA.",
    "originLanguage": "Nouchi argot monétaire",
    "examples": [
      {
        "nouchi": "Prête-moi un gbêss pour acheter ma recharge téléphonique.",
        "french": "Prête-moi 500 francs CFA pour recharger mon forfait."
      }
    ],
    "synonyms": [
      "500 CFA",
      "Pièce de 500"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Argent",
      "CFA"
    ]
  },
  {
    "id": "gbess-1",
    "term": "Gbess",
    "phonetic": "/gbɛs/",
    "grammaticalCategory": "Nom masculin",
    "definition": "500 Francs CFA.",
    "frenchTranslation": "500 Francs CFA",
    "literalMeaning": "Origine : Onomatopée ivoirienne",
    "originLanguage": "Onomatopée ivoirienne",
    "examples": [
      {
        "nouchi": "Je n'ai même pas un gbess sur moi.",
        "french": "Je n'ai même pas 500 francs CFA sur moi."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "gbo",
    "term": "Gbô",
    "phonetic": "/gbo/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Manger, ou point de la main.",
    "frenchTranslation": "Manger, ou point de la main",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "On va gbô.",
        "french": "Sens : « Manger, ou point de la main » en contexte familier."
      }
    ],
    "synonyms": [
      "Daba",
      "Pôtô",
      "Badou"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "gboklo",
    "term": "Gbôklo",
    "phonetic": "/gbo.klo/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Femme séduisante, belle femme.",
    "frenchTranslation": "Femme séduisante, belle femme",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "C'est une vraie gbôklo.",
        "french": "Sens : « Femme séduisante, belle femme » en contexte familier."
      }
    ],
    "synonyms": [
      "Go",
      "Mousso",
      "Fraichnie"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "gbolozailli",
    "term": "Gbôlôzailli",
    "phonetic": "/gbo.lo.za.ji/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Gros, massif, musclé.",
    "frenchTranslation": "Gros, massif, musclé",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "C'est un gbôlôzailli.",
        "french": "Sens : « Gros, massif, musclé » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "gbolozaillir",
    "term": "Gbôlôzaillir",
    "phonetic": "/gbo.lo.za.jiʁ/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Devenir massif, musclé.",
    "frenchTranslation": "Devenir massif, musclé",
    "literalMeaning": "Origine : Dérivé de Gbôlôzailli",
    "originLanguage": "Dérivé de Gbôlôzailli",
    "examples": [
      {
        "nouchi": "Il est en train de gbôlôzaillir.",
        "french": "Sens : « Devenir massif, musclé » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "gbonhi",
    "term": "Gbonhi",
    "phonetic": "/gbo.ni/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Groupe, bande.",
    "frenchTranslation": "Groupe, bande",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Il est avec son gbonhi.",
        "french": "Sens : « Groupe, bande » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "gbonhon-1",
    "term": "Gbonhon",
    "phonetic": "/gbɔ.nɔ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "5 000 Francs CFA.",
    "frenchTranslation": "5 000 Francs CFA",
    "literalMeaning": "Origine : Langue locale (Baoulé/Dioula)",
    "originLanguage": "Langue locale (Baoulé/Dioula)",
    "examples": [
      {
        "nouchi": "Le repas a coûté un gbonhon.",
        "french": "Le repas a coûté cinq mille francs CFA."
      }
    ],
    "synonyms": [
      "Djê",
      "Fric",
      "Jeton"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "gbonhon",
    "term": "Gbonhon (ou Gbon)",
    "phonetic": "/ɡbɔ̃.ɔ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Billet de 5 000 Francs CFA.",
    "frenchTranslation": "5 000 Francs CFA.",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "Il a sorti un gbonhon tout neuf pour régler l'addition.",
        "french": "Il a sorti un billet de 5 000 francs CFA neuf pour payer la note."
      }
    ],
    "synonyms": [
      "Gbon",
      "5 000 CFA",
      "Billet vert"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Monnaie"
    ]
  },
  {
    "id": "gloglo",
    "term": "Glôglô",
    "phonetic": "/ɡlo.ɡlo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Ruelles tortueuses, bas quartiers, recoins secrets ou cours communes cachées des quartiers populaires.",
    "frenchTranslation": "Ruelle cachée, dédale de bas quartier, coupe-gorge.",
    "originLanguage": "Langues akan / Baoulé",
    "examples": [
      {
        "nouchi": "Pour éviter les embouteillages, le taxi a pris les glôglôs d'Adjamé.",
        "french": "Pour esquiver les bouchons, le taxi est passé par les ruelles secrètes d'Adjamé."
      },
      {
        "nouchi": "On a pris le glôglô.",
        "french": "Sens : « Couloirs, raccourci, bas quartier » en contexte familier."
      }
    ],
    "synonyms": [
      "Couloir",
      "Ruelle",
      "Bas quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Classique",
    "tags": [
      "Abidjan",
      "Lieux",
      "Orientation"
    ]
  },
  {
    "id": "gnaga",
    "term": "Gnaga",
    "phonetic": "/ɲa.ɡa/",
    "grammaticalCategory": "Nom féminin / masculin",
    "definition": "Bagarre violente, échauffourée, grosse bagarre de rue ou confrontation tendue.",
    "frenchTranslation": "Bagarre, rixe, baston, échauffourée.",
    "originLanguage": "Dioula / Langues kru",
    "examples": [
      {
        "nouchi": "Il y a eu une grosse gnaga après le match de football.",
        "french": "Il y a eu une vive bagarre après la rencontre de football."
      }
    ],
    "synonyms": [
      "Baston",
      "Magatapé",
      "Rixe"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Conflit",
      "Action",
      "Rue"
    ]
  },
  {
    "id": "gnakoue",
    "term": "Gnakoué",
    "phonetic": "/ɲa.kwe/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Personne ignorante, stupide ou facilement influençable.",
    "frenchTranslation": "Ignorant, imbécile, niais.",
    "originLanguage": "Langues kru / Bété",
    "examples": [
      {
        "nouchi": "Ne fais pas le gnakoué, réfléchis avant d'agir !",
        "french": "Ne fais pas l'ignorant, réfléchis avant de prendre une décision !"
      },
      {
        "nouchi": "Tu es un gnakoué.",
        "french": "Sens : « Ignorant, couillon » en contexte familier."
      }
    ],
    "synonyms": [
      "Gnata",
      "Gaou",
      "Laga laga"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Insulte légère",
      "Caractère"
    ]
  },
  {
    "id": "gnamankoudji",
    "term": "Gnamankoudji",
    "phonetic": "/ɲa.man.ku.dʒi/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Jus de gingembre.",
    "frenchTranslation": "Jus de gingembre",
    "literalMeaning": "Origine : Nom traditionnel",
    "originLanguage": "Nom traditionnel",
    "examples": [
      {
        "nouchi": "Un verre de gnamankoudji, s'il te plaît.",
        "french": "Sens : « Jus de gingembre » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "gnanhi",
    "term": "Gnanhi",
    "phonetic": "/ɲa.ni/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Femme d'âge mûr, élégante et aisée financièrement, qui fréquente des hommes plus jeunes ('cougar' ivoirienne).",
    "frenchTranslation": "Femme mûre aisée sortant avec de jeunes hommes (cougar).",
    "originLanguage": "Akan / Baoulé",
    "examples": [
      {
        "nouchi": "Le jeune djo roule en grosse caisse grâce à sa gnanhi.",
        "french": "Le jeune homme roule dans une belle voiture grâce à sa compagne plus âgée."
      }
    ],
    "synonyms": [
      "Cougar",
      "Femme d’affaires"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Classique",
    "tags": [
      "Amour",
      "Société",
      "Génération"
    ]
  },
  {
    "id": "gnata",
    "term": "Gnata",
    "phonetic": "/ɲa.ta/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Très ignorant.",
    "frenchTranslation": "Très ignorant",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Il est gnata, il ne comprend rien.",
        "french": "Sens : « Très ignorant » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "go",
    "term": "Go",
    "phonetic": "/ɡo/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Une fille, une jeune femme, une petite amie ou une compagne. Terme officiel entré au Petit Robert.",
    "frenchTranslation": "Une fille, une demoiselle, une copine, une petite amie.",
    "originLanguage": "Anglais (Girl) / Langues africaines",
    "etymologyDetails": "Ultra populaire dans toute la francophonie africaine et urbaine européenne; validé au dictionnaire Le Robert en 2023.",
    "examples": [
      {
        "nouchi": "La go là est trop jolie, elle a un style incroyable !",
        "french": "Cette fille est magnifique, elle a une classe incroyable !"
      },
      {
        "nouchi": "C'est ma go.",
        "french": "C'est ma copine."
      }
    ],
    "synonyms": [
      "Mousso",
      "Gnahy",
      "Chérie",
      "Demoiselle"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Robert",
    "officialYear": "2023",
    "tags": [
      "Femme",
      "Amour",
      "Robert",
      "Incontournable"
    ]
  },
  {
    "id": "gomon",
    "term": "Gômon",
    "phonetic": "/go.mɔ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Policier.",
    "frenchTranslation": "Policier",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Les gômons arrivent.",
        "french": "Sens : « Policier » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "goumin",
    "term": "Goumin",
    "phonetic": "/ɡu.mɛ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Le chagrin d'amour intense, la déception amoureuse dévastatrice suite à une rupture ou une infidélité.",
    "frenchTranslation": "Chagrin d’amour violent, déception amoureuse cuisante.",
    "originLanguage": "Dioula (Gumin / Gounmin : tristesse profonde)",
    "etymologyDetails": "Devenu l'un des thèmes majeurs de la musique pop ivoirienne et de la jeunesse africaine.",
    "examples": [
      {
        "nouchi": "Le pauvre djo a pris un goumin terrible quand sa go l'a quitté.",
        "french": "Le pauvre garçon a subi un violent chagrin d'amour quand sa copine est partie."
      },
      {
        "nouchi": "Il a le goumin depuis qu'elle est partie.",
        "french": "Il a un terrible chagrin d'amour depuis qu'elle est partie."
      }
    ],
    "synonyms": [
      "Cœur brisé",
      "Déception amoureuse"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Amour",
      "Émotion",
      "Musique",
      "Incontournable"
    ]
  },
  {
    "id": "grailler",
    "term": "Grailler",
    "phonetic": "/gʁa.je/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Manger.",
    "frenchTranslation": "Manger",
    "literalMeaning": "Origine : Français populaire",
    "originLanguage": "Français populaire",
    "examples": [
      {
        "nouchi": "Il est en train de grailler.",
        "french": "Sens : « Manger » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "grin",
    "term": "Grin",
    "phonetic": "/gʁɛ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Lieu de rassemblement informel pour discuter.",
    "frenchTranslation": "Lieu de rassemblement informel pour discuter",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "On est au grin.",
        "french": "Sens : « Lieu de rassemblement informel pour discuter » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "groto",
    "term": "Groto",
    "phonetic": "/ɡʁo.to/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Homme très influent, haut placé, nanti financièrement et respecté dans la société.",
    "frenchTranslation": "Homme riche, notable, magnat, ponte.",
    "originLanguage": "Français (Gros) + suffixe argotique -to",
    "examples": [
      {
        "nouchi": "Tous les gros ministres et les grotos d'Abidjan étaient présents à la cérémonie.",
        "french": "Tous les grands ministres et les dignitaires fortunés d'Abidjan étaient présents."
      },
      {
        "nouchi": "Ce type est un groto.",
        "french": "Sens : « Homme riche » en contexte familier."
      }
    ],
    "synonyms": [
      "Notable",
      "Homme riche",
      "Boss",
      "Grand patron"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Pouvoir",
      "Argent",
      "Société"
    ]
  },
  {
    "id": "grouiller",
    "term": "Grouiller",
    "phonetic": "/gʁu.je/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Se débrouiller.",
    "frenchTranslation": "Se débrouiller",
    "literalMeaning": "Origine : Dérivé de Grouilleur",
    "originLanguage": "Dérivé de Grouilleur",
    "examples": [
      {
        "nouchi": "Il faut grouiller.",
        "french": "Sens : « Se débrouiller » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "grouilleur",
    "term": "Grouilleur",
    "phonetic": "/ɡʁu.jœʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne vaillante, courageuse et inventive qui se démène au quotidien pour gagner sa vie honnêtement par tous les moyens licites.",
    "frenchTranslation": "Débrouillard infatigable, travailleur acharné.",
    "originLanguage": "Français (Se grouiller) adapté en Côte d’Ivoire",
    "examples": [
      {
        "nouchi": "À Abidjan, tout le monde est un grouilleur, personne ne baisse les bras !",
        "french": "À Abidjan, chacun est un battant débrouillard, nul ne baisse les bras !"
      },
      {
        "nouchi": "C'est un vrai grouilleur, il s'en sort toujours.",
        "french": "Sens : « Débrouillard » en contexte familier."
      }
    ],
    "synonyms": [
      "Battant",
      "Débrouillard",
      "Guerrier"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Valeur",
      "Travail",
      "Résilience"
    ]
  },
  {
    "id": "guimero",
    "term": "Guimero",
    "phonetic": "/gi.me.ʁo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Voyou.",
    "frenchTranslation": "Voyou",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "C'est un guimero.",
        "french": "Sens : « Voyou » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "hein",
    "term": "Hein ?",
    "phonetic": "/ɛ̃/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Expression d'incompréhension ou de défi.",
    "frenchTranslation": "Expression d'incompréhension ou de défi",
    "literalMeaning": "Origine : Français populaire",
    "originLanguage": "Français populaire",
    "examples": [
      {
        "nouchi": "Hein ? Tu dis quoi ?",
        "french": "Sens : « Expression d'incompréhension ou de défi » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "il-est-gate",
    "term": "Il est gâté",
    "phonetic": "/il ɛ gɑ.te/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Il est fou, il est méchant.",
    "frenchTranslation": "Il est fou, il est méchant",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Ce type est gâté.",
        "french": "Sens : « Il est fou, il est méchant » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "je-ne-suis-pas-en-drap-de-ca",
    "term": "Je ne suis pas en drap de ça",
    "phonetic": "/ʒə nə sɥi pa zɑ̃ dʁap də sa/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Je ne suis pas au courant de cela.",
    "frenchTranslation": "Je ne suis pas au courant de cela",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Je ne suis pas en drap de cette affaire.",
        "french": "Sens : « Je ne suis pas au courant de cela » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "je-ne-suis-pas-ton-mogo",
    "term": "Je ne suis pas ton môgô",
    "phonetic": "/ʒə nə sɥi pa tɔ̃ mo.go/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Je ne suis pas ton pote.",
    "frenchTranslation": "Je ne suis pas ton pote",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Je ne suis pas ton môgô, ne me parle pas comme ça.",
        "french": "Sens : « Je ne suis pas ton pote » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "jeton",
    "term": "Jeton",
    "phonetic": "/ʒə.tɔ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Argent, avoir du jeton.",
    "frenchTranslation": "Argent, avoir du jeton",
    "literalMeaning": "Origine : Référence aux jetons de valeur",
    "originLanguage": "Référence aux jetons de valeur",
    "examples": [
      {
        "nouchi": "Il a du jeton, ne t'inquiète pas.",
        "french": "Sens : « Argent, avoir du jeton » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "jus",
    "term": "Jus",
    "phonetic": "/ʒys/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Boisson gazeuse ou jus local.",
    "frenchTranslation": "Boisson gazeuse ou jus local",
    "literalMeaning": "Origine : Français",
    "originLanguage": "Français",
    "examples": [
      {
        "nouchi": "Donne-moi un jus.",
        "french": "Sens : « Boisson gazeuse ou jus local » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "kaba",
    "term": "Kaba",
    "phonetic": "/ka.ba/",
    "grammaticalCategory": "Nom masculin",
    "definition": "La prison, la maison d'arrêt ou la garde à vue.",
    "frenchTranslation": "Prison, cellule, pénitencier.",
    "originLanguage": "Langues locales ivoiriennes",
    "examples": [
      {
        "nouchi": "Le voleur a été attrapé et jeté au kaba direct.",
        "french": "Le voleur a été appréhendé et conduit directement en prison."
      }
    ],
    "synonyms": [
      "Prison",
      "MACA (Maison d’arrêt)",
      "Gnouf"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Droit",
      "Lieux"
    ]
  },
  {
    "id": "kedjenou",
    "term": "Kedjenou",
    "phonetic": "/kɛ.dʒe.nu/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Plat en sauce mijoté (poulet ou poisson).",
    "frenchTranslation": "Plat en sauce mijoté (poulet ou poisson)",
    "literalMeaning": "Origine : Nom du plat",
    "originLanguage": "Nom du plat",
    "examples": [
      {
        "nouchi": "Le kedjenou est prêt.",
        "french": "Sens : « Plat en sauce mijoté (poulet ou poisson) » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "ken",
    "term": "Ken",
    "phonetic": "/kɛn/",
    "grammaticalCategory": "Nom masculin / Verbe",
    "definition": "Une affaire, un deal, un plan de commerce, une opportunité ou, en verlan/français, l'acte intime.",
    "frenchTranslation": "Affaire, bon plan, deal (ou faire l’amour).",
    "originLanguage": "Argot mixte urbain",
    "examples": [
      {
        "nouchi": "J'ai un bon ken pour importer des marchandises.",
        "french": "J'ai une excellente opportunité pour importer des marchandises."
      },
      {
        "nouchi": "J'ai un bon ken à te proposer.",
        "french": "J'ai une bonne opportunité d’affaires à te proposer."
      }
    ],
    "synonyms": [
      "Deal",
      "Affaire",
      "Bon coup"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Commerce",
      "Deal"
    ]
  },
  {
    "id": "kener",
    "term": "Kener",
    "phonetic": "/ke.ne/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Planifier, dealer, vendre.",
    "frenchTranslation": "Planifier, dealer, vendre",
    "literalMeaning": "Origine : Dérivé de Ken",
    "originLanguage": "Dérivé de Ken",
    "examples": [
      {
        "nouchi": "Il est en train de kener sa marchandise.",
        "french": "Il est en train de vendre et écouler sa marchandise."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "keneur",
    "term": "Keneur",
    "phonetic": "/ke.nœʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Dealeur, vendeur.",
    "frenchTranslation": "Dealeur, vendeur",
    "literalMeaning": "Origine : Dérivé de Kener",
    "originLanguage": "Dérivé de Kener",
    "examples": [
      {
        "nouchi": "C'est le meilleur keneur du quartier.",
        "french": "Sens : « Dealeur, vendeur » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "konement",
    "term": "Kônement",
    "phonetic": "/ko.nə.mɑ̃/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de parler, bavardage.",
    "frenchTranslation": "Action de parler, bavardage",
    "literalMeaning": "Origine : Dérivé de Kô",
    "originLanguage": "Dérivé de Kô",
    "examples": [
      {
        "nouchi": "Son kônement est fatiguant.",
        "french": "Sens : « Action de parler, bavardage » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "konerie",
    "term": "Kônerie",
    "phonetic": "/ko.ne.ʁi/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de parler, bavardage.",
    "frenchTranslation": "Action de parler, bavardage",
    "literalMeaning": "Origine : Dérivé de Kô",
    "originLanguage": "Dérivé de Kô",
    "examples": [
      {
        "nouchi": "C'est de la kônerie.",
        "french": "Sens : « Action de parler, bavardage » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "koneur",
    "term": "Kôneur",
    "phonetic": "/ko.nœʁ/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Celui qui parle, bavard.",
    "frenchTranslation": "Celui qui parle, bavard",
    "literalMeaning": "Origine : Dérivé de Kô",
    "originLanguage": "Dérivé de Kô",
    "examples": [
      {
        "nouchi": "C'est un kôneur.",
        "french": "Sens : « Celui qui parle, bavard » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "koneuse",
    "term": "Kôneuse",
    "phonetic": "/ko.nøz/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Celle qui parle, bavarde.",
    "frenchTranslation": "Celle qui parle, bavarde",
    "literalMeaning": "Origine : Dérivé de Kô",
    "originLanguage": "Dérivé de Kô",
    "examples": [
      {
        "nouchi": "C'est une kôneuse.",
        "french": "Sens : « Celle qui parle, bavarde » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "kourou-batard",
    "term": "Kourou bâtard",
    "phonetic": "/ku.ʁu ba.taʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne violente, ou coup de poing violent.",
    "frenchTranslation": "Personne violente, ou coup de poing violent",
    "literalMeaning": "Origine : Argot de combat",
    "originLanguage": "Argot de combat",
    "examples": [
      {
        "nouchi": "Il a reçu un kourou bâtard.",
        "french": "Sens : « Personne violente, ou coup de poing violent » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "kourou-batarder",
    "term": "Kourou bâtarder",
    "phonetic": "/ku.ʁu ba.taʁ.de/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Frapper violemment.",
    "frenchTranslation": "Frapper violemment",
    "literalMeaning": "Origine : Dérivé de Kourou bâtard",
    "originLanguage": "Dérivé de Kourou bâtard",
    "examples": [
      {
        "nouchi": "Il va le kourou bâtarder.",
        "french": "Sens : « Frapper violemment » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "koutoukou",
    "term": "Koutoukou",
    "phonetic": "/ku.tu.ku/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Alcool local fort.",
    "frenchTranslation": "Alcool local fort",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Il a bu du koutoukou.",
        "french": "Sens : « Alcool local fort » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "kpakpato",
    "term": "Kpakpato",
    "phonetic": "/kpak.pa.to/",
    "grammaticalCategory": "Nom masculin / féminin",
    "definition": "Personne excessivement curieuse, bavarde, qui passe son temps à surveiller autrui et rapporter des ragots.",
    "frenchTranslation": "Commère, fouineur, colporteur de ragots, rapporteur.",
    "originLanguage": "Baoulé / Akan (Kpakpato : rapporteur)",
    "examples": [
      {
        "nouchi": "Ferme ta fenêtre si tu ne veux pas que les kpakpatos du quartier te filment !",
        "french": "Ferme ta fenêtre si tu ne veux pas que les commères du quartier t'épient !"
      },
      {
        "nouchi": "C'est un vrai kpkpato, il sait tout.",
        "french": "Sens : « Rapporteur, colporteur d'affaires » en contexte familier."
      }
    ],
    "synonyms": [
      "Fouine",
      "Commère",
      "Kongossa",
      "Radio trottoir"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Caractère",
      "Quartier",
      "Incontournable"
    ]
  },
  {
    "id": "kpakpatoya",
    "term": "Kpakpatoya",
    "phonetic": "/kpak.pa.to.ja/",
    "grammaticalCategory": "Nom masculin",
    "definition": "L'art et la pratique des commérages de quartier et du colportage d'indiscrétions.",
    "frenchTranslation": "Commérages systématiques, colportage de potins.",
    "originLanguage": "Baoulé + suffixe abstrait -ya",
    "examples": [
      {
        "nouchi": "Le kpakpatoya détruit les amitiés, il vaut mieux s'en éloigner.",
        "french": "Les commérages détruisent les amitiés, il vaut mieux s'en tenir à l'écart."
      },
      {
        "nouchi": "Arrête le kpkpatoya !",
        "french": "Sens : « Commérage, colportage » en contexte familier."
      }
    ],
    "synonyms": [
      "Affairage",
      "Kongossa",
      "Ragots"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Société",
      "Parole"
    ]
  },
  {
    "id": "kpata-kpata",
    "term": "Kpata-kpata",
    "phonetic": "/kpa.ta kpa.ta/",
    "grammaticalCategory": "Adjectif / Interjection",
    "definition": "Extrêmement joli, resplendissant, parfait, impeccable ou très soigné.",
    "frenchTranslation": "Magnifique, impeccable, au top, resplendissant.",
    "originLanguage": "Baoulé / Bété",
    "examples": [
      {
        "nouchi": "La décoration de la salle de fête est kpata-kpata !",
        "french": "La décoration de la salle de réception est absolument magnifique !"
      }
    ],
    "synonyms": [
      "Acloidahi",
      "Zo",
      "Choco",
      "Parfait"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Beauté",
      "Style",
      "Incontournable"
    ]
  },
  {
    "id": "kpetou",
    "term": "Kpetou",
    "phonetic": "/kpe.tu/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Vulve, vagin.",
    "frenchTranslation": "Vulve, vagin",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "(Mot vulgaire, à utiliser avec précaution).",
        "french": "Sens : « Vulve, vagin » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "kpocle",
    "term": "Kpôclé",
    "phonetic": "/kpo.kle/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Fille de mauvaises mœurs.",
    "frenchTranslation": "Fille de mauvaises mœurs",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Ne fais pas la kpôclé.",
        "french": "Sens : « Fille de mauvaises mœurs » en contexte familier."
      }
    ],
    "synonyms": [
      "Go",
      "Mousso",
      "Fraichnie"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "krika",
    "term": "Krika",
    "phonetic": "/kʁi.ka/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Billet de 1 000 Francs CFA.",
    "frenchTranslation": "1 000 Francs CFA.",
    "originLanguage": "Argot abidjanais",
    "examples": [
      {
        "nouchi": "Passe-moi deux krikas pour payer le carburant.",
        "french": "Donne-moi deux mille francs CFA pour payer le carburant."
      }
    ],
    "synonyms": [
      "Barre",
      "1000 CFA"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Monnaie"
    ]
  },
  {
    "id": "la",
    "term": "Lā",
    "phonetic": "/la/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Donner.",
    "frenchTranslation": "Donner",
    "literalMeaning": "Origine : Dioula",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "Lā-moi la main.",
        "french": "Sens : « Donner » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "laisse-tomber",
    "term": "Laisse tomber",
    "phonetic": "/lɛs tɔ̃.be/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Oublie ça.",
    "frenchTranslation": "Oublie ça",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Laisse tomber cette histoire.",
        "french": "Sens : « Oublie ça » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "lale",
    "term": "Lalé",
    "phonetic": "/la.le/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Téléphone portable, smartphone.",
    "frenchTranslation": "Téléphone portable.",
    "originLanguage": "Dioula (Lala : tenir en main)",
    "examples": [
      {
        "nouchi": "N'oublie pas ton lalé sur la table avant de sortir.",
        "french": "N'oublie pas ton portable sur la table avant de quitter les lieux."
      }
    ],
    "synonyms": [
      "Bigo",
      "Cellulaire",
      "Appareil"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Tech",
      "Objets"
    ]
  },
  {
    "id": "laler",
    "term": "Laler",
    "phonetic": "/la.le/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Gifler violemment, asséner une claque sonore au visage.",
    "frenchTranslation": "Gifler, flanquer une claque.",
    "originLanguage": "Onomatopée nouchi",
    "examples": [
      {
        "nouchi": "Il l'a laler direct sans même discuter !",
        "french": "Il lui a asséné une gifle directe sans même parlementer !"
      },
      {
        "nouchi": "Il va te laler.",
        "french": "Sens : « Gifler, frapper, ou désigner un téléphone/endroit » en contexte familier."
      }
    ],
    "synonyms": [
      "Tolo",
      "Gifler",
      "Chicotter"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Conflit",
      "Action"
    ]
  },
  {
    "id": "lalle",
    "term": "Lallé",
    "phonetic": "/la.le/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Téléphone, ou endroit.",
    "frenchTranslation": "Téléphone, ou endroit",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Passe-moi ton lallé.",
        "french": "Sens : « Téléphone, ou endroit » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "laver-la-vaisselle",
    "term": "Laver la vaisselle",
    "phonetic": "/la.ve la vɛ.sɛl/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Faire la vaisselle.",
    "frenchTranslation": "Faire la vaisselle",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Je dois laver la vaisselle.",
        "french": "Sens : « Faire la vaisselle » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "laver-le-linge",
    "term": "Laver le linge",
    "phonetic": "/la.ve lə lɛ̃ʒ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Faire la lessive.",
    "frenchTranslation": "Faire la lessive",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Je dois laver le linge.",
        "french": "Sens : « Faire la lessive » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "logobby",
    "term": "Logobby",
    "phonetic": "/lo.ɡɔ.bi/",
    "grammaticalCategory": "Verbe transitif / Nom",
    "definition": "Baratiner habilement, manipuler par la parole, tromper ou escroquer avec subtilité.",
    "frenchTranslation": "Baratiner, embobiner, manipuler par la parole.",
    "originLanguage": "Langues locales & Argot",
    "examples": [
      {
        "nouchi": "Le vendeur a essayé de me logobby avec ses faux arguments.",
        "french": "Le commerçant a tenté de m'embobiner avec ses faux arguments."
      }
    ],
    "synonyms": [
      "Flôcô",
      "Embobiner",
      "Arnaquer",
      "Enfariner"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Parole",
      "Ruse",
      "Négociation"
    ]
  },
  {
    "id": "maga",
    "term": "Maga",
    "phonetic": "/ma.ɡa/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Dérober discrètement, voler à la tire, chaparder des objets de valeur.",
    "frenchTranslation": "Voler, dérober, chaparder à la tire.",
    "originLanguage": "Dioula / Hausa",
    "examples": [
      {
        "nouchi": "Un pickpocket a voulu maga son portefeuille dans le bus.",
        "french": "Un pickpocket a tenté de lui dérober son portefeuille dans le bus."
      },
      {
        "nouchi": "Il a subi un magatapé.",
        "french": "Sens : « Se battre, battre, dérober, surprise » en contexte familier."
      }
    ],
    "synonyms": [
      "Momoter",
      "Voler",
      "Piquer",
      "Chouraver"
    ],
    "category": "argent",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Rue",
      "Sécurité"
    ]
  },
  {
    "id": "magatape",
    "term": "Magatapé",
    "phonetic": "/ma.ɡa.ta.pe/",
    "grammaticalCategory": "Verbe transitif / Nom",
    "definition": "Se battre à mains nues, rouer de coups un adversaire ou mener un combat acharné.",
    "frenchTranslation": "Se battre à coups de poing, rosser.",
    "originLanguage": "Nouchi hybride",
    "examples": [
      {
        "nouchi": "Ils se sont magatapé jusqu'à l'arrivée des vigiles.",
        "french": "Ils se sont battus violemment jusqu'à l'arrivée des agents de sécurité."
      }
    ],
    "synonyms": [
      "Gnaga",
      "Se taper",
      "Se boxer"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Combat",
      "Rue"
    ]
  },
  {
    "id": "manger-le-gombo",
    "term": "Manger le gombo",
    "phonetic": "/mɑ̃.ʒe lə gɔ̃.bo/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Manger, ou être dans une situation collante.",
    "frenchTranslation": "Manger, ou être dans une situation collante",
    "literalMeaning": "Origine : Expression imagée",
    "originLanguage": "Expression imagée",
    "examples": [
      {
        "nouchi": "On a mangé le gombo.",
        "french": "Sens : « Manger, ou être dans une situation collante » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "maquis",
    "term": "Maquis",
    "phonetic": "/ma.ki/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Restaurant populaire ivoirien.",
    "frenchTranslation": "Restaurant populaire ivoirien",
    "literalMeaning": "Origine : Français adapté au contexte ivoirien",
    "originLanguage": "Français adapté au contexte ivoirien",
    "examples": [
      {
        "nouchi": "On se retrouve au maquis.",
        "french": "Sens : « Restaurant populaire ivoirien » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "marcher-le-gbagboter",
    "term": "Marcher le gbagboter",
    "phonetic": "/maʁ.ʃe lə gba.gbo.te/",
    "grammaticalCategory": "Verbe intransitif",
    "definition": "Marcher beaucoup.",
    "frenchTranslation": "Marcher beaucoup",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Il est en train de marcher le gbagboter.",
        "french": "Sens : « Marcher beaucoup » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "maudia",
    "term": "Maudia",
    "phonetic": "/maw.dja/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Maudit, malhonnête.",
    "frenchTranslation": "Maudit, malhonnête",
    "literalMeaning": "Origine : Français 'maudit' déformé",
    "originLanguage": "Français 'maudit' déformé",
    "examples": [
      {
        "nouchi": "C'est un maudia.",
        "french": "Sens : « Maudit, malhonnête » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "maudire",
    "term": "Maudire",
    "phonetic": "/mo.diʁ/",
    "grammaticalCategory": "Locution / État",
    "definition": "Être malhonnête, maudit (sens nouchi).",
    "frenchTranslation": "Être malhonnête, maudit (sens nouchi)",
    "literalMeaning": "Origine : Dérivé de Maudia",
    "originLanguage": "Dérivé de Maudia",
    "examples": [
      {
        "nouchi": "Il est en train de maudire.",
        "french": "Sens : « Être malhonnête, maudit (sens nouchi) » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "mogo",
    "term": "Môgô",
    "phonetic": "/mɔ.ɡɔ/",
    "grammaticalCategory": "Nom masculin / féminin",
    "definition": "Une personne, un individu, un être humain, ou affectueusement un ami, un compagnon fidèle ('Mon môgô sûr'). Mot pilier du Nouchi.",
    "frenchTranslation": "Une personne, un individu, un ami, un pote fidèle.",
    "originLanguage": "Dioula / Mandingue (Mɔgɔ : être humain/personne)",
    "etymologyDetails": "Le mot le plus fondamental de la culture urbaine ivoirienne.",
    "examples": [
      {
        "nouchi": "Celui-là, c'est mon môgô sûr de Yopougon !",
        "french": "Celui-là, c'est mon ami très proche et fiable de Yopougon !"
      },
      {
        "nouchi": "C'est mon môgô.",
        "french": "C'est mon pote de confiance."
      }
    ],
    "synonyms": [
      "Djo",
      "Personne",
      "Pote",
      "Frangin"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Fondamental",
      "Incontournable",
      "Amitié",
      "Société"
    ]
  },
  {
    "id": "mono",
    "term": "Mono",
    "phonetic": "/mo.no/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Policier, gendarme.",
    "frenchTranslation": "Policier, gendarme",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Le mono m'a arrêté.",
        "french": "Sens : « Policier, gendarme » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "mougou",
    "term": "Mougou",
    "phonetic": "/mu.ɡu/",
    "grammaticalCategory": "Verbe transitif / intransitif",
    "definition": "Faire l'amour, avoir une relation charnelle intime.",
    "frenchTranslation": "Faire l'amour, coucher ensemble.",
    "originLanguage": "Dioula (Mugu : écraser/poudre/piler)",
    "examples": [
      {
        "nouchi": "Le chanteur a fait un son humoristique sur le mougou.",
        "french": "L'artiste a composé un morceau plein d'humour sur les relations amoureuses."
      },
      {
        "nouchi": "Ils sont en train de mougou.",
        "french": "Sens : « Faire l'amour » en contexte familier."
      }
    ],
    "synonyms": [
      "Pinkou",
      "Gbêdê",
      "Filar du jus"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Amour",
      "Intimité"
    ]
  },
  {
    "id": "mousso",
    "term": "Mousso",
    "phonetic": "/mu.so/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Femme.",
    "frenchTranslation": "Femme",
    "literalMeaning": "Origine : Dioula",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "C'est une belle mousso.",
        "french": "C'est une très belle femme."
      }
    ],
    "synonyms": [
      "Go",
      "Fraichnie",
      "Délice"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "ne-prends-pas-ma-bouche-pour-manger-piment",
    "term": "Ne prends pas ma bouche pour manger piment",
    "phonetic": "/nə pʁɑ̃ pa ma buʃ puʁ mɑ̃.ʒe pi.mɑ̃/",
    "grammaticalCategory": "Proverbe / Expression",
    "definition": "Formule d'avertissement pour dire : 'Ne te sers pas de mes propos pour attaquer autrui ou créer des conflits à mon insu'.",
    "frenchTranslation": "Ne me mêle pas à tes critiques ou règlements de comptes.",
    "literalMeaning": "Ne mange pas du piment brûlant avec ma propre bouche.",
    "originLanguage": "Français ivoirien imagé",
    "examples": [
      {
        "nouchi": "Si tu veux insulter le patron, fais-le toi-même, mais ne prends pas ma bouche pour manger ton piment !",
        "french": "Si tu veux t'en prendre au patron fais-le seul, ne m'utilise pas pour cautionner tes attaques !"
      }
    ],
    "synonyms": [
      "Ne me mêle pas à ça",
      "Laisse mon nom tranquille"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Classique",
    "tags": [
      "Sagesse",
      "Prudence",
      "Proverbe"
    ]
  },
  {
    "id": "nouchi",
    "term": "Nouchi",
    "phonetic": "/nu.ʃi/",
    "grammaticalCategory": "Nom masculin / Adjectif",
    "definition": "Argot urbain hybride ivoirien né à Abidjan à la fin des années 70, devenu langue nationale véhiculaire et emblème culturel mondial. Littéralement 'poil de nez' ou moustache virile.",
    "frenchTranslation": "Argot populaire ivoirien / voyou repenti / citadin branché d'Abidjan.",
    "originLanguage": "Dioula (Nou : nez + Chi : poil/moustache)",
    "etymologyDetails": "Formé par la jeunesse des cinémas Roxy et El Mansour d'Adjamé dans les années 70 arborant une fine moustache.",
    "examples": [
      {
        "nouchi": "Le Nouchi est la véritable âme vivante des rues d'Abidjan.",
        "french": "Le Nouchi constitue la véritable identité vivante des rues d'Abidjan."
      },
      {
        "nouchi": "Il parle le nouchi.",
        "french": "Sens : « Argot ivoirien, voyou à l'origine » en contexte familier."
      }
    ],
    "synonyms": [
      "Argot ivoirien",
      "Langue de Babi"
    ],
    "category": "musique_culture",
    "difficultyLevel": "debutant",
    "officialStatus": "Larousse",
    "officialYear": "2019",
    "tags": [
      "Histoire",
      "Origine",
      "Identité",
      "Incontournable"
    ]
  },
  {
    "id": "nouchinement",
    "term": "Nouchinement",
    "phonetic": "/nu.ʃi.nə.mɑ̃/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de parler nouchi.",
    "frenchTranslation": "Action de parler nouchi",
    "literalMeaning": "Origine : Dérivé de Nouchi",
    "originLanguage": "Dérivé de Nouchi",
    "examples": [
      {
        "nouchi": "Son nouchinement est parfait.",
        "french": "Sens : « Action de parler nouchi » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "nouchiner",
    "term": "Nouchiner",
    "phonetic": "/nu.ʃi.ne/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Parler nouchi.",
    "frenchTranslation": "Parler nouchi",
    "literalMeaning": "Origine : Dérivé de Nouchi",
    "originLanguage": "Dérivé de Nouchi",
    "examples": [
      {
        "nouchi": "Il est en train de nouchiner.",
        "french": "Sens : « Parler nouchi » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "nouchinerie",
    "term": "Nouchinerie",
    "phonetic": "/nu.ʃi.ne.ʁi/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de parler nouchi.",
    "frenchTranslation": "Action de parler nouchi",
    "literalMeaning": "Origine : Dérivé de Nouchi",
    "originLanguage": "Dérivé de Nouchi",
    "examples": [
      {
        "nouchi": "C'est de la nouchinerie.",
        "french": "Sens : « Action de parler nouchi » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "nouchineur",
    "term": "Nouchineur",
    "phonetic": "/nu.ʃi.nœʁ/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Celui qui parle nouchi.",
    "frenchTranslation": "Celui qui parle nouchi",
    "literalMeaning": "Origine : Dérivé de Nouchi",
    "originLanguage": "Dérivé de Nouchi",
    "examples": [
      {
        "nouchi": "C'est un nouchineur.",
        "french": "Sens : « Celui qui parle nouchi » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "nouchineuse",
    "term": "Nouchineuse",
    "phonetic": "/nu.ʃi.nøz/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Celle qui parle nouchi.",
    "frenchTranslation": "Celle qui parle nouchi",
    "literalMeaning": "Origine : Dérivé de Nouchi",
    "originLanguage": "Dérivé de Nouchi",
    "examples": [
      {
        "nouchi": "C'est une nouchineuse.",
        "french": "Sens : « Celle qui parle nouchi » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "nouchistique",
    "term": "Nouchistique",
    "phonetic": "/nu.ʃis.tik/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Relatif au nouchi.",
    "frenchTranslation": "Relatif au nouchi",
    "literalMeaning": "Origine : Dérivé de Nouchi",
    "originLanguage": "Dérivé de Nouchi",
    "examples": [
      {
        "nouchi": "C'est une expression nouchistique.",
        "french": "Sens : « Relatif au nouchi » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "noutsi",
    "term": "Noutsi",
    "phonetic": "/nut.si/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Bandit.",
    "frenchTranslation": "Bandit",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "C'est un noutsi.",
        "french": "Sens : « Bandit » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "on-est-en-drap",
    "term": "On est en drap",
    "phonetic": "/ɔ̃.n‿ɛ t‿ɑ̃ dʁap/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "On a des problèmes.",
    "frenchTranslation": "On a des problèmes",
    "literalMeaning": "Origine : Dérivé de Y'a drap",
    "originLanguage": "Dérivé de Y'a drap",
    "examples": [
      {
        "nouchi": "Nous, on est en drap.",
        "french": "Sens : « On a des problèmes » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "on-est-en-train-de-brobro",
    "term": "On est en train de brobro",
    "phonetic": "/ɔ̃.n‿ɛ tʁɛ̃ də bʁo.bʁo/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "On est en train de chercher/travailler.",
    "frenchTranslation": "On est en train de chercher/travailler",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "On est en train de brobro, ne nous dérange pas.",
        "french": "Sens : « On est en train de chercher/travailler » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "on-est-en-train-de-faire",
    "term": "On est en train de faire",
    "phonetic": "/ɔ̃.n‿ɛ tʁɛ̃ də fɛʁ/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "On est en action.",
    "frenchTranslation": "On est en action",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "On est en train de faire, patience.",
        "french": "Sens : « On est en action » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "on-est-ensemble",
    "term": "On est ensemble",
    "phonetic": "/ɔ̃.n‿ɛ.t‿ɑ̃.sɑ̃bl/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "On est solidaires.",
    "frenchTranslation": "On est solidaires",
    "literalMeaning": "Origine : Expression de solidarité ivoirienne",
    "originLanguage": "Expression de solidarité ivoirienne",
    "examples": [
      {
        "nouchi": "Ne t'inquiète pas, on est ensemble.",
        "french": "Sens : « On est solidaires » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "on-est-la",
    "term": "On est là",
    "phonetic": "/ɔ̃.n‿ɛ la/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "On est présent, on gère.",
    "frenchTranslation": "On est présent, on gère",
    "literalMeaning": "Origine : Expression de disponibilité",
    "originLanguage": "Expression de disponibilité",
    "examples": [
      {
        "nouchi": "Ne t'inquiète pas, on est là.",
        "french": "Sens : « On est présent, on gère » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "on-ne-ment-pas",
    "term": "On ne ment pas",
    "phonetic": "/ɔ̃ nə mɑ̃ pa/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "On dit la vérité.",
    "frenchTranslation": "On dit la vérité",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "On ne ment pas, c'est comme ça.",
        "french": "Sens : « On dit la vérité » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "ouvrir-la-fenetre",
    "term": "Ouvrir la fenêtre",
    "phonetic": "/u.vʁiʁ la fə.nɛtʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Ouvrir.",
    "frenchTranslation": "Ouvrir",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Ouvre la fenêtre.",
        "french": "Sens : « Ouvrir » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "painhou",
    "term": "Painhou",
    "phonetic": "/pɛ̃.hu/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Prostituée.",
    "frenchTranslation": "Prostituée",
    "literalMeaning": "Origine : Argot de rue",
    "originLanguage": "Argot de rue",
    "examples": [
      {
        "nouchi": "C'est une painhou.",
        "french": "Sens : « Prostituée » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "panneau",
    "term": "Panneau",
    "phonetic": "/pa.no/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Grand bus de la compagnie publique de transport urbain SOTRA à Abidjan.",
    "frenchTranslation": "Autobus de ville, grand bus public.",
    "originLanguage": "Français argotique ivoirien",
    "examples": [
      {
        "nouchi": "Attends le panneau au terminus pour aller au Plateau.",
        "french": "Attends le bus public au terminus pour rejoindre le quartier des affaires."
      }
    ],
    "synonyms": [
      "SOTRA",
      "Bus urbain",
      "Balladur"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Transport",
      "Abidjan"
    ]
  },
  {
    "id": "panneau-man",
    "term": "Panneau man",
    "phonetic": "/pa.no man/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Voleur à la tire spécialisé dans les vols de portefeuilles ou téléphones dans les autobus bondés.",
    "frenchTranslation": "Pickpocket de transport en commun.",
    "originLanguage": "Nouchi hybride (Panneau + Man)",
    "examples": [
      {
        "nouchi": "Garde ton sac contre toi, il y a des panneau men dans le bus.",
        "french": "Serre ton sac contre toi, il y a des pickpockets dans le bus."
      }
    ],
    "synonyms": [
      "Deux-doigts",
      "Pickpocket",
      "Maga-man"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Sécurité",
      "Transport"
    ]
  },
  {
    "id": "pantougouler",
    "term": "Pantougouler",
    "phonetic": "/pɑ̃.tu.gu.le/",
    "grammaticalCategory": "Verbe intransitif",
    "definition": "Fuir, s'échapper rapidement.",
    "frenchTranslation": "Fuir, s'échapper rapidement",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Il a pantougoulé quand la police est arrivée.",
        "french": "Sens : « Fuir, s'échapper rapidement » en contexte familier."
      }
    ],
    "synonyms": [
      "Fraya",
      "Prendre la tangente"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "perdre-reseau",
    "term": "Perdre réseau",
    "phonetic": "/pɛʁdʁ ʁe.zo/",
    "grammaticalCategory": "Locution verbale",
    "definition": "Être complètement fauché financièrement ou, selon le contexte, être totalement ivre et perdre la mémoire.",
    "frenchTranslation": "Être sans le sou / être ivre mort.",
    "literalMeaning": "Perdre le signal de connexion.",
    "originLanguage": "Métaphore technologique nouchi",
    "examples": [
      {
        "nouchi": "En fin de mois, le djo a perdu réseau, il mange seulement du gari.",
        "french": "En fin de mois, il est complètement à sec, il se nourrit uniquement de farine de manioc."
      }
    ],
    "synonyms": [
      "Tiasse",
      "Moisi",
      "À sec",
      "Être daï"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Argent",
      "État",
      "Expression"
    ]
  },
  {
    "id": "petit-pompier",
    "term": "Petit pompier",
    "phonetic": "/pə.ti pɔ̃.pje/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Gigolo.",
    "frenchTranslation": "Gigolo",
    "literalMeaning": "Origine : Métaphore ivoirienne",
    "originLanguage": "Métaphore ivoirienne",
    "examples": [
      {
        "nouchi": "C'est son petit pompier.",
        "french": "Sens : « Gigolo » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "pierre",
    "term": "Pierre",
    "phonetic": "/pjɛʁ/",
    "grammaticalCategory": "Nom féminin",
    "definition": "L'argent, les ressources financières solides.",
    "frenchTranslation": "L’argent, les fonds, la richesse.",
    "originLanguage": "Français argotique ivoirien",
    "examples": [
      {
        "nouchi": "Quand tu as la pierre à Babi, toutes les portes s'ouvrent.",
        "french": "Quand tu as de l'argent à Abidjan, toutes les opportunités s'offrent à toi."
      },
      {
        "nouchi": "Il a la pierre en ce moment.",
        "french": "Sens : « Argent (avoir de l'argent = avoir pierre) » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Zoto",
      "Jetons"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Économie"
    ]
  },
  {
    "id": "pinkou",
    "term": "Pinkou",
    "phonetic": "/pɛ̃.ku/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Faire l'amour.",
    "frenchTranslation": "Faire l'amour",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Il veut pinkou.",
        "french": "Sens : « Faire l'amour » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "placali",
    "term": "Placali",
    "phonetic": "/pla.ka.li/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Plat ivoirien, ou situation collante.",
    "frenchTranslation": "Plat ivoirien, ou situation collante",
    "literalMeaning": "Origine : Nom de plat traditionnel",
    "originLanguage": "Nom de plat traditionnel",
    "examples": [
      {
        "nouchi": "On est dans le placali.",
        "french": "Sens : « Plat ivoirien, ou situation collante » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "plomb",
    "term": "Plomb",
    "phonetic": "/plɔ̃/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Pièce de 100 Francs CFA.",
    "frenchTranslation": "100 Francs CFA.",
    "originLanguage": "Français / Argot",
    "examples": [
      {
        "nouchi": "Donne-moi deux plombs pour payer l'eau glacée.",
        "french": "Donne-moi deux cents francs CFA pour acheter de l'eau fraîche."
      },
      {
        "nouchi": "Donne-moi un plomb pour le crédit.",
        "french": "Donne-moi 100 francs CFA pour le crédit."
      }
    ],
    "synonyms": [
      "Togo",
      "100 CFA"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Monnaie"
    ]
  },
  {
    "id": "poto",
    "term": "Pôtô",
    "phonetic": "/po.to/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Manger, bouffer.",
    "frenchTranslation": "Manger, bouffer",
    "literalMeaning": "Origine : Argot ivoirien ancien",
    "originLanguage": "Argot ivoirien ancien",
    "examples": [
      {
        "nouchi": "On va pôtô.",
        "french": "on va aller manger."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "power",
    "term": "Power",
    "phonetic": "/pa.wœʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Bière stout noire de marque Guinness, réputée pour sa force.",
    "frenchTranslation": "Bière Guinness (ou bière brune forte).",
    "originLanguage": "Anglais (Power : puissance)",
    "examples": [
      {
        "nouchi": "Le vieux père prend toujours son power après le travail.",
        "french": "L'aîné prend toujours sa Guinness après sa journée de travail."
      }
    ],
    "synonyms": [
      "Guinness",
      "Poki",
      "Bière noire"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Maquis",
      "Boisson"
    ]
  },
  {
    "id": "prends-mon-gbo",
    "term": "Prends mon GBõ",
    "phonetic": "/pʁɑ̃ mɔ̃ ɡbɔ̃/",
    "grammaticalCategory": "Formule de salutation",
    "definition": "Salutation fraternelle et chaleureuse, souvent accompagnée d'un 'check' poing contre poing entre amis.",
    "frenchTranslation": "Touche là mon frère, reçois ma salutation fraternelle.",
    "literalMeaning": "Prends mon coup de poing d’amitié.",
    "originLanguage": "Dioula + Français",
    "examples": [
      {
        "nouchi": "Prends mon GBõ mon frère, ça fait longtemps qu'on ne s'est pas vus !",
        "french": "Touche là mon frère, ça fait un bail qu'on ne s'est pas croisés !"
      }
    ],
    "synonyms": [
      "Prends mon Sidjô",
      "Check",
      "Salutations"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Salutation",
      "Respect",
      "Amitié"
    ]
  },
  {
    "id": "produit",
    "term": "Produit",
    "phonetic": "/pʁo.dɥi/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Cosmétique de dépigmentation.",
    "frenchTranslation": "Cosmétique de dépigmentation",
    "literalMeaning": "Origine : Français détourné",
    "originLanguage": "Français détourné",
    "examples": [
      {
        "nouchi": "Elle a fait produit.",
        "french": "Sens : « Cosmétique de dépigmentation » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "propro",
    "term": "Propro",
    "phonetic": "/pʁo.pʁo/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Poursuivre, ou produit éclaircissant.",
    "frenchTranslation": "Poursuivre, ou produit éclaircissant",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Il est en train de propro son ennemi.",
        "french": "Sens : « Poursuivre, ou produit éclaircissant » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "quitte-la-1",
    "term": "Quitte-là",
    "phonetic": "/kit.la/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Dégage, pars.",
    "frenchTranslation": "Dégage, pars",
    "literalMeaning": "Origine : Français populaire ivoirien",
    "originLanguage": "Français populaire ivoirien",
    "examples": [
      {
        "nouchi": "Quitte-là !",
        "french": "Sens : « Dégage, pars » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "quitte-la",
    "term": "Quitte-là !",
    "phonetic": "/kit la/",
    "grammaticalCategory": "Interjection impérative",
    "definition": "Ordre ferme ou humoristique pour demander à quelqu'un de s'en aller, de cesser d'importuner ou de ne pas raconter d'histoires.",
    "frenchTranslation": "Dégage ! Va-t-en ! Arrête tes salades !",
    "originLanguage": "Français populaire ivoirien",
    "examples": [
      {
        "nouchi": "Quitte-là ! Tu crois que je vais croire à tes mensonges ?",
        "french": "Dégage ! Tu t'imagines que je vais gober tes mensonges ?"
      }
    ],
    "synonyms": [
      "Foue le camp",
      "Dégage",
      "Va là-bas"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Expression",
      "Impératif"
    ]
  },
  {
    "id": "ranger-la-chambre",
    "term": "Ranger la chambre",
    "phonetic": "/ʁɑ̃.ʒe la ʃɑ̃bʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Ranger.",
    "frenchTranslation": "Ranger",
    "literalMeaning": "Origine : Français courant",
    "originLanguage": "Français courant",
    "examples": [
      {
        "nouchi": "Il faut ranger la chambre.",
        "french": "Sens : « Ranger » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "reveiller-le-reveil",
    "term": "Réveiller le réveil",
    "phonetic": "/ʁe.ve.je lə ʁe.vɛj/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Se réveiller.",
    "frenchTranslation": "Se réveiller",
    "literalMeaning": "Origine : Redoublement expressif",
    "originLanguage": "Redoublement expressif",
    "examples": [
      {
        "nouchi": "Il est en train de réveiller le réveil.",
        "french": "Sens : « Se réveiller » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "rougeot",
    "term": "Rougeot",
    "phonetic": "/ʁu.ʒo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Billet de 10 000 Francs CFA (en référence à sa couleur violacée/rougeâtre dominante).",
    "frenchTranslation": "Billet de 10 000 Francs CFA.",
    "originLanguage": "Français argotique imagé",
    "examples": [
      {
        "nouchi": "Le client a réglé sa course avec un beau rougeot.",
        "french": "Le client a payé son trajet avec un billet de 10 000 francs CFA."
      }
    ],
    "synonyms": [
      "10 Krikas",
      "Dix mille",
      "Grand billet"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Monnaie"
    ]
  },
  {
    "id": "senjailler",
    "term": "S'enjailler",
    "phonetic": "/sɑ̃.ʒa.je/",
    "grammaticalCategory": "Verbe pronominal",
    "definition": "Se faire plaisir, s'amuser, profiter de la vie, être de bonne humeur ou éprouver un vif sentiment d'attachement ('Tu m'enjailles' = tu me plais). Mot officiel entré au dictionnaire Larousse.",
    "frenchTranslation": "S'amuser, faire la fête, prendre du bon temps, kiffer.",
    "originLanguage": "Anglais (To enjoy) francisé et nouchisé",
    "etymologyDetails": "Consacré officiellement par le dictionnaire Larousse en 2019.",
    "examples": [
      {
        "nouchi": "Ce soir on va s'enjailler dans le maquis le plus chaud d'Abidjan !",
        "french": "Ce soir on va s'amuser et faire la fête dans le restaurant le plus animé d'Abidjan !"
      },
      {
        "nouchi": "Ton style et ton sourire m'enjaillent beaucoup.",
        "french": "Ton allure et ton sourire me plaisent énormément."
      }
    ],
    "synonyms": [
      "Kiffer",
      "Faire la fête",
      "Se réjouir",
      "Boucanter"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Larousse",
    "officialYear": "2019",
    "tags": [
      "Incontournable",
      "Larousse",
      "Fête",
      "Amour"
    ]
  },
  {
    "id": "se-chercher",
    "term": "Se chercher",
    "phonetic": "/sə ʃɛʁ.ʃe/",
    "grammaticalCategory": "Locution verbale",
    "definition": "Travailler dur, chercher par tous les moyens licites à s'en sortir dans la vie, lutter pour sa subsistance et bâtir son avenir.",
    "frenchTranslation": "Se débrouiller, lutter pour réussir, bâtir sa vie.",
    "originLanguage": "Français populaire d’Afrique de l’Ouest",
    "examples": [
      {
        "nouchi": "Le jeune homme s'est levé tôt pour aller se chercher au marché.",
        "french": "Le jeune homme s'est levé aux aurores pour aller gagner son pain au marché."
      }
    ],
    "synonyms": [
      "Grouiller",
      "Faire djossi",
      "Se battre"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Courage",
      "Travail",
      "Vie"
    ]
  },
  {
    "id": "se-koroto",
    "term": "Se koroto",
    "phonetic": "/sə kɔ.ʁɔ.to/",
    "grammaticalCategory": "Verbe pronominal",
    "definition": "Aller se coucher, dormir, se reposer après une longue journée.",
    "frenchTranslation": "Aller dormir, se coucher, pioncer.",
    "originLanguage": "Langues mandées / Nouchi",
    "examples": [
      {
        "nouchi": "Il est minuit passé, je vais aller me koroto direct.",
        "french": "Il est plus de minuit, je vais aller me coucher immédiatement."
      }
    ],
    "synonyms": [
      "Dormir",
      "Pioncer",
      "Faire dodo"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Repos",
      "Nuit"
    ]
  },
  {
    "id": "sekpel",
    "term": "Sêkpêl",
    "phonetic": "/sek.pel/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Poids plume, maigrichon.",
    "frenchTranslation": "Poids plume, maigrichon",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "C'est un sêkpêl.",
        "french": "Sens : « Poids plume, maigrichon » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "siffler",
    "term": "Siffler",
    "phonetic": "/si.fle/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Boire goulûment un verre ou une bouteille d’alcool.",
    "frenchTranslation": "Boire rapidement, ingurgiter un verre.",
    "originLanguage": "Français argotique",
    "examples": [
      {
        "nouchi": "Il a sifflé sa bière en deux gorgées !",
        "french": "Il a bu sa bière en deux gorgées !"
      }
    ],
    "synonyms": [
      "Badrô",
      "Boire",
      "Enfiler"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Boisson",
      "Sortie"
    ]
  },
  {
    "id": "skinny",
    "term": "Skinny",
    "phonetic": "/ski.ni/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Belle jeune femme mince.",
    "frenchTranslation": "Belle jeune femme mince",
    "literalMeaning": "Origine : Anglais adapté",
    "originLanguage": "Anglais adapté",
    "examples": [
      {
        "nouchi": "Elle est skinny et stylée.",
        "french": "Sens : « Belle jeune femme mince » en contexte familier."
      }
    ],
    "synonyms": [
      "Go",
      "Mousso",
      "Fraichnie"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "soaye",
    "term": "Soayé",
    "phonetic": "/so.a.je/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Méchant, mauvais.",
    "frenchTranslation": "Méchant, mauvais",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "Il est soayé.",
        "french": "Sens : « Méchant, mauvais » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "soayeser",
    "term": "Soayéser",
    "phonetic": "/so.a.je.ze/",
    "grammaticalCategory": "Locution / État",
    "definition": "Être méchant, mauvais.",
    "frenchTranslation": "Être méchant, mauvais",
    "literalMeaning": "Origine : Dérivé de Soayé",
    "originLanguage": "Dérivé de Soayé",
    "examples": [
      {
        "nouchi": "Il soayése trop.",
        "french": "Sens : « Être méchant, mauvais » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "soutra",
    "term": "Soutra",
    "phonetic": "/su.tʁa/",
    "grammaticalCategory": "Verbe transitif / Nom",
    "definition": "Secourir financièrement ou moralement quelqu'un dans le besoin, aider fraternellement, sauver d'un mauvais pas.",
    "frenchTranslation": "Aider, dépanner financièrement, secourir, protéger.",
    "originLanguage": "Dioula (Sutura : protéger, couvrir, secourir)",
    "etymologyDetails": "Concept moral fondamental de l'entraide sociale ivoirienne.",
    "examples": [
      {
        "nouchi": "Le grand frère m'a soutra avec 5 000 francs pour mes ordonnances.",
        "french": "Mon aîné m'a dépanné de 5 000 francs pour mes médicaments."
      },
      {
        "nouchi": "Mon frère m'a soutré avec 10 000 F.",
        "french": "Mon frère m'a dépanné financièrement avec 10 000 F."
      }
    ],
    "synonyms": [
      "Dépanner",
      "Aider",
      "Secourir",
      "Sauver"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Entraide",
      "Solidarité",
      "Valeur",
      "Incontournable"
    ]
  },
  {
    "id": "soutrer",
    "term": "Soutrer",
    "phonetic": "/su.tʁe/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Aider, dépanner.",
    "frenchTranslation": "Aider, dépanner",
    "literalMeaning": "Origine : Dérivé de Soutra",
    "originLanguage": "Dérivé de Soutra",
    "examples": [
      {
        "nouchi": "Peux-tu me soutrer ?",
        "french": "Sens : « Aider, dépanner » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "sri",
    "term": "Sri",
    "phonetic": "/sʁi/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Attraper.",
    "frenchTranslation": "Attraper",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "J'ai sri le voleur.",
        "french": "Sens : « Attraper » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "tassaba",
    "term": "Tassaba",
    "phonetic": "/ta.sa.ba/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Fessier très imposant et rebondi.",
    "frenchTranslation": "Grosses fesses généreuses.",
    "originLanguage": "Dioula / Langues akan",
    "examples": [
      {
        "nouchi": "Les robes moulantes mettent en valeur le tassaba des gos ivoiriennes.",
        "french": "Les robes cintrées soulignent les rondeurs des femmes ivoiriennes."
      },
      {
        "nouchi": "C'est une tassaba.",
        "french": "Sens : « Grosses fesses » en contexte familier."
      }
    ],
    "synonyms": [
      "BobaraBa",
      "Bôtchô",
      "Matos"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Corps",
      "Femme"
    ]
  },
  {
    "id": "tcheke",
    "term": "Tcheké",
    "phonetic": "/tʃe.ke/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Poulet.",
    "frenchTranslation": "Poulet",
    "literalMeaning": "Origine : Langue locale",
    "originLanguage": "Langue locale",
    "examples": [
      {
        "nouchi": "On va manger le tcheké.",
        "french": "Sens : « Poulet » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "tchiza",
    "term": "Tchiza",
    "phonetic": "/tʃi.za/",
    "grammaticalCategory": "Nom féminin",
    "definition": "Maîtresse ou amante d'un homme marié dans le jargon urbain moderne d'Abidjan.",
    "frenchTranslation": "Maîtresse, deuxième bureau, amante d'un homme en couple.",
    "originLanguage": "Création urbaine moderne ivoirienne",
    "examples": [
      {
        "nouchi": "La tchiza a créé un scandale lors de la soirée.",
        "french": "La maîtresse a provoqué une scène lors de la réception."
      },
      {
        "nouchi": "C'est sa tchiza.",
        "french": "Sens : « Amante d'un homme marié » en contexte familier."
      }
    ],
    "synonyms": [
      "Deuxième bureau",
      "Maîtresse",
      "Amante"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Tendance",
    "tags": [
      "Relations",
      "Société"
    ]
  },
  {
    "id": "tchizo",
    "term": "Tchizo",
    "phonetic": "/tʃi.zo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Homme marié ou en couple officiel qui entretient des relations extra-conjugales.",
    "frenchTranslation": "Homme marié infidèle entretenant une maîtresse.",
    "originLanguage": "Nouchi (pendant masculin de Tchiza)",
    "examples": [
      {
        "nouchi": "Ce monsieur est un vrai tchizo, il collectionne les amantes.",
        "french": "Cet homme est très volage, il accumule les conquêtes."
      },
      {
        "nouchi": "C'est un tchizo.",
        "french": "Sens : « Homme marié qui a une amante » en contexte familier."
      }
    ],
    "synonyms": [
      "Homme infidèle",
      "Séducteur"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Tendance",
    "tags": [
      "Relations",
      "Société"
    ]
  },
  {
    "id": "tiasse",
    "term": "Tiasse",
    "phonetic": "/tjas/",
    "grammaticalCategory": "Adjectif / État",
    "definition": "Totalement fauché, dépourvu du moindre sou, en grande difficulté matérielle temporaire.",
    "frenchTranslation": "Fauché, sans le sou, à sec, ruiné.",
    "originLanguage": "Argot Abidjan",
    "examples": [
      {
        "nouchi": "Aujourd'hui je suis tiasse, je ne peux pas sortir ce soir.",
        "french": "Aujourd'hui je suis complètement fauché, je ne peux pas sortir ce soir."
      }
    ],
    "synonyms": [
      "Perdre réseau",
      "Moisi",
      "Fauché",
      "Sans un rond"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Précarité"
    ]
  },
  {
    "id": "togo",
    "term": "Togo",
    "phonetic": "/to.ɡo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Pièce de 100 Francs CFA (ou 100 000 Francs CFA selon les montants en affaires).",
    "frenchTranslation": "100 Francs CFA (ou 100 000 CFA).",
    "originLanguage": "Dioula (Tògò : nom / valeur)",
    "examples": [
      {
        "nouchi": "Donne-moi un togo pour payer la banane braisée.",
        "french": "Donne-moi cent francs CFA pour payer la banane au barbecue."
      },
      {
        "nouchi": "Il a sorti un gros togo pour payer.",
        "french": "Il a sorti un gros billet pour payer."
      }
    ],
    "synonyms": [
      "Plomb",
      "100 CFA"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Argent",
      "Monnaie"
    ]
  },
  {
    "id": "tolo",
    "term": "Tolo",
    "phonetic": "/to.lo/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Gifler.",
    "frenchTranslation": "Gifler",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Il a reçu un tolo.",
        "french": "Sens : « Gifler » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "tomi",
    "term": "Tomi",
    "phonetic": "/to.mi/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Lait caillé.",
    "frenchTranslation": "Lait caillé",
    "literalMeaning": "Origine : Nom traditionnel",
    "originLanguage": "Nom traditionnel",
    "examples": [
      {
        "nouchi": "Je veux du tomi.",
        "french": "Sens : « Lait caillé » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "tu-es-dans-mes-kpakites",
    "term": "Tu es dans mes Kpakites",
    "phonetic": "/ty ɛ dɑ̃ me kpa.kit/",
    "grammaticalCategory": "Déclaration affective",
    "definition": "Déclaration d'amour ou d'amitié passionnée signifiant qu'une personne est ancrée au plus profond de ses pensées et de ses mâchoires/tripes.",
    "frenchTranslation": "Je t'aime à la folie, tu es ancré(e) au plus profond de moi.",
    "originLanguage": "Nouchi métaphorique (Kpakites : mâchoires/dents)",
    "examples": [
      {
        "nouchi": "Chérie, sache que tu es dans mes kpakites pour toujours !",
        "french": "Mon amour, sache que tu es gravée au plus profond de mon cœur pour toujours !"
      }
    ],
    "synonyms": [
      "Tu es dans mes gencives",
      "Je t’aime fort",
      "Tu es mon cœur"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Amour",
      "Poésie de rue",
      "Expression"
    ]
  },
  {
    "id": "tu-es-un-atalaku",
    "term": "Tu es un atalaku",
    "phonetic": "/ty ɛ zœ̃ a.ta.la.ku/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es un animateur.",
    "frenchTranslation": "Tu es un animateur",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un atalaku.",
        "french": "Sens : « Tu es un animateur » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-binguiste",
    "term": "Tu es un binguiste",
    "phonetic": "/ty ɛ zœ̃ bɛ̃.gɥist/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu viens d'Europe.",
    "frenchTranslation": "Tu viens d'Europe",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu parles comme un binguiste.",
        "french": "Sens : « Tu viens d'Europe » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-borlai",
    "term": "Tu es un borlaï",
    "phonetic": "/ty ɛ zœ̃ bɔʁ.laj/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es un ignorant.",
    "frenchTranslation": "Tu es un ignorant",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un borlaï.",
        "french": "Sens : « Tu es un ignorant » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-boucantier",
    "term": "Tu es un boucantier",
    "phonetic": "/ty ɛ zœ̃ bu.kɑ̃.tje/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Tu aimes faire la fête.",
    "frenchTranslation": "Tu aimes faire la fête",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un boucantier.",
        "french": "Sens : « Tu aimes faire la fête » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-brouteur",
    "term": "Tu es un brouteur",
    "phonetic": "/ty ɛ zœ̃ bʁu.tœʁ/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es un arnaqueur.",
    "frenchTranslation": "Tu es un arnaqueur",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un brouteur.",
        "french": "Sens : « Tu es un arnaqueur » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-faux-type",
    "term": "Tu es un faux-type",
    "phonetic": "/ty ɛ zœ̃ fo.tɪp/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es hypocrite.",
    "frenchTranslation": "Tu es hypocrite",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un faux-type.",
        "french": "Sens : « Tu es hypocrite » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-gaou",
    "term": "Tu es un gaou",
    "phonetic": "/ty ɛ zœ̃ ga.wu/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es un ignorant.",
    "frenchTranslation": "Tu es un ignorant",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un gaou, tu ne comprends rien.",
        "french": "Sens : « Tu es un ignorant » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-gnakoue",
    "term": "Tu es un gnakoué",
    "phonetic": "/ty ɛ zœ̃ ɲa.kwe/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es un couillon.",
    "frenchTranslation": "Tu es un couillon",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un gnakoué.",
        "french": "Sens : « Tu es un couillon » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-gnata",
    "term": "Tu es un gnata",
    "phonetic": "/ty ɛ zœ̃ ɲa.ta/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es très ignorant.",
    "frenchTranslation": "Tu es très ignorant",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un gnata.",
        "french": "Sens : « Tu es très ignorant » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-grouilleur",
    "term": "Tu es un grouilleur",
    "phonetic": "/ty ɛ zœ̃ gʁu.jœʁ/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es débrouillard.",
    "frenchTranslation": "Tu es débrouillard",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un grouilleur.",
        "french": "Sens : « Tu es débrouillard » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-vogo",
    "term": "Tu es un vogo",
    "phonetic": "/ty ɛ zœ̃ vo.go/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es un vagabond.",
    "frenchTranslation": "Tu es un vagabond",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un vogo.",
        "french": "Sens : « Tu es un vagabond » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-es-un-zango",
    "term": "Tu es un zango",
    "phonetic": "/ty ɛ zœ̃ zɑ̃.go/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu es bien sapé.",
    "frenchTranslation": "Tu es bien sapé",
    "literalMeaning": "Origine : Expression ivoirienne",
    "originLanguage": "Expression ivoirienne",
    "examples": [
      {
        "nouchi": "Tu es un zango aujourd'hui.",
        "french": "Sens : « Tu es bien sapé » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-m-enjailles",
    "term": "Tu m'enjailles",
    "phonetic": "/ty mɑ̃.ʒaj/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu me plais.",
    "frenchTranslation": "Tu me plais",
    "literalMeaning": "Origine : Dérivé de Enjailler",
    "originLanguage": "Dérivé de Enjailler",
    "examples": [
      {
        "nouchi": "Tu m'enjailles avec cette tenue.",
        "french": "Tu me fait énormément plaisirs avec cette tenue."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-me-cherches",
    "term": "Tu me cherches ?",
    "phonetic": "/ty mə ʃɛʁʃ/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu me provoques ?",
    "frenchTranslation": "Tu me provoques ?",
    "literalMeaning": "Origine : Expression de défi",
    "originLanguage": "Expression de défi",
    "examples": [
      {
        "nouchi": "Tu me cherches ou quoi ?",
        "french": "Sens : « Tu me provoques ? » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-me-moyen-pas",
    "term": "Tu me moyen pas",
    "phonetic": "/ty mə mwa.jɛ̃ pa/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu ne peux pas me battre ou me dépasser.",
    "frenchTranslation": "Tu ne peux pas me battre ou me dépasser",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Tu me moyen pas, je suis le chef.",
        "french": "Sens : « Tu ne peux pas me battre ou me dépasser » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-vas-prendre-drap",
    "term": "Tu vas prendre drap",
    "phonetic": "/ty va pʁɑ̃dʁ dʁap/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Tu vas avoir des problèmes.",
    "frenchTranslation": "Tu vas avoir des problèmes",
    "literalMeaning": "Origine : Dérivé de Y'a drap",
    "originLanguage": "Dérivé de Y'a drap",
    "examples": [
      {
        "nouchi": "Si tu continues, tu vas prendre drap.",
        "french": "Sens : « Tu vas avoir des problèmes » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "tu-verses-ma-figure-par-terre",
    "term": "Tu verses ma figure par terre",
    "phonetic": "/ty vɛʁs ma fi.ɡyʁ paʁ tɛʁ/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Formule d'indignation signifiant que quelqu'un vous couvre de honte, vous ridiculise ou nuit gravement à votre honneur en public.",
    "frenchTranslation": "Tu me couvres de honte, tu me ridiculises en public.",
    "literalMeaning": "Tu jettes mon visage dans la poussière.",
    "originLanguage": "Traduction littérale de formules akan et dioula",
    "examples": [
      {
        "nouchi": "Avec tes bêtises là, tu verses ma figure par terre devant les invités !",
        "french": "Avec tes maladresses, tu me couvres de honte devant tous les invités !"
      },
      {
        "nouchi": "Arrête, tu verses ma figure par terre.",
        "french": "Sens : « Tu me ridiculises » en contexte familier."
      }
    ],
    "synonyms": [
      "Foutre la honte",
      "Humilier",
      "Gâter le nom"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Honneur",
      "Société",
      "Image"
    ]
  },
  {
    "id": "verse",
    "term": "Versé",
    "phonetic": "/vɛʁ.se/",
    "grammaticalCategory": "Adjectif",
    "definition": "Être paisiblement installé, allongé au repos, détendu sans stress ni obligation immédiate.",
    "frenchTranslation": "Au repos, peinard, oisif, relaxé.",
    "originLanguage": "Français métaphorique ivoirien",
    "examples": [
      {
        "nouchi": "Le dimanche après-midi, le môgô est versé sous le manguier.",
        "french": "Le dimanche après-midi, le gars est paisiblement étendu à l'ombre du manguier."
      }
    ],
    "synonyms": [
      "Posé",
      "Détendu",
      "Au calme",
      "Tranquille"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Détente",
      "Vie",
      "Repos"
    ]
  },
  {
    "id": "vogo",
    "term": "Vogo",
    "phonetic": "/vo.ɡo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Vagabond, jeune sans domicile fixe ou personne qui erre dans la ville sans occupation précise.",
    "frenchTranslation": "Vagabond, rôdeur, errant.",
    "originLanguage": "Français (Vagabond) déformé en nouchi",
    "examples": [
      {
        "nouchi": "Ne traîne pas la nuit comme un vogo, rentre chez toi !",
        "french": "Ne traîne pas tard la nuit comme un vagabond, rentre à la maison !"
      },
      {
        "nouchi": "C'est un vogo.",
        "french": "Sens : « Vagabond » en contexte familier."
      }
    ],
    "synonyms": [
      "Vagabond",
      "Errant",
      "Sans-abri"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Société",
      "Rue"
    ]
  },
  {
    "id": "weh",
    "term": "Wéh",
    "phonetic": "/we/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Chose, truc, plan.",
    "frenchTranslation": "Chose, truc, plan",
    "literalMeaning": "Origine : Exclamation transformée en nom",
    "originLanguage": "Exclamation transformée en nom",
    "examples": [
      {
        "nouchi": "Quel est ce wéh-là ?",
        "french": "Sens : « Chose, truc, plan » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "weman",
    "term": "Wéman",
    "phonetic": "/we.man/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Dealeur, celui qui gère les wéh.",
    "frenchTranslation": "Dealeur, celui qui gère les wéh",
    "literalMeaning": "Origine : Dérivé de Wéh",
    "originLanguage": "Dérivé de Wéh",
    "examples": [
      {
        "nouchi": "Ne parle pas à ce wéman.",
        "french": "Sens : « Dealeur, celui qui gère les wéh » en contexte familier."
      }
    ],
    "synonyms": [
      "Djê",
      "Gbonhon",
      "Fric"
    ],
    "category": "argent",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Économie",
      "Djê"
    ]
  },
  {
    "id": "were-were",
    "term": "Were Were",
    "phonetic": "/wɛ.ʁɛ wɛ.ʁɛ/",
    "grammaticalCategory": "Adjectif / Nom",
    "definition": "Personne très affranchie, débrouillarde, dégourdie, rusée et capable de naviguer dans n'importe quel milieu urbain.",
    "frenchTranslation": "Déluré, dégourdi, rusé, affranchi de tout.",
    "originLanguage": "Dioula (Wèrèwèrè : vif, éveillé)",
    "examples": [
      {
        "nouchi": "La petite sœur est devenue trop were were, rien ne lui échappe !",
        "french": "La jeune sœur est devenue extrêmement dégourdie, rien ne lui échappe !"
      }
    ],
    "synonyms": [
      "Dégourdi",
      "Débrouillard",
      "Éveillé",
      "Malin"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Caractère",
      "Intelligence"
    ]
  },
  {
    "id": "wo",
    "term": "Wô",
    "phonetic": "/wo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Eau.",
    "frenchTranslation": "Eau",
    "literalMeaning": "Origine : Dioula",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "Donne-moi du wô.",
        "french": "Sens : « Eau » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "woh",
    "term": "Wôh",
    "phonetic": "/wo/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Exclamation d'étonnement.",
    "frenchTranslation": "Exclamation d'étonnement",
    "literalMeaning": "Origine : Interjection ivoirienne",
    "originLanguage": "Interjection ivoirienne",
    "examples": [
      {
        "nouchi": "Wôh ! C'est lourd.",
        "french": "Sens : « Exclamation d'étonnement » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "woli",
    "term": "Wôli",
    "phonetic": "/wo.li/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de ne rien valoir.",
    "frenchTranslation": "Action de ne rien valoir",
    "literalMeaning": "Origine : Néologisme Gen Z ivoirien",
    "originLanguage": "Néologisme Gen Z ivoirien",
    "examples": [
      {
        "nouchi": "Il fait le wôli.",
        "french": "Sens : « Action de ne rien valoir » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "woman",
    "term": "Wôman",
    "phonetic": "/wo.man/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Celui qui n'a pas de valeur.",
    "frenchTranslation": "Celui qui n'a pas de valeur",
    "literalMeaning": "Origine : Néologisme Gen Z ivoirien",
    "originLanguage": "Néologisme Gen Z ivoirien",
    "examples": [
      {
        "nouchi": "C'est un wôman.",
        "french": "Sens : « Celui qui n'a pas de valeur » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "wonement",
    "term": "Wônement",
    "phonetic": "/wo.nə.mɑ̃/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de rendre sans valeur.",
    "frenchTranslation": "Action de rendre sans valeur",
    "literalMeaning": "Origine : Néologisme Gen Z ivoirien",
    "originLanguage": "Néologisme Gen Z ivoirien",
    "examples": [
      {
        "nouchi": "Son wônement est visible.",
        "french": "Sens : « Action de rendre sans valeur » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "woner",
    "term": "Wôner",
    "phonetic": "/wo.ne/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Rendre sans valeur.",
    "frenchTranslation": "Rendre sans valeur",
    "literalMeaning": "Origine : Néologisme Gen Z ivoirien",
    "originLanguage": "Néologisme Gen Z ivoirien",
    "examples": [
      {
        "nouchi": "Il essaie de wôner le projet.",
        "french": "Sens : « Rendre sans valeur » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "wonerie",
    "term": "Wônerie",
    "phonetic": "/wo.ne.ʁi/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de rendre sans valeur.",
    "frenchTranslation": "Action de rendre sans valeur",
    "literalMeaning": "Origine : Néologisme Gen Z ivoirien",
    "originLanguage": "Néologisme Gen Z ivoirien",
    "examples": [
      {
        "nouchi": "C'est de la wônerie.",
        "french": "Sens : « Action de rendre sans valeur » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "woneur",
    "term": "Wôneur",
    "phonetic": "/wo.nœʁ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Celui qui rend sans valeur.",
    "frenchTranslation": "Celui qui rend sans valeur",
    "literalMeaning": "Origine : Néologisme Gen Z ivoirien",
    "originLanguage": "Néologisme Gen Z ivoirien",
    "examples": [
      {
        "nouchi": "C'est un wôneur.",
        "french": "Sens : « Celui qui rend sans valeur » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "woneuse",
    "term": "Wôneuse",
    "phonetic": "/wo.nøz/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Celle qui rend sans valeur.",
    "frenchTranslation": "Celle qui rend sans valeur",
    "literalMeaning": "Origine : Néologisme Gen Z ivoirien",
    "originLanguage": "Néologisme Gen Z ivoirien",
    "examples": [
      {
        "nouchi": "C'est une wôneuse.",
        "french": "Sens : « Celle qui rend sans valeur » en contexte familier."
      }
    ],
    "synonyms": [
      "Système D",
      "Ambiance",
      "La joie"
    ],
    "category": "vie_quotidienne",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Quotidien",
      "Vie Babi"
    ]
  },
  {
    "id": "woro-woro",
    "term": "Wôrô-wôrô",
    "phonetic": "/wɔ.ʁɔ wɔ.ʁɔ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Taxi communal collectif à couleur spécifique selon la commune (ex: jaune à Cocody, rouge à Yopougon, vert à Koumassi), élément incontournable du paysage abidjanais.",
    "frenchTranslation": "Taxi communal collectif à trajet fixe.",
    "originLanguage": "Malinké / Dioula (Wôrô : 30 francs - prix originel de la course)",
    "etymologyDetails": "À l'origine dans les années 70, la course coûtait 6 sous (30 FCFA = wôrô en dioula).",
    "examples": [
      {
        "nouchi": "Prends le wôrô-wôrô jaune pour descendre à Saint-Jean Cocody.",
        "french": "Prends le taxi collectif jaune pour t'arrêter à Saint-Jean Cocody."
      }
    ],
    "synonyms": [
      "Taxi communal",
      "Wôrô"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Transport",
      "Abidjan",
      "Incontournable"
    ]
  },
  {
    "id": "woro-woro-1",
    "term": "Woro-woro",
    "phonetic": "/wo.ʁo.wo.ʁo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Taxi collectif, taxi communal.",
    "frenchTranslation": "Taxi collectif, taxi communal",
    "literalMeaning": "Origine : Onomatopée du bruit du moteur",
    "originLanguage": "Onomatopée du bruit du moteur",
    "examples": [
      {
        "nouchi": "Le woro-woro est en grève.",
        "french": "Sens : « Taxi collectif, taxi communal » en contexte familier."
      }
    ],
    "synonyms": [
      "Glôglô",
      "Babi",
      "Quartier"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Transports",
      "Quotidien"
    ]
  },
  {
    "id": "wotro",
    "term": "Wôtro",
    "phonetic": "/wɔ.tʁo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Pousse-pousse ou charrette à deux roues utilisée pour le transport manuel de marchandises sur les marchés d'Abidjan.",
    "frenchTranslation": "Charrette à bras, pousse-pousse de transport de marchandises.",
    "originLanguage": "Dioula (Wòtro : charrette)",
    "examples": [
      {
        "nouchi": "Les wôtros transportent des sacs de riz au grand marché d'Adjamé.",
        "french": "Les charretiers transportent des sacs de riz au grand marché d'Adjamé."
      }
    ],
    "synonyms": [
      "Pousse-pousse",
      "Charrette"
    ],
    "category": "transport_lieux",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Classique",
    "tags": [
      "Transport",
      "Commerce",
      "Marché"
    ]
  },
  {
    "id": "y-a-drap",
    "term": "Y'a drap",
    "phonetic": "/ja dʁap/",
    "grammaticalCategory": "Locution proverbiale / Expression",
    "definition": "Il y a un problème.",
    "frenchTranslation": "Il y a un problème",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Attention, y'a drap !",
        "french": "Attention, il y a un sérieux problème !"
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "ya-fohi",
    "term": "Y'a fohi",
    "phonetic": "/ja fɔ.i/",
    "grammaticalCategory": "Locution proverbiale / Affirmation",
    "definition": "Expression fétiche signifiant 'il n'y a rien à craindre', 'tout va bien', 'aucun problème', 'sois tranquille'. Symbole de la sérénité et de l'optimisme ivoiriens.",
    "frenchTranslation": "Il n'y a aucun problème, tout va bien, pas de souci.",
    "literalMeaning": "Il n'y a rien du tout (fohi = zéro/rien en dioula).",
    "originLanguage": "Français (Il y a) + Dioula (Foyi : rien)",
    "examples": [
      {
        "nouchi": "Ne t'inquiète pas pour la facture, y'a fohi, je gère tout !",
        "french": "Ne te fais aucun souci pour la facture, pas de problème, je m'en occupe !"
      }
    ],
    "synonyms": [
      "Y'a likéfi",
      "Pas de problème",
      "Tranquille",
      "Tout est sous contrôle"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Philosophie",
      "Incontournable",
      "Optimisme"
    ]
  },
  {
    "id": "ya-foye",
    "term": "Ya foye",
    "phonetic": "/ja fɔj/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Il n'y a rien, c'est fini.",
    "frenchTranslation": "Il n'y a rien, c'est fini",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "Pour l'argent, ya foye.",
        "french": "Sens : « Il n'y a rien, c'est fini » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "ya-likefi",
    "term": "Ya likéfi",
    "phonetic": "/ja li.ke.fi/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Il n'y a rien, c'est vide.",
    "frenchTranslation": "Il n'y a rien, c'est vide",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "J'ai ouvert le frigo, ya likéfi.",
        "french": "Sens : « Il n'y a rien, c'est vide » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "yafor",
    "term": "Yafor",
    "phonetic": "/ja.fɔʁ/",
    "grammaticalCategory": "Interjection / Accord",
    "definition": "D'accord, c'est entendu, marché conclu, c'est validé.",
    "frenchTranslation": "D'accord, entendu, c'est compris.",
    "originLanguage": "Dioula / Nouchi",
    "examples": [
      {
        "nouchi": "On se donne rendez-vous à 18h devant le maquis ? - Yafor !",
        "french": "On se retrouve à 18h devant le restaurant ? - C'est d'accord !"
      }
    ],
    "synonyms": [
      "C'est calé",
      "D'accord",
      "Validé"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Accord",
      "Communication"
    ]
  },
  {
    "id": "yako",
    "term": "Yako",
    "phonetic": "/ja.ko/",
    "grammaticalCategory": "Expression imagée",
    "definition": "Exclamation de pitié, de compassion.",
    "frenchTranslation": "Exclamation de pitié, de compassion",
    "literalMeaning": "Origine : Interjection ivoirienne",
    "originLanguage": "Interjection ivoirienne",
    "examples": [
      {
        "nouchi": "Yako pour lui.",
        "french": "Sens : « Exclamation de pitié, de compassion » en contexte familier."
      }
    ],
    "synonyms": [
      "Y’a drap",
      "Goumin",
      "Ça ne ment pas"
    ],
    "category": "expressions",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Expressions",
      "Émotion"
    ]
  },
  {
    "id": "yo",
    "term": "Yô",
    "phonetic": "/jo/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Personne, individu.",
    "frenchTranslation": "Personne, individu",
    "literalMeaning": "Origine : Dioula",
    "originLanguage": "Dioula",
    "examples": [
      {
        "nouchi": "C'est quel yô-là ?",
        "french": "Sens : « Personne, individu » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "zango",
    "term": "Zango",
    "phonetic": "/zɑ̃.ɡo/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Personne particulièrement bien habillée, chic, tirée à quatre épingles, adepte de la haute sape.",
    "frenchTranslation": "Personne très élégante, bien sapée, dandy chic.",
    "originLanguage": "Dioula / Nouchi",
    "examples": [
      {
        "nouchi": "Regarde le djo, il est zango comme un prince ce soir !",
        "french": "Regarde ce gars, il est superbement habillé comme un prince ce soir !"
      },
      {
        "nouchi": "Il est zango aujourd'hui.",
        "french": "Sens : « Sapé, tiré à quatre épingles » en contexte familier."
      }
    ],
    "synonyms": [
      "Choco",
      "Sapologue",
      "Djanterman",
      "Kpata"
    ],
    "category": "personnes",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Sape",
      "Mode",
      "Style"
    ]
  },
  {
    "id": "zangoli",
    "term": "Zangoli",
    "phonetic": "/zɑ̃.go.li/",
    "grammaticalCategory": "Nom d’action / Nom masculin",
    "definition": "Action de se saper, de s'habiller avec style.",
    "frenchTranslation": "Action de se saper, de s'habiller avec style",
    "literalMeaning": "Origine : Dérivé de Zango",
    "originLanguage": "Dérivé de Zango",
    "examples": [
      {
        "nouchi": "Il fait le zangoli.",
        "french": "Sens : « Action de se saper, de s'habiller avec style » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "zebri-manye",
    "term": "Zébri manyé",
    "phonetic": "/ze.bʁi ma.nje/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Viol.",
    "frenchTranslation": "Viol",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "C'est un zébri manyé.",
        "french": "Sens : « Viol » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  },
  {
    "id": "zo",
    "term": "Zo",
    "phonetic": "/zo/",
    "grammaticalCategory": "Adjectif",
    "definition": "Beau, magnifique, stylé, attrayant (au féminin 'Zota').",
    "frenchTranslation": "Beau, joli, magnifique, resplendissant.",
    "originLanguage": "Langues mandées",
    "examples": [
      {
        "nouchi": "Sa nouvelle voiture est trop zo !",
        "french": "Sa nouvelle voiture est tellement belle !"
      }
    ],
    "synonyms": [
      "Zota",
      "Kpata",
      "Choco",
      "Joli"
    ],
    "category": "qualificatifs",
    "difficultyLevel": "debutant",
    "officialStatus": "Classique",
    "tags": [
      "Beauté",
      "Qualité"
    ]
  },
  {
    "id": "zogor",
    "term": "Zogor",
    "phonetic": "/zo.ɡɔʁ/",
    "grammaticalCategory": "Nom / Adjectif",
    "definition": "Personne ou situation pénible, ennuyeuse, rabat-joie ou encombrante.",
    "frenchTranslation": "Personne ennuyeuse, casse-pieds, rabat-joie.",
    "originLanguage": "Argot urbain abidjanais",
    "examples": [
      {
        "nouchi": "Laisse ce zogor là, il gâte toujours l'ambiance des fêtes !",
        "french": "Laisse cet individu ennuyeux, il gâche toujours l'atmosphère des soirées !"
      }
    ],
    "synonyms": [
      "Rabat-joie",
      "Casse-pieds",
      "Ennuyeux"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Humeur",
      "Caractère"
    ]
  },
  {
    "id": "zogotape",
    "term": "Zogotape",
    "phonetic": "/zo.ɡo.ta.pe/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Assommer, frapper brutalement ou mettre hors d'état de nuire par un coup sec.",
    "frenchTranslation": "Assommer, sonner d’un coup violent.",
    "originLanguage": "Argot de rue nouchi",
    "examples": [
      {
        "nouchi": "Le boxeur a zogotape son adversaire au deuxième round.",
        "french": "Le boxeur a assommé son adversaire dès le deuxième round."
      },
      {
        "nouchi": "Il a été zogotapé.",
        "french": "Sens : « Assommer » en contexte familier."
      }
    ],
    "synonyms": [
      "Assommer",
      "Mettre KO",
      "Daba"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Combat",
      "Sport"
    ]
  },
  {
    "id": "zoguoh",
    "term": "Zoguoh",
    "phonetic": "/zo.gwɔ/",
    "grammaticalCategory": "Nom masculin",
    "definition": "Indicateur, mouchard.",
    "frenchTranslation": "Indicateur, mouchard",
    "literalMeaning": "Origine : Argot ivoirien",
    "originLanguage": "Argot ivoirien",
    "examples": [
      {
        "nouchi": "C'est un zoguoh.",
        "french": "Sens : « Indicateur, mouchard » en contexte familier."
      }
    ],
    "synonyms": [
      "Môgô",
      "Bramogo",
      "Djo"
    ],
    "category": "personnes",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Société",
      "Identité"
    ]
  },
  {
    "id": "zoguohser",
    "term": "Zoguohser",
    "phonetic": "/zo.gwɔ.se/",
    "grammaticalCategory": "Verbe transitif",
    "definition": "Moucharder, indiquer.",
    "frenchTranslation": "Moucharder, indiquer",
    "literalMeaning": "Origine : Dérivé de Zoguoh",
    "originLanguage": "Dérivé de Zoguoh",
    "examples": [
      {
        "nouchi": "Il est en train de zoguohser.",
        "french": "Sens : « Moucharder, indiquer » en contexte familier."
      }
    ],
    "synonyms": [
      "Enjailler",
      "Gérer",
      "Bara"
    ],
    "category": "actions",
    "difficultyLevel": "intermediaire",
    "officialStatus": "Populaire",
    "tags": [
      "Abidjan",
      "Populaire",
      "Verbes",
      "Action"
    ]
  }
];

export const NOUCHI_DICTIONARY: NouchiWord[] = [
  ...INITIAL_NOUCHI_DICTIONARY,
  ...ADDITIONAL_NOUCHI_WORDS
];

export const isWordInNouchiCategory = (word: NouchiWord, catId: string): boolean => {
  if (catId === 'all') return true;
  if (catId === 'argot') {
    return (
      word.category === 'argot' ||
      (word.tags && word.tags.some(t => /argot|rue|slang|ghetto|populaire/i.test(t))) ||
      (word.originLanguage && /argot|rue|populaire/i.test(word.originLanguage)) ||
      (word.grammaticalCategory && /argot/i.test(word.grammaticalCategory)) ||
      (word.definition && /argot|familier|rue/i.test(word.definition))
    );
  }
  if (catId === 'verlan') {
    return (
      word.category === 'verlan' ||
      (word.tags && word.tags.some(t => /verlan|inversion|inversé/i.test(t))) ||
      (word.originLanguage && /verlan|inversion/i.test(word.originLanguage)) ||
      (word.definition && /verlan|inversion/i.test(word.definition)) ||
      (word.etymologyDetails && /verlan|inversion/i.test(word.etymologyDetails)) ||
      /gômô|sodj|raba|djobi|gbra|frap|tché|l'aspi|kiz|zouglou/i.test(word.term)
    );
  }
  if (catId === 'expressions') {
    return (
      word.category === 'expressions' ||
      (word.grammaticalCategory && /locution|expression|formule|proverbe/i.test(word.grammaticalCategory)) ||
      (word.tags && word.tags.some(t => /expression|proverbe|adage|philosophie/i.test(t)))
    );
  }
  return word.category === catId;
};

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Tous les termes', icon: 'BookOpen', count: NOUCHI_DICTIONARY.length },
  { id: 'argot', label: '⚡ Argot & Slang Rue', icon: 'Flame', count: NOUCHI_DICTIONARY.filter(w => isWordInNouchiCategory(w, 'argot')).length },
  { id: 'verlan', label: '🔄 Verlan & Inversions', icon: 'Repeat', count: NOUCHI_DICTIONARY.filter(w => isWordInNouchiCategory(w, 'verlan')).length },
  { id: 'expressions', label: '💬 Expressions & Proverbes', icon: 'MessageCircle', count: NOUCHI_DICTIONARY.filter(w => isWordInNouchiCategory(w, 'expressions')).length },
  { id: 'personnes', label: '👥 Personnes & Profils', icon: 'Users', count: NOUCHI_DICTIONARY.filter(w => w.category === 'personnes').length },
  { id: 'argent', label: '💰 Argent & Économie', icon: 'Banknote', count: NOUCHI_DICTIONARY.filter(w => w.category === 'argent').length },
  { id: 'actions', label: '🎬 Actions & Verbes', icon: 'Zap', count: NOUCHI_DICTIONARY.filter(w => w.category === 'actions').length },
  { id: 'qualificatifs', label: '🎭 Qualificatifs & États', icon: 'Sparkles', count: NOUCHI_DICTIONARY.filter(w => w.category === 'qualificatifs').length },
  { id: 'transport_lieux', label: '🚗 Lieux & Transports', icon: 'MapPin', count: NOUCHI_DICTIONARY.filter(w => w.category === 'transport_lieux').length },
  { id: 'vie_quotidienne', label: '🍲 Vie Quotidienne & Repas', icon: 'Utensils', count: NOUCHI_DICTIONARY.filter(w => w.category === 'vie_quotidienne').length },
  { id: 'musique_culture', label: '🎶 Musique & Culture Babi', icon: 'Music', count: NOUCHI_DICTIONARY.filter(w => w.category === 'musique_culture').length },
];
