"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const THEME_KEY = "keydrop-theme";

type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      setDocumentTheme(savedTheme);
      return;
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    setTheme(systemTheme);
    setDocumentTheme(systemTheme);
  }, []);

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setDocumentTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <Button variant="outline" onClick={handleToggle} aria-label="Toggle color theme">
      {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    </Button>
  );
}
