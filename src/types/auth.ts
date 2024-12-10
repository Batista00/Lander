export interface User {
  id: string;
  uid?: string;  // Campo opcional para compatibilidad con Firebase
  email: string;
  name: string;
  role: string;
  subscription: {
    plan: string;
    status: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}