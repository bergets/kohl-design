"use client";

import * as React from "react";
import Link from "next/link";
import { Type, AlertCircle, Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TypeScaleMode = "compact" | "editorial" | "expressive";

const MODE_SPECS: Record<
  TypeScaleMode,
  {
    label: string;
    useCase: string;
    baseRatio: string;
    h1: string;
    h2: string;
    h3: string;
    body: string;
    meta: string;
    leadingDisplay: string;
    leadingBody: string;
    trackingDisplay: string;
    measure: string;
    spaceSection: string;
    spaceStack: string;
  }
> = {
  compact: {
    label: "Compact",
    useCase: "Dense tools, schedules, tables, settings",
    baseRatio: "14px / 1.20",
    h1: "1.75rem",
    h2: "1.25rem",
    h3: "1.1rem",
    body: "0.875rem",
    meta: "0.75rem",
    leadingDisplay: "1.15",
    leadingBody: "1.45",
    trackingDisplay: "-0.02em",
    measure: "58ch",
    spaceSection: "1.25rem",
    spaceStack: "0.5rem",
  },
  editorial: {
    label: "Editorial (default)",
    useCase: "Reading, notes, calm consumer apps",
    baseRatio: "16px / 1.25",
    h1: "2.25rem",
    h2: "1.5625rem",
    h3: "1.325rem",
    body: "1rem",
    meta: "0.75rem",
    leadingDisplay: "1.1",
    leadingBody: "1.6",
    trackingDisplay: "-0.025em",
    measure: "62ch",
    spaceSection: "1.5rem",
    spaceStack: "0.75rem",
  },
  expressive: {
    label: "Expressive",
    useCase: "Landing pages, hero sections, storytelling",
    baseRatio: "16px / 1.333",
    h1: "2.75rem",
    h2: "1.775rem",
    h3: "1.4375rem",
    body: "1rem",
    meta: "0.8125rem",
    leadingDisplay: "1.05",
    leadingBody: "1.65",
    trackingDisplay: "-0.03em",
    measure: "66ch",
    spaceSection: "2rem",
    spaceStack: "0.875rem",
  },
};

export default function TypographyPage() {
  const [sampleText, setSampleText] = React.useState(
    "High-craft software with editorial restraint."
  );
  const [scaleMode, setScaleMode] = React.useState<TypeScaleMode>("editorial");
  const [copiedUsage, setCopiedUsage] = React.useState(false);

  const activeSpec = MODE_SPECS[scaleMode];
  const usageSnippet = `<section data-type-scale="${scaleMode}" className="space-y-[var(--space-section)]">
  <h1 className="font-cooper text-[length:var(--text-h1)] leading-[var(--leading-display)] tracking-[var(--tracking-display)]">
    Section title
  </h1>
  <p className="font-sans text-[length:var(--text-body)] leading-[var(--leading-body)] max-w-[var(--measure)]">
    Body copy follows the active rhythm mode.
  </p>
</section>`;

  const handleCopyUsage = async () => {
    try {
      await navigator.clipboard.writeText(usageSnippet);
      setCopiedUsage(true);
      window.setTimeout(() => setCopiedUsage(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-link">
          <Type className="size-4" />
          <span>Design Tokens</span>
        </div>
        <h1 className="font-cooper text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
          Typography Hierarchy
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          Kohl Design pairs the warm, retro-editorial character of <strong>Cooper Regular</strong> with the utilitarian legibility of <strong>DM Sans</strong>.
        </p>
      </div>

      {/* Interactive Specimen Box */}
      <Card variant="default" className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
          <span className="text-xs font-semibold text-foreground">Live Typography Test</span>
          <Input
            size="sm"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="sm:w-72"
            placeholder="Type your preview..."
          />
        </div>

        {/* Cooper Specimen */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              Display Headlines — font-cooper (Cooper Regular)
            </span>
            <Badge variant="default" size="sm">
              Headlines Only
            </Badge>
          </div>
          <p className="font-cooper text-3xl sm:text-4xl text-foreground tracking-tight leading-tight">
            {sampleText}
          </p>
          <p className="font-cooper text-xl sm:text-2xl text-foreground tracking-tight">
            {sampleText}
          </p>
        </div>

        {/* DM Sans Specimen */}
        <div className="space-y-3 pt-4 border-t border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              Body &amp; UI — font-sans (DM Sans)
            </span>
            <Badge variant="secondary" size="sm">
              All Controls &amp; Copy
            </Badge>
          </div>
          <p className="font-sans text-base text-foreground leading-relaxed">
            {sampleText}
          </p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {sampleText}
          </p>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">
            {sampleText}
          </p>
        </div>
      </Card>

      {/* Type Scale Modes Section */}
      <section className="space-y-6 pt-2 border-t border-border/60">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <h2 className="font-cooper text-2xl font-normal tracking-tight text-foreground">
              Type Scale Modes
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Switch typographic rhythm with{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs text-foreground">
                data-type-scale
              </code>{" "}
              instead of ad-hoc font sizes. Try the full interactive{" "}
              <Link
                href="/playground/type-sandbox"
                className="text-link hover:text-link-hover underline underline-offset-4"
              >
                Type Sandbox
              </Link>{" "}
              or read the{" "}
              <Link
                href="/notes/type-scale-modes"
                className="text-link hover:text-link-hover underline underline-offset-4"
              >
                design note
              </Link>
              .
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Tabs
              value={scaleMode}
              onValueChange={(v) => setScaleMode(v as TypeScaleMode)}
            >
              <TabsList size="sm" variant="default">
                <TabsTrigger value="compact">Compact</TabsTrigger>
                <TabsTrigger value="editorial">Editorial</TabsTrigger>
                <TabsTrigger value="expressive">Expressive</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="sm" variant="outline" onClick={handleCopyUsage}>
              {copiedUsage ? <Check /> : <Copy />}
              {copiedUsage ? "Copied" : "Copy snippet"}
            </Button>
          </div>
        </div>

        {/* Live Mode Preview directly on canvas */}
        <div
          data-type-scale={scaleMode}
          className="rounded-[var(--radius)] border border-border/70 bg-muted/20 p-6 transition-all"
        >
          <div className="flex flex-col gap-[var(--space-stack)]">
            <div className="text-[length:var(--text-meta)] text-muted-foreground">
              {activeSpec.label} · {activeSpec.useCase} · {activeSpec.baseRatio}
            </div>
            <h3 className="font-cooper text-[length:var(--text-h1)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-foreground">
              {sampleText}
            </h3>
            <p className="font-sans text-[length:var(--text-body)] leading-[var(--leading-body)] max-w-[var(--measure)] text-muted-foreground">
              Good software typography adapts to the job at hand—tighter for dense schedules and tables, measured for calm reading, and open for storytelling—without changing brand fonts or color tokens.
            </p>
          </div>
        </div>

        {/* CSS Token Matrix */}
        <div className="overflow-x-auto border-t border-border/60">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Token</th>
                <th className="py-3 px-4 font-medium">compact</th>
                <th className="py-3 px-4 font-medium">editorial (default)</th>
                <th className="py-3 pl-4 font-medium">expressive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono text-[11px]">
              <tr>
                <td className="py-2.5 pr-4 text-foreground font-sans text-xs font-medium">Base / Ratio</td>
                <td className="py-2.5 px-4 text-muted-foreground">{MODE_SPECS.compact.baseRatio}</td>
                <td className="py-2.5 px-4 text-foreground">{MODE_SPECS.editorial.baseRatio}</td>
                <td className="py-2.5 pl-4 text-muted-foreground">{MODE_SPECS.expressive.baseRatio}</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-foreground">--text-h1 / --text-h2 / --text-h3</td>
                <td className="py-2.5 px-4 text-muted-foreground">{MODE_SPECS.compact.h1} / {MODE_SPECS.compact.h2} / {MODE_SPECS.compact.h3}</td>
                <td className="py-2.5 px-4 text-foreground">{MODE_SPECS.editorial.h1} / {MODE_SPECS.editorial.h2} / {MODE_SPECS.editorial.h3}</td>
                <td className="py-2.5 pl-4 text-muted-foreground">{MODE_SPECS.expressive.h1} / {MODE_SPECS.expressive.h2} / {MODE_SPECS.expressive.h3}</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-foreground">--text-body / --text-meta</td>
                <td className="py-2.5 px-4 text-muted-foreground">{MODE_SPECS.compact.body} / {MODE_SPECS.compact.meta}</td>
                <td className="py-2.5 px-4 text-foreground">{MODE_SPECS.editorial.body} / {MODE_SPECS.editorial.meta}</td>
                <td className="py-2.5 pl-4 text-muted-foreground">{MODE_SPECS.expressive.body} / {MODE_SPECS.expressive.meta}</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-foreground">--leading-display / --leading-body</td>
                <td className="py-2.5 px-4 text-muted-foreground">{MODE_SPECS.compact.leadingDisplay} / {MODE_SPECS.compact.leadingBody}</td>
                <td className="py-2.5 px-4 text-foreground">{MODE_SPECS.editorial.leadingDisplay} / {MODE_SPECS.editorial.leadingBody}</td>
                <td className="py-2.5 pl-4 text-muted-foreground">{MODE_SPECS.expressive.leadingDisplay} / {MODE_SPECS.expressive.leadingBody}</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-foreground">--tracking-display / --measure</td>
                <td className="py-2.5 px-4 text-muted-foreground">{MODE_SPECS.compact.trackingDisplay} / {MODE_SPECS.compact.measure}</td>
                <td className="py-2.5 px-4 text-foreground">{MODE_SPECS.editorial.trackingDisplay} / {MODE_SPECS.editorial.measure}</td>
                <td className="py-2.5 pl-4 text-muted-foreground">{MODE_SPECS.expressive.trackingDisplay} / {MODE_SPECS.expressive.measure}</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-foreground">--space-section / --space-stack</td>
                <td className="py-2.5 px-4 text-muted-foreground">{MODE_SPECS.compact.spaceSection} / {MODE_SPECS.compact.spaceStack}</td>
                <td className="py-2.5 px-4 text-foreground">{MODE_SPECS.editorial.spaceSection} / {MODE_SPECS.editorial.spaceStack}</td>
                <td className="py-2.5 pl-4 text-muted-foreground">{MODE_SPECS.expressive.spaceSection} / {MODE_SPECS.expressive.spaceStack}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Golden Rule Callout */}
      <div className="rounded-[var(--radius)] bg-muted/40 border border-border/60 p-5 flex items-start gap-3">
        <AlertCircle className="size-4 shrink-0 text-amber-600 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-semibold text-foreground">The Anti-Slop Typography Rule:</span>
          <p className="text-muted-foreground leading-relaxed">
            Never use <code className="bg-muted px-1 py-0.5 rounded text-[11px]">font-cooper</code> on table data, form labels, badges, or buttons. Cooper is strictly reserved for hero moments, section titles (h1/h2), and prominent numbers.
          </p>
        </div>
      </div>
    </div>
  );
}
