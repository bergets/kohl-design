import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Visualizing Research with Service Design Artifacts — kohl.design",
  description:
    "Why LLMs shouldn't flatten user interviews into walls of markdown bullets—and how service design artifacts keep synthesis spatial, relational, and grounded in evidence.",
};

export default function VisualizingResearchNotePage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-28 md:pb-14">
        <div className="my-auto py-10 sm:py-16 w-full max-w-5xl mx-auto">
          <article className="w-full max-w-2xl space-y-8">
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
                Visualizing Research with Service Design Artifacts
              </h1>

              <p className="text-xs font-mono text-muted-foreground">
                Nov 25, 2026 · 3 min read
              </p>
            </div>

            <div className="border-t border-border/60 pt-8 space-y-5 font-sans text-base text-foreground/90 leading-relaxed">
              <p>
                Drop six interview transcripts into an LLM and ask for a
                synthesis, and you almost always get the same thing: a wall of
                markdown bullet points. It looks tidy, but it flattens the
                actual shape of the research—the pauses, the handoffs between
                teams, the emotional drops, and the contradictions between what
                people say and what they do.
              </p>

              <p>
                Service design already has much better containers for this.
                Instead of summarizing interviews into prose, we can ask agents
                to map the same raw evidence into structured artifacts that
                teams can scan, critique, and align around:
              </p>

              <div className="border-t border-border/60 divide-y divide-border/60 text-sm">
                <div className="py-3 grid gap-1 sm:grid-cols-[180px_1fr]">
                  <span className="font-semibold text-foreground">
                    Journey map
                  </span>
                  <span className="text-muted-foreground">
                    When you need to see{" "}
                    <strong className="font-medium text-foreground">
                      time and emotion
                    </strong>
                    —where confidence drops and friction piles up across stages.
                  </span>
                </div>
                <div className="py-3 grid gap-1 sm:grid-cols-[180px_1fr]">
                  <span className="font-semibold text-foreground">
                    Service blueprint
                  </span>
                  <span className="text-muted-foreground">
                    When you need to trace{" "}
                    <strong className="font-medium text-foreground">
                      frontstage vs. backstage
                    </strong>
                    —exposing the hidden manual ops and fail points behind a
                    broken screen.
                  </span>
                </div>
                <div className="py-3 grid gap-1 sm:grid-cols-[180px_1fr]">
                  <span className="font-semibold text-foreground">
                    Ecosystem flow
                  </span>
                  <span className="text-muted-foreground">
                    When you want to spot{" "}
                    <strong className="font-medium text-foreground">
                      human middleware
                    </strong>
                    —like a nurse re-keying PDF lab values between two
                    disconnected portals.
                  </span>
                </div>
                <div className="py-3 grid gap-1 sm:grid-cols-[180px_1fr]">
                  <span className="font-semibold text-foreground">
                    Behavioral archetypes
                  </span>
                  <span className="text-muted-foreground">
                    Modes grounded in triggers, constraints, and channels—never
                    fictional demographic persona bios.
                  </span>
                </div>
                <div className="py-3 grid gap-1 sm:grid-cols-[180px_1fr]">
                  <span className="font-semibold text-foreground">
                    Opportunity tree
                  </span>
                  <span className="text-muted-foreground">
                    When you are ready to turn unmet needs into{" "}
                    <strong className="font-medium text-foreground">
                      product bets and experiments
                    </strong>{" "}
                    tied to one outcome.
                  </span>
                </div>
              </div>

              <p>
                Two rules keep this honest. First,{" "}
                <strong className="font-semibold text-foreground">
                  skip demographic personas
                </strong>
                . A bio about{" "}
                <em>&ldquo;Sarah, 34, who likes coffee&rdquo;</em> is research
                slop; what matters is the behavioral mode someone is in—an{" "}
                <em>Anxious First-Timer</em> waiting in silence, or an{" "}
                <em>After-Hours Commuter</em> whose 24-hour SMS link just
                expired.
              </p>

              <p>
                Second,{" "}
                <strong className="font-semibold text-foreground">
                  keep every node attached to verbatim quotes
                </strong>
                . An artifact is only as trustworthy as the{" "}
                <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                  P1
                </code>{" "}
                or{" "}
                <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
                  P3
                </code>{" "}
                evidence underneath it. When you can click any stage, handoff,
                or opportunity and immediately read the exact quote that earned
                its spot, the team spends less time debating opinions and more
                time fixing the actual bottleneck.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Button asChild variant="default" size="default">
                  <Link href="/playground/research-artifacts">
                    Try the research artifacts prototype
                  </Link>
                </Button>
                <Button asChild variant="outline" size="default">
                  <a
                    href="https://github.com/bergets/skills"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    research-artifacts skill on GitHub ↗
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </div>

        <footer className="w-full max-w-5xl mx-auto pt-6 text-xs text-pine-600/70 dark:text-pine-400/50">
          <span>kohl.design · 2026</span>
        </footer>
      </main>
    </div>
  );
}
