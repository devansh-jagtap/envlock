"use client";

const commands = [
  { label: "Install SDK + CLI", code: "npm install keydrop && npm install -g keydrop-cli" },
  { label: "Push your secrets", code: "keydrop push" },
  { label: "Add to your app", code: 'import "keydrop/init";' },
  { label: "Deploy with one key", code: "KEYDROP_KEY=proj_xxx  ← set this in Vercel/Railway" },
];

export default function Install() {
  return (
    <section id="install" style={{ padding: "0 24px 120px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{
        borderRadius: "24px", padding: "56px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-strong)",
      }}>
        <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Get started
        </p>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.1", marginBottom: "48px", fontFamily: "var(--font-sans)", color: "var(--text)" }}>
          Up and running
          <br />
          <span style={{ color: "var(--text-muted)" }}>in minutes.</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
          {commands.map((cmd, i) => (
            <div key={i}>
              <p style={{ fontSize: "10px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
                {i + 1}. {cmd.label}
              </p>
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 18px", borderRadius: "10px",
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)", fontSize: "13px",
              }}>
                <span style={{ color: "var(--text-muted)" }}>$</span>
                <span style={{ color: "var(--text)" }}>{cmd.code}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="https://www.npmjs.com/package/keydrop" target="_blank" rel="noopener noreferrer"
            style={{ padding: "11px 24px", borderRadius: "9999px", fontSize: "14px", fontWeight: "600", background: "var(--accent)", color: "#080808", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View on npm ↗
          </a>
          <a href="https://github.com/devansh-jagtap/keydrop" target="_blank" rel="noopener noreferrer"
            style={{ padding: "11px 24px", borderRadius: "9999px", fontSize: "14px", fontWeight: "500", border: "1px solid var(--border-strong)", color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}