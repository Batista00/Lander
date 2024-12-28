import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthUser extends User {
  role?: string;
  planId?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getUserData(firebaseUser.uid);
        setUser({
          ...firebaseUser,
          role: userDoc?.role,
          planId: userDoc?.planId,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };
}

async function getUserData(userId: string) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    return userDoc.data();
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
}
