import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';
import { csvAuth } from '../services/csvAuth';

// Initialize admin account
csvAuth.initializeAdmin();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const user = csvAuth.validateCredentials(email, password);
        
        if (!user) {
          throw new Error('Invalid credentials');
        }

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      signup: async (email: string, password: string, name: string) => {
        if (csvAuth.findUser(email)) {
          throw new Error('Email already exists');
        }

        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          password,
          role: 'user' as const,
        };

        csvAuth.addUser(newUser);

        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);