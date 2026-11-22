"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const INSTALL_COMMAND = "npx skills add bergets/skills";

export function InstallBar() {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
      <div className="flex items-center justify-between gap-2 rounded-[var(--radius)] bg-muted/60 border border-border/60 pl-3.5 pr-1.5 h-9 min-w-0">
        <code className="font-mono text-xs sm:text-sm text-foreground truncate">
          {INSTALL_COMMAND}
        </code>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={handleCopy}
          aria-label={copied ? "Copied install command" : "Copy install command"}
          className="relative after:absolute after:-inset-2 after:content-[''] text-muted-foreground hover:text-foreground"
        >
          <Icon icon={copied ? Check : Copy} size="xs" />
        </Button>
      </div>

      <Button asChild variant="default" size="default">
        <a
          href="https://github.com/bergets/skills"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub ↗
        </a>
      </Button>
    </div>
  );
}
