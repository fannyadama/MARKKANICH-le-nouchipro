import React, { useState, useMemo } from 'react';
import { 
  WordSubmission, 
  ModerationComment, 
  NouchiWord, 
  User, 
  Category, 
  DifficultyLevel 
} from '../types';
import { 
  INITIAL_PENDING_SUBMISSIONS, 
  INITIAL_MODERATION_COMMENTS, 
  MOCK_PLATFORM_STATS, 
  MOCK_CATEGORY_STATS, 
  MOCK_NEIGHBORHOOD_STATS, 
  MOCK_HOURLY_TRAFFIC, 
  MOCK_SUBSCRIPTION_METRICS 
} from '../data/adminMockData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Activity, 
  Users, 
  Sparkles, 
  Award, 
  Clock, 
  Search, 
  Filter, 
  Trash2, 
  Flag, 
  Lock, 
  Check, 
  X, 
  Edit3, 
  RefreshCw, 
  Zap, 
  Server, 
  Database, 
  Globe, 
  Volume2, 
  BookOpen, 
  MapPin, 
  ChevronRight,
  Sliders,
  DollarSign,
  Smartphone,
  Download,
  Terminal,
  Code2,
  Layers,
  ExternalLink,
  FileText,
  Copy,
  Box,
  Key,
  Cpu
} from 'lucide-react';

interface AdminDashboardViewProps {
  user: User | null;
  onApproveWordToDictionary: (word: NouchiWord) => void;
  onOpenAuth: () => void;
}

type AdminSubTab = 'overview' | 'submissions' | 'comments' | 'system_logs' | 'mobile_stores';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  user,
  onApproveWordToDictionary,
  onOpenAuth
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AdminSubTab>('overview');
  
  // Submissions State with LocalStorage persistence
  const [submissions, setSubmissions] = useState<WordSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('markkanich_admin_submissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PENDING_SUBMISSIONS;
  });

  // Comments Moderation State with LocalStorage persistence
  const [comments, setComments] = useState<ModerationComment[]>(() => {
    try {
      const saved = localStorage.getItem('markkanich_admin_comments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MODERATION_COMMENTS;
  });

  // Filters state
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [commentFilter, setCommentFilter] = useState<'all' | 'flagged' | 'approved' | 'hidden'>('all');
  const [commentSearch, setCommentSearch] = useState('');

  // Selected Submission Modal for Detailed Review & Editing
  const [inspectingSubmission, setInspectingSubmission] = useState<WordSubmission | null>(null);
  const [rejectReasonModal, setRejectReasonModal] = useState<string | null>(null);
  const [customRejectReason, setCustomRejectReason] = useState('Définition imprécise ou doublon dans le lexique');

  // Mobile Stores Packaging Tab State
  const [activeMobileStore, setActiveMobileStore] = useState<'android' | 'ios' | 'checklist' | 'configs'>('android');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopyCmd = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCommand(label);
      setTimeout(() => setCopiedCommand(null), 2500);
    }
  };

  // Notification / Toast inside Dashboard
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setAdminNotice(msg);
    setTimeout(() => setAdminNotice(null), 3500);
  };

  // Sync state to local storage
  const saveSubmissions = (newSubs: WordSubmission[]) => {
    setSubmissions(newSubs);
    try {
      localStorage.setItem('markkanich_admin_submissions', JSON.stringify(newSubs));
    } catch (e) {
      console.error(e);
    }
  };

  const saveComments = (newComms: ModerationComment[]) => {
    setComments(newComms);
    try {
      localStorage.setItem('markkanich_admin_comments', JSON.stringify(newComms));
    } catch (e) {
      console.error(e);
    }
  };

  // Admin Actions: Approve Word
  const handleApprove = (sub: WordSubmission) => {
    const updated = submissions.map(s => {
      if (s.id === sub.id) {
        return {
          ...s,
          status: 'approved' as const,
          reviewedAt: new Date().toISOString(),
          reviewerNotes: 'Approuvé et synchronisé avec le Grand Dictionnaire Nouchi'
        };
      }
      return s;
    });
    saveSubmissions(updated);
    
    // Add to actual live dictionary state in parent
    onApproveWordToDictionary({
      ...sub.word,
      isCommunity: true,
      officialStatus: sub.word.officialStatus || 'Tendance'
    });

    if (inspectingSubmission?.id === sub.id) {
      setInspectingSubmission(null);
    }

    showNotice(`✅ Le mot « ${sub.word.term} » a été validé et intégré au dictionnaire !`);
  };

  // Admin Actions: Reject Word
  const handleReject = (subId: string, reason: string) => {
    const updated = submissions.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: 'rejected' as const,
          reviewedAt: new Date().toISOString(),
          rejectionReason: reason
        };
      }
      return s;
    });
    saveSubmissions(updated);
    setRejectReasonModal(null);
    if (inspectingSubmission?.id === subId) {
      setInspectingSubmission(null);
    }
    showNotice(`⚠️ Soumission rejetée avec le motif : "${reason}"`);
  };

  // Admin Actions: Delete Submission
  const handleDeleteSubmission = (subId: string) => {
    const updated = submissions.filter(s => s.id !== subId);
    saveSubmissions(updated);
    showNotice(`🗑️ Soumission définitivement supprimée.`);
  };

  // Admin Actions: Moderate Comment
  const handleApproveComment = (commId: string) => {
    const updated = comments.map(c => {
      if (c.id === commId) {
        return { ...c, status: 'approved' as const, flagsCount: 0, flagReason: undefined };
      }
      return c;
    });
    saveComments(updated);
    showNotice(`Commentaire approuvé et rétabli.`);
  };

  const handleHideComment = (commId: string) => {
    const updated = comments.map(c => {
      if (c.id === commId) {
        return { ...c, status: 'hidden' as const };
      }
      return c;
    });
    saveComments(updated);
    showNotice(`Commentaire masqué pour non-respect de la charte.`);
  };

  const handleDeleteComment = (commId: string) => {
    const updated = comments.filter(c => c.id !== commId);
    saveComments(updated);
    showNotice(`Commentaire définitivement supprimé.`);
  };

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(s => {
      const matchFilter = submissionFilter === 'all' ? true : s.status === submissionFilter;
      const matchSearch = submissionSearch === '' ? true : (
        s.word.term.toLowerCase().includes(submissionSearch.toLowerCase()) ||
        s.word.definition.toLowerCase().includes(submissionSearch.toLowerCase()) ||
        s.submittedBy.username.toLowerCase().includes(submissionSearch.toLowerCase()) ||
        (s.neighborhood && s.neighborhood.toLowerCase().includes(submissionSearch.toLowerCase()))
      );
      return matchFilter && matchSearch;
    });
  }, [submissions, submissionFilter, submissionSearch]);

  // Filtered Comments
  const filteredComments = useMemo(() => {
    return comments.filter(c => {
      const matchFilter = commentFilter === 'all' ? true : c.status === commentFilter;
      const matchSearch = commentSearch === '' ? true : (
        c.content.toLowerCase().includes(commentSearch.toLowerCase()) ||
        c.wordTerm.toLowerCase().includes(commentSearch.toLowerCase()) ||
        c.author.username.toLowerCase().includes(commentSearch.toLowerCase())
      );
      return matchFilter && matchSearch;
    });
  }, [comments, commentFilter, commentSearch]);

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const flaggedCommentsCount = comments.filter(c => c.status === 'flagged').length;

  return (
    <div className="space-y-6">
      {/* Toast Notice */}
      {adminNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-black px-5 py-3 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce border border-amber-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>{adminNotice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#161618] border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Console d'Administration & Modération NouchiPro</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tableau de Bord & Observatoire Culturel 🇨🇮
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Supervisez les nouvelles propositions citoyennes, modérez les échanges communautaires et analysez les métriques d’usage de l’intelligence linguistique ivoirienne.
            </p>
          </div>

          {/* Quick Admin Actions & Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Statut Système</p>
                <p className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Opérationnel (SLA 99.99%)
                </p>
              </div>
            </div>

            {user?.role === 'admin' ? (
              <div className="bg-amber-500/15 border border-amber-500/40 text-amber-300 px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Session Super-Admin ({user.username})</span>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-lg"
              >
                <Lock className="w-4 h-4" />
                <span>Connexion Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <button
            id="tab-admin-overview"
            onClick={() => setActiveSubTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSubTab === 'overview'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Vue d'Ensemble & Graphiques</span>
          </button>

          <button
            id="tab-admin-submissions"
            onClick={() => setActiveSubTab('submissions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap relative ${
              activeSubTab === 'submissions'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mots Soumis</span>
            {pendingCount > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeSubTab === 'submissions' ? 'bg-black text-amber-400' : 'bg-amber-500 text-black'
              }`}>
                {pendingCount} en attente
              </span>
            )}
          </button>

          <button
            id="tab-admin-comments"
            onClick={() => setActiveSubTab('comments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap relative ${
              activeSubTab === 'comments'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Modération Commentaires</span>
            {flaggedCommentsCount > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeSubTab === 'comments' ? 'bg-rose-900 text-rose-200' : 'bg-rose-500 text-white'
              }`}>
                {flaggedCommentsCount} signalés
              </span>
            )}
          </button>

          <button
            id="tab-admin-logs"
            onClick={() => setActiveSubTab('system_logs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSubTab === 'system_logs'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Sécurité & Logs</span>
          </button>

          <button
            id="tab-admin-mobile-stores"
            onClick={() => setActiveSubTab('mobile_stores')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSubTab === 'mobile_stores'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-gradient-to-r from-emerald-950/60 to-blue-950/60 text-emerald-300 hover:text-white border border-emerald-500/40 shadow-sm'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Packaging Stores (Android SDK 34 & iOS .ipa)</span>
            <span className="text-[9px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-black uppercase">
              EAS Ready
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. OVERVIEW & RECHARTS ANALYTICS SUBTAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Bento Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>Traductions IA (7j)</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">34 520</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <span>+24.8%</span> par rapport à la semaine passée
              </p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>Mots en Attente</span>
                <Clock className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-amber-400">{pendingCount}</p>
              <p className="text-[11px] text-slate-400">
                Temps moyen d'approbation : <strong>2.4h</strong>
              </p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>Abonnés VIP & B2B</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">
                {MOCK_SUBSCRIPTION_METRICS.activeVipUsers}
              </p>
              <p className="text-[11px] text-emerald-400 font-semibold">
                +48 Entreprises (API B2B)
              </p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>Volume API (Ce mois)</span>
                <Zap className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">1.84M</p>
              <p className="text-[11px] text-slate-400">
                Latence moyenne : <strong className="text-emerald-400">42ms</strong>
              </p>
            </div>
          </div>

          {/* Graph Section 1: Evolution of Translations (Area Chart) */}
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  Flux de Traduction Quotidien (Français ⟷ Nouchi Ivoirien)
                </h3>
                <p className="text-xs text-slate-400">
                  Requêtes enregistrées via le Traducteur IA et les terminaux mobiles
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-3 rounded-full bg-amber-500" /> FR ➔ Nouchi
                </span>
                <span className="flex items-center gap-1.5 text-orange-400">
                  <span className="w-3 h-3 rounded-full bg-orange-500" /> Nouchi ➔ FR
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PLATFORM_STATS} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFrToNouchi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNouchiToFr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="date" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="frToNouchi" name="Français ➔ Nouchi" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorFrToNouchi)" />
                  <Area type="monotone" dataKey="nouchiToFr" name="Nouchi ➔ Français" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorNouchiToFr)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graph Section 2: Distribution by Category & Neighborhood */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown (Pie Chart) */}
            <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  Répartition des Termes par Registre
                </h3>
                <p className="text-xs text-slate-400">
                  Typologie des expressions dans la base de données
                </p>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_CATEGORY_STATS}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="count"
                    >
                      {MOCK_CATEGORY_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      formatter={(value, entry: any) => (
                        <span className="text-xs text-slate-300 font-medium">
                          {entry.payload.category} ({entry.payload.percentage}%)
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Neighborhood Origin (Bar Chart) */}
            <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  Origines & Quartiers d'Abidjan les plus Actifs
                </h3>
                <p className="text-xs text-slate-400">
                  Nombre d'expressions nées ou dominantes par commune
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_NEIGHBORHOOD_STATS} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis type="number" stroke="#737373" fontSize={11} />
                    <YAxis dataKey="neighborhood" type="category" stroke="#737373" fontSize={10} tickFormatter={(val) => val.split(' ')[0]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(value: any, name: any, item: any) => [
                        `${value} termes (Ex: ${item.payload.popularTerm})`,
                        'Contributions'
                      ]}
                    />
                    <Bar dataKey="count" name="Nombre de termes" fill="#f59e0b" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Hourly Load Bar Chart */}
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  Pic d'Affluence Horaire (Fuseau GMT Abidjan)
                </h3>
                <p className="text-xs text-slate-400">
                  Fréquentation maximale en soirée lors des sorties et événements festifs
                </p>
              </div>
              <span className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full font-bold border border-purple-500/30">
                Pic à 21h00 GMT
              </span>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_HOURLY_TRAFFIC}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="hour" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="requests" name="Requêtes / heure" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PENDING WORD SUBMISSIONS SUBTAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'submissions' && (
        <div className="space-y-6">
          {/* Action Bar & Filters */}
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={submissionSearch}
                onChange={(e) => setSubmissionSearch(e.target.value)}
                placeholder="Rechercher par terme, quartier, définition ou auteur..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Status Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['pending', 'approved', 'rejected', 'all'] as const).map((statusKey) => (
                <button
                  key={statusKey}
                  onClick={() => setSubmissionFilter(statusKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap capitalize ${
                    submissionFilter === statusKey
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {statusKey === 'pending' && `En attente (${pendingCount})`}
                  {statusKey === 'approved' && 'Validés'}
                  {statusKey === 'rejected' && 'Refusés'}
                  {statusKey === 'all' && 'Tous'}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="bg-[#161618] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Aucune soumission trouvée</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Toutes les propositions citoyennes correspondant à ce filtre ont été traitées.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((sub) => {
                const isPending = sub.status === 'pending';
                const isApproved = sub.status === 'approved';
                const isRejected = sub.status === 'rejected';

                return (
                  <div
                    key={sub.id}
                    className={`bg-[#161618] border rounded-3xl p-5 sm:p-6 transition-all space-y-4 ${
                      isPending
                        ? 'border-amber-500/40 hover:border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
                        : isApproved
                        ? 'border-emerald-500/30'
                        : 'border-slate-800 opacity-75'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-amber-400 text-base">
                          {sub.word.term.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                              {sub.word.term}
                            </h3>
                            {sub.word.phonetic && (
                              <span className="text-xs font-mono text-slate-400">
                                {sub.word.phonetic}
                              </span>
                            )}
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase ${
                              isPending
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                : isApproved
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}>
                              {isPending ? 'En attente de revue' : isApproved ? 'Validé & Publié' : 'Refusé'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>Soumis par <strong className="text-slate-200">@{sub.submittedBy.username}</strong></span>
                            <span>•</span>
                            <span>{new Date(sub.submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                            {sub.neighborhood && (
                              <>
                                <span>•</span>
                                <span className="text-amber-400 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {sub.neighborhood}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Confidence Score Pill */}
                      {sub.confidenceScore && (
                        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-slate-400">Indice de confiance :</span>
                          <strong className="text-emerald-400">{sub.confidenceScore}%</strong>
                        </div>
                      )}
                    </div>

                    {/* Word Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
                        <p className="text-[10px] uppercase font-bold text-amber-400">Sens & Traduction Française</p>
                        <p className="text-slate-200 font-semibold">{sub.word.frenchTranslation}</p>
                        <p className="text-slate-400 leading-relaxed mt-1">{sub.word.definition}</p>
                      </div>

                      <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
                        <p className="text-[10px] uppercase font-bold text-emerald-400">Origine & Étymologie</p>
                        <p className="text-slate-200 font-semibold">{sub.word.originLanguage}</p>
                        <p className="text-slate-400 leading-relaxed mt-1">{sub.word.etymologyDetails || 'Étymologie urbaine spontanée.'}</p>
                      </div>
                    </div>

                    {/* Examples Preview */}
                    {sub.word.examples.length > 0 && (
                      <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-slate-800/60 text-xs space-y-1.5">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Exemple d'usage en situation :</p>
                        <p className="text-amber-300 font-medium italic">« {sub.word.examples[0].nouchi} »</p>
                        <p className="text-slate-400 text-[11px]">→ {sub.word.examples[0].french}</p>
                      </div>
                    )}

                    {/* Rejection Notes if already rejected */}
                    {sub.rejectionReason && (
                      <div className="bg-rose-950/30 border border-rose-900/60 p-3 rounded-2xl text-xs text-rose-300 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span><strong>Motif de refus :</strong> {sub.rejectionReason}</span>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInspectingSubmission(sub)}
                          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold border border-slate-800 transition"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-500" />
                          <span>Inspecter la fiche complète</span>
                        </button>
                      </div>

                      {/* Decision Buttons */}
                      <div className="flex items-center gap-2">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => setRejectReasonModal(sub.id)}
                              className="flex items-center gap-1.5 bg-rose-950/40 hover:bg-rose-900 text-rose-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-800/60 transition"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Refuser</span>
                            </button>

                            <button
                              onClick={() => handleApprove(sub)}
                              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl text-xs font-black shadow-lg transition"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Valider & Publier au Dictionnaire</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="text-slate-500 hover:text-rose-400 p-2 transition"
                            title="Supprimer l'archive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. COMMENTS MODERATION SUBTAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'comments' && (
        <div className="space-y-6">
          {/* Filter Row */}
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={commentSearch}
                onChange={(e) => setCommentSearch(e.target.value)}
                placeholder="Rechercher par mot-clé, terme du dictionnaire ou utilisateur..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['all', 'flagged', 'approved', 'hidden'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => setCommentFilter(filterKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap capitalize ${
                    commentFilter === filterKey
                      ? 'bg-amber-500 text-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {filterKey === 'all' && 'Tous les commentaires'}
                  {filterKey === 'flagged' && `Signalés (${flaggedCommentsCount})`}
                  {filterKey === 'approved' && 'Approuvés'}
                  {filterKey === 'hidden' && 'Masqués'}
                </button>
              ))}
            </div>
          </div>

          {/* Comments List */}
          {filteredComments.length === 0 ? (
            <div className="bg-[#161618] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Aucun commentaire dans cette catégorie</h3>
              <p className="text-xs text-slate-400">
                La communauté Nouchi respecte parfaitement les règles de convivialité et de respect mutuel.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comm) => {
                const isFlagged = comm.status === 'flagged';
                const isHidden = comm.status === 'hidden';

                return (
                  <div
                    key={comm.id}
                    className={`bg-[#161618] border rounded-3xl p-5 transition-all space-y-3 ${
                      isFlagged
                        ? 'border-rose-500/50 bg-rose-950/10'
                        : isHidden
                        ? 'border-slate-800 opacity-60'
                        : 'border-slate-800'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
                          {comm.author.username.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white flex items-center gap-2">
                            <span>@{comm.author.username}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              sur le mot <strong className="text-amber-400">« {comm.wordTerm} »</strong>
                            </span>
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {new Date(comm.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div>
                        {isFlagged && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            <Flag className="w-3 h-3" /> {comm.flagsCount} signalements
                          </span>
                        )}
                        {isHidden && (
                          <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">
                            Masqué
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                      {comm.content}
                    </div>

                    {/* Flag Reason if applicable */}
                    {comm.flagReason && (
                      <p className="text-[11px] text-rose-400 font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Motif du signalement : {comm.flagReason}
                      </p>
                    )}

                    {/* Moderation Controls */}
                    <div className="pt-2 flex items-center justify-end gap-2">
                      {isFlagged && (
                        <button
                          onClick={() => handleApproveComment(comm.id)}
                          className="flex items-center gap-1.5 bg-emerald-950/40 hover:bg-emerald-900 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-800/60 transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Valider (Faux Positif)</span>
                        </button>
                      )}

                      {!isHidden && (
                        <button
                          onClick={() => handleHideComment(comm.id)}
                          className="flex items-center gap-1.5 bg-rose-950/40 hover:bg-rose-900 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-800/60 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Masquer</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteComment(comm.id)}
                        className="text-slate-500 hover:text-rose-400 p-2 transition"
                        title="Supprimer définitivement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SECURITY & SYSTEM LOGS SUBTAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'system_logs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>Rate Limiter API</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl font-bold text-white">100 req / 15 min</p>
              <p className="text-[11px] text-slate-400">Protection DDoS activée sur Express</p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>Moteur IA Actif</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl font-bold text-white">Gemini 3.7 Flash</p>
              <p className="text-[11px] text-slate-400">Prompting bilingue nouchi optimisé</p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>Sécurité HTTP & CSP</span>
                <Lock className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xl font-bold text-white">Helmet & Sanitizer</p>
              <p className="text-[11px] text-slate-400">XSS & NoSQL Injections bloquées</p>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-500" />
                Journal des Événements & Audit de Sécurité
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/50">
                ● Live Streaming
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {[
                { time: '13:42:15 GMT', type: 'AUTH_LOGIN', desc: 'admin_nouchi a ouvert une session d’administration', ip: '41.207.24.12 (Abidjan)' },
                { time: '13:38:02 GMT', type: 'API_B2B_HIT', desc: 'Token nouchi_live_key_99 validé pour 1 200 traductions batch', ip: '154.68.12.89 (Plateau)' },
                { time: '13:24:50 GMT', type: 'WORD_SUBMIT', desc: 'Nouveau mot soumis par @Dj_Arouna_Yop : "Coup de marteau"', ip: '160.155.8.44 (Yopougon)' },
                { time: '12:58:19 GMT', type: 'SECURITY_SHIELD', desc: 'Tentative de requête malformée neutralisée par express-mongo-sanitize', ip: '198.51.100.4' },
                { time: '12:15:33 GMT', type: 'MODERATION_FLAG', desc: 'Commentaire comm-2 signalé pour spam par 6 utilisateurs', ip: '41.189.160.10' }
              ].map((log, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-[10px]">{log.time}</span>
                    <span className="text-amber-400 font-bold text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {log.type}
                    </span>
                    <span className="text-slate-300 text-xs">{log.desc}</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">{log.ip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MOBILE STORES PACKAGING & EAS BUILD SUBTAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'mobile_stores' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero Banner for Mobile Packaging */}
          <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-blue-950/70 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>Centre de Packaging & Déploiement Mobile Stores</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Génération des Fichiers Natifs Android (.aab SDK 34) & iOS (.ipa)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Configurez, générez et publiez les paquets officiels pour le <strong>Google Play Store</strong> (Android App Bundle conforme SDK 34) et l’<strong>Apple App Store / TestFlight</strong> via les pipelines de build cloud Expo EAS et Capacitor.
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-black/60 border border-emerald-500/40 rounded-2xl p-3.5 text-center min-w-[120px]">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Android Target</p>
                  <p className="text-sm font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> SDK 34 (Android 14)
                  </p>
                </div>
                <div className="bg-black/60 border border-blue-500/40 rounded-2xl p-3.5 text-center min-w-[120px]">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">iOS Target</p>
                  <p className="text-sm font-black text-blue-400 flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> iOS 15.0+ (Universal)
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Sub-Navigation */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveMobileStore('android')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeMobileStore === 'android'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>🤖</span>
                <span>Google Play Store (Android .aab)</span>
              </button>

              <button
                onClick={() => setActiveMobileStore('ios')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeMobileStore === 'ios'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>🍏</span>
                <span>Apple App Store & TestFlight (.ipa)</span>
              </button>

              <button
                onClick={() => setActiveMobileStore('checklist')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeMobileStore === 'checklist'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Checklist de Publication 2024</span>
              </button>

              <button
                onClick={() => setActiveMobileStore('configs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeMobileStore === 'configs'
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Fichiers de Config (app.json / eas.json)</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: GOOGLE PLAY STORE (ANDROID) */}
          {/* ========================================================= */}
          {activeMobileStore === 'android' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Build Commands & Keystore */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      Commandes de Build Android (EAS Cloud)
                    </h3>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-mono">
                      Package: com.markkanich.nouchipro
                    </span>
                  </div>

                  {/* Step 1: Production AAB Build */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">1. Générer le paquet .aab (Production Play Store SDK 34)</span>
                      <button
                        onClick={() => handleCopyCmd('eas build --platform android --profile production', 'cmd_aab')}
                        className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition"
                      >
                        {copiedCommand === 'cmd_aab' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCommand === 'cmd_aab' ? 'Copié !' : 'Copier'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Compile un Android App Bundle conforme SDK 34 optimisé pour la Google Play Console :</p>
                    <code className="block bg-slate-900 text-emerald-300 p-2.5 rounded-xl text-xs font-mono select-all">
                      eas build --platform android --profile production
                    </code>
                  </div>

                  {/* Step 2: Preview APK */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">2. Générer un .apk direct (Test interne sans Play Store)</span>
                      <button
                        onClick={() => handleCopyCmd('eas build --platform android --profile preview', 'cmd_apk')}
                        className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition"
                      >
                        {copiedCommand === 'cmd_apk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCommand === 'cmd_apk' ? 'Copié !' : 'Copier'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Génère un APK directement installable sur tous les smartphones Android à Abidjan pour les tests bêta :</p>
                    <code className="block bg-slate-900 text-amber-300 p-2.5 rounded-xl text-xs font-mono select-all">
                      eas build --platform android --profile preview
                    </code>
                  </div>

                  {/* Step 3: Keystore Generation Command */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5" /> 3. Clé de Signature Release (Keystore)
                      </span>
                      <button
                        onClick={() => handleCopyCmd('keytool -genkey -v -keystore nouchipro-release.keystore -alias nouchipro-key -keyalg RSA -keysize 2048 -validity 10000', 'cmd_key')}
                        className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition"
                      >
                        {copiedCommand === 'cmd_key' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCommand === 'cmd_key' ? 'Copié !' : 'Copier'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Si vous signez manuellement votre app plutôt que via EAS Credentials Cloud :</p>
                    <code className="block bg-slate-900 text-blue-300 p-2.5 rounded-xl text-[11px] font-mono select-all overflow-x-auto">
                      keytool -genkey -v -keystore nouchipro-release.keystore -alias nouchipro-key -keyalg RSA -keysize 2048 -validity 10000
                    </code>
                  </div>
                </div>

                {/* Capacitor Alternative Flow */}
                <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Box className="w-4 h-4 text-cyan-400" />
                    Alternative : Export Natif via Capacitor 6
                  </h3>
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                    <p className="text-slate-400"># 1. Compiler le build web</p>
                    <p className="text-cyan-300">npm run build</p>
                    <p className="text-slate-400 pt-1"># 2. Synchroniser le projet Android Studio</p>
                    <p className="text-cyan-300">npx cap sync android</p>
                    <p className="text-slate-400 pt-1"># 3. Ouvrir dans Android Studio pour générer l'APK/AAB signé</p>
                    <p className="text-cyan-300">npx cap open android</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Play Store Metadata ready to paste */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    Fiche Google Play Console (Prête à coller)
                  </h3>

                  {/* App Title */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400">
                      <span>Titre de l'application (max 30 car.)</span>
                      <button onClick={() => handleCopyCmd('Markkanich : Dictionnaire Nouchi', 'meta_title')} className="text-amber-400 hover:underline">
                        {copiedCommand === 'meta_title' ? 'Copié !' : 'Copier'}
                      </button>
                    </div>
                    <input
                      readOnly
                      value="Markkanich : Dictionnaire Nouchi"
                      className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs text-white font-medium"
                    />
                  </div>

                  {/* Short Description */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400">
                      <span>Description courte (max 80 car.)</span>
                      <button onClick={() => handleCopyCmd("Le grand dictionnaire interactif du Nouchi ivoirien avec traducteur IA et audio.", 'meta_short')} className="text-amber-400 hover:underline">
                        {copiedCommand === 'meta_short' ? 'Copié !' : 'Copier'}
                      </button>
                    </div>
                    <textarea
                      readOnly
                      rows={2}
                      value="Le grand dictionnaire interactif du Nouchi ivoirien avec traducteur IA et audio."
                      className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs text-white font-medium resize-none"
                    />
                  </div>

                  {/* Long Description */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400">
                      <span>Description complète (Play Store)</span>
                      <button onClick={() => handleCopyCmd(`Découvrez Markkanich Le NouchiPro, l'application de référence sur le Nouchi et l'argot ivoirien d'Abidjan !\n\n🇨🇮 Plus de 500 mots et expressions authentiques décryptés avec étymologie, exemples et prononciation vocale.\n🤖 Traducteur bilingue Français ⟷ Nouchi propulsé par l'IA.\n🏆 Quiz culturel interactif et diplôme de Nouchiman officiel à débloquer.\n📅 Mot du jour exclusif avec partage facile sur WhatsApp et réseaux sociaux.\n\nRejoignez la plus grande communauté culturelle de Babi !`, 'meta_long')} className="text-amber-400 hover:underline">
                        {copiedCommand === 'meta_long' ? 'Copié !' : 'Copier'}
                      </button>
                    </div>
                    <textarea
                      readOnly
                      rows={7}
                      value={`Découvrez Markkanich Le NouchiPro, l'application de référence sur le Nouchi et l'argot ivoirien d'Abidjan !\n\n🇨🇮 Plus de 500 mots et expressions authentiques décryptés avec étymologie, exemples et prononciation vocale.\n🤖 Traducteur bilingue Français ⟷ Nouchi propulsé par l'IA.\n🏆 Quiz culturel interactif et diplôme de Nouchiman officiel à débloquer.\n📅 Mot du jour exclusif avec partage facile sur WhatsApp et réseaux sociaux.\n\nRejoignez la plus grande communauté culturelle de Babi !`}
                      className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs text-slate-300 font-medium resize-none"
                    />
                  </div>

                  {/* Graphic Assets Specs */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <p className="font-bold text-amber-400">Dimensions Graphiques Requises :</p>
                    <ul className="text-slate-400 space-y-1 text-[11px]">
                      <li>• <strong>Icône de l'app :</strong> 512 x 512 px (PNG 32-bit sans transparence)</li>
                      <li>• <strong>Image de présentation (Feature Graphic) :</strong> 1024 x 500 px (JPEG/PNG)</li>
                      <li>• <strong>Captures d'écran :</strong> Minimum 4 captures (1080 x 2400 px format 9:16)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: APPLE APP STORE & TESTFLIGHT */}
          {/* ========================================================= */}
          {activeMobileStore === 'ios' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-400" />
                      Commandes de Build iOS & TestFlight (EAS Cloud)
                    </h3>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/30 font-mono">
                      Bundle ID: com.markkanich.nouchipro
                    </span>
                  </div>

                  {/* Step 1: Production IPA */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400">1. Générer le paquet .ipa (App Store & TestFlight)</span>
                      <button
                        onClick={() => handleCopyCmd('eas build --platform ios --profile production', 'cmd_ipa')}
                        className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition"
                      >
                        {copiedCommand === 'cmd_ipa' ? <Check className="w-3 h-3 text-blue-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCommand === 'cmd_ipa' ? 'Copié !' : 'Copier'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Compile un binaire iOS signé pour distribution sur TestFlight et publication finale :</p>
                    <code className="block bg-slate-900 text-blue-300 p-2.5 rounded-xl text-xs font-mono select-all">
                      eas build --platform ios --profile production
                    </code>
                  </div>

                  {/* Step 2: EAS Submit to App Store Connect */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">2. Envoi automatique sur App Store Connect</span>
                      <button
                        onClick={() => handleCopyCmd('eas submit --platform ios --latest', 'cmd_submit_ios')}
                        className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition"
                      >
                        {copiedCommand === 'cmd_submit_ios' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCommand === 'cmd_submit_ios' ? 'Copié !' : 'Copier'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Transfère directement le build vers TestFlight sans avoir besoin de Mac avec Xcode :</p>
                    <code className="block bg-slate-900 text-emerald-300 p-2.5 rounded-xl text-xs font-mono select-all">
                      eas submit --platform ios --latest
                    </code>
                  </div>

                  {/* Info.plist Permissions */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <p className="font-bold text-purple-400">Déclarations de Confidentialité (Info.plist) :</p>
                    <div className="space-y-1 font-mono text-[11px] text-slate-300 bg-slate-900 p-3 rounded-xl">
                      <p className="text-slate-400">&lt;!-- Reconnaissance vocale nouchi --&gt;</p>
                      <p><span className="text-amber-400">NSSpeechRecognitionUsageDescription</span> : "Permet la dictée et la prononciation des mots en nouchi."</p>
                      <p className="text-slate-400 pt-1">&lt;!-- Microphone pour recherche vocale --&gt;</p>
                      <p><span className="text-amber-400">NSMicrophoneUsageDescription</span> : "Requis pour la recherche vocale."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: App Store Connect Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Fiche App Store Connect (iOS)
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Catégorie Principale</p>
                      <p className="text-white font-semibold mt-0.5">Référence / Éducation (Culture & Langues)</p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Classement d'âge (Age Rating)</p>
                      <p className="text-white font-semibold mt-0.5">12+ (Expressions urbaines et argot populaire)</p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Mots-clés ASO (Keywords)</p>
                      <p className="text-amber-300 font-mono text-[11px] mt-0.5">nouchi, dictionnaire, abidjan, argot, traduction, cote divoire, babi</p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">URL d'Assistance (Support URL)</p>
                      <p className="text-blue-400 font-mono text-[11px] mt-0.5">https://markkanich-nouchipro.web.app/support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CHECKLIST DE PUBLICATION 2024 */}
          {/* ========================================================= */}
          {activeMobileStore === 'checklist' && (
            <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                    Checklist de Validation Google Play & Apple App Store
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tous les prérequis obligatoires pour éviter tout rejet lors de la soumission de Markkanich Le NouchiPro.
                  </p>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/30 font-bold">
                  8 / 8 Critères Validés
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: '1. Conformité Android Target SDK 34 (Android 14)',
                    desc: 'Obligatoire sur Google Play depuis août 2024. Défini dans app.json & eas.json.',
                    status: 'OK',
                    badge: 'SDK 34'
                  },
                  {
                    title: '2. Politique de Confidentialité Active (Privacy Policy)',
                    desc: 'Hébergée en ligne avec explications sur les données du compte et les permissions micro.',
                    status: 'OK',
                    badge: 'GDPR / APDP'
                  },
                  {
                    title: '3. Test Interne Play Console (20 Testeurs / 14 jours)',
                    desc: 'Requis pour les nouveaux comptes développeurs individuels Google Play.',
                    status: 'OK',
                    badge: 'Closed Track'
                  },
                  {
                    title: '4. Apple Privacy Nutrition Labels',
                    desc: 'Déclaration zéro tracking tiers et respect des données personnelles sur App Store.',
                    status: 'OK',
                    badge: 'No Tracking'
                  },
                  {
                    title: '5. Gestion Hors-ligne & PWA Cache',
                    desc: 'Dictionnaire 500 mots accessible même en zone à faible couverture réseau.',
                    status: 'OK',
                    badge: 'Offline-Ready'
                  },
                  {
                    title: '6. Compatibilité Multi-Écrans (Mobile & Tablette)',
                    desc: 'Design Tailwind responsive testé sur écrans 4.7" à 12.9" iPads.',
                    status: 'OK',
                    badge: 'Adaptive UI'
                  },
                  {
                    title: '7. Déclaration Sécurité & Chiffrement (ITSAppUsesNonExempt)',
                    desc: 'Défini sur `false` dans Info.plist pour éviter les formulaires d’export complexes.',
                    status: 'OK',
                    badge: 'Export Free'
                  },
                  {
                    title: '8. Icônes Adaptatives & Splash Screen Sombre',
                    desc: 'Fichiers icon-512.png et splash.png aux formats requis 1:1 et 9:16.',
                    status: 'OK',
                    badge: 'Asset Ready'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 font-black" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-bold text-white">{item.title}</p>
                        <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: CONFIGURATION FILES VIEW */}
          {/* ========================================================= */}
          {activeMobileStore === 'configs' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* app.json view */}
              <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    app.json (Expo / Android SDK 34 / iOS)
                  </h4>
                  <button
                    onClick={() => handleCopyCmd(`{
  "expo": {
    "name": "Markkanich Le NouchiPro",
    "slug": "markkanich-nouchipro",
    "version": "1.0.0",
    "android": {
      "package": "com.markkanich.nouchipro",
      "versionCode": 1,
      "compileSdkVersion": 34,
      "targetSdkVersion": 34
    },
    "ios": {
      "bundleIdentifier": "com.markkanich.nouchipro",
      "buildNumber": "1"
    }
  }
}`, 'copy_app_json')}
                    className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
                  >
                    {copiedCommand === 'copy_app_json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCommand === 'copy_app_json' ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-72 scrollbar-thin">
{`{
  "expo": {
    "name": "Markkanich Le NouchiPro",
    "slug": "markkanich-nouchipro",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./public/icon-512.png",
    "userInterfaceStyle": "dark",
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.markkanich.nouchipro",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.markkanich.nouchipro",
      "versionCode": 1,
      "compileSdkVersion": 34,
      "targetSdkVersion": 34,
      "minSdkVersion": 24
    }
  }
}`}
                </pre>
              </div>

              {/* eas.json view */}
              <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    eas.json (EAS Build Profiles)
                  </h4>
                  <button
                    onClick={() => handleCopyCmd(`{
  "build": {
    "preview": {
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  }
}`, 'copy_eas_json')}
                    className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
                  >
                    {copiedCommand === 'copy_eas_json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCommand === 'copy_eas_json' ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11px] font-mono text-blue-300 overflow-x-auto max-h-72 scrollbar-thin">
{`{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": {
        "buildType": "app-bundle",
        "gradleCommand": ":app:bundleRelease"
      },
      "ios": {
        "enterprise": false
      }
    }
  }
}`}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Reject Reason Prompt */}
      {/* ========================================================================= */}
      {rejectReasonModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-rose-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                Motif du Refus de la Soumission
              </h3>
              <button onClick={() => setRejectReasonModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Veuillez indiquer au contributeur la raison pour laquelle ce mot n'a pas été retenu dans le Grand Dictionnaire :
            </p>

            <div className="space-y-2">
              {[
                'Doublon avec un terme déjà homologué',
                'Définition trop imprécise ou exemples manquants',
                'Contenu non conforme à la charte culturelle Nouchi',
                'Étymologie erronée nécessitant des vérifications'
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => setCustomRejectReason(reason)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition border ${
                    customRejectReason === reason
                      ? 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            <textarea
              value={customRejectReason}
              onChange={(e) => setCustomRejectReason(e.target.value)}
              rows={2}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              placeholder="Précisez un motif personnalisé..."
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setRejectReasonModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Annuler
              </button>
              <button
                onClick={() => handleReject(rejectReasonModal, customRejectReason)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg transition"
              >
                Confirmer le Refus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Full Submission Inspector */}
      {/* ========================================================================= */}
      {inspectingSubmission && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161618] border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-black text-amber-400 text-xl">
                  {inspectingSubmission.word.term.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {inspectingSubmission.word.term}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {inspectingSubmission.word.grammaticalCategory} • {inspectingSubmission.word.originLanguage}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingSubmission(null)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Metadata Grid */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-[10px] uppercase font-bold text-amber-400">Définition Complète</p>
                <p className="text-slate-200 leading-relaxed text-sm">{inspectingSubmission.word.definition}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-emerald-400">Sens Littéral</p>
                  <p className="text-slate-300 mt-1">{inspectingSubmission.word.literalMeaning || 'Sens direct dans la rue.'}</p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-blue-400">Synonymes</p>
                  <p className="text-slate-300 mt-1">{inspectingSubmission.word.synonyms.join(', ') || 'Aucun synonyme spécifié'}</p>
                </div>
              </div>

              {/* Examples */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-[10px] uppercase font-bold text-slate-400">Exemples d'usage</p>
                {inspectingSubmission.word.examples.map((ex, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-0.5">
                    <p className="text-amber-300 font-semibold italic">« {ex.nouchi} »</p>
                    <p className="text-slate-400 text-[11px]">→ {ex.french}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setInspectingSubmission(null)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800"
              >
                Fermer
              </button>

              {inspectingSubmission.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setRejectReasonModal(inspectingSubmission.id);
                    }}
                    className="px-4 py-2.5 bg-rose-950/50 hover:bg-rose-900 text-rose-300 rounded-xl text-xs font-bold border border-rose-800/60"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={() => handleApprove(inspectingSubmission)}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-black shadow-lg"
                  >
                    Valider & Publier au Dictionnaire
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
