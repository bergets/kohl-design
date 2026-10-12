"use client";

import * as React from "react";
import { Code2, Terminal, Copy, Check, ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const REGISTRY_ITEMS = [
  { name: "button", title: "Button", description: "Pine, Crimson, and Editorial variants, plus loading state." },
  { name: "card", title: "Card", description: "5 elevation layers: default, elevated, interactive, sunken, glass." },
  { name: "badge", title: "Badge", description: "Status tags, animated pulse dots, dismissible pills." },
  { name: "input", title: "Input", description: "Input with leading/trailing icons, InputGroup, and addons." },
  { name: "label", title: "Label", description: "Accessible form label primitive built on Radix UI Label." },
  { name: "icon", title: "Icon", description: "Standardized 20px / 1.5px stroke width Lucide wrapper." },
  { name: "sonner", title: "Sonner Toast", description: "Toaster wrapper styled to match Kohl Design tokens." },
  { name: "tabs", title: "Tabs", description: "Accessible tabs with segmented pill, underline, and pills variants." },
  { name: "toggle", title: "Toggle", description: "Two-state button with default, outline, primary, and editorial variants." },
  { name: "toggle-group", title: "ToggleGroup", description: "Multi-select and single-select toggle group with roving focus." },
  { name: "avatar", title: "Avatar", description: "Image element with fallback initials, status badges, and AvatarGroup." },
  { name: "chip", title: "Chip", description: "Interactive, selectable, and dismissible filter chips with ChipGroup." },
  { name: "brand-flower", title: "BrandFlower", description: "Official blooming radial floral emblem SVG component." },
  { name: "theme", title: "Theme Tokens", description: "Tailwind v4 theme variables, Pine, Crimson, dark & blush modes." },
  { name: "utils", title: "Utils (cn)", description: "Utility function combining clsx and tailwind-merge." },
];

export default function RegistryPage() {
  const [copiedName, setCopiedName] = React.useState<string | null>(null);

  const copyCommand = (name: string) => {
    const cmd = `npx shadcn@latest add https://kohl.design/r/${name}.json`;
    navigator.clipboard.writeText(cmd);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-link">
          <Code2 className="size-4" />
          <span>Distribution</span>
        </div>
        <h1 className="font-cooper text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
          Custom shadcn Registry
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          Install any component from Kohl Design directly into any separate Next.js or React repository using the official shadcn CLI.
        </p>
      </div>

      {/* Quick Setup Card */}
      <Card variant="sunken" className="p-6 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between font-sans">
          <h3 className="text-sm font-semibold text-foreground">Option 1: Add as Custom Registry in components.json</h3>
          <Badge variant="default" size="sm">Recommended</Badge>
        </div>
        <p className="font-sans text-xs text-muted-foreground">
          Add Kohl Design to your target project's <code className="bg-muted px-1 py-0.5 rounded">components.json</code>:
        </p>
        <pre className="rounded-[var(--radius-sm)] bg-background/90 border border-border p-3.5 text-foreground overflow-x-auto leading-relaxed">
{`{
  "registries": {
    "@kohl": "https://kohl.design/r/{name}.json"
  }
}`}
        </pre>
        <p className="font-sans text-xs text-muted-foreground">
          Then install anytime via: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">npx shadcn@latest add @kohl/button</code>
        </p>
      </Card>

      {/* Component Index */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">Available Components</h2>
          <a
            href="/r/index.json"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>View index.json</span>
            <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {REGISTRY_ITEMS.map((item) => (
            <Card key={item.name} variant="default" className="p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                  <code className="text-[11px] font-mono text-muted-foreground">r/{item.name}.json</code>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border/60">
                <code className="text-[11px] font-mono text-muted-foreground truncate max-w-[220px]">
                  shadcn add .../{item.name}.json
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyCommand(item.name)}
                  className="h-7 px-2.5 text-xs flex items-center gap-1.5"
                >
                  {copiedName === item.name ? (
                    <>
                      <Check className="size-3 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy CLI</span>
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
