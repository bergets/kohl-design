"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  Lock,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, InputGroup, InputAddon } from "@/components/ui/input";
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

export default function InputShowcasePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [activePreset, setActivePreset] = React.useState<ThemePreset>("default");

  // Playground state
  const [selectedVariant, setSelectedVariant] = React.useState<"default" | "filled" | "ghost">("default");
  const [selectedSize, setSelectedSize] = React.useState<"sm" | "default" | "lg">("default");
  const [inputValue, setInputValue] = React.useState("henrik@kohl.design");
  const [placeholderText, setPlaceholderText] = React.useState("Enter your email address...");
  const [hasError, setHasError] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isRequired, setIsRequired] = React.useState(true);
  const [leadingIconType, setLeadingIconType] = React.useState<"none" | "mail" | "search" | "user">("mail");
  const [showClearButton, setShowClearButton] = React.useState(true);

  // Demo interactive states
  const [showPassword, setShowPassword] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getLeadingIconJsx = () => {
    if (leadingIconType === "mail") return ' startIcon={<Mail className="size-4" />}';
    if (leadingIconType === "search") return ' startIcon={<Search className="size-4" />}';
    if (leadingIconType === "user") return ' startIcon={<User className="size-4" />}';
    return "";
  };

  const playgroundJsx = `<div className="space-y-1.5">
  <Label htmlFor="demo-input"${isRequired ? " required" : ""}${hasError ? " error" : ""}>Email Address</Label>
  <Input
    id="demo-input"
    type="email"
    variant="${selectedVariant}"
    inputSize="${selectedSize}"
    placeholder="${placeholderText}"
    value="${inputValue}"${getLeadingIconJsx()}${hasError ? "\n    error" : ""}${isDisabled ? "\n    disabled" : ""}
  />${hasError ? '\n  <p className="text-xs text-destructive">Please enter a valid business email.</p>' : ""}
</div>`;

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
              Input Field
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
            <span>Form & Text Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Input Field Component
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Accessible, tactile text input engineered for web and mobile. Built with dynamic tokenized corner radii, zero iOS-Safari auto-zoom font scales, Pine/Crimson focus rings, composable adornments, and error validation states.
          </p>
        </section>

        {/* Personality Preset Switcher */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
            <div>
              <h2 className="text-lg font-bold">Personality Presets</h2>
              <p className="text-xs text-muted-foreground">
                Observe how the input field adapts its derived radius, border colors, and ring geometry across brand profiles.
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
              Configure variants, sizes, icon adornments, and validation states in real time.
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
                <Label className="text-xs">Variant</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["default", "filled", "ghost"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`h-8 px-3 rounded-[var(--radius-sm)] text-xs font-medium capitalize border transition-all cursor-pointer ${
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

              {/* Size Selector */}
              <div className="space-y-2">
                <Label className="text-xs">Size</Label>
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
                      {s === "sm" ? "Small (32px)" : s === "default" ? "Default (36px)" : "Large (44px)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leading Icon Selector */}
              <div className="space-y-2">
                <Label className="text-xs">Leading Icon</Label>
                <div className="grid grid-cols-4 gap-2">
                  {(["none", "mail", "search", "user"] as const).map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setLeadingIconType(icon)}
                      className={`h-8 px-2 rounded-[var(--radius-sm)] text-xs font-medium capitalize border transition-all cursor-pointer ${
                        leadingIconType === icon
                          ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-border/80">
                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <span>Has Error State</span>
                  <input
                    type="checkbox"
                    checked={hasError}
                    onChange={(e) => setHasError(e.target.checked)}
                    className="size-4 accent-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <span>Disabled State</span>
                  <input
                    type="checkbox"
                    checked={isDisabled}
                    onChange={(e) => setIsDisabled(e.target.checked)}
                    className="size-4 accent-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <span>Required Field</span>
                  <input
                    type="checkbox"
                    checked={isRequired}
                    onChange={(e) => setIsRequired(e.target.checked)}
                    className="size-4 accent-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                  <span>Clear Button</span>
                  <input
                    type="checkbox"
                    checked={showClearButton}
                    onChange={(e) => setShowClearButton(e.target.checked)}
                    className="size-4 accent-primary rounded"
                  />
                </label>
              </div>
            </div>

            {/* Live Preview Area */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-[var(--radius)] border border-border bg-card p-8 sm:p-12 flex flex-col justify-center min-h-[280px] shadow-xs space-y-6">
                <div className="max-w-md w-full mx-auto space-y-2">
                  <Label htmlFor="playground-input" required={isRequired} error={hasError}>
                    Email Address
                  </Label>
                  <Input
                    id="playground-input"
                    type="email"
                    variant={selectedVariant}
                    inputSize={selectedSize}
                    placeholder={placeholderText}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isDisabled}
                    error={hasError}
                    startIcon={
                      leadingIconType === "mail" ? (
                        <Mail />
                      ) : leadingIconType === "search" ? (
                        <Search />
                      ) : leadingIconType === "user" ? (
                        <User />
                      ) : undefined
                    }
                    endIcon={
                      showClearButton && inputValue ? (
                        <button
                          type="button"
                          onClick={() => setInputValue("")}
                          aria-label="Clear input"
                          className="hover:text-foreground text-muted-foreground transition-colors cursor-pointer p-0.5 rounded"
                        >
                          <X className="size-3.5" />
                        </button>
                      ) : undefined
                    }
                  />
                  {hasError ? (
                    <p className="text-xs text-destructive flex items-center gap-1 font-medium">
                      <span>Please enter a valid business email address.</span>
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      We’ll send project updates and token release notifications.
                    </p>
                  )}
                </div>
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

        {/* Visual Gallery: Variants */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">1. Visual Variants</h2>
            <p className="text-xs text-muted-foreground">
              Three distinct styles tailored for high-contrast cards, muted canvas surfaces, and minimal editorial layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Default Outline */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Default Outline</span>
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">variant="default"</span>
                </div>
                <p className="text-xs text-muted-foreground">Standard 1px border with crisp focus ring and light depth shadow.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="var-default">Project Name</Label>
                <Input id="var-default" placeholder="e.g. Kohl Design System" />
              </div>
            </div>

            {/* Filled / Sunken */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Filled (Sunken)</span>
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">variant="filled"</span>
                </div>
                <p className="text-xs text-muted-foreground">Soft background tint that lifts to white on focus.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="var-filled">Workspace Slug</Label>
                <Input id="var-filled" variant="filled" placeholder="acme-corp" />
              </div>
            </div>

            {/* Ghost Underline */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Ghost (Underline)</span>
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">variant="ghost"</span>
                </div>
                <p className="text-xs text-muted-foreground">Borderless with a clean bottom underline for editorial and hero forms.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="var-ghost">Headline Note</Label>
                <Input id="var-ghost" variant="ghost" placeholder="Type an editorial headline..." />
              </div>
            </div>
          </div>
        </section>

        {/* Visual Gallery: Sizes */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">2. Optical Sizes</h2>
            <p className="text-xs text-muted-foreground">
              Proportioned heights mapped to button scale: Small (32px), Default (36px), and Large (44px).
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
            {/* Small */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="size-sm" className="text-xs">Small (32px / inputSize="sm")</Label>
                <span className="text-[10px] font-mono text-muted-foreground">Toolbar & Dense Tables</span>
              </div>
              <Input
                id="size-sm"
                inputSize="sm"
                placeholder="Filter search..."
                startIcon={<Search />}
              />
            </div>

            {/* Default */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="size-default" className="text-xs">Default (36px / inputSize="default")</Label>
                <span className="text-[10px] font-mono text-muted-foreground">Standard Form Controls</span>
              </div>
              <Input
                id="size-default"
                inputSize="default"
                placeholder="Search components or tokens..."
                startIcon={<Search />}
              />
            </div>

            {/* Large */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="size-lg" className="text-xs">Large (44px / inputSize="lg")</Label>
                <span className="text-[10px] font-mono text-muted-foreground">Hero Fields & Mobile Safe</span>
              </div>
              <Input
                id="size-lg"
                inputSize="lg"
                placeholder="What are you designing today?"
                startIcon={<Search />}
              />
            </div>
          </div>
        </section>

        {/* Visual Gallery: Adornments & Icon Patterns */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">3. Adornments, Suffixes & Micro-Interactions</h2>
            <p className="text-xs text-muted-foreground">
              Built-in icon offsets, password visibility toggles, clear triggers, and keyboard shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password with Toggle */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="font-semibold text-sm">Password Visibility Toggle</span>
                <p className="text-xs text-muted-foreground">Clicking the eye icon toggles text masking with tactile state change.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pw-demo">Master Password</Label>
                <Input
                  id="pw-demo"
                  type={showPassword ? "text" : "password"}
                  defaultValue="KohlDesign2026!"
                  startIcon={<Lock />}
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="hover:text-foreground text-muted-foreground transition-colors cursor-pointer p-0.5 rounded"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  }
                />
              </div>
            </div>

            {/* Search with Shortcut */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="font-semibold text-sm">Search with Shortcut Badge</span>
                <p className="text-xs text-muted-foreground">Visual shortcut affordance informs users of keyboard accelerator.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="search-shortcut">Global Command Search</Label>
                <Input
                  id="search-shortcut"
                  placeholder="Jump to skill or project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startIcon={<Search />}
                  endIcon={
                    searchQuery ? (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear query"
                        className="hover:text-foreground text-muted-foreground transition-colors cursor-pointer p-0.5 rounded"
                      >
                        <X className="size-3.5" />
                      </button>
                    ) : (
                      <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted border border-border/80 rounded-[var(--radius-sm)]">
                        ⌘K
                      </kbd>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Visual Gallery: Composable InputGroup */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">4. Composable Input Groups</h2>
            <p className="text-xs text-muted-foreground">
              Combine static addons, URL protocols, and inline submit buttons with unified focus rings using <code className="font-mono text-xs">InputGroup</code> and <code className="font-mono text-xs">InputAddon</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* URL Prefix */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="font-semibold text-sm">Static Protocol Addon</span>
                <p className="text-xs text-muted-foreground">Subdomain / slug configuration with attached static protocol.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug-demo">Portfolio URL</Label>
                <InputGroup>
                  <InputAddon placement="left">https://</InputAddon>
                  <Input
                    id="slug-demo"
                    variant="ghost"
                    placeholder="henrik"
                    className="px-3 border-0 rounded-none focus-visible:ring-0"
                  />
                  <InputAddon placement="right">.kohl.design</InputAddon>
                </InputGroup>
              </div>
            </div>

            {/* Newsletter with Attached Button */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="font-semibold text-sm">Inline Action Submission</span>
                <p className="text-xs text-muted-foreground">Seamless newsletter bar with embedded primary button.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sub-email">Stay in the loop</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="sub-email"
                    placeholder="designer@company.com"
                    startIcon={<Mail />}
                  />
                  <Button variant="default" className="shrink-0 gap-1.5">
                    <span>Subscribe</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Form Pattern */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">5. Complete Form Flow Pattern</h2>
            <p className="text-xs text-muted-foreground">
              Production-ready multi-field card showing field labels, required asterisks, helper notes, and live submission states.
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-[var(--radius-lg)] border border-border bg-card p-8 space-y-6 shadow-sm">
            <div className="space-y-1 border-b border-border/80 pb-4">
              <div className="flex items-center gap-2 text-primary font-medium text-xs">
                <CheckCircle2 className="size-4" />
                <span>Verified Design Contract</span>
              </div>
              <h3 className="text-xl font-bold">Start a Design Engineering Project</h3>
              <p className="text-xs text-muted-foreground">
                Inquire about product area design leadership, token systems, or motion audits.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="lead-name" required>Your Name</Label>
                <Input id="lead-name" placeholder="Henrik Kohl" startIcon={<User />} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lead-email" required>Work Email</Label>
                <Input id="lead-email" type="email" placeholder="henrik@company.se" startIcon={<Mail />} />
                <p className="text-[11px] text-muted-foreground">We reply within 24 hours.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lead-website">Company or Product URL</Label>
                <Input id="lead-website" placeholder="https://company.com" startIcon={<Globe />} />
              </div>

              <div className="pt-2">
                <Button variant="default" className="w-full gap-2 h-10">
                  <span>Send Project Inquiry</span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Design Engineering & Accessibility Specifications */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-xl font-bold">6. Design Engineering & Accessibility Spec</h2>
            <p className="text-xs text-muted-foreground">
              Hard-won invisible details that elevate Kohl Design System form controls above generic UI kits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Mobile Auto-Zoom Defense</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                iOS Safari automatically triggers an unpleasant camera zoom if an input’s font size is below 16px. Our inputs use <code className="font-mono text-xs text-foreground">text-base sm:text-sm</code> so phones stay steady while desktop displays retain crisp compact typography.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Concentric Radius Integration</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Inputs inherit <code className="font-mono text-xs text-foreground">var(--radius)</code> dynamically. When rendered inside a parent card (<code className="font-mono text-xs">var(--radius-lg)</code>), the corner curves flow optically without optical dissonance.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">WCAG Focus-Visible Contrast</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Focus rings utilize Pine 600 / Crimson tokens with <code className="font-mono text-xs text-foreground">focus-visible:ring-2</code> and a transparent offset layer. Mouse clicks don’t cause jarring persistent blue rings; keyboard navigation produces 3:1+ high contrast indicators.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Native ARIA Standards</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Passing <code className="font-mono text-xs text-foreground">error</code> sets <code className="font-mono text-xs text-foreground">aria-invalid="true"</code>, alerting screen readers immediately. Labels bind via <code className="font-mono text-xs text-foreground">htmlFor</code> to ensure 100% accessible touch click areas.
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
            <Link href="/design-system/surfaces" className="hover:text-foreground transition-colors">
              Surfaces
            </Link>
            <Link href="/design-system/icons" className="hover:text-foreground transition-colors">
              Icons
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
