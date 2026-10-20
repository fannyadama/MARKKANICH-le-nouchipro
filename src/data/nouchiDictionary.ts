import { NouchiWord } from '../types';

export const NOUCHI_DICTIONARY: NouchiWord[] = [
  // --- A ---
  {
    id: 'abidjan-cest-technique',
    term: "Abidjan, c'est technique",
    phonetic: '/a.bi.dʒɑ̃ sɛ tɛk.nik/',
    grammaticalCategory: 'Locution proverbiale',
    definition: "Adage fondamental signifiant que la vie dans la métropole abidjanaise exige de la ruse, de la débrouillardise, de l'adaptation et de l'intelligence pratique face aux imprévus.",
    frenchTranslation: "La vie à Abidjan exige un sens aigu de la débrouillardise (système D).",
    literalMeaning: "Abidjan demande de la méthode et du sang-froid.",
    originLanguage: 'Français ivoirien / Argot urbain',
    etymologyDetails: "Popularisé dans les années 90 par les chauffeurs de gbaka et la jeunesse active face aux défis du quotidien.",
    examples: [
      {
        nouchi: "Si tu n'as pas l'œil ici, on va te logobby en deux secondes : Abidjan, c'est technique !",
        french: "Si tu n'es pas vigilant ici, on va t'arnaquer en un éclair : vivre à Abidjan demande beaucoup d'astuce !"
      }
    ],
    synonyms: ["On se cherche", "Système D ivoirien", "La vie c'est combat"],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Culture', 'Philosophie', 'Abidjan', 'Proverbe']
  },
  {
    id: 'acloidahi',
    term: 'Acloidahi',
    phonetic: '/a.klwa.da.i/',
    grammaticalCategory: 'Adjectif / Interjection',
    definition: "Désigne quelque chose de flambant neuf, de resplendissant, d'impeccable ou d'extrêmement élégant.",
    frenchTranslation: 'Tout neuf, éclatant, impeccable.',
    literalMeaning: 'Étincelant comme sorti du magasin.',
    originLanguage: 'Baoulé & Argot',
    etymologyDetails: 'Emprunt phonétique baoulé marquant la brillance et la perfection.',
    examples: [
      {
        nouchi: "Le djo est venu avec une paire acloidahi !",
        french: "Le gars est arrivé avec des chaussures toutes neuves !"
      }
    ],
    synonyms: ['Kpata-kpata', 'Zo', 'Choco', 'Propre'],
    category: 'qualificatifs',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Style', 'Sape', 'Mode']
  },
  {
    id: 'adjouffou',
    term: 'Adjouffou',
    phonetic: '/ad.ʒu.fu/',
    grammaticalCategory: 'Nom propre / Quartier',
    definition: "Quartier populaire de la commune de Port-Bouët à Abidjan, près de l'aéroport, symbole de la ferveur populaire et de l'authenticité urbaine.",
    frenchTranslation: "Quartier historique d'Abidjan.",
    originLanguage: 'Toponyme ivoirien',
    examples: [
      {
        nouchi: "Le môgô a grandi à Adjouffou, il connaît tous les glôglôs.",
        french: "Le gars a grandi à Adjouffou, il connaît tous les recoins du quartier."
      }
    ],
    synonyms: ['Babi', 'Glôglô'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Classique',
    tags: ['Lieux', 'Abidjan', 'Géographie']
  },
  {
    id: 'affaire-est-daye',
    term: 'Affaire est daye',
    phonetic: '/a.fɛʁ ɛ daj/',
    grammaticalCategory: 'Locution verbale',
    definition: "Expression marquant la fin irrévocable d'une situation, un échec définitif, ou une conclusion sans appel.",
    frenchTranslation: "C'est complètement terminé, il n'y a plus aucun espoir.",
    literalMeaning: "L'affaire est morte / scellée.",
    originLanguage: 'Anglais (to die) + Français',
    etymologyDetails: "Daye est la nouchisation du verbe anglais 'to die' (mourir).",
    examples: [
      {
        nouchi: "Il a raté le dernier car, affaire est daye !",
        french: "Il a raté le dernier bus, c'est plié, c'est foutu !"
      }
    ],
    synonyms: ["C'est gâté", "C'est calé", "Affaire est classée"],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Expression', 'Quotidien', 'Fin']
  },
  {
    id: 'affairage',
    term: 'Affairage',
    phonetic: '/a.fɛ.ʁaʒ/',
    grammaticalCategory: 'Nom masculin',
    definition: "Action de colporter des ragots, des commérages, d'épier la vie d'autrui ou de s'immiscer dans des discussions privées.",
    frenchTranslation: 'Commérage, colportage de rumeurs, indiscrétion.',
    originLanguage: 'Français déformé (Affaires + suffixe -age)',
    examples: [
      {
        nouchi: "Laisse l'affairage du quartier et concentre-toi sur ton djossi !",
        french: "Laisse les commérages du quartier et concentre-toi sur ton travail !"
      }
    ],
    synonyms: ['Kpakpatoya', 'Gbairè', 'Kongossa'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Relations', 'Société', 'Parler']
  },
  {
    id: 'agbolo',
    term: 'Agbolo',
    phonetic: '/aɡ.bo.lo/',
    grammaticalCategory: 'Nom / Adjectif',
    definition: "Personne particulièrement musclée, robuste, colosse ou agent de sécurité à la carrure impressionnante.",
    frenchTranslation: 'Homme très musclé, colosse, costaud.',
    originLanguage: 'Bété / Dioula',
    examples: [
      {
        nouchi: "Le vigile de la boîte de nuit est un vrai agbolo !",
        french: "Le vigile de la discothèque est un véritable colosse !"
      }
    ],
    synonyms: ['Digba', 'Gbôlôzailli', 'Armoire à glace', 'Crapaud'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Physique', 'Force', 'Personne']
  },
  {
    id: 'agnon',
    term: 'Agnon',
    phonetic: '/a.ɲɔ̃/',
    grammaticalCategory: 'Nom masculin (invariable)',
    definition: 'Vêtements, garde-robe, habits élégants ou tenues de sortie.',
    frenchTranslation: 'Vêtements, habits, sapes.',
    originLanguage: 'Langues akan / Baoulé',
    examples: [
      {
        nouchi: "Il a acheté des agnons de marque pour la fête d'Abidjan.",
        french: "Il s'est acheté de superbes vêtements pour la soirée d'Abidjan."
      }
    ],
    synonyms: ['Sapes', 'Légué', 'Tissus'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Sape', 'Mode', 'Objets']
  },
  {
    id: 'ahoulaba',
    term: 'Ahoulaba',
    phonetic: '/a.u.la.ba/',
    grammaticalCategory: 'Nom féminin',
    definition: "Femme élégante, généreusement pourvue par la nature, aux rondeurs harmonieuses et incarnant les canons de beauté traditionnels ivoiriens.",
    frenchTranslation: 'Femme voluptueuse et élégante aux formes généreuses.',
    originLanguage: 'Akan / Baoulé',
    etymologyDetails: "Donne aussi son nom au prestigieux concours de beauté 'Awoulaba' célébrant la femme africaine naturelle.",
    examples: [
      {
        nouchi: "La fille qui danse là-bas a une allure de vraie ahoulaba !",
        french: "La femme qui danse là-bas a une prestance et des rondeurs magnifiques !"
      }
    ],
    synonyms: ['Apoutchou', 'BobaraBa', 'Matos'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Beauté', 'Femme', 'Culture']
  },
  {
    id: 'anango-plan',
    term: 'Anango plan',
    phonetic: '/a.nɑ̃.ɡo plɑ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: "Promesse non tenue, arrangement douteux, offre trompeuse ou rendez-vous auquel l'interlocuteur fait faux bond.",
    frenchTranslation: 'Promesse en l’air, plan foireux, lapin.',
    originLanguage: 'Yoruba / Populaire',
    examples: [
      {
        nouchi: "Il m'a juré qu'il arrivait à 14h mais il m'a fait un anango plan !",
        french: "Il m'a promis d'être là à 14h mais il m'a posé un lapin !"
      }
    ],
    synonyms: ['Faux bond', 'Plan gâté', 'Flôcô'],
    category: 'argent',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Arnaque', 'Rendez-vous', 'Méfiance']
  },
  {
    id: 'apoutchou',
    term: 'Apoutchou',
    phonetic: '/a.put.ʃu/',
    grammaticalCategory: 'Nom féminin / Adjectif',
    definition: "Désigne affectueusement une femme pulpeuse, aux courbes très généreuses et fière de ses formes.",
    frenchTranslation: 'Femme très pulpeuse et fière de ses rondeurs.',
    originLanguage: 'Création nouchi urbaine',
    examples: [
      {
        nouchi: "Les apoutchous font sensation lors des concerts à Treichville.",
        french: "Les femmes aux formes généreuses font sensation lors des concerts à Treichville."
      }
    ],
    synonyms: ['Ahoulaba', 'Tassaba', 'BobaraBa'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Tendance',
    tags: ['Femme', 'Beauté', 'Société']
  },
  {
    id: 'atalakon',
    term: 'Atalakon',
    phonetic: '/a.ta.la.kɔ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: "Éloge public rythmé, dédicace dithyrambique prononcée par un DJ ou un chanteur pour flatter un bienfaiteur ou un 'boucantier'.",
    frenchTranslation: 'Éloge, louange publique rythmée, encensement.',
    originLanguage: 'Dioula (Atala : prends-le / élève-le)',
    etymologyDetails: "Élément central de la culture Coupé-Décalé et Zouglou.",
    examples: [
      {
        nouchi: "Le DJ lui a fait un gros atalakon quand il a commandé les bouteilles.",
        french: "Le DJ a crié son nom en musique et lui a fait un grand éloge dès qu'il a commandé."
      }
    ],
    synonyms: ['Dédicace', 'Farot', 'Louange'],
    category: 'musique_culture',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Musique', 'Coupé-Décalé', 'Fête']
  },

  // --- B ---
  {
    id: 'baby-compteur',
    term: 'Baby-compteur',
    phonetic: '/be.bi kɔ̃p.tœʁ/',
    grammaticalCategory: 'Nom féminin',
    definition: 'Surnom populaire donné aux anciennes voitures Citroën 2 CV circulant à Abidjan.',
    frenchTranslation: 'Citroën 2 CV.',
    originLanguage: 'Français populaire ivoirien',
    examples: [
      {
        nouchi: "Le tonton roule toujours dans sa baby-compteur d'époque.",
        french: "Le vieil oncle roule encore dans sa 2 CV d'antan."
      }
    ],
    synonyms: ['Taille-crayon', 'Borifin'],
    category: 'transport_lieux',
    difficultyLevel: 'expert',
    officialStatus: 'Classique',
    tags: ['Transport', 'Voiture', 'Rétro']
  },
  {
    id: 'badrô',
    term: 'Badrô',
    phonetic: '/ba.dʁo/',
    grammaticalCategory: 'Verbe transitif / intransitif',
    definition: 'Consommer de la boisson, souvent en grande quantité lors d’une fête entre amis.',
    frenchTranslation: 'Boire, trinquer, picoler.',
    originLanguage: 'Argot Abidjan',
    examples: [
      {
        nouchi: "On va badrô du bon jus ce soir pour fêter le nouveau djossi !",
        french: "On va boire un bon coup ce soir pour célébrer mon nouvel emploi !"
      }
    ],
    synonyms: ['Siffler', 'Se doser', 'Glouglouter'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Boisson', 'Fête', 'Sortie']
  },
  {
    id: 'baga-baga',
    term: 'Baga baga',
    phonetic: '/ba.ɡa ba.ɡa/',
    grammaticalCategory: 'Verbe / Nom',
    definition: "Intimider, effrayer quelqu'un par des menaces, des gestes brusques ou des démonstrations de force.",
    frenchTranslation: 'Intimider, faire peur, terroriser.',
    originLanguage: 'Dioula',
    examples: [
      {
        nouchi: "Ne viens pas me faire baga baga, je connais tes manières !",
        french: "Ne viens pas essayer de m'impressionner ou de me faire peur, je te connais !"
      }
    ],
    synonyms: ['Effrayer', 'Chauffer le cœur', 'Menacer'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Conflit', 'Rue', 'Émotion']
  },
  {
    id: 'balladur',
    term: 'Balladur',
    phonetic: '/ba.la.dyʁ/',
    grammaticalCategory: 'Nom masculin',
    definition: "Ancien bus public ou taxi collectif importé d'occasion, réputé lent mais robuste, baptisé ironiquement d'après l'ancien Premier ministre français.",
    frenchTranslation: "Vieux bus ou car de transport d'occasion.",
    originLanguage: 'Français / Politique',
    examples: [
      {
        nouchi: "On a pris le Balladur pour aller jusqu'à Dabou.",
        french: "On a pris le vieux car collectif pour se rendre à Dabou."
      }
    ],
    synonyms: ['Gbaka', 'Panneau', 'France-au-revoir'],
    category: 'transport_lieux',
    difficultyLevel: 'expert',
    officialStatus: 'Classique',
    tags: ['Transport', 'Histoire', 'Abidjan']
  },
  {
    id: 'banger',
    term: 'Banger',
    phonetic: '/bɑ̃.ɡe/',
    grammaticalCategory: 'Nom masculin / Verbe',
    definition: "Feu d'artifice, pétard de fête ou par extension un son musical incroyable qui explose dans les clubs.",
    frenchTranslation: 'Pétard, feu d’artifice, ou tube musical retentissant.',
    originLanguage: 'Anglais & Nouchi',
    examples: [
      {
        nouchi: "Pendant la Saint-Sylvestre, les petits ont allumé plein de bangers !",
        french: "Pendant le réveillon du Nouvel An, les jeunes ont tiré plein de pétards !"
      }
    ],
    synonyms: ['Pétard', 'Hit', 'Balle'],
    category: 'musique_culture',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Tendance',
    tags: ['Fête', 'Musique', 'Nuit']
  },
  {
    id: 'barre',
    term: 'Barre',
    phonetic: '/baʁ/',
    grammaticalCategory: 'Nom féminin',
    definition: 'Billet ou somme de 1 000 Francs CFA.',
    frenchTranslation: '1 000 Francs CFA.',
    originLanguage: 'Français argotique ivoirien',
    examples: [
      {
        nouchi: "Donne-moi une barre pour que je puisse payer mon transport.",
        french: "Donne-moi mille francs CFA pour que je puisse régler mon taxi."
      }
    ],
    synonyms: ['Krika', '1000 CFA'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Argent', 'Monnaie', 'CFA']
  },
  {
    id: 'bedou',
    term: 'Bédou',
    phonetic: '/be.du/',
    grammaticalCategory: 'Nom masculin',
    definition: "Portefeuille, porte-monnaie, ou pochette où l'on garde son argent et ses pièces d'identité.",
    frenchTranslation: 'Portefeuille, porte-monnaie.',
    originLanguage: 'Argot nouchi abidjanais',
    examples: [
      {
        nouchi: "Fais attention à ton bédou dans la foule du marché !",
        french: "Fais bien attention à ton portefeuille au milieu de la foule du marché !"
      }
    ],
    synonyms: ['Porte-monnaie', 'Poche', 'Caisse'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Objets', 'Sécurité']
  },
  {
    id: 'beko',
    term: 'Beko',
    phonetic: '/be.ko/',
    grammaticalCategory: 'Nom masculin / Verbe',
    definition: "Baiser affectueux, bisou sur la joue ou marque de tendresse.",
    frenchTranslation: 'Bisou, baiser, embrassade.',
    originLanguage: 'Dioula (Bɛkɔ : bisou)',
    examples: [
      {
        nouchi: "Fais un beko à ta maman avant de partir à l'école.",
        french: "Fais un bisou à ta mère avant de partir en classe."
      }
    ],
    synonyms: ['Bisou', 'Poutou'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Affection', 'Amour', 'Famille']
  },
  {
    id: 'bele-bele',
    term: 'Bélé bélé',
    phonetic: '/be.le be.le/',
    grammaticalCategory: 'Adjectif / Nom',
    definition: 'Personne corpulente, imposante, grasse ou chose de très grand format.',
    frenchTranslation: 'Corpulant, gros, géant, énorme.',
    originLanguage: 'Dioula (Bèlèbèlè : grand, gros)',
    examples: [
      {
        nouchi: "Le djo là est devenu bélé bélé depuis qu'il a trouvé son bon djossi !",
        french: "Ce gars a pris beaucoup d'embonpoint depuis qu'il a un bon travail !"
      }
    ],
    synonyms: ['Digba', 'Gros', 'Massif'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Physique', 'Description']
  },
  {
    id: 'belle-mere-wobe',
    term: 'Belle-mère Wobé',
    phonetic: '/bɛl mɛʁ wɔ.be/',
    grammaticalCategory: 'Nom propre / Surnom',
    definition: "Surnom humoristique donné aux berlines allemandes BMW à Abidjan, symbolisant le prestige et la puissance.",
    frenchTranslation: 'Voiture BMW.',
    originLanguage: 'Français + Éthnie Wobé',
    examples: [
      {
        nouchi: "Le groto est descendu de sa Belle-mère Wobé vitres teintées.",
        french: "Le notable fortuné est descendu de sa BMW aux vitres teintées."
      }
    ],
    synonyms: ['BMW', 'Grosse caisse', 'Borifin'],
    category: 'transport_lieux',
    difficultyLevel: 'expert',
    officialStatus: 'Classique',
    tags: ['Voiture', 'Humour', 'Abidjan']
  },
  {
    id: 'beou',
    term: 'Beou',
    phonetic: '/be.u/',
    grammaticalCategory: 'Verbe intransitif',
    definition: "Quitter précipitamment un endroit, s'esquiver discrètement ou s'enfuir devant un danger.",
    frenchTranslation: "Partir, s'en aller, fuir, s'éclipser.",
    originLanguage: 'Argot urbain d’Adjamé',
    examples: [
      {
        nouchi: "Dès que le gômon est arrivé, tout le monde a beou !",
        french: "Dès que la police est arrivée, tout le monde s'est enfui !"
      }
    ],
    synonyms: ['Fraya', 'Flo', 'Pantougouler', 'Prendre la clé des champs'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Fuite', 'Action', 'Rue']
  },
  {
    id: 'bigo',
    term: 'Bigo',
    phonetic: '/bi.ɡo/',
    grammaticalCategory: 'Nom masculin',
    definition: "Téléphone portable ou smartphone (parfois désigne un œuf selon le contexte culinaire d'Abidjan).",
    frenchTranslation: 'Téléphone, smartphone.',
    originLanguage: 'Français argotique (Bigo)',
    examples: [
      {
        nouchi: "Mon bigo est déchargé, prête-moi ton chargeur s'il te plaît.",
        french: "Mon téléphone n'a plus de batterie, prête-moi ton chargeur s'il te plaît."
      }
    ],
    synonyms: ['Lalé', 'Cellulaire', 'Appareil'],
    category: 'transport_lieux',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Tech', 'Objets', 'Quotidien']
  },
  {
    id: 'bingue',
    term: 'Bingue',
    phonetic: '/biŋɡ/',
    grammaticalCategory: 'Nom propre géographique',
    definition: "L'Europe, et plus particulièrement la France ou l'Occident dans l'imaginaire urbain ivoirien.",
    frenchTranslation: "L'Europe, la France, l'Occident.",
    originLanguage: 'Création nouchi',
    etymologyDetails: "Apparu dans les années 80 pour désigner l'eldorado migratoire rêvé par les jeunes d'Abidjan.",
    examples: [
      {
        nouchi: "Mon grand frère est parti à Bingue pour poursuivre ses études.",
        french: "Mon frère aîné est parti en Europe pour continuer ses études."
      }
    ],
    synonyms: ['Mbeng', 'Paris', 'L’Hexagone', 'Poto'],
    category: 'transport_lieux',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Voyage', 'Diaspora', 'Culture']
  },
  {
    id: 'binguiste',
    term: 'Binguiste',
    phonetic: '/biŋ.ɡist/',
    grammaticalCategory: 'Nom masculin / féminin',
    definition: "Personne originaire d'Afrique vivant en Europe (à Bingue) ou revenant au pays avec des signes extérieurs d'aisance financière.",
    frenchTranslation: "Ressortissant de la diaspora vivant en Europe / voyageur de retour de France.",
    originLanguage: 'Nouchi (Bingue + suffixe -iste)',
    examples: [
      {
        nouchi: "Pendant les fêtes de décembre, les binguistes remplissent les maquis de Cocody.",
        french: "Pendant les fêtes de fin d'année, les membres de la diaspora remplissent les restaurants en plein air de Cocody."
      }
    ],
    synonyms: ['Diaspo', 'Parigot', 'Benguiste'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Diaspora', 'Personne', 'Société']
  },
  {
    id: 'blakoro',
    term: 'Blakoro',
    phonetic: '/bla.ko.ʁo/',
    grammaticalCategory: 'Nom masculin / Invective',
    definition: "À l'origine en mandingue, jeune homme non circoncis; en nouchi, garnement insolent, écervelé, impoli ou immature.",
    frenchTranslation: 'Gamin insolent, novice, irresponsable.',
    originLanguage: 'Dioula / Mandingue (Bilakoro)',
    examples: [
      {
        nouchi: "Petit blakoro là, tu oses manquer de respect aux grands du quartier ?",
        french: "Espèce de petit insolent, tu oses manquer de respect à tes aînés ?"
      }
    ],
    synonyms: ['Gamin', 'Gaou', 'Insolent'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Jeunesse', 'Insulte légère', 'Tradition']
  },
  {
    id: 'bobaraba',
    term: 'BobaraBa',
    phonetic: '/bo.ba.ʁa.ba/',
    grammaticalCategory: 'Nom masculin',
    definition: "Fesses très volumineuses et rebondies. A donné son nom à une danse et un genre musical culte en Côte d'Ivoire.",
    frenchTranslation: 'Postérieur très développé, fessier imposant.',
    originLanguage: 'Dioula (Bɔbɔra : fesses + Ba : grand/gros)',
    examples: [
      {
        nouchi: "La chanson du BobaraBa a fait danser toute l'Afrique de l'Ouest.",
        french: "Le tube musical sur les fessiers généreux a fait danser toute l'Afrique de l'Ouest."
      }
    ],
    synonyms: ['Tassaba', 'Bôtchô', 'Matos'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Musique', 'Corps', 'Danse']
  },
  {
    id: 'borifin',
    term: 'Borifin',
    phonetic: '/bo.ʁi.fɛ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: "Véhicule automobile, voiture, bagnole en général.",
    frenchTranslation: 'Voiture, automobile, véhicule.',
    originLanguage: 'Dioula (Bori : course/vitesse + Fin : chose/engin)',
    examples: [
      {
        nouchi: "Il a garé son borifin devant la cour.",
        french: "Il a stationné sa voiture devant la concession."
      }
    ],
    synonyms: ['Gamos', 'Caisse', 'Voiture'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Transport', 'Voiture']
  },
  {
    id: 'boucantier',
    term: 'Boucantier',
    phonetic: '/bu.kɑ̃.tje/',
    grammaticalCategory: 'Nom masculin',
    definition: "Personne qui aime faire la fête avec faste, étaler sa richesse, dépenser sans compter en public et faire du 'boucan' (bruit/renommée). Mot officiel du dictionnaire Larousse.",
    frenchTranslation: 'Fêtard flamboyant qui affiche ostensiblement son aisance financière.',
    originLanguage: 'Français (Boucan) + Nouchi ivoirien',
    etymologyDetails: "Intronisé au Petit Larousse illustré en 2020 grâce à la vague Coupé-Décalé de Douk Saga et de la Jet Set ivoirienne.",
    examples: [
      {
        nouchi: "Les boucantiers commandent du champagne et distribuent les coupures sur la piste.",
        french: "Les fêtards flamboyants commandent du champagne et jettent des billets sur la piste de danse."
      }
    ],
    synonyms: ['Faroteur', 'Travailleur', 'Showman', 'Groto'],
    category: 'musique_culture',
    difficultyLevel: 'debutant',
    officialStatus: 'Larousse',
    officialYear: '2020',
    tags: ['Coupé-Décalé', 'Larousse', 'Fête', 'Argent']
  },
  {
    id: 'bourou',
    term: 'Bourou',
    phonetic: '/bu.ʁu/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Pain (notamment la baguette de pain consommée au petit déjeuner ou avec des brochettes).',
    frenchTranslation: 'Pain, baguette.',
    originLanguage: 'Dioula (Burukisi / Bourou)',
    examples: [
      {
        nouchi: "Va acheter deux bourous avec du garba chez le boutiquier.",
        french: "Va acheter deux baguettes de pain avec du poisson et de l'attiéké chez le commerçant."
      }
    ],
    synonyms: ['Pain', 'Baguette'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Nourriture', 'Repas']
  },
  {
    id: 'brouteur',
    term: 'Brouteur',
    phonetic: '/bʁu.tœʁ/',
    grammaticalCategory: 'Nom masculin',
    definition: "Cybercriminel ou escroc opérant sur Internet (arnaques sentimentales, fausses transactions). Mot entré au Petit Robert.",
    frenchTranslation: "Cyber-escroc, arnaqueur sur Internet.",
    originLanguage: 'Français métaphorique ivoirien',
    etymologyDetails: "Métaphore du mouton qui broute l'herbe sans se soucier du propriétaire; entré au dictionnaire Le Robert en 2023.",
    examples: [
      {
        nouchi: "La police scientifique a démantelé un réseau de brouteurs dans la commune.",
        french: "La police spécialisée a arrêté un réseau de cyber-arnaqueurs dans la commune."
      }
    ],
    synonyms: ['Arnaqueur', 'Scammer', 'Piqueur de réseau'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Robert',
    officialYear: '2023',
    tags: ['Cybercriminalité', 'Robert', 'Société']
  },
  {
    id: 'broutage',
    term: 'Broutage',
    phonetic: '/bʁu.taʒ/',
    grammaticalCategory: 'Nom masculin',
    definition: "Activité illégale de cyber-escroquerie en ligne.",
    frenchTranslation: "Cyber-arnaque, escroquerie sur le web.",
    originLanguage: 'Nouchi dérivé de Brouteur',
    examples: [
      {
        nouchi: "Il a abandonné le broutage pour lancer un commerce honnête.",
        french: "Il a arrêté les cyber-arnaques pour ouvrir un commerce légal."
      }
    ],
    synonyms: ['Arnaque web', 'Scamming'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Internet', 'Droit', 'Argot']
  },

  // --- C ---
  {
    id: 'ca-ne-ment-pas',
    term: 'Ça ne ment pas',
    phonetic: '/sa nə mɑ̃ pa/',
    grammaticalCategory: 'Formule d’affirmation',
    definition: "Expression utilisée pour appuyer une vérité incontestable, un fait avéré ou une évidence absolue.",
    frenchTranslation: "C'est indiscutable, c'est la pure vérité, aucun doute là-dessus.",
    literalMeaning: "La réalité ne ment jamais.",
    originLanguage: 'Français ivoirien',
    examples: [
      {
        nouchi: "Le gars a beaucoup travaillé, sa réussite là, ça ne ment pas !",
        french: "Il a énormément travaillé, son succès est incontestable !"
      }
    ],
    synonyms: ['Gbê', 'C’est clair', 'C’est le terrain qui commande'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Vérité', 'Expression', 'Validation']
  },
  {
    id: 'cargo',
    term: 'Cargo',
    phonetic: '/kaʁ.ɡo/',
    grammaticalCategory: 'Nom masculin',
    definition: "Fourgon de police cellulaire ou camionnette des forces de l'ordre utilisée pour les patrouilles et arrestations.",
    frenchTranslation: 'Fourgon de police, panier à salade.',
    originLanguage: 'Français réapproprié',
    examples: [
      {
        nouchi: "Le cargo de la police a tourné au carrefour, tout le monde est resté tranquille.",
        french: "Le fourgon de police a patrouillé au carrefour, tout le monde s'est calmé."
      }
    ],
    synonyms: ['Panier à salade', 'Camion de flics'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Classique',
    tags: ['Police', 'Sécurité', 'Véhicule']
  },
  {
    id: 'chicooter',
    term: 'Chicotter',
    phonetic: '/ʃi.kɔ.te/',
    grammaticalCategory: 'Verbe transitif',
    definition: "Frapper avec une chicotte (fouet), corriger physiquement ou, par métaphore, battre largement un adversaire dans une compétition sportive.",
    frenchTranslation: 'Fouetter, corriger, infliger une sévère défaite.',
    originLanguage: 'Français colonial & Portugais (Chicote : fouet)',
    examples: [
      {
        nouchi: "Les Éléphants ont chicotté leur adversaire 3 à 0 en finale !",
        french: "L'équipe de Côte d'Ivoire a battu sèchement son adversaire 3-0 en finale !"
      }
    ],
    synonyms: ['Daba', 'Laler', 'Mettre la fessée', 'Corriger'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Sport', 'Victoire', 'Action']
  },
  {
    id: 'coco',
    term: 'Côcô',
    phonetic: '/ko.ko/',
    grammaticalCategory: 'Verbe intransitif / Nom',
    definition: "Quémander avec insistance, demander de l'argent ou des faveurs matérielles à répétition.",
    frenchTranslation: "Quémander, gratter de l'argent, mendier poliment.",
    originLanguage: 'Dioula / Onomatopée',
    examples: [
      {
        nouchi: "Chaque fin de mois, il vient côcô chez son oncle.",
        french: "Chaque fin de mois, il vient quémander un peu d'argent chez son oncle."
      }
    ],
    synonyms: ['Taper', 'Gratter', 'Demander soutra'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Argent', 'Entraide', 'Demande']
  },
  {
    id: 'cocota',
    term: 'Côcôta',
    phonetic: '/ko.ko.ta/',
    grammaticalCategory: 'Nom masculin',
    definition: "Personne qui a l'habitude de quémander continuellement auprès de son entourage sans jamais rien apporter en retour.",
    frenchTranslation: 'Pique-assiette, quémandeur régulier, parasite.',
    originLanguage: 'Nouchi dérivé de Côcô',
    examples: [
      {
        nouchi: "Celui-là c'est un vrai côcôta, il ne paie jamais son verre.",
        french: "Celui-là est un vrai pique-assiette, il n'offre jamais sa tournée."
      }
    ],
    synonyms: ['Pique-assiette', 'Tapeur'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Relations', 'Caractère']
  },
  {
    id: 'cohan',
    term: 'Cohan',
    phonetic: '/ko.ɑ̃/',
    grammaticalCategory: 'Adverbe de manière',
    definition: 'De cette manière précise, comme cela, ainsi.',
    frenchTranslation: 'Comme ça, de cette façon.',
    originLanguage: "Dioula (K'o tan / Tan : ainsi)",
    examples: [
      {
        nouchi: "Fais le travail cohan, c'est comme ça qu'on réussit !",
        french: "Fais le travail de cette manière, c'est ainsi qu'on réussit !"
      }
    ],
    synonyms: ['Comme ça', 'De cette façon'],
    category: 'expressions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Grammaire', 'Expression']
  },
  {
    id: 'col-blanc',
    term: 'Col blanc',
    phonetic: '/kɔl blɑ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: "Surnom donné à certaines bouteilles de bière ou de vin local (comme la Flag ou le vin de table) à col blanc.",
    frenchTranslation: 'Bière ou bouteille de boisson de marque.',
    originLanguage: 'Français imagé',
    examples: [
      {
        nouchi: "Garçon, envoie-nous deux cols blancs bien glacés !",
        french: "Serveur, apporte-nous deux bières bien fraîches !"
      }
    ],
    synonyms: ['Power', 'Bière', 'Mousse'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Maquis', 'Boisson', 'Sortie']
  },
  {
    id: 'cra-cra',
    term: 'Cra-cra',
    phonetic: '/kʁa kʁa/',
    grammaticalCategory: 'Adjectif / Nom',
    definition: "Situation tendue, complexe, périlleuse ou difficile à démêler financièrement ou socialement.",
    frenchTranslation: 'Dur, tendu, très compliqué, situation rude.',
    originLanguage: 'Onomatopée nouchi',
    examples: [
      {
        nouchi: "Ce mois-ci les finances sont cra-cra mais on tient bon.",
        french: "Ce mois-ci le budget est très serré mais on garde le moral."
      }
    ],
    synonyms: ['Chaud', 'Tendu', 'Compliqué'],
    category: 'qualificatifs',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Difficulté', 'Vie', 'Économie']
  },

  // --- D ---
  {
    id: 'daba',
    term: 'Daba',
    phonetic: '/da.ba/',
    grammaticalCategory: 'Verbe transitif / Nom',
    definition: "Manger copieusement, se restaurer avec appétit, ou dans un contexte pugilistique, asséner des coups lors d'une bagarre.",
    frenchTranslation: 'Manger (ou frapper selon le contexte).',
    originLanguage: 'Langues akan / mandingue',
    examples: [
      {
        nouchi: "On va daba un bon plat d'attiéké garba au maquis.",
        french: "On va manger un délicieux plat d'attiéké au thon frit au restaurant."
      },
      {
        nouchi: "Si tu t'approches trop, je vais te daba !",
        french: "Si tu t'approches trop près, je vais te frapper !"
      }
    ],
    synonyms: ['Manger', 'Poto', 'Enfourner', 'Corriger'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Nourriture', 'Cuisine', 'Polysémique']
  },
  {
    id: 'dabali',
    term: 'Dabali',
    phonetic: '/da.ba.li/',
    grammaticalCategory: 'Nom masculin',
    definition: 'La nourriture, le repas, le festin ou les vivres préparés.',
    frenchTranslation: 'Nourriture, repas, pitance.',
    originLanguage: 'Dioula / Nouchi',
    examples: [
      {
        nouchi: "Le dabali de ce restaurant est trop doux !",
        french: "Le repas de ce restaurant est délicieux !"
      }
    ],
    synonyms: ['Fangban', 'Manger', 'Repas'],
    category: 'transport_lieux',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Gastronomie', 'Nourriture']
  },
  {
    id: 'dendjo',
    term: 'Dendjô',
    phonetic: '/dɛn.dʒo/',
    grammaticalCategory: 'Verbe transitif / intransitif',
    definition: 'Comprendre clairement un message, saisir le sous-entendu, piger une subtilité.',
    frenchTranslation: 'Comprendre, saisir, piger.',
    originLanguage: 'Dioula (Dendon / Dendjo)',
    examples: [
      {
        nouchi: "Est-ce que tu as dendjô ce que le vieux père a expliqué ?",
        french: "Est-ce que tu as bien compris ce que l'aîné t'a expliqué ?"
      }
    ],
    synonyms: ['Piger', 'Capter', 'Comprendre'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Intelligence', 'Communication']
  },
  {
    id: 'deux-poches',
    term: 'Deux poches',
    phonetic: '/dø pɔʃ/',
    grammaticalCategory: 'Nom masculin',
    definition: "Homme mûr ayant atteint la quarantaine (40 ans), faisant référence métaphorique à l'âge et à la maturité sociale.",
    frenchTranslation: 'Homme quadragénaire (environ 40 ans).',
    originLanguage: 'Français argotique imagé',
    examples: [
      {
        nouchi: "C'est un deux poches respecté dans tout le quartier.",
        french: "C'est un quadragénaire respecté dans tout le quartier."
      }
    ],
    synonyms: ['Quadragénaire', 'Vieux père'],
    category: 'personnes',
    difficultyLevel: 'expert',
    officialStatus: 'Classique',
    tags: ['Âge', 'Société', 'Génération']
  },
  {
    id: 'dibi-dibi',
    term: 'Dibi-dibi',
    phonetic: '/di.bi di.bi/',
    grammaticalCategory: 'Adjectif / Nom',
    definition: 'Chose ou comportement louche, suspect, fait en cachette dans l’obscurité ou de manière peu claire.',
    frenchTranslation: 'Louche, suspect, douteux, manigance en douce.',
    originLanguage: 'Dioula (Dibi : obscurité/ombre)',
    examples: [
      {
        nouchi: "Je n'aime pas tes affaires de dibi-dibi là, sois transparent !",
        french: "Je n'aime pas tes manigances suspectes, sois franc et clair !"
      }
    ],
    synonyms: ['Louche', 'Douteux', 'En cachette'],
    category: 'qualificatifs',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Méfiance', 'Caractère']
  },
  {
    id: 'digba',
    term: 'Digba',
    phonetic: '/diɡ.ba/',
    grammaticalCategory: 'Adjectif / Nom',
    definition: 'Homme très corpulent, imposant, balèze ou costaud.',
    frenchTranslation: 'Balèze, costaud, imposant.',
    originLanguage: 'Langues mandées / Bété',
    examples: [
      {
        nouchi: "Le nouveau garde du corps est digba !",
        french: "Le nouveau garde du corps est carrément balèze !"
      }
    ],
    synonyms: ['Agbolo', 'Bélé bélé', 'Gbôlôzailli'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Physique', 'Force']
  },
  {
    id: 'dindin',
    term: 'Dindin',
    phonetic: '/dɛ̃.dɛ̃/',
    grammaticalCategory: 'Verbe transitif',
    definition: 'Regarder fixement du coin de l’œil, lorgner, surveiller discrètement ou observer avec convoitise.',
    frenchTranslation: 'Lorgner, reluquer, regarder en douce, épier.',
    originLanguage: 'Onomatopée nouchi',
    examples: [
      {
        nouchi: "Pourquoi tu dindin le téléphone de ton voisin comme ça ?",
        french: "Pourquoi reluques-tu discrètement le téléphone de ton voisin ainsi ?"
      }
    ],
    synonyms: ['Reluquer', 'Épier', 'Lorgner'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Regard', 'Curiosité']
  },
  {
    id: 'dja',
    term: 'Dja',
    phonetic: '/dʒa/',
    grammaticalCategory: 'Verbe transitif',
    definition: "Tuer au sens propre, ou au figuré impressionner profondément, faire mourir de rire, ou séduire totalement.",
    frenchTranslation: 'Tuer, achever, ou épater complètement.',
    originLanguage: 'Dioula (Dja / Fa : tuer)',
    examples: [
      {
        nouchi: "Sa blague m'a dja de rire !",
        french: "Sa plaisanterie m'a fait mourir de rire !"
      }
    ],
    synonyms: ['Mourou-mourou', 'Tuer', 'Impressionner'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Action', 'Humour', 'Intensité']
  },
  {
    id: 'djanterman',
    term: 'Djanterman',
    phonetic: '/dʒɑ̃.tɛʁ.man/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Homme élégant, galant, toujours bien habillé et courtois avec les femmes.',
    frenchTranslation: 'Gentleman, homme raffiné et élégant.',
    originLanguage: "Anglais (Gentleman) adapté à l'accent nouchi",
    examples: [
      {
        nouchi: "Ce djo se comporte en vrai djanterman avec sa chérie.",
        french: "Ce garçon se conduit en véritable gentleman avec sa compagne."
      }
    ],
    synonyms: ['Zango', 'Choco', 'Gentleman'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Élégance', 'Séduction', 'Style']
  },
  {
    id: 'djantou',
    term: 'Djantra',
    phonetic: '/dʒɑ̃.tʁa/',
    grammaticalCategory: 'Nom féminin / Invective',
    definition: 'Femme aux mœurs légères ou personne qui mène une vie nocturne débridée.',
    frenchTranslation: 'Fille de mauvaise vie, prostituée.',
    originLanguage: 'Dioula (Janturu)',
    examples: [
      {
        nouchi: "Il a évité les mauvaises fréquentations avec les djantras de la rue.",
        french: "Il a évité de fréquenter les filles de mauvaise vie de la rue."
      }
    ],
    synonyms: ['Djandjou', 'Kpôclé'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Nuit', 'Société']
  },
  {
    id: 'dje',
    term: 'Djê',
    phonetic: '/dʒe/',
    grammaticalCategory: 'Nom masculin (invariable)',
    definition: "L'argent, la monnaie, les billets de banque ou la richesse financière en général.",
    frenchTranslation: "L'argent, le fric, le pèze, les sous.",
    originLanguage: 'Dioula (Jɛ : argent blanc/métal)',
    etymologyDetails: "L'un des mots les plus employés de tout le lexique nouchi.",
    examples: [
      {
        nouchi: "Quand le djê entre dans la poche, le cœur est tranquille !",
        french: "Quand l'argent arrive dans les poches, on a l'esprit serein !"
      }
    ],
    synonyms: ['Pierre', 'Zoto', 'Jetons', 'Fric'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Incontournable', 'Finance']
  },
  {
    id: 'djo',
    term: 'Djo',
    phonetic: '/dʒo/',
    grammaticalCategory: 'Nom masculin',
    definition: "Le gars, l'homme, le jeune homme, le frère, le compagnon ou l'ami.",
    frenchTranslation: "Le gars, le mec, le type, le frère.",
    originLanguage: "Anglais (Joe) & Création urbaine d'Abidjan",
    examples: [
      {
        nouchi: "Le djo qui habite à côté de chez moi est très travailleur.",
        french: "Le gars qui habite à côté de chez moi est très travailleur."
      }
    ],
    synonyms: ['Môgô', 'Gars', 'Frère', 'Type'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Individu', 'Incontournable', 'Amitié']
  },
  {
    id: 'djossi',
    term: 'Djossi',
    phonetic: '/dʒɔ.si/',
    grammaticalCategory: 'Nom masculin',
    definition: "Le travail, le gagne-pain, l'emploi rémunéré, le petit boulot ou l'activité quotidienne.",
    frenchTranslation: 'Le travail, le boulot, le taf, l’emploi.',
    originLanguage: 'Français argotique (Job) + suffixe africain -ssi',
    examples: [
      {
        nouchi: "Je pars à mon djossi tous les matins dès 6 heures.",
        french: "Je me rends à mon travail tous les matins dès 6 heures."
      }
    ],
    synonyms: ['Boulot', 'Gagne-pain', 'Taf', 'Brobroli'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Travail', 'Emploi', 'Incontournable']
  },
  {
    id: 'drap',
    term: 'Drap',
    phonetic: '/dʁap/',
    grammaticalCategory: 'Nom masculin',
    definition: "Problème majeur, ennui grave, complication inattendue ('Y'a drap !' = il y a un gros souci).",
    frenchTranslation: 'Gros problème, embrouille, complication sérieuse.',
    originLanguage: 'Français argotique dévié',
    examples: [
      {
        nouchi: "Attention, y'a drap au carrefour, les policiers contrôlent tout le monde !",
        french: "Attention, il y a de gros ennuis au carrefour, la police contrôle tout le monde !"
      }
    ],
    synonyms: ['Gnaga', 'Gros problème', 'Embrouille'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Alerte', 'Problème', 'Expression']
  },

  // --- E ---
  {
    id: 'enjaillement',
    term: 'Enjaillement',
    phonetic: '/ɑ̃.ʒaj.mɑ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: "L'action de s'amuser, la réjouissance, la fête intense, l'euphorie partagée et la joie de vivre.",
    frenchTranslation: 'Fête, ambiance festive, amusement total, réjouissance.',
    originLanguage: 'Anglais (Enjoy) + suffixe français -ment',
    examples: [
      {
        nouchi: "Ce weekend à Grand-Bassam, c'était l'enjaillement total !",
        french: "Ce weekend à Grand-Bassam, c'était la fête et l'amusement complets !"
      }
    ],
    synonyms: ['Fête', 'Ambiance', 'Kiff', 'Show'],
    category: 'musique_culture',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Fête', 'Joie', 'Culture']
  },
  {
    id: 'etre-dai',
    term: 'Être daï',
    phonetic: '/ɛtʁ daj/',
    grammaticalCategory: 'Locution verbale',
    definition: 'Être complètement ivre, saoul après avoir trop bu lors d’une célébration.',
    frenchTranslation: 'Être ivre, être saoul, éméché.',
    originLanguage: 'Anglais (Die / Dead drunk)',
    examples: [
      {
        nouchi: "Après trois verres de koutoukou, le gars était complètement daï.",
        french: "Après trois verres d'alcool fort, il était totalement ivre."
      }
    ],
    synonyms: ['Perdre réseau', 'Être plein', 'Être bourré'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Boisson', 'Nuit', 'État']
  },

  // --- F ---
  {
    id: 'facon-facon',
    term: 'Façon façon',
    phonetic: '/fa.sɔ̃ fa.sɔ̃/',
    grammaticalCategory: 'Adjectif / Adverbe',
    definition: 'Très bizarre, douteux, anormal ou difficile à qualifier de manière saine.',
    frenchTranslation: 'Très bizarre, suspect, étrange, peu recommandable.',
    originLanguage: 'Redoublement expressif nouchi',
    examples: [
      {
        nouchi: "Le comportement de ce type est devenu façon façon ces derniers temps.",
        french: "L'attitude de cet individu est devenue très suspecte ces derniers temps."
      }
    ],
    synonyms: ['Bizarre', 'Dibi-dibi', 'Louche'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Comportement', 'Méfiance']
  },
  {
    id: 'faire-charnier',
    term: 'Faire charnier',
    phonetic: '/fɛʁ ʃaʁ.nje/',
    grammaticalCategory: 'Locution verbale',
    definition: "Acheter un très grand nombre de bouteilles de boissons pour les aligner ostensiblement sur la table d'un maquis lors d'une fête.",
    frenchTranslation: "Remplir sa table de discothèque ou de maquis d'innombrables bouteilles.",
    originLanguage: 'Français métaphorique nouchi',
    examples: [
      {
        nouchi: "Pour son anniversaire, le boucantier a fait charnier au club.",
        french: "Pour son anniversaire, le fêtard a commandé une montagne de bouteilles au club."
      }
    ],
    synonyms: ['Boucanter', 'Commander en gros', 'Faire farot'],
    category: 'musique_culture',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Classique',
    tags: ['Fête', 'Coupé-Décalé', 'Maquis']
  },
  {
    id: 'faler',
    term: 'Faler',
    phonetic: '/fa.le/',
    grammaticalCategory: 'Verbe transitif',
    definition: 'Fumer une cigarette ou du tabac.',
    frenchTranslation: 'Fumer.',
    originLanguage: 'Argot Abidjan',
    examples: [
      {
        nouchi: "Il est sorti dehors pour faler une cigarette.",
        french: "Il est sorti à l'extérieur pour fumer une cigarette."
      }
    ],
    synonyms: ['Crapoter', 'Fumer'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Habitude', 'Tabac']
  },
  {
    id: 'fangban',
    term: 'Fangban',
    phonetic: '/fɑ̃ɡ.bɑ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: 'La nourriture, le manger, les provisions alimentaires quotidiennes.',
    frenchTranslation: 'Nourriture, manger, provisions.',
    originLanguage: 'Langues akan',
    examples: [
      {
        nouchi: "Apporte le fangban, la faim commence à me fatiguer !",
        french: "Apporte le repas, la faim commence à me tenailler !"
      }
    ],
    synonyms: ['Dabali', 'Repas', 'Bouffe'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Nourriture', 'Vie']
  },
  {
    id: 'farot',
    term: 'Farot',
    phonetic: '/fa.ʁo/',
    grammaticalCategory: 'Nom masculin',
    definition: "L'art de frimer, de faire l'important, d'afficher son style ou de montrer sa supériorité matérielle.",
    frenchTranslation: 'Frime, ostentation, vantardise avec panache.',
    originLanguage: 'Création nouchi urbaine',
    examples: [
      {
        nouchi: "Il a mis ses plus beaux habits juste pour faire le farot au mariage.",
        french: "Il a sorti ses plus beaux habits uniquement pour parader au mariage."
      }
    ],
    synonyms: ['Pose', 'Boucan', 'Frime', 'Show'],
    category: 'musique_culture',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Style', 'Sape', 'Attitude']
  },
  {
    id: 'fata',
    term: 'Fata',
    phonetic: '/fa.ta/',
    grammaticalCategory: 'Verbe transitif / intransitif',
    definition: 'Tomber par terre ou, dans le commerce de rue, écouler/vendre une marchandise.',
    frenchTranslation: 'Tomber, chuter (ou liquider/vendre).',
    originLanguage: 'Dioula (Fata : tomber)',
    examples: [
      {
        nouchi: "Le petit a couru trop vite et il a fait une grosse fatali.",
        french: "L'enfant a couru trop vite et a fait une lourde chute."
      }
    ],
    synonyms: ['Tomber', 'Chuter', 'Liquider'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Action', 'Mouvement']
  },
  {
    id: 'floco',
    term: 'Flôcô',
    phonetic: '/flo.ko/',
    grammaticalCategory: 'Nom masculin / Verbe',
    definition: 'Mensonge éhonté, bobard, invention sans fondement ou fait de mentir.',
    frenchTranslation: 'Mensonge, bobard, racontar.',
    originLanguage: 'Dioula / Argot ivoirien',
    examples: [
      {
        nouchi: "Ne crois pas à ses histoires, c'est du pur flôcô !",
        french: "Ne crois pas à ce qu'il raconte, ce ne sont que des bobards !"
      }
    ],
    synonyms: ['Dôhi', 'Mensonge', 'Bobard', 'Mytho'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Vérité', 'Parole']
  },
  {
    id: 'fraya',
    term: 'Fraya',
    phonetic: '/fʁa.ja/',
    grammaticalCategory: 'Verbe intransitif',
    definition: 'Prendre la fuite à toute vitesse, s’échapper rapidement pour éviter un danger.',
    frenchTranslation: 'Fuir en courant, déguerpir, détaler.',
    originLanguage: 'Anglais (Fly away) déformé en nouchi',
    examples: [
      {
        nouchi: "Quand la pluie a commencé à tomber fort, tout le monde a fraya !",
        french: "Quand l'averse a éclaté violemment, tout le monde s'est enfui à l'abri !"
      }
    ],
    synonyms: ['Beou', 'Pantougouler', 'Prendre ses jambes à son cou'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Fuite', 'Vitesse']
  },

  // --- G ---
  {
    id: 'gaou',
    term: 'Gaou',
    phonetic: '/ɡa.u/',
    grammaticalCategory: 'Nom masculin / Adjectif',
    definition: "Personne naïve, provinciale, crédule qui ne maîtrise pas les codes de la rue abidjanaise. Rendu mondialement célèbre par Magic System ('Premier Gaou').",
    frenchTranslation: 'Personne naïve, plouc, dupe, provincial non averti.',
    originLanguage: 'Bété / Dioula (Gaou : naïf)',
    etymologyDetails: "Immense succès planétaire en 1999 avec le tube 'Premier Gaou' du groupe Magic System.",
    examples: [
      {
        nouchi: "Le premier gaou n'est pas gaou, c'est le deuxième gaou qui est gnata !",
        french: "Se faire avoir une première fois arrive à tout le monde, mais se faire duper deux fois est impardonnable !"
      }
    ],
    synonyms: ['Naïf', 'Plouc', 'Gnakoué', 'Gnata', 'Borlaï'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Incontournable', 'Musique', 'Magic System', 'Société']
  },
  {
    id: 'gbaha',
    term: 'Gbahé',
    phonetic: '/ɡba.e/',
    grammaticalCategory: 'Verbe transitif',
    definition: 'Gronder sévèrement, réprimander vertement, sermonner ou donner des conseils fermes.',
    frenchTranslation: 'Gronder, sermonner, admonester.',
    originLanguage: 'Bété / Langues kru',
    examples: [
      {
        nouchi: "Le père de famille a gbahé ses enfants pour leur retard.",
        french: "Le père de famille a réprimandé ses enfants pour leur retard."
      }
    ],
    synonyms: ['Sermonner', 'Gronder', 'Cadencer'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Éducation', 'Famille']
  },
  {
    id: 'gbai',
    term: 'Gbaï',
    phonetic: '/ɡba.i/',
    grammaticalCategory: 'Nom masculin / Interjection',
    definition: "La pure vérité sans détour, le conseil d'or, la franchise absolue ('Donner le gbaï' = dire les vérités en face).",
    frenchTranslation: 'La vérité crue, le conseil franc et direct.',
    originLanguage: 'Dioula / Bété',
    examples: [
      {
        nouchi: "Assieds-toi, je vais te donner le gbaï sur ta situation.",
        french: "Assieds-toi, je vais te dire franchement la vérité sur ta situation."
      }
    ],
    synonyms: ['Gbê', 'La vérité', 'La franchise'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Sagesse', 'Vérité']
  },
  {
    id: 'gbaka',
    term: 'Gbaka',
    phonetic: '/ɡba.ka/',
    grammaticalCategory: 'Nom masculin',
    definition: "Minibus de transport en commun populaire à Abidjan, célèbre pour ses apprentis cascadeurs ('apoutchous' ou 'balanceurs') et son ambiance survoltée.",
    frenchTranslation: 'Minibus de transport en commun à Abidjan.',
    originLanguage: 'Dioula (Gbaka : véhicule de charge)',
    examples: [
      {
        nouchi: "On a sauté dans le gbaka pour aller d'Adjamé à Yopougon.",
        french: "On est montés dans le minibus pour relier Adjamé à Yopougon."
      }
    ],
    synonyms: ['Minibus', 'Wôrô-wôrô', 'Transport babi'],
    category: 'transport_lieux',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Transport', 'Abidjan', 'Incontournable']
  },
  {
    id: 'gbe',
    term: 'Gbê',
    phonetic: '/ɡbɛ/',
    grammaticalCategory: 'Nom masculin',
    definition: "La vérité pure, évidente et sans fard. Utilisé dans la formule culte 'Le gbê est mieux que le flôcô' (La vérité vaut mieux que le mensonge).",
    frenchTranslation: 'La vérité indiscutable, la réalité nue.',
    originLanguage: 'Dioula (Jɛ / Gbɛ : clair, limpide, vrai)',
    examples: [
      {
        nouchi: "Moi je ne te mens pas, je te parle le gbê !",
        french: "Moi je ne te mens pas, je te dis toute la vérité !"
      }
    ],
    synonyms: ['Gbaï', 'Vérité', 'Transparence'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Valeur', 'Philosophie', 'Incontournable']
  },
  {
    id: 'gbess',
    term: 'Gbêss',
    phonetic: '/ɡbɛs/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Pièce ou somme de 500 Francs CFA.',
    frenchTranslation: '500 Francs CFA.',
    originLanguage: 'Nouchi argot monétaire',
    examples: [
      {
        nouchi: "Prête-moi un gbêss pour acheter ma recharge téléphonique.",
        french: "Prête-moi 500 francs CFA pour recharger mon forfait."
      }
    ],
    synonyms: ['500 CFA', 'Pièce de 500'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Argent', 'CFA']
  },
  {
    id: 'gbonhon',
    term: 'Gbonhon (ou Gbon)',
    phonetic: '/ɡbɔ̃.ɔ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Billet de 5 000 Francs CFA.',
    frenchTranslation: '5 000 Francs CFA.',
    originLanguage: 'Dioula',
    examples: [
      {
        nouchi: "Il a sorti un gbonhon tout neuf pour régler l'addition.",
        french: "Il a sorti un billet de 5 000 francs CFA neuf pour payer la note."
      }
    ],
    synonyms: ['Gbon', '5 000 CFA', 'Billet vert'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Monnaie']
  },
  {
    id: 'gloglo',
    term: 'Glôglô',
    phonetic: '/ɡlo.ɡlo/',
    grammaticalCategory: 'Nom masculin',
    definition: "Ruelles tortueuses, bas quartiers, recoins secrets ou cours communes cachées des quartiers populaires.",
    frenchTranslation: 'Ruelle cachée, dédale de bas quartier, coupe-gorge.',
    originLanguage: 'Langues akan / Baoulé',
    examples: [
      {
        nouchi: "Pour éviter les embouteillages, le taxi a pris les glôglôs d'Adjamé.",
        french: "Pour esquiver les bouchons, le taxi est passé par les ruelles secrètes d'Adjamé."
      }
    ],
    synonyms: ['Couloir', 'Ruelle', 'Bas quartier'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Classique',
    tags: ['Abidjan', 'Lieux', 'Orientation']
  },
  {
    id: 'gnaga',
    term: 'Gnaga',
    phonetic: '/ɲa.ɡa/',
    grammaticalCategory: 'Nom féminin / masculin',
    definition: "Bagarre violente, échauffourée, grosse bagarre de rue ou confrontation tendue.",
    frenchTranslation: 'Bagarre, rixe, baston, échauffourée.',
    originLanguage: 'Dioula / Langues kru',
    examples: [
      {
        nouchi: "Il y a eu une grosse gnaga après le match de football.",
        french: "Il y a eu une vive bagarre après la rencontre de football."
      }
    ],
    synonyms: ['Baston', 'Magatapé', 'Rixe'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Conflit', 'Action', 'Rue']
  },
  {
    id: 'gnakoue',
    term: 'Gnakoué',
    phonetic: '/ɲa.kwe/',
    grammaticalCategory: 'Nom / Adjectif',
    definition: 'Personne ignorante, stupide ou facilement influençable.',
    frenchTranslation: 'Ignorant, imbécile, niais.',
    originLanguage: 'Langues kru / Bété',
    examples: [
      {
        nouchi: "Ne fais pas le gnakoué, réfléchis avant d'agir !",
        french: "Ne fais pas l'ignorant, réfléchis avant de prendre une décision !"
      }
    ],
    synonyms: ['Gnata', 'Gaou', 'Laga laga'],
    category: 'qualificatifs',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Insulte légère', 'Caractère']
  },
  {
    id: 'gnanhi',
    term: 'Gnanhi',
    phonetic: '/ɲa.ni/',
    grammaticalCategory: 'Nom féminin',
    definition: "Femme d'âge mûr, élégante et aisée financièrement, qui fréquente des hommes plus jeunes ('cougar' ivoirienne).",
    frenchTranslation: "Femme mûre aisée sortant avec de jeunes hommes (cougar).",
    originLanguage: 'Akan / Baoulé',
    examples: [
      {
        nouchi: "Le jeune djo roule en grosse caisse grâce à sa gnanhi.",
        french: "Le jeune homme roule dans une belle voiture grâce à sa compagne plus âgée."
      }
    ],
    synonyms: ['Cougar', 'Femme d’affaires'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Classique',
    tags: ['Amour', 'Société', 'Génération']
  },
  {
    id: 'go',
    term: 'Go',
    phonetic: '/ɡo/',
    grammaticalCategory: 'Nom féminin',
    definition: "Une fille, une jeune femme, une petite amie ou une compagne. Terme officiel entré au Petit Robert.",
    frenchTranslation: 'Une fille, une demoiselle, une copine, une petite amie.',
    originLanguage: "Anglais (Girl) / Langues africaines",
    etymologyDetails: "Ultra populaire dans toute la francophonie africaine et urbaine européenne; validé au dictionnaire Le Robert en 2023.",
    examples: [
      {
        nouchi: "La go là est trop jolie, elle a un style incroyable !",
        french: "Cette fille est magnifique, elle a une classe incroyable !"
      }
    ],
    synonyms: ['Mousso', 'Gnahy', 'Chérie', 'Demoiselle'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Robert',
    officialYear: '2023',
    tags: ['Femme', 'Amour', 'Robert', 'Incontournable']
  },
  {
    id: 'goumin',
    term: 'Goumin',
    phonetic: '/ɡu.mɛ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: "Le chagrin d'amour intense, la déception amoureuse dévastatrice suite à une rupture ou une infidélité.",
    frenchTranslation: 'Chagrin d’amour violent, déception amoureuse cuisante.',
    originLanguage: 'Dioula (Gumin / Gounmin : tristesse profonde)',
    etymologyDetails: "Devenu l'un des thèmes majeurs de la musique pop ivoirienne et de la jeunesse africaine.",
    examples: [
      {
        nouchi: "Le pauvre djo a pris un goumin terrible quand sa go l'a quitté.",
        french: "Le pauvre garçon a subi un violent chagrin d'amour quand sa copine est partie."
      }
    ],
    synonyms: ['Cœur brisé', 'Déception amoureuse'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Amour', 'Émotion', 'Musique', 'Incontournable']
  },
  {
    id: 'groto',
    term: 'Groto',
    phonetic: '/ɡʁo.to/',
    grammaticalCategory: 'Nom masculin',
    definition: "Homme très influent, haut placé, nanti financièrement et respecté dans la société.",
    frenchTranslation: 'Homme riche, notable, magnat, ponte.',
    originLanguage: 'Français (Gros) + suffixe argotique -to',
    examples: [
      {
        nouchi: "Tous les gros ministres et les grotos d'Abidjan étaient présents à la cérémonie.",
        french: "Tous les grands ministres et les dignitaires fortunés d'Abidjan étaient présents."
      }
    ],
    synonyms: ['Notable', 'Homme riche', 'Boss', 'Grand patron'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Pouvoir', 'Argent', 'Société']
  },
  {
    id: 'grouilleur',
    term: 'Grouilleur',
    phonetic: '/ɡʁu.jœʁ/',
    grammaticalCategory: 'Nom masculin',
    definition: "Personne vaillante, courageuse et inventive qui se démène au quotidien pour gagner sa vie honnêtement par tous les moyens licites.",
    frenchTranslation: 'Débrouillard infatigable, travailleur acharné.',
    originLanguage: 'Français (Se grouiller) adapté en Côte d’Ivoire',
    examples: [
      {
        nouchi: "À Abidjan, tout le monde est un grouilleur, personne ne baisse les bras !",
        french: "À Abidjan, chacun est un battant débrouillard, nul ne baisse les bras !"
      }
    ],
    synonyms: ['Battant', 'Débrouillard', 'Guerrier'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Valeur', 'Travail', 'Résilience']
  },

  // --- K ---
  {
    id: 'kaba',
    term: 'Kaba',
    phonetic: '/ka.ba/',
    grammaticalCategory: 'Nom masculin',
    definition: "La prison, la maison d'arrêt ou la garde à vue.",
    frenchTranslation: 'Prison, cellule, pénitencier.',
    originLanguage: 'Langues locales ivoiriennes',
    examples: [
      {
        nouchi: "Le voleur a été attrapé et jeté au kaba direct.",
        french: "Le voleur a été appréhendé et conduit directement en prison."
      }
    ],
    synonyms: ['Prison', 'MACA (Maison d’arrêt)', 'Gnouf'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Droit', 'Lieux']
  },
  {
    id: 'ken',
    term: 'Ken',
    phonetic: '/kɛn/',
    grammaticalCategory: 'Nom masculin / Verbe',
    definition: "Une affaire, un deal, un plan de commerce, une opportunité ou, en verlan/français, l'acte intime.",
    frenchTranslation: 'Affaire, bon plan, deal (ou faire l’amour).',
    originLanguage: 'Argot mixte urbain',
    examples: [
      {
        nouchi: "J'ai un bon ken pour importer des marchandises.",
        french: "J'ai une excellente opportunité pour importer des marchandises."
      }
    ],
    synonyms: ['Deal', 'Affaire', 'Bon coup'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Commerce', 'Deal']
  },
  {
    id: 'kpakpato',
    term: 'Kpakpato',
    phonetic: '/kpak.pa.to/',
    grammaticalCategory: 'Nom masculin / féminin',
    definition: "Personne excessivement curieuse, bavarde, qui passe son temps à surveiller autrui et rapporter des ragots.",
    frenchTranslation: 'Commère, fouineur, colporteur de ragots, rapporteur.',
    originLanguage: 'Baoulé / Akan (Kpakpato : rapporteur)',
    examples: [
      {
        nouchi: "Ferme ta fenêtre si tu ne veux pas que les kpakpatos du quartier te filment !",
        french: "Ferme ta fenêtre si tu ne veux pas que les commères du quartier t'épient !"
      }
    ],
    synonyms: ['Fouine', 'Commère', 'Kongossa', 'Radio trottoir'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Caractère', 'Quartier', 'Incontournable']
  },
  {
    id: 'kpakpatoya',
    term: 'Kpakpatoya',
    phonetic: '/kpak.pa.to.ja/',
    grammaticalCategory: 'Nom masculin',
    definition: "L'art et la pratique des commérages de quartier et du colportage d'indiscrétions.",
    frenchTranslation: 'Commérages systématiques, colportage de potins.',
    originLanguage: 'Baoulé + suffixe abstrait -ya',
    examples: [
      {
        nouchi: "Le kpakpatoya détruit les amitiés, il vaut mieux s'en éloigner.",
        french: "Les commérages détruisent les amitiés, il vaut mieux s'en tenir à l'écart."
      }
    ],
    synonyms: ['Affairage', 'Kongossa', 'Ragots'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Société', 'Parole']
  },
  {
    id: 'kpata-kpata',
    term: 'Kpata-kpata',
    phonetic: '/kpa.ta kpa.ta/',
    grammaticalCategory: 'Adjectif / Interjection',
    definition: "Extrêmement joli, resplendissant, parfait, impeccable ou très soigné.",
    frenchTranslation: 'Magnifique, impeccable, au top, resplendissant.',
    originLanguage: 'Baoulé / Bété',
    examples: [
      {
        nouchi: "La décoration de la salle de fête est kpata-kpata !",
        french: "La décoration de la salle de réception est absolument magnifique !"
      }
    ],
    synonyms: ['Acloidahi', 'Zo', 'Choco', 'Parfait'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Beauté', 'Style', 'Incontournable']
  },
  {
    id: 'krika',
    term: 'Krika',
    phonetic: '/kʁi.ka/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Billet de 1 000 Francs CFA.',
    frenchTranslation: '1 000 Francs CFA.',
    originLanguage: 'Argot abidjanais',
    examples: [
      {
        nouchi: "Passe-moi deux krikas pour payer le carburant.",
        french: "Donne-moi deux mille francs CFA pour payer le carburant."
      }
    ],
    synonyms: ['Barre', '1000 CFA'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Monnaie']
  },

  // --- L ---
  {
    id: 'lale',
    term: 'Lalé',
    phonetic: '/la.le/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Téléphone portable, smartphone.',
    frenchTranslation: 'Téléphone portable.',
    originLanguage: 'Dioula (Lala : tenir en main)',
    examples: [
      {
        nouchi: "N'oublie pas ton lalé sur la table avant de sortir.",
        french: "N'oublie pas ton portable sur la table avant de quitter les lieux."
      }
    ],
    synonyms: ['Bigo', 'Cellulaire', 'Appareil'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Tech', 'Objets']
  },
  {
    id: 'laler',
    term: 'Laler',
    phonetic: '/la.le/',
    grammaticalCategory: 'Verbe transitif',
    definition: 'Gifler violemment, asséner une claque sonore au visage.',
    frenchTranslation: 'Gifler, flanquer une claque.',
    originLanguage: 'Onomatopée nouchi',
    examples: [
      {
        nouchi: "Il l'a laler direct sans même discuter !",
        french: "Il lui a asséné une gifle directe sans même parlementer !"
      }
    ],
    synonyms: ['Tolo', 'Gifler', 'Chicotter'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Conflit', 'Action']
  },
  {
    id: 'logobby',
    term: 'Logobby',
    phonetic: '/lo.ɡɔ.bi/',
    grammaticalCategory: 'Verbe transitif / Nom',
    definition: "Baratiner habilement, manipuler par la parole, tromper ou escroquer avec subtilité.",
    frenchTranslation: 'Baratiner, embobiner, manipuler par la parole.',
    originLanguage: 'Langues locales & Argot',
    examples: [
      {
        nouchi: "Le vendeur a essayé de me logobby avec ses faux arguments.",
        french: "Le commerçant a tenté de m'embobiner avec ses faux arguments."
      }
    ],
    synonyms: ['Flôcô', 'Embobiner', 'Arnaquer', 'Enfariner'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Parole', 'Ruse', 'Négociation']
  },

  // --- M ---
  {
    id: 'maga',
    term: 'Maga',
    phonetic: '/ma.ɡa/',
    grammaticalCategory: 'Verbe transitif',
    definition: 'Dérober discrètement, voler à la tire, chaparder des objets de valeur.',
    frenchTranslation: 'Voler, dérober, chaparder à la tire.',
    originLanguage: 'Dioula / Hausa',
    examples: [
      {
        nouchi: "Un pickpocket a voulu maga son portefeuille dans le bus.",
        french: "Un pickpocket a tenté de lui dérober son portefeuille dans le bus."
      }
    ],
    synonyms: ['Momoter', 'Voler', 'Piquer', 'Chouraver'],
    category: 'argent',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Rue', 'Sécurité']
  },
  {
    id: 'magatape',
    term: 'Magatapé',
    phonetic: '/ma.ɡa.ta.pe/',
    grammaticalCategory: 'Verbe transitif / Nom',
    definition: "Se battre à mains nues, rouer de coups un adversaire ou mener un combat acharné.",
    frenchTranslation: 'Se battre à coups de poing, rosser.',
    originLanguage: 'Nouchi hybride',
    examples: [
      {
        nouchi: "Ils se sont magatapé jusqu'à l'arrivée des vigiles.",
        french: "Ils se sont battus violemment jusqu'à l'arrivée des agents de sécurité."
      }
    ],
    synonyms: ['Gnaga', 'Se taper', 'Se boxer'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Combat', 'Rue']
  },
  {
    id: 'mogo',
    term: 'Môgô',
    phonetic: '/mɔ.ɡɔ/',
    grammaticalCategory: 'Nom masculin / féminin',
    definition: "Une personne, un individu, un être humain, ou affectueusement un ami, un compagnon fidèle ('Mon môgô sûr'). Mot pilier du Nouchi.",
    frenchTranslation: 'Une personne, un individu, un ami, un pote fidèle.',
    originLanguage: 'Dioula / Mandingue (Mɔgɔ : être humain/personne)',
    etymologyDetails: "Le mot le plus fondamental de la culture urbaine ivoirienne.",
    examples: [
      {
        nouchi: "Celui-là, c'est mon môgô sûr de Yopougon !",
        french: "Celui-là, c'est mon ami très proche et fiable de Yopougon !"
      }
    ],
    synonyms: ['Djo', 'Personne', 'Pote', 'Frangin'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Fondamental', 'Incontournable', 'Amitié', 'Société']
  },
  {
    id: 'mougou',
    term: 'Mougou',
    phonetic: '/mu.ɡu/',
    grammaticalCategory: 'Verbe transitif / intransitif',
    definition: "Faire l'amour, avoir une relation charnelle intime.",
    frenchTranslation: "Faire l'amour, coucher ensemble.",
    originLanguage: 'Dioula (Mugu : écraser/poudre/piler)',
    examples: [
      {
        nouchi: "Le chanteur a fait un son humoristique sur le mougou.",
        french: "L'artiste a composé un morceau plein d'humour sur les relations amoureuses."
      }
    ],
    synonyms: ['Pinkou', 'Gbêdê', 'Filar du jus'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Amour', 'Intimité']
  },

  // --- N ---
  {
    id: 'ne-prends-pas-ma-bouche-pour-manger-piment',
    term: 'Ne prends pas ma bouche pour manger piment',
    phonetic: '/nə pʁɑ̃ pa ma buʃ puʁ mɑ̃.ʒe pi.mɑ̃/',
    grammaticalCategory: 'Proverbe / Expression',
    definition: "Formule d'avertissement pour dire : 'Ne te sers pas de mes propos pour attaquer autrui ou créer des conflits à mon insu'.",
    frenchTranslation: 'Ne me mêle pas à tes critiques ou règlements de comptes.',
    literalMeaning: 'Ne mange pas du piment brûlant avec ma propre bouche.',
    originLanguage: 'Français ivoirien imagé',
    examples: [
      {
        nouchi: "Si tu veux insulter le patron, fais-le toi-même, mais ne prends pas ma bouche pour manger ton piment !",
        french: "Si tu veux t'en prendre au patron fais-le seul, ne m'utilise pas pour cautionner tes attaques !"
      }
    ],
    synonyms: ['Ne me mêle pas à ça', 'Laisse mon nom tranquille'],
    category: 'expressions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Classique',
    tags: ['Sagesse', 'Prudence', 'Proverbe']
  },
  {
    id: 'nouchi',
    term: 'Nouchi',
    phonetic: '/nu.ʃi/',
    grammaticalCategory: 'Nom masculin / Adjectif',
    definition: "Argot urbain hybride ivoirien né à Abidjan à la fin des années 70, devenu langue nationale véhiculaire et emblème culturel mondial. Littéralement 'poil de nez' ou moustache virile.",
    frenchTranslation: "Argot populaire ivoirien / voyou repenti / citadin branché d'Abidjan.",
    originLanguage: 'Dioula (Nou : nez + Chi : poil/moustache)',
    etymologyDetails: "Formé par la jeunesse des cinémas Roxy et El Mansour d'Adjamé dans les années 70 arborant une fine moustache.",
    examples: [
      {
        nouchi: "Le Nouchi est la véritable âme vivante des rues d'Abidjan.",
        french: "Le Nouchi constitue la véritable identité vivante des rues d'Abidjan."
      }
    ],
    synonyms: ['Argot ivoirien', 'Langue de Babi'],
    category: 'musique_culture',
    difficultyLevel: 'debutant',
    officialStatus: 'Larousse',
    officialYear: '2019',
    tags: ['Histoire', 'Origine', 'Identité', 'Incontournable']
  },

  // --- P ---
  {
    id: 'panneau',
    term: 'Panneau',
    phonetic: '/pa.no/',
    grammaticalCategory: 'Nom masculin',
    definition: "Grand bus de la compagnie publique de transport urbain SOTRA à Abidjan.",
    frenchTranslation: 'Autobus de ville, grand bus public.',
    originLanguage: 'Français argotique ivoirien',
    examples: [
      {
        nouchi: "Attends le panneau au terminus pour aller au Plateau.",
        french: "Attends le bus public au terminus pour rejoindre le quartier des affaires."
      }
    ],
    synonyms: ['SOTRA', 'Bus urbain', 'Balladur'],
    category: 'transport_lieux',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Transport', 'Abidjan']
  },
  {
    id: 'panneau-man',
    term: 'Panneau man',
    phonetic: '/pa.no man/',
    grammaticalCategory: 'Nom masculin',
    definition: "Voleur à la tire spécialisé dans les vols de portefeuilles ou téléphones dans les autobus bondés.",
    frenchTranslation: 'Pickpocket de transport en commun.',
    originLanguage: 'Nouchi hybride (Panneau + Man)',
    examples: [
      {
        nouchi: "Garde ton sac contre toi, il y a des panneau men dans le bus.",
        french: "Serre ton sac contre toi, il y a des pickpockets dans le bus."
      }
    ],
    synonyms: ['Deux-doigts', 'Pickpocket', 'Maga-man'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Sécurité', 'Transport']
  },
  {
    id: 'perdre-reseau',
    term: 'Perdre réseau',
    phonetic: '/pɛʁdʁ ʁe.zo/',
    grammaticalCategory: 'Locution verbale',
    definition: "Être complètement fauché financièrement ou, selon le contexte, être totalement ivre et perdre la mémoire.",
    frenchTranslation: "Être sans le sou / être ivre mort.",
    literalMeaning: 'Perdre le signal de connexion.',
    originLanguage: 'Métaphore technologique nouchi',
    examples: [
      {
        nouchi: "En fin de mois, le djo a perdu réseau, il mange seulement du gari.",
        french: "En fin de mois, il est complètement à sec, il se nourrit uniquement de farine de manioc."
      }
    ],
    synonyms: ['Tiasse', 'Moisi', 'À sec', 'Être daï'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Argent', 'État', 'Expression']
  },
  {
    id: 'pierre',
    term: 'Pierre',
    phonetic: '/pjɛʁ/',
    grammaticalCategory: 'Nom féminin',
    definition: "L'argent, les ressources financières solides.",
    frenchTranslation: 'L’argent, les fonds, la richesse.',
    originLanguage: 'Français argotique ivoirien',
    examples: [
      {
        nouchi: "Quand tu as la pierre à Babi, toutes les portes s'ouvrent.",
        french: "Quand tu as de l'argent à Abidjan, toutes les opportunités s'offrent à toi."
      }
    ],
    synonyms: ['Djê', 'Zoto', 'Jetons'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Économie']
  },
  {
    id: 'plomb',
    term: 'Plomb',
    phonetic: '/plɔ̃/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Pièce de 100 Francs CFA.',
    frenchTranslation: '100 Francs CFA.',
    originLanguage: 'Français / Argot',
    examples: [
      {
        nouchi: "Donne-moi deux plombs pour payer l'eau glacée.",
        french: "Donne-moi deux cents francs CFA pour acheter de l'eau fraîche."
      }
    ],
    synonyms: ['Togo', '100 CFA'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Monnaie']
  },
  {
    id: 'power',
    term: 'Power',
    phonetic: '/pa.wœʁ/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Bière stout noire de marque Guinness, réputée pour sa force.',
    frenchTranslation: 'Bière Guinness (ou bière brune forte).',
    originLanguage: 'Anglais (Power : puissance)',
    examples: [
      {
        nouchi: "Le vieux père prend toujours son power après le travail.",
        french: "L'aîné prend toujours sa Guinness après sa journée de travail."
      }
    ],
    synonyms: ['Guinness', 'Poki', 'Bière noire'],
    category: 'transport_lieux',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Maquis', 'Boisson']
  },
  {
    id: 'prends-mon-gbo',
    term: 'Prends mon GBõ',
    phonetic: '/pʁɑ̃ mɔ̃ ɡbɔ̃/',
    grammaticalCategory: 'Formule de salutation',
    definition: "Salutation fraternelle et chaleureuse, souvent accompagnée d'un 'check' poing contre poing entre amis.",
    frenchTranslation: 'Touche là mon frère, reçois ma salutation fraternelle.',
    literalMeaning: 'Prends mon coup de poing d’amitié.',
    originLanguage: 'Dioula + Français',
    examples: [
      {
        nouchi: "Prends mon GBõ mon frère, ça fait longtemps qu'on ne s'est pas vus !",
        french: "Touche là mon frère, ça fait un bail qu'on ne s'est pas croisés !"
      }
    ],
    synonyms: ['Prends mon Sidjô', 'Check', 'Salutations'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Salutation', 'Respect', 'Amitié']
  },

  // --- Q ---
  {
    id: 'quitte-la',
    term: 'Quitte-là !',
    phonetic: '/kit la/',
    grammaticalCategory: 'Interjection impérative',
    definition: "Ordre ferme ou humoristique pour demander à quelqu'un de s'en aller, de cesser d'importuner ou de ne pas raconter d'histoires.",
    frenchTranslation: 'Dégage ! Va-t-en ! Arrête tes salades !',
    originLanguage: 'Français populaire ivoirien',
    examples: [
      {
        nouchi: "Quitte-là ! Tu crois que je vais croire à tes mensonges ?",
        french: "Dégage ! Tu t'imagines que je vais gober tes mensonges ?"
      }
    ],
    synonyms: ['Foue le camp', 'Dégage', 'Va là-bas'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Expression', 'Impératif']
  },

  // --- R ---
  {
    id: 'rougeot',
    term: 'Rougeot',
    phonetic: '/ʁu.ʒo/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Billet de 10 000 Francs CFA (en référence à sa couleur violacée/rougeâtre dominante).',
    frenchTranslation: 'Billet de 10 000 Francs CFA.',
    originLanguage: 'Français argotique imagé',
    examples: [
      {
        nouchi: "Le client a réglé sa course avec un beau rougeot.",
        french: "Le client a payé son trajet avec un billet de 10 000 francs CFA."
      }
    ],
    synonyms: ['10 Krikas', 'Dix mille', 'Grand billet'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Monnaie']
  },

  // --- S ---
  {
    id: 'senjailler',
    term: "S'enjailler",
    phonetic: '/sɑ̃.ʒa.je/',
    grammaticalCategory: 'Verbe pronominal',
    definition: "Se faire plaisir, s'amuser, profiter de la vie, être de bonne humeur ou éprouver un vif sentiment d'attachement ('Tu m'enjailles' = tu me plais). Mot officiel entré au dictionnaire Larousse.",
    frenchTranslation: "S'amuser, faire la fête, prendre du bon temps, kiffer.",
    originLanguage: 'Anglais (To enjoy) francisé et nouchisé',
    etymologyDetails: "Consacré officiellement par le dictionnaire Larousse en 2019.",
    examples: [
      {
        nouchi: "Ce soir on va s'enjailler dans le maquis le plus chaud d'Abidjan !",
        french: "Ce soir on va s'amuser et faire la fête dans le restaurant le plus animé d'Abidjan !"
      },
      {
        nouchi: "Ton style et ton sourire m'enjaillent beaucoup.",
        french: "Ton allure et ton sourire me plaisent énormément."
      }
    ],
    synonyms: ['Kiffer', 'Faire la fête', 'Se réjouir', 'Boucanter'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Larousse',
    officialYear: '2019',
    tags: ['Incontournable', 'Larousse', 'Fête', 'Amour']
  },
  {
    id: 'se-chercher',
    term: 'Se chercher',
    phonetic: '/sə ʃɛʁ.ʃe/',
    grammaticalCategory: 'Locution verbale',
    definition: "Travailler dur, chercher par tous les moyens licites à s'en sortir dans la vie, lutter pour sa subsistance et bâtir son avenir.",
    frenchTranslation: 'Se débrouiller, lutter pour réussir, bâtir sa vie.',
    originLanguage: 'Français populaire d’Afrique de l’Ouest',
    examples: [
      {
        nouchi: "Le jeune homme s'est levé tôt pour aller se chercher au marché.",
        french: "Le jeune homme s'est levé aux aurores pour aller gagner son pain au marché."
      }
    ],
    synonyms: ['Grouiller', 'Faire djossi', 'Se battre'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Courage', 'Travail', 'Vie']
  },
  {
    id: 'se-koroto',
    term: 'Se koroto',
    phonetic: '/sə kɔ.ʁɔ.to/',
    grammaticalCategory: 'Verbe pronominal',
    definition: 'Aller se coucher, dormir, se reposer après une longue journée.',
    frenchTranslation: 'Aller dormir, se coucher, pioncer.',
    originLanguage: 'Langues mandées / Nouchi',
    examples: [
      {
        nouchi: "Il est minuit passé, je vais aller me koroto direct.",
        french: "Il est plus de minuit, je vais aller me coucher immédiatement."
      }
    ],
    synonyms: ['Dormir', 'Pioncer', 'Faire dodo'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Repos', 'Nuit']
  },
  {
    id: 'siffler',
    term: 'Siffler',
    phonetic: '/si.fle/',
    grammaticalCategory: 'Verbe transitif',
    definition: 'Boire goulûment un verre ou une bouteille d’alcool.',
    frenchTranslation: 'Boire rapidement, ingurgiter un verre.',
    originLanguage: 'Français argotique',
    examples: [
      {
        nouchi: "Il a sifflé sa bière en deux gorgées !",
        french: "Il a bu sa bière en deux gorgées !"
      }
    ],
    synonyms: ['Badrô', 'Boire', 'Enfiler'],
    category: 'actions',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Boisson', 'Sortie']
  },
  {
    id: 'soutra',
    term: 'Soutra',
    phonetic: '/su.tʁa/',
    grammaticalCategory: 'Verbe transitif / Nom',
    definition: "Secourir financièrement ou moralement quelqu'un dans le besoin, aider fraternellement, sauver d'un mauvais pas.",
    frenchTranslation: "Aider, dépanner financièrement, secourir, protéger.",
    originLanguage: 'Dioula (Sutura : protéger, couvrir, secourir)',
    etymologyDetails: "Concept moral fondamental de l'entraide sociale ivoirienne.",
    examples: [
      {
        nouchi: "Le grand frère m'a soutra avec 5 000 francs pour mes ordonnances.",
        french: "Mon aîné m'a dépanné de 5 000 francs pour mes médicaments."
      }
    ],
    synonyms: ['Dépanner', 'Aider', 'Secourir', 'Sauver'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Entraide', 'Solidarité', 'Valeur', 'Incontournable']
  },

  // --- T ---
  {
    id: 'tassaba',
    term: 'Tassaba',
    phonetic: '/ta.sa.ba/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Fessier très imposant et rebondi.',
    frenchTranslation: 'Grosses fesses généreuses.',
    originLanguage: 'Dioula / Langues akan',
    examples: [
      {
        nouchi: "Les robes moulantes mettent en valeur le tassaba des gos ivoiriennes.",
        french: "Les robes cintrées soulignent les rondeurs des femmes ivoiriennes."
      }
    ],
    synonyms: ['BobaraBa', 'Bôtchô', 'Matos'],
    category: 'qualificatifs',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Corps', 'Femme']
  },
  {
    id: 'tchiza',
    term: 'Tchiza',
    phonetic: '/tʃi.za/',
    grammaticalCategory: 'Nom féminin',
    definition: "Maîtresse ou amante d'un homme marié dans le jargon urbain moderne d'Abidjan.",
    frenchTranslation: "Maîtresse, deuxième bureau, amante d'un homme en couple.",
    originLanguage: 'Création urbaine moderne ivoirienne',
    examples: [
      {
        nouchi: "La tchiza a créé un scandale lors de la soirée.",
        french: "La maîtresse a provoqué une scène lors de la réception."
      }
    ],
    synonyms: ['Deuxième bureau', 'Maîtresse', 'Amante'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Tendance',
    tags: ['Relations', 'Société']
  },
  {
    id: 'tchizo',
    term: 'Tchizo',
    phonetic: '/tʃi.zo/',
    grammaticalCategory: 'Nom masculin',
    definition: "Homme marié ou en couple officiel qui entretient des relations extra-conjugales.",
    frenchTranslation: 'Homme marié infidèle entretenant une maîtresse.',
    originLanguage: 'Nouchi (pendant masculin de Tchiza)',
    examples: [
      {
        nouchi: "Ce monsieur est un vrai tchizo, il collectionne les amantes.",
        french: "Cet homme est très volage, il accumule les conquêtes."
      }
    ],
    synonyms: ['Homme infidèle', 'Séducteur'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Tendance',
    tags: ['Relations', 'Société']
  },
  {
    id: 'tiasse',
    term: 'Tiasse',
    phonetic: '/tjas/',
    grammaticalCategory: 'Adjectif / État',
    definition: "Totalement fauché, dépourvu du moindre sou, en grande difficulté matérielle temporaire.",
    frenchTranslation: 'Fauché, sans le sou, à sec, ruiné.',
    originLanguage: 'Argot Abidjan',
    examples: [
      {
        nouchi: "Aujourd'hui je suis tiasse, je ne peux pas sortir ce soir.",
        french: "Aujourd'hui je suis complètement fauché, je ne peux pas sortir ce soir."
      }
    ],
    synonyms: ['Perdre réseau', 'Moisi', 'Fauché', 'Sans un rond'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Précarité']
  },
  {
    id: 'togo',
    term: 'Togo',
    phonetic: '/to.ɡo/',
    grammaticalCategory: 'Nom masculin',
    definition: 'Pièce de 100 Francs CFA (ou 100 000 Francs CFA selon les montants en affaires).',
    frenchTranslation: '100 Francs CFA (ou 100 000 CFA).',
    originLanguage: 'Dioula (Tògò : nom / valeur)',
    examples: [
      {
        nouchi: "Donne-moi un togo pour payer la banane braisée.",
        french: "Donne-moi cent francs CFA pour payer la banane au barbecue."
      }
    ],
    synonyms: ['Plomb', '100 CFA'],
    category: 'argent',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Argent', 'Monnaie']
  },
  {
    id: 'tu-es-dans-mes-kpakites',
    term: 'Tu es dans mes Kpakites',
    phonetic: '/ty ɛ dɑ̃ me kpa.kit/',
    grammaticalCategory: 'Déclaration affective',
    definition: "Déclaration d'amour ou d'amitié passionnée signifiant qu'une personne est ancrée au plus profond de ses pensées et de ses mâchoires/tripes.",
    frenchTranslation: "Je t'aime à la folie, tu es ancré(e) au plus profond de moi.",
    originLanguage: 'Nouchi métaphorique (Kpakites : mâchoires/dents)',
    examples: [
      {
        nouchi: "Chérie, sache que tu es dans mes kpakites pour toujours !",
        french: "Mon amour, sache que tu es gravée au plus profond de mon cœur pour toujours !"
      }
    ],
    synonyms: ['Tu es dans mes gencives', 'Je t’aime fort', 'Tu es mon cœur'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Amour', 'Poésie de rue', 'Expression']
  },
  {
    id: 'tu-verses-ma-figure-par-terre',
    term: 'Tu verses ma figure par terre',
    phonetic: '/ty vɛʁs ma fi.ɡyʁ paʁ tɛʁ/',
    grammaticalCategory: 'Expression imagée',
    definition: "Formule d'indignation signifiant que quelqu'un vous couvre de honte, vous ridiculise ou nuit gravement à votre honneur en public.",
    frenchTranslation: 'Tu me couvres de honte, tu me ridiculises en public.',
    literalMeaning: 'Tu jettes mon visage dans la poussière.',
    originLanguage: 'Traduction littérale de formules akan et dioula',
    examples: [
      {
        nouchi: "Avec tes bêtises là, tu verses ma figure par terre devant les invités !",
        french: "Avec tes maladresses, tu me couvres de honte devant tous les invités !"
      }
    ],
    synonyms: ['Foutre la honte', 'Humilier', 'Gâter le nom'],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Honneur', 'Société', 'Image']
  },

  // --- V ---
  {
    id: 'verse',
    term: 'Versé',
    phonetic: '/vɛʁ.se/',
    grammaticalCategory: 'Adjectif',
    definition: "Être paisiblement installé, allongé au repos, détendu sans stress ni obligation immédiate.",
    frenchTranslation: 'Au repos, peinard, oisif, relaxé.',
    originLanguage: 'Français métaphorique ivoirien',
    examples: [
      {
        nouchi: "Le dimanche après-midi, le môgô est versé sous le manguier.",
        french: "Le dimanche après-midi, le gars est paisiblement étendu à l'ombre du manguier."
      }
    ],
    synonyms: ['Posé', 'Détendu', 'Au calme', 'Tranquille'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Détente', 'Vie', 'Repos']
  },
  {
    id: 'vogo',
    term: 'Vogo',
    phonetic: '/vo.ɡo/',
    grammaticalCategory: 'Nom masculin',
    definition: "Vagabond, jeune sans domicile fixe ou personne qui erre dans la ville sans occupation précise.",
    frenchTranslation: 'Vagabond, rôdeur, errant.',
    originLanguage: 'Français (Vagabond) déformé en nouchi',
    examples: [
      {
        nouchi: "Ne traîne pas la nuit comme un vogo, rentre chez toi !",
        french: "Ne traîne pas tard la nuit comme un vagabond, rentre à la maison !"
      }
    ],
    synonyms: ['Vagabond', 'Errant', 'Sans-abri'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Société', 'Rue']
  },

  // --- W ---
  {
    id: 'were-were',
    term: 'Were Were',
    phonetic: '/wɛ.ʁɛ wɛ.ʁɛ/',
    grammaticalCategory: 'Adjectif / Nom',
    definition: "Personne très affranchie, débrouillarde, dégourdie, rusée et capable de naviguer dans n'importe quel milieu urbain.",
    frenchTranslation: 'Déluré, dégourdi, rusé, affranchi de tout.',
    originLanguage: 'Dioula (Wèrèwèrè : vif, éveillé)',
    examples: [
      {
        nouchi: "La petite sœur est devenue trop were were, rien ne lui échappe !",
        french: "La jeune sœur est devenue extrêmement dégourdie, rien ne lui échappe !"
      }
    ],
    synonyms: ['Dégourdi', 'Débrouillard', 'Éveillé', 'Malin'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Caractère', 'Intelligence']
  },
  {
    id: 'woro-woro',
    term: 'Wôrô-wôrô',
    phonetic: '/wɔ.ʁɔ wɔ.ʁɔ/',
    grammaticalCategory: 'Nom masculin',
    definition: "Taxi communal collectif à couleur spécifique selon la commune (ex: jaune à Cocody, rouge à Yopougon, vert à Koumassi), élément incontournable du paysage abidjanais.",
    frenchTranslation: 'Taxi communal collectif à trajet fixe.',
    originLanguage: "Malinké / Dioula (Wôrô : 30 francs - prix originel de la course)",
    etymologyDetails: "À l'origine dans les années 70, la course coûtait 6 sous (30 FCFA = wôrô en dioula).",
    examples: [
      {
        nouchi: "Prends le wôrô-wôrô jaune pour descendre à Saint-Jean Cocody.",
        french: "Prends le taxi collectif jaune pour t'arrêter à Saint-Jean Cocody."
      }
    ],
    synonyms: ['Taxi communal', 'Wôrô'],
    category: 'transport_lieux',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Transport', 'Abidjan', 'Incontournable']
  },
  {
    id: 'wotro',
    term: 'Wôtro',
    phonetic: '/wɔ.tʁo/',
    grammaticalCategory: 'Nom masculin',
    definition: "Pousse-pousse ou charrette à deux roues utilisée pour le transport manuel de marchandises sur les marchés d'Abidjan.",
    frenchTranslation: 'Charrette à bras, pousse-pousse de transport de marchandises.',
    originLanguage: 'Dioula (Wòtro : charrette)',
    examples: [
      {
        nouchi: "Les wôtros transportent des sacs de riz au grand marché d'Adjamé.",
        french: "Les charretiers transportent des sacs de riz au grand marché d'Adjamé."
      }
    ],
    synonyms: ['Pousse-pousse', 'Charrette'],
    category: 'transport_lieux',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Classique',
    tags: ['Transport', 'Commerce', 'Marché']
  },

  // --- Y ---
  {
    id: 'ya-fohi',
    term: "Y'a fohi",
    phonetic: '/ja fɔ.i/',
    grammaticalCategory: 'Locution proverbiale / Affirmation',
    definition: "Expression fétiche signifiant 'il n'y a rien à craindre', 'tout va bien', 'aucun problème', 'sois tranquille'. Symbole de la sérénité et de l'optimisme ivoiriens.",
    frenchTranslation: "Il n'y a aucun problème, tout va bien, pas de souci.",
    literalMeaning: "Il n'y a rien du tout (fohi = zéro/rien en dioula).",
    originLanguage: 'Français (Il y a) + Dioula (Foyi : rien)',
    examples: [
      {
        nouchi: "Ne t'inquiète pas pour la facture, y'a fohi, je gère tout !",
        french: "Ne te fais aucun souci pour la facture, pas de problème, je m'en occupe !"
      }
    ],
    synonyms: ["Y'a likéfi", "Pas de problème", "Tranquille", "Tout est sous contrôle"],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Philosophie', 'Incontournable', 'Optimisme']
  },
  {
    id: 'yafor',
    term: 'Yafor',
    phonetic: '/ja.fɔʁ/',
    grammaticalCategory: 'Interjection / Accord',
    definition: "D'accord, c'est entendu, marché conclu, c'est validé.",
    frenchTranslation: "D'accord, entendu, c'est compris.",
    originLanguage: 'Dioula / Nouchi',
    examples: [
      {
        nouchi: "On se donne rendez-vous à 18h devant le maquis ? - Yafor !",
        french: "On se retrouve à 18h devant le restaurant ? - C'est d'accord !"
      }
    ],
    synonyms: ["C'est calé", "D'accord", "Validé"],
    category: 'expressions',
    difficultyLevel: 'debutant',
    officialStatus: 'Populaire',
    tags: ['Accord', 'Communication']
  },

  // --- Z ---
  {
    id: 'zango',
    term: 'Zango',
    phonetic: '/zɑ̃.ɡo/',
    grammaticalCategory: 'Nom / Adjectif',
    definition: "Personne particulièrement bien habillée, chic, tirée à quatre épingles, adepte de la haute sape.",
    frenchTranslation: 'Personne très élégante, bien sapée, dandy chic.',
    originLanguage: 'Dioula / Nouchi',
    examples: [
      {
        nouchi: "Regarde le djo, il est zango comme un prince ce soir !",
        french: "Regarde ce gars, il est superbement habillé comme un prince ce soir !"
      }
    ],
    synonyms: ['Choco', 'Sapologue', 'Djanterman', 'Kpata'],
    category: 'personnes',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Sape', 'Mode', 'Style']
  },
  {
    id: 'zo',
    term: 'Zo',
    phonetic: '/zo/',
    grammaticalCategory: 'Adjectif',
    definition: "Beau, magnifique, stylé, attrayant (au féminin 'Zota').",
    frenchTranslation: 'Beau, joli, magnifique, resplendissant.',
    originLanguage: 'Langues mandées',
    examples: [
      {
        nouchi: "Sa nouvelle voiture est trop zo !",
        french: "Sa nouvelle voiture est tellement belle !"
      }
    ],
    synonyms: ['Zota', 'Kpata', 'Choco', 'Joli'],
    category: 'qualificatifs',
    difficultyLevel: 'debutant',
    officialStatus: 'Classique',
    tags: ['Beauté', 'Qualité']
  },
  {
    id: 'zogotape',
    term: 'Zogotape',
    phonetic: '/zo.ɡo.ta.pe/',
    grammaticalCategory: 'Verbe transitif',
    definition: "Assommer, frapper brutalement ou mettre hors d'état de nuire par un coup sec.",
    frenchTranslation: 'Assommer, sonner d’un coup violent.',
    originLanguage: 'Argot de rue nouchi',
    examples: [
      {
        nouchi: "Le boxeur a zogotape son adversaire au deuxième round.",
        french: "Le boxeur a assommé son adversaire dès le deuxième round."
      }
    ],
    synonyms: ['Assommer', 'Mettre KO', 'Daba'],
    category: 'actions',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Combat', 'Sport']
  },
  {
    id: 'zogor',
    term: 'Zogor',
    phonetic: '/zo.ɡɔʁ/',
    grammaticalCategory: 'Nom / Adjectif',
    definition: 'Personne ou situation pénible, ennuyeuse, rabat-joie ou encombrante.',
    frenchTranslation: 'Personne ennuyeuse, casse-pieds, rabat-joie.',
    originLanguage: 'Argot urbain abidjanais',
    examples: [
      {
        nouchi: "Laisse ce zogor là, il gâte toujours l'ambiance des fêtes !",
        french: "Laisse cet individu ennuyeux, il gâche toujours l'atmosphère des soirées !"
      }
    ],
    synonyms: ['Rabat-joie', 'Casse-pieds', 'Ennuyeux'],
    category: 'personnes',
    difficultyLevel: 'intermediaire',
    officialStatus: 'Populaire',
    tags: ['Humeur', 'Caractère']
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Tous les termes', icon: 'BookOpen', count: NOUCHI_DICTIONARY.length },
  { id: 'personnes', label: '👥 Personnes & Profils', icon: 'Users', count: NOUCHI_DICTIONARY.filter(w => w.category === 'personnes').length },
  { id: 'argent', label: '💰 Argent & Économie', icon: 'Banknote', count: NOUCHI_DICTIONARY.filter(w => w.category === 'argent').length },
  { id: 'actions', label: '🎬 Actions & Verbes', icon: 'Flame', count: NOUCHI_DICTIONARY.filter(w => w.category === 'actions').length },
  { id: 'qualificatifs', label: '🎭 Qualificatifs & États', icon: 'Sparkles', count: NOUCHI_DICTIONARY.filter(w => w.category === 'qualificatifs').length },
  { id: 'transport_lieux', label: '🚗 Lieux & Transports', icon: 'MapPin', count: NOUCHI_DICTIONARY.filter(w => w.category === 'transport_lieux').length },
  { id: 'expressions', label: '💬 Expressions & Proverbes', icon: 'MessageCircle', count: NOUCHI_DICTIONARY.filter(w => w.category === 'expressions').length },
  { id: 'musique_culture', label: '🎶 Musique & Culture Babi', icon: 'Music', count: NOUCHI_DICTIONARY.filter(w => w.category === 'musique_culture').length },
];
