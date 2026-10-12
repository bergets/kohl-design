"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  Bot,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useDesignSystem, BrandTheme, ViewMode } from "./DesignSystemContext";
import { getAgentSpec } from "./agent-specs";
import { cn } from "@/lib/utils";

export function DocsHeader() {
  const pathname = usePathname();
  const {
    viewMode,
    setViewMode,
    brandTheme,
    setBrandTheme,
    mobileNavOpen,
    toggleMobileNav,
  } = useDesignSystem();

  const [copied, setCopied] = React.useState(false);

  const currentSpec = React.useMemo(() => getAgentSpec(pathname), [pathname]);

  // Derive human title from pathname
  const sectionTitle = React.useMemo(() => {
    if (currentSpec.componentName) return currentSpec.componentName;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Introduction";
    const last = segments[segments.length - 1];
    return last.charAt(0).toUpperCase() + last.slice(1).replace("-", " ");
  }, [pathname, currentSpec]);

  const handleCopyAgentContext = () => {
    navigator.clipboard.writeText(currentSpec.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/85 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMobileNav}
          className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-border text-muted-foreground hover:text-foreground md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileNavOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/design-system" className="hover:text-foreground transition-colors">
            Kohl
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">{sectionTitle}</span>
          {viewMode === "agent" && (
            <>
              <span>/</span>
              <span className="rounded-full bg-primary/15 text-foreground border border-primary/30 font-mono text-[10px] px-2 py-0.5 font-semibold">
                Agent Spec
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right Controls: Theme Switcher, Light/Dark, Human/Agent Toggle */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Brand Theme Switcher (Pine vs Blush) */}
        <div className="flex h-8 items-center rounded-full border border-border bg-muted/50 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setBrandTheme("pine")}
            className={cn(
              "flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-all cursor-pointer",
              brandTheme === "pine"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Pine Forest Green signature brand theme"
          >
            <span
              className={cn(
                "size-2 rounded-full transition-colors",
                brandTheme === "pine"
                  ? "bg-[#a8e3d2] border border-white/40"
                  : "bg-[#a8e3d2] border border-[#005243]"
              )}
            />
            <span className="hidden sm:inline">Pine</span>
          </button>
          <button
            type="button"
            onClick={() => setBrandTheme("blush")}
            className={cn(
              "flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-all cursor-pointer",
              brandTheme === "blush"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Cashmere Blush & Velvet Berry editorial theme"
          >
            <span
              className={cn(
                "size-2 rounded-full transition-colors",
                brandTheme === "blush"
                  ? "bg-[#dc858b] border border-white/60"
                  : "bg-[#fcd3d6] border border-[#dc858b]"
              )}
            />
            <span className="hidden sm:inline">Blush</span>
          </button>
        </div>

        {/* Light/Dark Mode */}
        <ThemeToggle size="sm" className="rounded-full size-8 shrink-0 shadow-2xs" />

        {/* Human vs. Agent View Switcher */}
        <div className="flex h-8 items-center rounded-full border border-border bg-card p-0.5 text-xs shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode("human")}
            className={cn(
              "flex h-7 items-center gap-1.5 rounded-full px-2.5 font-medium transition-all cursor-pointer",
              viewMode === "human"
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="size-3.5" strokeWidth={1.5} />
            <span className="text-xs">Human</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("agent")}
            className={cn(
              "flex h-7 items-center gap-1.5 rounded-full px-2.5 font-medium transition-all cursor-pointer",
              viewMode === "agent"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Bot className="size-3.5" strokeWidth={1.5} />
            <span className="text-xs">Agent</span>
          </button>
        </div>

        {/* Quick Action: Copy Agent Prompt */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyAgentContext}
          className="hidden lg:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground h-8 rounded-full px-3.5 shadow-2xs"
          title={`Copy AI Agent Prompt for ${sectionTitle}`}
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-500" />
              <span>Copied Prompt</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy {sectionTitle} Prompt</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
