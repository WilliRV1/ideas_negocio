import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

function getFirebaseApp() {
  if (typeof window === 'undefined') return undefined;
  if (!firebaseConfig.apiKey) return undefined;
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

function getFirebaseAuth() {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) auth = getAuth(firebaseApp);
  }
  return auth;
}

function getFirebaseDb() {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) db = getFirestore(firebaseApp);
  }
  return db;
}

function getFirebaseStorage() {
  if (!storage) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) storage = getStorage(firebaseApp);
  }
  return storage;
}

export { getFirebaseAuth as getAuth, getFirebaseDb as getDb, getFirebaseStorage as getStorage };
export default getFirebaseApp;
