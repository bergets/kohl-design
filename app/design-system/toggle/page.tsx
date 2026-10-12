"use client";

import * as React from "react";
import {
  Copy,
  Check,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bookmark,
  Pin,
  Star,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  List,
  Grid,
  ShieldCheck,
  Sparkles,
  Keyboard,
  Layers,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function TogglePage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<
    "default" | "outline" | "primary" | "editorial"
  >("default");
  const [selectedSize, setSelectedSize] = React.useState<
    "xs" | "sm" | "default" | "lg" | "xl"
  >("default");
  const [isDisabled, setIsDisabled] = React.useState(false);

  // Live interactive controls state
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isPinned, setIsPinned] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);
  const [alignment, setAlignment] = React.useState<string>("left");
  const [viewMode, setViewMode] = React.useState<string>("list");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const playgroundJsx = `// Standalone Toggle
<Toggle
  aria-label="Toggle pin"
  variant="${selectedVariant}"
  size="${selectedSize}"${isDisabled ? "\n  disabled" : ""}
>
  <Pin className="size-3.5" />
</Toggle>

// Toggle Group (Multi-select)
<ToggleGroup
  type="multiple"
  variant="${selectedVariant}"
  size="${selectedSize}"${isDisabled ? "\n  disabled" : ""}
>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="size-3.5" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="size-3.5" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="size-3.5" />
  </ToggleGroupItem>
</ToggleGroup>`;

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Toggle & Toggle Group
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Accessible two-state button and group primitives built on Radix UI. Supports standalone toggles, single-select exclusive groups, and multi-select option clusters with keyboard roving focus and brand-tinted surfaces.
        </p>

        {/* Quick CLI command */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <div className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-1.5 text-foreground flex items-center gap-2">
            <span className="text-muted-foreground select-none">$</span>
            <code>npx shadcn@latest add https://kohl.design/r/toggle.json https://kohl.design/r/toggle-group.json</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(
                "npx shadcn@latest add https://kohl.design/r/toggle.json https://kohl.design/r/toggle-group.json",
                "cli-install"
              )
            }
            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {copiedCode === "cli-install" ? (
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span className="sr-only">Copy installation command</span>
          </Button>
        </div>
      </section>

      {/* Interactive Component Playground */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            Interactive Component Playground
          </h2>
          <p className="text-xs text-muted-foreground">
            Test toggle variants, sizes, states, and group behaviors in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <Card variant="default" className="lg:col-span-5 p-5 space-y-5">
            <h3 className="text-sm font-semibold text-foreground border-b border-border/80 pb-2">
              Configuration Options
            </h3>

            {/* Variant Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Visual Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["default", "outline", "primary", "editorial"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium border text-left transition-all cursor-pointer ${
                      selectedVariant === v
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Optical Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-2 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium border text-center transition-all cursor-pointer ${
                      selectedSize === s
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {s === "xs" ? "xs (28px)" : s === "sm" ? "sm (32px)" : s === "default" ? "default (36px)" : s === "lg" ? "lg (40px)" : "xl (48px)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Disabled State Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <span className="text-xs font-medium text-foreground">Disabled state</span>
              <Toggle
                pressed={isDisabled}
                onPressedChange={setIsDisabled}
                size="sm"
                variant="outline"
                aria-label="Toggle disabled state"
              >
                {isDisabled ? "Disabled" : "Active"}
              </Toggle>
            </div>
          </Card>

          {/* Live Preview Column */}
          <Card variant="sunken" className="lg:col-span-7 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                  Live Preview
                </span>
                <Badge variant="outline" size="sm">
                  variant="{selectedVariant}" · size="{selectedSize}"
                </Badge>
              </div>

              {/* Playground Item 1: Standalone Toggles */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  Standalone Icon Toggles
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Toggle
                    variant={selectedVariant}
                    size={selectedSize}
                    pressed={isBookmarked}
                    onPressedChange={setIsBookmarked}
                    disabled={isDisabled}
                    aria-label="Bookmark"
                  >
                    <Bookmark className="size-3.5" />
                    <span>Bookmark</span>
                  </Toggle>

                  <Toggle
                    variant={selectedVariant}
                    size={selectedSize}
                    pressed={isPinned}
                    onPressedChange={setIsPinned}
                    disabled={isDisabled}
                    aria-label="Pin item"
                  >
                    <Pin className="size-3.5" />
                  </Toggle>

                  <Toggle
                    variant={selectedVariant}
                    size={selectedSize}
                    pressed={isMuted}
                    onPressedChange={setIsMuted}
                    disabled={isDisabled}
                    aria-label="Mute audio"
                  >
                    {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                  </Toggle>
                </div>
              </div>

              {/* Playground Item 2: Multi-select Toggle Group */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  Multi-Select Group (Text Formatting)
                </span>
                <ToggleGroup
                  type="multiple"
                  value={formatting}
                  onValueChange={setFormatting}
                  variant={selectedVariant}
                  size={selectedSize}
                  disabled={isDisabled}
                >
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Bold className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Toggle underline">
                    <Underline className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                    <Strikethrough className="size-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Playground Item 3: Single-select Toggle Group */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  Single-Select Group (Text Alignment)
                </span>
                <ToggleGroup
                  type="single"
                  value={alignment}
                  onValueChange={(val) => val && setAlignment(val)}
                  variant={selectedVariant}
                  size={selectedSize}
                  disabled={isDisabled}
                >
                  <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="justify" aria-label="Align justify">
                    <AlignJustify className="size-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Generated Code Snippet */}
            <div className="rounded-[var(--radius-sm)] bg-neutral-900 text-neutral-100 p-4 space-y-2 font-mono text-xs shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800 text-[11px]">
                <span>Component Snippet</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(playgroundJsx, "playground-code")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode === "playground-code" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-neutral-300 leading-relaxed overflow-x-auto text-[11px]">
                {playgroundJsx}
              </pre>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 1: Single Toggle Buttons */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            1. Standalone Two-State Buttons
          </h2>
          <p className="text-sm text-muted-foreground">
            Independent controls representing a binary on/off state like pins, bookmarks, stars, or microphone mute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="default" className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Bookmark / Favorite</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Maintains independent pressed state. When toggled, emits state changes without form submissions.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <Toggle aria-label="Save bookmark" variant="outline">
                <Bookmark className="size-3.5" />
                <span>Save</span>
              </Toggle>
              <Toggle aria-label="Star item" variant="outline" defaultPressed>
                <Star className="size-3.5" />
              </Toggle>
            </div>
          </Card>

          <Card variant="default" className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Audio / Microphone Mute</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Provides direct visual and tactile feedback for live device telemetry and recording states.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <Toggle aria-label="Toggle microphone" variant="default" defaultPressed>
                <Mic className="size-3.5" />
                <span>Mic on</span>
              </Toggle>
              <Toggle aria-label="Mute audio" variant="default">
                <Volume2 className="size-3.5" />
              </Toggle>
            </div>
          </Card>

          <Card variant="default" className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Pinned Filters</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Uses the brand primary or editorial variant to highlight prominent persistent filters.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <Toggle aria-label="Pin view" variant="primary" defaultPressed>
                <Pin className="size-3.5" />
                <span>Pinned</span>
              </Toggle>
              <Toggle aria-label="Editorial filter" variant="editorial" defaultPressed>
                <Sparkles className="size-3.5" />
                <span>Featured</span>
              </Toggle>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 2: Multi-Select Toggle Groups */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            2. Multi-Select Toggle Groups
          </h2>
          <p className="text-sm text-muted-foreground">
            Allow users to activate multiple non-exclusive options simultaneously, such as rich text formatting or filter tag matrices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Rich Text Editor Toolbar</h3>
              <Badge variant="outline" size="sm">type="multiple"</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Users can combine bold, italic, underline, and strikethrough in any combination. Roving keyboard arrow keys preserve natural typing flow.
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border flex items-center justify-between">
              <ToggleGroup type="multiple" defaultValue={["bold", "italic"]} variant="default">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <Underline className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                  <Strikethrough className="size-3.5" />
                </ToggleGroupItem>
              </ToggleGroup>

              <span className="text-[11px] font-mono text-muted-foreground">
                2 active
              </span>
            </div>
          </Card>

          <Card variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Editorial Filter Cluster</h3>
              <Badge variant="editorial" size="sm">variant="editorial"</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Consumes the warm Bookplate Crimson wash in Pine mode, or Cashmere Rose in Blush mode for editorial filtering.
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border">
              <ToggleGroup type="multiple" defaultValue={["nordic", "case-study"]} variant="editorial">
                <ToggleGroupItem value="nordic">Nordic HR</ToggleGroupItem>
                <ToggleGroupItem value="case-study">Case Studies</ToggleGroupItem>
                <ToggleGroupItem value="design-system">Design System</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 3: Single-Select Toggle Groups */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            3. Single-Select Segmented Choices
          </h2>
          <p className="text-sm text-muted-foreground">
            Mutually exclusive selections where only one item can be active at a time, functioning like a radio group with toolbar visual styling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">View Layout Selector</h3>
              <Badge variant="outline" size="sm">type="single"</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Switches between list and grid views. Activating an item deactivates the previously selected choice automatically.
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border flex items-center justify-between">
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(val) => val && setViewMode(val)}
                variant="outline"
              >
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="size-3.5" />
                  <span>List</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid className="size-3.5" />
                  <span>Grid</span>
                </ToggleGroupItem>
              </ToggleGroup>

              <span className="text-[11px] font-mono text-muted-foreground">
                Active: {viewMode}
              </span>
            </div>
          </Card>

          <Card variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Primary Brand Segment</h3>
              <Badge variant="default" size="sm">variant="primary"</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fills the active choice with solid brand color (Forest Pine in Pine mode, Cashmere Blush in Blush mode).
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border">
              <ToggleGroup type="single" defaultValue="daily" variant="primary">
                <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
                <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
                <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 4: Brand Inks & Geometry */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            4. Brand Inks & Geometry
          </h2>
          <p className="text-sm text-muted-foreground">
            Toggles inherit theme radius variables (<code className="font-mono text-xs">var(--radius-sm)</code>) and dynamically adapt to Pine and Blush palettes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" /> Pine Forest Mode
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When Pine mode is active, <code className="font-mono">variant="primary"</code> produces deep Pine Green fills (<code className="font-mono">#005243</code>) with crisp white text.
            </p>
            <div className="pt-2">
              <Toggle variant="primary" defaultPressed>
                <span>Pine Active</span>
              </Toggle>
            </div>
          </Card>

          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-accent flex items-center gap-1.5">
              <Sparkles className="size-4" /> Cashmere Blush Mode
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When Blush mode is active, <code className="font-mono">variant="primary"</code> produces soft Cashmere Blush pink (<code className="font-mono">#FCD3D6</code>) with deep velvet wine noir text.
            </p>
            <div className="pt-2">
              <Toggle variant="primary" defaultPressed>
                <span>Blush Active</span>
              </Toggle>
            </div>
          </Card>

          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              <Layers className="size-4" /> Concentric Radii
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Toggles consume <code className="font-mono">var(--radius-sm)</code> (2px smaller than parent cards), ensuring perfectly parallel concentric curves when nested inside card headers.
            </p>
            <div className="pt-2 font-mono text-[11px] text-muted-foreground">
              calc(var(--radius) - 2px)
            </div>
          </Card>
        </div>
      </section>

      {/* Section 5: Real-World Compositions */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            5. Real-World Compositions
          </h2>
          <p className="text-sm text-muted-foreground">
            Practical application patterns combining toggles with other Kohl Design components.
          </p>
        </div>

        <Card variant="default" className="p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-foreground">
                Document Formatting Station
              </h3>
              <p className="text-xs text-muted-foreground">
                Integrated toolbar with text styling, alignments, and action buttons.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" size="sm">Draft v1.4</Badge>
              <Button size="sm" variant="default">Save Changes</Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-muted/30 border border-border">
            {/* Formatting Group */}
            <ToggleGroup type="multiple" defaultValue={["bold"]} variant="outline" size="sm">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="size-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="h-4 w-px bg-border" />

            {/* Alignment Group */}
            <ToggleGroup type="single" defaultValue="left" variant="outline" size="sm">
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="size-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="h-4 w-px bg-border" />

            {/* Standalone Star & Bookmark */}
            <div className="flex items-center gap-1.5 ml-auto">
              <Toggle size="sm" variant="outline" aria-label="Favorite">
                <Star className="size-3.5" />
              </Toggle>
              <Toggle size="sm" variant="outline" defaultPressed aria-label="Bookmark">
                <Bookmark className="size-3.5" />
              </Toggle>
            </div>
          </div>
        </Card>
      </section>

      {/* Section 6: Design Engineering & Accessibility Spec */}
      <section className="space-y-6 pb-12">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            6. Design Engineering & Accessibility Spec
          </h2>
          <p className="text-sm text-muted-foreground">
            Strict engineering guidelines, ARIA attributes, and keyboard ergonomics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              W3C ARIA Standard Compliance
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standalone <code className="font-mono text-xs">Toggle</code> automatically binds <code className="font-mono text-xs">aria-pressed="true|false"</code>. In <code className="font-mono text-xs">ToggleGroup</code>, the root container binds <code className="font-mono text-xs">role="group"</code> and children bind <code className="font-mono text-xs">aria-checked</code>.
            </p>
          </Card>

          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <Keyboard className="size-4 text-emerald-600 dark:text-emerald-400" />
              Keyboard Navigation & Roving Focus
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Inside a <code className="font-mono text-xs">ToggleGroup</code>, users navigate with <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono text-[10px]">ArrowLeft</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono text-[10px]">ArrowRight</kbd>. Space or Enter activates the selection without tabbing through every item.
            </p>
          </Card>

          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              Mandatory Icon Accessibility
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Icon-only toggles must always provide an <code className="font-mono text-xs">aria-label</code> describing the action (e.g. <code className="font-mono text-xs">aria-label="Toggle bold"</code>). Screen readers will announce both the name and current state.
            </p>
          </Card>

          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              Zero Layout Shift & Optical Sizing
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Toggle states change background and text tokens without modifying border width or font weight dimensions, ensuring zero pixel layout shifting during rapid state toggles.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
