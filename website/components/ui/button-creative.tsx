"use client";

interface ButtonCreativeProps {
  label: string;
  href: string;
}

export default function ButtonCreative({ label, href }: ButtonCreativeProps) {
  return (
    <a
      href={href}
      className="group relative cursor-pointer overflow-hidden rounded-full border border-[var(--accent)] bg-[var(--accent)] text-center font-semibold"
      style={{
        display: "inline-block",
        padding: "12px 28px",
        fontSize: "14px",
        fontFamily: "var(--font-sans)",
        textDecoration: "none",
        width: "160px",
      }}
    >
      <span
        className="inline-block translate-y-0 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0"
        style={{ color: "#080808", fontWeight: "600" }}
      >
        {label}
      </span>
      <div
        className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 rounded-full group-hover:rounded-none"
        style={{ background: "#080808", color: "var(--accent)", fontWeight: "600" }}
      >
        {label}
      </div>
    </a>
  );
}
