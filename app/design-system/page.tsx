import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, Square, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DesignSystemIndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>kohl.design</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-[4px] bg-pine-50 px-2 py-0.5 text-xs font-semibold text-pine-700 dark:bg-pine-800 dark:text-pine-200">
              Design System v1.0
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
            <span>Component Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            kohl.design Components
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Component-based design system built on top of shadcn/ui. Tailored with dynamic semantic tokens, Pine Forest Green, Crimson Coral, DM Sans and Cooper typography, and multi-project personality presets (Blush, Sharp Tech, Pebble Round).
          </p>
        </div>

        {/* Component Catalog */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Button Card */}
          <Link
            href="/design-system/button"
            className="group rounded-[var(--radius)] border border-border bg-card p-6 shadow-xs hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center size-9 rounded-[var(--radius-sm)] bg-pine-50 text-pine-700 dark:bg-pine-800 dark:text-pine-200">
                  <Square className="size-4" />
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-[var(--radius-sm)]">
                  <CheckCircle2 className="size-3" /> Production Ready
                </span>
              </div>
              <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                Button
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Brand variants (Pine, Crimson, Editorial, Outline, Ghost), tactile click feedback, loading states, and live project preset switcher.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <span>View Component & Presets</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Planned: Card */}
          <div className="rounded-[var(--radius)] border border-dashed border-border bg-muted/20 p-6 flex flex-col justify-between space-y-4 opacity-75">
            <div className="space-y-2">
              <span className="inline-flex items-center justify-center size-9 rounded-[var(--radius-sm)] bg-muted text-muted-foreground">
                <Layers className="size-4" />
              </span>
              <h2 className="text-xl font-semibold text-muted-foreground">Card & Surfaces</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Flat elevation surfaces with subtle 1px border lines, dynamic token radii, and header/content/footer slots.
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Coming Next</span>
          </div>

          {/* Planned: Badge & Tag */}
          <div className="rounded-[var(--radius)] border border-dashed border-border bg-muted/20 p-6 flex flex-col justify-between space-y-4 opacity-75">
            <div className="space-y-2">
              <span className="inline-flex items-center justify-center size-9 rounded-[var(--radius-sm)] bg-muted text-muted-foreground">
                <Sparkles className="size-4" />
              </span>
              <h2 className="text-xl font-semibold text-muted-foreground">Badge & Status Pills</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full-radius status pills for review states (Shipped, Review, In Progress) and metadata tags.
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Coming Next</span>
          </div>
        </div>

        {/* Multi-Project Architecture Note */}
        <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Multi-Project Reuse & Personalities
            </h3>
            <Link
              href="/design-system/button"
              className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
            >
              <span>Test Presets Live</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Need this design system for another side project? Simply override <code className="font-mono text-primary">--radius</code> and <code className="font-mono text-primary">--primary</code> in <code className="font-mono">app/globals.css</code>, or apply <code className="font-mono">data-theme-variant="blush" | "sharp" | "round"</code>. See <code className="font-mono text-foreground">docs/THEME_SHARING.md</code> for copy-paste setups and template instructions.
          </p>
        </div>

        {/* Quick Start Code */}
        <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-semibold">Quick Start</h3>
          <p className="text-xs text-muted-foreground">
            Import the customized button anywhere in your React application:
          </p>
          <pre className="rounded-[var(--radius-sm)] bg-neutral-900 dark:bg-black p-4 text-xs font-mono text-neutral-100 overflow-x-auto">
{`import { Button } from "@/components/ui/button"

export default function MyFeature() {
  return (
    <div className="flex gap-3">
      <Button variant="default">Primary CTA</Button>
      <Button variant="editorial">Editorial</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline" loading>Saving...</Button>
    </div>
  )
}`}
          </pre>
        </div>
      </main>
    </div>
  );
}
