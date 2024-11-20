import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';
import { authService } from '../services/authService';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (identifier: string, method: 'email' | 'phone-auth') => {
        let user: User;

        if (method === 'phone-auth') {
          // Create or get user by phone number
          user = {
            id: identifier, // Using phone number as ID for simplicity
            phone: identifier,
            role: 'user',
          };
        } else {
          const { user: emailUser } = await authService.login(identifier, 'password');
          user = emailUser;
        }

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      signup: async (email: string, password: string, name: string) => {
        const { user } = await authService.signup(email, password, name);
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);