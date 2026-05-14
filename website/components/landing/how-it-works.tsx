"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    command: "npm install keydrop && npm install -g keydrop-cli",
    title: "Install",
    description: "Add the SDK and CLI to your project. One time setup.",
  },
  {
    number: "02",
    command: "keydrop push",
    title: "Push",
    description: "Your .env gets encrypted with AES-256 and stored securely. You get one key back.",
  },
  {
    number: "03",
    command: 'await import("keydrop/init")',
    title: "Deploy",
    description: "Add one line to your app. Deploy with only KEYDROP_KEY. Everything works.",
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} style={{ padding: "60px 24px 120px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "64px" }} className={isVisible ? "animate-fade-up delay-1" : "opacity-0"}>
        <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          How it works
        </p>
        <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.05", fontFamily: "var(--font-sans)", color: "var(--text)" }}>
          Three steps.
          <br />
          <span style={{ color: "var(--text-muted)" }}>That's all.</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={isVisible ? `animate-fade-up delay-${i + 2}` : "opacity-0"}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "32px",
              borderRadius: "16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-strong)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "42px", color: "var(--border-strong)", lineHeight: "1" }}>
              {step.number}
            </span>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "12px",
              padding: "12px", borderRadius: "10px",
              background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
              color: "var(--accent)", wordBreak: "break-all", minHeight: "56px", display: "flex", alignItems: "center"
            }}>
              $ {step.command}
            </div>
            <div style={{ marginTop: "auto" }}>
              <p style={{ fontWeight: "600", fontSize: "17px", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>{step.title}</p>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", fontFamily: "var(--font-sans)" }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}