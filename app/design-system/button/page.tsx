"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Heart,
  Moon,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  Sun,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    description: "Original kohl.design brand identity with deep forest pine and 8px pebble corners.",
  },
  {
    id: "blush",
    label: "Blush Brand",
    badge: "14px • Pink",
    dotClass: "bg-[#eb2a4b]",
    description: "Crimson pink dominant primary button with mint accent and soft 14px curvature.",
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

export default function ButtonShowcasePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [activePreset, setActivePreset] = React.useState<ThemePreset>("default");

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<
    "default" | "editorial" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  >("default");
  const [selectedSize, setSelectedSize] = React.useState<"sm" | "default" | "lg" | "xl">("default");
  const [playgroundText, setPlaygroundText] = React.useState("Continue Project");
  const [showLeftIcon, setShowLeftIcon] = React.useState(false);
  const [showRightIcon, setShowRightIcon] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const playgroundJsx = `<Button
  variant="${selectedVariant}"
  size="${selectedSize}"${isLoading ? "\n  loading" : ""}${isDisabled ? "\n  disabled" : ""}
>${showLeftIcon ? '\n  <Sparkles />' : ''}
  ${playgroundText}${showRightIcon ? '\n  <ArrowRight />' : ''}
</Button>`;

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
            <span className="font-semibold text-sm">Design System</span>
            <span className="text-border">/</span>
            <span className="rounded-[var(--radius-sm)] bg-pine-50 px-2 py-0.5 text-xs font-semibold text-pine-700 dark:bg-pine-800 dark:text-pine-200">
              Button POC
            </span>
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="gap-2"
              >
                {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark (Midnight)"}</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {/* Hero Introduction */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
            <span>Component Specification · 01</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Button Component
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Built on top of <span className="font-semibold text-foreground">shadcn/ui</span> and tailored for the <span className="font-semibold text-foreground">kohl.design</span> brand identity. Features signature Pine and Crimson palettes, dynamic <code className="font-mono text-xs font-semibold text-primary">var(--radius)</code> corner radii, tactile click micro-animations, and integrated loading states.
          </p>

          {/* Interactive Global & Theme Toolbar */}
          <div className="space-y-3 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-[var(--radius)] border border-border bg-card/70 backdrop-blur-xs shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Project Preset Switcher
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    (Preview how tokens adapt for your other personal projects)
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_OPTIONS.map((preset) => {
                    const isSelected = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setActivePreset(preset.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-xs ring-2 ring-primary/20"
                            : "bg-background text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        <span className={`size-2.5 rounded-full ${preset.dotClass}`} />
                        <span>{preset.label}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-[calc(var(--radius-sm)-2px)] font-mono ${
                            isSelected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {preset.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 md:self-end">
                <Button
                  variant={isLoading ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsLoading(!isLoading)}
                  className="gap-1.5"
                >
                  <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  <span>{isLoading ? "Loading ON" : "Toggle Loading"}</span>
                </Button>
                <Button
                  variant={isDisabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsDisabled(!isDisabled)}
                >
                  <span>{isDisabled ? "Disabled ON" : "Toggle Disabled"}</span>
                </Button>
              </div>
            </div>

            {/* Active Preset Explainer Banner */}
            <div className="flex items-center justify-between text-xs px-4 py-2.5 rounded-[var(--radius)] bg-muted/40 border border-border text-muted-foreground">
              <span>
                <strong className="text-foreground">Active Preset:</strong>{" "}
                {PRESET_OPTIONS.find((p) => p.id === activePreset)?.description}
              </span>
              {activePreset !== "default" && (
                <button
                  type="button"
                  onClick={() => setActivePreset("default")}
                  className="text-xs text-primary font-medium hover:underline cursor-pointer shrink-0 ml-4"
                >
                  Reset to Pine Base
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Section 1: All Style Variants */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">1. Brand Style Variants</h2>
            <p className="text-sm text-muted-foreground">
              Core brand variants engineered for primary conversions, dual-register moments, and utility surfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Primary / Default */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Primary Pine
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">variant="default"</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  Signature Pine Green hue with subtle elevation depth for dominant primary conversions and key CTAs.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="default"
                  loading={isLoading}
                  disabled={isDisabled}
                  className="w-full"
                >
                  Primary Action
                </Button>
              </div>
            </div>

            {/* Editorial / Blush */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-crimson-600 dark:text-crimson-400">
                    Brand Editorial
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">variant="editorial"</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  Soft blush wash with crimson typography. Pairs with Cooper headlines.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="editorial"
                  loading={isLoading}
                  disabled={isDisabled}
                  className="w-full"
                >
                  Editorial Moment
                </Button>
              </div>
            </div>

            {/* Secondary */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Secondary Surface
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">variant="secondary"</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  Subdued neutral grey-slate fill for lower-emphasis supporting actions.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="secondary"
                  loading={isLoading}
                  disabled={isDisabled}
                  className="w-full"
                >
                  Secondary
                </Button>
              </div>
            </div>

            {/* Outline */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Crisp Outline
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">variant="outline"</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  Crisp 1px border line for filters, navigation bars, and paired secondary buttons.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="outline"
                  loading={isLoading}
                  disabled={isDisabled}
                  className="w-full"
                >
                  Outline Button
                </Button>
              </div>
            </div>

            {/* Ghost */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Ghost Clean
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">variant="ghost"</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  Zero background until hover. Ideal for data table actions and toolbars.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="ghost"
                  loading={isLoading}
                  disabled={isDisabled}
                  className="w-full"
                >
                  Ghost Action
                </Button>
              </div>
            </div>

            {/* Destructive */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-destructive">
                    Destructive
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">variant="destructive"</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  High-alert actions like resource deletion, project cancellations, or revocations.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="destructive"
                  loading={isLoading}
                  disabled={isDisabled}
                  className="w-full gap-2"
                >
                  <Trash2 className="size-4" />
                  <span>Delete Resource</span>
                </Button>
              </div>
            </div>

            {/* Link */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Inline Link
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">variant="link"</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  Underlined link appearance with full button semantics and keyboard accessibility.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-start">
                <Button
                  variant="link"
                  loading={isLoading}
                  disabled={isDisabled}
                >
                  Learn more about craft
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Size Scale */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">2. Size Scale & Touch Targets</h2>
            <p className="text-sm text-muted-foreground">
              Proportional height, padding, gap, and icon sizing based on the 4px design grid with 8px corner radii.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-end gap-6">
              {/* Small */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="sm" · 28px (h-7, Compact)</div>
                <Button size="sm" variant="default" loading={isLoading} disabled={isDisabled}>
                  <Plus /> Small (28px)
                </Button>
              </div>

              {/* Default */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="default" · 32px (h-8, 14px font, Primary Base)</div>
                <Button size="default" variant="default" loading={isLoading} disabled={isDisabled}>
                  <Plus /> Default (32px)
                </Button>
              </div>

              {/* Large */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="lg" · 40px (h-10)</div>
                <Button size="lg" variant="default" loading={isLoading} disabled={isDisabled}>
                  <Plus /> Large (40px)
                </Button>
              </div>

              {/* Hero / XL */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="xl" · 48px (h-12, Hero)</div>
                <Button size="xl" variant="default" loading={isLoading} disabled={isDisabled}>
                  <Plus /> Hero (48px)
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-3">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Square Icon Buttons
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button size="icon-sm" variant="outline" loading={isLoading} disabled={isDisabled}>
                    <Heart />
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">size="icon-sm" (28px)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="icon" variant="default" loading={isLoading} disabled={isDisabled}>
                    <Download />
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">size="icon" (32px)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="icon-lg" variant="secondary" loading={isLoading} disabled={isDisabled}>
                    <Sparkles />
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">size="icon-lg" (40px)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="icon-xl" variant="outline" loading={isLoading} disabled={isDisabled}>
                    <Sparkles />
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">size="icon-xl" (48px)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Icon & Composition */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">3. Iconography & Next.js Link Composition</h2>
            <p className="text-sm text-muted-foreground">
              Composing buttons with leading icons, trailing arrows, counters, or as accessible navigation links.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-semibold text-foreground">Leading & Trailing Icons</h3>
              <p className="text-xs text-muted-foreground">
                Automatic optical alignment and scaling for SVG icons.
              </p>
              <div className="space-y-3">
                <Button variant="default" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Send className="size-4" /> Send Proposal
                  </span>
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="size-4" /> Download PDF
                  </span>
                  <span className="rounded-[2px] bg-muted px-1.5 py-0.5 text-[10px] font-mono">2.4 MB</span>
                </Button>
              </div>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-semibold text-foreground">Next.js Link Integration</h3>
              <p className="text-xs text-muted-foreground">
                Using Radix <code className="font-mono">asChild</code> to render an accessible Next.js Link.
              </p>
              <div className="space-y-3">
                <Button asChild variant="default" className="w-full">
                  <Link href="https://linkedin.com/in/henrikkohl" target="_blank" rel="noopener noreferrer">
                    <span>Contact via LinkedIn</span>
                    <ExternalLink className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/">
                    <span>Return to Home</span>
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-semibold text-foreground">Tactile Feedback & Accessibility</h3>
              <p className="text-xs text-muted-foreground">
                Built-in <code className="font-mono">active:scale-[0.98]</code> press response with Pine focus rings.
              </p>
              <div className="space-y-3">
                <Button variant="default" className="w-full">
                  Click me for tactile click
                </Button>
                <Button variant="outline" className="w-full">
                  Tab to focus with keyboard
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Dual-Register Environment Preview */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">4. Dual-Register Immersion</h2>
            <p className="text-sm text-muted-foreground">
              Verification of button contrast and aesthetics across both brand registers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Editorial Midnight Pine Register */}
            <div className="rounded-[var(--radius)] bg-[#011d18] border border-white/10 p-8 space-y-6 text-[#eff7f4]">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8ad0be]">
                  Register A · Brand Editorial
                </span>
                <h3 className="font-cooper text-3xl font-normal text-[#eff7f4]">
                  Exceeding expectations.
                </h3>
                <p className="text-sm text-[#a8e3d2] leading-relaxed">
                  Deep forest canvas with high-character contrast moments and vintage Cooper headlines.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="default" size="default">
                  Start Partnership <ArrowRight />
                </Button>
                <Button variant="editorial" size="default">
                  Editorial Case Study
                </Button>
              </div>
            </div>

            {/* Utility Slate Register */}
            <div className="rounded-[var(--radius)] bg-[#ffffff] dark:bg-card border border-[#d4d4d4] dark:border-border p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Register B · Neutral Utility
                </span>
                <h3 className="text-2xl font-bold text-foreground">
                  Client Project Portal
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Clean grey-slate workspace surfaces for client review tools, dashboards, and data tables.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="default" size="default">
                  Approve Deliverable <Check />
                </Button>
                <Button variant="outline" size="default">
                  Request Revision
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Playground & Code Generator */}
        <section className="space-y-6 pb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">5. Interactive Playground</h2>
            <p className="text-sm text-muted-foreground">
              Customize props and instantly copy the production React code.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 rounded-[var(--radius)] border border-border bg-card p-6 shadow-xs">
            {/* Config Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    ["default", "editorial", "secondary", "outline", "ghost", "destructive", "link"] as const
                  ).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] border transition-all cursor-pointer ${
                        selectedVariant === v
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  Size
                </label>
                <div className="flex gap-2">
                  {(["sm", "default", "lg", "xl"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] border transition-all cursor-pointer ${
                        selectedSize === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  Label Text
                </label>
                <input
                  type="text"
                  value={playgroundText}
                  onChange={(e) => setPlaygroundText(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLeftIcon}
                    onChange={(e) => setShowLeftIcon(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Leading Icon (&lt;Sparkles /&gt;)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showRightIcon}
                    onChange={(e) => setShowRightIcon(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Trailing Icon (&lt;ArrowRight /&gt;)</span>
                </label>
              </div>
            </div>

            {/* Live Preview & Code */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 lg:border-l lg:border-border lg:pl-6">
              <div className="flex-1 flex flex-col items-center justify-center min-h-[160px] rounded-[var(--radius)] border border-dashed border-border bg-muted/40 p-6">
                <Button
                  variant={selectedVariant}
                  size={selectedSize}
                  loading={isLoading}
                  disabled={isDisabled}
                >
                  {showLeftIcon && <Sparkles />}
                  <span>{playgroundText}</span>
                  {showRightIcon && <ArrowRight />}
                </Button>
              </div>

              <div className="relative rounded-[var(--radius)] bg-neutral-900 dark:bg-black p-4 text-neutral-100 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => copyToClipboard(playgroundJsx, "playground")}
                  className="absolute top-3 right-3 rounded p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy code"
                >
                  {copiedCode === "playground" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
                <pre className="overflow-x-auto pr-8 leading-relaxed">
                  {playgroundJsx}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Multi-Project Sharing & Token Overrides */}
        <section className="space-y-6 pb-16">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
              <span>Architecture & Reuse</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">6. Multi-Project Token Customization</h2>
            <p className="text-sm text-muted-foreground">
              How to reuse this design language in other personal projects with custom brand colors and corner radii.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                1. Token Abstraction
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All components use semantic CSS tokens (<code className="font-mono">var(--primary)</code>, <code className="font-mono">var(--radius)</code>) rather than hardcoded colors or pixel values. Changing 2 variables updates all components automatically.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" />
                2. Derived Scale Math
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Smaller buttons dynamically compute <code className="font-mono">calc(var(--radius) - 2px)</code> while Hero buttons use <code className="font-mono">calc(var(--radius) + 4px)</code>, preserving optical proportions whether sharp (2px) or round (18px).
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <span className="size-2 rounded-full bg-foreground" />
                3. Distribution
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use this repository as a GitHub starter template, copy the component bundle, or apply <code className="font-mono">data-theme-variant="blush"</code> to your root HTML element.
              </p>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  CSS Tokens for Active Preset:{" "}
                  <span className="text-primary font-mono">{activePreset}</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Drop this block into <code className="font-mono">app/globals.css</code> of your other personal project:
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const cssSnippet =
                    activePreset === "blush"
                      ? `:root {\n  --radius: 0.875rem; /* 14px soft curvature */\n  --primary: hsla(354, 80%, 54%, 1); /* Crimson pink brand */\n  --primary-hover: hsla(354, 85%, 46%, 1);\n  --primary-foreground: #ffffff;\n  --accent: hsla(164, 48%, 77%, 1); /* Mint secondary */\n  --accent-foreground: hsla(168, 94%, 6%, 1);\n}\n\n.dark {\n  --primary: hsla(356, 86%, 70%, 1); /* Luminous blush coral */\n  --primary-hover: hsla(356, 86%, 78%, 1);\n  --primary-foreground: hsla(168, 94%, 6%, 1);\n  --accent: hsla(164, 48%, 77%, 1);\n  --accent-foreground: hsla(168, 94%, 6%, 1);\n}`
                      : activePreset === "sharp"
                      ? `:root {\n  --radius: 2px; /* Razor-sharp technical corners */\n}`
                      : activePreset === "round"
                      ? `:root {\n  --radius: 1.125rem; /* 18px pebble curves */\n}`
                      : `:root {\n  --radius: 0.5rem; /* 8px signature pebble */\n  --primary: hsla(170, 100%, 16%, 1); /* Signature Pine */\n  --primary-hover: hsla(170, 90%, 11%, 1);\n  --accent: hsla(354, 34%, 43%, 1); /* Crimson */\n}`;
                  copyToClipboard(cssSnippet, "preset-css");
                }}
                className="gap-1.5 self-start sm:self-auto"
              >
                {copiedCode === "preset-css" ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy CSS Tokens</span>
                  </>
                )}
              </Button>
            </div>

            <pre className="rounded-[var(--radius-sm)] bg-neutral-900 dark:bg-black p-4 text-xs font-mono text-neutral-100 overflow-x-auto leading-relaxed">
              {activePreset === "blush" &&
`/* Blush Project Variant: Crimson Pink dominant + 14px soft curvature */
:root {
  --radius: 0.875rem; /* 14px soft curve */
  --primary: hsla(354, 80%, 54%, 1); /* Crimson pink brand */
  --primary-hover: hsla(354, 85%, 46%, 1);
  --primary-foreground: #ffffff;
  --accent: hsla(164, 48%, 77%, 1); /* Mint secondary */
  --accent-foreground: hsla(168, 94%, 6%, 1);
}

.dark {
  --primary: hsla(356, 86%, 70%, 1); /* Luminous blush coral */
  --primary-hover: hsla(356, 86%, 78%, 1);
  --primary-foreground: hsla(168, 94%, 6%, 1);
  --accent: hsla(164, 48%, 77%, 1);
  --accent-foreground: hsla(168, 94%, 6%, 1);
}`}
              {activePreset === "sharp" &&
`/* Sharp Technical Variant: 2px razor corners for developer/dashboard tools */
:root {
  --radius: 2px; /* Razor sharp */
}`}
              {activePreset === "round" &&
`/* Pebble Round Variant: 18px organic curves for playful/casual tools */
:root {
  --radius: 1.125rem; /* 18px pebble */
}`}
              {activePreset === "default" &&
`/* Kohl Default: Signature Pine Green + 8px pebble corners */
:root {
  --radius: 0.5rem; /* 8px signature pebble */
  --primary: hsla(170, 100%, 16%, 1); /* Signature Pine */
  --primary-hover: hsla(170, 90%, 11%, 1);
  --accent: hsla(354, 34%, 43%, 1); /* Crimson */
}`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
