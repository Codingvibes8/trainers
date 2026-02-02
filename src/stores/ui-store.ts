import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface UIState {
  theme: Theme;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: "system",
  isMobileMenuOpen: false,
  isSearchOpen: false,

  setTheme: (theme) => {
    set({ theme });
    
    // Apply theme to document
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
      
      localStorage.setItem("nexshop-theme", theme);
    }
  },

  toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),
  closeSearch: () => set({ isSearchOpen: false }),
}));

// Initialize theme from localStorage on client
export function initializeTheme() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("nexshop-theme") as Theme | null;
    if (stored) {
      useUIStore.getState().setTheme(stored);
    } else {
      useUIStore.getState().setTheme("system");
    }
  }
}
