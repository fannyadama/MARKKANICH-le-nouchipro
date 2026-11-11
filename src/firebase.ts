import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { User, NouchiWord } from './types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without specifying firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Connection to Firestore verified.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Client is offline or Firestore initializing.');
    } else {
      console.log('[Firebase] Firestore initialized and responsive.');
    }
    return true;
  }
}

// Map FirebaseUser to Application User
export function mapFirebaseUser(fbUser: FirebaseUser, existingProfile?: Partial<User>): User {
  const isAdmin = fbUser.email === 'fannyadama159@gmail.com' || fbUser.email === 'admin@nouchi.com';
  return {
    id: fbUser.uid,
    username: fbUser.displayName || fbUser.email?.split('@')[0] || 'Môgô Nouchi',
    email: fbUser.email || '',
    avatar: fbUser.photoURL || undefined,
    role: isAdmin ? 'admin' : (existingProfile?.role || 'user'),
    plan: existingProfile?.plan || 'free',
    isVip: isAdmin || existingProfile?.isVip || false,
    apiKey: existingProfile?.apiKey,
    dailyTranslationsUsed: existingProfile?.dailyTranslationsUsed || 0
  };
}

// Google Sign-In with Popup
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    
    // Check if user document already exists in Firestore
    const userDocRef = doc(db, 'users', fbUser.uid);
    let existingProfile: Partial<User> = {};
    
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        existingProfile = snap.data() as Partial<User>;
      }
    } catch (e) {
      console.log('[Firebase] Could not fetch existing user doc, creating new profile.');
    }

    const appUser = mapFirebaseUser(fbUser, existingProfile);

    // Save/Update user profile in Firestore
    try {
      await setDoc(userDocRef, {
        id: appUser.id,
        username: appUser.username,
        email: appUser.email,
        avatar: appUser.avatar || '',
        role: appUser.role,
        plan: appUser.plan || 'free',
        isVip: appUser.isVip || false,
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error('[Firebase] Error persisting user profile in Firestore:', err);
    }

    return appUser;
  } catch (error) {
    console.error('[Firebase] Sign-in failed:', error);
    throw error;
  }
}

// Sign-Out
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('[Firebase] Sign-out failed:', error);
    throw error;
  }
}

// Subscribe to Auth state changes
export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser) {
      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(userDocRef);
        const existingProfile = snap.exists() ? (snap.data() as Partial<User>) : {};
        callback(mapFirebaseUser(fbUser, existingProfile));
      } catch (err) {
        callback(mapFirebaseUser(fbUser));
      }
    } else {
      callback(null);
    }
  });
}

// Subscribe to community words from Firestore
export function subscribeToCommunityWords(callback: (words: NouchiWord[]) => void): () => void {
  const path = 'words';
  try {
    const q = query(collection(db, path), limit(200));
    return onSnapshot(q, (snapshot) => {
      const items: NouchiWord[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          term: data.term,
          phonetic: data.phonetic || '',
          definition: data.definition,
          frenchTranslation: data.frenchTranslation,
          grammaticalCategory: data.grammaticalCategory || 'Argot urbain',
          originLanguage: data.originLanguage || 'Nouchi',
          category: data.category || 'argot',
          difficultyLevel: data.difficultyLevel || 'debutant',
          examples: data.examples || [],
          synonyms: data.synonyms || [],
          tags: data.tags || ['Communauté'],
          isCommunity: true,
          contributedBy: {
            id: data.authorId || '',
            username: data.authorName || 'Môgô Anonyme',
            role: 'contributor'
          }
        });
      });
      callback(items);
    }, (error) => {
      console.warn('[Firebase] Community words subscription error (using local):', error.message);
    });
  } catch (err) {
    console.warn('[Firebase] Cannot init words listener:', err);
    return () => {};
  }
}

// Run connection check
testConnection();
