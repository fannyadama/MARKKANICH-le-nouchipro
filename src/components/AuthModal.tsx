import React, { useState } from 'react';
import { User } from '../types';
import { authAPI, DEMO_USERS } from '../services/api';
import { signInWithGoogle } from '../firebase';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Sparkles, 
  User as UserIcon, 
  Mail, 
  Lock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      onLogin(user);
      onClose();
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err?.message || 'Erreur lors de la connexion avec Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await authAPI.register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
      }

      onLogin(response.data.user);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoUser: User) => {
    setError('');
    setLoading(true);
    try {
      const response = await authAPI.login({
        email: demoUser.email
      });
      onLogin(response.data.user);
      onClose();
    } catch (err: any) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      id="auth-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="auth-modal-box"
        className="relative w-full max-w-md bg-[#161618] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500">
              Espace Communauté Nouchi
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isLogin ? 'Connexion au Compte' : 'Rejoindre le Mouvement'}
            </h2>
          </div>
        </div>

        {/* Google Authentication Button */}
        <button
          id="btn-google-signin"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-md mb-4 cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continuer avec Google (Firebase Auth)</span>
        </button>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative px-3 bg-[#161618] text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            ou par identifiants
          </span>
        </div>

        {/* Quick Demo Switcher */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Comptes Démo Rapides
            </span>
            <span className="text-[10px] text-amber-500">1-Clic</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleDemoLogin(u)}
                className="p-2 rounded-xl bg-[#161618] hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-left transition flex flex-col gap-0.5"
              >
                <span className="text-xs font-bold text-slate-200 truncate">{u.username}</span>
                <span className={`text-[10px] font-semibold ${u.role === 'admin' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {u.role === 'admin' ? '⚡ Admin' : u.role === 'contributor' ? '✍️ Contributeur' : '👤 Membre'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Nom d'utilisateur / Pseudo Nouchi *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Ex: Vieux_Pere_225"
                  required
                  minLength={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Adresse Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre.email@exemple.ci"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Mot de passe *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Traitement en cours...' : isLogin ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          {isLogin ? (
            <p>
              Pas encore de compte ?{' '}
              <button 
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                className="text-amber-400 font-bold hover:underline"
              >
                Créer un compte
              </button>
            </p>
          ) : (
            <p>
              Déjà un compte ?{' '}
              <button 
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                className="text-amber-400 font-bold hover:underline"
              >
                Se connecter
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
