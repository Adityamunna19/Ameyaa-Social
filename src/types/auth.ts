export interface User {
  id: string;
  phone?: string;
  email?: string;
  name?: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, method: 'email' | 'phone-auth') => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}