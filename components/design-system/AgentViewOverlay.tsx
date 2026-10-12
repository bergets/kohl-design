"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Copy,
  Check,
  Terminal,
  ShieldAlert,
  ArrowRight,
  Code2,
  FileText,
  Sparkles,
  Layers,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Bot,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDesignSystem } from "./DesignSystemContext";
import { AGENT_SPECS, getAgentSpec, type AgentSpec } from "./agent-specs";
import { cn } from "@/lib/utils";

type SpecTab = "spec" | "prompt" | "markdown" | "code";

export function AgentViewOverlay() {
  const pathname = usePathname();
  const { setViewMode } = useDesignSystem();

  const spec = React.useMemo(() => getAgentSpec(pathname), [pathname]);

  const [activeTab, setActiveTab] = React.useState<SpecTab>("spec");
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = React.useState(false);
  const [copiedSnippet, setCopiedSnippet] = React.useState<number | null>(null);

  // Reset tab when path changes
  React.useEffect(() => {
    setActiveTab("spec");
  }, [pathname]);

  const copyCli = () => {
    if (!spec.installCommand) return;
    navigator.clipboard.writeText(spec.installCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(spec.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(spec.rawMarkdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const copySnippetCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(index);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl py-6 space-y-8 font-sans">
      {/* Top Banner: Page-specific Agent View Status */}
      <div className="rounded-[var(--radius)] border border-primary/30 bg-primary/5 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
              <Badge variant="default" size="sm" className="font-mono text-[10px]">
                Agent Spec • {spec.category}
              </Badge>
              {spec.componentName && (
                <span className="font-mono text-xs text-muted-foreground">
                  @/components/ui/{spec.componentName.toLowerCase()}
                </span>
              )}
            </div>
            <h1 className="font-cooper text-2xl font-normal text-foreground">
              {spec.title}
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              {spec.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              variant="default"
              size="sm"
              onClick={copyPrompt}
              className="flex items-center gap-1.5 text-xs font-semibold"
            >
              {copiedPrompt ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span>{copiedPrompt ? "Copied Prompt" : "Copy Page Prompt"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("human")}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <User className="size-3.5" />
              <span>Human View</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mode Tabs Component */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as SpecTab)}
        className="space-y-6"
      >
        <TabsList variant="underline">
          <TabsTrigger value="spec">
            <BookOpen className="size-3.5 mr-1.5" />
            <span>Specification & Rules</span>
          </TabsTrigger>
          <TabsTrigger value="prompt">
            <Bot className="size-3.5 mr-1.5" />
            <span>System Prompt</span>
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code2 className="size-3.5 mr-1.5" />
            <span>Code Examples</span>
          </TabsTrigger>
          <TabsTrigger value="markdown">
            <FileText className="size-3.5 mr-1.5" />
            <span>Raw Markdown</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Interactive Spec */}
        <TabsContent value="spec" className="space-y-8 mt-0">
          {/* Registry Install Command (if applicable) */}
          {spec.installCommand && (
            <Card variant="sunken" className="p-4 sm:p-5 space-y-2.5 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Registry Install Command</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyCli}
                  className="h-7 px-2 text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  {copiedCli ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  <span>{copiedCli ? "Copied" : "Copy"}</span>
                </Button>
              </div>
              <div className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-background/90 border border-border p-3 text-xs text-foreground overflow-x-auto">
                <Terminal className="size-3.5 shrink-0 text-primary" />
                <code className="select-all font-mono">{spec.installCommand}</code>
              </div>
              {spec.importStatement && (
                <div className="pt-1 text-[11px] text-muted-foreground flex items-center gap-2">
                  <span className="font-sans font-medium">Import:</span>
                  <code className="text-foreground bg-background px-1.5 py-0.5 rounded border border-border">
                    {spec.importStatement}
                  </code>
                </div>
              )}
            </Card>
          )}

          {/* Priority Order */}
          <section className="space-y-3">
            <h2 className="font-cooper text-lg text-foreground">Priority Order</h2>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-foreground font-medium rounded-[var(--radius)] border border-border bg-card p-4">
              {spec.priorityOrder.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          </section>

          {/* Component Props Table (if component) */}
          {spec.props && spec.props.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-cooper text-lg text-foreground">TypeScript Props API</h2>
              <div className="rounded-[var(--radius)] border border-border bg-card overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                      <th className="py-2.5 px-3.5 font-medium">Prop</th>
                      <th className="py-2.5 px-3.5 font-medium">Type</th>
                      <th className="py-2.5 px-3.5 font-medium">Default</th>
                      <th className="py-2.5 px-3.5 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-sans">
                    {spec.props.map((prop) => (
                      <tr key={prop.name} className="hover:bg-muted/30">
                        <td className="py-2.5 px-3.5 font-mono text-link font-semibold">
                          {prop.name}
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-[11px] text-muted-foreground">
                          {prop.type}
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-[11px] text-foreground">
                          {prop.default || "—"}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground leading-relaxed">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Component Variants (if component) */}
          {spec.variants && spec.variants.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-cooper text-lg text-foreground">Supported Variants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spec.variants.map((v) => (
                  <div
                    key={v.name}
                    className="rounded-[var(--radius)] border border-border bg-card p-3.5 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <code className="font-mono font-semibold text-link">{v.name}</code>
                      <Badge variant="secondary" size="sm" className="text-[10px]">
                        {v.role}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Agent Directives & Strict Rules */}
          <section className="space-y-3">
            <h2 className="font-cooper text-lg text-foreground">Strict Engineering Rules</h2>
            <div className="space-y-4">
              {spec.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="rounded-[var(--radius)] border border-border bg-card p-4 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-link">{rule.id}</span>
                      <span className="font-semibold text-foreground">{rule.title}</span>
                    </div>
                    <Badge
                      variant={rule.level === "MUST" ? "default" : "destructive"}
                      size="sm"
                    >
                      {rule.level}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{rule.rationale}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="rounded-[var(--radius-sm)] border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 p-3 space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-semibold">
                        <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Correct Pattern</span>
                      </div>
                      <pre className="text-emerald-950 dark:text-emerald-200 overflow-x-auto whitespace-pre-wrap">
                        {rule.good}
                      </pre>
                    </div>

                    <div className="rounded-[var(--radius-sm)] border border-red-500/30 bg-red-50/20 dark:bg-red-950/20 p-3 space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 text-red-900 dark:text-red-300 font-semibold">
                        <XCircle className="size-3.5 text-red-600 dark:text-red-400" />
                        <span>Anti-Pattern / Wrong</span>
                      </div>
                      <pre className="text-red-950 dark:text-red-200 overflow-x-auto whitespace-pre-wrap">
                        {rule.bad}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Anti-Slop Directives for this page */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-4 text-crimson-600" />
              <h2 className="font-cooper text-lg text-foreground">Anti-Slop Guardrails</h2>
            </div>
            <div className="rounded-[var(--radius)] border border-border bg-card p-4 space-y-2 text-xs">
              <ul className="space-y-2 text-muted-foreground">
                {spec.antiPatterns.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-crimson-600 font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </TabsContent>

        {/* Tab 2: System Prompt */}
        <TabsContent value="prompt" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Copy this high-density instruction snippet into your Cursor rules, Claude project knowledge, or agent prompt:
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={copyPrompt}
              className="flex items-center gap-1.5 text-xs font-semibold"
            >
              {copiedPrompt ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
            </Button>
          </div>
          <Card variant="sunken" className="p-4 sm:p-5">
            <pre className="font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed select-all">
              {spec.prompt}
            </pre>
          </Card>
        </TabsContent>

        {/* Tab 3: Code Examples */}
        <TabsContent value="code" className="space-y-6 mt-0">
          {spec.codeSnippets.map((snippet, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cooper text-base text-foreground">{snippet.title}</h3>
                  <p className="text-xs text-muted-foreground">{snippet.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copySnippetCode(snippet.code, index)}
                  className="h-8 px-2.5 text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  {copiedSnippet === index ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>{copiedSnippet === index ? "Copied" : "Copy TSX"}</span>
                </Button>
              </div>
              <Card variant="sunken" className="p-4 overflow-x-auto">
                <pre className="font-mono text-xs text-foreground leading-relaxed whitespace-pre">
                  {snippet.code}
                </pre>
              </Card>
            </div>
          ))}
        </TabsContent>

        {/* Tab 4: Raw Markdown */}
        <TabsContent value="markdown" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Raw Markdown documentation formatted for ingestion by LLMs:
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={copyMarkdown}
              className="flex items-center gap-1.5 text-xs"
            >
              {copiedMarkdown ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span>{copiedMarkdown ? "Copied" : "Copy Markdown"}</span>
            </Button>
          </div>
          <Card variant="sunken" className="p-4 sm:p-5">
            <pre className="font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed select-all">
              {spec.rawMarkdown}
            </pre>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
