import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDZn3Pe5re0S_WaiBtUVe0J3xzI93NEUko",
  authDomain: "landing-f9bda.firebaseapp.com",
  projectId: "landing-f9bda",
  storageBucket: "landing-f9bda.appspot.com",
  messagingSenderId: "254840276080",
  appId: "1:254840276080:web:e2f08cae9134a83136e0b5",
  measurementId: "G-RWBM2KGC4Z"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, db, auth, storage, analytics };
