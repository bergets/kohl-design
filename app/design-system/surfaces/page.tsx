"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Sparkles,
  ShieldCheck,
  PanelsTopLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SurfacesShowcasePage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Surfaces & Elevation
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          The physical depth architecture, 5 elevation layers, and material physics of the Kohl Design System. Governed by Emil Kowalski’s principle: <em>shadows for elevation, borders for structure</em>.
        </p>
      </section>

      {/* Section 1: The 5 Elevation Layers */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">1. Five Elevation Layers</h2>
          <p className="text-sm text-muted-foreground">
            Every interface view stacks from Level 0 to Level 4. In dark mode, surfaces are tinted with either Midnight Pine Green or Midnight Berry, never cold gray.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Layer 0: Canvas */}
          <div className="rounded-[var(--radius)] border border-border bg-background p-5 flex flex-col justify-between space-y-4 shadow-2xs">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-semibold uppercase text-accent">
                Level 0
              </span>
              <h3 className="text-base font-bold">Canvas</h3>
              <p className="text-xs text-muted-foreground">
                The primary viewport surface and page foundation.
              </p>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-muted-foreground pt-2 border-t border-border/60">
              <div>Token: <span className="text-foreground">--background</span></div>
              <div>Class: <span className="text-foreground">bg-background</span></div>
            </div>
          </div>

          {/* Layer 1: Base Card */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-5 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-semibold uppercase text-accent">
                Level 1
              </span>
              <h3 className="text-base font-bold">Surface / Card</h3>
              <p className="text-xs text-muted-foreground">
                Elevated content blocks, cards, and grid sections.
              </p>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-muted-foreground pt-2 border-t border-border/60">
              <div>Token: <span className="text-foreground">--card</span></div>
              <div>Class: <span className="text-foreground">bg-card</span></div>
            </div>
          </div>

          {/* Layer 2: Popover */}
          <div className="rounded-[var(--radius)] border border-border/80 bg-popover p-5 flex flex-col justify-between space-y-4 shadow-md">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-semibold uppercase text-accent">
                Level 2
              </span>
              <h3 className="text-base font-bold">Popover / Menu</h3>
              <p className="text-xs text-muted-foreground">
                Floating menus, dropdowns, tooltips, and flyouts.
              </p>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-muted-foreground pt-2 border-t border-border/60">
              <div>Token: <span className="text-foreground">--popover</span></div>
              <div>Class: <span className="text-foreground">bg-popover</span></div>
            </div>
          </div>

          {/* Layer 3: Sunken / Inset */}
          <div className="rounded-[var(--radius)] border border-border/70 bg-muted/50 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-semibold uppercase text-accent">
                Level 3 (Recessed)
              </span>
              <h3 className="text-base font-bold">Sunken Well</h3>
              <p className="text-xs text-muted-foreground">
                Recessed areas, code snippets, and nested forms.
              </p>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-muted-foreground pt-2 border-t border-border/60">
              <div>Token: <span className="text-foreground">--muted</span></div>
              <div>Class: <span className="text-foreground">bg-muted/50</span></div>
            </div>
          </div>

          {/* Layer 4: Frosted Glass */}
          <div className="rounded-[var(--radius)] border border-border/80 bg-background/80 backdrop-blur-md p-5 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-semibold uppercase text-accent">
                Level 4
              </span>
              <h3 className="text-base font-bold">Frosted Glass</h3>
              <p className="text-xs text-muted-foreground">
                Sticky headers, navigation overlays, floating bars.
              </p>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-muted-foreground pt-2 border-t border-border/60">
              <div>Token: <span className="text-foreground">bg-background/80</span></div>
              <div>Filter: <span className="text-foreground">backdrop-blur-md</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Material & Dark Mode Depth Philosophy */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">2. Depth & Material Physics</h2>
          <p className="text-sm text-muted-foreground">
            How Kohl Design avoids muddy gray interfaces by combining structural borders with atmospheric ambient tinting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-500" />
              Shadows for Elevation, Borders for Structure
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Borders give cards their structural silhouette and optical definition. Shadows represent physical elevation and distance from the canvas. When a card rises (Level 1 → Level 2), its shadow expands and diffuses, while its hairline border maintains crisp contrast.
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border text-xs font-mono text-muted-foreground">
              border: 1px solid var(--border);<br />
              box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              Atmospheric Dark-Mode Tinting
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Generic interfaces collapse in dark mode by using pitch-black or flat gray (<code className="font-mono text-xs">#121212</code>). Kohl Design infuses every dark-mode surface with brand undertones: deep <strong>Midnight Pine Green</strong> (<code className="font-mono text-xs">#011d18</code>) in Pine mode, or warm <strong>Midnight Berry</strong> (<code className="font-mono text-xs">#1a0709</code>) in Blush mode.
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border text-xs font-mono text-muted-foreground">
              Pine: hsla(170, 95%, 6%, 1) <br />
              Blush: hsla(352, 55%, 6.5%, 1)
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Concentric Radius Math */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">3. Concentric Radius Geometry</h2>
          <p className="text-sm text-muted-foreground">
            When nesting rounded elements, visual tension occurs if outer and inner radii don't account for padding: <code className="font-mono">outerRadius = innerRadius + padding</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Solution */}
          <div className="rounded-[var(--radius)] border border-emerald-500/40 bg-card p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" /> Correct: Derived Concentric Radii
              </span>
              <span className="text-xs font-mono text-muted-foreground">var(--radius)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Child components consume derived tokens (<code className="font-mono">var(--radius-sm)</code> for buttons, <code className="font-mono">var(--radius)</code> for cards), keeping the curves concentric and parallel:
            </p>

            <div className="p-6 rounded-[var(--radius)] bg-muted/30 border border-border space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Card Radius: <code className="font-mono text-foreground">var(--radius)</code></span>
                <span>Padding: 24px</span>
              </div>
              <div className="flex gap-2.5">
                <Button size="sm">Button (var(--radius-sm))</Button>
                <Button size="sm" variant="outline">Concentric</Button>
              </div>
            </div>
          </div>

          {/* The Token Scale Reference */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Token Derivation Formula in app/globals.css
            </span>
            <pre className="rounded-[var(--radius-sm)] bg-neutral-900 dark:bg-black p-4 text-xs font-mono text-neutral-100 overflow-x-auto leading-relaxed">
{`@theme inline {
  --radius-sm: calc(var(--radius) - 2px); /* Buttons sm, tags */
  --radius-md: var(--radius);              /* Cards, standard buttons */
  --radius-lg: calc(var(--radius) + 4px); /* Hero buttons, modal containers */
  --radius-xl: calc(var(--radius) + 8px); /* Outer frame wrappers */
}`}
            </pre>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Whether you select <strong>Pine Base (8px)</strong>, <strong>Blush (14px)</strong>, or <strong>Sharp (2px)</strong>, all nested elements scale proportionately with zero manual overrides.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Component Implementation Bridge */}
      <section className="space-y-6 pb-16">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">4. Component Implementation</h2>
          <p className="text-sm text-muted-foreground">
            In code, surfaces are consumed via the <code className="font-mono text-accent">Card</code> component with corresponding elevation variants.
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-primary/30 bg-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PanelsTopLeft className="size-5 text-primary" />
              <h3 className="font-semibold text-base text-foreground">Card Component</h3>
            </div>
            <p className="text-xs text-muted-foreground max-w-xl">
              Inspect interactive card variants, testing the live configurator playground, subcomponent anatomy, and installation details.
            </p>
          </div>
          <Button asChild variant="default" size="sm" className="gap-1.5 shrink-0">
            <Link href="/design-system/card">
              <span>View Card Component</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>kohl.design · Design System v1.0</span>
        <div className="flex items-center gap-4">
          <Link href="/design-system" className="hover:text-foreground transition-colors">
            Component Index
          </Link>
          <Link href="/design-system/colors" className="hover:text-foreground transition-colors">
            Colors & Tokens
          </Link>
          <Link href="/design-system/typography" className="hover:text-foreground transition-colors">
            Typography
          </Link>
          <Link href="/design-system/card" className="hover:text-foreground transition-colors">
            Card
          </Link>
          <Link href="/design-system/anti-slop" className="hover:text-foreground transition-colors">
            Anti-slop Guide
          </Link>
        </div>
      </footer>
    </div>
  );
}
