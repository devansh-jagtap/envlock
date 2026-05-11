"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

const THEME_KEY = "keydrop-theme";

type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      setDocumentTheme(savedTheme);
      return;
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    setDocumentTheme(systemTheme);
  }, []);

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
