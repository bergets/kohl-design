"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Compass,
  ExternalLink,
  MoveRight,
  Undo2,
  Redo2,
  Plus,
  Minus,
  X,
  Check,
  Search,
  SlidersHorizontal,
  Filter,
  Download,
  Upload,
  Share2,
  Copy,
  Trash2,
  Edit3,
  RefreshCw,
  MoreHorizontal,
  MoreVertical,
  LayoutGrid,
  Layers,
  Square,
  Circle,
  Box,
  Maximize2,
  Minimize2,
  Sidebar,
  PanelLeft,
  Menu,
  Command,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  HelpCircle,
  Clock,
  Flame,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Mail,
  MessageSquare,
  Send,
  Heart,
  Bookmark,
  ThumbsUp,
  AtSign,
  Globe,
  Linkedin,
  Github,
  Laptop,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Terminal,
  Code2,
  Cpu,
  Database,
  Folder,
  FileText,
  Image,
  type LucideIcon,
} from "lucide-react";
import { Icon, DEFAULT_ICON_SIZE, DEFAULT_ICON_STROKE_WIDTH } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface IconItem {
  name: string;
  component: LucideIcon;
  category: "Navigation" | "Actions" | "Interface" | "Status" | "Social" | "Media";
  keywords: string[];
}

const ICON_COLLECTION: IconItem[] = [
  // Navigation
  { name: "ArrowRight", component: ArrowRight, category: "Navigation", keywords: ["arrow", "right", "next", "forward"] },
  { name: "ArrowLeft", component: ArrowLeft, category: "Navigation", keywords: ["arrow", "left", "back", "previous"] },
  { name: "ArrowUpRight", component: ArrowUpRight, category: "Navigation", keywords: ["arrow", "up", "right", "external", "link"] },
  { name: "ArrowUp", component: ArrowUp, category: "Navigation", keywords: ["arrow", "up", "top"] },
  { name: "ArrowDown", component: ArrowDown, category: "Navigation", keywords: ["arrow", "down", "bottom"] },
  { name: "ChevronRight", component: ChevronRight, category: "Navigation", keywords: ["chevron", "right", "next"] },
  { name: "ChevronLeft", component: ChevronLeft, category: "Navigation", keywords: ["chevron", "left", "back"] },
  { name: "ChevronDown", component: ChevronDown, category: "Navigation", keywords: ["chevron", "down", "dropdown", "expand"] },
  { name: "ChevronUp", component: ChevronUp, category: "Navigation", keywords: ["chevron", "up", "collapse"] },
  { name: "ChevronsUpDown", component: ChevronsUpDown, category: "Navigation", keywords: ["select", "sort", "expand", "picker"] },
  { name: "Compass", component: Compass, category: "Navigation", keywords: ["explore", "direction", "navigation", "safari"] },
  { name: "ExternalLink", component: ExternalLink, category: "Navigation", keywords: ["link", "external", "outbound", "open"] },
  { name: "MoveRight", component: MoveRight, category: "Navigation", keywords: ["move", "transfer", "forward"] },
  { name: "Undo2", component: Undo2, category: "Navigation", keywords: ["undo", "history", "back", "revert"] },
  { name: "Redo2", component: Redo2, category: "Navigation", keywords: ["redo", "forward", "history"] },

  // Actions
  { name: "Search", component: Search, category: "Actions", keywords: ["search", "find", "magnifier", "lookup"] },
  { name: "Plus", component: Plus, category: "Actions", keywords: ["add", "new", "create", "insert"] },
  { name: "Minus", component: Minus, category: "Actions", keywords: ["remove", "subtract", "collapse"] },
  { name: "X", component: X, category: "Actions", keywords: ["close", "delete", "clear", "cancel", "dismiss"] },
  { name: "Check", component: Check, category: "Actions", keywords: ["check", "done", "confirm", "accept"] },
  { name: "Copy", component: Copy, category: "Actions", keywords: ["copy", "clipboard", "duplicate"] },
  { name: "Share2", component: Share2, category: "Actions", keywords: ["share", "send", "social"] },
  { name: "Download", component: Download, category: "Actions", keywords: ["download", "save", "export"] },
  { name: "Upload", component: Upload, category: "Actions", keywords: ["upload", "import", "publish"] },
  { name: "Edit3", component: Edit3, category: "Actions", keywords: ["edit", "pencil", "modify", "write"] },
  { name: "Trash2", component: Trash2, category: "Actions", keywords: ["delete", "trash", "remove", "bin"] },
  { name: "RefreshCw", component: RefreshCw, category: "Actions", keywords: ["reload", "refresh", "rotate", "sync"] },
  { name: "Filter", component: Filter, category: "Actions", keywords: ["filter", "refine", "funnel"] },
  { name: "SlidersHorizontal", component: SlidersHorizontal, category: "Actions", keywords: ["settings", "preferences", "controls", "sliders"] },
  { name: "MoreHorizontal", component: MoreHorizontal, category: "Actions", keywords: ["more", "dots", "menu", "overflow"] },
  { name: "MoreVertical", component: MoreVertical, category: "Actions", keywords: ["more", "dots", "menu", "overflow"] },

  // Interface & Layout
  { name: "LayoutGrid", component: LayoutGrid, category: "Interface", keywords: ["grid", "dashboard", "apps", "layout"] },
  { name: "Layers", component: Layers, category: "Interface", keywords: ["layers", "stack", "cards", "surfaces"] },
  { name: "Square", component: Square, category: "Interface", keywords: ["square", "rectangle", "shape", "frame"] },
  { name: "Circle", component: Circle, category: "Interface", keywords: ["circle", "dot", "radio", "status"] },
  { name: "Box", component: Box, category: "Interface", keywords: ["box", "package", "component", "container"] },
  { name: "Maximize2", component: Maximize2, category: "Interface", keywords: ["fullscreen", "expand", "maximize"] },
  { name: "Minimize2", component: Minimize2, category: "Interface", keywords: ["exit fullscreen", "shrink", "minimize"] },
  { name: "Sidebar", component: Sidebar, category: "Interface", keywords: ["sidebar", "drawer", "rail", "panel"] },
  { name: "PanelLeft", component: PanelLeft, category: "Interface", keywords: ["panel", "split", "sidebar"] },
  { name: "Menu", component: Menu, category: "Interface", keywords: ["menu", "hamburger", "nav", "list"] },
  { name: "Command", component: Command, category: "Interface", keywords: ["command", "shortcut", "cmd", "palette"] },

  // Status & Feedback
  { name: "Sparkles", component: Sparkles, category: "Status", keywords: ["sparkles", "ai", "magic", "stars", "feature"] },
  { name: "CheckCircle2", component: CheckCircle2, category: "Status", keywords: ["success", "approved", "done", "check"] },
  { name: "AlertCircle", component: AlertCircle, category: "Status", keywords: ["warning", "error", "alert", "notice"] },
  { name: "Info", component: Info, category: "Status", keywords: ["info", "information", "details", "help"] },
  { name: "HelpCircle", component: HelpCircle, category: "Status", keywords: ["help", "question", "faq", "support"] },
  { name: "Clock", component: Clock, category: "Status", keywords: ["time", "clock", "duration", "history", "recent"] },
  { name: "Flame", component: Flame, category: "Status", keywords: ["trending", "hot", "fire", "popular"] },
  { name: "ShieldCheck", component: ShieldCheck, category: "Status", keywords: ["security", "verified", "protected", "safe"] },
  { name: "Lock", component: Lock, category: "Status", keywords: ["lock", "private", "secure", "restricted"] },
  { name: "Unlock", component: Unlock, category: "Status", keywords: ["unlock", "open", "public"] },
  { name: "Eye", component: Eye, category: "Status", keywords: ["view", "preview", "visible", "show"] },
  { name: "EyeOff", component: EyeOff, category: "Status", keywords: ["hide", "hidden", "invisible"] },

  // Communication & Social
  { name: "Mail", component: Mail, category: "Social", keywords: ["email", "envelope", "contact", "message"] },
  { name: "MessageSquare", component: MessageSquare, category: "Social", keywords: ["chat", "comment", "feedback", "discuss"] },
  { name: "Send", component: Send, category: "Social", keywords: ["send", "paper plane", "submit", "post"] },
  { name: "Heart", component: Heart, category: "Social", keywords: ["like", "favorite", "love"] },
  { name: "Bookmark", component: Bookmark, category: "Social", keywords: ["bookmark", "save", "reading list"] },
  { name: "ThumbsUp", component: ThumbsUp, category: "Social", keywords: ["like", "approve", "vote"] },
  { name: "AtSign", component: AtSign, category: "Social", keywords: ["mention", "handle", "user", "at"] },
  { name: "Globe", component: Globe, category: "Social", keywords: ["world", "web", "internet", "domain", "lang"] },
  { name: "Linkedin", component: Linkedin, category: "Social", keywords: ["linkedin", "cv", "career", "professional"] },
  { name: "Github", component: Github, category: "Social", keywords: ["github", "code", "repo", "git"] },

  // Media & Technology
  { name: "Terminal", component: Terminal, category: "Media", keywords: ["terminal", "console", "cli", "command"] },
  { name: "Code2", component: Code2, category: "Media", keywords: ["code", "developer", "syntax", "tags"] },
  { name: "Cpu", component: Cpu, category: "Media", keywords: ["processor", "hardware", "system", "performance"] },
  { name: "Database", component: Database, category: "Media", keywords: ["database", "storage", "sql", "data"] },
  { name: "Folder", component: Folder, category: "Media", keywords: ["folder", "directory", "files", "project"] },
  { name: "FileText", component: FileText, category: "Media", keywords: ["document", "file", "text", "page"] },
  { name: "Image", component: Image, category: "Media", keywords: ["image", "picture", "photo", "asset"] },
  { name: "Laptop", component: Laptop, category: "Media", keywords: ["computer", "laptop", "device", "desktop"] },
  { name: "Smartphone", component: Smartphone, category: "Media", keywords: ["phone", "mobile", "ios", "android"] },
  { name: "Monitor", component: Monitor, category: "Media", keywords: ["screen", "display", "monitor"] },
  { name: "Moon", component: Moon, category: "Media", keywords: ["dark mode", "night", "theme"] },
  { name: "Sun", component: Sun, category: "Media", keywords: ["light mode", "day", "brightness", "theme"] },
];

const CATEGORIES = [
  "All",
  "Navigation",
  "Actions",
  "Interface",
  "Status",
  "Social",
  "Media",
] as const;

export default function IconsShowcasePage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [strokeWidth, setStrokeWidth] = React.useState<number>(DEFAULT_ICON_STROKE_WIDTH);
  const [size, setSize] = React.useState<number>(DEFAULT_ICON_SIZE);
  const [intent, setIntent] = React.useState<"default" | "primary" | "accent" | "muted">("default");
  const [copiedIcon, setCopiedIcon] = React.useState<string | null>(null);

  const filteredIcons = React.useMemo(() => {
    return ICON_COLLECTION.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = (text: string, iconName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 1800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/design-system"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Design System</span>
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-sm font-semibold text-foreground">Icons</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-[4px] bg-pine-100/70 text-pine-800 dark:bg-pine-800/60 dark:text-[#A8E3D2] px-2.5 py-0.5 text-xs font-semibold">
              Lucide · 20x20px @ 1.5px
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
        {/* Intro */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent uppercase">
            <span>Iconography Standard</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Lucide Icon Set
          </h1>
          <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Standardized icon system for kohl.design built with Lucide. Pre-configured with a default optical size of{" "}
            <span className="font-semibold text-foreground">20×20px</span> and a graceful, refined stroke width of{" "}
            <span className="font-semibold text-foreground">1.5px</span>.
          </p>
        </div>

        {/* Live Controls Card */}
        <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Live Icon Customizer</h2>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              size: {size}px · stroke: {strokeWidth}px · intent: {intent}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stroke Width Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Stroke Width (Default: 1.5px)
              </label>
              <div className="flex items-center gap-2">
                {[1, 1.5, 2].map((sw) => (
                  <button
                    key={sw}
                    type="button"
                    onClick={() => setStrokeWidth(sw)}
                    className={`flex-1 py-1.5 px-3 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                      strokeWidth === sw
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {sw === 1.5 ? "1.5px (Default)" : `${sw}.0px`}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Size (Default: 20px)
              </label>
              <div className="flex items-center gap-2">
                {[
                  { val: 16, label: "16px" },
                  { val: 20, label: "20px (Default)" },
                  { val: 24, label: "24px" },
                  { val: 32, label: "32px" },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setSize(s.val)}
                    className={`flex-1 py-1.5 px-2 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                      size === s.val
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {s.val === 20 ? "20px" : s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Intent / Color Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Color Intent
              </label>
              <div className="flex items-center gap-2">
                {(
                  [
                    { id: "default", label: "Default" },
                    { id: "primary", label: "Pine" },
                    { id: "accent", label: "Crimson" },
                    { id: "muted", label: "Muted" },
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setIntent(c.id)}
                    className={`flex-1 py-1.5 px-2 rounded-[var(--radius-sm)] text-xs font-medium border transition-all cursor-pointer ${
                      intent === c.id
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search icons (e.g. arrow, sparkles, folder)..."
                className="w-full pl-9 pr-4 py-2 rounded-[var(--radius)] border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Icon Counter */}
            <div className="text-xs font-mono text-muted-foreground shrink-0 self-center">
              Showing {filteredIcons.length} of {ICON_COLLECTION.length} icons
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-pine-100/80 text-pine-900 dark:bg-pine-900/60 dark:text-[#A8E3D2] font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredIcons.map((item) => {
            const isCopied = copiedIcon === item.name;
            const snippet = `<Icon icon={${item.name}} />`;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => copyToClipboard(snippet, item.name)}
                className="group relative flex flex-col items-center justify-center p-4 rounded-[var(--radius)] border border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer active:scale-95 shadow-2xs h-28"
                title={`Click to copy: ${snippet}`}
              >
                {/* Visual Icon */}
                <div className="flex-1 flex items-center justify-center">
                  <Icon
                    icon={item.component}
                    size={size}
                    strokeWidth={strokeWidth}
                    intent={intent}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                </div>

                {/* Name & Copy Badge */}
                <div className="w-full text-center mt-2">
                  <span className="text-[11px] font-sans font-medium text-muted-foreground group-hover:text-foreground truncate block">
                    {item.name}
                  </span>
                </div>

                {/* Copied Overlay Badge */}
                {isCopied && (
                  <div className="absolute inset-0 rounded-[var(--radius)] bg-primary text-primary-foreground flex flex-col items-center justify-center gap-1 text-[11px] font-medium z-10 animate-in fade-in zoom-in-95 duration-150">
                    <Check className="size-4" strokeWidth={2} />
                    <span>Copied JSX!</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {filteredIcons.length === 0 && (
          <div className="p-12 text-center rounded-[var(--radius)] border border-dashed border-border text-muted-foreground space-y-2">
            <p className="text-sm font-medium">No icons match &quot;{searchQuery}&quot;</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs text-link hover:underline"
            >
              Clear search and filters
            </button>
          </div>
        )}

        {/* Code Guide & Implementation */}
        <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-6 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Usage & Code Patterns
            </h2>
            <p className="text-xs text-muted-foreground">
              How to use the default 20px / 1.5px stroke width Lucide specification in your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pattern 1: <Icon icon={...} /> */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Pattern 1 (Recommended)
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  The Design System &lt;Icon /&gt; Component
                </h3>
                <p className="text-xs text-muted-foreground">
                  Wrap any Lucide icon in the design system wrapper. Automatically enforces 20x20px and 1.5px stroke width.
                </p>
              </div>

              <pre className="rounded-[var(--radius-sm)] bg-neutral-900 dark:bg-black p-4 text-xs font-mono text-neutral-100 overflow-x-auto leading-relaxed">
{`import { Icon } from "@/components/ui/icon"
import { ArrowRight, Sparkles } from "lucide-react"

// Default (20px, 1.5px strokeWidth)
<Icon icon={ArrowRight} />

// With color intent or custom size
<Icon icon={Sparkles} intent="primary" size={24} />`}
              </pre>
            </div>

            {/* Pattern 2: Direct Lucide */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Pattern 2
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  Direct Lucide Import with System Constants
                </h3>
                <p className="text-xs text-muted-foreground">
                  Use Lucide directly while keeping consistent tokens via exported constants.
                </p>
              </div>

              <pre className="rounded-[var(--radius-sm)] bg-neutral-900 dark:bg-black p-4 text-xs font-mono text-neutral-100 overflow-x-auto leading-relaxed">
{`import { DEFAULT_ICON_SIZE, DEFAULT_ICON_STROKE_WIDTH } from "@/components/ui/icon"
import { ArrowRight } from "lucide-react"

<ArrowRight 
  size={DEFAULT_ICON_SIZE} /* 20 */
  strokeWidth={DEFAULT_ICON_STROKE_WIDTH} /* 1.5 */
  className="text-primary"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
