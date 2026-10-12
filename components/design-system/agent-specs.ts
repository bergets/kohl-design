export interface AgentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface AgentVariant {
  name: string;
  description: string;
  role: string;
}

export interface AgentRule {
  id: string;
  level: "MUST" | "NEVER" | "SHOULD";
  title: string;
  rationale: string;
  good: string;
  bad: string;
}

export interface AgentCodeSnippet {
  title: string;
  description: string;
  code: string;
}

export interface AgentSpec {
  id: string;
  path: string;
  title: string;
  componentName?: string;
  category: "Components" | "Foundations" | "System" | "Distribution";
  summary: string;
  installCommand?: string;
  importStatement?: string;
  registryUrl?: string;
  priorityOrder: string[];
  props?: AgentProp[];
  variants?: AgentVariant[];
  rules: AgentRule[];
  antiPatterns: string[];
  codeSnippets: AgentCodeSnippet[];
  prompt: string;
  rawMarkdown: string;
}

export const AGENT_SPECS: Record<string, AgentSpec> = {
  "/design-system": {
    id: "system",
    path: "/design-system",
    title: "Kohl Design System Architecture",
    category: "System",
    summary:
      "A high-craft design system featuring deep Pine surfaces (#005243 / #011d18), Cooper serif display titles, Crimson Coral accents (#93484f), and a strict 5-layer elevation model.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/index.json",
    registryUrl: "https://kohl.design/r/index.json",
    priorityOrder: [
      "1. Accessibility & keyboard rings (2px focus-visible rings, touch targets >= 44px, ARIA).",
      "2. Tokens by role, never raw hex codes (bg-primary, bg-card, --color-pine-*, --line).",
      "3. Existing components from @/components/ui, never hand-rolled copies.",
      "4. Typography & elevation: font-cooper for display titles only, font-sans for UI, Levels 0–4.",
      "5. Polish: Subtle hover lift (-translate-y-0.5), border glow, spring transitions.",
    ],
    rules: [
      {
        id: "kohl-components-first",
        level: "MUST",
        title: "Use UI primitives from @/components/ui",
        rationale: "Components encapsulate focus rings, elevation, accessibility, and token bindings.",
        good: `import { Button } from "@/components/ui/button";\n\n<Button variant="default">Save changes</Button>`,
        bad: `<button className="rounded px-4 py-2 bg-[#005243] text-white">Save changes</button>`,
      },
      {
        id: "kohl-tokens-only",
        level: "MUST",
        title: "Use semantic tokens, never raw hex or generic grays",
        rationale: "Arbitrary colors break dark mode, theme toggling, and contrast compliance.",
        good: `<div className="bg-background text-foreground border-border">`,
        bad: `<div className="bg-[#011d18] text-[#f2f2f2] border-zinc-800">`,
      },
      {
        id: "kohl-one-action",
        level: "MUST",
        title: "One primary Pine or Crimson action per screen",
        rationale: "Multiple primary buttons cause decision fatigue and dilute call-to-action clarity.",
        good: `<div className="flex gap-2">\n  <Button variant="default">Deploy service</Button>\n  <Button variant="secondary">Cancel</Button>\n</div>`,
        bad: `<div className="flex gap-2">\n  <Button variant="default">Deploy service</Button>\n  <Button variant="default">Save draft</Button>\n</div>`,
      },
      {
        id: "kohl-font-hierarchy",
        level: "MUST",
        title: "Cooper for hero titles; DM Sans for all UI and body",
        rationale: "Cooper is an expressive serif display face. Using it for UI controls impairs legibility.",
        good: `<h1 className="font-cooper text-3xl font-normal">Active Session</h1>\n<p className="font-sans text-sm text-muted-foreground">Elapsed: 45 min</p>`,
        bad: `<button className="font-cooper text-sm">Submit Form</button>`,
      },
      {
        id: "kohl-unified-control-sizing",
        level: "MUST",
        title: "Synchronize control heights in horizontal rows",
        rationale: "Buttons, Segmented Tabs, Toggles, and Inputs must share the same size variant (xs: 28px, sm: 32px, default: 36px, lg: 40px, xl: 48px) to prevent vertical jitter and baseline mismatch.",
        good: `<div className="flex items-center gap-2">\n  <Input size="default" placeholder="Search..." />\n  <Tabs defaultValue="all"><TabsList size="default">...</TabsList></Tabs>\n  <Button size="default">Create</Button>\n</div>`,
        bad: `<div className="flex items-center gap-2">\n  <Input size="default" />\n  <Button size="sm">Create</Button>\n</div>`,
      },
    ],
    antiPatterns: [
      "Small uppercase category eyebrows (e.g. 'OVERVIEW', '01 - INTRO') above headlines.",
      "Rows of 3 identical stat cards with colored icon boxes.",
      "Nesting <Card> inside another <Card>.",
      "Background gradients, floating blur blobs, or colored side rails (border-l-4).",
      "Using emoji in buttons, badges, or title labels.",
      "Scroll entrance reveals (whileInView) that delay reading.",
      "Mixing mismatched control heights in the same row (e.g. Button size='sm' next to Input size='default'). Always use matching size props.",
    ],
    codeSnippets: [
      {
        title: "Standard Page Layout Shell",
        description: "Canonical layout structure for all Kohl views",
        code: `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8 font-sans">
        <header className="space-y-2">
          <h1 className="font-cooper text-3xl font-normal tracking-tight">Project Overview</h1>
          <p className="text-sm text-muted-foreground">Manage your workspace environments and telemetry.</p>
        </header>

        <Card variant="default" className="p-6 space-y-4">
          <h2 className="font-cooper text-xl font-normal">Active Deployment</h2>
          <p className="text-sm text-muted-foreground">Region: eu-west-1 • Node v22.1</p>
          <div className="flex gap-2 pt-2">
            <Button variant="default">Trigger deployment</Button>
            <Button variant="outline">View logs</Button>
          </div>
        </Card>
      </main>
    </div>
  );
}`,
      },
    ],
    prompt: `You are generating code for the Kohl Design System.
Core Rules:
1. Prioritize accessibility: 2px focus-visible rings (ring-2 ring-primary ring-offset-2), touch targets >= 44px.
2. Tokens by role: bg-background (Canvas), bg-card (Surface), bg-popover (Overlay), bg-muted (Well). Brand scales: pine-*, crimson-*, neutral-*. Never use arbitrary hex colors or generic grays (zinc, slate).
3. Import components from @/components/ui/button, @/components/ui/card, @/components/ui/badge, etc.
4. Font hierarchy: font-cooper ONLY for display titles and section headers. font-sans for body text, buttons, tables, badges.
5. One primary Pine (variant="default") or Crimson (variant="accent") button per view; all others are secondary/outline/ghost.
6. Anti-Slop: NEVER small uppercase category eyebrows, NEVER 3 identical stat cards, NEVER card-in-card nesting, NEVER gradients/blobs, NEVER emoji in UI.`,
    rawMarkdown: `# Kohl Design System — Architecture Specification

- **Primary Brand:** Midnight Pine (#005243 light, #011d18 dark canvas)
- **Accent Brand:** Crimson Coral (#93484f light, #420006 dark)
- **Typography:** Cooper Regular for display titles, DM Sans for UI and copy
- **Elevation Layers:** Level 0 (Canvas), Level 1 (Surface), Level 2 (Overlay), Level 3 (Well), Level 4 (Frosted Glass)
- **Anti-Slop:** Zero decorative clutter, whitespace-first grouping, sentence-case copy`,
  },

  "/design-system/button": {
    id: "button",
    path: "/design-system/button",
    title: "Button Component Specification",
    componentName: "Button",
    category: "Components",
    summary:
      "Primary interaction control supporting 8 variants, 8 sizes, async loading spinner, icon slots, and slot delegation via Radix Slot.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/button.json",
    importStatement: `import { Button } from "@/components/ui/button";`,
    registryUrl: "https://kohl.design/r/button.json",
    priorityOrder: [
      "1. Keyboard & focus: 2px ring with ring-offset-2 on focus-visible.",
      "2. One primary button per view: Pine ('default') or Crimson ('accent'); all others secondary, outline, or ghost.",
      "3. Sentence case: 'Create deployment', never 'CREATE DEPLOYMENT' or emoji.",
      "4. Built-in loading: use loading={isLoading} instead of manual spinner nesting.",
    ],
    props: [
      { name: "variant", type: '"default" | "accent" | "editorial" | "secondary" | "outline" | "ghost" | "link" | "destructive"', default: '"default"', description: "Visual style of the button." },
      { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | "icon-xl"', default: '"default"', description: "Unified control height: xs (28px), sm (32px), default (36px), lg (40px), xl (48px)." },
      { name: "loading", type: "boolean", default: "false", description: "Shows spinning Loader2, disables interactions, preserves size." },
      { name: "asChild", type: "boolean", default: "false", description: "Renders child element (e.g. Next.js Link) while maintaining button styling." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and reduces opacity to 50%." },
    ],
    variants: [
      { name: "default", description: "Midnight Forest Pine primary fill. Single primary action per view.", role: "Primary CTA" },
      { name: "accent", description: "Crimson Coral accent fill for bold alternative CTAs.", role: "Accent CTA" },
      { name: "editorial", description: "Soft cashmere crimson wash with subtle border for secondary warm actions.", role: "Editorial" },
      { name: "secondary", description: "Neutral filled surface with subtle border.", role: "Secondary" },
      { name: "outline", description: "Transparent background with 1px border. For equal-weight choices.", role: "Secondary / Utility" },
      { name: "ghost", description: "Zero border or background until hovered. For toolbars and table rows.", role: "Subtle" },
      { name: "link", description: "Underlined text link styled as button.", role: "Navigation" },
      { name: "destructive", description: "Red fill for irreversible destructive actions (delete, drop, revoke).", role: "Danger" },
    ],
    rules: [
      {
        id: "btn-one-primary",
        level: "MUST",
        title: "Maximum of ONE primary button per view",
        rationale: "Having multiple pine or crimson buttons makes it impossible for the user to determine the principal action.",
        good: `<div className="flex gap-2">\n  <Button variant="default">Publish post</Button>\n  <Button variant="outline">Save draft</Button>\n</div>`,
        bad: `<div className="flex gap-2">\n  <Button variant="default">Publish post</Button>\n  <Button variant="default">Save draft</Button>\n</div>`,
      },
      {
        id: "btn-sentence-case",
        level: "MUST",
        title: "Write button labels in sentence case with action verbs",
        rationale: "ALL CAPS reduces scanning speed; vague text like 'OK' lacks intent context.",
        good: `<Button>Send invitation</Button>`,
        bad: `<Button>SEND INVITATION 🚀</Button>`,
      },
      {
        id: "btn-loading-state",
        level: "MUST",
        title: "Use the loading prop for asynchronous actions",
        rationale: "The loading prop handles aria-disabled, pointer-events, and layout shift prevention automatically.",
        good: `<Button loading={isSubmitting}>Save record</Button>`,
        bad: `<Button disabled={isSubmitting}>{isSubmitting && <Spinner />} Save record</Button>`,
      },
    ],
    antiPatterns: [
      "Using emoji in button labels (e.g. 'Deploy 🚀' or 'Delete ❌').",
      "Setting font-cooper on a Button (buttons must always use font-sans).",
      "Hand-rolling an inline <button> with arbitrary hex backgrounds like bg-[#005243].",
      "Using small sizes without ensuring a 44x44px touch target on mobile.",
    ],
    codeSnippets: [
      {
        title: "Primary Action with Secondary Alternative",
        description: "Standard primary/secondary pairing pattern",
        code: `import { Button } from "@/components/ui/button";

export function ActionGroup() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="default">Create workspace</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  );
}`,
      },
      {
        title: "Async Submission with Loading State",
        description: "Correct handling of pending asynchronous operations",
        code: `import * as React from "react";
import { Button } from "@/components/ui/button";

export function SubmitForm() {
  const [submitting, setSubmitting] = React.useState(false);

  return (
    <Button
      variant="default"
      loading={submitting}
      onClick={async () => {
        setSubmitting(true);
        await saveProfile();
        setSubmitting(false);
      }}
    >
      Save changes
    </Button>
  );
}`,
      },
    ],
    prompt: `You are implementing buttons using the Kohl Design System.
Rules:
- Import from "@/components/ui/button".
- Use ONE primary Pine button (variant="default") or Crimson (variant="accent") per screen; all others must be secondary, outline, or ghost.
- Write labels in sentence case starting with an action verb (e.g. "Save changes", "Send invite"). Never ALL CAPS, never emoji.
- For async work, pass loading={isLoading}.
- Never use font-cooper on buttons; buttons strictly use font-sans.`,
    rawMarkdown: `# Kohl Button Specification

- **Import:** \`import { Button } from "@/components/ui/button";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/button.json\`
- **Variants:** \`default\` (Pine CTA), \`accent\` (Crimson CTA), \`editorial\`, \`secondary\`, \`outline\`, \`ghost\`, \`destructive\`, \`link\`
- **Sizes:** \`default\` (h-8), \`sm\` (h-7), \`lg\` (h-10), \`xl\` (h-12), \`icon\` (32px), \`icon-sm\` (28px), \`icon-lg\` (40px)
- **Rules:** Max 1 primary per view, sentence case, built-in loading spinner, 2px focus ring.`,
  },

  "/design-system/card": {
    id: "card",
    path: "/design-system/card",
    title: "Card Component Specification",
    componentName: "Card",
    category: "Components",
    summary:
      "Surface container mapping directly to Kohl's 5 elevation layers. Provides default, elevated, interactive, sunken, and glass variants.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/card.json",
    importStatement: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";`,
    registryUrl: "https://kohl.design/r/card.json",
    priorityOrder: [
      "1. Anti-slop: NEVER nest a <Card> inside another <Card>.",
      "2. Group with whitespace first; use a Card only around cohesive units the user directly acts upon.",
      "3. Respect elevation layers: Level 1 (default), Level 2 (elevated), Level 3 (sunken), Level 4 (glass).",
      "4. Concentric border radius math: R_inner = max(0, R_outer - padding).",
    ],
    props: [
      { name: "variant", type: '"default" | "elevated" | "interactive" | "sunken" | "glass"', default: '"default"', description: "Elevation layer and interaction mode." },
      { name: "className", type: "string", description: "Additional Tailwind CSS utility classes." },
    ],
    variants: [
      { name: "default", description: "Level 1 Surface. bg-card with 1px border. The primary grouping container.", role: "Primary Surface" },
      { name: "elevated", description: "Level 2 Overlay. Lifted with shadow-md. For dialogs, popovers, and floating drawers.", role: "Overlay Surface" },
      { name: "interactive", description: "Clickable surface with subtle hover lift (-translate-y-0.5) and border glow.", role: "Clickable Card" },
      { name: "sunken", description: "Level 3 Recessed Well. bg-muted/60 with inset border. For code blocks and data displays.", role: "Recessed Well" },
      { name: "glass", description: "Level 4 Frosted Glass. bg-background/80 with backdrop-blur-md.", role: "Sticky Chrome" },
    ],
    rules: [
      {
        id: "card-never-nested",
        level: "NEVER",
        title: "Never nest Card inside another Card",
        rationale: "Card-in-card nesting flattens the interface into claustrophobic boxes and ruins elevation layering.",
        good: `<Card variant="default" className="p-6 space-y-4">\n  <h3 className="font-cooper text-lg">Billing History</h3>\n  <div className="divide-y divide-border">\n    <div className="py-2.5">Invoice #1024</div>\n    <div className="py-2.5">Invoice #1025</div>\n  </div>\n</Card>`,
        bad: `<Card variant="default">\n  <Card variant="default">\n    <div>Invoice #1024</div>\n  </Card>\n</Card>`,
      },
      {
        id: "card-interactive-links",
        level: "MUST",
        title: "Use interactive variant for clickable cards",
        rationale: "The interactive variant provides the standard Kohl -translate-y-0.5 hover lift and border transition.",
        good: `<Card variant="interactive" className="p-5 cursor-pointer">\n  <h4>Project Alfa</h4>\n</Card>`,
        bad: `<Card className="hover:scale-105 hover:shadow-2xl">\n  <h4>Project Alfa</h4>\n</Card>`,
      },
    ],
    antiPatterns: [
      "Laying out a row of 3 identical stat cards with colored icon boxes.",
      "Card-in-card nesting.",
      "Adding neon glowing shadow effects or gradients to card backgrounds.",
      "Applying font-cooper to card body copy or metadata.",
    ],
    codeSnippets: [
      {
        title: "Standard Form / Panel Card",
        description: "Cohesive grouping unit with header and footer",
        code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProfileCard() {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Team preferences</CardTitle>
        <CardDescription>Manage how your members access shared projects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground">Standard seat allocation: 5 members</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="default">Update settings</Button>
      </CardFooter>
    </Card>
  );
}`,
      },
    ],
    prompt: `You are implementing surfaces using Kohl Card.
Rules:
- Import from "@/components/ui/card".
- Use variant="default" for standard surfaces, variant="interactive" for clickable cards, variant="sunken" for recessed wells.
- NEVER nest <Card> inside another <Card>. Use whitespace, subtle divider lines, or sunken wells for internal grouping.
- Do NOT build 3-stat card rows with colored icon squares.`,
    rawMarkdown: `# Kohl Card Specification

- **Import:** \`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/card.json\`
- **Variants:** \`default\` (Level 1), \`elevated\` (Level 2), \`interactive\` (hover lift), \`sunken\` (Level 3 well), \`glass\` (Level 4 blur)
- **Strict Rule:** NEVER nest Card inside Card. Group with whitespace first.`,
  },

  "/design-system/badge": {
    id: "badge",
    path: "/design-system/badge",
    title: "Badge Component Specification",
    componentName: "Badge",
    category: "Components",
    summary:
      "Compact status and metadata label supporting 8 intent variants, dot indicators, and CSS pulse animations.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/badge.json",
    importStatement: `import { Badge } from "@/components/ui/badge";`,
    registryUrl: "https://kohl.design/r/badge.json",
    priorityOrder: [
      "1. Never use emoji inside badges; use dot indicator or Lucide icons.",
      "2. Use dot={true} and pulse={true} for real-time / active states.",
      "3. font-sans only; never use font-cooper for badges.",
    ],
    props: [
      { name: "variant", type: '"default" | "editorial" | "secondary" | "outline" | "success" | "warning" | "destructive" | "info"', default: '"default"', description: "Color and intent role." },
      { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Padding and typography size." },
      { name: "dot", type: "boolean", default: "false", description: "Renders a circular status dot before the label text." },
      { name: "pulse", type: "boolean", default: "false", description: "Adds an animated pulse ping to the dot indicator." },
    ],
    variants: [
      { name: "default", description: "Pine wash with dark pine text. Standard badge.", role: "System Tag" },
      { name: "editorial", description: "Crimson cashmere tint with velvet border.", role: "Editorial / Highlight" },
      { name: "secondary", description: "Neutral gray surface for tags and metadata.", role: "Neutral Metadata" },
      { name: "outline", description: "Transparent with 1px border for low-visual-weight labels.", role: "Subtle" },
      { name: "success", description: "Emerald tint with dot for operational and healthy states.", role: "Status: Live" },
      { name: "warning", description: "Amber tint for pending, warning, or action-required states.", role: "Status: Warning" },
      { name: "destructive", description: "Red tint for failed, error, or terminated states.", role: "Status: Error" },
      { name: "info", description: "Cyan tint for information notices.", role: "Status: Info" },
    ],
    rules: [
      {
        id: "badge-no-emoji",
        level: "NEVER",
        title: "Never place emoji inside badges",
        rationale: "Emoji render unpredictably across OS platforms and undermine craftsmanship.",
        good: `<Badge variant="success" dot pulse>Production active</Badge>`,
        bad: `<Badge variant="success">🚀 Live Now</Badge>`,
      },
    ],
    antiPatterns: [
      "Using emoji in badges (e.g. '🔥 New', '⚡️ Fast').",
      "Using font-cooper inside badges.",
      "Using ALL CAPS in badge labels.",
    ],
    codeSnippets: [
      {
        title: "Live Operational Status Badge",
        description: "Status indicator with pulsing dot",
        code: `import { Badge } from "@/components/ui/badge";

export function StatusIndicator() {
  return (
    <Badge variant="success" dot pulse>
      Operational
    </Badge>
  );
}`,
      },
    ],
    prompt: `You are implementing badges using Kohl Badge.
Rules:
- Import from "@/components/ui/badge".
- Use variant="default", "editorial", "secondary", "success", "warning", "destructive".
- For live status, use dot pulse props: <Badge variant="success" dot pulse>Live</Badge>.
- NEVER use emoji in badges. Use sentence case.`,
    rawMarkdown: `# Kohl Badge Specification

- **Import:** \`import { Badge } from "@/components/ui/badge";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/badge.json\`
- **Props:** \`variant\`, \`size\`, \`dot\`, \`pulse\`
- **Rule:** Never use emoji in badges. Always use sentence case.`,
  },

  "/design-system/input": {
    id: "input",
    path: "/design-system/input",
    title: "Input & Field Specification",
    componentName: "Input",
    category: "Components",
    summary:
      "Accessible form controls supporting default, filled, and ghost variants, composable InputGroup prefixes/suffixes, and validation error states.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/input.json",
    importStatement: `import { Input, InputGroup, InputAddon } from "@/components/ui/input";\nimport { Label } from "@/components/ui/label";`,
    registryUrl: "https://kohl.design/r/input.json",
    priorityOrder: [
      "1. Always pair Input with an explicit accessible <Label> with htmlFor matching input id.",
      "2. 2px focus ring using ring-primary with ring-offset-background.",
      "3. Error state must set aria-invalid='true' and link to error message via aria-describedby.",
      "4. Minimum touch target 44px on mobile devices.",
    ],
    props: [
      { name: "variant", type: '"default" | "filled" | "ghost"', default: '"default"', description: "Surface styling variant." },
      { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "Unified control height: xs (28px), sm (32px), default (36px), lg (40px), xl (48px)." },
      { name: "error", type: "boolean", default: "false", description: "Renders crimson error border and focus ring." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and reduces opacity." },
    ],
    variants: [
      { name: "default", description: "Clean white/card background with 1px border and primary focus ring.", role: "Standard Field" },
      { name: "filled", description: "Recessed subtle gray fill with border on hover/focus.", role: "Recessed Well Field" },
      { name: "ghost", description: "Borderless input with bottom line or transparent container.", role: "Inline / Minimal" },
    ],
    rules: [
      {
        id: "input-accessible-label",
        level: "MUST",
        title: "Always associate Input with an explicit Label",
        rationale: "Screen readers and accessibility tools require programmatic label association.",
        good: `<div className="space-y-1.5">\n  <Label htmlFor="email">Work email</Label>\n  <Input id="email" type="email" placeholder="henrik@kohl.design" />\n</div>`,
        bad: `<Input placeholder="Work email" />`,
      },
    ],
    antiPatterns: [
      "Using placeholder text as the only form of label.",
      "Floating animated labels that reduce legibility.",
      "Missing error descriptions for invalid fields.",
    ],
    codeSnippets: [
      {
        title: "Input with Prefix Addon and Label",
        description: "Composable InputGroup with search icon prefix",
        code: `import { Input, InputGroup, InputAddon } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export function SearchField() {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="search">Search projects</Label>
      <InputGroup>
        <InputAddon>
          <Search className="size-4 text-muted-foreground" />
        </InputAddon>
        <Input id="search" placeholder="Filter by name..." />
      </InputGroup>
    </div>
  );
}`,
      },
    ],
    prompt: `You are implementing form fields using Kohl Input.
Rules:
- Import Input from "@/components/ui/input" and Label from "@/components/ui/label".
- Always pair <Input id="..."> with <Label htmlFor="...">.
- Use InputGroup and InputAddon for icons or prefix/suffix adornments.
- Pass error={true} and aria-invalid="true" when validation fails.`,
    rawMarkdown: `# Kohl Input Specification

- **Import:** \`import { Input, InputGroup, InputAddon } from "@/components/ui/input";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/input.json\`
- **Accessibility:** Always pair with \`<Label htmlFor="...">\`. 2px focus-visible rings.`,
  },

  "/design-system/toast": {
    id: "toast",
    path: "/design-system/toast",
    title: "Toast Notification Specification",
    componentName: "Toast",
    category: "Components",
    summary:
      "Ephemeral notification system powered by Sonner, styled with Kohl's Pine, Crimson, and neutral tokens.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/sonner.json",
    importStatement: `import { toast } from "sonner";\nimport { Toaster } from "@/components/ui/sonner";`,
    registryUrl: "https://kohl.design/r/sonner.json",
    priorityOrder: [
      "1. Place <Toaster /> once in the root layout (app/layout.tsx).",
      "2. Write toast titles with action verbs (e.g. 'Project deleted', 'Link copied to clipboard').",
      "3. Limit toast duration to 4000ms. Provide an undo action when destructive.",
    ],
    rules: [
      {
        id: "toast-action-verbs",
        level: "MUST",
        title: "Use past-tense action verbs in toast messages",
        rationale: "Toasts confirm state transitions. Be concise and direct.",
        good: `toast.success("Branch merged into main");`,
        bad: `toast("Success!! Everything went great 🚀🚀");`,
      },
    ],
    antiPatterns: [
      "Placing multiple <Toaster /> instances on different pages.",
      "Writing wordy paragraphs inside toasts.",
      "Using emoji in toast notifications.",
    ],
    codeSnippets: [
      {
        title: "Promise Toast Pattern",
        description: "Loading, success, and error states for async jobs",
        code: `import { toast } from "sonner";

export function handleDeploy() {
  toast.promise(deployProject(), {
    loading: "Deploying to production...",
    success: "Deployment completed successfully",
    error: "Failed to deploy project",
  });
}`,
      },
    ],
    prompt: `You are implementing toasts using Kohl Sonner.
Rules:
- Call toast.success(), toast.error(), toast.promise() from "sonner".
- Ensure <Toaster /> is placed in root layout.
- Write concise messages with past-tense action verbs. No emoji.`,
    rawMarkdown: `# Kohl Toast Specification

- **Import:** \`import { toast } from "sonner";\`
- **Root Component:** \`<Toaster /> from "@/components/ui/sonner";\`
- **API:** \`toast.success()\`, \`toast.error()\`, \`toast.promise()\`
- **Rule:** Concise, past-tense confirmations. No emoji.`,
  },

  "/design-system/tabs": {
    id: "tabs",
    path: "/design-system/tabs",
    title: "Tabs Component Specification",
    componentName: "Tabs",
    category: "Components",
    summary:
      "Accessible tabbed interface supporting default (segmented pill), underline (editorial line), and pills variants, with full keyboard arrow navigation.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/tabs.json",
    importStatement: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";`,
    registryUrl: "https://kohl.design/r/tabs.json",
    priorityOrder: [
      "1. Keyboard & focus: Arrow keys navigate between tabs; 2px focus-visible ring on triggers.",
      "2. ARIA standard: Radix Tabs Primitive automatically binds role='tablist', role='tab', role='tabpanel'.",
      "3. Variants: 'default' for segmented pill wells, 'underline' for editorial border-b lines, 'pills' for standalone filter chips.",
      "4. Font hierarchy: Use font-sans for tab trigger labels, never font-cooper.",
    ],
    props: [
      { name: "defaultValue", type: "string", description: "The value of the tab that should be active when initially rendered." },
      { name: "value", type: "string", description: "The controlled value of the active tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Event handler called when the active tab changes." },
      { name: "variant", type: '"default" | "underline" | "pills"', default: '"default"', description: "Styling variant applied to TabsList and inherited by TabsTrigger." },
      { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "Unified control height: xs (28px), sm (32px), default (36px), lg (40px), xl (48px)." },
    ],
    variants: [
      { name: "default", description: "Segmented recessed pill well (bg-muted/70) with elevated active tab.", role: "Segmented Control" },
      { name: "underline", description: "Editorial line with primary color indicator bar (-mb-px border-b-2).", role: "Editorial Page Tabs" },
      { name: "pills", description: "Standalone rounded-full filter pills with solid primary active fill.", role: "Filter Chips" },
    ],
    rules: [
      {
        id: "tabs-semantic-content",
        level: "MUST",
        title: "Always pair TabsTrigger with matching TabsContent value",
        rationale: "Unmatched tab values leave panels disconnected from accessibility trees.",
        good: `<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">Content</TabsContent>\n</Tabs>`,
        bad: `<Tabs defaultValue="overview">\n  <TabsList>\n    <button>Overview</button>\n  </TabsList>\n</Tabs>`,
      },
      {
        id: "tabs-no-cooper-triggers",
        level: "NEVER",
        title: "Never use font-cooper on tab triggers",
        rationale: "Tab triggers are UI controls and must use font-sans.",
        good: `<TabsTrigger value="analytics" className="font-sans">Analytics</TabsTrigger>`,
        bad: `<TabsTrigger value="analytics" className="font-cooper">Analytics</TabsTrigger>`,
      },
    ],
    antiPatterns: [
      "Using custom buttons instead of accessible TabsTrigger with keyboard arrow navigation.",
      "Using emoji in tab trigger labels.",
      "Applying font-cooper to tab triggers.",
    ],
    codeSnippets: [
      {
        title: "Segmented Pill Tabs",
        description: "Standard segmented view switcher",
        code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="account" className="space-y-4">
      <TabsList variant="default">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card variant="default" className="p-5">
          <p className="text-sm text-foreground">Manage profile information.</p>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card variant="default" className="p-5">
          <p className="text-sm text-foreground">Notification preferences.</p>
        </Card>
      </TabsContent>
    </Tabs>
  );
}`,
      },
      {
        title: "Underline Editorial Tabs",
        description: "Editorial horizontal line navigation with active border indicator",
        code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ProjectNav() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList variant="underline">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="deployments">Deployments</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="text-sm text-muted-foreground">Project overview details.</div>
      </TabsContent>
    </Tabs>
  );
}`,
      },
    ],
    prompt: `You are implementing tabs using Kohl Tabs.
Rules:
- Import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs".
- Use variant="default" for segmented pill wells, variant="underline" for editorial lines, variant="pills" for filter chips.
- Use sentence case for tab trigger labels. Never use emoji, never use font-cooper on tab triggers.
- Ensure every TabsTrigger value matches a TabsContent value.`,
    rawMarkdown: `# Kohl Tabs Specification

- **Import:** \`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/tabs.json\`
- **Variants:** \`default\` (segmented pill well), \`underline\` (editorial line), \`pills\` (filter chips)
- **Rules:** Accessible Radix keyboard navigation, sentence case, font-sans only.`,
  },

  "/design-system/toggle": {
    id: "toggle",
    path: "/design-system/toggle",
    title: "Toggle & ToggleGroup Component Specification",
    componentName: "Toggle & Toggle Group",
    category: "Components",
    summary:
      "Two-state button and toggle group supporting single and multiple selection, accessible roving focus, and default, outline, primary, and editorial variants.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/toggle.json https://kohl.design/r/toggle-group.json",
    importStatement: `import { Toggle } from "@/components/ui/toggle";\nimport { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";`,
    registryUrl: "https://kohl.design/r/toggle.json",
    priorityOrder: [
      "1. Keyboard & focus: Space or Enter toggles state; arrow keys navigate roving focus in ToggleGroup; 2px focus-visible ring.",
      "2. ARIA standard: Automatically binds aria-pressed for single Toggle, and role='group' with aria-checked for ToggleGroup.",
      "3. Selection types: type='single' for mutually exclusive choices, type='multiple' for formatting combinations.",
      "4. Variants: 'default' for subtle toolbar buttons, 'outline' for bordered states, 'primary' for solid brand selection, 'editorial' for warm bookplate tint.",
    ],
    props: [
      { name: "pressed", type: "boolean", description: "The controlled pressed state of the Toggle." },
      { name: "defaultPressed", type: "boolean", description: "The default pressed state of the Toggle." },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback fired when the Toggle pressed state changes." },
      { name: "variant", type: '"default" | "outline" | "primary" | "editorial"', default: '"default"', description: "Visual style variant." },
      { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "Unified control height: xs (28px), sm (32px), default (36px), lg (40px), xl (48px)." },
      { name: "type", type: '"single" | "multiple"', description: "Selection behavior for ToggleGroup (single exclusive or multiple)." },
    ],
    variants: [
      { name: "default", description: "Transparent off-state with subtle muted surface when pressed (data-[state=on]:bg-muted).", role: "Toolbar Buttons" },
      { name: "outline", description: "Structural 1px hairline border with muted surface when pressed.", role: "Bordered Controls" },
      { name: "primary", description: "Brand pine (or blush) solid fill when pressed (data-[state=on]:bg-primary).", role: "Brand Segmented Selection" },
      { name: "editorial", description: "Warm bookplate crimson tint when pressed.", role: "Editorial Filters" },
    ],
    rules: [
      {
        id: "toggle-accessible-labels",
        level: "MUST",
        title: "Always provide aria-label for icon-only toggles",
        rationale: "Screen readers require accessible text descriptions for toggles without visible copy.",
        good: `<Toggle aria-label="Toggle bold"><Bold className="size-3.5" /></Toggle>`,
        bad: `<Toggle><Bold className="size-3.5" /></Toggle>`,
      },
      {
        id: "toggle-group-type",
        level: "MUST",
        title: "Specify type on ToggleGroup",
        rationale: "ToggleGroup requires explicit type='single' or type='multiple'.",
        good: `<ToggleGroup type="single" defaultValue="left">...</ToggleGroup>`,
        bad: `<ToggleGroup defaultValue="left">...</ToggleGroup>`,
      },
    ],
    antiPatterns: [
      "Using custom div or span elements with onClick for toggle behavior.",
      "Omitting aria-label on icon-only toggle buttons.",
      "Nesting cards around individual toggle items.",
    ],
    codeSnippets: [
      {
        title: "Single Toggle Button",
        description: "Standalone two-state toggle with icon",
        code: `import { Toggle } from "@/components/ui/toggle";
import { Bookmark } from "lucide-react";

export function BookmarkToggle() {
  return (
    <Toggle aria-label="Toggle bookmark" variant="outline">
      <Bookmark className="size-3.5" />
    </Toggle>
  );
}`,
      },
      {
        title: "Text Formatting Toggle Group (Multiple)",
        description: "Multi-select toolbar toggle group",
        code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export function FormatToolbar() {
  return (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="size-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="size-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="size-3.5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}`,
      },
      {
        title: "View Alignment Toggle Group (Single)",
        description: "Mutually exclusive single-select toggle group",
        code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

export function AlignmentToggle() {
  return (
    <ToggleGroup type="single" defaultValue="left" variant="default">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="size-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="size-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="size-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify">
        <AlignJustify className="size-3.5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}`,
      },
    ],
    prompt: `You are implementing toggles using Kohl Toggle and ToggleGroup.
Rules:
- Import { Toggle } from "@/components/ui/toggle" or { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group".
- Always provide an aria-label on icon-only toggles.
- Specify type="single" or type="multiple" on ToggleGroup.
- Use variant="default", "outline", "primary", or "editorial".
- Use font-sans for toggle button labels. Never use emoji.`,
    rawMarkdown: `# Kohl Toggle & ToggleGroup Specification

- **Import:** \`import { Toggle } from "@/components/ui/toggle";\` & \`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/toggle.json https://kohl.design/r/toggle-group.json\`
- **Variants:** \`default\`, \`outline\`, \`primary\`, \`editorial\`
- **Rules:** Accessible Radix roving focus, aria-label for icon buttons, font-sans only.`,
  },

  "/design-system/avatar": {
    id: "avatar",
    path: "/design-system/avatar",
    title: "Avatar Component Specification",
    componentName: "Avatar",
    category: "Components",
    summary:
      "Accessible profile image container with fallback initials, online telemetry status dots, and overlapping AvatarGroup stacks.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/avatar.json",
    importStatement: `import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from "@/components/ui/avatar";`,
    registryUrl: "https://kohl.design/r/avatar.json",
    priorityOrder: [
      "1. Always pair AvatarImage with AvatarFallback for graceful loading failure handling.",
      "2. Fallback text should contain 1-2 uppercase letters representing initials.",
      "3. Use AvatarBadge with ring-2 ring-background for status dots without overlapping parent borders.",
      "4. Overlapping AvatarGroup stacks should use -space-x-2.5 with 2px canvas rings.",
    ],
    props: [
      { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl" | "2xl"', default: '"default"', description: "Optical dimension scale: xs (20px) to 2xl (80px)." },
      { name: "shape", type: '"circle" | "square"', default: '"circle"', description: "Geometry outline: rounded-full circle or rounded-[var(--radius)] squircle." },
      { name: "src", type: "string", description: "Image source URL for AvatarImage." },
      { name: "alt", type: "string", description: "Accessible alt text for AvatarImage." },
      { name: "status", type: '"online" | "busy" | "away" | "offline"', description: "Telemetry status indicator dot." },
    ],
    variants: [
      { name: "circle", description: "Standard circular portrait avatar.", role: "User Portraits" },
      { name: "square", description: "Squircle profile container adhering to concentric card radii.", role: "Teams & Projects" },
    ],
    rules: [
      {
        id: "avatar-always-fallback",
        level: "MUST",
        title: "Always provide AvatarFallback inside Avatar",
        rationale: "Prevents broken image icons and blank spaces when networks or avatar URLs fail.",
        good: `<Avatar><AvatarImage src={url} alt="Alex" /><AvatarFallback>AK</AvatarFallback></Avatar>`,
        bad: `<Avatar><AvatarImage src={url} alt="Alex" /></Avatar>`,
      },
    ],
    antiPatterns: [
      "Using raw <img> tags without fallback handling.",
      "Displaying broken image placeholders instead of styled initial badges.",
    ],
    codeSnippets: [
      {
        title: "Standard User Avatar with Status",
        description: "Profile avatar with online status badge",
        code: `import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";

export function UserProfile() {
  return (
    <Avatar size="default">
      <AvatarImage src="/avatars/01.jpg" alt="Henrik Köhl" />
      <AvatarFallback variant="pine">HK</AvatarFallback>
      <AvatarBadge status="online" />
    </Avatar>
  );
}`,
      },
      {
        title: "Avatar Group Stack",
        description: "Overlapping team avatar group with overflow count",
        code: `import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";

export function TeamAvatars() {
  return (
    <AvatarGroup max={3}>
      <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>EF</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>GH</AvatarFallback></Avatar>
    </AvatarGroup>
  );
}`,
      },
    ],
    prompt: `You are implementing user avatars using Kohl Avatar.
Rules:
- Import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from "@/components/ui/avatar".
- Always nest AvatarFallback inside Avatar.
- Use size="xs" | "sm" | "default" | "lg" | "xl" | "2xl".`,
    rawMarkdown: `# Kohl Avatar Specification

- **Import:** \`import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from "@/components/ui/avatar";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/avatar.json\`
- **Sizes:** \`xs\`, \`sm\`, \`default\`, \`lg\`, \`xl\`, \`2xl\`
- **Rules:** Always include AvatarFallback, use AvatarBadge for presence, font-sans initials.`,
  },

  "/design-system/chip": {
    id: "chip",
    path: "/design-system/chip",
    title: "Chip Component Specification",
    componentName: "Chip",
    category: "Components",
    summary:
      "Interactive, selectable, and dismissible tag chip control supporting checkmark indicators, leading icons, and ChipGroup matrices.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/chip.json",
    importStatement: `import { Chip, ChipGroup } from "@/components/ui/chip";`,
    registryUrl: "https://kohl.design/r/chip.json",
    priorityOrder: [
      "1. Interactive vs Static: Use Chip when an element is clickable, selectable, or dismissible; use Badge for static telemetry.",
      "2. Keyboard: Space or Enter activates selection; Backspace or Delete triggers onRemove.",
      "3. Accessible labels: Always provide removeLabel on dismissible chips.",
      "4. Text formatting: Use font-sans and sentence case. Never emoji in chip text.",
    ],
    props: [
      { name: "selected", type: "boolean", description: "Controlled selection state." },
      { name: "onSelectedChange", type: "(selected: boolean) => void", description: "Callback when selection state changes." },
      { name: "onRemove", type: "() => void", description: "Callback when trailing dismiss button is clicked." },
      { name: "variant", type: '"default" | "outline" | "primary" | "editorial" | "secondary"', default: '"default"', description: "Visual style variant." },
      { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "Aligned height scale: xs (24px), sm (28px), default (32px), lg (36px), xl (40px)." },
      { name: "shape", type: '"pill" | "rounded"', default: '"pill"', description: "Corner radius geometry." },
      { name: "showCheckmark", type: "boolean", default: "false", description: "Displays animated checkmark when selected." },
    ],
    variants: [
      { name: "default", description: "Subtle muted background with primary tint when selected.", role: "Filter Matrices" },
      { name: "primary", description: "Brand solid fill when active.", role: "Primary Selection" },
      { name: "editorial", description: "Warm bookplate crimson wash.", role: "Editorial Categories" },
      { name: "outline", description: "1px hairline border.", role: "Bordered Filters" },
    ],
    rules: [
      {
        id: "chip-keyboard-delete",
        level: "MUST",
        title: "Support keyboard deletion on dismissible chips",
        rationale: "Screen reader and keyboard users need Backspace/Delete to dismiss tags.",
        good: `<Chip onRemove={() => remove(id)}>React</Chip>`,
        bad: `<div onClick={() => remove(id)}>React x</div>`,
      },
    ],
    antiPatterns: [
      "Using static Badge for interactive selection or dismissal flows.",
      "Using raw buttons with hand-coded X icons without ARIA roles.",
    ],
    codeSnippets: [
      {
        title: "Filter Chip Matrix",
        description: "Multi-select filter chips with checkmark indicators",
        code: `import { Chip, ChipGroup } from "@/components/ui/chip";
import * as React from "react";

export function CategoryFilter() {
  const [selected, setSelected] = React.useState<string[]>(["design"]);

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  return (
    <ChipGroup>
      {["design", "engineering", "product"].map((cat) => (
        <Chip
          key={cat}
          selected={selected.includes(cat)}
          onSelectedChange={() => toggle(cat)}
          showCheckmark
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </Chip>
      ))}
    </ChipGroup>
  );
}`,
      },
      {
        title: "Dismissible Tag Input",
        description: "Tags that can be removed via X or Backspace",
        code: `import { Chip, ChipGroup } from "@/components/ui/chip";

export function TagList({ tags, onRemove }: { tags: string[]; onRemove: (t: string) => void }) {
  return (
    <ChipGroup>
      {tags.map((tag) => (
        <Chip key={tag} variant="outline" onRemove={() => onRemove(tag)}>
          {tag}
        </Chip>
      ))}
    </ChipGroup>
  );
}`,
      },
    ],
    prompt: `You are implementing interactive chips using Kohl Chip.
Rules:
- Import { Chip, ChipGroup } from "@/components/ui/chip".
- Use variant="default" | "outline" | "primary" | "editorial" | "secondary".
- Provide onRemove for dismissible chips.
- Wrap groups in <ChipGroup>.`,
    rawMarkdown: `# Kohl Chip Specification

- **Import:** \`import { Chip, ChipGroup } from "@/components/ui/chip";\`
- **Registry:** \`npx shadcn@latest add https://kohl.design/r/chip.json\`
- **Variants:** \`default\`, \`outline\`, \`primary\`, \`editorial\`, \`secondary\`
- **Rules:** Interactive selection, checkmark feedback, Backspace/Delete dismiss.`,
  },

  "/design-system/colors": {
    id: "colors",
    path: "/design-system/colors",
    title: "Colors & Tokens Specification",
    category: "Foundations",
    summary:
      "Semantic token scales: Pine Forest Green (primary), Crimson Coral (accent), Neutrals, and 3 Line Densities (--line, --line-strong, --control).",
    installCommand: "npx shadcn@latest add https://kohl.design/r/theme.json",
    registryUrl: "https://kohl.design/r/theme.json",
    priorityOrder: [
      "1. NEVER write arbitrary hex codes (#005243) or generic Tailwind grays (zinc, slate).",
      "2. Use semantic tokens: bg-background, bg-card, bg-primary, text-foreground, border-border.",
      "3. Use brand scales: pine-50 to pine-900 for green, crimson-50 to crimson-950 for accent.",
      "4. Line tokens: --line for subtle dividers, --line-strong for distinct edges, --control for inputs.",
    ],
    rules: [
      {
        id: "color-semantic-only",
        level: "MUST",
        title: "Only use registered Kohl tokens",
        rationale: "Ensures seamless theme switching between Pine and Blush, and light/dark modes.",
        good: `<div className="bg-background text-foreground border-border">`,
        bad: `<div className="bg-[#011d18] text-[#f2f2f2]">`,
      },
    ],
    antiPatterns: [
      "Tailwind zinc, slate, or stone classes.",
      "Arbitrary hex codes in className.",
      "Neon gradients or glowing blob backgrounds.",
    ],
    codeSnippets: [
      {
        title: "Semantic Color Application",
        description: "Proper use of background, border, and text tokens",
        code: `<div className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
  <span className="text-xs text-muted-foreground">Status</span>
  <p className="text-sm font-semibold text-primary">All systems operational</p>
</div>`,
      },
    ],
    prompt: `You are applying colors in Kohl Design System.
Rules:
- NEVER use arbitrary hex codes or Tailwind zinc/slate.
- Use bg-background (Canvas), bg-card (Surface), bg-muted (Well).
- Use text-foreground, text-muted-foreground, text-primary, text-accent.
- Use border-border, border-[var(--line)], border-[var(--line-strong)].`,
    rawMarkdown: `# Kohl Colors & Tokens Specification

- **Primary Pine:** \`--color-pine-600\` (\`#005243\` light), \`--color-pine-800\` (\`#011d18\` dark canvas)
- **Crimson Accent:** \`--color-crimson-500\` (\`#93484f\` light), \`--color-crimson-800\` (\`#420006\` dark)
- **Line Tokens:** \`--line\`, \`--line-strong\`, \`--control\`
- **Status Tokens:** \`--success\`, \`--warning\`, \`--destructive\`, \`--info\``,
  },

  "/design-system/typography": {
    id: "typography",
    path: "/design-system/typography",
    title: "Typography Specification",
    category: "Foundations",
    summary:
      "Strict two-font system: Cooper Regular for expressive display headlines; DM Sans for all body text, UI controls, tables, and buttons.",
    priorityOrder: [
      "1. Cooper strictly for hero/display titles and section headings (font-cooper).",
      "2. DM Sans strictly for all UI controls, body text, buttons, and tables (font-sans).",
      "3. NEVER use font-cooper on body copy, table cells, or buttons.",
      "4. Sentence case everywhere. Never ALL CAPS.",
    ],
    rules: [
      {
        id: "type-cooper-display-only",
        level: "MUST",
        title: "Cooper strictly for display titles",
        rationale: "Cooper is designed for display scale. At text-sm or text-xs, it hurts readability.",
        good: `<h1 className="font-cooper text-3xl tracking-tight">Active Workspaces</h1>`,
        bad: `<p className="font-cooper text-sm">Description text</p>`,
      },
    ],
    antiPatterns: [
      "font-cooper on buttons, table rows, or badges.",
      "ALL CAPS headlines with wide letter tracking.",
      "Small category uppercase eyebrows above titles.",
    ],
    codeSnippets: [
      {
        title: "Correct Headline and Copy Hierarchy",
        description: "Display Cooper headline paired with DM Sans body copy",
        code: `<div className="space-y-2">
  <h1 className="font-cooper text-3xl font-normal tracking-tight text-foreground">
    Session Telemetry
  </h1>
  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
    Real-time performance traces and latency distribution over the last 24 hours.
  </p>
</div>`,
      },
    ],
    prompt: `You are implementing typography in Kohl Design.
Rules:
- font-cooper is ONLY for h1, h2, hero display titles.
- font-sans is for ALL body copy, buttons, forms, tables, badges.
- NEVER use font-cooper on buttons or body text.
- Use sentence case for all headings and buttons.`,
    rawMarkdown: `# Kohl Typography Specification

- **Display:** \`font-cooper\` (Cooper Regular) with tight tracking
- **UI & Copy:** \`font-sans\` (DM Sans)
- **Strict Rule:** Cooper for hero headlines only; DM Sans for all UI and copy.`,
  },

  "/design-system/surfaces": {
    id: "surfaces",
    path: "/design-system/surfaces",
    title: "Surfaces & Elevation Specification",
    category: "Foundations",
    summary:
      "The 5-layer elevation system: Level 0 Canvas, Level 1 Surface, Level 2 Elevated Overlay, Level 3 Recessed Well, Level 4 Frosted Glass.",
    priorityOrder: [
      "1. Level 0: Canvas (bg-background).",
      "2. Level 1: Surface (<Card variant='default'> or bg-card).",
      "3. Level 2: Overlay (<Card variant='elevated'> or popovers).",
      "4. Level 3: Recessed Well (<Card variant='sunken'> or bg-muted).",
      "5. Level 4: Frosted Glass (<Card variant='glass'> or bg-background/80 backdrop-blur-md).",
      "6. Concentric radius math: R_inner = max(0, R_outer - padding).",
    ],
    rules: [
      {
        id: "surf-earn-surface",
        level: "MUST",
        title: "Group with whitespace first; never nest cards",
        rationale: "Card nesting breaks elevation layers.",
        good: `<div className="space-y-6">\n  <section className="space-y-2">...</section>\n</div>`,
        bad: `<Card><Card>...</Card></Card>`,
      },
    ],
    antiPatterns: [
      "Nesting cards inside cards.",
      "Using background gradients or glowing blur blobs.",
      "Mismatched inner/outer corner radii.",
    ],
    codeSnippets: [
      {
        title: "5 Elevation Layers Demo",
        description: "Proper stacking of canvas, surface, and sunken wells",
        code: `<div className="bg-background p-8"> {/* Level 0 Canvas */}
  <Card variant="default" className="p-6 space-y-4"> {/* Level 1 Surface */}
    <h3 className="font-cooper text-lg">Database Configuration</h3>
    <Card variant="sunken" className="p-4 font-mono text-xs"> {/* Level 3 Well */}
      DATABASE_URL=postgres://kohl:...
    </Card>
  </Card>
</div>`,
      },
    ],
    prompt: `You are implementing surfaces in Kohl Design.
Rules:
- Respect the 5 layers: Level 0 Canvas, Level 1 Surface, Level 2 Overlay, Level 3 Well, Level 4 Glass.
- NEVER nest Card inside Card.
- Concentric corner radius formula: R_inner = max(0, R_outer - padding).`,
    rawMarkdown: `# Kohl Surfaces & Elevation Specification

- **Level 0 (Canvas):** \`bg-background\`
- **Level 1 (Surface):** \`<Card variant="default">\`
- **Level 2 (Overlay):** \`<Card variant="elevated">\`
- **Level 3 (Well):** \`<Card variant="sunken">\`
- **Level 4 (Glass):** \`<Card variant="glass">\``,
  },

  "/design-system/icons": {
    id: "icons",
    path: "/design-system/icons",
    title: "Iconography (1.5px) Specification",
    componentName: "Icon",
    category: "Foundations",
    summary:
      "Standardized 20x20px icon wrapper with 1.5px stroke width. Strict rule: align leading icons with items-start on multiline text.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/icon.json",
    importStatement: `import { Icon } from "@/components/ui/icon";`,
    registryUrl: "https://kohl.design/r/icon.json",
    priorityOrder: [
      "1. Always use <Icon icon={LucideIcon} /> from @/components/ui/icon.",
      "2. Align leading icons with items-start against wrapping text.",
      "3. NEVER use emoji as UI icons.",
    ],
    rules: [
      {
        id: "icon-multiline-align",
        level: "MUST",
        title: "Align leading icons with items-start",
        rationale: "items-center pushes the icon to the middle of a tall wrapping paragraph.",
        good: `<div className="flex items-start gap-2.5">\n  <Icon icon={Info} className="mt-0.5" />\n  <p>{multilineText}</p>\n</div>`,
        bad: `<div className="flex items-center gap-2.5">\n  <Icon icon={Info} />\n  <p>{multilineText}</p>\n</div>`,
      },
    ],
    antiPatterns: [
      "Using emoji instead of icons.",
      "Hand-rolling raw svg without 1.5px stroke width standard.",
      "Centering icons vertically next to multiline paragraphs.",
    ],
    codeSnippets: [
      {
        title: "Standard Leading Icon Alignment",
        description: "Optical alignment with paragraph first line",
        code: `import { Icon } from "@/components/ui/icon";
import { ShieldCheck } from "lucide-react";

export function NoticeRow() {
  return (
    <div className="flex items-start gap-2.5">
      <Icon icon={ShieldCheck} intent="primary" className="mt-0.5" />
      <p className="text-sm text-muted-foreground leading-relaxed">
        Two-factor authentication is enforced across all organization workspaces.
      </p>
    </div>
  );
}`,
      },
    ],
    prompt: `You are implementing icons in Kohl Design.
Rules:
- Import Icon from "@/components/ui/icon".
- Standard stroke width is 1.5px, size is 20px.
- When paired with multiline text, align with items-start and mt-0.5.
- NEVER use emoji as UI icons.`,
    rawMarkdown: `# Kohl Iconography Specification

- **Import:** \`import { Icon } from "@/components/ui/icon";\`
- **Standard:** 20px size, 1.5px stroke width Lucide wrapper.
- **Rule:** \`items-start\` for multiline text alignment. No emoji.`,
  },

  "/design-system/anti-slop": {
    id: "anti-slop",
    path: "/design-system/anti-slop",
    title: "Anti-Slop Guide & Lint Directives",
    category: "Foundations",
    summary:
      "The 8 strict directives to eradicate AI-generated design clichés: No eyebrows, no 3-stat cards, earn your surface, no gradients/blobs, no Cooper body copy, no scroll reveals, no emoji, and realistic domain data.",
    priorityOrder: [
      "1. anti-slop-no-eyebrows NEVER put uppercase category eyebrows above titles.",
      "2. anti-slop-no-stat-cards NEVER build 3 identical boxed stat cards with colored icon squares.",
      "3. anti-slop-earn-surface NEVER nest <Card> inside <Card>.",
      "4. anti-slop-no-decoration NEVER add background gradients or glowing floating blobs.",
      "5. anti-slop-no-cooper-body NEVER use font-cooper for body text or UI controls.",
      "6. anti-slop-no-scroll-reveal NEVER use whileInView entrance shimmers that delay reading.",
      "7. anti-slop-no-emoji NEVER use emoji in UI buttons or badges.",
      "8. anti-slop-realistic-data ALWAYS use realistic, believable domain data.",
    ],
    rules: [
      {
        id: "anti-slop-no-eyebrows",
        level: "NEVER",
        title: "No uppercase eyebrows above headlines",
        rationale: "The headline already names the section; uppercase labels add redundant noise.",
        good: `<h2 className="font-cooper text-2xl">Sleep Timeline</h2>`,
        bad: `<p className="text-xs uppercase tracking-widest text-muted-foreground">OVERVIEW</p>\n<h2>Sleep Timeline</h2>`,
      },
    ],
    antiPatterns: [
      "Small uppercase category eyebrows.",
      "3-stat card rows.",
      "Card-in-card nesting.",
      "Background gradients and floating blur circles.",
      "Cooper serif on body text.",
      "whileInView scroll reveal animations.",
      "Emoji in UI controls.",
      "Lorem ipsum or generic placeholder text.",
    ],
    codeSnippets: [
      {
        title: "Clean Editorial Section Layout",
        description: "Zero-slop layout prioritizing whitespace and typography",
        code: `<section className="space-y-4">
  <div className="space-y-1">
    <h2 className="font-cooper text-2xl font-normal tracking-tight text-foreground">
      Cluster Telemetry
    </h2>
    <p className="text-sm text-muted-foreground">
      Real-time health scores across 12 distributed worker nodes.
    </p>
  </div>

  <div className="rounded-[var(--radius)] border border-border bg-card p-5">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-foreground">Average latency</span>
      <span className="font-mono text-primary font-semibold">14.2 ms</span>
    </div>
  </div>
</section>`,
      },
    ],
    prompt: `You are applying Kohl's Anti-Slop Guide.
NEVER do the following:
1. NEVER put uppercase eyebrows (OVERVIEW, 01) above titles.
2. NEVER build 3-stat card rows with icon squares.
3. NEVER nest Card inside Card.
4. NEVER use gradients, glowing blobs, or dot matrices.
5. NEVER use font-cooper for body text or buttons.
6. NEVER use whileInView scroll entrance shimmers.
7. NEVER use emoji in buttons or badges.
8. NEVER use placeholder text like Lorem Ipsum or John Doe.`,
    rawMarkdown: `# Kohl Anti-Slop Guide Specification

- **The 8 Directives:**
  1. No eyebrows
  2. No 3-stat cards
  3. Earn your surface (no card-in-card)
  4. No gradients or blur blobs
  5. No Cooper body copy
  6. No scroll reveals
  7. No emoji
  8. Realistic domain data only`,
  },

  "/design-system/registry": {
    id: "registry",
    path: "/design-system/registry",
    title: "shadcn Registry Distribution",
    category: "Distribution",
    summary:
      "Custom shadcn registry endpoints hosted under public/r/*.json for automated CLI consumption by developers and AI agents.",
    installCommand: "npx shadcn@latest add https://kohl.design/r/button.json",
    registryUrl: "https://kohl.design/r/index.json",
    priorityOrder: [
      "1. Install base: npx shadcn@latest add https://kohl.design/r/<name>.json.",
      "2. Registry contains: button, card, badge, input, label, icon, sonner, brand-flower, theme, utils.",
      "3. Automated verification: build script generates registry JSON before every production build.",
    ],
    rules: [
      {
        id: "reg-cli-install",
        level: "MUST",
        title: "Use shadcn registry URL for installation",
        rationale: "Maintains full dependencies and styles directly in user codebases.",
        good: `npx shadcn@latest add https://kohl.design/r/button.json`,
        bad: `npm install @kohl/button-unsupported`,
      },
    ],
    antiPatterns: [
      "Attempting npm install on private or nonexistent packages.",
      "Hand-copying component code without registry dependencies.",
    ],
    codeSnippets: [
      {
        title: "Registry Installation Commands",
        description: "CLI commands to install all Kohl components",
        code: `# Install core components
npx shadcn@latest add https://kohl.design/r/button.json
npx shadcn@latest add https://kohl.design/r/card.json
npx shadcn@latest add https://kohl.design/r/badge.json
npx shadcn@latest add https://kohl.design/r/input.json
npx shadcn@latest add https://kohl.design/r/icon.json
npx shadcn@latest add https://kohl.design/r/sonner.json`,
      },
    ],
    prompt: `You are consuming the Kohl Design Registry.
All components can be installed via:
npx shadcn@latest add https://kohl.design/r/<component>.json
Available items: button, card, badge, input, label, icon, sonner, brand-flower, theme, utils.`,
    rawMarkdown: `# Kohl Registry Distribution Specification

- **Install Base:** \`npx shadcn@latest add https://kohl.design/r/<name>.json\`
- **Manifest:** \`https://kohl.design/r/index.json\`
- **Components:** \`button\`, \`card\`, \`badge\`, \`input\`, \`label\`, \`icon\`, \`sonner\`, \`brand-flower\`, \`theme\`, \`utils\``,
  },
};

export function getAgentSpec(pathname: string): AgentSpec {
  // Normalize pathname: remove trailing slash if present
  const clean = pathname.replace(/\/$/, "") || "/design-system";
  if (AGENT_SPECS[clean]) {
    return AGENT_SPECS[clean];
  }
  // Try finding prefix match or default to system overview
  const matched = Object.keys(AGENT_SPECS).find((k) => clean.startsWith(k) && k !== "/design-system");
  if (matched) {
    return AGENT_SPECS[matched];
  }
  return AGENT_SPECS["/design-system"];
}
