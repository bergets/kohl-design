"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Heart,
  Plus,
  RefreshCw,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDesignSystem } from "@/components/design-system/DesignSystemContext";

export default function ButtonShowcasePage() {
  const { brandTheme } = useDesignSystem();
  const [mounted, setMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Unified row alignment demo state
  const [alignmentSize, setAlignmentSize] = React.useState<"xs" | "sm" | "default" | "lg">("default");
  const [showAlignmentGuides, setShowAlignmentGuides] = React.useState(true);

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<
    "default" | "editorial" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  >("default");
  const [selectedSize, setSelectedSize] = React.useState<"xs" | "sm" | "default" | "lg" | "xl">("default");
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
    <div className="space-y-12">
      {/* Hero Introduction */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Button
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Built on top of <span className="font-semibold text-foreground">shadcn/ui</span> and tailored for the <span className="font-semibold text-foreground">kohl.design</span> brand identity. Features signature Pine and Crimson palettes, tactile click micro-animations, and integrated loading states.
        </p>

        {/* Interactive Global Controls */}
        <div className="flex items-center gap-2 pt-2">
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
      </section>

        {/* Section 1: All Style Variants */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">1. Brand Style Variants</h2>
            <p className="text-sm text-muted-foreground">
              Core brand variants engineered for primary conversions, dual-register moments, and utility surfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Primary / Default */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: brandTheme === "blush" ? "var(--accent)" : "var(--primary)" }}
                  >
                    {brandTheme === "blush" ? "Primary Blush" : "Primary Pine"}
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
                  {brandTheme === "blush"
                    ? "Deep wine & rose outline badge. Contrasts cleanly with the filled cashmere primary."
                    : "Soft blush wash with crimson typography. Pairs with Cooper headlines."}
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
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--link)" }}
                  >
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
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">2. Size Scale & Touch Targets</h2>
            <p className="text-sm text-muted-foreground">
              Proportional height, padding, gap, and icon sizing based on the 4px design grid with 8px corner radii.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-end gap-6">
              {/* Extra Small */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="xs" · 28px (h-7, Micro)</div>
                <Button size="xs" variant="default" loading={isLoading} disabled={isDisabled}>
                  <Plus /> Micro (28px)
                </Button>
              </div>

              {/* Small */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="sm" · 32px (h-8, Toolbar)</div>
                <Button size="sm" variant="default" loading={isLoading} disabled={isDisabled}>
                  <Plus /> Small (32px)
                </Button>
              </div>

              {/* Default */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="default" · 36px (h-9, Standard Base)</div>
                <Button size="default" variant="default" loading={isLoading} disabled={isDisabled}>
                  <Plus /> Default (36px)
                </Button>
              </div>

              {/* Large */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">size="lg" · 40px (h-10, Prominent)</div>
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
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button size="icon-xs" variant="outline" loading={isLoading} disabled={isDisabled}>
                    <Heart />
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">size="icon-xs" (28px)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="icon-sm" variant="outline" loading={isLoading} disabled={isDisabled}>
                    <Heart />
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">size="icon-sm" (32px)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="icon" variant="default" loading={isLoading} disabled={isDisabled}>
                    <Download />
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">size="icon" (36px)</span>
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

        {/* Section 3: Unified Row Alignment */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
              3. Unified Control Row Alignment
            </h2>
            <p className="text-sm text-muted-foreground">
              Buttons, segmented controls (Tabs), toggles, and inputs share a synchronized vertical height scale (<code className="font-mono text-xs text-foreground">28px</code>, <code className="font-mono text-xs text-foreground">32px</code>, <code className="font-mono text-xs text-foreground">36px</code>, <code className="font-mono text-xs text-foreground">40px</code>, <code className="font-mono text-xs text-foreground">48px</code>). Compose them side-by-side with zero pixel misalignment.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Interactive Multi-Control Alignment Row
                </span>
                <p className="text-xs text-muted-foreground">
                  Toggle sizes to verify that Input, Segmented Tabs, Toggle, and Button share exact top and bottom baselines.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Size Switcher */}
                <div className="flex rounded-[var(--radius-sm)] border border-border bg-muted/40 p-0.5">
                  {(["xs", "sm", "default", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setAlignmentSize(s)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-[calc(var(--radius-sm)-2px)] transition-all cursor-pointer ${
                        alignmentSize === s
                          ? "bg-background text-foreground font-semibold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s} ({s === "xs" ? "28px" : s === "sm" ? "32px" : s === "default" ? "36px" : "40px"})
                    </button>
                  ))}
                </div>

                {/* Alignment Guides Toggle */}
                <button
                  type="button"
                  onClick={() => setShowAlignmentGuides(!showAlignmentGuides)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-[var(--radius-sm)] border transition-all cursor-pointer ${
                    showAlignmentGuides
                      ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {showAlignmentGuides ? "Guides On" : "Guides Off"}
                </button>
              </div>
            </div>

            {/* Live Aligned Row with Guides */}
            <div className="relative py-8 px-4 rounded-[var(--radius)] bg-muted/20 border border-border/80 overflow-x-auto">
              {showAlignmentGuides && (
                <>
                  {/* Top Bounding Line */}
                  <div className="absolute left-0 right-0 top-8 border-t border-dashed border-crimson-400/80 pointer-events-none z-10" />
                  {/* Bottom Bounding Line */}
                  <div
                    className="absolute left-0 right-0 border-b border-dashed border-crimson-400/80 pointer-events-none z-10 transition-all duration-150"
                    style={{
                      top:
                        alignmentSize === "xs"
                          ? "calc(2rem + 28px)"
                          : alignmentSize === "sm"
                          ? "calc(2rem + 32px)"
                          : alignmentSize === "default"
                          ? "calc(2rem + 36px)"
                          : "calc(2rem + 40px)",
                    }}
                  />
                </>
              )}

              <div className="flex flex-wrap items-center gap-2.5 relative z-0">
                {/* 1. Search Input */}
                <Input
                  size={alignmentSize}
                  placeholder="Search assets..."
                  startIcon={<Search />}
                  className="w-48 sm:w-56"
                />

                {/* 2. Segmented Control (Tabs) */}
                <Tabs defaultValue="all">
                  <TabsList variant="default" size={alignmentSize}>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* 3. Standalone Toggle */}
                <Toggle size={alignmentSize} variant="outline" aria-label="Bookmark">
                  <Bookmark />
                </Toggle>

                {/* 4. Secondary Action Button */}
                <Button size={alignmentSize} variant="outline" className="gap-1.5">
                  <SlidersHorizontal />
                  <span>Filters</span>
                </Button>

                {/* 5. Primary CTA Button */}
                <Button size={alignmentSize} variant="default" className="gap-1.5">
                  <Plus />
                  <span>Create Item</span>
                </Button>
              </div>
            </div>

            {/* Spec Matrix Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-semibold">
                    <th className="py-2 px-3">Size Variant</th>
                    <th className="py-2 px-3">Exact Height</th>
                    <th className="py-2 px-3">Button</th>
                    <th className="py-2 px-3">Tabs (Segmented)</th>
                    <th className="py-2 px-3">Toggle</th>
                    <th className="py-2 px-3">Input</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-mono text-[11px]">
                  <tr className="hover:bg-muted/30">
                    <td className="py-2 px-3 font-semibold text-foreground">size="xs"</td>
                    <td className="py-2 px-3 text-link font-semibold">28px (h-7)</td>
                    <td className="py-2 px-3 text-muted-foreground">h-7 px-2.5 text-xs</td>
                    <td className="py-2 px-3 text-muted-foreground">h-7 p-0.5 track</td>
                    <td className="py-2 px-3 text-muted-foreground">h-7 min-w-7 px-2</td>
                    <td className="py-2 px-3 text-muted-foreground">h-7 px-2.5 text-xs</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-2 px-3 font-semibold text-foreground">size="sm"</td>
                    <td className="py-2 px-3 text-link font-semibold">32px (h-8)</td>
                    <td className="py-2 px-3 text-muted-foreground">h-8 px-3 text-xs</td>
                    <td className="py-2 px-3 text-muted-foreground">h-8 p-0.5 track</td>
                    <td className="py-2 px-3 text-muted-foreground">h-8 min-w-8 px-2.5</td>
                    <td className="py-2 px-3 text-muted-foreground">h-8 px-3 text-xs</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-2 px-3 font-semibold text-foreground">size="default"</td>
                    <td className="py-2 px-3 text-link font-semibold">36px (h-9)</td>
                    <td className="py-2 px-3 text-muted-foreground">h-9 px-4 text-sm</td>
                    <td className="py-2 px-3 text-muted-foreground">h-9 p-1 track</td>
                    <td className="py-2 px-3 text-muted-foreground">h-9 min-w-9 px-3</td>
                    <td className="py-2 px-3 text-muted-foreground">h-9 px-3.5 text-sm</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-2 px-3 font-semibold text-foreground">size="lg"</td>
                    <td className="py-2 px-3 text-link font-semibold">40px (h-10)</td>
                    <td className="py-2 px-3 text-muted-foreground">h-10 px-5 text-sm</td>
                    <td className="py-2 px-3 text-muted-foreground">h-10 p-1 track</td>
                    <td className="py-2 px-3 text-muted-foreground">h-10 min-w-10 px-3.5</td>
                    <td className="py-2 px-3 text-muted-foreground">h-10 px-4 text-sm</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-2 px-3 font-semibold text-foreground">size="xl"</td>
                    <td className="py-2 px-3 text-link font-semibold">48px (h-12)</td>
                    <td className="py-2 px-3 text-muted-foreground">h-12 px-6 text-base</td>
                    <td className="py-2 px-3 text-muted-foreground">h-12 p-1.5 track</td>
                    <td className="py-2 px-3 text-muted-foreground">h-12 min-w-12 px-4</td>
                    <td className="py-2 px-3 text-muted-foreground">h-12 px-4.5 text-base</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Icon & Composition */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">4. Iconography & Next.js Link Composition</h2>
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

        {/* Section 5: Dual-Register Environment Preview */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">5. Dual-Register Immersion</h2>
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
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
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

        {/* Section 6: Interactive Playground & Code Generator */}
        <section className="space-y-6 pb-12">
          <div className="space-y-1">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">6. Interactive Playground</h2>
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
                <div className="flex flex-wrap gap-2">
                  {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
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

        {/* Section 7: Multi-Project Sharing & Token Overrides */}
        <section className="space-y-6 pb-16">
          <div className="space-y-1">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">7. Multi-Project Token Customization</h2>
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
                  CSS Tokens for Active Theme:{" "}
                  <span className="text-accent font-mono capitalize">{brandTheme}</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Drop this block into <code className="font-mono">app/globals.css</code> of your project:
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const cssSnippet =
                    brandTheme === "blush"
                      ? `:root {\n  --radius: 0.875rem; /* 14px soft curvature */\n  --primary: hsla(356, 86%, 89%, 1); /* Cashmere blush #FBC8CB */\n  --primary-hover: hsla(356, 85%, 82%, 1); /* Silky rose petal */\n  --primary-foreground: hsla(352, 60%, 7%, 1); /* Deep velvet wine noir #1d070a */\n  --accent: hsla(354, 50%, 36%, 1); /* Signature crimson #8a2e36 */\n  --accent-foreground: #ffffff;\n  --foreground: hsla(352, 60%, 7%, 1); /* Deep wine noir typography */\n  --link: hsla(354, 60%, 32%, 1); /* Deep crimson link #822129 (10:1 AAA) */\n  --link-hover: hsla(352, 100%, 13%, 1); /* Deep wine #420006 */\n  /* Light mode petal wash surfaces */\n  --secondary: hsla(356, 60%, 96%, 1);\n  --secondary-foreground: hsla(352, 60%, 7%, 1);\n  --muted: hsla(356, 60%, 96%, 1);\n  --muted-foreground: hsla(354, 25%, 45%, 1);\n  --border: hsla(355, 40%, 88%, 1);\n  --sidebar: hsla(356, 89%, 96%, 1);\n}\n\n.dark {\n  /* Dark mode: Velvety Midnight Berry & Plum surfaces */\n  --background: hsla(352, 55%, 6.5%, 1); /* Canvas #1a0709 */\n  --foreground: hsla(356, 86%, 96%, 1); /* Petal white #feeced */\n  --card: hsla(352, 42%, 11%, 1); /* Deep plum card #281013 */\n  --card-foreground: hsla(356, 86%, 96%, 1);\n  --popover: hsla(352, 42%, 11%, 1);\n  --popover-foreground: hsla(356, 86%, 96%, 1);\n  --primary: hsla(356, 86%, 89%, 1); /* Luminous blush #FCD3D6 */\n  --primary-hover: hsla(356, 90%, 94%, 1);\n  --primary-foreground: hsla(352, 60%, 7%, 1);\n  --secondary: hsla(352, 22%, 18%, 1); /* Dusty mauve/berry #382426 */\n  --secondary-foreground: hsla(356, 86%, 96%, 1);\n  --muted: hsla(352, 22%, 18%, 1);\n  --muted-foreground: hsla(352, 20%, 65%, 1); /* Warm dusty rose #b89499 */\n  --accent: hsla(355, 73%, 79%, 1); /* Luminous rose secondary #f79da5 */\n  --accent-foreground: hsla(352, 60%, 7%, 1);\n  --border: hsla(352, 20%, 26%, 1); /* Deep berry border #503539 */\n  --sidebar: hsla(352, 45%, 9%, 1); /* Deep night berry #210c10 */\n  --link: hsla(356, 86%, 85%, 1); /* Luminous rose link #fcd3d6 (11.5:1 AAA) */\n  --link-hover: hsla(356, 90%, 94%, 1);\n}`
                      : `:root {\n  --radius: 0.5rem; /* 8px signature pebble */\n  --primary: hsla(170, 100%, 16%, 1); /* Signature Pine */\n  --primary-hover: hsla(170, 90%, 11%, 1);\n  --accent: hsla(354, 34%, 43%, 1); /* Crimson */\n  --link: hsla(170, 100%, 16%, 1);\n  --link-hover: hsla(170, 90%, 11%, 1);\n}`;
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
              {brandTheme === "blush" ? (
`/* Blush Project Variant: Pure Cashmere Blush + Midnight Berry (Zero Pine) */
:root {
  --radius: 0.875rem; /* 14px soft curve */
  --primary: hsla(356, 86%, 89%, 1); /* Cashmere blush #FBC8CB */
  --primary-hover: hsla(356, 85%, 82%, 1); /* Silky rose petal */
  --primary-foreground: hsla(352, 60%, 7%, 1); /* Deep velvet wine noir #1d070a */
  --accent: hsla(354, 50%, 36%, 1); /* Signature crimson #8a2e36 */
  --accent-foreground: #ffffff;
  --foreground: hsla(352, 60%, 7%, 1); /* Deep wine noir typography */

  /* Surfaces in Blush Light Mode: Delicate Petal Wash */
  --secondary: hsla(356, 60%, 96%, 1);
  --secondary-foreground: hsla(352, 60%, 7%, 1);
  --muted: hsla(356, 60%, 96%, 1);
  --muted-foreground: hsla(354, 25%, 45%, 1);
  --border: hsla(355, 40%, 88%, 1);
  --sidebar: hsla(356, 89%, 96%, 1);
}

.dark {
  /* Surfaces in Blush Dark Mode: Midnight Berry & Plum Scale */
  --background: hsla(352, 55%, 6.5%, 1); /* Canvas #1a0709 */
  --foreground: hsla(356, 86%, 96%, 1); /* Petal white #feeced */
  --card: hsla(352, 42%, 11%, 1); /* Deep plum card #281013 */
  --card-foreground: hsla(356, 86%, 96%, 1);
  --popover: hsla(352, 42%, 11%, 1);
  --popover-foreground: hsla(356, 86%, 96%, 1);
  --primary: hsla(356, 86%, 89%, 1); /* Luminous blush #FCD3D6 */
  --primary-hover: hsla(356, 90%, 94%, 1);
  --primary-foreground: hsla(352, 60%, 7%, 1);
  --secondary: hsla(352, 22%, 18%, 1); /* Dark dusty mauve #382426 */
  --secondary-foreground: hsla(356, 86%, 96%, 1);
  --muted: hsla(352, 22%, 18%, 1);
  --muted-foreground: hsla(352, 20%, 65%, 1); /* Warm dusty rose #b89499 */
  --accent: hsla(355, 73%, 79%, 1); /* Luminous rose secondary #f79da5 */
  --accent-foreground: hsla(352, 60%, 7%, 1);
  --border: hsla(352, 20%, 26%, 1); /* Deep berry border #503539 */
  --sidebar: hsla(352, 45%, 9%, 1); /* Deep night berry #210c10 */
}`
              ) : (
`/* Pine Project Variant: Signature Forest Pine + Crimson Accent */
:root {
  --radius: 0.5rem; /* 8px signature pebble */
  --primary: hsla(170, 100%, 16%, 1); /* Signature Pine */
  --primary-hover: hsla(170, 90%, 11%, 1);
  --accent: hsla(354, 34%, 43%, 1); /* Crimson */
  --link: hsla(170, 100%, 16%, 1);
  --link-hover: hsla(170, 90%, 11%, 1);
}`
              )}
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
            <Link href="/design-system/card" className="hover:text-foreground transition-colors">
              Card
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
