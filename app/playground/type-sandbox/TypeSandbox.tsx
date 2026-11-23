"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { cooper, dmSans } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FontOption {
  id: string;
  label: string;
  family: string;
  googleQuery?: string;
}

const DISPLAY_FONTS: FontOption[] = [
  {
    id: "cooper",
    label: "Cooper",
    family: cooper.style.fontFamily,
  },
  {
    id: "instrument-serif",
    label: "Instrument Serif",
    family: "'Instrument Serif', Georgia, serif",
    googleQuery: "Instrument+Serif:ital@0;1",
  },
  {
    id: "newsreader",
    label: "Newsreader",
    family: "'Newsreader', Georgia, serif",
    googleQuery: "Newsreader:opsz,wght@6..72,400;6..72,500",
  },
  {
    id: "fraunces",
    label: "Fraunces",
    family: "'Fraunces', Georgia, serif",
    googleQuery: "Fraunces:opsz,wght@9..144,400;9..144,500",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    family: "'Playfair Display', Georgia, serif",
    googleQuery: "Playfair+Display:wght@400;500",
  },
  {
    id: "system-display",
    label: "System Sans",
    family: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
];

const UI_FONTS: FontOption[] = [
  {
    id: "dm-sans",
    label: "DM Sans",
    family: dmSans.style.fontFamily,
  },
  {
    id: "inter",
    label: "Inter",
    family: "'Inter', system-ui, sans-serif",
    googleQuery: "Inter:wght@400;500;600",
  },
  {
    id: "plus-jakarta",
    label: "Plus Jakarta Sans",
    family: "'Plus Jakarta Sans', system-ui, sans-serif",
    googleQuery: "Plus+Jakarta+Sans:wght@400;500;600",
  },
  {
    id: "ibm-plex",
    label: "IBM Plex Sans",
    family: "'IBM Plex Sans', system-ui, sans-serif",
    googleQuery: "IBM+Plex+Sans:wght@400;500;600",
  },
  {
    id: "system-ui",
    label: "System Sans",
    family: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
];

type RhythmId = "compact" | "editorial" | "expressive";
type ViewportId = "desktop" | "mobile";

interface RhythmSpec {
  id: RhythmId;
  label: string;
  displaySize: string;
  displayLeading: string;
  displayTracking: string;
  bodySize: string;
  bodyLeading: string;
  metaSize: string;
  sectionGap: string;
  stackGap: string;
}

const RHYTHMS: Record<RhythmId, RhythmSpec> = {
  compact: {
    id: "compact",
    label: "Compact",
    displaySize: "1.75rem",
    displayLeading: "1.15",
    displayTracking: "-0.02em",
    bodySize: "0.875rem",
    bodyLeading: "1.5",
    metaSize: "0.75rem",
    sectionGap: "1.25rem",
    stackGap: "0.5rem",
  },
  editorial: {
    id: "editorial",
    label: "Editorial",
    displaySize: "2.25rem",
    displayLeading: "1.1",
    displayTracking: "-0.025em",
    bodySize: "1rem",
    bodyLeading: "1.6",
    metaSize: "0.75rem",
    sectionGap: "1.5rem",
    stackGap: "0.75rem",
  },
  expressive: {
    id: "expressive",
    label: "Expressive",
    displaySize: "2.75rem",
    displayLeading: "1.05",
    displayTracking: "-0.03em",
    bodySize: "1rem",
    bodyLeading: "1.65",
    metaSize: "0.8125rem",
    sectionGap: "2rem",
    stackGap: "0.875rem",
  },
};

export function TypeSandbox() {
  const [displayId, setDisplayId] = React.useState("cooper");
  const [uiId, setUiId] = React.useState("dm-sans");
  const [rhythmId, setRhythmId] = React.useState<RhythmId>("editorial");
  const [viewport, setViewport] = React.useState<ViewportId>("desktop");
  const [copied, setCopied] = React.useState(false);

  const displayFont =
    DISPLAY_FONTS.find((f) => f.id === displayId) ?? DISPLAY_FONTS[0];
  const uiFont = UI_FONTS.find((f) => f.id === uiId) ?? UI_FONTS[0];
  const rhythm = RHYTHMS[rhythmId];

  // Load Google Fonts dynamically on the client when selected
  React.useEffect(() => {
    const queries = [displayFont.googleQuery, uiFont.googleQuery].filter(
      Boolean
    ) as string[];
    if (queries.length === 0) return;

    const href = `https://fonts.googleapis.com/css2?${queries
      .map((q) => `family=${q}`)
      .join("&")}&display=swap`;

    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [displayFont.googleQuery, uiFont.googleQuery]);

  const cssTokens = React.useMemo(() => {
    return `:root {
  --font-display: ${displayFont.family};
  --font-sans: ${uiFont.family};

  /* ${rhythm.label} rhythm */
  --text-display: ${rhythm.displaySize};
  --leading-display: ${rhythm.displayLeading};
  --tracking-display: ${rhythm.displayTracking};

  --text-body: ${rhythm.bodySize};
  --leading-body: ${rhythm.bodyLeading};
  --text-meta: ${rhythm.metaSize};

  --space-section: ${rhythm.sectionGap};
  --space-stack: ${rhythm.stackGap};
}`;
  }, [displayFont.family, uiFont.family, rhythm]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cssTokens);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <div className="space-y-6 pb-28 md:pb-12">
      {/* Header */}
      <header className="space-y-2">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to projects
        </Link>
        <h1 className="font-cooper text-2xl sm:text-3xl font-normal text-foreground">
          Editorial type &amp; rhythm
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Test display and UI font pairings with real product copy, then export CSS tokens.
        </p>
      </header>

      {/* Controls Toolbar — unified size="default" */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-44">
          <Select
            value={displayId}
            onValueChange={(v) => {
              if (v) setDisplayId(v);
            }}
            size="default"
          >
            <SelectTrigger aria-label="Display font">
              <SelectValue placeholder="Display font" />
            </SelectTrigger>
            <SelectContent>
              {DISPLAY_FONTS.map((font) => (
                <SelectItem key={font.id} value={font.id}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-44">
          <Select
            value={uiId}
            onValueChange={(v) => {
              if (v) setUiId(v);
            }}
            size="default"
          >
            <SelectTrigger aria-label="UI font">
              <SelectValue placeholder="UI font" />
            </SelectTrigger>
            <SelectContent>
              {UI_FONTS.map((font) => (
                <SelectItem key={font.id} value={font.id}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs
          value={rhythmId}
          onValueChange={(v) => setRhythmId(v as RhythmId)}
        >
          <TabsList size="default">
            <TabsTrigger value="compact">Compact</TabsTrigger>
            <TabsTrigger value="editorial">Editorial</TabsTrigger>
            <TabsTrigger value="expressive">Expressive</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs
          value={viewport}
          onValueChange={(v) => setViewport(v as ViewportId)}
        >
          <TabsList size="default">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          type="button"
          variant="default"
          size="default"
          onClick={handleCopy}
          className="sm:ml-auto"
        >
          <Icon icon={copied ? Check : Copy} size="sm" />
          <span>{copied ? "Copied tokens" : "Copy CSS tokens"}</span>
        </Button>
      </div>

      {/* Primary Surface: Live Product Specimen */}
      <Card
        variant="default"
        className={`p-6 sm:p-8 transition-all duration-200 ${
          viewport === "mobile" ? "max-w-[375px]" : "w-full"
        }`}
      >
        <div
          className="flex flex-col"
          style={{
            gap: rhythm.sectionGap,
            fontFamily: uiFont.family,
          }}
        >
          {/* 1. Heading + Subtitle */}
          <div className="flex flex-col" style={{ gap: rhythm.stackGap }}>
            <h2
              className="text-foreground font-normal"
              style={{
                fontFamily: displayFont.family,
                fontSize: rhythm.displaySize,
                lineHeight: rhythm.displayLeading,
                letterSpacing: rhythm.displayTracking,
              }}
            >
              Quarterly shift schedule
            </h2>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: rhythm.bodySize,
                lineHeight: rhythm.bodyLeading,
              }}
            >
              Published for Stockholm retail · 14 team members scheduled
            </p>
          </div>

          {/* 2. Body Copy + Metadata */}
          <div
            className="border-t border-border/60 pt-5 flex flex-col"
            style={{ gap: rhythm.stackGap }}
          >
            <p
              className="text-foreground/90"
              style={{
                fontSize: rhythm.bodySize,
                lineHeight: rhythm.bodyLeading,
              }}
            >
              Morning coverage is balanced across weekdays. Two weekend shifts
              still need confirmation before Friday at 17:00.
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: rhythm.metaSize }}
            >
              Updated 4 minutes ago by Astrid · Version 3
            </p>
          </div>

          {/* 3. Form Field + Error State + Primary Action */}
          <div
            className="border-t border-border/60 pt-5 flex flex-col"
            style={{ gap: rhythm.stackGap }}
          >
            <label
              htmlFor="sandbox-email"
              className="font-medium text-foreground"
              style={{ fontSize: rhythm.bodySize }}
            >
              Notify manager on publish
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 space-y-1.5">
                <Input
                  id="sandbox-email"
                  size="default"
                  defaultValue="astrid@"
                  aria-invalid="true"
                  className="border-destructive focus-visible:border-destructive"
                  style={{ fontFamily: uiFont.family }}
                />
                <p
                  className="text-destructive"
                  style={{ fontSize: rhythm.metaSize }}
                >
                  Enter a valid work email address.
                </p>
              </div>
              <Button
                type="button"
                variant="default"
                size="default"
                style={{ fontFamily: uiFont.family }}
              >
                Publish schedule
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* CSS Token Output */}
      <div className="border-t border-border/60 pt-6 space-y-2.5">
        <p className="text-xs font-mono text-muted-foreground">
          Generated CSS tokens
        </p>
        <pre className="rounded-[var(--radius)] bg-muted/50 border border-border/60 p-4 font-mono text-xs text-foreground/90 leading-relaxed overflow-x-auto">
          {cssTokens}
        </pre>
      </div>
    </div>
  );
}
