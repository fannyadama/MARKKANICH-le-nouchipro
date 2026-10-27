import { WeeklyChallenge } from '../types';

export const WEEKLY_CHALLENGES: WeeklyChallenge[] = [
  {
    id: 'challenge-semaine-actuelle',
    title: 'Défi de la Semaine : Les Incontournables de la Débrouillardise 🇨🇮',
    theme: 'Système D & Vie Urbaine à Abidjan',
    description: 'Maîtrisez ces 5 termes emblématiques de la rue abidjanaise. Validez chaque mot via le mini-test pour débloquer le badge exclusif "As du Ghetto" et cumuler +150 XP !',
    weekNumber: 42,
    startDate: '2026-10-19',
    endDate: '2026-10-26',
    xpReward: 150,
    difficulty: 'intermediaire',
    tag: 'Abidjan Réel',
    badgeReward: {
      id: 'badge-defi-hebdo-as-du-ghetto',
      name: 'As du Ghetto',
      description: 'A maîtrisé la liste hebdomadaire des expressions phares du Système D ivoirien.',
      icon: '⚡',
      category: 'special',
      level: 'gold',
      requirement: 'Compléter le défi hebdomadaire de la Débrouillardise',
      points: 150
    },
    words: [
      {
        wordId: 'abidjan-cest-technique',
        term: "Abidjan, c'est technique",
        phonetic: "/a.bi.dʒɑ̃ sɛ tɛk.nik/",
        frenchTranslation: "La vie à Abidjan exige un sens aigu de la débrouillardise (système D).",
        definition: "Adage fondamental signifiant que la vie dans la métropole abidjanaise exige de la ruse, de l'adaptation et de l'intelligence pratique face aux imprévus.",
        category: 'expressions',
        mnemonicHint: "À Abidjan, rien n'est rectiligne, il faut toujours avoir un plan B.",
        quizPrompt: {
          question: "Que signifie l'expression proverbiale « Abidjan, c'est technique » ?",
          options: [
            "Il faut avoir un diplôme d'ingénieur pour trouver du travail.",
            "La vie à Abidjan exige beaucoup d'ingéniosité et de ruse face aux défis.",
            "Le réseau internet est très développé en Côte d'Ivoire.",
            "La circulation routière est parfaitement automatisée."
          ],
          correctIndex: 1
        }
      },
      {
        wordId: 'chap-chap',
        term: 'Chap-chap',
        phonetic: '/tʃap.tʃap/',
        frenchTranslation: 'Vite fait, en vitesse, sans traîner.',
        definition: "Faire quelque chose promptement, avec diligence et rapidité sans perdre de temps.",
        category: 'vie_quotidienne',
        mnemonicHint: "Pense au bruit de pas rapides qui filent sans regarder en arrière.",
        quizPrompt: {
          question: "Si ton ami te dit : « On gère ça chap-chap ! », qu'attend-il ?",
          options: [
            "Qu'on remette le projet à la semaine prochaine.",
            "Qu'on règle l'affaire rapidement et sans traîner.",
            "Qu'on fasse une négociation compliquée avec plusieurs personnes.",
            "Qu'on prépare un repas traditionnel pour midi."
          ],
          correctIndex: 1
        }
      },
      {
        wordId: 'tchoko',
        term: 'Tchoko',
        phonetic: '/tʃɔ.ko/',
        frenchTranslation: 'Pourboire, pot-de-vin, monnaie de politesse.',
        definition: "Somme d'argent symbolique ou pourboire versé pour obtenir un service rapide ou faciliter une transaction.",
        category: 'argent',
        mnemonicHint: "Donner un coup de pouce monétaire pour décanter une paperasse.",
        quizPrompt: {
          question: "Dans le langage de rue, à quoi correspond un « tchoko » ?",
          options: [
            "Un sandwich traditionnel au poulet piqué.",
            "Un ticket de loterie nationale.",
            "Un pourboire, gratification ou petite monnaie de facilitation.",
            "Un coup de téléphone passé en urgence."
          ],
          correctIndex: 2
        }
      },
      {
        wordId: 'enjailler',
        term: "S'enjailler",
        phonetic: "/sɑ̃.ʒa.je/",
        frenchTranslation: 'Faire la fête, se divertir intensément, kiffer.',
        definition: "Prendre du bon temps, profiter d'une ambiance joyeuse et dansante à la façon abidjanaise.",
        category: 'musique_culture',
        mnemonicHint: "Issu de l'anglais 'enjoy' assimilé au rythme ivoirien.",
        quizPrompt: {
          question: "Quelle est l'origine étymologique du verbe nouchi « s'enjailler » ?",
          options: [
            "Du mot portugais 'janela' (fenêtre).",
            "Du verbe anglais 'to enjoy' réapproprié et conjugué à la française.",
            "Du dialecte bété désignant la danse guerrière.",
            "D'une marque de boisson énergisante des maquis abidjanais."
          ],
          correctIndex: 1
        }
      },
      {
        wordId: 'grotto',
        term: 'Grotto',
        phonetic: '/ɡʁɔ.to/',
        frenchTranslation: 'Homme influent, nanti, protecteur aisé.',
        definition: "Personne respectable disposant de moyens financiers solides et d'un grand réseau social ou relationnel.",
        category: 'personnes',
        mnemonicHint: "Un 'grand' qui pèse lourd sur la balance sociale.",
        quizPrompt: {
          question: "Comment décrit-on un « Grotto » dans un maquis ou une réunion ?",
          options: [
            "Un jeune apprenti mécanicien timide.",
            "Un musicien qui commence sa carrière.",
            "Un homme aisé, influent et généreux capable de régler les additions.",
            "Un étranger de passage qui cherche son chemin."
          ],
          correctIndex: 2
        }
      }
    ]
  },
  {
    id: 'challenge-semaine-prochaine',
    title: 'Défi Prochain : Les Saveurs du Maquis & Garba 🍛',
    theme: 'Cuisine Nouchi & Gastronomie de Rue',
    description: 'Une sélection appétissante de termes culinaires ivoiriens pour tout nouchiman qui aime la bonne bouffe.',
    weekNumber: 43,
    startDate: '2026-10-27',
    endDate: '2026-11-03',
    xpReward: 160,
    difficulty: 'debutant',
    tag: 'Gastronomie',
    badgeReward: {
      id: 'badge-defi-hebdo-maitre-garba',
      name: 'Chef du Garbadrome',
      description: 'A maîtrisé l’argot culinaire des allocodromes et maquis d’Abidjan.',
      icon: '🍗',
      category: 'special',
      level: 'platinum',
      requirement: 'Compléter le défi hebdomadaire de la Cuisine Nouchi',
      points: 160
    },
    words: [
      {
        wordId: 'garba',
        term: 'Garba',
        phonetic: '/ɡaʁ.ba/',
        frenchTranslation: 'Semoule de manioc (attiéké) servie avec du thon frit et piment.',
        definition: "Le plat populaire national par excellence, vendu dans les garbadromes par les Haoussas.",
        category: 'vie_quotidienne',
        mnemonicHint: "Le carburant des étudiants et travailleurs d'Abidjan.",
        quizPrompt: {
          question: "De quoi est composé le fameux Garba ivoirien ?",
          options: [
            "De riz gras avec de la viande de bœuf séchée.",
            "D'attiéké (semoule de manioc fermentée) et de thon frit assaisonné d'oignons et piments.",
            "D'igname bouillie pilée avec de la sauce graine.",
            "De bananes plantains frites dans l'huile rouge."
          ],
          correctIndex: 1
        }
      },
      {
        wordId: 'alloco',
        term: 'Alloco',
        phonetic: '/a.lɔ.ko/',
        frenchTranslation: 'Bananes plantains mûres frites en dés.',
        definition: "En-cas adoré et savoureux accompagné de piment écrasé, d'œufs durs ou de poisson braisé.",
        category: 'vie_quotidienne',
        mnemonicHint: "Le goûter sacré des ruelles ivoiriennes à 16h.",
        quizPrompt: {
          question: "Quel ingrédient est la base incontournable de l'Alloco ?",
          options: [
            "Le tubercule de manioc blanc.",
            "La banane plantain bien mûre coupée en morceaux et dorée à l'huile.",
            "La farine de maïs blanche.",
            "La pâte d'arachide grillée."
          ],
          correctIndex: 1
        }
      },
      {
        wordId: 'kpata-kpata',
        term: 'Kpata-kpata',
        phonetic: '/kpa.ta kpa.ta/',
        frenchTranslation: 'Délicieux, grandiose, au sommet de l’art.',
        definition: "Expression d'admiration superlative pour un plat succulent ou une tenue éblouissante.",
        category: 'qualificatifs',
        mnemonicHint: "Double impact pour marquer une perfection totale.",
        quizPrompt: {
          question: "Dire qu'un repas est « kpata-kpata » signifie :",
          options: [
            "Qu'il est froid et immangeable.",
            "Qu'il est excessivement pimenté pour les enfants.",
            "Qu'il est prodigieusement délicieux et appétissant.",
            "Qu'il a été cuisiné sans aucune goutte d'huile."
          ],
          correctIndex: 2
        }
      }
    ]
  },
  {
    id: 'challenge-archives-yopougon',
    title: 'Défi Rétro : L’Esprit de Yop City & Marcory 🌴',
    theme: 'Ambiance Nocturne & Fête Abidjanaise',
    description: 'Explorez le vocabulaire des boulevards nocturnes, de la rue Princesse aux maquis branchés.',
    weekNumber: 41,
    startDate: '2026-10-12',
    endDate: '2026-10-19',
    xpReward: 140,
    difficulty: 'avance',
    tag: 'Nuit & Ambiance',
    badgeReward: {
      id: 'badge-defi-hebdo-ambianceur-etoile',
      name: 'Ambianceur Étoilé',
      description: 'A maîtrisé le langage des hauts lieux festifs et des maquis ivoiriens.',
      icon: '🎉',
      category: 'special',
      level: 'diamond',
      requirement: 'Compléter le défi rétro Ambiance & Nuit',
      points: 140
    },
    words: [
      {
        wordId: 'farot',
        term: 'Farot',
        phonetic: '/fa.ʁo/',
        frenchTranslation: 'Frime, élégance ostentatoire, assurance.',
        definition: "Faire preuve de prestance, montrer ses atouts et son charisme vestimentaire.",
        category: 'qualificatifs',
        mnemonicHint: "Faire le beau pour attirer le respect.",
        quizPrompt: {
          question: "Que fait une personne qui « farote » ?",
          options: [
            "Elle se cache pour ne pas être vue.",
            "Elle étale son aisance, son style et sa générosité de façon voyante.",
            "Elle étudie tard dans la nuit à la bibliothèque.",
            "Elle se dispute vivement avec les commerçants du marché."
          ],
          correctIndex: 1
        }
      },
      {
        wordId: 'dégamage',
        term: 'Dégamer',
        phonetic: '/de.ɡa.me/',
        frenchTranslation: 'Déraper, perdre le contrôle, faire une gaffe.',
        definition: "Agir de manière déplacée ou commettre un écart de conduite manifeste.",
        category: 'actions',
        mnemonicHint: "Sortir de la gamme musicale normale.",
        quizPrompt: {
          question: "Dans une conversation ou une soirée, « dégamer » veut dire :",
          options: [
            "Chanter une mélodie traditionnelle en chœur.",
            "Commis une gaffe, dépasser les bornes ou perdre ses moyens.",
            "Offrir une tournée de boissons à toute la table.",
            "Quitter discrètement la fête avant la fin."
          ],
          correctIndex: 1
        }
      }
    ]
  }
];
