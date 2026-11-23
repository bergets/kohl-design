"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const SETUP_PROMPT = `Set up this project to follow the Kohl Design system (bergets/kohl-design).

1. Read https://kohl.design/AGENTS.md and https://kohl.design/design-system.md.
2. Add a "Kohl Design System" section to this project's AGENTS.md (create it if missing) that:
   - References bergets/kohl-design (https://kohl.design/AGENTS.md) as the upstream design system.
   - Includes the Priority Order, Editorial Restraint, and Anti-Slop Guide rules so they stay in context on every turn.
   - Instructs the agent to run review-design before shipping UI and compound-design when new design rules emerge.
3. Install the skills if not already present: npx skills add bergets/skills`;

export function SetupPromptCard() {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SETUP_PROMPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal text-foreground">
            Use in your project
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Paste this prompt into any consumer project so your agent always reads{" "}
            <a
              href="/AGENTS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              AGENTS.md
            </a>{" "}
            and the Anti-Slop rules.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="relative after:absolute after:-inset-2 after:content-[''] shrink-0"
        >
          <Icon icon={copied ? Check : Copy} size="xs" />
          <span>{copied ? "Copied" : "Copy prompt"}</span>
        </Button>
      </div>

      <pre className="rounded-xl bg-muted/50 border border-border/60 p-4 font-mono text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap overflow-x-auto">
        {SETUP_PROMPT}
      </pre>
    </section>
  );
}
