"use client";

import { RandomizedTextEffect } from "@/components/ui/randomized-text";

export default function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "100px 24px 20px",
      textAlign: "center",
      position: "relative",
    }}>
      {/* glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px", pointerEvents: "none",
        background: "radial-gradient(ellipse at center top, rgba(34,211,165,0.08) 0%, transparent 70%)",
      }} />

      {/* eyebrow */}
      {/* <div className="animate-fade-up delay-1" style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "5px 14px", borderRadius: "9999px", marginBottom: "32px",
        border: "1px solid rgba(34,211,165,0.25)",
        background: "rgba(34,211,165,0.05)",
        fontSize: "11px", fontWeight: "500", letterSpacing: "0.15em",
        textTransform: "uppercase", color: "var(--accent)",
        fontFamily: "var(--font-sans)",
      }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
        Open Source · Free Forever
      </div> */}

      {/* headline */}
      <h1 className="animate-fade-up delay-2" style={{
        fontSize: "clamp(3rem, 7vw, 6rem)",
        fontWeight: "700",
        letterSpacing: "-0.04em",
        lineHeight: "1",
        color: "var(--text)",
        marginBottom: "16px",
        fontFamily: "var(--font-sans)",
      }}>
        Your entire{" "}
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>.env</span>
        <br />
        one key.
      </h1>

      {/* sub */}
      <p className="animate-fade-up delay-3" style={{
        maxWidth: "480px",
        fontSize: "17px",
        lineHeight: "1.7",
        color: "var(--text-secondary)",
        marginBottom: "40px",
        fontFamily: "var(--font-sans)",
      }}>
        Stop passing around .env files. One command packs all your secrets
        into a single deployable key. Your app works exactly the same.
      </p>

      {/* before/after */}
      <div className="animate-fade-up delay-4" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "12px",
        width: "100%",
        maxWidth: "640px",
        marginBottom: "32px",
        textAlign: "left",
      }}>
        {/* before */}
        <div style={{
          borderRadius: "16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          overflow: "hidden"
        }}>
          {/* macOS window header */}
          <div style={{
            display: "flex", alignItems: "center", padding: "12px 16px",
            borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)"
          }}>
            <div style={{ display: "flex", gap: "6px", flex: 1 }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
            </div>
            <p style={{ fontSize: "10px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-sans)", margin: 0 }}>
              Before
            </p>
            <div style={{ flex: 1 }}></div>
          </div>
          
          <div style={{ padding: "20px" }}>
            <pre style={{ fontSize: "12px", lineHeight: "1.8", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", margin: 0 }}>
{`MONGO_URI=mongodb://...
JWT_SECRET=abc123
STRIPE_KEY=sk_test_xxx
OPENAI_KEY=sk-xxxx`}
            </pre>
          </div>
        </div>

        {/* after */}
        <div style={{
          borderRadius: "16px",
          background: "var(--bg-card)",
          border: "1px solid var(--accent)",
          boxShadow: "0 0 40px rgba(34,211,165,0.08)",
          overflow: "hidden"
        }}>
          {/* macOS window header */}
          <div style={{
            display: "flex", alignItems: "center", padding: "12px 16px",
            borderBottom: "1px solid rgba(34,211,165,0.2)", background: "rgba(34,211,165,0.04)"
          }}>
            <div style={{ display: "flex", gap: "6px", flex: 1 }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56", opacity: 0.8 }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E", opacity: 0.8 }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F", opacity: 0.8 }} />
            </div>
            <p style={{ fontSize: "10px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-sans)", margin: 0, whiteSpace: "nowrap" }}>
              After
            </p>
            <div style={{ flex: 1 }}></div>
          </div>

          <div style={{ padding: "20px" }}>
            <pre style={{ fontSize: "12px", lineHeight: "1.8", fontFamily: "var(--font-mono)", margin: 0, paddingBottom: "14px" }}>
              <span style={{ color: "var(--text-muted)" }}>KEYDROP_KEY=</span>
              <span style={{ color: "var(--accent)" }} className="cursor-blink">
                <RandomizedTextEffect text="proj_x82js8sh" />
              </span>
            </pre>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0, fontFamily: "var(--font-sans)", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "14px" }}>
              Deploy this anywhere. Your app works normally.
            </p>
          </div>
        </div>
      </div>

      {/* ctas */}
      <div className="animate-fade-up delay-5" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="#how-it-works" style={{
          padding: "12px 28px", borderRadius: "9999px", fontSize: "14px",
          fontWeight: "600", background: "var(--accent)", color: "#080808",
          textDecoration: "none", fontFamily: "var(--font-sans)", transition: "opacity 0.2s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          How it works
        </a>
        <a href="https://github.com/devansh-jagtap/keydrop" target="_blank" rel="noopener noreferrer"
          style={{
            padding: "12px 28px", borderRadius: "9999px", fontSize: "14px",
            fontWeight: "500", border: "1px solid var(--border-strong)",
            color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          GitHub ↗
        </a>
      </div>
    </section>
  );
}