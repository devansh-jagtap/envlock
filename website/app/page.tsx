import Navbar from "@/components/layout/navbar";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Install from "@/components/landing/install";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)]">
      {/* ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,211,165,0.07) 0%, transparent 70%)",
        }}
      />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Install />
      <Footer />
    </main>
  );
}