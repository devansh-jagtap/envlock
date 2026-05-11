"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const THEME_KEY = "keydrop-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setDocumentTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <Button variant="outline" onClick={handleToggle} aria-label="Toggle color theme">
      {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    </Button>
  );
}
