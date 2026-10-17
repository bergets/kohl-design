"use client";

import * as React from "react";
import {
  Copy,
  Check,
  AppWindow,
  Search,
  Bell,
  Settings,
  Baby,
  ChevronDown,
  Sparkles,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandFlower } from "@/components/BrandFlower";
import { Icon } from "@/components/ui/icon";
import {
  AppBar,
  AppBarContainer,
  AppBarLeading,
  AppBarTitle,
  AppBarContextPill,
  AppBarActions,
  AppBarAvatarTrigger,
} from "@/components/ui/app-bar";

export default function AppBarPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [variant, setVariant] = React.useState<"default" | "glass" | "plain">("default");
  const [status, setStatus] = React.useState<"online" | "syncing" | "offline">("online");
  const [activeProfile, setActiveProfile] = React.useState<string>("Astrid");
  const [pillOpen, setPillOpen] = React.useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          App Bar
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Compact, responsive top navigation header built for mobile viewports and modern dashboards. Incorporates safe-area insets, frosted glass backdrops, context switcher pills, and avatar triggers with real-time connectivity and sync status telemetry.
        </p>

        {/* Quick CLI command */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <div className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-1.5 text-foreground flex items-center gap-2">
            <span className="text-muted-foreground select-none">$</span>
            <code>npx shadcn@latest add https://kohl.design/r/app-bar.json</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(
                "npx shadcn@latest add https://kohl.design/r/app-bar.json",
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

      {/* Interactive Live Preview */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
              Live Preview
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Simulated mobile viewport running the AppBar component.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-border p-1 bg-muted/30">
              <span className="text-[11px] text-muted-foreground px-1.5 font-medium">Variant:</span>
              <Button
                variant={variant === "default" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setVariant("default")}
              >
                Default
              </Button>
              <Button
                variant={variant === "glass" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setVariant("glass")}
              >
                Glass
              </Button>
              <Button
                variant={variant === "plain" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setVariant("plain")}
              >
                Plain
              </Button>
            </div>

            <div className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-border p-1 bg-muted/30">
              <span className="text-[11px] text-muted-foreground px-1.5 font-medium">Status:</span>
              <Button
                variant={status === "online" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setStatus("online")}
              >
                Online
              </Button>
              <Button
                variant={status === "syncing" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setStatus("syncing")}
              >
                Syncing
              </Button>
              <Button
                variant={status === "offline" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setStatus("offline")}
              >
                Offline
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Simulated Mobile Device Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-[2.5rem] border-4 border-neutral-800/80 dark:border-neutral-700 shadow-2xl overflow-hidden bg-background flex flex-col h-[520px] relative">
              {/* Top Notch / Dynamic Island Simulation */}
              <div className="w-full flex justify-center pt-2 pb-1 bg-sidebar/95 z-50">
                <div className="w-24 h-4 bg-foreground/15 rounded-full" />
              </div>

              {/* The AppBar itself */}
              <AppBar
                position="static"
                variant={variant}
                responsive={false}
                safeArea={false}
                className="border-b"
              >
                <AppBarContainer maxWidth="full">
                  {/* Left: Brand Emblem + Context Selector Pill */}
                  <AppBarLeading>
                    <button
                      type="button"
                      className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full cursor-pointer"
                      title="Home"
                    >
                      <BrandFlower className="size-7 text-emblem shrink-0 transition-transform active:scale-95" />
                    </button>

                    <div className="relative">
                      <AppBarContextPill
                        avatar={
                          <span className="flex size-5 shrink-0 aspect-square items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold leading-none">
                            {activeProfile[0]}
                          </span>
                        }
                        label={activeProfile}
                        isOpen={pillOpen}
                        onClick={() => setPillOpen(!pillOpen)}
                      />

                      {/* Mock Dropdown */}
                      {pillOpen && (
                        <div className="absolute left-0 mt-2 w-48 rounded-[var(--radius)] border border-border bg-card p-1 shadow-xl z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                          <div className="px-2.5 py-1 text-[10px] text-muted-foreground font-semibold">
                            Select profile
                          </div>
                          {["Astrid", "Oliver", "All profiles"].map((name) => (
                            <button
                              key={name}
                              type="button"
                              onClick={() => {
                                setActiveProfile(name);
                                setPillOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-xs)] text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
                            >
                              <span>{name}</span>
                              {activeProfile === name && (
                                <Check className="size-3 text-accent" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </AppBarLeading>

                  {/* Right: Actions & User Avatar */}
                  <AppBarActions>
                    <AppBarAvatarTrigger
                      status={status}
                      initials="HK"
                      onClick={() => alert(`User account clicked! Status: ${status}`)}
                    />
                  </AppBarActions>
                </AppBarContainer>
              </AppBar>

              {/* Simulated Mobile Feed Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
                <Card variant="default" size="sm" className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                    <span>Morning nap routine</span>
                    <Badge variant="editorial" size="sm">
                      Completed
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Logged 1h 45m sleep for {activeProfile}.
                  </p>
                </Card>

                <Card variant="sunken" size="sm" className="space-y-1">
                  <span className="text-xs font-semibold text-foreground">
                    Telemetry sync
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Current status dot indicates{" "}
                    <strong className="text-foreground">{status}</strong>.
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* Code & Anatomy Details */}
          <div className="lg:col-span-7 space-y-4">
            <Card variant="default" size="sm" className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                <span className="font-sans text-xs font-semibold text-foreground">
                  Quick Implementation
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() =>
                    copyToClipboard(
                      `<AppBar position="sticky" variant="default">\n  <AppBarContainer>\n    <AppBarLeading>\n      <BrandFlower className="size-7 text-emblem" />\n      <AppBarContextPill\n        avatar={<span className="size-5 rounded-full bg-accent text-accent-foreground">A</span>}\n        label="Astrid"\n      />\n    </AppBarLeading>\n    <AppBarActions>\n      <AppBarAvatarTrigger status="online" initials="HK" />\n    </AppBarActions>\n  </AppBarContainer>\n</AppBar>`,
                      "app-bar-code"
                    )
                  }
                >
                  {copiedCode === "app-bar-code" ? (
                    <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  <span>Copy</span>
                </Button>
              </div>
              <pre className="text-xs font-mono text-muted-foreground bg-muted/40 p-3 rounded-[var(--radius-sm)] overflow-x-auto leading-relaxed">
{`<AppBar position="sticky" variant="default">
  <AppBarContainer>
    <AppBarLeading>
      <BrandFlower className="size-7 text-emblem" />
      <AppBarContextPill
        avatar={<span className="size-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">A</span>}
        label="Astrid"
      />
    </AppBarLeading>
    <AppBarActions>
      <AppBarAvatarTrigger status="online" initials="HK" />
    </AppBarActions>
  </AppBarContainer>
</AppBar>`}
              </pre>
            </Card>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Card variant="sunken" size="sm" className="space-y-1">
                <span className="font-sans text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Icon icon={Layers} size="xs" intent="primary" />
                  Safe-Area Inset Support
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Default <code>safeArea=true</code> automatically applies <code>pt-[env(safe-area-inset-top,0px)]</code> to guarantee clean clearance on iOS notch and dynamic island devices.
                </p>
              </Card>

              <Card variant="sunken" size="sm" className="space-y-1">
                <span className="font-sans text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Icon icon={Sparkles} size="xs" intent="accent" />
                  Live Sync Indicator
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <code>AppBarAvatarTrigger</code> integrates status dots (<code>online</code>, <code>offline</code>, <code>syncing</code>) directly with high-contrast rings over the user monogram.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference Table */}
      <section className="space-y-4">
        <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
          Component Anatomy
        </h2>
        <div className="rounded-[var(--radius)] border border-border overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-muted/60 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Role</th>
                <th className="p-3">Key Props</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;AppBar&gt;</td>
                <td className="p-3">Primary header wrapper</td>
                <td className="p-3 font-mono">position: "sticky" | "fixed" | "static", variant: "default" | "glass" | "plain", size: "default" (h-14) | "sm" | "lg"</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;AppBarContainer&gt;</td>
                <td className="p-3">Centered inner flex row</td>
                <td className="p-3 font-mono">maxWidth: "sm" | "md" | "lg" | "xl" | "full"</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;AppBarLeading&gt;</td>
                <td className="p-3">Left slot for emblem, logo, back button</td>
                <td className="p-3 font-mono">className, children</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;AppBarContextPill&gt;</td>
                <td className="p-3">Context switcher pill button</td>
                <td className="p-3 font-mono">avatar, label, isOpen, chevron</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;AppBarActions&gt;</td>
                <td className="p-3">Right slot for actions & account triggers</td>
                <td className="p-3 font-mono">className, children</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;AppBarAvatarTrigger&gt;</td>
                <td className="p-3">User portrait button with sync telemetry badge</td>
                <td className="p-3 font-mono">status: "online" | "offline" | "syncing" | "none", initials</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
