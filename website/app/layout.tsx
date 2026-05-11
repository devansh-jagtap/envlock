import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KeyDrop | Secure Secret Delivery",
  description: "KeyDrop turns your environment secrets into one secure deployable key for modern applications.",
};

const themeInitScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem("keydrop-theme");
    const isDark = savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.classList.toggle("dark", isDark);
  } catch {
    document.documentElement.classList.remove("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
