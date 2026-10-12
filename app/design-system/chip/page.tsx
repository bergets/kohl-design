"use client";

import * as React from "react";
import {
  Copy,
  Check,
  Tag,
  SlidersHorizontal,
  X,
  Plus,
  Sparkles,
  ShieldCheck,
  Layers,
  Filter,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChipPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<
    "default" | "outline" | "primary" | "editorial" | "secondary"
  >("default");
  const [selectedSize, setSelectedSize] = React.useState<
    "xs" | "sm" | "default" | "lg" | "xl"
  >("default");
  const [selectedShape, setSelectedShape] = React.useState<"pill" | "rounded">(
    "pill"
  );
  const [showCheckmark, setShowCheckmark] = React.useState(true);
  const [isDismissible, setIsDismissible] = React.useState(true);
  const [isPlaygroundSelected, setIsPlaygroundSelected] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);

  // Interactive filters state
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([
    "design",
    "engineering",
  ]);

  // Interactive tag removal state
  const [tags, setTags] = React.useState<string[]>([
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Radix UI",
  ]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const resetTags = () => {
    setTags(["Next.js", "TypeScript", "Tailwind CSS", "Radix UI"]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const playgroundJsx = `<Chip
  variant="${selectedVariant}"
  size="${selectedSize}"
  shape="${selectedShape}"
  selected={${isPlaygroundSelected}}
  onSelectedChange={(sel) => setSelected(sel)}${
    showCheckmark ? "\n  showCheckmark" : ""
  }${
    isDismissible
      ? `\n  onRemove={() => handleRemove()}`
      : ""
  }${isDisabled ? "\n  disabled" : ""}
>
  Design System
</Chip>`;

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Chip
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Interactive, selectable, and dismissible compact control designed for filtering, tag entry, and multi-selection matrices. Pairs checkmark state indicators with keyboard-accessible deletion.
        </p>

        {/* Quick CLI command */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <div className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-1.5 text-foreground flex items-center gap-2">
            <span className="text-muted-foreground select-none">$</span>
            <code>npx shadcn@latest add https://kohl.design/r/chip.json</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(
                "npx shadcn@latest add https://kohl.design/r/chip.json",
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
            Toggle variants, shapes, sizes, checkmark animations, and dismissal actions.
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
                {(["default", "outline", "primary", "editorial", "secondary"] as const).map((v) => (
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
                    {s === "xs" ? "xs (24px)" : s === "sm" ? "sm (28px)" : s === "default" ? "default (32px)" : s === "lg" ? "lg (36px)" : "xl (40px)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Corner Geometry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["pill", "rounded"] as const).map((sh) => (
                  <button
                    key={sh}
                    type="button"
                    onClick={() => setSelectedShape(sh)}
                    className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium border text-center transition-all cursor-pointer ${
                      selectedShape === sh
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {sh === "pill" ? "Pill (full)" : "Rounded (var(--radius-sm))"}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Show animated checkmark</span>
                <button
                  type="button"
                  onClick={() => setShowCheckmark(!showCheckmark)}
                  className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                    showCheckmark ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {showCheckmark ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Dismissible trailing X</span>
                <button
                  type="button"
                  onClick={() => setIsDismissible(!isDismissible)}
                  className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                    isDismissible ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {isDismissible ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Disabled state</span>
                <button
                  type="button"
                  onClick={() => setIsDisabled(!isDisabled)}
                  className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                    isDisabled ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {isDisabled ? "Disabled" : "Active"}
                </button>
              </div>
            </div>
          </Card>

          {/* Live Preview Column */}
          <Card variant="sunken" className="lg:col-span-7 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                  Live Interactive Stage
                </span>
                <Badge variant="outline" size="sm">
                  variant="{selectedVariant}" · size="{selectedSize}"
                </Badge>
              </div>

              {/* Main Interactive Chip */}
              <div className="flex flex-col items-center justify-center p-8 rounded-[var(--radius)] bg-background/80 border border-border/60 space-y-4">
                <Chip
                  variant={selectedVariant}
                  size={selectedSize}
                  shape={selectedShape}
                  selected={isPlaygroundSelected}
                  onSelectedChange={setIsPlaygroundSelected}
                  showCheckmark={showCheckmark}
                  onRemove={isDismissible ? () => setIsPlaygroundSelected(false) : undefined}
                  disabled={isDisabled}
                >
                  Design Engineering
                </Chip>

                <p className="text-xs text-muted-foreground">
                  Click to toggle selection. Click trailing X or press Backspace to dismiss.
                </p>
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

      {/* Section 1: Interactive Selection & Filter Chips */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            1. Multi-Select Filter Matrices
          </h2>
          <p className="text-sm text-muted-foreground">
            Selectable filter matrices that provide instant visual verification via animated checkmark icons and primary surface fills.
          </p>
        </div>

        <Card variant="default" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Department & Skill Category Filters
            </h3>
            <span className="text-xs font-mono text-muted-foreground">
              {selectedCategories.length} selected
            </span>
          </div>

          <ChipGroup>
            {[
              { id: "design", label: "Product Design" },
              { id: "engineering", label: "Frontend Engineering" },
              { id: "systems", label: "Design Systems" },
              { id: "accessibility", label: "Accessibility (a11y)" },
              { id: "typography", label: "Typography" },
            ].map((cat) => (
              <Chip
                key={cat.id}
                variant="default"
                selected={selectedCategories.includes(cat.id)}
                onSelectedChange={() => toggleCategory(cat.id)}
                showCheckmark
              >
                {cat.label}
              </Chip>
            ))}
          </ChipGroup>
        </Card>
      </section>

      {/* Section 2: Dismissible Tags & Tokens */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            2. Dismissible Tags & Tokens
          </h2>
          <p className="text-sm text-muted-foreground">
            Removable tags equipped with trailing dismissal buttons and Backspace / Delete keyboard shortcuts.
          </p>
        </div>

        <Card variant="default" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Active Project Tech Stack
            </h3>
            {tags.length < 4 && (
              <Button size="sm" variant="outline" onClick={resetTags} className="gap-1.5">
                <Plus className="size-3" />
                <span>Reset Tags</span>
              </Button>
            )}
          </div>

          <ChipGroup>
            {tags.map((tag) => (
              <Chip
                key={tag}
                variant="outline"
                onRemove={() => removeTag(tag)}
                removeLabel={`Remove ${tag}`}
              >
                {tag}
              </Chip>
            ))}
            {tags.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                All tags removed. Click "Reset Tags" above to restore.
              </p>
            )}
          </ChipGroup>
        </Card>
      </section>

      {/* Section 3: Leading Avatars & Icons */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            3. Leading Avatars & Presence Chips
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose Chips directly with Avatars to render compact interactive assignee chips and collaborator pills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Assignee Selection Chips</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Leading avatars visually identify team members within compact filter pills and issue boards.
            </p>
            <ChipGroup>
              <Chip
                variant="outline"
                leadingIcon={
                  <Avatar size="xs" className="mr-0.5">
                    <AvatarFallback variant="pine">HK</AvatarFallback>
                  </Avatar>
                }
              >
                Henrik Köhl
              </Chip>
              <Chip
                variant="outline"
                selected
                leadingIcon={
                  <Avatar size="xs" className="mr-0.5">
                    <AvatarFallback variant="crimson">EB</AvatarFallback>
                  </Avatar>
                }
              >
                Elena Berg
              </Chip>
              <Chip
                variant="outline"
                leadingIcon={
                  <Avatar size="xs" className="mr-0.5">
                    <AvatarFallback variant="neutral">SN</AvatarFallback>
                  </Avatar>
                }
              >
                Sofia Nilsson
              </Chip>
            </ChipGroup>
          </Card>

          <Card variant="default" className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Editorial Category Chips</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Consumes <code className="font-mono text-xs">variant="editorial"</code> with leading brand icons for publication taxonomies.
            </p>
            <ChipGroup>
              <Chip
                variant="editorial"
                selected
                leadingIcon={<Sparkles className="size-3 text-crimson-600 dark:text-crimson-400" />}
              >
                Featured Story
              </Chip>
              <Chip
                variant="editorial"
                leadingIcon={<Tag className="size-3" />}
              >
                Architecture
              </Chip>
              <Chip
                variant="editorial"
                leadingIcon={<Filter className="size-3" />}
              >
                Interviews
              </Chip>
            </ChipGroup>
          </Card>
        </div>
      </section>

      {/* Section 4: Design Engineering & Accessibility Spec */}
      <section className="space-y-6 pb-12">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            4. Design Engineering & Accessibility Spec
          </h2>
          <p className="text-sm text-muted-foreground">
            ARIA semantics, keyboard ergonomics, and difference between static Badges and interactive Chips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              Dynamic ARIA Roles (Checkbox vs Button)
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When selectable, <code className="font-mono text-xs">Chip</code> binds <code className="font-mono text-xs">role="checkbox"</code> and <code className="font-mono text-xs">aria-checked</code>. When used for single actions or dismissals, it binds <code className="font-mono text-xs">role="button"</code>.
            </p>
          </Card>

          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              Keyboard Dismissal Ergonomics
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dismissible chips intercept <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono text-[10px]">Backspace</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono text-[10px]">Delete</kbd>, providing swift and natural tag removal without requiring mouse precision.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
