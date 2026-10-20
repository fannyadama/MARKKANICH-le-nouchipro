import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: "Que signifie littéralement le mot 'Nouchi' en langue dioula ?",
    options: ["L'argent de la rue", "Poil de nez / Moustache", "Danse du guerrier", "Le taxi rapide"],
    correctIndex: 1,
    explanation: "Le mot est composé de 'Nou' (le nez) et 'Chi' (le poil/la moustache). Les jeunes loubards des années 70 portaient une fine moustache virile devant les cinémas d'Adjamé.",
    difficulty: 'debutant',
    category: 'musique_culture',
    culturalNote: "Les cinémas Roxy et El Mansour d'Adjamé étaient le point de ralliement originel de ces jeunes."
  },
  {
    id: 'q2',
    question: "Quel verbe nouchi emblématique est entré officiellement au Dictionnaire Larousse en 2019 ?",
    options: ["S'enjailler", "Chicoter", "Logobby", "Fraya"],
    correctIndex: 0,
    explanation: "'S'enjailler' (de l'anglais 'to enjoy') signifie s'amuser, se faire plaisir ou être sous le charme ('tu m'enjailles'). Il est entré au Larousse en 2019.",
    difficulty: 'debutant',
    category: 'actions',
    culturalNote: "C'est une consécration historique pour la langue populaire ivoirienne."
  },
  {
    id: 'q3',
    question: "Quand un Ivoirien te dit 'Je suis tiasse' ou 'J'ai perdu réseau', que veut-il dire ?",
    options: ["Il a un problème de connexion wifi", "Il est complètement fauché, sans argent", "Il a perdu son chemin dans Abidjan", "Il est très fâché"],
    correctIndex: 1,
    explanation: "'Tiasse' et 'Perdre réseau' sont des expressions très imagées pour signifier qu'on est sans le sou ou à sec financièrement.",
    difficulty: 'debutant',
    category: 'argent'
  },
  {
    id: 'q4',
    question: "Que désigne un 'Wôrô-wôrô' dans les rues d'Abidjan ?",
    options: ["Un taxi communal collectif", "Une paire de chaussures neuves", "Un gâteau de fête", "Un policier municipal"],
    correctIndex: 0,
    explanation: "Le Wôrô-wôrô est le taxi communal collectif à tarif fixe. Le mot vient de 'wôrô' (30 francs CFA en dioula, le tarif historique des années 70).",
    difficulty: 'debutant',
    category: 'transport_lieux'
  },
  {
    id: 'q5',
    question: "Dans le tube planétaire de Magic System, que signifie 'Premier gaou n'est pas gaou' ?",
    options: ["Le premier arrivé est le gagnant", "Se faire duper une première fois n'est pas une honte, c'est formateur", "Le premier enfant de la famille a raison", "Les personnes naïves ne savent pas chanter"],
    correctIndex: 1,
    explanation: "Le 'gaou' est une personne naïve ou crédule. Se faire avoir une fois arrive à tout le monde, mais répéter la même bêtise est impardonnable.",
    difficulty: 'debutant',
    category: 'expressions'
  },
  {
    id: 'q6',
    question: "Que signifie faire un 'Atalakon' dans la musique et les maquis ?",
    options: ["Commander des plats épicés", "Faire un éloge public rythmé pour flatter un bienfaiteur", "Se bagarrer au milieu de la piste", "Refuser de payer l'addition"],
    correctIndex: 1,
    explanation: "L'atalakon (du dioula 'atala' : prends-le/élève-le) est la dédicace musicale chantée par un DJ ou un artiste pour vanter les mérites d'une personnalité généreuse.",
    difficulty: 'intermediaire',
    category: 'musique_culture'
  },
  {
    id: 'q7',
    question: "Combien vaut un 'Gbonhon' (ou 'Gbon') en monnaie nouchi ?",
    options: ["500 Francs CFA", "1 000 Francs CFA", "5 000 Francs CFA", "10 000 Francs CFA"],
    correctIndex: 2,
    explanation: "Le 'Gbonhon' ou 'Gbon' désigne le billet de 5 000 Francs CFA.",
    difficulty: 'intermediaire',
    category: 'argent'
  },
  {
    id: 'q8',
    question: "Quel mot nouchi désigne une personne excessivement curieuse qui colporte les ragots ?",
    options: ["Kpakpato", "Agbolo", "Zango", "Binguiste"],
    correctIndex: 0,
    explanation: "Le 'kpakpato' est le commère ou rapporteur de service. L'action de faire des commérages s'appelle le 'kpakpatoya'.",
    difficulty: 'intermediaire',
    category: 'personnes'
  },
  {
    id: 'q9',
    question: "Pourquoi les anciens bus publics d'Abidjan étaient-ils surnommés 'Balladur' ?",
    options: ["Ils étaient fabriqués à Bali", "Ils étaient réputés lents et massifs, d'après l'ancien Premier ministre français", "Ils avaient été offerts par une association sportive", "C'est un mot en langue bété"],
    correctIndex: 1,
    explanation: "L'humour populaire ivoirien a baptisé ces bus d'occasion d'après Édouard Balladur pour ironiser sur leur démarche lente mais imposante.",
    difficulty: 'expert',
    category: 'transport_lieux'
  },
  {
    id: 'q10',
    question: "Que signifie l'expression 'Tu verses ma figure par terre' ?",
    options: ["Tu me prends en photo de près", "Tu me couvres de honte et me ridiculises en public", "Tu me fais un grand compliment", "Tu renverses mon verre de boisson"],
    correctIndex: 1,
    explanation: "C'est une traduction métaphorique directe de formules traditionnelles signifiant jeter l'honneur et le respect de quelqu'un dans la poussière.",
    difficulty: 'expert',
    category: 'expressions'
  }
];
