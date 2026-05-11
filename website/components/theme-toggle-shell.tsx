"use client";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle), {
  ssr: false,
});

export function ThemeToggleShell() {
  return <ThemeToggle />;
}
