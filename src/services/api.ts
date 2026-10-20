import { NouchiWord, User, WordComment } from '../types';

// Storage keys
const STORAGE_KEYS = {
  TOKEN: 'markkanich_jwt_token',
  USER: 'markkanich_current_user',
  CUSTOM_WORDS: 'markkanich_custom_words',
  COMMENTS: 'markkanich_comments',
  WORD_LIKES: 'markkanich_word_likes'
};

// Initial Seed Users
export const DEMO_USERS: User[] = [
  {
    id: 'user-admin',
    username: 'admin_nouchi',
    email: 'admin@nouchi.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-koffi',
    username: 'Koffi_Abidjan',
    email: 'koffi@babi.ci',
    role: 'contributor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-aicha',
    username: 'Aicha_Cocody',
    email: 'aicha@ci.ci',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  }
];

// Initial Seed Comments
export const INITIAL_SEED_COMMENTS: Record<string, WordComment[]> = {
  's-enjailler': [
    {
      id: 'comm-1',
      wordId: 's-enjailler',
      user: {
        id: 'user-admin',
        username: 'admin_nouchi',
        role: 'admin'
      },
      content: "Ce mot a officiellement intégré le Dictionnaire Le Robert en 2017 suite à l'expansion fulgurante de la musique coupé-décalé.",
      type: 'comment',
      likes: ['user-koffi', 'user-aicha'],
      replies: [
        {
          id: 'rep-1',
          user: {
            id: 'user-koffi',
            username: 'Koffi_Abidjan',
            role: 'contributor'
          },
          content: "Exactement ! DJ Arafat et le Coupé-Décalé ont popularisé le terme à travers toute la francophonie.",
          createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
    },
    {
      id: 'comm-2',
      wordId: 's-enjailler',
      user: {
        id: 'user-aicha',
        username: 'Aicha_Cocody',
        role: 'user'
      },
      content: "On peut aussi l'utiliser sous forme transitive : 'Cette chanson m'enjaille trop !'",
      type: 'suggestion',
      likes: ['user-admin'],
      replies: [],
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ],
  'mogo': [
    {
      id: 'comm-3',
      wordId: 'mogo',
      user: {
        id: 'user-koffi',
        username: 'Koffi_Abidjan',
        role: 'contributor'
      },
      content: "Le terme 'Môgô' vient directement du Mandingue / Dioula où il signifie littéralement être humain ou individu.",
      type: 'correction',
      likes: ['user-admin'],
      replies: [],
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ]
};

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password?: string }) => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 250));
    
    // Check demo users or stored user
    let user = DEMO_USERS.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
    if (!user) {
      // create a session user
      user = {
        id: 'user-' + Date.now(),
        username: credentials.email.split('@')[0] || 'Nouchiman',
        email: credentials.email,
        role: 'contributor'
      };
    }

    const token = 'jwt_token_ci_' + Math.random().toString(36).substring(2) + '_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    return {
      data: {
        token,
        user
      }
    };
  },

  register: async (userData: { username: string; email: string; password?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newUser: User = {
      id: 'user-' + Date.now(),
      username: userData.username,
      email: userData.email,
      role: 'contributor'
    };

    const token = 'jwt_token_ci_' + Math.random().toString(36).substring(2) + '_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

    return {
      data: {
        token,
        user: newUser
      }
    };
  },

  getProfile: async () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) throw new Error('Non authentifié');
    return { data: JSON.parse(userStr) as User };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

// Comments API
export const commentsAPI = {
  getAll: async (wordId: string) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const allComments: Record<string, WordComment[]> = saved ? JSON.parse(saved) : INITIAL_SEED_COMMENTS;
    return {
      data: {
        data: allComments[wordId] || []
      }
    };
  },

  create: async (wordId: string, payload: { content: string; type: 'comment' | 'suggestion' | 'correction'; user: User }) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const allComments: Record<string, WordComment[]> = saved ? JSON.parse(saved) : { ...INITIAL_SEED_COMMENTS };
    
    const newComment: WordComment = {
      id: 'comm-' + Date.now(),
      wordId,
      user: {
        id: payload.user.id,
        username: payload.user.username,
        role: payload.user.role,
        avatar: payload.user.avatar
      },
      content: payload.content,
      type: payload.type || 'comment',
      likes: [],
      replies: [],
      createdAt: new Date().toISOString()
    };

    if (!allComments[wordId]) {
      allComments[wordId] = [];
    }
    allComments[wordId].unshift(newComment);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));

    return {
      data: {
        data: newComment
      }
    };
  },

  like: async (commentId: string, userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const allComments: Record<string, WordComment[]> = saved ? JSON.parse(saved) : { ...INITIAL_SEED_COMMENTS };

    for (const wordId in allComments) {
      const found = allComments[wordId].find(c => c.id === commentId);
      if (found) {
        if (found.likes.includes(userId)) {
          found.likes = found.likes.filter(id => id !== userId);
        } else {
          found.likes.push(userId);
        }
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
        return { data: { liked: found.likes.includes(userId), likes: found.likes } };
      }
    }

    return { data: { liked: false, likes: [] } };
  },

  reply: async (commentId: string, payload: { content: string; user: User }) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const allComments: Record<string, WordComment[]> = saved ? JSON.parse(saved) : { ...INITIAL_SEED_COMMENTS };

    for (const wordId in allComments) {
      const found = allComments[wordId].find(c => c.id === commentId);
      if (found) {
        const newReply = {
          id: 'rep-' + Date.now(),
          user: {
            id: payload.user.id,
            username: payload.user.username,
            role: payload.user.role,
            avatar: payload.user.avatar
          },
          content: payload.content,
          createdAt: new Date().toISOString()
        };
        found.replies.push(newReply);
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
        return { data: { data: newReply } };
      }
    }

    throw new Error('Commentaire non trouvé');
  }
};

// Words API
export const wordsAPI = {
  getAll: async () => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORDS);
    const customWords: NouchiWord[] = saved ? JSON.parse(saved) : [];
    return { data: { data: customWords } };
  },

  create: async (data: Partial<NouchiWord>) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORDS);
    const customWords: NouchiWord[] = saved ? JSON.parse(saved) : [];

    const newWord: NouchiWord = {
      id: 'custom-' + (data.term ? data.term.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : Date.now()),
      term: data.term || 'Mot Nouchi',
      phonetic: data.phonetic || '',
      grammaticalCategory: data.grammaticalCategory || 'Expression nouchi',
      definition: data.definition || '',
      frenchTranslation: data.frenchTranslation || data.definition || '',
      literalMeaning: data.literalMeaning || '',
      originLanguage: data.originLanguage || 'Abidjan (Hybride)',
      etymologyDetails: data.etymologyDetails || '',
      examples: data.examples && data.examples.length > 0 ? data.examples : [{ nouchi: data.term || '', french: data.frenchTranslation || '' }],
      synonyms: data.synonyms || [],
      antonyms: data.antonyms || [],
      category: data.category || 'actions',
      difficultyLevel: data.difficultyLevel || 'debutant',
      tags: data.tags || ['communauté', 'nouveau'],
      likes: data.likes || [],
      contributedBy: data.contributedBy,
      isCommunity: true,
      audioUrl: data.audioUrl
    };

    customWords.unshift(newWord);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORDS, JSON.stringify(customWords));

    return { data: { data: newWord } };
  },

  update: async (id: string, data: Partial<NouchiWord>) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORDS);
    let customWords: NouchiWord[] = saved ? JSON.parse(saved) : [];

    customWords = customWords.map(w => w.id === id ? { ...w, ...data } : w);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORDS, JSON.stringify(customWords));

    const updated = customWords.find(w => w.id === id);
    return { data: { data: updated } };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORDS);
    let customWords: NouchiWord[] = saved ? JSON.parse(saved) : [];

    customWords = customWords.filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORDS, JSON.stringify(customWords));

    return { data: { success: true } };
  },

  like: async (wordId: string, userId: string) => {
    const savedLikes = localStorage.getItem(STORAGE_KEYS.WORD_LIKES);
    const likesMap: Record<string, string[]> = savedLikes ? JSON.parse(savedLikes) : {
      's-enjailler': ['user-admin', 'user-koffi', 'user-aicha'],
      'mogo': ['user-admin', 'user-koffi'],
      'boucantier': ['user-admin', 'user-aicha'],
      'gaou': ['user-admin']
    };

    const currentLikes = likesMap[wordId] || [];
    const isLiked = currentLikes.includes(userId);

    let updatedLikes: string[];
    if (isLiked) {
      updatedLikes = currentLikes.filter(id => id !== userId);
    } else {
      updatedLikes = [...currentLikes, userId];
    }

    likesMap[wordId] = updatedLikes;
    localStorage.setItem(STORAGE_KEYS.WORD_LIKES, JSON.stringify(likesMap));

    return {
      data: {
        liked: !isLiked,
        data: {
          likes: updatedLikes
        }
      }
    };
  },

  uploadAudio: async (wordId: string, file: File | string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { audioUrl: typeof file === 'string' ? file : URL.createObjectURL(file) } };
  }
};
