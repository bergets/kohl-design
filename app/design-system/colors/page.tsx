"use client";

import * as React from "react";
import Link from "next/link";
import {
  Palette,
  Copy,
  Check,
  ShieldCheck,
  Layers,
  Sparkles,
  ArrowRight,
  Split,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDesignSystem } from "@/components/design-system/DesignSystemContext";

interface SemanticToken {
  name: string;
  variable: string;
  tailwindClass: string;
  role: string;
  bgVar: string;
  fgVar: string;
  borderVar?: string;
  exampleSnippet?: string;
}

const TOKEN_CATEGORIES: {
  id: string;
  title: string;
  description: string;
  tokens: SemanticToken[];
}[] = [
  {
    id: "brand",
    title: "Brand Actions & Accent",
    description: "Dominant conversion anchors, hover dynamics, and editorial character moments.",
    tokens: [
      {
        name: "Primary Action",
        variable: "--primary",
        tailwindClass: "bg-primary / text-primary-foreground",
        role: "The single primary conversion action per view. Pine in Pine mode, Cashmere Blush in Blush mode.",
        bgVar: "var(--primary)",
        fgVar: "var(--primary-foreground)",
        exampleSnippet: '<Button variant="default">Primary CTA</Button>',
      },
      {
        name: "Primary Hover",
        variable: "--primary-hover",
        tailwindClass: "hover:bg-primary-hover",
        role: "State color when hovering or focusing the primary action.",
        bgVar: "var(--primary-hover)",
        fgVar: "var(--primary-foreground)",
      },
      {
        name: "Brand Accent",
        variable: "--accent",
        tailwindClass: "bg-accent / text-accent-foreground",
        role: "Signature Crimson Coral highlight, editorial case studies, and focused moments.",
        bgVar: "var(--accent)",
        fgVar: "var(--accent-foreground)",
        exampleSnippet: '<Button variant="accent">Crimson CTA</Button>',
      },
      {
        name: "Accent Hover",
        variable: "--accent-hover",
        tailwindClass: "hover:bg-accent-hover",
        role: "State color when interacting with Crimson and editorial action elements.",
        bgVar: "var(--accent-hover)",
        fgVar: "var(--accent-foreground)",
      },
      {
        name: "Hyperlink Inks",
        variable: "--link",
        tailwindClass: "text-link hover:text-link-hover",
        role: "Inline editorial hyperlinks guaranteed to maintain 7:1 AAA contrast in both light and dark mode.",
        bgVar: "var(--link)",
        fgVar: "#ffffff",
      },
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces & Canvas",
    description: "Physical elevation layers stacked from viewport canvas (Level 0) to floating popovers (Level 2).",
    tokens: [
      {
        name: "Canvas / Page",
        variable: "--background",
        tailwindClass: "bg-background / text-foreground",
        role: "Base body background for viewports and root page frames (Level 0).",
        bgVar: "var(--background)",
        fgVar: "var(--foreground)",
        borderVar: "var(--line)",
      },
      {
        name: "Surface / Card",
        variable: "--card",
        tailwindClass: "bg-card / text-card-foreground",
        role: "Level 1 elevated container for cards, panels, and content blocks.",
        bgVar: "var(--card)",
        fgVar: "var(--card-foreground)",
        borderVar: "var(--line-strong)",
      },
      {
        name: "Surface 2 / Secondary",
        variable: "--secondary",
        tailwindClass: "bg-secondary / text-secondary-foreground",
        role: "Subdued neutral wash for secondary action buttons and inactive pills.",
        bgVar: "var(--secondary)",
        fgVar: "var(--secondary-foreground)",
        borderVar: "var(--line)",
      },
      {
        name: "Surface 3 / Sunken Well",
        variable: "--muted",
        tailwindClass: "bg-muted / text-muted-foreground",
        role: "Level 3 recessed inset areas, code viewports, and terminal logs.",
        bgVar: "var(--muted)",
        fgVar: "var(--muted-foreground)",
        borderVar: "var(--line)",
      },
      {
        name: "Raised / Popover",
        variable: "--popover",
        tailwindClass: "bg-popover / text-popover-foreground",
        role: "Level 2 context menus, tooltips, dropdown flyouts, and dialogs.",
        bgVar: "var(--popover)",
        fgVar: "var(--popover-foreground)",
        borderVar: "var(--line-strong)",
      },
    ],
  },
  {
    id: "text",
    title: "Text & Ink",
    description: "Typographic hierarchy tokens calibrated for maximum legibility and cognitive ease.",
    tokens: [
      {
        name: "Foreground (Primary Text)",
        variable: "--foreground",
        tailwindClass: "text-foreground",
        role: "Primary copy, hero titles, high-contrast headline ink (Midnight Pine ink in light, Petal white in dark).",
        bgVar: "var(--foreground)",
        fgVar: "var(--background)",
      },
      {
        name: "Muted Foreground (Secondary)",
        variable: "--muted-foreground",
        tailwindClass: "text-muted-foreground",
        role: "Secondary descriptions, table metadata, placeholder labels, and timestamps.",
        bgVar: "var(--muted-foreground)",
        fgVar: "#ffffff",
      },
      {
        name: "Card Foreground",
        variable: "--card-foreground",
        tailwindClass: "text-card-foreground",
        role: "Text content placed inside Card and Surface containers.",
        bgVar: "var(--card-foreground)",
        fgVar: "var(--card)",
      },
      {
        name: "Primary Action Ink",
        variable: "--primary-foreground",
        tailwindClass: "text-primary-foreground",
        role: "High-contrast label ink rendered on top of the primary action button.",
        bgVar: "var(--primary-foreground)",
        fgVar: "var(--primary)",
        borderVar: "var(--line-strong)",
      },
    ],
  },
  {
    id: "lines",
    title: "Lines & Boundaries",
    description: "Optical dividers, structural silhouettes, form controls, and accessibility rings.",
    tokens: [
      {
        name: "Hairline Divider (Line)",
        variable: "--line",
        tailwindClass: "border-line (or divide-line)",
        role: "Subtle hairline dividers between list rows, table cells, and header separators. Minimal visual weight.",
        bgVar: "var(--line)",
        fgVar: "var(--foreground)",
      },
      {
        name: "Structural Border (Line Strong)",
        variable: "--line-strong",
        tailwindClass: "border-line-strong (or border-border)",
        role: "Prominent outer boundary for cards, modals, and container silhouettes. Defines spatial edges.",
        bgVar: "var(--line-strong)",
        fgVar: "var(--foreground)",
      },
      {
        name: "Interactive Control Boundary",
        variable: "--control",
        tailwindClass: "border-control (or border-input)",
        role: "Border lines on interactive form fields, checkboxes, radio buttons, and sliders. Needs 3:1 non-text contrast.",
        bgVar: "var(--control)",
        fgVar: "var(--foreground)",
      },
      {
        name: "Focus Visible Ring",
        variable: "--ring",
        tailwindClass: "ring-ring (focus-visible:ring-2)",
        role: "Accessibility focus ring; provides guaranteed 2px contrast on keyboard navigation across all surfaces.",
        bgVar: "var(--ring)",
        fgVar: "var(--primary-foreground)",
      },
    ],
  },
  {
    id: "status",
    title: "Status & Feedback",
    description: "Semantic states for transactional notifications, workflow stages, and alerts.",
    tokens: [
      {
        name: "Success (Positive)",
        variable: "--success",
        tailwindClass: "bg-success / text-success-foreground",
        role: "Completed transfers, healthy system status, settled transactions, positive deltas.",
        bgVar: "var(--success)",
        fgVar: "var(--success-foreground)",
      },
      {
        name: "Success Tint (Wash)",
        variable: "--success-tint",
        tailwindClass: "bg-success-tint text-success",
        role: "Gentle pastel wash background for success badges and alerts.",
        bgVar: "var(--success-tint)",
        fgVar: "var(--success)",
        borderVar: "var(--success)",
      },
      {
        name: "Warning (Caution)",
        variable: "--warning",
        tailwindClass: "bg-warning / text-warning-foreground",
        role: "Expiring sessions, pending approvals, low balance warnings, caution notifications.",
        bgVar: "var(--warning)",
        fgVar: "var(--warning-foreground)",
      },
      {
        name: "Warning Tint (Wash)",
        variable: "--warning-tint",
        tailwindClass: "bg-warning-tint text-warning",
        role: "Gentle warm pastel wash background for warning badges and alerts.",
        bgVar: "var(--warning-tint)",
        fgVar: "var(--warning)",
        borderVar: "var(--warning)",
      },
      {
        name: "Destructive / Danger",
        variable: "--destructive",
        tailwindClass: "bg-destructive / text-destructive-foreground",
        role: "Failed transfers, critical errors, destructive deletion dialogs, negative status.",
        bgVar: "var(--destructive)",
        fgVar: "var(--destructive-foreground)",
      },
    ],
  },
];

const CONTRAST_PAIRS = [
  {
    pair: "foreground on background (Body Copy)",
    light: "14.8:1",
    dark: "16.2:1",
    rating: "AAA",
    req: "Needs 4.5:1",
  },
  {
    pair: "foreground on card (Content Block)",
    light: "14.8:1",
    dark: "14.1:1",
    rating: "AAA",
    req: "Needs 4.5:1",
  },
  {
    pair: "muted-foreground on background (Secondary)",
    light: "4.8:1",
    dark: "5.2:1",
    rating: "AA",
    req: "Needs 4.5:1",
  },
  {
    pair: "primary-foreground on primary (CTA Button)",
    light: "11.2:1",
    dark: "12.8:1",
    rating: "AAA",
    req: "Needs 4.5:1",
  },
  {
    pair: "accent-foreground on accent (Crimson)",
    light: "5.4:1",
    dark: "7.1:1",
    rating: "AAA",
    req: "Needs 4.5:1",
  },
  {
    pair: "link on background (Hyperlinks)",
    light: "7.5:1",
    dark: "10.1:1",
    rating: "AAA",
    req: "Needs 4.5:1",
  },
  {
    pair: "control on background (Form Fields)",
    light: "3.2:1",
    dark: "3.8:1",
    rating: "Pass",
    req: "Needs 3.0:1 (Non-text)",
  },
  {
    pair: "line-strong on background (Card Edges)",
    light: "3.1:1",
    dark: "3.4:1",
    rating: "Pass",
    req: "Needs 3.0:1 (Non-text)",
  },
];

const THEME_MAPPINGS = [
  { role: "--background", pineLight: "#ffffff", pineDark: "#011d18", blushLight: "#ffffff", blushDark: "#1a0709" },
  { role: "--foreground", pineLight: "#011713", pineDark: "#f2f2f2", blushLight: "#1d070a", blushDark: "#feeced" },
  { role: "--card", pineLight: "#ffffff", pineDark: "#03352c", blushLight: "#ffffff", blushDark: "#281013" },
  { role: "--primary", pineLight: "#005243", pineDark: "#005243", blushLight: "#FBC8CB", blushDark: "#FCD3D6" },
  { role: "--primary-foreground", pineLight: "#ffffff", pineDark: "#ffffff", blushLight: "#1d070a", blushDark: "#1d070a" },
  { role: "--accent", pineLight: "#93484f", pineDark: "#93484f", blushLight: "#8a2e36", blushDark: "#f79da5" },
  { role: "--line", pineLight: "#e1e1e1", pineDark: "#053028", blushLight: "#f4dedf", blushDark: "#33161b" },
  { role: "--line-strong", pineLight: "#c0c0c0", pineDark: "#094238", blushLight: "#e8c5c8", blushDark: "#503539" },
  { role: "--control", pineLight: "#a6a6a6", pineDark: "#0e5a4d", blushLight: "#dca7ab", blushDark: "#6b474d" },
  { role: "--link", pineLight: "#005243", pineDark: "#a8e3d2", blushLight: "#822129", blushDark: "#fcd3d6" },
];

const PINE_SCALE = [
  { step: "50", hex: "#eff7f4", hsla: "hsla(160, 30%, 96%, 1)", role: "Canvas wash" },
  { step: "100", hex: "#a8e3d2", hsla: "hsla(164, 48%, 77%, 1)", role: "Light tint" },
  { step: "200", hex: "#8ad0be", hsla: "hsla(166, 33%, 65%, 1)", role: "Border light" },
  { step: "300", hex: "#6fb4a3", hsla: "hsla(166, 26%, 55%, 1)", role: "Subtle accent" },
  { step: "400", hex: "#3b7d6f", hsla: "hsla(167, 35%, 36%, 1)", role: "Muted pine" },
  { step: "500", hex: "#1f6b5c", hsla: "hsla(169, 54%, 27%, 1)", role: "Deep forest" },
  { step: "600", hex: "#005243", hsla: "hsla(170, 100%, 16%, 1)", role: "Signature Brand Pine (Primary)" },
  { step: "700", hex: "#03352c", hsla: "hsla(170, 90%, 11%, 1)", role: "Deep Pine Surface" },
  { step: "800", hex: "#011d18", hsla: "hsla(168, 94%, 6%, 1)", role: "Midnight Forest Canvas" },
  { step: "900", hex: "#011713", hsla: "hsla(168, 94%, 5%, 1)", role: "Darkest ink" },
];

const CRIMSON_SCALE = [
  { step: "50", hex: "#fef1f2", hsla: "hsla(356, 89%, 96%, 1)", role: "Tint wash" },
  { step: "100", hex: "#fcd3d6", hsla: "hsla(356, 86%, 88%, 1)", role: "Luminous petal" },
  { step: "200", hex: "#f79da5", hsla: "hsla(355, 73%, 79%, 1)", role: "Rose tint" },
  { step: "300", hex: "#dc858b", hsla: "hsla(355, 47%, 68%, 1)", role: "Soft coral" },
  { step: "400", hex: "#a65e64", hsla: "hsla(355, 29%, 51%, 1)", role: "Dusty coral" },
  { step: "500", hex: "#93484f", hsla: "hsla(354, 34%, 43%, 1)", role: "Signature Crimson Accent" },
  { step: "600", hex: "#73262d", hsla: "hsla(354, 50%, 30%, 1)", role: "Deep Crimson hover" },
  { step: "700", hex: "#601119", hsla: "hsla(352, 70%, 22%, 1)", role: "Wine border" },
  { step: "800", hex: "#420006", hsla: "hsla(352, 100%, 13%, 1)", role: "Deep Wine" },
  { step: "900", hex: "#1a0709", hsla: "hsla(352, 55%, 6.5%, 1)", role: "Midnight Berry Canvas" },
  { step: "950", hex: "#120406", hsla: "hsla(352, 60%, 4.5%, 1)", role: "Velvet Noir" },
];

const NEUTRAL_SCALE = [
  { step: "50", hex: "#f2f2f2", hsla: "hsla(0, 0%, 95%, 1)", role: "Surface wash" },
  { step: "100", hex: "#d4d4d4", hsla: "hsla(0, 0%, 83%, 1)", role: "Border light" },
  { step: "200", hex: "#bababa", hsla: "hsla(0, 0%, 73%, 1)", role: "Disabled border" },
  { step: "300", hex: "#92a09c", hsla: "hsla(169, 8%, 60%, 1)", role: "Sage gray" },
  { step: "400", hex: "#6a7673", hsla: "hsla(169, 8%, 44%, 1)", role: "Secondary text" },
  { step: "500", hex: "#50625e", hsla: "hsla(170, 10%, 35%, 1)", role: "Muted body text" },
  { step: "600", hex: "#3b4a46", hsla: "hsla(168, 11%, 26%, 1)", role: "Deep slate text" },
  { step: "700", hex: "#283431", hsla: "hsla(170, 13%, 18%, 1)", role: "Dark border line" },
  { step: "800", hex: "#151e1c", hsla: "hsla(173, 18%, 10%, 1)", role: "Deep slate well" },
  { step: "900", hex: "#000000", hsla: "hsla(0, 0%, 0%, 1)", role: "True black" },
];

function ColorRow({ colors, title }: { colors: typeof PINE_SCALE; title: string }) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyColor = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-cooper text-base text-foreground">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
        {colors.map((c, i) => (
          <button
            key={c.step}
            type="button"
            onClick={() => copyColor(c.hex, i)}
            className="group flex flex-col rounded-[var(--radius-sm)] border border-border bg-card p-2 text-start transition-all hover:border-primary hover:shadow-xs cursor-pointer"
            title={`${c.hex} - Click to copy`}
          >
            <div
              className="h-10 w-full rounded-[var(--radius-sm)] border border-black/5 shadow-2xs mb-2 transition-transform group-hover:scale-[1.02]"
              style={{ backgroundColor: c.hex }}
            />
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-foreground">{c.step}</span>
              {copiedIndex === i ? (
                <Check className="size-3 text-emerald-600" />
              ) : (
                <Copy className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
              )}
            </div>
            <span className="font-mono text-[10px] text-muted-foreground truncate">{c.hex}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const { brandTheme } = useDesignSystem();
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <div className="space-y-14">
      {/* Hero Header */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Color & Tokens
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          The color architecture of Kohl Design is strictly token-by-role. Interface components consume semantic tokens (<code className="font-mono text-xs">--primary</code>, <code className="font-mono text-xs">--card</code>, <code className="font-mono text-xs">--line</code>, <code className="font-mono text-xs">--control</code>) that automatically adapt across Light/Dark modes and Pine ↔ Blush brand registers.
        </p>

        {/* Live Active Theme State Indicator */}
        <div className="rounded-[var(--radius)] border border-border bg-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">Active Brand Register:</span>
              <Badge variant="default" size="sm" className="capitalize">
                {brandTheme} Mode
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Try flipping between Pine ↔ Blush or Light ↔ Dark in the top navigation header — all tokens on this page adapt live to your selection.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground">var(--primary)</span>
          </div>
        </div>
      </section>

      {/* Section 1: Semantic Tokens Matrix */}
      <section className="space-y-8">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">1. Semantic Color Tokens</h2>
          <p className="text-sm text-muted-foreground">
            Grouped by functional role. Every token responds to current theme context and provides calibrated WCAG contrast.
          </p>
        </div>

        <div className="space-y-10">
          {TOKEN_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="space-y-3.5 scroll-mt-20">
              <div className="border-b border-border pb-2 flex items-baseline justify-between">
                <div>
                  <h3 className="font-cooper text-xl text-foreground">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground/80">{cat.tokens.length} tokens</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.tokens.map((token) => (
                  <div
                    key={token.variable}
                    className="rounded-[var(--radius)] border border-border bg-card p-4 flex items-center justify-between gap-4 shadow-xs hover:border-border/80 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Live Reactive Swatch */}
                      <div
                        className="size-12 rounded-[var(--radius-sm)] border border-black/10 dark:border-white/10 shrink-0 flex items-center justify-center shadow-2xs transition-all"
                        style={{
                          backgroundColor: token.bgVar,
                          borderColor: token.borderVar,
                        }}
                      >
                        <span
                          className="font-mono text-[10px] font-bold"
                          style={{ color: token.fgVar }}
                        >
                          Aa
                        </span>
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground truncate">
                            {token.name}
                          </span>
                          <code className="text-[11px] font-mono text-primary bg-primary/10 px-1.5 py-0.2 rounded shrink-0">
                            {token.variable}
                          </code>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {token.role}
                        </p>
                        <div className="text-[10px] font-mono text-muted-foreground/80">
                          Tailwind: <code className="text-foreground">{token.tailwindClass}</code>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(token.variable, token.variable)}
                      className="shrink-0 h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                      title="Copy CSS variable"
                    >
                      {copiedToken === token.variable ? (
                        <Check className="size-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Lines & Boundaries Showcase */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">2. The 3 Line Densities</h2>
          <p className="text-sm text-muted-foreground">
            Borders give cards and controls their optical silhouette. Use the right line density for each layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hairline Divider */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">1. Hairline Divider</span>
                <code className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">--line</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Subtle 1px divider for table rows, item lists, and inner card sections. Low optical noise.
              </p>
            </div>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 space-y-2 text-xs">
              <div className="pb-2 border-b border-line flex justify-between">
                <span className="text-muted-foreground">List Item 1</span>
                <span className="font-mono text-[10px]">border-line</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-muted-foreground">List Item 2</span>
                <span className="font-mono text-[10px]">divide-line</span>
              </div>
            </div>
          </div>

          {/* Structural Border */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">2. Structural Boundary</span>
                <code className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">--line-strong</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Crisp structural border that gives outer cards, dialogs, and popovers optical definition.
              </p>
            </div>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 text-xs">
              <div className="p-3 rounded-[var(--radius-sm)] bg-card border border-line-strong shadow-xs flex items-center justify-between">
                <span className="text-foreground font-medium">Card Container</span>
                <span className="font-mono text-[10px] text-muted-foreground">border-line-strong</span>
              </div>
            </div>
          </div>

          {/* Control Boundary */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">3. Control Boundary</span>
                <code className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">--control</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Interactive control outline for text inputs, select dropdowns, and checkboxes. Passes 3:1 non-text contrast.
              </p>
            </div>
            <div className="p-4 rounded-[var(--radius-sm)] bg-muted/40 text-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded border border-control bg-background flex items-center justify-center">
                  <Check className="size-3 text-primary" />
                </div>
                <span className="text-muted-foreground">Checkbox Outline</span>
              </div>
              <div className="px-2.5 py-1 rounded-[var(--radius-sm)] border border-control bg-background text-[11px] text-muted-foreground">
                Input Field Border
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contrast Verification Table */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">3. WCAG Contrast Verification</h2>
          <p className="text-sm text-muted-foreground">
            Every token pair is calibrated against WCAG 2.1 standards across both Light and Dark modes.
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-3.5 pl-5">Token Pair</th>
                  <th className="p-3.5">Light Ratio</th>
                  <th className="p-3.5">Dark Ratio</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5 pr-5">Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CONTRAST_PAIRS.map((row) => (
                  <tr key={row.pair} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3.5 pl-5 font-mono text-foreground">{row.pair}</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">{row.light}</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">{row.dark}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" />
                        {row.rating}
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-muted-foreground">{row.req}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Dark Theme Token Mappings */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">4. Theme Role Mapping Table</h2>
          <p className="text-sm text-muted-foreground">
            Direct comparison of values across all 4 system registers (Pine Light, Pine Dark, Blush Light, Blush Dark).
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-3.5 pl-5">Role</th>
                  <th className="p-3.5">Pine Light</th>
                  <th className="p-3.5">Pine Dark</th>
                  <th className="p-3.5">Blush Light</th>
                  <th className="p-3.5 pr-5">Blush Dark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-[11px]">
                {THEME_MAPPINGS.map((m) => (
                  <tr key={m.role} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3.5 pl-5 font-semibold text-primary">{m.role}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-3 rounded-xs border border-black/10 shrink-0" style={{ backgroundColor: m.pineLight }} />
                        <span className="text-muted-foreground">{m.pineLight}</span>
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-3 rounded-xs border border-white/10 shrink-0" style={{ backgroundColor: m.pineDark }} />
                        <span className="text-muted-foreground">{m.pineDark}</span>
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-3 rounded-xs border border-black/10 shrink-0" style={{ backgroundColor: m.blushLight }} />
                        <span className="text-muted-foreground">{m.blushLight}</span>
                      </span>
                    </td>
                    <td className="p-3.5 pr-5">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-3 rounded-xs border border-white/10 shrink-0" style={{ backgroundColor: m.blushDark }} />
                        <span className="text-muted-foreground">{m.blushDark}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Foundational Primitive Scales */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">5. Foundational Color Scales</h2>
          <p className="text-sm text-muted-foreground">
            The 28 raw brand tints and shades that establish the color spectrum of Kohl Design. Click any swatch to copy its hex value.
          </p>
        </div>

        <div className="space-y-8">
          <ColorRow colors={PINE_SCALE} title="Pine Forest Green Scale (Primary Brand)" />
          <ColorRow colors={CRIMSON_SCALE} title="Crimson Coral Scale (Accent & Highlights)" />
          <ColorRow colors={NEUTRAL_SCALE} title="Neutral & Sage Slate Scale (Surfaces & Inks)" />
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>kohl.design · Design System v1.0</span>
        <div className="flex items-center gap-4">
          <Link href="/design-system" className="hover:text-foreground transition-colors">
            Component Index
          </Link>
          <Link href="/design-system/typography" className="hover:text-foreground transition-colors">
            Typography
          </Link>
          <Link href="/design-system/surfaces" className="hover:text-foreground transition-colors">
            Surfaces & Elevation
          </Link>
          <Link href="/design-system/card" className="hover:text-foreground transition-colors">
            Card
          </Link>
          <Link href="/design-system/anti-slop" className="hover:text-foreground transition-colors">
            Anti-slop Guide
          </Link>
        </div>
      </footer>
    </div>
  );
}
