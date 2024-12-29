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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Log de configuración (sin exponer datos sensibles)
console.log('Firebase configuration loaded:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket
});

// Habilitar persistencia multi-pestaña
enableMultiTabIndexedDbPersistence(db)
  .then(() => {
    console.log('Firestore persistence enabled');
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
