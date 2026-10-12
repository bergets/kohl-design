import * as React from "react";
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Anti-Slop Guide — Kohl Design System",
  description: "Explicit rules to prevent AI-generated interface clichés.",
};

const ANTI_SLOP_RULES = [
  {
    id: "anti-slop-no-eyebrows",
    name: "No Small Eyebrows",
    level: "NEVER",
    summary: "Never put a tiny uppercase category or number (e.g. OVERVIEW, 01) above a title.",
    rationale: "The headline already names the section. Eyebrows add a redundant voice saying less.",
    correct: `<h2 className="font-cooper text-2xl font-normal">Recent Activity</h2>`,
    wrong: `<p className="text-xs uppercase tracking-widest text-muted-foreground">OVERVIEW</p>
<h2>Recent Activity</h2>`,
  },
  {
    id: "anti-slop-no-stat-cards",
    name: "No 3-Column Stat Card Rows",
    level: "NEVER",
    summary: "Never build a row of identical boxed cards each holding one giant number and a colored icon square.",
    rationale: "Equal boxes make every number equally loud. Group numbers naturally in an editorial summary sentence, dense list, or timeline.",
    correct: `<div className="flex items-baseline gap-2">
  <span className="text-3xl font-semibold">14h 20m</span>
  <span className="text-sm text-muted-foreground">total nap time logged today</span>
</div>`,
    wrong: `<Card><Icon /><h3>Total</h3><p>14h</p></Card>
<Card><Icon /><h3>Avg</h3><p>2h</p></Card>
<Card><Icon /><h3>Streak</h3><p>5d</p></Card>`,
  },
  {
    id: "anti-slop-earn-surface",
    name: "Earn Your Surface (Never Card in Card)",
    level: "MUST",
    summary: "Group with whitespace first. Use a Card only around actionable units, and NEVER nest a Card inside another Card.",
    rationale: "Nesting cards destroys the 5-layer elevation system and creates visual clutter.",
    correct: `<section className="space-y-4">
  <h2>Settings</h2>
  <div className="space-y-2">...</div>
</section>`,
    wrong: `<Card>
  <Card>Nested content</Card>
</Card>`,
  },
  {
    id: "anti-slop-no-decoration",
    name: "No Random Gradients or Blob Blur",
    level: "NEVER",
    summary: "Never use background gradients, floating blur blobs, or colored side rails (border-l-4).",
    rationale: "Kohl's craft comes from Cooper typography, deep Midnight Pine surfaces, and intentional elevation. Random gradients look cheap.",
    correct: `<div className="bg-background text-foreground">`,
    wrong: `<div className="bg-gradient-to-r from-pine-900 to-crimson-900 blur-2xl">`,
  },
  {
    id: "anti-slop-no-cooper-body",
    name: "Cooper is Headline-Only",
    level: "NEVER",
    summary: "Never apply font-cooper to body copy, tables, form fields, badges, or buttons.",
    rationale: "Cooper is a characterful display serif. In small UI or body paragraphs, it impairs reading speed and legibility.",
    correct: `Display: <h1 className="font-cooper text-3xl">Title</h1>
Body: <p className="font-sans text-sm">Description text</p>`,
    wrong: `<p className="font-cooper text-xs">Description text</p>
<Button className="font-cooper">Submit</Button>`,
  },
  {
    id: "anti-slop-no-scroll-reveal",
    name: "No Scroll Entrance Reveals",
    level: "NEVER",
    summary: "Never add whileInView fade or slide animations that hide content until the user scrolls.",
    rationale: "Content that hides until scrolled slows down users and causes layout jumping.",
    correct: `<section className="space-y-3">...</section>`,
    wrong: `<motion.section whileInView={{ opacity: 1, y: 0 }}>`,
  },
  {
    id: "anti-slop-no-emoji",
    name: "No Emoji in UI Controls",
    level: "NEVER",
    summary: "Never use emoji in titles, buttons, or badges.",
    rationale: "Emoji render unpredictably across platforms and diminish professional software polish. Use standardized Lucide icons.",
    correct: `<Button variant="default">Record nap</Button>`,
    wrong: `<Button variant="default">Record nap 💤</Button>`,
  },
  {
    id: "anti-slop-no-height-mismatch",
    name: "No Mismatched Control Heights in Rows",
    level: "NEVER",
    summary: "Never mix mismatched control heights or ad-hoc pixel padding in the same horizontal row.",
    rationale: "Buttons, Segmented Tabs, Toggles, and Inputs must share the same size prop (xs: 28px, sm: 32px, default: 36px, lg: 40px) so their top and bottom baselines align with zero optical jitter.",
    correct: `<div className="flex items-center gap-2">
  <Input size="default" placeholder="Search..." />
  <Tabs defaultValue="all"><TabsList size="default">...</TabsList></Tabs>
  <Button size="default">Create</Button>
</div>`,
    wrong: `<div className="flex items-center gap-2">
  <Input size="default" />
  <Button size="sm">Create</Button>
</div>`,
  },
];

export default function AntiSlopPage() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-crimson-600 dark:text-crimson-400">
          <ShieldAlert className="size-4" />
          <span>Foundation Directives</span>
        </div>
        <h1 className="font-cooper text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
          The Anti-Slop Guide
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          The explicit habits of generated AI interfaces to avoid, and the exact patterns to use instead. Modeled directly on the proven specification from Lime on design.how.
        </p>
      </div>

      {/* Rules List */}
      <div className="space-y-6">
        {ANTI_SLOP_RULES.map((rule, idx) => (
          <Card key={rule.id} variant="default" className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {rule.name}
                </h3>
              </div>
              <Badge
                variant={rule.level === "NEVER" ? "destructive" : "default"}
                size="sm"
                className="w-fit"
              >
                {rule.level}
              </Badge>
            </div>

            <p className="text-sm text-foreground leading-relaxed">
              {rule.summary}
            </p>
            <p className="text-xs text-muted-foreground italic">
              Why: {rule.rationale}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              {/* Correct Block */}
              <div className="rounded-[var(--radius-sm)] border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-sans font-semibold text-xs">
                  <CheckCircle2 className="size-3.5" />
                  <span>Correct</span>
                </div>
                <pre className="text-emerald-900 dark:text-emerald-200 overflow-x-auto whitespace-pre-wrap text-[11px] leading-relaxed">
                  {rule.correct}
                </pre>
              </div>

              {/* Wrong Block */}
              <div className="rounded-[var(--radius-sm)] border border-red-500/30 bg-red-50/20 dark:bg-red-950/20 p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-sans font-semibold text-xs">
                  <XCircle className="size-3.5" />
                  <span>Wrong</span>
                </div>
                <pre className="text-red-900 dark:text-red-200 overflow-x-auto whitespace-pre-wrap text-[11px] leading-relaxed">
                  {rule.wrong}
                </pre>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
