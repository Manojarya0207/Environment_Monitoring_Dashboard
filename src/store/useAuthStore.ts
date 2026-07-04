import { create } from "zustand";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoggingIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoggingIn: false,

  login: async (email: string, _password: string) => {
    set({ isLoggingIn: true });

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const name = email.split("@")[0].replace(/[._]/g, " ");
    set({
      isAuthenticated: true,
      user: {
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
      },
      isLoggingIn: false,
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      isLoggingIn: false,
    });
  },
}));
