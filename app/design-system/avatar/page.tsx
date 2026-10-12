"use client";

import * as React from "react";
import {
  Copy,
  Check,
  CircleUser,
  Users,
  ShieldCheck,
  Sparkles,
  Layers,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
} from "@/components/ui/avatar";

export default function AvatarPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Playground state
  const [selectedSize, setSelectedSize] = React.useState<
    "xs" | "sm" | "default" | "lg" | "xl" | "2xl"
  >("default");
  const [selectedShape, setSelectedShape] = React.useState<"circle" | "square">("circle");
  const [selectedStatus, setSelectedStatus] = React.useState<
    "none" | "online" | "busy" | "away" | "offline"
  >("online");
  const [fallbackVariant, setFallbackVariant] = React.useState<
    "default" | "pine" | "crimson" | "neutral"
  >("pine");
  const [showImage, setShowImage] = React.useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const playgroundJsx = `<Avatar size="${selectedSize}" shape="${selectedShape}">
  ${
    showImage
      ? `<AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Sarah Connor" />\n  `
      : ""
  }<AvatarFallback variant="${fallbackVariant}">SC</AvatarFallback>${
    selectedStatus !== "none"
      ? `\n  <AvatarBadge status="${selectedStatus}" />`
      : ""
  }
</Avatar>`;

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Avatar
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Accessible user portrait and profile image container built on Radix UI. Handles loading lifecycles, graceful monogram initials, live telemetry status dots, and overlapping group stacks.
        </p>

        {/* Quick CLI command */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <div className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-1.5 text-foreground flex items-center gap-2">
            <span className="text-muted-foreground select-none">$</span>
            <code>npx shadcn@latest add https://kohl.design/r/avatar.json</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(
                "npx shadcn@latest add https://kohl.design/r/avatar.json",
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
            Configure sizes, shapes, presence badges, and fallback variations in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <Card variant="default" className="lg:col-span-5 p-5 space-y-5">
            <h3 className="text-sm font-semibold text-foreground border-b border-border/80 pb-2">
              Configuration Options
            </h3>

            {/* Size Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Optical Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["xs", "sm", "default", "lg", "xl", "2xl"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-2.5 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium border text-center transition-all cursor-pointer ${
                      selectedSize === s
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {s} ({s === "xs" ? "20px" : s === "sm" ? "28px" : s === "default" ? "36px" : s === "lg" ? "44px" : s === "xl" ? "56px" : "80px"})
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Geometry Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["circle", "square"] as const).map((sh) => (
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
                    {sh === "circle" ? "Circle (full)" : "Square (var(--radius))"}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Badge */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Telemetry Status Badge
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["none", "online", "busy", "away", "offline"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatus(st)}
                    className={`px-2 py-1 rounded-[var(--radius-sm)] text-xs font-medium border text-center transition-all cursor-pointer ${
                      selectedStatus === st
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {st.charAt(0).toUpperCase() + st.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Fallback Variant */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Fallback Initial Color
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["default", "pine", "crimson", "neutral"] as const).map((fb) => (
                  <button
                    key={fb}
                    type="button"
                    onClick={() => setFallbackVariant(fb)}
                    className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium border text-left transition-all cursor-pointer ${
                      fallbackVariant === fb
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {fb.charAt(0).toUpperCase() + fb.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Source Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <span className="text-xs font-medium text-foreground">Network image source</span>
              <button
                type="button"
                onClick={() => setShowImage(!showImage)}
                className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                  showImage
                    ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {showImage ? "Loaded Image" : "Trigger Fallback"}
              </button>
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
                  size="{selectedSize}" · shape="{selectedShape}"
                </Badge>
              </div>

              {/* Rendered Avatar Stage */}
              <div className="flex flex-col items-center justify-center p-8 rounded-[var(--radius)] bg-background/80 border border-border/60 space-y-4">
                <Avatar size={selectedSize} shape={selectedShape}>
                  {showImage && (
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Sarah Connor"
                    />
                  )}
                  <AvatarFallback variant={fallbackVariant}>SC</AvatarFallback>
                  {selectedStatus !== "none" && (
                    <AvatarBadge status={selectedStatus} />
                  )}
                </Avatar>

                <div className="text-center space-y-1">
                  <div className="font-sans font-medium text-sm text-foreground">
                    Sarah Connor
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    Staff Design Engineer · Nordic Studio
                  </div>
                </div>
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

      {/* Section 1: Optical Size Scale */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            1. Optical Size Scale
          </h2>
          <p className="text-sm text-muted-foreground">
            Six calibrated optical dimensions ranging from inline compact metadata chips (20px) to profile headers (80px).
          </p>
        </div>

        <Card variant="default" className="p-6">
          <div className="flex flex-wrap items-end gap-6 sm:gap-8">
            <div className="space-y-2 text-center">
              <Avatar size="xs">
                <AvatarFallback>XS</AvatarFallback>
              </Avatar>
              <div className="font-mono text-[11px] text-muted-foreground">xs (20px)</div>
            </div>

            <div className="space-y-2 text-center">
              <Avatar size="sm">
                <AvatarFallback variant="pine">SM</AvatarFallback>
              </Avatar>
              <div className="font-mono text-[11px] text-muted-foreground">sm (28px)</div>
            </div>

            <div className="space-y-2 text-center">
              <Avatar size="default">
                <AvatarFallback variant="crimson">DF</AvatarFallback>
              </Avatar>
              <div className="font-mono text-[11px] text-muted-foreground">default (36px)</div>
            </div>

            <div className="space-y-2 text-center">
              <Avatar size="lg">
                <AvatarFallback variant="pine">LG</AvatarFallback>
              </Avatar>
              <div className="font-mono text-[11px] text-muted-foreground">lg (44px)</div>
            </div>

            <div className="space-y-2 text-center">
              <Avatar size="xl">
                <AvatarFallback variant="neutral">XL</AvatarFallback>
              </Avatar>
              <div className="font-mono text-[11px] text-muted-foreground">xl (56px)</div>
            </div>

            <div className="space-y-2 text-center">
              <Avatar size="2xl">
                <AvatarFallback variant="pine">2X</AvatarFallback>
              </Avatar>
              <div className="font-mono text-[11px] text-muted-foreground">2xl (80px)</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Section 2: Telemetry Presence Badges */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            2. Telemetry Presence Badges
          </h2>
          <p className="text-sm text-muted-foreground">
            Status indicators equipped with 2px canvas background rings ensuring high definition against photographs and dark mode surfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="default" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Online / Available</h3>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Avatar size="default">
                <AvatarFallback variant="pine">HK</AvatarFallback>
                <AvatarBadge status="online" />
              </Avatar>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium text-foreground">Henrik Köhl</div>
                <div>Available for pairing</div>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Busy / In Meeting</h3>
              <Badge variant="destructive" size="sm">DND</Badge>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Avatar size="default">
                <AvatarFallback variant="crimson">EB</AvatarFallback>
                <AvatarBadge status="busy" />
              </Avatar>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium text-foreground">Elena Berg</div>
                <div>In Design Review</div>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Away / Inactive</h3>
              <Badge variant="warning" size="sm">Away</Badge>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Avatar size="default">
                <AvatarFallback variant="neutral">ML</AvatarFallback>
                <AvatarBadge status="away" />
              </Avatar>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium text-foreground">Marcus Lind</div>
                <div>Last seen 15m ago</div>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Offline</h3>
              <Badge variant="secondary" size="sm">Offline</Badge>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Avatar size="default">
                <AvatarFallback>SN</AvatarFallback>
                <AvatarBadge status="offline" />
              </Avatar>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium text-foreground">Sofia Nilsson</div>
                <div>Offline</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 3: Overlapping AvatarGroup Stacks */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            3. Overlapping AvatarGroup Stacks
          </h2>
          <p className="text-sm text-muted-foreground">
            Team and contributor clusters with automatic negative spacing, border-background masks, and overflow counters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Project Collaborators</h3>
              <span className="text-xs font-mono text-muted-foreground">max={4}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When collaborator lists exceed the maximum threshold, an accessible numerical badge calculates the remainder automatically.
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border flex items-center justify-between">
              <AvatarGroup max={4}>
                <Avatar size="default">
                  <AvatarFallback variant="pine">HK</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarFallback variant="crimson">EB</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarFallback variant="neutral">ML</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarFallback variant="pine">SN</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarFallback>TB</AvatarFallback>
                </Avatar>
              </AvatarGroup>

              <span className="text-xs text-muted-foreground">6 Team Members</span>
            </div>
          </Card>

          <Card variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Concentric Squircle Group</h3>
              <Badge variant="outline" size="sm">shape="square"</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Consumes <code className="font-mono text-xs">shape="square"</code> to produce concentric soft-corner profiles that harmonize with card silhouettes.
            </p>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 border border-border flex items-center justify-between">
              <AvatarGroup max={3}>
                <Avatar size="default" shape="square">
                  <AvatarFallback variant="pine">AD</AvatarFallback>
                </Avatar>
                <Avatar size="default" shape="square">
                  <AvatarFallback variant="crimson">CP</AvatarFallback>
                </Avatar>
                <Avatar size="default" shape="square">
                  <AvatarFallback variant="neutral">UX</AvatarFallback>
                </Avatar>
                <Avatar size="default" shape="square">
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
              </AvatarGroup>

              <span className="text-xs text-muted-foreground">Squad Leads</span>
            </div>
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
            Strict engineering standards for image loading failure resilience, fallback initial parsing, and contrast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              Radix Lifecycle Fallback Engine
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Avatar delays rendering fallback briefly to prevent flash of initial unstyled content while images load, then falls back seamlessly with zero layout reflow if an asset fails.
            </p>
          </Card>

          <Card variant="default" className="p-6 space-y-3">
            <span className="font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              Mandatory Alt Text Guarantee
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always pass descriptive <code className="font-mono text-xs">alt="[Person Name]"</code> to <code className="font-mono text-xs">AvatarImage</code>. Screen readers announce the user identity rather than raw filename strings.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
