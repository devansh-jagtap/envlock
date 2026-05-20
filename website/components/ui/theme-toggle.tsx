"use client";

import { useState } from "react";

export const THEME_KEY = "keydrop-theme";

type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    } catch {}
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setDocumentTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle color theme"
      style={{
        fontSize: "12px",
        fontWeight: "600",
        padding: "7px 14px",
        borderRadius: "9999px",
        border: "1px solid var(--border-strong)",
        background: "var(--bg-secondary)",
        color: "var(--text)",
        fontFamily: "var(--font-sans)",
        cursor: "pointer",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {theme === "dark" ? "☀ Switch to Light" : "🌙 Switch to Dark"}
    </button>
  );
}
