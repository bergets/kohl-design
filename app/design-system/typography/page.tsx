"use client";

import * as React from "react";
import { Type, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TypographyPage() {
  const [sampleText, setSampleText] = React.useState("High-craft software with editorial restraint.");

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
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="rounded-[var(--radius-sm)] border border-border bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Type your preview..."
          />
        </div>

        {/* Cooper Specimen */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Display Headlines — font-cooper (Cooper Regular)</span>
            <Badge variant="default" size="sm">Headlines Only</Badge>
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
            <span className="text-xs font-semibold text-muted-foreground">Body & UI — font-sans (DM Sans)</span>
            <Badge variant="secondary" size="sm">All Controls & Copy</Badge>
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

      {/* Golden Rule Callout */}
      <Card variant="sunken" className="p-5 flex items-start gap-3">
        <AlertCircle className="size-4 shrink-0 text-amber-600 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-semibold text-foreground">The Anti-Slop Typography Rule:</span>
          <p className="text-muted-foreground leading-relaxed">
            Never use <code className="bg-muted px-1 py-0.5 rounded text-[11px]">font-cooper</code> on table data, form labels, badges, or buttons. Cooper is strictly reserved for hero moments, section titles (h1/h2), and prominent numbers.
          </p>
        </div>
      </Card>
    </div>
  );
}
