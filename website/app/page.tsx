import { ThemeToggleShell } from "@/components/theme-toggle-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Install CLI and SDK",
    description: "Install KeyDrop packages in your project and environment once.",
    detail: "Use keydrop-cli to push secrets and keydrop runtime to inject values at startup.",
  },
  {
    title: "Push your .env securely",
    description: "Run keydrop push to encrypt and upload your environment variables.",
    detail: "Your local setup is converted into a single deployable project key.",
  },
  {
    title: "Deploy with one key",
    description: "Set only KEYDROP_KEY in any target platform.",
    detail: "At runtime, KeyDrop decrypts and injects secrets into process.env automatically.",
  },
];

const features = [
  "Clean deployment flow across local, CI, staging, and production",
  "AES-256-GCM encrypted payload storage",
  "Single-key onboarding for teams and environments",
  "Works with existing application code without refactors",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/0.15),transparent_60%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 md:px-10 md:py-14">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">KeyDrop</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Secure environment management with one deployable key</h1>
          </div>
          <ThemeToggleShell />
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle>Modern secret workflow</CardTitle>
              <CardDescription>
                Replace manual .env distribution with a secure and consistent KeyDrop pipeline.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button href="#setup-steps">Get Started</Button>
              <Button variant="outline" href="https://github.com/devansh-jagtap/keydrop#readme">
                Read Documentation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>At a glance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {features.map((feature) => (
                  <li key={feature} className="rounded-md bg-muted/60 p-3">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="setup-steps">
          <h2 className="text-2xl font-semibold tracking-tight">Setup steps</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Follow these steps to move from scattered secrets to a clean deployment-ready setup.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title}>
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step {index + 1}</p>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
