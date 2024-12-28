import { auth } from './firebase';
import { User } from 'firebase/auth';

export function getCurrentUser(): User {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No hay usuario autenticado');
  }
  return user;
}

export function useAuth() {
  const user = auth.currentUser;
  return { user };
}
