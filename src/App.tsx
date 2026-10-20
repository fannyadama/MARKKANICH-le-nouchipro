import React, { useState, useEffect, useMemo } from 'react';
import { NOUCHI_DICTIONARY } from './data/nouchiDictionary';
import { NouchiWord, User, PricingPlan, BillingCycle, Currency, PaymentTransaction } from './types';
import { Header, ActiveHeaderTab } from './components/Header';
import { DictionaryView } from './components/DictionaryView';
import { HistoryView } from './components/HistoryView';
import { TranslatorView } from './components/TranslatorView';
import { QuizView } from './components/QuizView';
import { ProverbsView } from './components/ProverbsView';
import { PricingView } from './components/PricingView';
import { ApiConsoleView } from './components/ApiConsoleView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { GamificationHubView } from './components/GamificationHubView';
import { CheckoutModal } from './components/CheckoutModal';
import { CertificateModal } from './components/CertificateModal';
import { WordDetailModal } from './components/WordDetailModal';
import { AuthModal } from './components/AuthModal';
import { AddWordModal } from './components/AddWordModal';
import { DailyWordNotificationModal } from './components/DailyWordNotificationModal';
import { ShareAppModal } from './components/ShareAppModal';
import { ExportFavoritesModal } from './components/ExportFavoritesModal';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { authAPI, wordsAPI, INITIAL_SEED_COMMENTS } from './services/api';
import { notificationService } from './services/notificationService';
import { getDeterministicDailyWord } from './utils/dailyWordHelper';
import { speakWord } from './utils/speech';
import { hapticManager } from './utils/haptics';
import { 
  Heart, 
  BookOpen, 
  Award, 
  Languages, 
  MapPin, 
  Sparkles, 
  Users,
  CheckCircle2,
  Crown,
  Code2,
  Bell,
  Download
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveHeaderTab>('dictionary');
  const [selectedWord, setSelectedWord] = useState<NouchiWord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddWordOpen, setIsAddWordOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<NouchiWord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Push Notification & Share Modals
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExportFavoritesOpen, setIsExportFavoritesOpen] = useState(false);

  // Monetization modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const [checkoutBillingCycle, setCheckoutBillingCycle] = useState<BillingCycle>('monthly');
  const [checkoutCurrency, setCheckoutCurrency] = useState<Currency>('XOF');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // User auth state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('markkanich_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Custom community words state
  const [customWords, setCustomWords] = useState<NouchiWord[]>(() => {
    try {
      const saved = localStorage.getItem('markkanich_custom_words');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'custom-chap-chap',
        term: 'Chap-chap',
        phonetic: '/tʃap.tʃap/',
        grammaticalCategory: 'Adverbe / Locution',
        definition: 'Faire quelque chose très vite, en express, sans perdre de temps.',
        frenchTranslation: 'Vite fait, en vitesse, expressément',
        literalMeaning: 'À la vitesse de l’éclair',
        originLanguage: 'Abidjan (Onomatopée)',
        etymologyDetails: 'Issu de l’anglais "chop chop" ou onomatopée urbaine désignant l’accélération.',
        examples: [
          { nouchi: 'Gbonhi, on gère ce dossier chap-chap et on décolle.', french: 'L’équipe, on règle cette affaire rapidement et on part.' }
        ],
        synonyms: ['vite', 'rapido', 'en deux deux'],
        antonyms: ['doucement', 'mollo'],
        category: 'actions',
        difficultyLevel: 'debutant',
        tags: ['incontournable', 'populaire', 'vitesse'],
        likes: ['user-admin', 'user-koffi'],
        isCommunity: true,
        contributedBy: {
          id: 'user-koffi',
          username: 'Koffi_Abidjan',
          role: 'contributor'
        }
      }
    ];
  });

  // Combined words list
  const allWords = useMemo(() => {
    return [...customWords, ...NOUCHI_DICTIONARY];
  }, [customWords]);

  // Likes map per wordId
  const [likesMap, setLikesMap] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('markkanich_word_likes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      's-enjailler': ['user-admin', 'user-koffi', 'user-aicha'],
      'mogo': ['user-admin', 'user-koffi'],
      'boucantier': ['user-admin', 'user-aicha'],
      'gaou': ['user-admin'],
      'custom-chap-chap': ['user-admin', 'user-koffi']
    };
  });

  // Comments map per wordId
  const [commentsMap, setCommentsMap] = useState<Record<string, any[]>>(() => {
    try {
      const saved = localStorage.getItem('markkanich_comments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SEED_COMMENTS;
  });

  // Bookmarks state with localStorage persistence
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('markkanich_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['s-enjailler', 'boucantier', 'gaou', 'mogo', 'kpakpato'];
  });

  // Daily Word computed deterministically
  const currentDailyWord = useMemo(() => {
    return getDeterministicDailyWord(allWords, new Date());
  }, [allWords]);

  // Favorite words objects
  const favoriteWords = useMemo(() => {
    return allWords.filter(w => bookmarks.includes(w.id));
  }, [allWords, bookmarks]);

  const handleAddSampleFavorites = () => {
    const sampleIds = ['s-enjailler', 'boucantier', 'gaou', 'mogo', 'kpakpato', 'gbairai', 'chap-chap'];
    const validIds = allWords
      .filter(w => sampleIds.includes(w.id) || sampleIds.includes(w.term.toLowerCase()))
      .map(w => w.id);
    setBookmarks(prev => Array.from(new Set([...prev, ...validIds])));
    hapticManager.trigger('favorite_add');
    showToast('✨ 5 mots cultes ajoutés à votre lexique favori !');
  };

  // Push Notification background scheduler & Service Worker message watcher
  useEffect(() => {
    const cleanupWatcher = notificationService.startScheduleWatcher(() => currentDailyWord);

    const cleanupActions = notificationService.onNotificationAction((action, data) => {
      console.log('[App] Received notification action from SW:', action, data);
      
      if (data?.wordId) {
        const targetWord = allWords.find(w => w.id === data.wordId);
        if (targetWord) {
          setActiveTab('dictionary');
          setSelectedWord(targetWord);
          setIsModalOpen(true);

          if (action === 'pronounce_word') {
            setTimeout(() => speakWord(targetWord.term), 500);
          } else if (action === 'share_word') {
            setTimeout(() => setIsShareModalOpen(true), 400);
          }
        }
      }
    });

    return () => {
      cleanupWatcher();
      cleanupActions();
    };
  }, [currentDailyWord, allWords]);

  // Handle URL deep linking (e.g. from Push Notification click: ?word=mogo&source=push_notification)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const wordParam = params.get('word');
      const source = params.get('source');

      if (wordParam) {
        const found = allWords.find(w => w.id === wordParam || w.term.toLowerCase() === wordParam.toLowerCase());
        if (found) {
          setActiveTab('dictionary');
          setSelectedWord(found);
          setIsModalOpen(true);
          if (source === 'push_notification') {
            showToast(`🇨🇮 Mot du Jour : « ${found.term} »`);
          }
        }
      }
    }
  }, [allWords]);

  useEffect(() => {
    try {
      localStorage.setItem('markkanich_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('markkanich_custom_words', JSON.stringify(customWords));
    } catch (e) {
      console.error(e);
    }
  }, [customWords]);

  useEffect(() => {
    try {
      localStorage.setItem('markkanich_word_likes', JSON.stringify(likesMap));
    } catch (e) {
      console.error(e);
    }
  }, [likesMap]);

  // Handle Paystack Return / Redirect URL parameter verification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const reference = searchParams.get('reference') || searchParams.get('trxref');
      if (reference && !sessionStorage.getItem(`pstk_verified_${reference}`)) {
        sessionStorage.setItem(`pstk_verified_${reference}`, 'true');
        fetch(`/api/paystack/verify/${encodeURIComponent(reference)}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.verified) {
              const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
              const planId = (data.data?.metadata?.planId as any) || 'pro_vip';
              const updatedUser: User = {
                ...(user || {
                  id: `user-${Date.now()}`,
                  username: data.data?.metadata?.customerName || 'Nouchiman_VIP',
                  email: data.data?.customer?.email || 'client@nouchipro.ci',
                  role: 'user'
                }),
                plan: planId,
                isVip: true,
                apiKey: planId === 'business_api' ? `nouchi_live_${Math.random().toString(36).substring(2, 15)}` : undefined
              };

              const tx: PaymentTransaction = {
                id: `tx_${Date.now()}`,
                planId: planId,
                amount: data.amount || 2500,
                currency: (data.currency as any) || 'XOF',
                paymentMethod: 'paystack',
                billingCycle: 'monthly',
                status: 'completed',
                date: new Date().toISOString(),
                invoiceNumber: invoiceNumber,
                customerName: updatedUser.username,
                customerPhoneOrEmail: updatedUser.email,
                paystackReference: reference
              };

              handlePaymentSuccess(tx, updatedUser);
              hapticManager.trigger('celebration');
              window.history.replaceState({}, document.title, window.location.pathname);
            }
          })
          .catch(err => console.error('Erreur vérification Paystack callback:', err));
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleBookmark = (wordId: string) => {
    setBookmarks(prev => {
      const isAlready = prev.includes(wordId);
      const next = isAlready ? prev.filter(id => id !== wordId) : [...prev, wordId];
      hapticManager.favorite(!isAlready);
      showToast(isAlready ? 'Mot retiré des favoris' : 'Mot ajouté aux favoris ⭐');
      return next;
    });
  };

  const handleSelectWord = (word: NouchiWord) => {
    setSelectedWord(word);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    showToast(`Bienvenue, @${newUser.username} !`);
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    showToast('Déconnexion réussie');
  };

  const handleLikeWord = async (wordId: string) => {
    const currentUserId = user?.id || 'guest-user';
    const currentLikes = likesMap[wordId] || [];
    const isLiked = currentLikes.includes(currentUserId);

    const updatedLikes = isLiked 
      ? currentLikes.filter(id => id !== currentUserId)
      : [...currentLikes, currentUserId];

    setLikesMap(prev => ({
      ...prev,
      [wordId]: updatedLikes
    }));

    hapticManager.like(!isLiked);
    showToast(isLiked ? 'Like retiré' : 'Mot liké ❤️ !');
  };

  const handleWordAddedOrUpdated = (savedWord: NouchiWord) => {
    setCustomWords(prev => {
      const exists = prev.some(w => w.id === savedWord.id);
      if (exists) {
        return prev.map(w => w.id === savedWord.id ? savedWord : w);
      }
      return [savedWord, ...prev];
    });
    setSelectedWord(savedWord);
    showToast(editingWord ? 'Mot mis à jour avec succès !' : 'Nouveau mot publié dans la communauté 🇨🇮 !');
    setEditingWord(null);
  };

  const handleDeleteWord = async (wordId: string) => {
    await wordsAPI.delete(wordId);
    setCustomWords(prev => prev.filter(w => w.id !== wordId));
    showToast('Mot supprimé du lexique');
  };

  const handleEditWord = (word: NouchiWord) => {
    setEditingWord(word);
    setIsAddWordOpen(true);
  };

  const handleSelectPlanForCheckout = (plan: PricingPlan, cycle: BillingCycle, currency: Currency) => {
    setSelectedPlanForCheckout(plan);
    setCheckoutBillingCycle(cycle);
    setCheckoutCurrency(currency);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (transaction: PaymentTransaction, updatedUser: User) => {
    setUser(updatedUser);
    try {
      localStorage.setItem('markkanich_current_user', JSON.stringify(updatedUser));
      const txHistory = JSON.parse(localStorage.getItem('markkanich_transactions') || '[]');
      txHistory.unshift(transaction);
      localStorage.setItem('markkanich_transactions', JSON.stringify(txHistory));
    } catch (e) {
      console.error(e);
    }
    setToastMessage(`Abonnement ${transaction.planId === 'business_api' ? 'Business API' : 'VIP Pro'} activé avec succès ! 👑`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const commentsCountMap = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const id in commentsMap) {
      counts[id] = (commentsMap[id] || []).length;
    }
    return counts;
  }, [commentsMap]);

  const officialCount = allWords.filter(w => !!w.officialStatus).length;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 flex flex-col font-sans relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-amber-500 text-black font-extrabold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Header */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 z-10 space-y-3">
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          wordCount={allWords.length}
          officialCount={officialCount}
          bookmarkCount={bookmarks.length}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          onOpenAddWord={() => {
            setEditingWord(null);
            setIsAddWordOpen(true);
          }}
          onOpenPricing={() => setActiveTab('pricing')}
          onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onOpenExportFavorites={() => setIsExportFavoritesOpen(true)}
          customWordsCount={customWords.length}
          likesCount={Object.values(likesMap).reduce((acc: number, curr: any) => acc + (Array.isArray(curr) ? curr.length : 0), 0)}
        />

        {/* Offline & Service Worker Status Bar */}
        <OfflineStatusBanner wordCount={allWords.length} />
      </div>

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10">
        {activeTab === 'dictionary' && (
          <DictionaryView
            words={allWords}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectWord={handleSelectWord}
            onOpenAddWord={() => {
              setEditingWord(null);
              setIsAddWordOpen(true);
            }}
            onLikeWord={handleLikeWord}
            likesMap={likesMap}
            commentsCountMap={commentsCountMap}
            user={user}
            onEditWord={handleEditWord}
            onDeleteWord={handleDeleteWord}
            onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
            onOpenExportFavorites={() => setIsExportFavoritesOpen(true)}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingView
            user={user}
            onSelectPlan={handleSelectPlanForCheckout}
            onOpenApiConsole={() => setActiveTab('api-console')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {activeTab === 'gamification' && (
          <GamificationHubView
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenAddWord={() => setIsAddWordOpen(true)}
            favoriteWords={favoriteWords}
            onOpenExportFavorites={() => setIsExportFavoritesOpen(true)}
            onSelectWord={handleSelectWord}
          />
        )}

        {activeTab === 'api-console' && (
          <ApiConsoleView
            user={user}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboardView
            user={user}
            onApproveWordToDictionary={handleWordAddedOrUpdated}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'translator' && (
          <TranslatorView
            user={user}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'proverbs' && <ProverbsView />}

        {activeTab === 'history' && <HistoryView />}
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlanForCheckout}
        billingCycle={checkoutBillingCycle}
        currency={checkoutCurrency}
        user={user}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        user={user}
      />

      {/* Word Detail Modal */}
      <WordDetailModal
        word={selectedWord}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isBookmarked={selectedWord ? bookmarks.includes(selectedWord.id) : false}
        onToggleBookmark={handleToggleBookmark}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLikeWord={handleLikeWord}
        isLiked={selectedWord && user ? (likesMap[selectedWord.id] || []).includes(user.id) : false}
        likesCount={selectedWord ? (likesMap[selectedWord.id]?.length || 0) : 0}
        onEditWord={handleEditWord}
        onDeleteWord={handleDeleteWord}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      {/* Add / Edit Word Modal */}
      <AddWordModal
        isOpen={isAddWordOpen}
        onClose={() => {
          setIsAddWordOpen(false);
          setEditingWord(null);
        }}
        onWordAdded={handleWordAddedOrUpdated}
        editWord={editingWord}
        user={user}
      />

      {/* Push Notification Modal for Mot du Jour */}
      <DailyWordNotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        currentDailyWord={currentDailyWord}
        user={user}
        onAwardBonusPoints={(points, reason) => {
          showToast(`+${points} XP gagnés : ${reason} 🇨🇮 !`);
        }}
        onSelectWord={handleSelectWord}
      />

      {/* Share Modal */}
      <ShareAppModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dailyWord={currentDailyWord}
      />

      {/* Export Favorites / Personal Lexicon Modal */}
      <ExportFavoritesModal
        isOpen={isExportFavoritesOpen}
        onClose={() => setIsExportFavoritesOpen(false)}
        favoriteWords={favoriteWords}
        user={user}
        onSelectWord={handleSelectWord}
        onAddSampleFavorites={handleAddSampleFavorites}
      />

      {/* Bento-Styled Footer */}
      <footer className="mt-12 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 z-10">
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-2xl overflow-hidden border-2 border-amber-500/70 bg-slate-950 shadow-[0_0_22px_rgba(245,158,11,0.35)] flex-shrink-0 flex items-center justify-center p-0.5">
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
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Markkanich <span className="text-amber-500">Le NouchiPro</span>
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">
                    L'intelligence Culturelle Ivoirienne
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                Le grand dictionnaire interactif du Nouchi ivoirien. Du code secret né dans les cinémas d'Adjamé en 1970 jusqu'à la consécration aux dictionnaires Larousse et Robert.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Abidjan, Côte d'Ivoire 🇨🇮</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 mb-3">
                Sections & Explorations
              </h4>
              <ul className="space-y-2 text-xs font-medium text-slate-400">
                <li>
                  <button onClick={() => setActiveTab('dictionary')} className="hover:text-amber-400 transition flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Dictionnaire Alphabétique A-Z
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('history')} className="hover:text-amber-400 transition flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Histoire, Étymologie & Essai
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('translator')} className="hover:text-amber-400 transition flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-amber-500" /> Traducteur Bilingue IA
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('quiz')} className="hover:text-amber-400 transition flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> Test du Vrai Nouchiman
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('proverbs')} className="hover:text-amber-400 transition flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Sagesses & Proverbes
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('admin')} className="hover:text-amber-400 transition flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-500" /> Dashboard & Modération
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 mb-3">
                Communauté & Reconnaissance
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Petit Larousse & Le Robert</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
                  <Users className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Contributions Collaboratives</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Markkanich Le NouchiPro. Fait avec passion pour le patrimoine ivoirien.</p>
            <p className="flex items-center gap-1">
              Conçu pour l'excellence culturelle 🇨🇮
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
