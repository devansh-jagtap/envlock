import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KeyDrop | Secure Secret Delivery",
  description: "KeyDrop turns your environment secrets into one secure deployable key for modern applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
