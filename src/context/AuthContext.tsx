'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, getDb } from '@/lib/firebase';
import { UserProfile, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
  setUserRole: (uid: string, role: UserRole, extraData?: Record<string, unknown>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    const database = getDb();
    if (!database) return;
    const docRef = doc(database, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserProfile(docSnap.data() as UserProfile);
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    const firebaseAuth = getAuth();
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      setUser(user);
      if (user) {
        await fetchProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const firebaseAuth = getAuth();
    if (!firebaseAuth) throw new Error('Firebase not initialized');
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const firebaseAuth = getAuth();
    const database = getDb();
    if (!firebaseAuth || !database) throw new Error('Firebase not initialized');
    const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await setDoc(doc(database, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email,
      displayName,
      createdAt: new Date(),
      verified: false,
      role: null,
    });
    return cred.user;
  };

  const loginWithGoogle = async () => {
    const firebaseAuth = getAuth();
    const database = getDb();
    if (!firebaseAuth || !database) throw new Error('Firebase not initialized');
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(firebaseAuth, provider);
    const docRef = doc(database, 'users', cred.user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || 'Usuario',
        photoURL: cred.user.photoURL,
        createdAt: new Date(),
        verified: false,
        role: null,
      });
    }
    return cred.user;
  };

  const setUserRole = async (uid: string, role: UserRole, extraData?: Record<string, unknown>) => {
    const database = getDb();
    if (!database) throw new Error('Firebase not initialized');
    const docRef = doc(database, 'users', uid);
    await setDoc(docRef, { role, ...extraData }, { merge: true });
    await fetchProfile(uid);
  };

  const logout = async () => {
    const firebaseAuth = getAuth();
    if (!firebaseAuth) return;
    await signOut(firebaseAuth);
    setUserProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userProfile, loading, login, register, loginWithGoogle, logout, setUserRole, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
