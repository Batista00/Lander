import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from "sonner";
import { FirebaseError } from 'firebase/app';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signIn(email: string, password: string, rememberMe = false) {
    try {
      // Configurar persistencia según la opción de recordar
      if (rememberMe) {
        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch (persistenceError) {
          console.error('Error setting persistence:', persistenceError);
        }
      }

      console.log('Attempting sign in with:', { email, rememberMe });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful:', userCredential);
      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Full authentication error:', error);
      
      if (error instanceof FirebaseError) {
        let errorMessage = 'Error al iniciar sesión';
        console.error('Firebase error code:', error.code);
        console.error('Firebase error message:', error.message);
        
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Esta cuenta ha sido deshabilitada';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No existe una cuenta con este correo electrónico';
            break;
          case 'auth/wrong-password':
            errorMessage = 'La contraseña es incorrecta';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Demasiados intentos fallidos. Por favor, intente más tarde';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Credenciales inválidas. Por favor, verifica tus datos';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet';
            break;
          case 'auth/invalid-api-key':
            errorMessage = 'Error de configuración. Por favor, contacta al soporte';
            break;
          default:
            errorMessage = `Error al iniciar sesión: ${error.code}`;
        }
        console.error('Translated error message:', errorMessage);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      } else {
        const errorMsg = error instanceof Error 
          ? `Error inesperado: ${error.message}`
          : 'Error inesperado al intentar iniciar sesión';
        console.error('Non-Firebase error:', errorMsg);
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    }
  }

  async function signUp(email: string, password: string) {
    try {
      // Validar fortaleza de la contraseña
      if (password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error('La contraseña debe contener al menos una letra mayúscula');
      }
      if (!/[0-9]/.test(password)) {
        throw new Error('La contraseña debe contener al menos un número');
      }

      // Crear cuenta de autenticación
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      try {
        const now = new Date();
        // Crear documento en Firestore con tokens iniciales
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: email,
          name: 'Usuario sin nombre',
          createdAt: now,
          updatedAt: now,
          plan: 'free',
          tokens: {
            remaining: 100,
            used: 0,
            total: 100,
            lastRefill: now,
            monthlyRefillDate: now,
            monthlyLimit: 100,
            updatedAt: now
          }
        });

        toast.success('Registro exitoso');
      } catch (error) {
        // Si falla la creación del documento, eliminar la cuenta de autenticación
        await userCredential.user.delete();
        throw error;
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = 'Error al crear la cuenta';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Ya existe una cuenta con este correo electrónico';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'El registro con correo electrónico no está habilitado';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña es demasiado débil';
            break;
          default:
            errorMessage = `Error al crear la cuenta: ${error.code}`;
        }
        toast.error(errorMessage);
        throw new Error(errorMessage);
      } else {
        const errorMsg = error instanceof Error 
          ? error.message 
          : 'Error inesperado al crear la cuenta';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      toast.success('Sesión cerrada');
    } catch (error) {
      toast.error('Error al cerrar sesión');
      throw error;
    }
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Se ha enviado un correo con instrucciones para restablecer tu contraseña');
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = 'Error al enviar el correo';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No existe una cuenta con este correo electrónico';
            break;
          default:
            errorMessage = 'Error al enviar el correo de restablecimiento';
        }
        toast.error(errorMessage);
      } else {
        toast.error('Error inesperado al enviar el correo de restablecimiento');
      }
      throw error;
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
