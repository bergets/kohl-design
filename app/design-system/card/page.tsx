"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function CardShowcasePage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<
    "default" | "elevated" | "interactive" | "sunken" | "glass"
  >("default");
  const [selectedSize, setSelectedSize] = React.useState<"sm" | "default" | "lg">("default");
  const [cardTitle, setCardTitle] = React.useState("Founder Strategy Session");
  const [cardDesc, setCardDesc] = React.useState(
    "High-touch interface direction, brand architecture, and tactile digital craft."
  );
  const [showFooter, setShowFooter] = React.useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const playgroundJsx = `<Card variant="${selectedVariant}" size="${selectedSize}">
  <CardHeader>
    <CardTitle>${cardTitle}</CardTitle>
    <CardDescription>
      ${cardDesc}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-xs text-muted-foreground">
      Content slot supporting flexible layout, metrics, or media.
    </p>
  </CardContent>${
    showFooter
      ? `\n  <CardFooter>
    <span className="text-xs font-mono text-muted-foreground">Active</span>
    <Button size="sm">Continue</Button>
  </CardFooter>`
      : ""
  }
</Card>`;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Card
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          The primary content container component for Kohl Design. Provides 5 elevation variants, tactile click responses, and semantic subcomponent slots for clear visual hierarchy.
        </p>

        {/* Foundation Bridge Callout */}
        <div className="rounded-[var(--radius)] border border-border bg-muted/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Layers className="size-4 text-primary shrink-0" />
            <span>Card variants implement Kohl Design’s 5 Elevation Layers and concentric radius geometry.</span>
          </div>
          <Link
            href="/design-system/surfaces"
            className="font-medium text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Read Surfaces & Elevation</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </section>

      {/* Section 1: Card Variants in Action */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">1. Component Variants</h2>
          <p className="text-sm text-muted-foreground">
            Five production variants conforming to the Emil Kowalski philosophy: <em>shadows for elevation, borders for structure</em>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Variant 1: Default */}
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Hairline Structure
                </span>
                <code className="text-[11px] font-mono text-muted-foreground">variant="default"</code>
              </div>
              <CardTitle>Flat Structural Card</CardTitle>
              <CardDescription>
                Clean 1px border line for dense dashboards, settings, and tables where low visual noise is paramount.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-[var(--radius-sm)] bg-muted/40 p-3 text-xs font-mono text-muted-foreground">
                box-shadow: shadow-xs; border: 1px border-border;
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-xs font-medium text-muted-foreground">Standard Layout</span>
              <Button size="sm" variant="outline">Action</Button>
            </CardFooter>
          </Card>

          {/* Variant 2: Elevated */}
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Tactile Depth
                </span>
                <code className="text-[11px] font-mono text-muted-foreground">variant="elevated"</code>
              </div>
              <CardTitle>Elevated Depth Card</CardTitle>
              <CardDescription>
                Multi-layered ambient depth shadow for featured products, announcements, and hero marketing moments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-[var(--radius-sm)] bg-muted/40 p-3 text-xs font-mono text-muted-foreground">
                Multi-layer transparent shadow + hairline edge
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-xs font-medium text-accent">Featured Moment</span>
              <Button size="sm">Primary CTA</Button>
            </CardFooter>
          </Card>

          {/* Variant 3: Interactive */}
          <Card variant="interactive">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Hover Lift & Glow
                </span>
                <code className="text-[11px] font-mono text-muted-foreground">variant="interactive"</code>
              </div>
              <CardTitle className="group-hover:text-accent transition-colors">
                Interactive Click Card
              </CardTitle>
              <CardDescription>
                Micro-press feedback, hover -translate-y-0.5 lift, and border glow. Built for links and catalog cards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-[var(--radius-sm)] bg-muted/40 p-3 text-xs font-mono text-muted-foreground">
                Hover over this card to preview the subtle lift & border glow
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-xs font-semibold text-link flex items-center gap-1">
                <span>Explore link</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </CardFooter>
          </Card>

          {/* Variant 4: Sunken */}
          <Card variant="sunken">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Recessed Well
                </span>
                <code className="text-[11px] font-mono text-muted-foreground">variant="sunken"</code>
              </div>
              <CardTitle>Recessed Container</CardTitle>
              <CardDescription>
                Muted background surface for code viewports, terminal logs, or subordinate settings options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="rounded-[var(--radius-sm)] bg-background p-3 text-[11px] font-mono text-foreground border border-border/50">
                {`npm install @kohl/card\nexport { Card }`}
              </pre>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-muted-foreground">Code Display</span>
              <Button size="sm" variant="ghost">Copy</Button>
            </CardFooter>
          </Card>

          {/* Variant 5: Frosted Glass */}
          <Card variant="glass" className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Translucent Frosted Surface
                </span>
                <code className="text-[11px] font-mono text-muted-foreground">variant="glass"</code>
              </div>
              <CardTitle>Frosted Glass Overlay Card</CardTitle>
              <CardDescription>
                Translucent background with <code className="font-mono">backdrop-blur-md</code> for heads-up displays, floating docks, and sticky action strips.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[var(--radius-sm)] bg-primary/5 border border-primary/20">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">
                    Dynamic Theme Preservation
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Translucent surfaces automatically absorb the ambient tint of the active theme.
                  </p>
                </div>
                <Button size="sm" variant="editorial">Editorial Moment</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 2: Interactive Playground */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">2. Interactive Playground</h2>
          <p className="text-sm text-muted-foreground">
            Customize surface variants, padding sizes, and content to test how cards adapt in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 rounded-[var(--radius)] border border-border bg-card p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              Configure Card
            </h3>

            {/* Variant Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Card Variant
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {(["default", "elevated", "interactive", "sunken", "glass"] as const).map(
                  (v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`rounded-[var(--radius-sm)] px-2.5 py-1.5 text-xs font-medium capitalize border transition-all ${
                        selectedVariant === v
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/30 border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {v}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Padding Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["sm", "default", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-[var(--radius-sm)] px-2.5 py-1.5 text-xs font-medium capitalize border transition-all ${
                      selectedSize === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/30 border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {s === "sm" ? "Compact" : s === "default" ? "Standard" : "Spacious"}
                  </button>
                ))}
              </div>
            </div>

            {/* Text inputs */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Card Title</label>
                <input
                  type="text"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-background px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Card Description</label>
                <input
                  type="text"
                  value={cardDesc}
                  onChange={(e) => setCardDesc(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-background px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Include Card Footer</span>
              <input
                type="checkbox"
                checked={showFooter}
                onChange={(e) => setShowFooter(e.target.checked)}
                className="rounded accent-primary"
              />
            </div>
          </div>

          {/* Live Preview & Code */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-[var(--radius)] border border-border bg-muted/20 p-8 flex items-center justify-center min-h-[300px]">
              <div className="w-full max-w-md">
                <Card variant={selectedVariant} size={selectedSize}>
                  <CardHeader>
                    <CardTitle>{cardTitle || "Title Placeholder"}</CardTitle>
                    <CardDescription>
                      {cardDesc || "Description placeholder text."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 rounded-[var(--radius-sm)] bg-muted/40 border border-border/40 text-xs text-muted-foreground leading-relaxed">
                      Flexible content slot ready for metrics, charts, nested lists, or rich copy.
                    </div>
                  </CardContent>
                  {showFooter && (
                    <CardFooter>
                      <span className="text-xs font-mono text-muted-foreground">Ready</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Cancel</Button>
                        <Button size="sm">Save</Button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>

            {/* Code output */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-muted-foreground">
                  JSX Usage
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(playgroundJsx, "playground-jsx")}
                  className="gap-1.5 text-xs h-7"
                >
                  {copiedCode === "playground-jsx" ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </Button>
              </div>
              <pre className="rounded-[var(--radius-sm)] bg-neutral-900 dark:bg-black p-3.5 text-xs font-mono text-neutral-100 overflow-x-auto leading-relaxed">
                {playgroundJsx}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Subcomponent Anatomy */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">3. Subcomponent Anatomy</h2>
          <p className="text-sm text-muted-foreground">
            Composable primitives built on top of Radix-inspired slot principles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-2">
            <code className="text-xs font-mono font-semibold text-primary">&lt;Card&gt;</code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Root container providing border, background token, shadow, and corner radius.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-2">
            <code className="text-xs font-mono font-semibold text-primary">&lt;CardHeader&gt;</code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Top header container establishing vertical spacing between title and description.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-2">
            <code className="text-xs font-mono font-semibold text-primary">&lt;CardTitle&gt;</code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Header title element with font-sans font-semibold text-foreground.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-2">
            <code className="text-xs font-mono font-semibold text-primary">&lt;CardDescription&gt;</code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Supporting subtitle copy with text-xs text-muted-foreground.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-2">
            <code className="text-xs font-mono font-semibold text-primary">&lt;CardContent&gt;</code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Main content body slot. Never nest &lt;Card&gt; inside &lt;Card&gt;.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-2">
            <code className="text-xs font-mono font-semibold text-primary">&lt;CardFooter&gt;</code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Bottom action bar with flex items-center justify-between layout.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Quick Start & Installation */}
      <section className="space-y-6 pb-16">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">4. Quick Start & Installation</h2>
          <p className="text-sm text-muted-foreground">
            How to import <code className="font-mono text-accent">Card</code> into your Next.js features or registry components.
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-semibold">Standard React Import</h3>
          <pre className="rounded-[var(--radius-sm)] bg-neutral-900 dark:bg-black p-4 text-xs font-mono text-neutral-100 overflow-x-auto leading-relaxed">
{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DeliverableCard() {
  return (
    <Card variant="interactive">
      <CardHeader>
        <CardTitle>Client Portal Design</CardTitle>
        <CardDescription>Design engineering & typography systems.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Status: Review</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Open Workspace</Button>
      </CardFooter>
    </Card>
  )
}`}
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>kohl.design · Design System v1.0</span>
        <div className="flex items-center gap-4">
          <Link href="/design-system" className="hover:text-foreground transition-colors">
            Component Index
          </Link>
          <Link href="/design-system/surfaces" className="hover:text-foreground transition-colors">
            Surfaces & Elevation
          </Link>
          <Link href="/design-system/button" className="hover:text-foreground transition-colors">
            Button
          </Link>
          <Link href="/design-system/badge" className="hover:text-foreground transition-colors">
            Badge & Status
          </Link>
          <Link href="/design-system/input" className="hover:text-foreground transition-colors">
            Input Field
          </Link>
          <Link href="/design-system/toast" className="hover:text-foreground transition-colors">
            Toast
          </Link>
        </div>
      </footer>
    </div>
  );
}
