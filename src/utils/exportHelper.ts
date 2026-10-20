import { NouchiWord, User } from '../types';

/**
 * Clean and escape strings for CSV (RFC 4180 format)
 */
function escapeCSV(field: string | number | boolean | null | undefined): string {
  if (field === null || field === undefined) return '""';
  const str = String(field);
  // If field contains quotes, commas, newlines, wrap in quotes and escape internal quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Exports user's favorited Nouchi words as a clean, formatted JSON file.
 */
export function exportFavoritesToJSON(
  favoriteWords: NouchiWord[],
  user?: User | null
): boolean {
  if (!favoriteWords || favoriteWords.length === 0) return false;

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const exportPayload = {
    metadata: {
      application: 'Markkanich Le NouchiPro',
      description: 'Lexique personnel de mots Nouchi favoris',
      exportedAt: now.toISOString(),
      dateFormatted: now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      totalWords: favoriteWords.length,
      user: {
        username: user?.username || 'Anonyme',
        email: user?.email || '',
        plan: user?.plan || 'free',
        isVip: Boolean(user?.isVip)
      },
      languagePair: 'Nouchi (Côte d\'Ivoire) ➔ Français',
      schemaVersion: '1.2.0'
    },
    lexicon: favoriteWords.map((w, index) => ({
      index: index + 1,
      id: w.id,
      term: w.term,
      phonetic: w.phonetic || '',
      frenchTranslation: w.frenchTranslation || '',
      grammaticalCategory: w.grammaticalCategory || '',
      definition: w.definition || '',
      literalMeaning: w.literalMeaning || '',
      originLanguage: w.originLanguage || '',
      etymologyDetails: w.etymologyDetails || '',
      category: w.category,
      difficultyLevel: w.difficultyLevel,
      officialStatus: w.officialStatus || 'Populaire',
      officialYear: w.officialYear || '',
      synonyms: w.synonyms || [],
      antonyms: w.antonyms || [],
      tags: w.tags || [],
      examples: (w.examples || []).map(ex => ({
        nouchi: ex.nouchi,
        french: ex.french,
        context: ex.context || ''
      }))
    }))
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  triggerFileDownload(
    blob, 
    `lexique-nouchi-favoris-${(user?.username || 'mon-lexique').toLowerCase()}-${dateStr}.json`
  );
  return true;
}

/**
 * Exports user's favorited Nouchi words as a standard CSV with UTF-8 BOM for Microsoft Excel / Google Sheets.
 */
export function exportFavoritesToCSV(
  favoriteWords: NouchiWord[],
  user?: User | null
): boolean {
  if (!favoriteWords || favoriteWords.length === 0) return false;

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const headers = [
    'N°',
    'Terme Nouchi',
    'Traduction Française',
    'Catégorie Grammaticale',
    'Définition',
    'Sens Littéral',
    'Langue d\'Origine',
    'Phonétique',
    'Catégorie Thématique',
    'Niveau',
    'Statut Officiel',
    'Synonymes',
    'Exemples Nouchi',
    'Exemples Français',
    'Mots-Clés (Tags)'
  ];

  const rows = favoriteWords.map((w, index) => {
    const examplesNouchi = (w.examples || []).map(e => e.nouchi).join(' | ');
    const examplesFrench = (w.examples || []).map(e => e.french).join(' | ');
    const synonymsStr = (w.synonyms || []).join(', ');
    const tagsStr = (w.tags || []).join(', ');

    return [
      escapeCSV(index + 1),
      escapeCSV(w.term),
      escapeCSV(w.frenchTranslation),
      escapeCSV(w.grammaticalCategory),
      escapeCSV(w.definition),
      escapeCSV(w.literalMeaning || ''),
      escapeCSV(w.originLanguage),
      escapeCSV(w.phonetic || ''),
      escapeCSV(w.category),
      escapeCSV(w.difficultyLevel),
      escapeCSV(w.officialStatus || 'Populaire'),
      escapeCSV(synonymsStr),
      escapeCSV(examplesNouchi),
      escapeCSV(examplesFrench),
      escapeCSV(tagsStr)
    ].join(';'); // Semicolon delimiter is standard in French Excel
  });

  // UTF-8 Byte Order Mark (BOM) prevents Excel from corrupting accented characters (é, è, à, etc.)
  const BOM = '\uFEFF';
  const csvContent = BOM + [headers.join(';'), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  triggerFileDownload(
    blob, 
    `lexique-nouchi-favoris-${(user?.username || 'mon-lexique').toLowerCase()}-${dateStr}.csv`
  );
  return true;
}

/**
 * Formats favorited words as readable Markdown / Plain Text
 */
export function formatFavoritesAsMarkdown(
  favoriteWords: NouchiWord[],
  user?: User | null
): string {
  const now = new Date();
  let md = `# 🇨🇮 Mon Lexique Personnel Nouchi — Markkanich Le NouchiPro\n`;
  md += `*Exporté le ${now.toLocaleDateString('fr-FR')} pour @${user?.username || 'Utilisateur'} (${favoriteWords.length} mots)*\n\n`;
  md += `---\n\n`;

  favoriteWords.forEach((w, i) => {
    md += `### ${i + 1}. **${w.term.toUpperCase()}** ${w.phonetic ? `[${w.phonetic}]` : ''}\n`;
    md += `- **Traduction :** ${w.frenchTranslation || 'N/A'}\n`;
    md += `- **Nature :** *${w.grammaticalCategory || 'Expression'}* | **Origine :** ${w.originLanguage}\n`;
    md += `- **Définition :** ${w.definition}\n`;
    if (w.literalMeaning) {
      md += `- **Sens littéral :** ${w.literalMeaning}\n`;
    }
    if (w.examples && w.examples.length > 0) {
      md += `- **Exemple :** « *${w.examples[0].nouchi}* » ➔ ${w.examples[0].french}\n`;
    }
    if (w.synonyms && w.synonyms.length > 0) {
      md += `- **Synonymes :** ${w.synonyms.join(', ')}\n`;
    }
    md += `\n`;
  });

  return md;
}

/**
 * Triggers a secure browser file download
 */
function triggerFileDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 300);
}
