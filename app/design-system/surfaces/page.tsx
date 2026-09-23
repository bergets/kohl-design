"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Layers,
  Sparkles,
  Maximize2,
  ShieldCheck,
  Code,
  ExternalLink,
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
import { ThemeToggle } from "@/components/theme-toggle";

type ThemePreset = "default" | "blush" | "sharp" | "round";

const PRESET_OPTIONS: {
  id: ThemePreset;
  label: string;
  badge: string;
  dotClass: string;
  description: string;
}[] = [
  {
    id: "default",
    label: "Pine Base",
    badge: "8px Radius",
    dotClass: "bg-[#005243]",
    description: "Deep forest pine canvas and elevated dark green cards with 8px pebble corners.",
  },
  {
    id: "blush",
    label: "Blush Brand",
    badge: "14px • Berry Scale",
    dotClass: "bg-[#FCD3D6] border border-[#f2aab2]",
    description: "Midnight berry canvas with elevated plum cards, rose borders, and 14px soft curvature.",
  },
  {
    id: "sharp",
    label: "Sharp Tech",
    badge: "2px Razor",
    dotClass: "bg-[#005243] rounded-[1px]",
    description: "Architectural, technical developer aesthetic with razor-sharp 2px corners.",
  },
  {
    id: "round",
    label: "Pebble Round",
    badge: "18px Organic",
    dotClass: "bg-[#005243]",
    description: "Friendly, organic pill aesthetic with deep 18px rounded curves.",
  },
];

export default function SurfacesShowcasePage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [activePreset, setActivePreset] = React.useState<ThemePreset>("default");
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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

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
    <div
      data-theme-variant={activePreset !== "default" ? activePreset : undefined}
      className="min-h-screen bg-background text-foreground transition-colors duration-200"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              <span>kohl.design</span>
            </Link>
            <span className="text-border">/</span>
            <Link
              href="/design-system"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Design System
            </Link>
            <span className="text-border">/</span>
            <span className="rounded-[var(--radius-sm)] bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
              Surfaces & Cards
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {/* Hero & Preset Switcher */}
        <section className="space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
              <Layers className="size-3.5" />
              <span>Spatial Foundation · Elevation Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground font-sans">
              Surfaces & Cards
            </h1>
            <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              The physical containers, elevation layers, and concentric corner geometry of the Kohl Design System. Engineered around semantic CSS tokens that adapt automatically across Pine and Blush themes in light and dark modes.
            </p>
          </div>

          {/* Theme Preset Switcher Toolbar */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Theme Personality Preset
              </span>
              <span className="text-xs text-muted-foreground">
                Live preview: switches all surfaces & radii instantaneously
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_OPTIONS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset.id)}
                  className={`flex flex-col gap-1.5 p-3 rounded-[var(--radius-sm)] text-left transition-all border ${
                    activePreset === preset.id
                      ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/30"
                      : "border-border/60 hover:border-border hover:bg-muted/40 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <span className={`size-2 rounded-full ${preset.dotClass}`} />
                      {preset.label}
                    </span>
                    {activePreset === preset.id && (
                      <Check className="size-3.5 text-primary" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {preset.badge}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/80 italic pt-1">
              {PRESET_OPTIONS.find((p) => p.id === activePreset)?.description}
            </p>
          </div>
        </section>

        {/* Section 1: The 5 Elevation Layers */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
              <span>Layer Hierarchy</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">1. Five Elevation Layers</h2>
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
                <div>Role: Base body wash</div>
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
                <div>Role: Primary content container</div>
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
                <div>Role: Raised context overlay</div>
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
                <div>Role: Inset contrast well</div>
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
                <div>Filter: backdrop-blur-md</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Card Variants in Action */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
              <span>Component Variants</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">2. Card Variants</h2>
            <p className="text-sm text-muted-foreground">
              Production ready variants of <code className="font-mono text-primary">components/ui/card.tsx</code> conforming to the Emil Kowalski philosophy: <em>shadows for elevation, borders for structure</em>.
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
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
                <span className="text-xs font-medium text-primary">Featured Moment</span>
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
                <CardTitle className="group-hover:text-primary transition-colors">
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
                <span className="text-xs font-semibold text-primary flex items-center gap-1">
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
                  {`npm install @kohl/surfaces\nexport { Card, Surface }`}
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
                      Translucent surfaces automatically absorb the ambient tint of the active preset.
                    </p>
                  </div>
                  <Button size="sm" variant="editorial">Editorial Moment</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Concentric Radius Math */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
              <span>Geometric Harmony</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">3. Concentric Radius Scale</h2>
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
                In Kohl Design, child components consume derived tokens (<code className="font-mono">var(--radius-sm)</code> for buttons, <code className="font-mono">var(--radius)</code> for cards), keeping the curves parallel:
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

        {/* Section 4: Interactive Playground */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
              <span>Interactive Sandbox</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">4. Surface Playground</h2>
            <p className="text-sm text-muted-foreground">
              Customize surface variants, padding sizes, and content to test how cards adapt in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Controls */}
            <div className="lg:col-span-5 rounded-[var(--radius)] border border-border bg-card p-6 space-y-5 shadow-xs">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                Configure Card
              </h3>

              {/* Variant Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Surface Variant
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

        {/* Section 5: Architecture & Installation */}
        <section className="space-y-6 pb-16">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
              <span>Developer Reference</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">5. Quick Start & Bundle Export</h2>
            <p className="text-sm text-muted-foreground">
              How to import <code className="font-mono text-primary">Card</code> in your Next.js features or share it with other personal projects.
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
      </main>
    </div>
  );
}
