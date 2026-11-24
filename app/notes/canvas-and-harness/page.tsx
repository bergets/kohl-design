import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Canvas and the Harness — kohl.design",
  description:
    "Why designing with coding agents works best when you pair a spatial canvas with your product's design system.",
};

export default function CanvasAndHarnessNotePage() {
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
              The Canvas and the Harness
            </h1>

            <p className="text-xs font-mono text-muted-foreground">
              Nov 24, 2026 · 2 min read
            </p>
          </div>

          <div className="border-t border-border/60 pt-8 space-y-5 font-sans text-base text-foreground/90 leading-relaxed">
            <p>
              Chat is fine for asking a question, but it is a frustrating place
              to design. You ask an agent for a layout, tweak it four times, and
              by the fifth version you have scrolled past everything you tried
              earlier. You cannot compare two directions side by side.
            </p>

            <p>
              Working in a{" "}
              <strong className="font-semibold text-foreground">canvas</strong>{" "}
              fixes that. Instead of overwriting the last screen, each critique
              branches a new frame next to the old one. You see the whole tree
              at once, mark what works, and leave notes where something feels
              off.
            </p>

            <p>
              On its own, though, a canvas still gives you generic AI output if
              the agent has nothing to push against. That is where the{" "}
              <strong className="font-semibold text-foreground">harness</strong>{" "}
              comes in—your product&apos;s design system. Your tokens, your
              components, your{" "}
              <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                AGENTS.md
              </code>
              , and the anti-slop rules you have built up over time.
            </p>

            <p>
              Put them together and the loop gets much calmer. The design system
              keeps every branch on-brand from the first pass, and the canvas
              lets you compare, curate, and feed new rules back into the
              harness.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Button asChild variant="default" size="default">
                <Link href="/playground/branching-critique">
                  Try the canvas prototype
                </Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <a
                  href="https://github.com/bergets/kohl-canvas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  kohl-canvas on GitHub ↗
                </a>
              </Button>
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
