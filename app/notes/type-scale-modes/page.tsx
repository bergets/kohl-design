import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Type Scale Modes — kohl.design",
  description:
    "Why one rigid type scale isn't enough, and how compact, editorial, and expressive modes solve it.",
};

const MODES = [
  {
    mode: "compact",
    useCase: "Dense tools, schedules, tables, settings",
    spec: "14px base · 1.20 ratio · 1.45 leading · 58ch",
  },
  {
    mode: "editorial",
    useCase: "Reading, notes, calm consumer apps",
    spec: "16px base · 1.25 ratio · 1.60 leading · 62ch",
  },
  {
    mode: "expressive",
    useCase: "Landing pages, hero sections, storytelling",
    spec: "16px base · 1.333 ratio · 1.65 leading · 66ch",
  },
];

export default function TypeScaleModesNotePage() {
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
              Type Scale Modes
            </h1>

            <p className="text-xs font-mono text-muted-foreground">
              Nov 23, 2026 · 2 min read
            </p>
          </div>

          <div className="border-t border-border/60 pt-8 space-y-6 font-sans text-base text-foreground/90 leading-relaxed">
            <p>
              Most design systems give you one type scale and expect it to work
              everywhere. In practice, a dense scheduling table and a quiet
              reading view don&apos;t want the same spacing or hierarchy.
            </p>

            <p>
              When you only have one scale, you end up overriding font sizes and
              line heights by hand on every screen. And when you work with an
              LLM, it guesses a new density every time.
            </p>

            <p>
              So in Kohl Design, I split typography rhythm into three named
              modes via{" "}
              <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                data-type-scale
              </code>
              . Same fonts and colors—just a different pace depending on what
              the screen is doing.
            </p>

            <div className="border-t border-b border-border/60 divide-y divide-border/60">
              {MODES.map((item) => (
                <div
                  key={item.mode}
                  className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                >
                  <div className="space-y-0.5">
                    <p className="font-mono text-sm font-medium text-foreground">
                      {item.mode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.useCase}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground shrink-0">
                    {item.spec}
                  </p>
                </div>
              ))}
            </div>

            <p>
              Giving each rhythm a name makes it easy to switch modes on a
              container, and gives coding agents a clear target instead of
              making up numbers.
            </p>

            <div className="pt-2">
              <Button asChild variant="default" size="default">
                <Link href="/playground/type-sandbox">
                  Try it in the type sandbox
                </Link>
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
