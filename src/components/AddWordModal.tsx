import React, { useState, useEffect } from 'react';
import { NouchiWord, Category, DifficultyLevel, User } from '../types';
import { wordsAPI } from '../services/api';
import { speakWord } from '../utils/speech';
import { 
  X, 
  Plus, 
  Trash2, 
  Volume2, 
  BookPlus, 
  Sparkles, 
  Languages, 
  Layers, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWordAdded: (word: NouchiWord) => void;
  editWord?: NouchiWord | null;
  user: User | null;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({
  isOpen,
  onClose,
  onWordAdded,
  editWord,
  user
}) => {
  const [term, setTerm] = useState('');
  const [grammaticalCategory, setGrammaticalCategory] = useState('Nom masculin');
  const [meaning, setMeaning] = useState('');
  const [category, setCategory] = useState<Category>('actions');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('debutant');
  const [pronunciation, setPronunciation] = useState('');
  const [originLanguage, setOriginLanguage] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [synonymsText, setSynonymsText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [examples, setExamples] = useState<{ nouchi: string; french: string }[]>([
    { nouchi: '', french: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editWord) {
      setTerm(editWord.term || '');
      setGrammaticalCategory(editWord.grammaticalCategory || 'Nom masculin');
      setMeaning(editWord.definition || editWord.frenchTranslation || '');
      setCategory(editWord.category || 'actions');
      setDifficultyLevel(editWord.difficultyLevel || 'debutant');
      setPronunciation(editWord.phonetic || '');
      setOriginLanguage(editWord.originLanguage || '');
      setOriginDescription(editWord.etymologyDetails || '');
      setSynonymsText((editWord.synonyms || []).join(', '));
      setTagsText((editWord.tags || []).join(', '));
      setExamples(
        editWord.examples && editWord.examples.length > 0 
          ? editWord.examples.map(ex => ({ nouchi: ex.nouchi, french: ex.french }))
          : [{ nouchi: '', french: '' }]
      );
    } else {
      setTerm('');
      setGrammaticalCategory('Nom masculin');
      setMeaning('');
      setCategory('actions');
      setDifficultyLevel('debutant');
      setPronunciation('');
      setOriginLanguage('Dioula');
      setOriginDescription('');
      setSynonymsText('');
      setTagsText('populaire, babi');
      setExamples([{ nouchi: '', french: '' }]);
    }
  }, [editWord, isOpen]);

  if (!isOpen) return null;

  const handleAddExample = () => {
    setExamples(prev => [...prev, { nouchi: '', french: '' }]);
  };

  const handleRemoveExample = (index: number) => {
    if (examples.length <= 1) return;
    setExamples(prev => prev.filter((_, i) => i !== index));
  };

  const handleExampleChange = (index: number, field: 'nouchi' | 'french', value: string) => {
    const next = [...examples];
    next[index][field] = value;
    setExamples(next);
  };

  const handleTestAudio = () => {
    if (term.trim()) {
      speakWord(term);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!term.trim()) {
      setError('Veuillez renseigner le mot Nouchi.');
      return;
    }
    if (!meaning.trim()) {
      setError('Veuillez renseigner la signification du mot.');
      return;
    }

    setLoading(true);

    try {
      const payload: Partial<NouchiWord> = {
        term: term.trim(),
        grammaticalCategory,
        definition: meaning.trim(),
        frenchTranslation: meaning.trim(),
        category,
        difficultyLevel,
        phonetic: pronunciation.trim() || undefined,
        originLanguage: originLanguage.trim() || 'Abidjan (Hybride)',
        etymologyDetails: originDescription.trim() || undefined,
        synonyms: synonymsText.split(',').map(s => s.trim()).filter(Boolean),
        tags: tagsText.split(',').map(t => t.trim()).filter(Boolean),
        examples: examples.filter(ex => ex.nouchi.trim() || ex.french.trim()),
        contributedBy: user ? {
          id: user.id,
          username: user.username,
          role: user.role
        } : {
          id: 'user-guest',
          username: 'Contributeur Anonyme',
          role: 'user'
        }
      };

      let response;
      if (editWord) {
        response = await wordsAPI.update(editWord.id, payload);
      } else {
        response = await wordsAPI.create(payload);
      }

      onWordAdded(response.data.data as NouchiWord);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la sauvegarde du mot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      id="add-word-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="add-word-modal-box"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161618] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <BookPlus className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500">
              Contribution Lexicale
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {editWord ? `Modifier « ${editWord.term} »` : 'Ajouter un Mot Nouchi'}
            </h2>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Term + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Mot Nouchi *</span>
                {term && (
                  <button 
                    type="button" 
                    onClick={handleTestAudio} 
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Tester l'audio
                  </button>
                )}
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Ex: Chap-chap, Dégamage, Djandjou..."
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Catégorie Thématique *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              >
                <option value="actions">⚡ Actions & Activités</option>
                <option value="personnes">👤 Personnes & Rôles</option>
                <option value="argent">💰 Argent & Travail</option>
                <option value="qualificatifs">💎 Qualificatifs & États</option>
                <option value="transport_lieux">🚕 Transport & Quartiers</option>
                <option value="expressions">💬 Expressions & Idiomes</option>
                <option value="musique_culture">🎵 Culture & Ambiance</option>
              </select>
            </div>
          </div>

          {/* Row 2: Grammatical Category + Pronunciation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Nature Grammaticale
              </label>
              <input
                type="text"
                value={grammaticalCategory}
                onChange={(e) => setGrammaticalCategory(e.target.value)}
                placeholder="Ex: Nom masculin, Verbe transitif, Locution..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Prononciation / Phonétique
              </label>
              <input
                type="text"
                value={pronunciation}
                onChange={(e) => setPronunciation(e.target.value)}
                placeholder="Ex: /tʃap.tʃap/, /de.ɡa.maʒ/..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Signification */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Signification & Définition en Français Standard *
            </label>
            <textarea
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              rows={3}
              placeholder="Expliquez clairement le sens, les nuances et comment ce mot est compris dans la rue à Abidjan..."
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Examples */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Phrases d'exemple en contexte
              </label>
              <button
                type="button"
                onClick={handleAddExample}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter un exemple
              </button>
            </div>

            <div className="space-y-2.5">
              {examples.map((ex, idx) => (
                <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 relative">
                  {examples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExample(idx)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-500 hover:text-rose-400 transition"
                      title="Supprimer l'exemple"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <input
                    type="text"
                    value={ex.nouchi}
                    onChange={(e) => handleExampleChange(idx, 'nouchi', e.target.value)}
                    placeholder="Phrase en Nouchi (ex: Viens on va chap-chap au maquis)"
                    className="w-full bg-[#161618] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={ex.french}
                    onChange={(e) => handleExampleChange(idx, 'french', e.target.value)}
                    placeholder="Traduction française (ex: Viens on va vite au restaurant populaire)"
                    className="w-full bg-[#161618] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Origin & Etymology */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-amber-500" />
                Langue d'Origine
              </label>
              <input
                type="text"
                value={originLanguage}
                onChange={(e) => setOriginLanguage(e.target.value)}
                placeholder="Ex: Dioula, Baoulé, Anglais déformé..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Détail Étymologique
              </label>
              <input
                type="text"
                value={originDescription}
                onChange={(e) => setOriginDescription(e.target.value)}
                placeholder="Ex: Dérive de l'expression populaire..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Row 4: Synonyms & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Synonymes (séparés par virgules)
              </label>
              <input
                type="text"
                value={synonymsText}
                onChange={(e) => setSynonymsText(e.target.value)}
                placeholder="Ex: rapide, vite, sans tarder"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Tags (séparés par virgules)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Ex: jeune, maquis, babi"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-2xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-black shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : editWord ? 'Mettre à jour' : 'Publier le mot 🇨🇮'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
