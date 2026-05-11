"use client";

import { Button } from "@/components/ui/button";

export const THEME_KEY = "keydrop-theme";

type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const handleToggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const nextTheme: Theme = isDark ? "light" : "dark";

    setDocumentTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <Button variant="outline" onClick={handleToggle} aria-label="Toggle color theme">
      Toggle theme
    </Button>
  );
}
