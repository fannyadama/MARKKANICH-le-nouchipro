import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  X, 
  Copy, 
  Check, 
  FileJson, 
  FileSpreadsheet, 
  FileText, 
  Bookmark, 
  Sparkles, 
  Database,
  ExternalLink,
  ShieldCheck,
  Languages,
  BookOpen
} from 'lucide-react';
import { NouchiWord, User } from '../types';
import { 
  exportFavoritesToJSON, 
  exportFavoritesToCSV, 
  formatFavoritesAsMarkdown 
} from '../utils/exportHelper';

interface ExportFavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteWords: NouchiWord[];
  user: User | null;
  onSelectWord?: (word: NouchiWord) => void;
  onAddSampleFavorites?: () => void;
}

export const ExportFavoritesModal: React.FC<ExportFavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteWords,
  user,
  onSelectWord,
  onAddSampleFavorites
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'markdown'>('json');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Statistics on user's favorite lexicon
  const stats = useMemo(() => {
    const total = favoriteWords.length;
    const originsMap: Record<string, number> = {};
    const categoriesMap: Record<string, number> = {};

    favoriteWords.forEach(w => {
      const orig = w.originLanguage || 'Autre';
      originsMap[orig] = (originsMap[orig] || 0) + 1;
      const cat = w.category || 'expressions';
      categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    });

    const topOrigin = Object.entries(originsMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Nouchi';

    return {
      total,
      topOrigin,
      uniqueOrigins: Object.keys(originsMap).length,
      categoriesCount: Object.keys(categoriesMap).length
    };
  }, [favoriteWords]);

  // Live preview string
  const previewContent = useMemo(() => {
    if (favoriteWords.length === 0) {
      return '// Aucun mot favori enregistré pour le moment.\n// Cliquez sur l\'icône étoile ou marque-page sur les fiches de mots pour enrichir votre lexique !';
    }

    if (selectedFormat === 'json') {
      const sample = {
        application: 'Markkanich Le NouchiPro',
        exportedAt: new Date().toISOString(),
        totalFavorites: favoriteWords.length,
        user: user?.username || 'Anonyme',
        lexicon: favoriteWords.slice(0, 3).map(w => ({
          term: w.term,
          frenchTranslation: w.frenchTranslation,
          grammaticalCategory: w.grammaticalCategory,
          definition: w.definition,
          originLanguage: w.originLanguage,
          examples: w.examples?.slice(0, 1)
        })),
        ...(favoriteWords.length > 3 ? { _comment: `... et ${favoriteWords.length - 3} autres mots inclus dans le fichier complet` } : {})
      };
      return JSON.stringify(sample, null, 2);
    }

    if (selectedFormat === 'csv') {
      const header = 'Terme Nouchi;Traduction Française;Nature;Définition;Origine;Exemples';
      const sampleRows = favoriteWords.slice(0, 3).map(w => {
        const ex = w.examples?.[0]?.nouchi || '';
        return `"${w.term}";"${w.frenchTranslation}";"${w.grammaticalCategory}";"${w.definition.slice(0, 35)}...";"${w.originLanguage}";"${ex}"`;
      });
      if (favoriteWords.length > 3) {
        sampleRows.push(`... (${favoriteWords.length - 3} autres lignes dans le fichier complet)`);
      }
      return [header, ...sampleRows].join('\n');
    }

    return formatFavoritesAsMarkdown(favoriteWords.slice(0, 3), user) + (favoriteWords.length > 3 ? `\n*... et ${favoriteWords.length - 3} autres termes dans l'export complet.*` : '');
  }, [favoriteWords, selectedFormat, user]);

  const handleDownload = () => {
    if (favoriteWords.length === 0) return;

    if (selectedFormat === 'json') {
      exportFavoritesToJSON(favoriteWords, user);
      setDownloadSuccess('Fichier JSON téléchargé !');
    } else if (selectedFormat === 'csv') {
      exportFavoritesToCSV(favoriteWords, user);
      setDownloadSuccess('Fichier CSV (Excel UTF-8) téléchargé !');
    } else {
      const md = formatFavoritesAsMarkdown(favoriteWords, user);
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lexique-nouchi-favoris-${(user?.username || 'lexique').toLowerCase()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess('Fichier Markdown téléchargé !');
    }

    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleCopy = () => {
    if (favoriteWords.length === 0) return;

    let fullText = '';
    if (selectedFormat === 'json') {
      fullText = JSON.stringify({
        application: 'Markkanich Le NouchiPro',
        exportedAt: new Date().toISOString(),
        totalFavorites: favoriteWords.length,
        lexicon: favoriteWords
      }, null, 2);
    } else if (selectedFormat === 'csv') {
      // Header + all rows
      const header = 'Terme;Traduction;Nature;Definition;Origine;Exemple';
      const rows = favoriteWords.map(w => `"${w.term}";"${w.frenchTranslation}";"${w.grammaticalCategory}";"${w.definition}";"${w.originLanguage}";"${w.examples?.[0]?.nouchi || ''}"`);
      fullText = [header, ...rows].join('\n');
    } else {
      fullText = formatFavoritesAsMarkdown(favoriteWords, user);
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="export-favorites-modal-overlay"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          id="export-favorites-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#141416] border border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.2)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-black relative">
            <button
              id="btn-close-export-modal"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-black flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black text-amber-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                <Database className="w-3 h-3" /> Espace Utilisateur • Sauvegarde
              </span>
              <span className="text-black/80 font-bold text-xs">
                {favoriteWords.length} mot{favoriteWords.length > 1 ? 's' : ''} dans votre lexique
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-black">
              EXPORTER MON LEXIQUE PERSONNEL 🇨🇮
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-black/90 mt-0.5 max-w-lg">
              Sauvegardez vos mots favoris au format JSON ou CSV (Excel) pour conserver votre carnet de vocabulaire ivoirien hors-ligne.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Stats Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Bookmark className="w-3 h-3 text-amber-500" /> Total Favoris
                </div>
                <div className="text-lg font-black text-white mt-0.5">{stats.total}</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Languages className="w-3 h-3 text-emerald-400" /> Origine n°1
                </div>
                <div className="text-lg font-black text-emerald-400 truncate mt-0.5">{stats.topOrigin}</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" /> Diversité
                </div>
                <div className="text-lg font-black text-sky-400 mt-0.5">{stats.uniqueOrigins} dialectes</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> Propriétaire
                </div>
                <div className="text-lg font-black text-amber-400 truncate mt-0.5">@{user?.username || 'Moi'}</div>
              </div>
            </div>

            {/* Empty State warning if 0 favorited words */}
            {favoriteWords.length === 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Votre lexique de favoris est vide</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Pour sauvegarder des mots, cliquez sur l'étoile/marque-page sur n'importe quel mot du dictionnaire, ou activez notre pack de départ culte.
                  </p>
                </div>
                {onAddSampleFavorites && (
                  <button
                    id="btn-add-sample-favorites"
                    onClick={onAddSampleFavorites}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl inline-flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ajouter le Kit de 5 Mots Cultes d'Abidjan</span>
                  </button>
                )}
              </div>
            )}

            {/* Format Selection Cards */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Choisir le format d'export</span>
                <span className="text-amber-400 font-normal lowercase text-[11px]">téléchargement direct sans inscription</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* JSON */}
                <button
                  id="btn-format-json"
                  onClick={() => setSelectedFormat('json')}
                  className={`p-3.5 rounded-2xl text-left border transition flex flex-col justify-between gap-2 ${
                    selectedFormat === 'json'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs">
                      <FileJson className="w-4 h-4" />
                    </div>
                    {selectedFormat === 'json' && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-white">Format JSON (.json)</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Données brutes complètes, idéal pour développeurs & backup</p>
                  </div>
                </button>

                {/* CSV */}
                <button
                  id="btn-format-csv"
                  onClick={() => setSelectedFormat('csv')}
                  className={`p-3.5 rounded-2xl text-left border transition flex flex-col justify-between gap-2 ${
                    selectedFormat === 'csv'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    {selectedFormat === 'csv' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-white">Tableur CSV (.csv)</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Compatible Excel, Google Sheets, fiches de révision</p>
                  </div>
                </button>

                {/* Markdown */}
                <button
                  id="btn-format-markdown"
                  onClick={() => setSelectedFormat('markdown')}
                  className={`p-3.5 rounded-2xl text-left border transition flex flex-col justify-between gap-2 ${
                    selectedFormat === 'markdown'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-xs">
                      <FileText className="w-4 h-4" />
                    </div>
                    {selectedFormat === 'markdown' && <Check className="w-4 h-4 text-sky-400" />}
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-white">Texte / Markdown (.md)</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Prêt à coller dans Notion, Obsidian, Word ou WhatsApp</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Live Data Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Aperçu de la structure du fichier</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {selectedFormat.toUpperCase()}
                  </span>
                </span>
                
                <button
                  onClick={handleCopy}
                  disabled={favoriteWords.length === 0}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 disabled:opacity-40 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copié dans le presse-papier !' : 'Copier tout'}</span>
                </button>
              </div>

              <div className="bg-[#0b0b0c] border border-slate-800 rounded-2xl p-3.5 font-mono text-[11px] text-slate-300 max-h-40 overflow-y-auto overflow-x-auto whitespace-pre leading-relaxed scrollbar-thin">
                {previewContent}
              </div>
            </div>

            {/* Feedback message */}
            {downloadSuccess && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4" />
                <span>{downloadSuccess}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                id="btn-confirm-download-export"
                onClick={handleDownload}
                disabled={favoriteWords.length === 0}
                className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 text-black font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition shadow-xl shadow-amber-500/20 hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Fichier ({selectedFormat.toUpperCase()})</span>
              </button>

              <button
                id="btn-copy-to-clipboard"
                onClick={handleCopy}
                disabled={favoriteWords.length === 0}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-700 hover:border-amber-500/50 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copié !' : 'Copier le contenu'}</span>
              </button>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-black/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Export sécurisé en local dans votre navigateur • Zéro fuite de données</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
