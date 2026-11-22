import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Compound Design — kohl.design",
  description:
    "Extracting design rules and taste decisions from LLM conversations so your design system compounds over time.",
};

export default function CompoundDesignNotePage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-28 md:pb-14">
        <article className="my-auto py-10 sm:py-16 w-full max-w-2xl space-y-8">
          <div className="space-y-4">
            <Link
              href="/notes"
              className="inline-flex items-center text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to notes
            </Link>

            <h1
              className={`${cooper.className} text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-pine-800 dark:text-crimson-100`}
            >
              Compound Design
            </h1>

            <p className="text-xs font-mono text-muted-foreground">
              Nov 22, 2026 · 2 min read
            </p>
          </div>

          <div className="border-t border-border/60 pt-8 space-y-6 font-sans text-base text-foreground/90 leading-relaxed">
            <p>
              Every time you design or critique UI with an LLM, small taste
              decisions surface—how tight a toolbar should feel, when to use a
              hairline divider instead of a card, or what visual clutter to
              avoid. Normally, those insights evaporate the moment the
              conversation ends.
            </p>

            <p>
              <strong className="font-semibold text-foreground">
                Compound Design
              </strong>{" "}
              is a simple skill built to close that loop. It plugs into any
              design system—whether that is{" "}
              <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                AGENTS.md
              </code>
              ,{" "}
              <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                design-system.md
              </code>
              , or your own token documentation—and extracts the rules,
              anti-patterns, and visual decisions from a session so every future
              prompt starts from a higher baseline.
            </p>

            <p>
              Instead of repeating the same feedback across chats, your design
              system quietly compounds with every iteration.
            </p>

            <div className="pt-2 space-y-4">
              <div className="rounded-lg bg-muted/60 border border-border/60 px-4 py-3 font-mono text-xs sm:text-sm text-foreground">
                npx skills add bergets/skills
              </div>

              <div>
                <Button asChild variant="default">
                  <a
                    href="https://github.com/bergets/skills"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub ↗
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </article>

        <footer className="w-full pt-6 text-xs text-pine-600/70 dark:text-pine-400/50">
          <span>kohl.design · 2026</span>
        </footer>
      </main>
    </div>
  );
}
