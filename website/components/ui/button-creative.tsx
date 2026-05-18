"use client";

interface ButtonCreativeProps {
  label: string;
  href: string;
}

export default function ButtonCreative({ label, href }: ButtonCreativeProps) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center w-40 h-[46px] cursor-pointer overflow-hidden rounded-full border border-[var(--accent)] bg-[var(--accent)] px-7 text-center text-sm font-semibold no-underline font-sans"
    >
      <span className="text-[#080808] font-semibold transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
        {label}
      </span>
      <div className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-[#080808] text-[var(--accent)] font-semibold">
        {label}
      </div>
    </a>
  );
}