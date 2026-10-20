import React, { useState, useMemo, useEffect, useRef } from 'react';
import { NouchiWord, Category, User } from '../types';
import { CATEGORIES_CONFIG } from '../data/nouchiDictionary';
import { speakWord } from '../utils/speech';
import { WordOfTheDayView } from './WordOfTheDayView';
import { 
  Search, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Award, 
  Sparkles, 
  Shuffle, 
  Filter, 
  BookOpen, 
  ChevronRight,
  Info,
  X,
  Plus,
  Heart,
  MessageSquare,
  Users,
  Edit,
  Trash2,
  UserCheck,
  Download,
  FileJson,
  History,
  Clock,
  RotateCcw,
  CornerDownLeft
} from 'lucide-react';

interface DictionaryViewProps {
  words: NouchiWord[];
  bookmarks: string[];
  onToggleBookmark: (wordId: string) => void;
  onSelectWord: (word: NouchiWord) => void;
  onOpenAddWord: () => void;
  onLikeWord: (wordId: string) => void;
  likesMap: Record<string, string[]>;
  commentsCountMap: Record<string, number>;
  user: User | null;
  onEditWord?: (word: NouchiWord) => void;
  onDeleteWord?: (wordId: string) => void;
  onOpenNotificationModal?: () => void;
  onOpenExportFavorites?: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  words,
  bookmarks,
  onToggleBookmark,
  onSelectWord,
  onOpenAddWord,
  onLikeWord,
  likesMap,
  commentsCountMap,
  user,
  onEditWord,
  onDeleteWord,
  onOpenNotificationModal,
  onOpenExportFavorites
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [onlyOfficial, setOnlyOfficial] = useState(false);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [onlyCommunity, setOnlyCommunity] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // 5 Dernières recherches (LocalStorage)
  const LOCAL_STORAGE_RECENT_SEARCHES_KEY = 'nouchipro_recent_searches_v1';

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RECENT_SEARCHES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 5);
        }
      }
    } catch (e) {
      console.warn('Erreur lecture LocalStorage recherches récentes', e);
    }
    return ['Enjailler', 'Kpata', 'Boucantier', 'Môgô', 'Gnan'];
  });

  // Sauvegarde d'un terme recherché (max 5, les plus récents en premier)
  const saveSearchTerm = (term: string) => {
    const clean = term.trim();
    if (!clean || clean.length < 2) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(LOCAL_STORAGE_RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Erreur sauvegarde LocalStorage', e);
      }
      return updated;
    });
  };

  // Suppression d'un terme individuel de l'historique
  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(t => t.toLowerCase() !== termToRemove.toLowerCase());
      try {
        localStorage.setItem(LOCAL_STORAGE_RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Erreur mise à jour LocalStorage', e);
      }
      return updated;
    });
  };

  // Vider tout l'historique des 5 dernières recherches
  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_RECENT_SEARCHES_KEY);
    } catch (e) {
      console.warn('Erreur suppression LocalStorage', e);
    }
  };

  // Suggestions en temps réel pendant la frappe
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Détection du clic à l'extérieur pour fermer le menu de suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calcul intelligent des suggestions en temps réel avec scoring
  const suggestions = useMemo(() => {
    const raw = searchTerm.trim();
    if (raw.length < 1) return [];

    const normQuery = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const scored: { word: NouchiWord; score: number }[] = [];

    for (const word of words) {
      const normTerm = word.term.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const normTranslation = (word.frenchTranslation || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const normDefinition = (word.definition || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      let score = -1;

      // 1. Terme exact
      if (normTerm === normQuery) {
        score = 100;
      }
      // 2. Le terme commence par la requête (ex: "enj" -> "enjailler")
      else if (normTerm.startsWith(normQuery)) {
        score = 80;
      }
      // 3. Un mot à l'intérieur du terme commence par la requête (ex: "bouc" -> "le boucantier")
      else if (normTerm.split(/[\s'-]+/).some(part => part.startsWith(normQuery))) {
        score = 70;
      }
      // 4. La traduction française commence par la requête (ex: "ambian" -> "s'enjailler")
      else if (normTranslation.startsWith(normQuery) || normTranslation.split(/[\s'-]+/).some(part => part.startsWith(normQuery))) {
        score = 60;
      }
      // 5. Le terme contient la requête
      else if (normTerm.includes(normQuery)) {
        score = 50;
      }
      // 6. La traduction française contient la requête
      else if (normTranslation.includes(normQuery)) {
        score = 40;
      }
      // 7. Tags ou langue d'origine
      else if (word.tags?.some(t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normQuery))) {
        score = 30;
      }
      // 8. Définition contient la requête
      else if (normDefinition.includes(normQuery)) {
        score = 20;
      }

      if (score > 0) {
        scored.push({ word, score });
      }
    }

    // Tri par pertinence décroissante puis ordre alphabétique
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.word.term.localeCompare(b.word.term, 'fr');
    });

    return scored.slice(0, 6).map(item => item.word);
  }, [searchTerm, words]);

  // Sélection d'une suggestion
  const handleSelectSuggestion = (word: NouchiWord) => {
    setSearchTerm(word.term);
    saveSearchTerm(word.term);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    onSelectWord(word);
  };

  // Mise en évidence visuelle de la portion recherchée
  const renderHighlighted = (text: string, query: string) => {
    if (!text || !query.trim()) return text;
    const normText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    const idx = normText.indexOf(normQuery);
    if (idx === -1) return text;
    const before = text.substring(0, idx);
    const match = text.substring(idx, idx + normQuery.length);
    const after = text.substring(idx + normQuery.length);
    return (
      <>
        {before}
        <span className="text-amber-400 font-black bg-amber-500/20 px-1 py-0.5 rounded underline decoration-amber-400/60 underline-offset-2">
          {match}
        </span>
        {after}
      </>
    );
  };

  // Auto-enregistrement avec debounce lors de la frappe
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const timer = setTimeout(() => {
        saveSearchTerm(searchTerm);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Filter logic
  const filteredWords = useMemo(() => {
    return words.filter(word => {
      // Bookmark filter
      if (onlyBookmarks && !bookmarks.includes(word.id)) {
        return false;
      }

      // Official Larousse/Robert filter
      if (onlyOfficial && !word.officialStatus) {
        return false;
      }

      // Community contributed filter
      if (onlyCommunity && !word.isCommunity && !word.contributedBy) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && word.category !== selectedCategory) {
        return false;
      }

      // Letter filter
      if (selectedLetter) {
        const firstLetter = word.term.normalize("NFD").replace(/[\u0300-\u036f]/g, "")[0].toUpperCase();
        if (firstLetter !== selectedLetter) {
          return false;
        }
      }

      // Search query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const inTerm = word.term.toLowerCase().includes(query);
        const inDef = word.definition.toLowerCase().includes(query);
        const inTrans = word.frenchTranslation.toLowerCase().includes(query);
        const inOrigin = word.originLanguage.toLowerCase().includes(query);
        const inTags = word.tags?.some(t => t.toLowerCase().includes(query));
        const inExamples = word.examples?.some(e => e.nouchi.toLowerCase().includes(query) || e.french.toLowerCase().includes(query));
        return inTerm || inDef || inTrans || inOrigin || inTags || inExamples;
      }

      return true;
    });
  }, [words, bookmarks, onlyBookmarks, onlyOfficial, onlyCommunity, selectedCategory, selectedLetter, searchTerm]);

  // Letter counts
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALPHABET.forEach(letter => {
      counts[letter] = words.filter(w => {
        const firstLetter = w.term.normalize("NFD").replace(/[\u0300-\u036f]/g, "")[0].toUpperCase();
        return firstLetter === letter;
      }).length;
    });
    return counts;
  }, [words]);

  const handlePlayAudio = (e: React.MouseEvent, word: NouchiWord) => {
    e.stopPropagation();
    setPlayingId(word.id);
    speakWord(word.term);
    setTimeout(() => setPlayingId(null), 1200);
  };

  const handleRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    onSelectWord(words[randomIndex]);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedLetter(null);
    setSelectedCategory('all');
    setOnlyOfficial(false);
    setOnlyBookmarks(false);
    setOnlyCommunity(false);
  };

  const hasActiveFilters = searchTerm || selectedLetter || selectedCategory !== 'all' || onlyOfficial || onlyBookmarks || onlyCommunity;

  return (
    <div id="dictionary-view" className="space-y-6">
      {/* Top Bento Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Bento Card 1: Intro & Histoire avec Mascotte */}
        <div className="md:col-span-4 bg-[#161618] border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] block">
                01. Mascotte & Identité
              </span>
              <div className="w-[52px] h-[52px] rounded-2xl overflow-hidden border-2 border-amber-500/60 bg-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.35)] flex-shrink-0 flex items-center justify-center p-0.5">
                <img
                  src="/logo.jpg"
                  alt="Mascotte NouchiPro"
                  className="w-full h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('markkanich_logo.jpg')) {
                      target.src = '/markkanich_logo.jpg';
                    }
                  }}
                />
              </div>
            </div>
            <p className="text-2xl font-light leading-tight mb-2 text-white">
              L'argot des ghettos devenu <span className="italic font-normal text-amber-400">langue de l'unité.</span>
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Né dans les années 70 à Abidjan, le Nouchi est un trésor vivant constamment enrichi par la jeunesse et la rue ivoirienne.
            </p>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-[10px] text-slate-300 font-semibold">
              #Abidjan
            </span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-[10px] text-slate-300 font-semibold">
              #Identité
            </span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-[10px] text-amber-400 font-semibold">
              #Zouglou
            </span>
          </div>
        </div>

        {/* Bento Card 2: Mot du Jour Spotlight Automatique & Partage Réseaux via WordOfTheDayView */}
        <WordOfTheDayView
          allWords={words}
          onSelectWord={onSelectWord}
          onBookmarkToggle={onToggleBookmark}
          isBookmarked={false}
          onOpenNotificationModal={onOpenNotificationModal}
        />

        {/* Bento Card 3: Action & Community Stats */}
        <div className="md:col-span-4 bg-[#161618] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Stats Lexicales & Ajout
              </span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Direct
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <span className="block text-2xl font-bold text-white">{words.length}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Termes Indexés</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <span className="block text-2xl font-bold text-amber-400">
                  {words.filter(w => w.isCommunity || w.contributedBy).length}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Contributions</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              id="btn-add-word-top"
              onClick={onOpenAddWord}
              className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Proposer un nouveau mot Nouchi
            </button>
          </div>
        </div>
      </div>

      {/* Bento Search & Filter Box */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        
        {/* Search Header with Official Logo & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-2xl overflow-hidden border-2 border-amber-500/80 bg-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex-shrink-0 transition-transform hover:scale-105 flex items-center justify-center p-0.5">
              <img
                src="/logo.jpg"
                alt="Logo Officiel Markkanich"
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('markkanich_logo.jpg')) {
                    target.src = '/markkanich_logo.jpg';
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white tracking-wide flex items-center gap-1.5">
                  <span>Recherche Rapide & Lexique</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Abidjan 2026
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Indexation instantanée par terme nouchi, définition, origine ou exemples.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">
              <strong className="text-amber-400">{filteredWords.length}</strong> / {words.length} mots
            </span>
          </div>
        </div>

        {/* Search Input & Action Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Bar Input */}
          <div ref={searchContainerRef} className="relative w-full md:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
            <input
              id="input-dictionary-search"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                const val = e.target.value;
                setSearchTerm(val);
                setShowSuggestions(val.trim().length >= 1);
                setSelectedSuggestionIndex(-1);
              }}
              onFocus={() => {
                if (searchTerm.trim().length >= 1) {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  if (!showSuggestions && searchTerm.trim().length >= 1) {
                    setShowSuggestions(true);
                  } else if (suggestions.length > 0) {
                    e.preventDefault();
                    setSelectedSuggestionIndex(prev => (prev + 1) % suggestions.length);
                  }
                } else if (e.key === 'ArrowUp') {
                  if (showSuggestions && suggestions.length > 0) {
                    e.preventDefault();
                    setSelectedSuggestionIndex(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
                  }
                } else if (e.key === 'Enter') {
                  if (showSuggestions && selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                    e.preventDefault();
                    handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
                  } else {
                    setShowSuggestions(false);
                    if (searchTerm.trim().length >= 2) {
                      saveSearchTerm(searchTerm);
                    }
                  }
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false);
                  setSelectedSuggestionIndex(-1);
                }
              }}
              placeholder="Chercher un mot (ex: Enjailler, Kpata, Boucantier, Môgô...)"
              className="search-input w-full pl-11 pr-10 py-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowSuggestions(false);
                  setSelectedSuggestionIndex(-1);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
                title="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Menu Déroulant des Suggestions en Temps Réel */}
            {showSuggestions && searchTerm.trim().length >= 1 && (
              <div
                id="dropdown-dictionary-suggestions"
                className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#141416]/98 border border-amber-500/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl overflow-hidden divide-y divide-slate-800/80 animate-fadeIn"
              >
                {/* En-tête des suggestions */}
                <div className="px-4 py-2 bg-slate-950/90 flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-slate-800">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggestions de termes ({suggestions.length})</span>
                  </span>
                  <span className="hidden sm:inline text-slate-400 font-mono text-[10px]">
                    Navigation : ↑ ↓ • ↵ Entrée
                  </span>
                </div>

                {/* Liste des termes suggérés */}
                {suggestions.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/40">
                    {suggestions.map((item, idx) => {
                      const isSelected = selectedSuggestionIndex === idx;
                      const isAudioActive = playingId === item.id;

                      return (
                        <div
                          key={item.id}
                          id={`suggestion-item-${item.id}`}
                          onClick={() => handleSelectSuggestion(item)}
                          onMouseEnter={() => setSelectedSuggestionIndex(idx)}
                          className={`px-4 py-3 cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                            isSelected
                              ? 'bg-amber-500/15 border-l-4 border-amber-400 pl-3'
                              : 'hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center shrink-0 text-amber-400 font-black text-xs">
                              {item.term.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-white tracking-wide">
                                  {renderHighlighted(item.term, searchTerm)}
                                </span>
                                {item.phonetic && (
                                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                                    {item.phonetic}
                                  </span>
                                )}
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                                  {item.grammaticalCategory}
                                </span>
                                {item.officialStatus && (
                                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                                    <Award className="w-2.5 h-2.5 text-emerald-400" />
                                    {item.officialStatus}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-slate-300 truncate mt-0.5">
                                <span className="text-slate-400 font-medium">Sens : </span>
                                {renderHighlighted(item.frenchTranslation || item.definition, searchTerm)}
                              </p>
                            </div>
                          </div>

                          {/* Boutons d'action rapide dans la suggestion */}
                          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={(e) => handlePlayAudio(e, item)}
                              className={`p-1.5 rounded-lg border transition ${
                                isAudioActive
                                  ? 'bg-amber-500 text-black border-amber-500 scale-110'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-400 hover:border-amber-500/40'
                              }`}
                              title="Écouter la prononciation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSelectSuggestion(item)}
                              className="p-1.5 text-slate-400 hover:text-amber-400 transition"
                              title="Ouvrir la fiche complète"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-5 text-center space-y-2">
                    <p className="text-xs text-slate-400">
                      Aucun terme ne correspond directement à <strong className="text-amber-400">« {searchTerm} »</strong>.
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setShowSuggestions(false);
                          if (searchTerm.trim().length >= 2) saveSearchTerm(searchTerm);
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
                      >
                        Rechercher dans tout le texte
                      </button>
                      <button
                        onClick={() => {
                          setShowSuggestions(false);
                          onOpenAddWord();
                        }}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl shadow"
                      >
                        + Proposer ce mot
                      </button>
                    </div>
                  </div>
                )}

                {/* Pied du menu de suggestions */}
                {suggestions.length > 0 && (
                  <div
                    onClick={() => {
                      setShowSuggestions(false);
                      if (searchTerm.trim().length >= 2) saveSearchTerm(searchTerm);
                    }}
                    className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 cursor-pointer text-xs font-semibold text-amber-400 flex items-center justify-between transition"
                  >
                    <span className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-amber-500" />
                      <span>Filtrer les résultats pour « {searchTerm} » ({filteredWords.length} mot{filteredWords.length > 1 ? 's' : ''})</span>
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>Valider</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            <button
              id="btn-filter-larousse"
              onClick={() => { setOnlyOfficial(!onlyOfficial); setOnlyCommunity(false); }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                onlyOfficial
                  ? 'bg-emerald-500 text-black border-emerald-500 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Larousse & Robert
            </button>

            <button
              id="btn-filter-community"
              onClick={() => { setOnlyCommunity(!onlyCommunity); setOnlyOfficial(false); }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                onlyCommunity
                  ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Communauté ({words.filter(w => w.isCommunity || w.contributedBy).length})
            </button>

            <button
              id="btn-filter-bookmarks"
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                onlyBookmarks
                  ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Favoris ({bookmarks.length})
            </button>

            {bookmarks.length > 0 && onOpenExportFavorites && (
              <button
                id="btn-quick-export-from-dictionary"
                onClick={onOpenExportFavorites}
                title="Exporter mes mots favoris en JSON ou CSV"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-400 hover:text-amber-300 transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exporter</span>
              </button>
            )}

            <button
              id="btn-add-word-filter"
              onClick={onOpenAddWord}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-black bg-amber-500 text-black hover:bg-amber-400 shadow-md transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Ajouter
            </button>
          </div>
        </div>

        {/* 5 Dernières Recherches (LocalStorage) */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
              <History className="w-3.5 h-3.5 text-amber-500" />
              <span>Dernières recherches (LocalStorage) :</span>
            </span>

            {recentSearches.length > 0 ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                {recentSearches.map((term, index) => (
                  <div
                    key={`${term}-${index}`}
                    className="inline-flex items-center gap-1 bg-slate-800/90 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-slate-700/70 hover:border-amber-500/50 px-2.5 py-1 rounded-xl text-xs font-medium transition cursor-pointer group"
                    onClick={() => {
                      setSearchTerm(term);
                      saveSearchTerm(term);
                      setShowSuggestions(false);
                    }}
                    title={`Relancer la recherche pour "${term}"`}
                  >
                    <Clock className="w-3 h-3 text-slate-400 group-hover:text-amber-400" />
                    <span>{term}</span>
                    <button
                      type="button"
                      onClick={(e) => removeRecentSearch(e, term)}
                      className="ml-0.5 p-0.5 text-slate-400 hover:text-red-400 rounded hover:bg-black/30 transition"
                      title="Supprimer cette recherche"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-slate-500 text-xs italic">
                Aucune recherche récente enregistrée.
              </span>
            )}
          </div>

          {recentSearches.length > 0 && (
            <button
              onClick={clearAllRecentSearches}
              className="text-[11px] text-slate-400 hover:text-amber-400 font-semibold flex items-center gap-1 self-end sm:self-auto transition shrink-0"
              title="Vider l'historique des recherches"
            >
              <Trash2 className="w-3 h-3" />
              <span>Effacer tout</span>
            </button>
          )}
        </div>

        {/* Alphabet Bar A - Z */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Index Alphabétique A à Z
            </span>
            {selectedLetter && (
              <button
                onClick={() => setSelectedLetter(null)}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Afficher toutes les lettres
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`flex-shrink-0 px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                selectedLetter === null
                  ? 'bg-amber-500 text-black border-amber-500 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              Tous ({words.length})
            </button>

            {ALPHABET.map((letter) => {
              const count = letterCounts[letter] || 0;
              const isSelected = selectedLetter === letter;
              const hasWords = count > 0;

              return (
                <button
                  key={letter}
                  id={`btn-letter-${letter}`}
                  disabled={!hasWords}
                  onClick={() => setSelectedLetter(isSelected ? null : letter)}
                  className={`flex-shrink-0 min-w-[34px] h-[34px] flex items-center justify-center text-xs font-bold rounded-xl border transition ${
                    isSelected
                      ? 'bg-amber-500 text-black border-amber-500 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : hasWords
                      ? 'bg-slate-900 text-slate-300 border-slate-800 hover:text-amber-400 hover:border-amber-500/40'
                      : 'bg-slate-900/30 text-slate-700 border-transparent cursor-not-allowed opacity-30'
                  }`}
                  title={`${letter} (${count} mot${count > 1 ? 's' : ''})`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORIES_CONFIG.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`btn-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarks Dedicated Lexicon Export Banner */}
      {onlyBookmarks && (
        <div className="bg-[#161618] border border-amber-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                Mon Lexique Personnel ({bookmarks.length} mot{bookmarks.length > 1 ? 's' : ''})
              </h4>
              <p className="text-xs text-slate-400">
                Vous consultez vos expressions favorites sauvegardées. Vous pouvez les télécharger pour un usage hors-ligne.
              </p>
            </div>
          </div>

          {onOpenExportFavorites && (
            <button
              id="btn-export-favorites-banner"
              onClick={onOpenExportFavorites}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Exporter mon Lexique (JSON / CSV)</span>
            </button>
          )}
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-300">
            {filteredWords.length} terme{filteredWords.length > 1 ? 's' : ''} trouvé{filteredWords.length > 1 ? 's' : ''}
            {selectedLetter && <span className="text-amber-400 font-bold ml-1">en "{selectedLetter}"</span>}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-400 hover:underline font-medium ml-2"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline">
          Cliquez sur une carte pour explorer l'étymologie et les dialogues
        </span>
      </div>

      {/* Words Grid */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-16 bg-[#161618] border border-slate-800 rounded-3xl p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-slate-200">
              Aucun mot nouchi ne correspond à vos critères
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
              Vous connaissez ce mot ? Vous pouvez l'ajouter dès maintenant à la base collaborative !
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              Voir tout le dictionnaire
            </button>
            <button
              onClick={onOpenAddWord}
              className="px-4 py-2 rounded-xl text-xs font-black bg-amber-500 text-black hover:bg-amber-400"
            >
              + Ajouter ce mot
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => {
            const isBookmarked = bookmarks.includes(word.id);
            const isAudioActive = playingId === word.id;
            const wordLikes = likesMap[word.id] || word.likes || [];
            const isLiked = user ? wordLikes.includes(user.id) : false;
            const commentsCount = commentsCountMap[word.id] || 0;
            const canEdit = !!user && (user.role === 'admin' || (word.contributedBy && word.contributedBy.id === user.id));

            return (
              <div
                key={word.id}
                id={`card-word-${word.id}`}
                onClick={() => onSelectWord(word)}
                className="dict-card group relative bg-[#161618] border border-slate-800 hover:border-amber-500/50 rounded-3xl p-5 sm:p-6 transition-all hover:shadow-[0_0_24px_rgba(245,158,11,0.08)] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-900 text-amber-400 border border-slate-800">
                          {word.grammaticalCategory}
                        </span>
                        {word.officialStatus && (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                            <Award className="w-3 h-3 text-emerald-400" />
                            {word.officialStatus}
                          </span>
                        )}
                        {word.contributedBy && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            @{word.contributedBy.username}
                          </span>
                        )}
                      </div>

                      <h3 className="dict-word text-2xl font-bold text-white mt-2 group-hover:text-amber-400 transition tracking-tight">
                        {word.term}
                      </h3>
                      {word.phonetic && (
                        <span className="text-xs font-mono text-slate-500">
                          {word.phonetic}
                        </span>
                      )}
                    </div>

                    {/* Action buttons on card */}
                    <div className="flex items-center gap-1">
                      {/* Audio */}
                      <button
                        onClick={(e) => handlePlayAudio(e, word)}
                        className={`p-2 rounded-xl border transition ${
                          isAudioActive
                            ? 'bg-amber-500 text-black border-amber-500 scale-110'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/30'
                        }`}
                        title="Prononcer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(word.id);
                        }}
                        className={`p-2 rounded-xl border transition ${
                          isBookmarked
                            ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                            : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                        }`}
                        title="Favori"
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      {/* Edit action for admin/author */}
                      {canEdit && onEditWord && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditWord(word);
                          }}
                          className="p-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 hover:text-amber-400 transition"
                          title="Modifier"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main Translation */}
                  <p className="text-sm font-medium text-slate-200 line-clamp-2 mt-1">
                    {word.frenchTranslation}
                  </p>

                  {/* Example Snippet */}
                  {word.examples && word.examples[0] && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <p className="text-xs text-amber-100/90 italic line-clamp-2">
                        « {word.examples[0].nouchi} »
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer with Likes and Comments stats */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    {/* Like button on card */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeWord(word.id);
                      }}
                      className={`inline-flex items-center gap-1 transition ${
                        isLiked ? 'text-rose-400 font-bold' : 'hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                      <span>{wordLikes.length}</span>
                    </button>

                    {/* Comments count */}
                    <span className="inline-flex items-center gap-1 hover:text-slate-300">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{commentsCount}</span>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                    Détails <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
