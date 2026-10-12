"use client";

import * as React from "react";
import {
  Copy,
  Check,
  PanelTop,
  Keyboard,
  Layers,
  Sparkles,
  ShieldCheck,
  Settings,
  User,
  Bell,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function TabsPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<"default" | "underline" | "pills">("default");
  const [selectedSize, setSelectedSize] = React.useState<"xs" | "sm" | "default" | "lg" | "xl">("default");
  const [activeTab, setActiveTab] = React.useState("overview");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const playgroundJsx = `<Tabs defaultValue="${activeTab}" className="space-y-4">
  <TabsList variant="${selectedVariant}" size="${selectedSize}">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="deployments">Deployments</TabsTrigger>
    <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card variant="default" className="p-4 text-xs">
      Active workspace overview and configuration.
    </Card>
  </TabsContent>
  <TabsContent value="deployments">
    <Card variant="default" className="p-4 text-xs">
      Deployment logs and release pipeline traces.
    </Card>
  </TabsContent>
  <TabsContent value="telemetry">
    <Card variant="default" className="p-4 text-xs">
      Latency traces and CPU utilization metrics.
    </Card>
  </TabsContent>
</Tabs>`;

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Tabs
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Accessible tabbed interface component built on Radix UI primitives. Supports segmented pill controls, editorial border-b underline tabs, and standalone filter chips with full keyboard arrow navigation.
        </p>

        {/* Quick CLI command */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <div className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-1.5 text-foreground flex items-center gap-2">
            <span className="text-muted-foreground select-none">$</span>
            <code>npx shadcn@latest add https://kohl.design/r/tabs.json</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(
                "npx shadcn@latest add https://kohl.design/r/tabs.json",
                "cli"
              )
            }
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            {copiedCode === "cli" ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            <span>{copiedCode === "cli" ? "Copied" : "Copy command"}</span>
          </Button>
        </div>
      </section>

      {/* Interactive Playground */}
      <section className="space-y-4">
        <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
          Interactive Playground
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Panel */}
          <Card variant="default" className="lg:col-span-4 p-5 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Variant</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["default", "underline", "pills"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`rounded-[var(--radius-sm)] border py-1.5 px-2 text-xs font-medium capitalize transition-all cursor-pointer ${
                      selectedVariant === v
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Size</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-[var(--radius-sm)] border py-1.5 px-2 text-xs font-medium capitalize transition-all cursor-pointer ${
                      selectedSize === s
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <Keyboard className="size-3.5 text-primary" />
                <span>Keyboard Nav</span>
              </div>
              <p className="leading-relaxed">
                Use <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">←</kbd> and{" "}
                <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">→</kbd> arrow keys to switch tabs with automatic focus.
              </p>
            </div>
          </Card>

          {/* Live Preview Panel */}
          <Card variant="default" className="lg:col-span-8 p-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-medium text-muted-foreground">Live Component</span>
              <div className="rounded-[var(--radius)] border border-border bg-background/80 p-6 min-h-[200px]">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-4"
                >
                  <TabsList variant={selectedVariant} size={selectedSize}>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="deployments">Deployments</TabsTrigger>
                    <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <Card variant="sunken" className="p-4 space-y-2 text-xs">
                      <div className="font-semibold text-foreground">Production Cluster: eu-west-1</div>
                      <p className="text-muted-foreground">
                        Active release v1.4.2 running across 6 microservice worker nodes with zero error rate.
                      </p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="deployments">
                    <Card variant="sunken" className="p-4 space-y-2 text-xs">
                      <div className="font-semibold text-foreground">Deployment Pipeline</div>
                      <p className="text-muted-foreground">
                        Last deployment initiated 24 minutes ago by @henrik. Build time: 1m 24s.
                      </p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="telemetry">
                    <Card variant="sunken" className="p-4 space-y-2 text-xs">
                      <div className="font-semibold text-foreground">Trace Latency</div>
                      <p className="text-muted-foreground">
                        P95 latency is 18ms across all HTTP incoming requests over the past 6 hours.
                      </p>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Generated Code */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">Code Snippet</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(playgroundJsx, "code")}
                  className="h-7 px-2 text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  {copiedCode === "code" ? (
                    <Check className="size-3 text-emerald-500" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  <span>{copiedCode === "code" ? "Copied" : "Copy JSX"}</span>
                </Button>
              </div>
              <pre className="rounded-[var(--radius-sm)] border border-border bg-muted/60 p-3 font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
                {playgroundJsx}
              </pre>
            </div>
          </Card>
        </div>
      </section>

      {/* 3 Core Variants */}
      <section className="space-y-6">
        <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
          Variants & Design Roles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Variant 1: Default Segmented */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-cooper text-base text-foreground">Segmented Control</h3>
                <Badge variant="default" size="sm">default</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Recessed well (Level 3 well token) with elevated active pill for primary view switching.
              </p>
            </div>
            <div className="p-3 rounded-[var(--radius-sm)] bg-background border border-border">
              <Tabs defaultValue="grid" className="w-full">
                <TabsList variant="default" className="w-full">
                  <TabsTrigger value="grid" className="flex-1">Grid</TabsTrigger>
                  <TabsTrigger value="list" className="flex-1">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>

          {/* Variant 2: Underline */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-cooper text-base text-foreground">Editorial Underline</h3>
                <Badge variant="secondary" size="sm">underline</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Horizontal border-bottom line with primary color indicator bar. Ideal for page sections.
              </p>
            </div>
            <div className="p-3 rounded-[var(--radius-sm)] bg-background border border-border">
              <Tabs defaultValue="general" className="w-full">
                <TabsList variant="underline" className="w-full">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>

          {/* Variant 3: Pills */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-cooper text-base text-foreground">Filter Chips</h3>
                <Badge variant="editorial" size="sm">pills</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Standalone rounded-full filter chips with solid primary active fill for filter rows.
              </p>
            </div>
            <div className="p-3 rounded-[var(--radius-sm)] bg-background border border-border">
              <Tabs defaultValue="all" className="w-full">
                <TabsList variant="pills" className="w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>
        </div>
      </section>

      {/* Keyboard & Accessibility */}
      <section className="space-y-4">
        <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
          Keyboard & Accessibility
        </h2>

        <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <ShieldCheck className="size-4" />
            <span>WAI-ARIA Tabs Pattern Compliance</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
            <div className="space-y-2">
              <div className="font-semibold text-foreground">Keyboard Interactions</div>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><strong className="text-foreground">Left / Right Arrow:</strong> Moves focus to the previous or next tab and activates it automatically.</li>
                <li><strong className="text-foreground">Home / End:</strong> Moves focus directly to the first or last available tab.</li>
                <li><strong className="text-foreground">Tab:</strong> Moves focus into the active tab panel.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-foreground">ARIA Roles & Attributes</div>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><code className="text-foreground font-mono bg-muted px-1 rounded">role="tablist"</code> on TabsList container.</li>
                <li><code className="text-foreground font-mono bg-muted px-1 rounded">role="tab"</code> and <code className="text-foreground font-mono bg-muted px-1 rounded">aria-selected</code> on each TabsTrigger.</li>
                <li><code className="text-foreground font-mono bg-muted px-1 rounded">role="tabpanel"</code> on each active TabsContent panel.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
