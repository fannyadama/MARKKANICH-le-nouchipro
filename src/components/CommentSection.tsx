import React, { useState, useEffect } from 'react';
import { WordComment, User } from '../types';
import { commentsAPI } from '../services/api';
import { hapticManager } from '../utils/haptics';
import { 
  MessageSquare, 
  ThumbsUp, 
  CornerDownRight, 
  Send, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
  User as UserIcon
} from 'lucide-react';

interface CommentSectionProps {
  wordId: string;
  wordTerm: string;
  user: User | null;
  onOpenAuth: () => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  wordId,
  wordTerm,
  user,
  onOpenAuth
}) => {
  const [comments, setComments] = useState<WordComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState<'comment' | 'suggestion' | 'correction'>('comment');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [wordId]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await commentsAPI.getAll(wordId);
      setComments(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await commentsAPI.create(wordId, {
        content: newComment.trim(),
        type: commentType,
        user
      });
      setNewComment('');
      setComments(prev => [res.data.data, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }

    try {
      const res = await commentsAPI.like(commentId, user.id);
      const isNowLiked = res.data.likes?.includes(user.id);
      hapticManager.like(Boolean(isNowLiked));
      setComments(prev =>
        prev.map(c => {
          if (c.id === commentId) {
            return { ...c, likes: res.data.likes };
          }
          return c;
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    if (!replyContent.trim()) return;

    try {
      const res = await commentsAPI.reply(commentId, {
        content: replyContent.trim(),
        user
      });
      setComments(prev =>
        prev.map(c => {
          if (c.id === commentId) {
            return { ...c, replies: [...(c.replies || []), res.data.data] };
          }
          return c;
        })
      );
      setReplyContent('');
      setReplyingTo(null);
    } catch (e) {
      console.error(e);
    }
  };

  const getTypeBadge = (type: 'comment' | 'suggestion' | 'correction') => {
    switch (type) {
      case 'suggestion':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Suggestion d'usage
          </span>
        );
      case 'correction':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Correction étymologique
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> Discussion
          </span>
        );
    }
  };

  return (
    <div id={`comments-section-${wordId}`} className="space-y-6 pt-6 border-t border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-extrabold text-white">
            Commentaires, Débats & Suggestions ({comments.length})
          </h3>
        </div>

        {!user && (
          <button
            onClick={onOpenAuth}
            className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            <Lock className="w-3.5 h-3.5" /> Se connecter pour participer
          </button>
        )}
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <label className="text-xs font-bold text-slate-300">
            {user ? (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Commenter en tant que <strong className="text-white">@{user.username}</strong>
              </span>
            ) : (
              'Partagez une nuance, un nouvel exemple ou une correction :'
            )}
          </label>

          <div className="flex items-center gap-1 bg-[#161618] p-1 rounded-xl border border-slate-800">
            {(['comment', 'suggestion', 'correction'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setCommentType(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition capitalize ${
                  commentType === t
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t === 'comment' ? 'Commentaire' : t === 'suggestion' ? 'Suggestion' : 'Correction'}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={`Votre avis ou note culturelle sur « ${wordTerm} »...`}
          rows={3}
          required
          className="w-full bg-[#161618] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
        />

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            💡 Contribuez à enrichir la mémoire vivante de la langue d'Abidjan.
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {submitting ? 'Envoi...' : 'Publier'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-6 text-xs text-slate-500">
            Chargement des discussions...
          </div>
        ) : comments.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-500">
            Soyez le premier à commenter ou apporter une nuance pour ce terme !
          </div>
        ) : (
          comments.map((comment) => {
            const hasLiked = user ? comment.likes?.includes(user.id) : false;

            return (
              <div 
                key={comment.id}
                id={`comment-item-${comment.id}`}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xs font-black text-amber-400 uppercase">
                      {comment.user.username.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          @{comment.user.username}
                        </span>
                        {comment.user.role === 'admin' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                            ADMIN
                          </span>
                        )}
                        {comment.user.role === 'contributor' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            CONTRIBUTEUR
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {getTypeBadge(comment.type)}
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-9">
                  {comment.content}
                </p>

                {/* Actions: Like & Reply */}
                <div className="flex items-center gap-3 pl-9 pt-1">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition ${
                      hasLiked
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                        : 'bg-[#161618] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{comment.likes?.length || 0}</span>
                  </button>

                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 font-semibold transition"
                  >
                    <CornerDownRight className="w-3.5 h-3.5" />
                    Répondre ({comment.replies?.length || 0})
                  </button>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-9 mt-3 space-y-2 pl-3 border-l-2 border-slate-800">
                    {comment.replies.map((rep) => (
                      <div key={rep.id} className="p-2.5 rounded-xl bg-[#161618] border border-slate-800 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-200">
                            @{rep.user.username}
                          </span>
                          <span className="text-[9px] text-slate-500">
                            {new Date(rep.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {rep.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="ml-9 mt-3 p-3 rounded-xl bg-[#161618] border border-slate-800 space-y-2">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Répondre à @${comment.user.username}...`}
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setReplyingTo(null); setReplyContent(''); }}
                        className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReplySubmit(comment.id)}
                        className="px-4 py-1 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400"
                      >
                        Répondre
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
