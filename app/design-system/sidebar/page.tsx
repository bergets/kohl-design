"use client";

import * as React from "react";
import {
  Copy,
  Check,
  PanelLeft,
  Home,
  Clock,
  Sparkles,
  Settings,
  Plus,
  Users,
  Timer,
  ChevronDown,
  Globe,
  LogOut,
  Shapes,
  MoreHorizontal,
  FolderKanban,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandFlower } from "@/components/BrandFlower";
import { Icon } from "@/components/ui/icon";
import {
  Sidebar,
  SidebarHeader,
  SidebarBrand,
  SidebarContent,
  SidebarGroup,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarNav,
  SidebarNavItem,
  SidebarContextSwitcher,
  SidebarWidget,
  SidebarFooter,
  SidebarStatus,
  SidebarUser,
} from "@/components/ui/sidebar";

export default function SidebarPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"home" | "timeline" | "projects">("home");
  const [status, setStatus] = React.useState<"online" | "syncing" | "offline">("online");
  const [isTimerRunning, setIsTimerRunning] = React.useState(true);
  const [contextOpen, setContextOpen] = React.useState(false);

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
          Sidebar
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Full-featured application sidebar architecture modeled after production dashboard patterns. Composable slots for branding, workspace/profile context switchers, grouped navigation, live telemetry status dots, recessed widget slots, and user account management.
        </p>

        {/* Quick CLI command */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <div className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-1.5 text-foreground flex items-center gap-2">
            <span className="text-muted-foreground select-none">$</span>
            <code>npx shadcn@latest add https://kohl.design/r/sidebar.json</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              copyToClipboard(
                "npx shadcn@latest add https://kohl.design/r/sidebar.json",
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
              Interactive application sidebar rendered with inline design system tokens.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
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
            <Button
              variant="outline"
              size="xs"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              {isTimerRunning ? "Hide widget" : "Show widget"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mock App Shell Viewport */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-border/80 shadow-lg overflow-hidden bg-background flex h-[620px]">
              <Sidebar variant="inline" className="w-full h-full border-r-0">
                {/* Header */}
                <SidebarHeader>
                  <SidebarBrand>
                    <div className="flex items-center gap-2.5">
                      <BrandFlower className="size-7 text-emblem shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-sans text-sm font-bold tracking-tight text-foreground flex items-center gap-1.5">
                          Kohl Studio
                          <Badge variant="editorial" size="sm">
                            Pro
                          </Badge>
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate max-w-[130px]">
                          Design system workspace
                        </span>
                      </div>
                    </div>
                  </SidebarBrand>

                  {/* Context Switcher */}
                  <div className="space-y-1">
                    <SidebarGroupHeader>
                      <SidebarGroupLabel>Active profile</SidebarGroupLabel>
                      <SidebarGroupAction onClick={() => alert("Add profile clicked")}>
                        <Icon icon={Plus} size="xs" />
                        <span>Add</span>
                      </SidebarGroupAction>
                    </SidebarGroupHeader>
                    <SidebarContextSwitcher
                      avatar={
                        <span className="flex size-5 shrink-0 aspect-square items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent leading-none">
                          K
                        </span>
                      }
                      title="Kohl Primary"
                      subtitle="Enterprise workspace"
                      isOpen={contextOpen}
                      onClick={() => setContextOpen(!contextOpen)}
                    />
                  </div>

                  {/* Primary Action Button */}
                  <Button
                    variant="accent"
                    size="default"
                    className="w-full justify-between gap-2 shadow-xs -translate-y-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon={Plus} size="sm" />
                      <span>Create new item</span>
                    </div>
                    <ChevronDown className="size-3.5 opacity-70" />
                  </Button>
                </SidebarHeader>

                {/* Scrollable Content */}
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarNav>
                      <SidebarNavItem
                        active={activeTab === "home"}
                        onClick={() => setActiveTab("home")}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon icon={Home} size="sm" />
                          <span>Dashboard</span>
                        </div>
                      </SidebarNavItem>

                      <SidebarNavItem
                        active={activeTab === "timeline"}
                        onClick={() => setActiveTab("timeline")}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon icon={Clock} size="sm" />
                          <span>Activity timeline</span>
                        </div>
                        <Badge variant="default" size="sm" className="bg-primary-foreground/20 text-primary-foreground border-none">
                          12
                        </Badge>
                      </SidebarNavItem>

                      <SidebarNavItem
                        active={activeTab === "projects"}
                        onClick={() => setActiveTab("projects")}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon icon={FolderKanban} size="sm" />
                          <span>Projects & assets</span>
                        </div>
                      </SidebarNavItem>
                    </SidebarNav>
                  </SidebarGroup>
                </SidebarContent>

                {/* Pinned Footer */}
                <SidebarFooter>
                  {isTimerRunning && (
                    <SidebarWidget variant="accent" className="space-y-1.5">
                      <div className="flex items-center justify-between font-semibold text-accent">
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-accent" />
                          <span>Active timer</span>
                        </div>
                        <span className="font-mono text-[11px]">42:15</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Tracking design system audit session
                      </p>
                    </SidebarWidget>
                  )}

                  <SidebarStatus
                    status={status}
                    label={
                      status === "online"
                        ? "Synced & connected"
                        : status === "syncing"
                        ? "Syncing 2 updates..."
                        : "Offline mode"
                    }
                    meta={<span className="text-muted-foreground font-mono">v1.2</span>}
                  />

                  <SidebarUser
                    avatar={
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
                        H
                      </div>
                    }
                    name="Henrik Kohl"
                    email="henrik@kohl.design"
                    actions={
                      <>
                        <button
                          type="button"
                          className="flex items-center gap-1 px-1.5 py-0.5 rounded-[var(--radius-xs)] border border-border/80 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                          title="Switch language"
                        >
                          <Icon icon={Globe} size="xs" />
                          <span>EN</span>
                        </button>
                        <button
                          type="button"
                          className="text-muted-foreground hover:text-foreground p-1 transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                          title="Sign out"
                        >
                          <Icon icon={LogOut} size="xs" />
                        </button>
                      </>
                    }
                  />
                </SidebarFooter>
              </Sidebar>
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
                      `<Sidebar variant="fixed">\n  <SidebarHeader>\n    <SidebarBrand>\n      <BrandFlower className="size-7 text-emblem" />\n      <span>MyApp</span>\n    </SidebarBrand>\n    <SidebarContextSwitcher title="My Workspace" />\n  </SidebarHeader>\n\n  <SidebarContent>\n    <SidebarGroup>\n      <SidebarGroupLabel>Main</SidebarGroupLabel>\n      <SidebarNav>\n        <SidebarNavItem active>Home</SidebarNavItem>\n        <SidebarNavItem>Analytics</SidebarNavItem>\n      </SidebarNav>\n    </SidebarGroup>\n  </SidebarContent>\n\n  <SidebarFooter>\n    <SidebarStatus status="online" />\n    <SidebarUser name="Alex" email="alex@company.com" />\n  </SidebarFooter>\n</Sidebar>`,
                      "sidebar-code"
                    )
                  }
                >
                  {copiedCode === "sidebar-code" ? (
                    <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  <span>Copy</span>
                </Button>
              </div>
              <pre className="text-xs font-mono text-muted-foreground bg-muted/40 p-3 rounded-[var(--radius-sm)] overflow-x-auto leading-relaxed">
{`<Sidebar variant="fixed">
  <SidebarHeader>
    <SidebarBrand>
      <BrandFlower className="size-7 text-emblem" />
      <span>MyApp</span>
    </SidebarBrand>
    <SidebarContextSwitcher title="My Workspace" />
  </SidebarHeader>

  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarNav>
        <SidebarNavItem active>Home</SidebarNavItem>
        <SidebarNavItem>Analytics</SidebarNavItem>
      </SidebarNav>
    </SidebarGroup>
  </SidebarContent>

  <SidebarFooter>
    <SidebarStatus status="online" />
    <SidebarUser name="Alex" email="alex@company.com" />
  </SidebarFooter>
</Sidebar>`}
              </pre>
            </Card>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Card variant="sunken" size="sm" className="space-y-1">
                <span className="font-sans text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Icon icon={Layers} size="xs" intent="primary" />
                  Zero Layout Jitter
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Companion <code>&lt;SidebarWrapper&gt;</code> reserves viewport width on desktop layouts, preventing page content from hiding behind fixed sidebars.
                </p>
              </Card>

              <Card variant="sunken" size="sm" className="space-y-1">
                <span className="font-sans text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Icon icon={Sparkles} size="xs" intent="accent" />
                  Slot Composition (asChild)
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <code>SidebarNavItem</code> supports Radix Slot <code>asChild</code> to render Next.js <code>&lt;Link&gt;</code> elements directly without anchor tag nesting bugs.
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
                <td className="p-3 font-mono text-foreground font-medium">&lt;Sidebar&gt;</td>
                <td className="p-3">Primary aside container</td>
                <td className="p-3 font-mono">variant: "fixed" | "inline" | "floating", width: "default" | "sm" | "lg"</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;SidebarWrapper&gt;</td>
                <td className="p-3">Desktop spacing offset companion</td>
                <td className="p-3 font-mono">width: "default" | "sm" | "lg"</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;SidebarNavItem&gt;</td>
                <td className="p-3">Interactive navigation item</td>
                <td className="p-3 font-mono">active: boolean, variant: "default" | "accent", asChild: boolean</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;SidebarContextSwitcher&gt;</td>
                <td className="p-3">Workspace/Profile trigger dropdown</td>
                <td className="p-3 font-mono">avatar, title, subtitle, isOpen</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;SidebarStatus&gt;</td>
                <td className="p-3">Live sync / connectivity dot</td>
                <td className="p-3 font-mono">status: "online" | "offline" | "syncing" | "idle", label, meta</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground font-medium">&lt;SidebarWidget&gt;</td>
                <td className="p-3">Recessed well / timer / helper card</td>
                <td className="p-3 font-mono">variant: "default" | "accent" | "sunken"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
