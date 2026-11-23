import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { InstallBar } from "./InstallBar";

export const metadata: Metadata = {
  title: "Compound Design — kohl.design",
  description:
    "A small skill that pulls design rules and anti-patterns out of your LLM chats and saves them to your design system.",
};

const STEPS = [
  {
    step: "1. Design & critique",
    detail: "Work through layouts and give feedback like you normally do.",
  },
  {
    step: "2. Extract rules",
    detail: "Pull out the taste decisions and anti-patterns you landed on.",
  },
  {
    step: "3. Write to system",
    detail: "Save them into AGENTS.md or design-system.md for next time.",
  },
];

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

          <div className="border-t border-border/60 pt-8 space-y-8 font-sans text-base text-foreground/90 leading-relaxed">
            <div className="space-y-5">
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

              <InstallBar />
            </div>

            <blockquote className="rounded-xl bg-muted/40 border border-border/60 p-5 space-y-1.5">
              <p className="text-xs font-mono text-muted-foreground">
                The idea
              </p>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                You rarely have all the design rules figured out from the
                start. A system forms as you actually start designing and people
                start experiencing it.
              </p>
            </blockquote>

            <p>
              When you work with an LLM, you end up giving the same feedback
              over and over. Use lighter borders. Don&apos;t wrap every list in
              a card. Skip the big stat boxes. Those decisions usually stay
              stuck in that one chat, so you have to repeat yourself next time.
            </p>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-muted/30 border border-border/60 p-5 space-y-2.5">
                <p className="text-xs font-mono text-muted-foreground">
                  In the chat
                </p>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  &ldquo;Make the borders lighter. Don&apos;t wrap every list in
                  a card. Skip the big stat boxes.&rdquo;
                </p>
              </div>

              <div className="rounded-xl bg-muted/60 border border-border/60 p-5 space-y-2.5">
                <p className="text-xs font-mono text-foreground">
                  Saved to AGENTS.md
                </p>
                <ul className="space-y-2 text-sm text-foreground/90 leading-relaxed">
                  <li>
                    Use hairline dividers (
                    <code className="font-mono text-xs bg-background/80 px-1 py-0.5 rounded">
                      divide-y divide-border/60
                    </code>
                    ) before reaching for a Card.
                  </li>
                  <li>Never build 3-column stat boxes with giant numbers.</li>
                </ul>
              </div>
            </div>

            <p>
              This skill fixes that. After a design session, it reads through
              the conversation, pulls out the rules and anti-patterns you
              landed on, and writes them back into your design system. Next
              time you start a chat, it already knows your taste.
            </p>

            <p>
              There is also a companion skill called{" "}
              <strong className="font-semibold text-foreground">
                review-design
              </strong>{" "}
              in the same repo. Before you ship, it reads those rules—even from
              an upstream design system—and checks your UI against them.
            </p>

            {/* 3-step strip */}
            <div className="border-t border-border/60 pt-6 space-y-4">
              <p className="text-xs font-mono text-muted-foreground">
                How a session compounds
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {STEPS.map((item) => (
                  <div key={item.step} className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.step}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
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
