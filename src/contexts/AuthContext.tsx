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
import { toast } from "@/components/ui/use-toast";
import { FirebaseError } from 'firebase/app';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        toast.error('Error al configurar la persistencia', error.message);
        setLoading(false);
      });
  }, []);

  async function signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Inicio de sesión exitoso', 'Bienvenido de vuelta');
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = 'Error al iniciar sesión';
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
          default:
            errorMessage = 'Error al iniciar sesión';
        }
        toast.error('Error de autenticación', errorMessage);
      } else {
        toast.error('Error inesperado', 'Ocurrió un error al intentar iniciar sesión');
      }
      throw error;
    }
  }

  async function signUp(email: string, password: string) {
    try {
      // Crear cuenta de autenticación
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Crear documento en Firestore
      await setDoc(doc(db, 'developers', userCredential.user.uid), {
        email: email,
        name: 'Usuario sin nombre',
        bio: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        portfolio: [],
        skills: [],
        socialLinks: []
      });

      toast.success('Registro exitoso', 'Tu cuenta ha sido creada');
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
            errorMessage = 'Error al crear la cuenta';
        }
        toast.error('Error de registro', errorMessage);
      } else {
        toast.error('Error inesperado', 'Ocurrió un error al intentar crear la cuenta');
      }
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      toast.success('Sesión cerrada', 'Has cerrado sesión correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión', 'No se pudo cerrar la sesión correctamente');
      throw error;
    }
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        'Correo enviado',
        'Se ha enviado un correo con instrucciones para restablecer tu contraseña'
      );
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
        toast.error('Error', errorMessage);
      } else {
        toast.error(
          'Error inesperado',
          'Ocurrió un error al intentar enviar el correo de restablecimiento'
        );
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
