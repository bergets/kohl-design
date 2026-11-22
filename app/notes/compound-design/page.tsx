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

          <div className="border-t border-border/60 pt-8 space-y-5 font-sans text-base text-foreground/90 leading-relaxed">
            <p>
              I put together a small agent skill called{" "}
              <strong className="font-semibold text-foreground">
                compound-design
              </strong>
              . It plugs into whatever design system you use—an{" "}
              <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                AGENTS.md
              </code>
              , a{" "}
              <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                design-system.md
              </code>
              , or just a notes file.
            </p>

            <p>
              You rarely have all the design rules figured out from the start. A
              system forms as you actually start designing and people start
              experiencing it. When you work with an LLM, you end up giving the
              same feedback over and over. Use lighter borders. Don&apos;t wrap
              every list in a card. Skip the big stat boxes. Those decisions
              usually stay stuck in that one chat, so you have to repeat
              yourself next time.
            </p>

            <p>
              This skill fixes that. After a design session, it reads through
              the conversation, pulls out the rules and anti-patterns you
              landed on, and writes them back into your design system. Next
              time you start a chat, it already knows your taste.
            </p>

            <div className="pt-3 space-y-4">
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
