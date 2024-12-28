import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  enableMultiTabIndexedDbPersistence
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDZn3Pe5re0S_WaiBtUVe0J3xzI93NEUko",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "landing-f9bda.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "landing-f9bda",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "landing-f9bda.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "254840276080",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:254840276080:web:e2f08cae9134a83136e0b5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RWBM2KGC4Z"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Habilitar persistencia multi-pestaña
enableMultiTabIndexedDbPersistence(db)
  .then(() => {
    console.log('Persistencia de Firestore habilitada');
  })
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn(
        'La persistencia de Firestore no pudo ser habilitada. ' +
        'Múltiples pestañas abiertas al mismo tiempo.'
      );
    } else if (err.code === 'unimplemented') {
      console.warn(
        'El navegador actual no soporta persistencia de Firestore'
      );
    }
  });

// Monitorear estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('Usuario autenticado:', user.email);
  } else {
    console.log('Usuario no autenticado');
  }
});

export { app, db, auth, storage, analytics };
