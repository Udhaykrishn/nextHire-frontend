import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "candidate" | "employer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  experience?: string;
  role_of_title?: string;
  resume_url?: { key: string; url: string };
  profile_url?: { key: string; url: string };
  bio?: string;
  badge?: boolean;
  skills?: string[];
  languages?: { name: string; proficiency: string }[];
  social_link?: {
    linkedin: string;
    portfolio: string;
    github: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
