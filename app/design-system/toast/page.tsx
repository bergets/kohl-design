"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Info,
  Loader2,
  RotateCcw,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

export default function ToastShowcasePage() {
  const [mounted, setMounted] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [isSimulating, setIsSimulating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Simulated Promise flow
  const handlePromiseDemo = () => {
    setIsSimulating(true);
    const mockTask = new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        setIsSimulating(false);
        resolve({ name: "kohl-design-v1.3.tar.gz" });
      }, 2000);
    });

    toast.promise(mockTask, {
      loading: "Compiling design system shaders and token registry...",
      success: (data) => `Production build ready: ${data.name}`,
      error: "Failed to compile assets",
    });
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Toast Notifications
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          The gold-standard notification system created by Emil Kowalski. Powered by tactile spring stacking, natural momentum swipe-to-dismiss, automatic dark mode synchronization, and promise lifecycles.
        </p>
      </section>


        {/* Live Interactive Trigger Station */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">Interactive Toast Triggers</h2>
            <p className="text-xs text-muted-foreground">
              Click any button below to dispatch live toasts and test tactile swipe gestures, stacking, and keyboard dismissal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Default Message */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Default Informational</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">toast()</span>
                </div>
                <p className="text-xs text-muted-foreground">Standard single-line toast without explicit type icon.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast("Theme configuration updated")}
                className="w-full justify-between"
              >
                <span>Trigger Toast</span>
                <Bell className="size-3.5" />
              </Button>
            </div>

            {/* 2. Success Toast */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">Success with Description</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">toast.success()</span>
                </div>
                <p className="text-xs text-muted-foreground">High-contrast emerald badge with supporting subtitle copy.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast.success("Component published successfully", {
                    description: "Available immediately in your local registry.",
                  })
                }
                className="w-full justify-between border-emerald-500/30 hover:bg-emerald-500/10"
              >
                <span>Trigger Success</span>
                <CheckCircle2 className="size-3.5 text-emerald-500" />
              </Button>
            </div>

            {/* 3. Action Button Toast */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Interactive Action</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">action: &#123;...&#125;</span>
                </div>
                <p className="text-xs text-muted-foreground">Embedded tactile CTA button with callback execution.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast("Token preset archived", {
                    description: "Removed Sharp Tech from current session.",
                    action: {
                      label: "Undo",
                      onClick: () => toast.success("Archive undone!"),
                    },
                  })
                }
                className="w-full justify-between"
              >
                <span>Trigger Action Toast</span>
                <RotateCcw className="size-3.5" />
              </Button>
            </div>

            {/* 4. Warning Toast */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-amber-600 dark:text-amber-400">Warning State</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">toast.warning()</span>
                </div>
                <p className="text-xs text-muted-foreground">Amber alert for non-blocking concerns or pending items.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast.warning("Unsaved canvas modifications", {
                    description: "You have 3 unpublished token changes pending.",
                  })
                }
                className="w-full justify-between border-amber-500/30 hover:bg-amber-500/10"
              >
                <span>Trigger Warning</span>
                <AlertTriangle className="size-3.5 text-amber-500" />
              </Button>
            </div>

            {/* 5. Error Toast */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-red-600 dark:text-red-400">Error State</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">toast.error()</span>
                </div>
                <p className="text-xs text-muted-foreground">Red destructive notice for validation or network errors.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast.error("Failed to compile GLSL shader", {
                    description: "Unexpected token at fragment line 42.",
                  })
                }
                className="w-full justify-between border-red-500/30 hover:bg-red-500/10"
              >
                <span>Trigger Error</span>
                <XCircle className="size-3.5 text-red-500" />
              </Button>
            </div>

            {/* 6. Promise Lifecycle */}
            <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-primary">Promise Lifecycle</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">toast.promise()</span>
                </div>
                <p className="text-xs text-muted-foreground">Seamless transition: spinner → resolved data state.</p>
              </div>
              <Button
                variant="default"
                size="sm"
                disabled={isSimulating}
                onClick={handlePromiseDemo}
                className="w-full justify-between"
              >
                <span>{isSimulating ? "Simulating Task..." : "Simulate Promise"}</span>
                {isSimulating ? <Loader2 className="size-3.5 animate-spin" /> : <Zap className="size-3.5" />}
              </Button>
            </div>
          </div>
        </section>

        {/* Code Usage Reference */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">Developer Implementation & Code Recipes</h2>
            <p className="text-xs text-muted-foreground">
              Copy-paste ready snippets adhering to Emil Kowalski’s Sonner guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Setup Snippet */}
            <div className="rounded-[var(--radius)] border border-border bg-neutral-900 text-neutral-100 p-5 space-y-3 font-mono text-xs shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800 text-[11px]">
                <span>1. Root Setup (app/layout.tsx)</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { Toaster } from "@/components/ui/sonner"\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        {children}\n        <Toaster />\n      </body>\n    </html>\n  )\n}`,
                      "code-setup"
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode === "code-setup" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-neutral-300 leading-relaxed overflow-x-auto">
{`import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`}
              </pre>
            </div>

            {/* Client Call Snippet */}
            <div className="rounded-[var(--radius)] border border-border bg-neutral-900 text-neutral-100 p-5 space-y-3 font-mono text-xs shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800 text-[11px]">
                <span>2. Dispatch in Client Components</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { toast } from "sonner"\n\n// Simple notification\ntoast.success("Project saved")\n\n// Promise with auto-updating lifecycle\ntoast.promise(saveProject(), {\n  loading: "Saving...",\n  success: "Saved successfully!",\n  error: "Error saving project",\n})`,
                      "code-client"
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode === "code-client" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-neutral-300 leading-relaxed overflow-x-auto">
{`import { toast } from "sonner"

// Simple notification
toast.success("Project saved")

// Promise with auto-updating lifecycle
toast.promise(saveProject(), {
  loading: "Saving...",
  success: "Saved successfully!",
  error: "Error saving project",
})`}
              </pre>
            </div>
          </div>
        </section>

        {/* Sonner Design Engineering Principles */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">Design Engineering Principles (Emil Kowalski)</h2>
            <p className="text-xs text-muted-foreground">
              Core physical rules that make Sonner feel distinctly superior to traditional toast libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Single Root Mount Guarantee</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Only mount <code className="font-mono text-xs text-foreground">&lt;Toaster /&gt;</code> once in <code className="font-mono text-xs">layout.tsx</code>. Mounting per-page leads to duplicated toasts. Sonner works inside React Server Components and manages client portals automatically.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Physical Spring Stacking</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                When multiple toasts fire in succession, Sonner stacks them with physical depth, scaling older notifications down while expanding them on mouse hover without abrupt layout snapping.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Natural Gesture Momentum</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Users can swipe any notification away horizontally or vertically. The dismissal threshold calculates velocity rather than fixed distance, allowing quick flick gestures to dismiss naturally.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 space-y-3">
              <span className="font-semibold text-sm text-primary">Zero Layout Shift (Headless Core)</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Toasts render in an isolated fixed layer outside the main document flow. Content on the page never shifts or jumps when notifications enter or exit the viewport.
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
            <Link href="/design-system/card" className="hover:text-foreground transition-colors">
              Card
            </Link>
            <Link href="/design-system/badge" className="hover:text-foreground transition-colors">
              Badge & Status
            </Link>
            <Link href="/design-system/input" className="hover:text-foreground transition-colors">
              Input Field
            </Link>
          </div>
        </footer>
    </div>
  );
}
