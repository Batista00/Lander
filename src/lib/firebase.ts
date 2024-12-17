import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
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

console.log('Inicializando Firebase con config:', firebaseConfig);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Log del estado de autenticación
auth.onAuthStateChanged((user) => {
  console.log('Estado de autenticación:', user ? 'Usuario autenticado' : 'No autenticado');
  if (user) {
    console.log('ID del usuario:', user.uid);
    console.log('Email:', user.email);
  }
});

export { app, db, auth, storage, analytics };
