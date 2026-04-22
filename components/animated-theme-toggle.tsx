"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  type ThemeSelection,
  ThemeToggler,
} from "@/components/animate-ui/primitives/effects/theme-toggler";

interface AnimatedThemeToggleProps {
  direction?: "ltr" | "rtl" | "ttb" | "btt";
  className?: string;
}

export function AnimatedThemeToggle({
  direction = "ltr",
  className = "",
}: AnimatedThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = (theme as ThemeSelection) || "system";
  const currentResolved = (resolvedTheme as "light" | "dark") || "light";

  return (
    <ThemeToggler
      theme={currentTheme}
      resolvedTheme={currentResolved}
      setTheme={(newTheme: ThemeSelection) => setTheme(newTheme)}
      direction={direction}
    >
      {({ effective, toggleTheme }) => (
        <button
          type="button"
          onClick={() => {
            if (effective === "light") toggleTheme("dark");
            else if (effective === "dark") toggleTheme("system");
            else toggleTheme("light");
          }}
          className={`rounded-lg border border-zinc-300 bg-white p-3 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${className}`}
          aria-label="Toggle theme"
          suppressHydrationWarning
        >
          {effective === "system" ? (
            <Monitor className="h-5 w-5" suppressHydrationWarning />
          ) : effective === "dark" ? (
            <Moon className="h-5 w-5" suppressHydrationWarning />
          ) : (
            <Sun className="h-5 w-5" suppressHydrationWarning />
          )}
        </button>
      )}
    </ThemeToggler>
  );
}
