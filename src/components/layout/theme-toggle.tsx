"use client";

import { useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useUIStore, initializeTheme } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "rounded-full p-2 transition-all duration-200",
            theme === value
              ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
