"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4" style={{ paddingTop: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          padding: "10px 20px",
          borderRadius: "9999px",
          background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(17,17,17,0.7)",
          border: "1px solid var(--border-strong)",
          backdropFilter: "blur(20px)",
          transition: "all 0.4s ease",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <Image src="/svglogo.webp" alt="KeyDrop Logo" width={36} height={36} quality={100} unoptimized style={{ borderRadius: "6px", filter: "invert(1)", transform: "scale(2.0)" }} />
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
            KeyDrop
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { label: "How it works", href: "#how-it-works" },
            { label: "Install", href: "#install" },
            { label: "GitHub", href: "https://github.com/devansh-jagtap/keydrop", external: true },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {item.label}
            </a>
          ))}
        </div>

        <Link
          href="/dashboard"
          style={{
            fontSize: "13px", fontWeight: "600", padding: "7px 18px",
            borderRadius: "9999px", background: "var(--accent)", color: "#080808",
            textDecoration: "none", fontFamily: "var(--font-sans)", transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}