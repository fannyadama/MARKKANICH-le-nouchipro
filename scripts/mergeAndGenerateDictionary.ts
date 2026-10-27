import fs from 'fs';
import path from 'path';
import { NOUCHI_DICTIONARY } from '../src/data/nouchiDictionary';
import { NouchiWord, Category } from '../src/types';

interface CompactWord {
  m: string; // mot
  p: string; // prononciation
  d: string; // definition
  e: string; // exemple
  o: string; // origine
  c: string; // categorie
}

const compactData: CompactWord[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'nouchi_300.json'), 'utf8')
);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'nouchi-terme';
}

function inferGrammaticalCategory(w: CompactWord): string {
  const def = (w.d || '').toLowerCase();
  const term = w.m.toLowerCase();
  const cat = w.c;

  if (def.startsWith('action de ') || def.includes('action d\'')) {
    return 'Nom d’action / Nom masculin';
  }
  if (def.startsWith('avoir ') || def.startsWith('être ')) {
    return 'Locution / État';
  }
  if (term.endsWith('er') || term.endsWith('ir') || cat === 'actions') {
    if (def.startsWith('marcher') || def.startsWith('fuir') || def.startsWith('courir') || def.startsWith('dormir') || def.startsWith('tomber')) {
      return 'Verbe intransitif';
    }
    return 'Verbe transitif';
  }
  if (cat === 'personnes') {
    if (def.includes('femme') || def.includes('fille') || def.includes('prostituée') || def.includes('amante') || def.includes('demoiselle')) {
      return 'Nom féminin';
    }
    if (def.includes('ignorant') || def.includes('musclé') || def.includes('sapé') || def.includes('élégant')) {
      return 'Nom / Adjectif';
    }
    return 'Nom masculin';
  }
  if (cat === 'argent') {
    if (def.includes('francs cfa') || def.includes('argent') || def.includes('richesse') || def.includes('dealeur') || def.includes('travail') || def.includes('job')) {
      if (term.endsWith('er')) return 'Verbe transitif';
      return 'Nom masculin';
    }
    return 'Nom masculin';
  }
  if (cat === 'objets_lieux') {
    if (def.includes('minibus') || def.includes('porte-feuille') || def.includes('quartier') || def.includes('marché') || def.includes('véhicule')) {
      return 'Nom masculin';
    }
    if (def.includes('commune') || def.includes('ville') || def.includes('voiture')) {
      return 'Nom féminin';
    }
    return 'Nom masculin';
  }
  if (cat === 'emotions_expressions') {
    if (term.startsWith('c\'est') || term.startsWith('y\'a') || term.startsWith('tu ') || term.startsWith('on ') || term.startsWith('il ')) {
      return 'Locution proverbiale / Expression';
    }
    if (def.includes('chagrin') || def.includes('peine') || def.includes('colère') || def.includes('peur')) {
      return 'Nom masculin';
    }
    return 'Expression imagée';
  }
  if (cat === 'vie_quotidienne') {
    if (term.startsWith('c\'est du')) {
      return 'Locution d’appréciation';
    }
    if (term.endsWith('er') || def.startsWith('manger') || def.startsWith('boire') || def.startsWith('fumer') || def.startsWith('laver')) {
      return 'Verbe transitif';
    }
    return 'Nom masculin';
  }

  return 'Expression nouchi';
}

function mapCategory(c: string): Category {
  switch (c) {
    case 'argent':
      return 'argent';
    case 'personnes':
      return 'personnes';
    case 'actions':
      return 'actions';
    case 'objets_lieux':
      return 'transport_lieux';
    case 'emotions_expressions':
      return 'expressions';
    case 'vie_quotidienne':
      return 'vie_quotidienne';
    default:
      return 'expressions';
  }
}

function generateExampleTranslation(nouchiExample: string, def: string, term: string): string {
  // Translate common patterns into natural French
  let fr = nouchiExample;
  fr = fr.replace(/deux barres/i, 'deux mille francs CFA');
  fr = fr.replace(/un gbess/i, '500 francs CFA');
  fr = fr.replace(/un plomb/i, '100 francs CFA');
  fr = fr.replace(/un gros togo/i, 'un gros billet');
  fr = fr.replace(/un gbonhon/i, 'cinq mille francs CFA');
  fr = fr.replace(/le djê/i, "l'argent");
  fr = fr.replace(/mon djê/i, "mon argent");
  fr = fr.replace(/du djê/i, "de l'argent");
  fr = fr.replace(/un bon ken/i, 'une bonne opportunité d’affaires');
  fr = fr.replace(/kener sa marchandise/i, 'vendre et écouler sa marchandise');
  fr = fr.replace(/le banzon/i, "la richesse");
  fr = fr.replace(/au bara/i, "au travail");
  fr = fr.replace(/le bara/i, "le travail");
  fr = fr.replace(/brobroli/i, "petit boulot de dépannage");
  fr = fr.replace(/le djossi/i, "le travail");
  fr = fr.replace(/m'a soutré/i, "m'a dépanné financièrement");
  fr = fr.replace(/mon bramogo/i, "mon ami fidèle");
  fr = fr.replace(/mon môgô/i, "mon pote de confiance");
  fr = fr.replace(/ma go/i, "ma copine");
  fr = fr.replace(/belle mousso/i, "très belle femme");
  fr = fr.replace(/fraichnie/i, "petite amie élégante");
  fr = fr.replace(/apoutchou/i, "femme aux formes généreuses");
  fr = fr.replace(/ne fais pas le gaou/i, "ne sois pas naïf");
  fr = fr.replace(/m'enjaille/i, "me fait énormément plaisir");
  fr = fr.replace(/l'enjaillement total/i, "la fête totale et la joie");
  fr = fr.replace(/daba le riz/i, "manger l'assiette de riz");
  fr = fr.replace(/le dabali est prêt/i, "le repas est enfin prêt");
  fr = fr.replace(/a pris le fraya/i, "a pris la fuite");
  fr = fr.replace(/gbagboté/i, "marché à pied sur une très longue distance");
  fr = fr.replace(/mon bédou/i, "mon portefeuille");
  fr = fr.replace(/le gbaka/i, "le minibus populaire");
  fr = fr.replace(/le goumin/i, "un terrible chagrin d'amour");
  fr = fr.replace(/y'a drap/i, "il y a un sérieux problème");
  fr = fr.replace(/on va pôtô/i, "on va aller manger");
  fr = fr.replace(/on va badou/i, "on va aller se restaurer");

  if (fr === nouchiExample) {
    fr = `Sens : « ${def.replace(/\.$/, '')} » en contexte familier.`;
  }
  return fr;
}

function generateSynonyms(w: CompactWord): string[] {
  const term = w.m;
  const def = w.d.toLowerCase();
  const c = w.c;

  if (c === 'argent') {
    return ['Djê', 'Gbonhon', 'Fric', 'Jeton', 'Oseille'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
  }
  if (c === 'personnes') {
    if (def.includes('femme') || def.includes('fille')) {
      return ['Go', 'Mousso', 'Fraichnie', 'Délice'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
    }
    return ['Môgô', 'Bramogo', 'Djo', 'Frérot'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
  }
  if (c === 'actions') {
    if (def.includes('manger')) {
      return ['Daba', 'Pôtô', 'Badou', 'Grailler'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
    }
    if (def.includes('fuir')) {
      return ['Fraya', 'Pantougouler', 'Prendre la tangente'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
    }
    return ['Enjailler', 'Gérer', 'Bara'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
  }
  if (c === 'objets_lieux') {
    if (def.includes('minibus') || def.includes('véhicule')) {
      return ['Gbaka', 'Wôrô-wôrô', 'Borofin'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
    }
    return ['Glôglô', 'Babi', 'Quartier'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
  }
  if (c === 'emotions_expressions') {
    return ['Y’a drap', 'Goumin', 'Ça ne ment pas'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
  }
  if (c === 'vie_quotidienne') {
    return ['Système D', 'Ambiance', 'La joie'].filter(s => s.toLowerCase() !== term.toLowerCase()).slice(0, 3);
  }

  return ['Nouchi pur', 'Argot babi'];
}

function generateTags(w: CompactWord): string[] {
  const tags = new Set<string>();
  tags.add('Abidjan');
  tags.add('Populaire');

  if (w.c === 'argent') {
    tags.add('Économie');
    tags.add('Djê');
  } else if (w.c === 'personnes') {
    tags.add('Société');
    tags.add('Identité');
  } else if (w.c === 'actions') {
    tags.add('Verbes');
    tags.add('Action');
  } else if (w.c === 'objets_lieux') {
    tags.add('Transports');
    tags.add('Quotidien');
  } else if (w.c === 'emotions_expressions') {
    tags.add('Expressions');
    tags.add('Émotion');
  } else if (w.c === 'vie_quotidienne') {
    tags.add('Quotidien');
    tags.add('Vie Babi');
  }

  if (w.o) {
    if (w.o.toLowerCase().includes('dioula')) tags.add('Dioula');
    if (w.o.toLowerCase().includes('baoulé')) tags.add('Baoulé');
    if (w.o.toLowerCase().includes('anglais')) tags.add('Anglais');
    if (w.o.toLowerCase().includes('larousse')) tags.add('Dictionnaire');
  }

  return Array.from(tags).slice(0, 4);
}

// Build merged dictionary
const mergedMap = new Map<string, NouchiWord>();

// First, insert existing words
for (const word of NOUCHI_DICTIONARY) {
  const key = word.term.toLowerCase().trim();
  mergedMap.set(key, { ...word });
}

// Then, process compact words
let addedCount = 0;
let updatedCount = 0;

for (const item of compactData) {
  const key = item.m.toLowerCase().trim();
  const existing = mergedMap.get(key);

  if (existing) {
    // Enrich existing
    if (!existing.phonetic && item.p) {
      existing.phonetic = item.p;
    }
    // If new example doesn't already exist in examples, add it
    if (item.e && !existing.examples.some(ex => ex.nouchi.toLowerCase() === item.e.toLowerCase())) {
      existing.examples.push({
        nouchi: item.e,
        french: generateExampleTranslation(item.e, item.d, item.m)
      });
    }
    updatedCount++;
  } else {
    // Brand new word
    const baseSlug = slugify(item.m);
    let finalId = baseSlug;
    let counter = 1;
    while (Array.from(mergedMap.values()).some(w => w.id === finalId)) {
      finalId = `${baseSlug}-${counter++}`;
    }

    const newWord: NouchiWord = {
      id: finalId,
      term: item.m.trim(),
      phonetic: item.p || undefined,
      grammaticalCategory: inferGrammaticalCategory(item),
      definition: item.d.trim(),
      frenchTranslation: item.d.replace(/\.$/, '').trim(),
      literalMeaning: item.o ? `Origine : ${item.o}` : undefined,
      originLanguage: item.o || 'Argot urbain abidjanais',
      examples: [
        {
          nouchi: item.e.trim(),
          french: generateExampleTranslation(item.e, item.d, item.m)
        }
      ],
      synonyms: generateSynonyms(item),
      category: mapCategory(item.c),
      difficultyLevel: item.m.length < 5 || item.c === 'argent' ? 'debutant' : 'intermediaire',
      officialStatus: item.o?.toLowerCase().includes('larousse') ? 'Larousse' : 'Populaire',
      tags: generateTags(item)
    };

    mergedMap.set(key, newWord);
    addedCount++;
  }
}

// Sort alphabetically by term
const sortedWords = Array.from(mergedMap.values()).sort((a, b) =>
  a.term.localeCompare(b.term, 'fr', { sensitivity: 'base' })
);

console.log(`Merged results:
- Original dictionary count: ${NOUCHI_DICTIONARY.length}
- Compact words in input: ${compactData.length}
- Enriched overlapping words: ${updatedCount}
- Brand new words added: ${addedCount}
- Total words in final dictionary: ${sortedWords.length}
`);

// Generate code content
const code = `import { NouchiWord } from '../types';

export const NOUCHI_DICTIONARY: NouchiWord[] = ${JSON.stringify(sortedWords, null, 2)};

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Tous les termes', icon: 'BookOpen', count: NOUCHI_DICTIONARY.length },
  { id: 'personnes', label: '👥 Personnes & Profils', icon: 'Users', count: NOUCHI_DICTIONARY.filter(w => w.category === 'personnes').length },
  { id: 'argent', label: '💰 Argent & Économie', icon: 'Banknote', count: NOUCHI_DICTIONARY.filter(w => w.category === 'argent').length },
  { id: 'actions', label: '🎬 Actions & Verbes', icon: 'Flame', count: NOUCHI_DICTIONARY.filter(w => w.category === 'actions').length },
  { id: 'qualificatifs', label: '🎭 Qualificatifs & États', icon: 'Sparkles', count: NOUCHI_DICTIONARY.filter(w => w.category === 'qualificatifs').length },
  { id: 'transport_lieux', label: '🚗 Lieux & Transports', icon: 'MapPin', count: NOUCHI_DICTIONARY.filter(w => w.category === 'transport_lieux').length },
  { id: 'expressions', label: '💬 Expressions & Proverbes', icon: 'MessageCircle', count: NOUCHI_DICTIONARY.filter(w => w.category === 'expressions').length },
  { id: 'vie_quotidienne', label: '🍲 Vie Quotidienne & Repas', icon: 'Utensils', count: NOUCHI_DICTIONARY.filter(w => w.category === 'vie_quotidienne').length },
  { id: 'musique_culture', label: '🎶 Musique & Culture Babi', icon: 'Music', count: NOUCHI_DICTIONARY.filter(w => w.category === 'musique_culture').length },
];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/nouchiDictionary.ts'), code, 'utf8');
console.log('✅ Successfully wrote updated nouchiDictionary.ts with', sortedWords.length, 'entries!');
