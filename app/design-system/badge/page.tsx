"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Flame,
  GitPullRequest,
  Moon,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Sun,
  Tag,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

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
    badge: "14px • Soft Pink",
    dotClass: "bg-[#FCD3D6] border border-[#f2aab2]",
    description: "Luminous cashmere blush CTA, deep velvet wine noir typography, and midnight berry surfaces.",
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

type VariantType = NonNullable<BadgeProps["variant"]>;
type ShapeType = NonNullable<BadgeProps["shape"]>;
type SizeType = NonNullable<BadgeProps["size"]>;

const INITIAL_TAGS = [
  { id: "1", label: "Design Systems", variant: "default" as const },
  { id: "2", label: "Tailwind v4", variant: "info" as const },
  { id: "3", label: "Framer Motion", variant: "editorial" as const },
  { id: "4", label: "UX Leadership", variant: "success" as const },
  { id: "5", label: "Radix UI", variant: "secondary" as const },
];

export default function BadgeShowcasePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [activePreset, setActivePreset] = React.useState<ThemePreset>("default");

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<VariantType>("default");
  const [selectedShape, setSelectedShape] = React.useState<ShapeType>("pill");
  const [selectedSize, setSelectedSize] = React.useState<SizeType>("default");
  const [badgeText, setBadgeText] = React.useState("Production Ready");
  const [hasDot, setHasDot] = React.useState(true);
  const [hasPulse, setHasPulse] = React.useState(false);
  const [leadingIcon, setLeadingIcon] = React.useState<"none" | "sparkles" | "check" | "clock" | "zap">("none");
  const [isRemovable, setIsRemovable] = React.useState(false);

  // Interactive filter tags demo state
  const [filterTags, setFilterTags] = React.useState(INITIAL_TAGS);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getLeadingIconJsx = () => {
    if (leadingIcon === "sparkles") return '<Sparkles className="size-3" /> ';
    if (leadingIcon === "check") return '<Check className="size-3" /> ';
    if (leadingIcon === "clock") return '<Clock className="size-3" /> ';
    if (leadingIcon === "zap") return '<Zap className="size-3" /> ';
    return "";
  };

  const playgroundJsx = `<Badge
  variant="${selectedVariant}"
  shape="${selectedShape}"
  size="${selectedSize}"${hasDot ? `\n  dot${hasPulse ? " pulse" : ""}` : ""}${isRemovable ? '\n  onRemove={() => console.log("Removed")}' : ""}
>
  ${getLeadingIconJsx()}${badgeText}
</Badge>`;

  return (
    <div
      data-theme-variant={activePreset !== "default" ? activePreset : undefined}
      className="min-h-screen bg-background text-foreground transition-colors duration-200"
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/design-system"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Design System</span>
            </Link>
            <span className="text-border">/</span>
            <span className="font-semibold text-sm">Components</span>
            <span className="text-border">/</span>
            <span className="rounded-[var(--radius-sm)] bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
              Badge & Status Pill
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
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
            <span>Metadata & Status Indicators</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Badge & Status Pill
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Compact indicators for review states, live system telemetry, categories, and removable filters. Engineered with WCAG contrast compliance, live pulsing animation, optional dismissal triggers, and dual capsule/tokenized corner shapes.
          </p>
        </section>

        {/* Personality Preset Switcher */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
            <div>
              <h2 className="text-lg font-bold">Personality Presets</h2>
              <p className="text-xs text-muted-foreground">
                Notice how the tokenized rectangular tags (<code className="font-mono text-xs">shape="rounded"</code>) inherit the brand’s dynamic radius.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_OPTIONS.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setActivePreset(preset.id)}
                  className={`text-left p-4 rounded-[var(--radius)] border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
                      : "border-border bg-card hover:border-border/80 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className={`size-3 rounded-full ${preset.dotClass}`} />
                      <span className="font-semibold text-sm">{preset.label}</span>
                    </div>
                    {isSelected && <Check className="size-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {preset.description}
                  </p>
                  <span className="text-[11px] font-mono text-muted-foreground/80 bg-muted px-2 py-0.5 rounded-[var(--radius-sm)] self-start">
                    {preset.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Interactive Playground */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">Interactive Component Playground</h2>
            <p className="text-xs text-muted-foreground">
              Configure status colors, geometric shapes, pulsing activity dots, and dismissal triggers in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls Panel */}
            <div className="lg:col-span-5 rounded-[var(--radius)] border border-border bg-card p-6 space-y-6 shadow-xs">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Configuration
              </h3>

              {/* Variant Selector */}
              <div className="space-y-2">
                <Label className="text-xs">Variant Color</Label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    [
                      "default",
                      "secondary",
                      "outline",
                      "editorial",
                      "success",
                      "warning",
                      "destructive",
                      "info",
                    ] as const
                  ).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`h-7 px-2 rounded-[var(--radius-sm)] text-[11px] font-medium capitalize border transition-all cursor-pointer ${
                        selectedVariant === v
                          ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape Selector */}
              <div className="space-y-2">
                <Label className="text-xs">Shape Geometry</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedShape("pill")}
                    className={`h-8 px-3 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                      selectedShape === "pill"
                        ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    Capsule Pill (full)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedShape("rounded")}
                    className={`h-8 px-3 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                      selectedShape === "rounded"
                        ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    Rounded Tag (derived)
                  </button>
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <Label className="text-xs">Optical Size</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["sm", "default", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`h-8 px-3 rounded-[var(--radius-sm)] text-xs font-medium capitalize border transition-all cursor-pointer ${
                        selectedSize === s
                          ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {s === "sm" ? "Small (20px)" : s === "default" ? "Default (24px)" : "Large (28px)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div className="space-y-2">
                <Label className="text-xs">Badge Label</Label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full h-8 px-3 rounded-[var(--radius-sm)] border border-input bg-background text-xs outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-border/80">
                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <span>Status Dot Indicator</span>
                  <input
                    type="checkbox"
                    checked={hasDot}
                    onChange={(e) => setHasDot(e.target.checked)}
                    className="size-4 accent-primary rounded"
                  />
                </label>

                {hasDot && (
                  <label className="flex items-center justify-between text-xs cursor-pointer select-none pl-3 border-l-2 border-primary/40">
                    <span>Live Pulsing Animation</span>
                    <input
                      type="checkbox"
                      checked={hasPulse}
                      onChange={(e) => setHasPulse(e.target.checked)}
                      className="size-4 accent-primary rounded"
                    />
                  </label>
                )}

                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <span>Dismissible (onRemove)</span>
                  <input
                    type="checkbox"
                    checked={isRemovable}
                    onChange={(e) => setIsRemovable(e.target.checked)}
                    className="size-4 accent-primary rounded"
                  />
                </label>
              </div>
            </div>

            {/* Live Preview Area */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-[var(--radius)] border border-border bg-card p-12 flex flex-col items-center justify-center min-h-[280px] shadow-xs space-y-6">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Badge
                    variant={selectedVariant}
                    shape={selectedShape}
                    size={selectedSize}
                    dot={hasDot}
                    pulse={hasPulse}
                    onRemove={isRemovable ? () => alert("Badge dismissed!") : undefined}
                  >
                    {badgeText || "Status"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Live rendering with active theme tokens and geometry.
                </p>
              </div>

              {/* Code Snippet */}
              <div className="rounded-[var(--radius)] border border-border bg-neutral-900 text-neutral-100 p-4 font-mono text-xs overflow-x-auto relative shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-neutral-400 text-[11px]">
                  <span>Generated JSX</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(playgroundJsx, "playground")}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    {copiedCode === "playground" ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-neutral-200 whitespace-pre-wrap">{playgroundJsx}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Matrix: Semantic Status Indicators */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">1. Semantic Review & Lifecycle States</h2>
            <p className="text-xs text-muted-foreground">
              Standardized status palettes used across design reviews, product milestones, and CI/CD pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Shipped */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <Badge variant="success" dot>
                  Shipped
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground">Production</span>
              </div>
              <p className="text-xs text-muted-foreground">Deployed and actively running in live user environments.</p>
            </div>

            {/* In Review */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <Badge variant="warning" dot>
                  In Review
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground">Approval</span>
              </div>
              <p className="text-xs text-muted-foreground">Code review, accessibility audit, or design sign-off in progress.</p>
            </div>

            {/* Active Telemetry */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <Badge variant="info" dot pulse>
                  Live Syncing
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground">Telemetry</span>
              </div>
              <p className="text-xs text-muted-foreground">Pulsing indicator denoting active real-time GPU/data streams.</p>
            </div>

            {/* Blocked / Deprecated */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <Badge variant="destructive" dot>
                  Deprecated
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground">Blocked</span>
              </div>
              <p className="text-xs text-muted-foreground">High-contrast alert signaling breaking changes or decommissioned APIs.</p>
            </div>
          </div>
        </section>

        {/* Visual Matrix: Brand Variants & Shapes */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">2. Brand Inks & Geometry Variants</h2>
            <p className="text-xs text-muted-foreground">
              Expressive brand palettes alongside dual geometric shapes (<code className="font-mono text-xs">pill</code> vs <code className="font-mono text-xs">rounded</code>).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pill Capsule */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="font-semibold text-sm">Capsule Pill (shape="pill")</span>
                <p className="text-xs text-muted-foreground">Full radius curve creating friendly, distinct metadata bubbles.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Badge variant="default">Pine Forest</Badge>
                <Badge variant="editorial">Crimson Coral</Badge>
                <Badge variant="secondary">Neutral Secondary</Badge>
                <Badge variant="outline">Minimal Outline</Badge>
              </div>
            </div>

            {/* Rounded Rectangular */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="font-semibold text-sm">Tokenized Tag (shape="rounded")</span>
                <p className="text-xs text-muted-foreground">Inherits <code className="font-mono text-xs">var(--radius-sm)</code>, aligning concentric curves with cards and buttons.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Badge variant="default" shape="rounded">Pine Forest</Badge>
                <Badge variant="editorial" shape="rounded">Crimson Coral</Badge>
                <Badge variant="secondary" shape="rounded">Neutral Secondary</Badge>
                <Badge variant="outline" shape="rounded">Minimal Outline</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Matrix: Optical Sizes */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">3. Optical Size Scale</h2>
            <p className="text-xs text-muted-foreground">
              Small (20px) for tight data grids, Default (24px) for cards, and Large (28px) for prominent headers.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border/80">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold">Small (h-5 / 20px)</span>
                <p className="text-[11px] text-muted-foreground">Compact tables, badge counts, and inline text tags.</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge size="sm" variant="default" dot>v1.2.0</Badge>
                <Badge size="sm" variant="success">Active</Badge>
                <Badge size="sm" variant="editorial">+14%</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-border/80">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold">Default (h-6 / 24px)</span>
                <p className="text-[11px] text-muted-foreground">Standard status pill for cards, dashboards, and feeds.</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge size="default" variant="default" dot>Production Ready</Badge>
                <Badge size="default" variant="info">Syncing</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold">Large (h-7 / 28px)</span>
                <p className="text-[11px] text-muted-foreground">Hero badges, marketing banners, and high-emphasis labels.</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge size="lg" variant="default" dot pulse>12+ Years Experience</Badge>
                <Badge size="lg" variant="editorial">New Release</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Dismissible Tags */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">4. Interactive Removable Chips</h2>
            <p className="text-xs text-muted-foreground">
              Pass an <code className="font-mono text-xs">onRemove</code> callback to render a tactile click-to-dismiss button.
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Skill Filters ({filterTags.length})
              </span>
              {filterTags.length < INITIAL_TAGS.length && (
                <button
                  type="button"
                  onClick={() => setFilterTags(INITIAL_TAGS)}
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 min-h-[44px]">
              {filterTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={tag.variant}
                  onRemove={() => setFilterTags(filterTags.filter((t) => t.id !== tag.id))}
                  removeLabel={`Remove ${tag.label} filter`}
                >
                  {tag.label}
                </Badge>
              ))}

              {filterTags.length === 0 && (
                <span className="text-xs text-muted-foreground italic">
                  All filters cleared. Click "Reset Filters" above to restore.
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Real-World Pattern Compositions */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">5. Real-World Component Compositions</h2>
            <p className="text-xs text-muted-foreground">
              Badges composed seamlessly inside release notes cards, task boards, and GitHub PR summaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PR Status Card */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="size-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-sm">feat(tokens): dynamic radius derivation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">PR #48 opened by henrikkohl · branch: feature/radii</p>
                </div>
                <Badge variant="success" size="sm" dot>
                  Merged
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/80">
                <Badge variant="outline" size="sm">Tailwind v4</Badge>
                <Badge variant="outline" size="sm">Tokens</Badge>
                <Badge variant="info" size="sm">Ready for Review</Badge>
              </div>
            </div>

            {/* Design System Milestone Card */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <span className="font-semibold text-sm">Kohl Design System v1.2</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Added Input Field, Badge suite, and personality switcher.</p>
                </div>
                <Badge variant="editorial" size="sm" dot pulse>
                  Live
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/80">
                <Badge variant="default" size="sm">Pine Base</Badge>
                <Badge variant="secondary" size="sm">WCAG AAA</Badge>
                <Badge variant="success" size="sm">Zero Dependencies</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Design Engineering & Accessibility Specifications */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">6. Design Engineering & Accessibility Spec</h2>
            <p className="text-xs text-muted-foreground">
              Precision details ensuring badge indicators remain accessible, clean, and legible across all light and dark palettes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">WCAG 4.5:1+ Contrast Verification</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every badge color variant combines a gentle background tint with a deep, high-contrast foreground ink. In both light and midnight dark themes, text contrast exceeds 4.5:1 for guaranteed legibility.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Accessible Telemetry Dots</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Status dots carry <code className="font-mono text-xs text-foreground">aria-hidden="true"</code> to prevent screen readers from announcing decorative shapes. Status meaning is conveyed through the badge text label directly.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Subpixel Optical Alignment</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Badges use explicit line-height and centered flex geometry to prevent vertical jitter when placed inline next to headings, tables, or buttons. Icons and dots align with font ascenders and x-height.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Tactile Dismissal Hit Areas</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Remove triggers provide dedicated <code className="font-mono text-xs text-foreground">aria-label</code> tags, smooth opacity hover transitions, and keyboard focus rings (<code className="font-mono text-xs">focus-visible:ring-1</code>).
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>kohl.design · Design System v1.0</span>
          <div className="flex items-center gap-4">
            <Link href="/design-system" className="hover:text-foreground transition-colors">
              Component Index
            </Link>
            <Link href="/design-system/button" className="hover:text-foreground transition-colors">
              Button
            </Link>
            <Link href="/design-system/input" className="hover:text-foreground transition-colors">
              Input Field
            </Link>
            <Link href="/design-system/surfaces" className="hover:text-foreground transition-colors">
              Surfaces
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
