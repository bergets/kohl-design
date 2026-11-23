"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeftRight, Check, Copy, Grid3X3 } from "lucide-react";
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
import { Toggle } from "@/components/ui/toggle";

interface FontOption {
  id: string;
  label: string;
  family: string;
  googleQuery?: string;
}

const FONT_OPTIONS: FontOption[] = [
  {
    id: "cooper",
    label: "Cooper",
    family: cooper.style.fontFamily,
  },
  {
    id: "dm-sans",
    label: "DM Sans",
    family: dmSans.style.fontFamily,
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
    googleQuery: "Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    family: "'Playfair Display', Georgia, serif",
    googleQuery: "Playfair+Display:wght@400;500;600",
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

const SCALE_RATIOS = [
  { id: "1.125", label: "1.125 · Major 2nd", value: 1.125 },
  { id: "1.2", label: "1.200 · Minor 3rd", value: 1.2 },
  { id: "1.25", label: "1.250 · Major 3rd", value: 1.25 },
  { id: "1.333", label: "1.333 · Perfect 4th", value: 1.333 },
  { id: "1.414", label: "1.414 · Aug 4th", value: 1.414 },
];

type ScenarioId = "app" | "essay" | "form" | "empty";
type ViewportId = "desktop" | "mobile";
type ExportFormat = "css" | "tailwind" | "agents";

interface ScenarioCopy {
  heading: string;
  subtitle: string;
  body: string;
  meta: string;
}

const SCENARIOS: Record<ScenarioId, ScenarioCopy> = {
  app: {
    heading: "Quarterly shift schedule",
    subtitle: "Published for Stockholm retail · 14 team members scheduled",
    body: "Morning coverage is balanced across weekdays. Two weekend shifts still need confirmation before Friday at 17:00.",
    meta: "Updated 4 minutes ago by Astrid · Version 3",
  },
  essay: {
    heading: "Design rules form through use",
    subtitle: "Notes on building interfaces alongside coding agents",
    body: "You rarely know every constraint up front. Good systems emerge when you react to real screens, notice what feels heavy, and write those decisions down so the next session starts sharper.",
    meta: "Nov 23, 2026 · 3 min read",
  },
  form: {
    heading: "Workspace billing",
    subtitle: "Manage invoices, seat limits, and payment contacts",
    body: "Receipts are sent automatically on the first of each month. Changes to your billing email take effect on the next cycle.",
    meta: "Plan: Team · Next invoice Dec 1",
  },
  empty: {
    heading: "No saved rules yet",
    subtitle: "Capture your first design decision from a chat",
    body: "Run compound-design after a critique or layout pass to turn feedback into permanent rules for your project.",
    meta: "0 rules documented · Ready",
  },
};

export function TypeSandbox() {
  const [displayId, setDisplayId] = React.useState("cooper");
  const [uiId, setUiId] = React.useState("dm-sans");
  const [displayWeight, setDisplayWeight] = React.useState("400");
  const [scenario, setScenario] = React.useState<ScenarioId>("app");
  const [viewport, setViewport] = React.useState<ViewportId>("desktop");
  const [exportFormat, setExportFormat] = React.useState<ExportFormat>("css");

  // Fine-grained rhythm controls
  const [baseSize, setBaseSize] = React.useState(16);
  const [ratio, setRatio] = React.useState("1.25");
  const [bodyLeading, setBodyLeading] = React.useState(1.6);
  const [displayTracking, setDisplayTracking] = React.useState(-0.025);
  const [measureCh, setMeasureCh] = React.useState(62);
  const [showGrid, setShowGrid] = React.useState(false);

  const [copied, setCopied] = React.useState(false);

  const displayFont =
    FONT_OPTIONS.find((f) => f.id === displayId) ?? FONT_OPTIONS[0];
  const uiFont = FONT_OPTIONS.find((f) => f.id === uiId) ?? FONT_OPTIONS[1];
  const ratioNum = Number(ratio);
  const copy = SCENARIOS[scenario];

  // Computed modular scale
  const scale = React.useMemo(() => {
    const h1 = Math.round(baseSize * Math.pow(ratioNum, 3.2) * 10) / 10;
    const h2 = Math.round(baseSize * Math.pow(ratioNum, 2) * 10) / 10;
    const h3 = Math.round(baseSize * Math.pow(ratioNum, 1.25) * 10) / 10;
    const meta = Math.max(11, Math.round(baseSize * 0.78));
    return { h1, h2, h3, body: baseSize, meta };
  }, [baseSize, ratioNum]);

  // Load Google Fonts dynamically on the client
  React.useEffect(() => {
    const queries = [displayFont.googleQuery, uiFont.googleQuery].filter(
      Boolean
    ) as string[];
    if (queries.length === 0) return;

    const href = `https://fonts.googleapis.com/css2?${queries
      .map((q) => `family=${q}`)
      .join("&")}&display=swap`;

    if (document.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [displayFont.googleQuery, uiFont.googleQuery]);

  function handleSwapFonts() {
    setDisplayId(uiId);
    setUiId(displayId);
  }

  function applyPreset(preset: "compact" | "editorial" | "expressive") {
    if (preset === "compact") {
      setBaseSize(14);
      setRatio("1.2");
      setBodyLeading(1.45);
      setDisplayTracking(-0.02);
      setMeasureCh(58);
    } else if (preset === "editorial") {
      setBaseSize(16);
      setRatio("1.25");
      setBodyLeading(1.6);
      setDisplayTracking(-0.025);
      setMeasureCh(62);
    } else {
      setBaseSize(16);
      setRatio("1.333");
      setBodyLeading(1.65);
      setDisplayTracking(-0.03);
      setMeasureCh(66);
    }
  }

  const exportedCode = React.useMemo(() => {
    if (exportFormat === "tailwind") {
      return `@theme {
  --font-display: ${displayFont.family};
  --font-sans: ${uiFont.family};

  --text-h1: ${(scale.h1 / 16).toFixed(3)}rem;
  --text-h2: ${(scale.h2 / 16).toFixed(3)}rem;
  --text-body: ${(scale.body / 16).toFixed(3)}rem;
  --text-meta: ${(scale.meta / 16).toFixed(3)}rem;

  --leading-body: ${bodyLeading};
  --tracking-display: ${displayTracking}em;
  --container-measure: ${measureCh}ch;
}`;
    }

    if (exportFormat === "agents") {
      return `## Typography & Rhythm
- **Display Font:** ${displayFont.label} (weight ${displayWeight}, tracking \`${displayTracking}em\`) for hero and section headings only.
- **UI & Body Font:** ${uiFont.label} (\`${scale.body}px\`, line-height \`${bodyLeading}\`) for all body copy, labels, and controls.
- **Scale Ratio:** \`${ratio}\` (H1 \`${scale.h1}px\`, H2 \`${scale.h2}px\`, H3 \`${scale.h3}px\`, Meta \`${scale.meta}px\`).
- **Reading Measure:** Cap editorial paragraphs at \`${measureCh}ch\`.`;
    }

    return `:root {
  --font-display: ${displayFont.family};
  --font-sans: ${uiFont.family};

  --text-h1: ${scale.h1}px;
  --text-h2: ${scale.h2}px;
  --text-h3: ${scale.h3}px;
  --text-body: ${scale.body}px;
  --text-meta: ${scale.meta}px;

  --font-weight-display: ${displayWeight};
  --leading-body: ${bodyLeading};
  --tracking-display: ${displayTracking}em;
  --measure: ${measureCh}ch;
}`;
  }, [
    exportFormat,
    displayFont,
    uiFont,
    displayWeight,
    scale,
    bodyLeading,
    displayTracking,
    measureCh,
    ratio,
  ]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(exportedCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <div className="space-y-6 pb-28 md:pb-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
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
            Experiment with pairings, modular scale, measure, and real product copy. Click any text in the preview to edit it.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyPreset("compact")}
          >
            Compact
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyPreset("editorial")}
          >
            Editorial
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyPreset("expressive")}
          >
            Expressive
          </Button>
        </div>
      </header>

      {/* Font & Context Toolbar — unified size="default" */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-40">
          <Select
            value={displayId}
            onValueChange={(v) => {
              if (v) setDisplayId(v);
            }}
            size="default"
          >
            <SelectTrigger aria-label="Display font">
              <SelectValue placeholder="Display" />
            </SelectTrigger>
            <SelectContent>
              {FONT_OPTIONS.map((font) => (
                <SelectItem key={font.id} value={font.id}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleSwapFonts}
          aria-label="Swap display and UI fonts"
          title="Swap display and UI fonts"
        >
          <Icon icon={ArrowLeftRight} size="sm" />
        </Button>

        <div className="w-40">
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
              {FONT_OPTIONS.map((font) => (
                <SelectItem key={font.id} value={font.id}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-24">
          <Select
            value={displayWeight}
            onValueChange={(v) => {
              if (v) setDisplayWeight(v);
            }}
            size="default"
          >
            <SelectTrigger aria-label="Display weight">
              <SelectValue placeholder="Weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="400">400</SelectItem>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="600">600</SelectItem>
              <SelectItem value="700">700</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs
          value={scenario}
          onValueChange={(v) => setScenario(v as ScenarioId)}
        >
          <TabsList size="default">
            <TabsTrigger value="app">App</TabsTrigger>
            <TabsTrigger value="essay">Essay</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="empty">Empty</TabsTrigger>
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

        <Toggle
          pressed={showGrid}
          onPressedChange={setShowGrid}
          size="default"
          variant="outline"
          aria-label="Toggle baseline grid and measure guide"
        >
          <Icon icon={Grid3X3} size="sm" />
          <span>Grid</span>
        </Toggle>
      </div>

      {/* Fine-grained Rhythm Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border-t border-b border-border/60 py-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Scale ratio</span>
            <span className="font-mono text-foreground">{ratio}</span>
          </div>
          <Select
            value={ratio}
            onValueChange={(v) => {
              if (v) setRatio(v);
            }}
            size="sm"
          >
            <SelectTrigger aria-label="Type scale ratio">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SCALE_RATIOS.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="space-y-2 block">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Base size</span>
            <span className="font-mono text-foreground">{baseSize}px</span>
          </div>
          <input
            type="range"
            min={13}
            max={18}
            step={1}
            value={baseSize}
            onChange={(e) => setBaseSize(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </label>

        <label className="space-y-2 block">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Body leading</span>
            <span className="font-mono text-foreground">{bodyLeading}</span>
          </div>
          <input
            type="range"
            min={1.3}
            max={1.85}
            step={0.05}
            value={bodyLeading}
            onChange={(e) => setBodyLeading(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </label>

        <label className="space-y-2 block">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Display tracking</span>
            <span className="font-mono text-foreground">{displayTracking}em</span>
          </div>
          <input
            type="range"
            min={-0.04}
            max={0.02}
            step={0.005}
            value={displayTracking}
            onChange={(e) => setDisplayTracking(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </label>

        <label className="space-y-2 block">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Measure</span>
            <span className="font-mono text-foreground">{measureCh}ch</span>
          </div>
          <input
            type="range"
            min={44}
            max={76}
            step={2}
            value={measureCh}
            onChange={(e) => setMeasureCh(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </label>
      </div>

      {/* Primary Surface: Live Product Specimen */}
      <Card
        variant="default"
        className={`relative p-6 sm:p-8 transition-all duration-200 overflow-hidden ${
          viewport === "mobile" ? "max-w-[375px]" : "w-full"
        }`}
        style={
          showGrid
            ? {
                backgroundImage:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--border) 55%, transparent) 1px, transparent 1px)",
                backgroundSize: "100% 8px",
              }
            : undefined
        }
      >
        <div
          className="flex flex-col gap-6"
          style={{
            fontFamily: uiFont.family,
          }}
        >
          {/* 1. Heading + Subtitle (Editable) */}
          <div className="space-y-2">
            <h2
              key={`h1-${scenario}`}
              contentEditable
              suppressContentEditableWarning
              className="text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
              style={{
                fontFamily: displayFont.family,
                fontWeight: Number(displayWeight),
                fontSize: `${scale.h1}px`,
                lineHeight: 1.08,
                letterSpacing: `${displayTracking}em`,
              }}
            >
              {copy.heading}
            </h2>
            <p
              key={`sub-${scenario}`}
              contentEditable
              suppressContentEditableWarning
              className="text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
              style={{
                fontSize: `${scale.body}px`,
                lineHeight: bodyLeading,
                maxWidth: `${measureCh}ch`,
              }}
            >
              {copy.subtitle}
            </p>
          </div>

          {/* 2. Body Copy + Metadata + Measure Guide */}
          <div
            className={`border-t border-border/60 pt-5 space-y-2 ${
              showGrid
                ? "border-r border-dashed border-primary/40 pr-3"
                : ""
            }`}
            style={{ maxWidth: `${measureCh}ch` }}
          >
            <h3
              className="text-foreground"
              style={{
                fontFamily: displayFont.family,
                fontWeight: Number(displayWeight),
                fontSize: `${scale.h3}px`,
                lineHeight: 1.25,
              }}
            >
              Overview
            </h3>
            <p
              key={`body-${scenario}`}
              contentEditable
              suppressContentEditableWarning
              className="text-foreground/90 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
              style={{
                fontSize: `${scale.body}px`,
                lineHeight: bodyLeading,
              }}
            >
              {copy.body}
            </p>
            <p
              className="text-muted-foreground pt-1"
              style={{ fontSize: `${scale.meta}px` }}
            >
              {copy.meta}
            </p>
          </div>

          {/* 3. Form Field + Error State + Action */}
          <div className="border-t border-border/60 pt-5 space-y-2">
            <label
              htmlFor="sandbox-email"
              className="block font-medium text-foreground"
              style={{ fontSize: `${scale.body}px` }}
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
                  style={{ fontSize: `${scale.meta}px` }}
                >
                  Enter a valid work email address.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="default"
                style={{ fontFamily: uiFont.family }}
              >
                Publish schedule
              </Button>
            </div>
          </div>

          {/* Live Scale Strip */}
          <div className="border-t border-border/60 pt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>H1 {scale.h1}px</span>
            <span>H2 {scale.h2}px</span>
            <span>H3 {scale.h3}px</span>
            <span>Body {scale.body}px</span>
            <span>Meta {scale.meta}px</span>
            <span>Measure {measureCh}ch</span>
          </div>
        </div>
      </Card>

      {/* Export Section */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <Tabs
            value={exportFormat}
            onValueChange={(v) => setExportFormat(v as ExportFormat)}
          >
            <TabsList size="default">
              <TabsTrigger value="css">CSS variables</TabsTrigger>
              <TabsTrigger value="tailwind">Tailwind v4</TabsTrigger>
              <TabsTrigger value="agents">AGENTS.md rule</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            type="button"
            variant="default"
            size="default"
            onClick={handleCopy}
          >
            <Icon icon={copied ? Check : Copy} size="sm" />
            <span>{copied ? "Copied" : "Copy output"}</span>
          </Button>
        </div>

        <pre className="rounded-[var(--radius)] bg-muted/50 border border-border/60 p-4 font-mono text-xs text-foreground/90 leading-relaxed overflow-x-auto">
          {exportedCode}
        </pre>
      </div>
    </div>
  );
}
