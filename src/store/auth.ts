import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';

const testUser: User = {
  id: '1',
  uid: '1', // Agregando uid para compatibilidad con Firebase
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin',
  subscription: {
    plan: 'pro',
    status: 'active'
  }
};

export const useAuthStore = create(
  persist<AuthState & {
    login: (user: User) => void;
    logout: () => void;
    createTestUser: () => void;
  }>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: (user: User) => {
        const userWithUid = {
          ...user,
          uid: user.id || user.uid || crypto.randomUUID()
        };
        console.log('Login user:', userWithUid);
        set({ user: userWithUid, isAuthenticated: true, token: 'test-token' });
      },
      logout: () => {
        console.log('Logout user');
        set({ user: null, isAuthenticated: false, token: null });
      },
      createTestUser: () => {
        console.log('Create test user');
        set({ user: testUser, isAuthenticated: true, token: 'test-token' });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    }
  )
);