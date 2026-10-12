# Kohl Design System

> A crisp canvas and Midnight Forest Pine surfaces with Cooper serif display headlines, warm Crimson Coral accents, and 5-layer elevation, for high-craft web apps. Build with these components before writing markup.

kind: system-index
name: kohl
version: 1.0.0
install-base: `npx shadcn@latest add https://kohl.design/r/<name>.json`
human: https://kohl.design/design-system

---

## How to use this system
1. **Read this page first.** Follow the global rules and the priority order.
2. **Before building a component or page**, inspect its specification below.
3. **Use only tokens defined in the foundation tables.** Never invent an arbitrary hex code, pixel value, or unvetted Tailwind color.
4. **Consult the Anti-Slop Guide** to avoid the generic clichés of AI-generated interfaces.

---

## Priority Order
When rules conflict, the earlier item wins:
1. **Accessibility and keyboard behavior** (2px focus rings, screen reader labels, WCAG AAA contrast)
2. **Tokens by role, never raw values** (`--color-pine-*`, `--color-crimson-*`, `--background`, `--card`, `--primary`, `--accent`)
3. **Existing components from `@/components/ui`**, never hand-rolled copies
4. **Typography & elevation scales** (`font-cooper` for display titles, `font-sans` for UI, Levels 0–4 elevation)
5. **Polish:** Subtle hover lifts (`-translate-y-0.5`), border glow, spring transitions

---

## Global Rules

1. `kohl-components-first` **MUST** Use a Kohl component before writing custom markup; each one carries accessibility, focus states, and elevation behaviors that hand-built markup drops.
   - **Correct:** `import { Button } from "@/components/ui/button"`
   - **Wrong:** `<button className="rounded px-4 py-2 bg-[#005243] text-white">Save</button>`

2. `kohl-tokens-only` **MUST** Use only token names defined by the Kohl Design System. Never write arbitrary hex values (`#005243`, `#011d18`), custom pixel measurements, or generic Tailwind grays (`bg-zinc-800`, `bg-slate-900`).
   - **Correct:** `<div className="bg-background text-foreground border-border">`
   - **Correct:** `<span className="text-pine-600 dark:text-pine-200">`
   - **Wrong:** `<div className="bg-[#011d18] text-white">`
   - **Wrong:** `<div className="bg-zinc-900 border-zinc-700">`

3. `kohl-one-action` **MUST** Use **one** primary action per view (either Brand Pine `<Button variant="default">` or Crimson Coral `<Button variant="accent">`). Every other button on the view must be `secondary`, `outline`, or `ghost`.
   - **Correct:** One `<Button variant="default">Record nap</Button>`, with secondary buttons beside it.
   - **Wrong:** Three primary green buttons stacked in the same panel.

4. `kohl-font-hierarchy` **MUST** Set main hero headlines, section milestones, and page titles in `font-cooper` (Cooper Regular with tight tracking). Body copy, UI labels, table rows, badges, and form controls MUST use `font-sans` (`DM Sans` / system-ui).
   - **Correct:** `<h1 className="font-cooper text-3xl font-normal tracking-tight">Active Session</h1>`
   - **Correct:** `<p className="font-sans text-sm text-muted-foreground">Elapsed: 45 minutes</p>`
   - **Wrong:** `<button className="font-cooper">Submit</button>`

5. `kohl-elevation-layers` **MUST** Adhere to the 5-layer elevation system:
   - **Level 0 (Canvas):** `bg-background` (Pure white in light mode; Midnight Forest `#011d18` in dark mode)
   - **Level 1 (Card / Surface):** `<Card variant="default">` or `bg-card`
   - **Level 2 (Elevated Overlay):** `<Card variant="elevated">` or `bg-popover` for dialogs and flyouts
   - **Level 3 (Recessed Well):** `<Card variant="sunken">` or `bg-muted` for code blocks and inner wells
   - **Level 4 (Frosted Glass):** `<Card variant="glass">` or `bg-background/80 backdrop-blur-md` for sticky bars

6. `kohl-icon-standard` **MUST** Use the `<Icon icon={...} />` component from `@/components/ui/icon` which standardizes Lucide icons to 20×20px with 1.5px stroke width. When paired with text, align leading icons to the first line (`items-start`), never vertically centered across wrapping paragraphs.
   - **Correct:** `<Icon icon={Sparkles} intent="primary" />`
   - **Correct:** `<div className="flex items-start gap-2.5"><Icon icon={Info} className="mt-0.5" /><p>{longText}</p></div>`

7. `kohl-sentence-case` **MUST** Write all labels, headings, and buttons in sentence case with action verbs. Never use ALL CAPS, letter-spaced capital text, or emoji in buttons.
   - **Correct:** `<Button>Send invite</Button>`
   - **Wrong:** `<Button>SEND INVITE 🚀</Button>`
   - **Wrong:** `<Button>OK</Button>`

8. `kohl-unified-control-sizing` **MUST** Adhere to the 5-tier vertical control height scale (`xs`: 28px, `sm`: 32px, `default`: 36px, `lg`: 40px, `xl`: 48px). When placing `Button`, `Toggle`, segmented `Tabs`, and `Input` in a horizontal toolbar or filter bar, **always use matching `size` props** across all sibling elements to ensure exact baseline alignment.
   - **Correct:** `<div className="flex items-center gap-2"><Input size="default" /><Tabs defaultValue="all"><TabsList size="default">...</TabsList></Tabs><Button size="default">Search</Button></div>`
   - **Wrong:** `<div className="flex items-center gap-2"><Input size="default" /><Button size="sm">Search</Button></div>`

---

## Anti-Slop Guide
The bad habits of generated AI interfaces to avoid, and what to do instead.

1. `anti-slop-no-eyebrows` **NEVER** Put a tiny uppercase category or number above a title (e.g. `OVERVIEW`, `01 - INTRO`, `DASHBOARD`).
   - *Rationale:* The headline already names the section. The eyebrow adds a redundant voice saying less.
   - **Correct:** `<h2 className="font-cooper text-2xl">Sleep Timeline</h2>`
   - **Wrong:** `<p className="text-xs uppercase tracking-widest text-muted-foreground">Overview</p><h2>Sleep Timeline</h2>`

2. `anti-slop-no-stat-cards` **NEVER** Lay out a grid of 3–4 identical cards each containing a small colored icon in a square and a big standalone number.
   - *Rationale:* Equal boxes make every number equally loud. Group numbers naturally in a compact table, timeline, or editorial summary sentence.
   - **Correct:** A dense summary bar or structured list row.
   - **Wrong:** `<Card><Icon /><h3>Total Hours</h3><p>14h</p></Card>` repeated 4 times.

3. `anti-slop-earn-surface` **MUST** Group with whitespace first. Use a `<Card>` only around cohesive units the user directly acts upon. **NEVER nest a Card inside another Card.**
   - *Rationale:* Card-in-card nesting flattens the page into clumsy tiles and ruins elevation layers.
   - **Correct:** `<section className="flex flex-col gap-4"><h2>Settings</h2><div className="space-y-3">...</div></section>`
   - **Wrong:** `<Card><Card>Inner Content</Card></Card>`

4. `anti-slop-no-decoration` **NEVER** Add background gradients, glowing floating blobs, dot grids, or colored vertical edge bars (`border-l-4 border-primary`).
   - *Rationale:* Kohl's luxury comes from crisp typography, deep Midnight Pine surfaces, and intentional elevation. Background decoration dilutes the brand.
   - **Correct:** `<div className="bg-background">`
   - **Wrong:** `<div className="bg-gradient-to-br from-pine-900 to-crimson-950 backdrop-blur-xl">`

5. `anti-slop-no-cooper-body` **NEVER** Apply `font-cooper` to body text, tables, form fields, badges, or buttons.
   - *Rationale:* Cooper is an expressive serif display face designed specifically for headlines and hero brand moments. In body text or controls, it destroys legibility.
   - **Correct:** Only on `h1`, `h2`, hero titles, or large metric callouts.
   - **Wrong:** `<p className="font-cooper text-sm">Description text</p>`

6. `anti-slop-no-scroll-reveal` **NEVER** Add scroll-triggered entrance animations (`whileInView`, scroll shimmers) that make content hide until scrolled into view.
   - *Rationale:* Content that hides until scrolled slows people down and frustrates reading.

7. `anti-slop-no-emoji` **NEVER** Use emoji as UI icons, button accents, or section markers.
   - *Rationale:* Emoji render inconsistently across platforms and degrade a professional software interface into a chat thread. Use `<Icon icon={...} />` with Lucide icons.

8. `anti-slop-no-fake-data` **SHOULD** Populate UI examples with realistic, believable domain data (real names, exact times, realistic durations) rather than `John Doe`, `Lorem Ipsum`, or `$1,234.56`.

9. `anti-slop-no-height-mismatch` **NEVER** Mix mismatched control heights in the same row (e.g. `Button size="sm"` next to `Input size="default"`, or arbitrary ad-hoc pixel overrides like `h-[34px]`). Always pass matching `size` props.

---

## Page Shell Architecture
Every view follows this standard structure:

- **Root Container:**
  ```tsx
  <div className="min-h-screen bg-background text-foreground antialiased">
  ```
- **Page Header:**
  ```tsx
  <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 sm:px-6 backdrop-blur-md">
    <div className="flex items-center gap-3">
      <BrandFlower size={24} className="text-primary" />
      <span className="font-cooper text-lg tracking-tight">Kohl</span>
    </div>
  </header>
  ```
- **Task / Single View Flow:**
  ```tsx
  <main className="mx-auto w-full max-w-lg px-4 py-6 sm:py-10">
  ```
- **Dashboard / Multi-Column View:**
  ```tsx
  <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8 space-y-8">
  ```
- **Section Headers:**
  ```tsx
  <section className="flex flex-col gap-4">
    <h2 className="font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground">
      Section Title
    </h2>
    {/* Section Content */}
  </section>
  ```
- **Sticky Mobile Bottom Action Bar:**
  ```tsx
  <div className="sticky bottom-0 border-t border-border bg-background/90 p-4 backdrop-blur-md sm:hidden">
    <Button size="lg" className="w-full">Primary Action</Button>
  </div>
  ```

---

## Decision Table

| If you need to... | Use this primitive / pattern |
| :--- | :--- |
| Present a page or section title | `<h1 className="font-cooper text-2xl sm:text-3xl font-normal">` |
| Present secondary / body copy | `<p className="font-sans text-sm text-muted-foreground leading-relaxed">` |
| Group related fields or items | `<Card variant="default">` |
| Create a clickable, interactive item | `<Card variant="interactive">` |
| Highlight key action on the screen | `<Button variant="default">` (Pine) or `<Button variant="accent">` (Crimson) |
| Show status / categories | `<Badge variant="default" dot pulse>` (Active) or `<Badge variant="editorial">` |
| Display an icon | `<Icon icon={LucideIcon} intent="primary" size={20} />` |
| Show loading in a button | `<Button loading={isLoading}>Save</Button>` |
| Recessed well for code or data | `<Card variant="sunken">` |

---

## Foundations & Tokens

### 1. Color Architecture

#### Pine Forest Green Scale (Primary Scale)
- `pine-50`: `hsla(160, 30%, 96%, 1)` (`#eff7f4` - Wash / tint)
- `pine-100`: `hsla(164, 48%, 77%, 1)` (`#a8e3d2`)
- `pine-200`: `hsla(166, 33%, 65%, 1)` (`#8ad0be`)
- `pine-300`: `hsla(166, 26%, 55%, 1)` (`#6fb4a3`)
- `pine-400`: `hsla(167, 35%, 36%, 1)` (`#3b7d6f`)
- `pine-500`: `hsla(169, 54%, 27%, 1)` (`#1f6b5c`)
- `pine-600` / `primary`: `hsla(170, 100%, 16%, 1)` (`#005243` - Signature Brand Pine)
- `pine-700` / `primary-hover`: `hsla(170, 90%, 11%, 1)` (`#03352c` - Deep Pine Surface)
- `pine-800` / `background (dark)`: `hsla(168, 94%, 6%, 1)` (`#011d18` - Midnight Forest Canvas)
- `pine-900`: `hsla(168, 94%, 5%, 1)`

#### Crimson Coral Scale (Accent Scale)
- `crimson-50`: `hsla(356, 89%, 96%, 1)` (`#fef1f2` - Soft coral tint)
- `crimson-100`: `hsla(356, 86%, 88%, 1)` (`#fcd3d6`)
- `crimson-200`: `hsla(355, 73%, 79%, 1)` (`#f79da5`)
- `crimson-300`: `hsla(355, 47%, 68%, 1)` (`#dc858b`)
- `crimson-400`: `hsla(355, 29%, 51%, 1)` (`#a65e64`)
- `crimson-500` / `accent`: `hsla(354, 34%, 43%, 1)` (`#93484f` - Signature Crimson Accent)
- `crimson-600` / `accent-hover`: `hsla(354, 50%, 30%, 1)` (`#73262d`)
- `crimson-700`: `hsla(352, 70%, 22%, 1)`
- `crimson-800`: `hsla(352, 100%, 13%, 1)` (`#420006`)
- `crimson-900`: `hsla(352, 55%, 6.5%, 1)` (`#1a0709` - Midnight Berry Canvas)
- `crimson-950`: `hsla(352, 60%, 4.5%, 1)`

#### Neutrals & Sage Slate Scale
- `neutral-50`: `hsla(0, 0%, 95%, 1)` (`#f2f2f2` - Light neutral surface)
- `neutral-100` / `border`: `hsla(0, 0%, 83%, 1)` (`#d4d4d4` - Light border line)
- `neutral-200`: `hsla(0, 0%, 73%, 1)`
- `neutral-300`: `hsla(169, 8%, 60%, 1)` (`#92a09c` - Sage gray)
- `neutral-400`: `hsla(169, 8%, 44%, 1)`
- `neutral-500`: `hsla(170, 10%, 35%, 1)` (`#50625e` - Muted text)
- `neutral-600`: `hsla(168, 11%, 26%, 1)`
- `neutral-700`: `hsla(170, 13%, 18%, 1)` (`#283431` - Dark border line)
- `neutral-800`: `hsla(173, 18%, 10%, 1)` (`#151e1c` - Deep slate well)
- `neutral-900`: `hsla(0, 0%, 0%, 1)` (True Black)

---

## Component Registry

Every component in Kohl Design is available through the custom shadcn registry:

| Component | Registry Command | Key Variants |
| :--- | :--- | :--- |
| **Button** | `npx shadcn@latest add https://kohl.design/r/button.json` | `default`, `accent`, `editorial`, `secondary`, `outline`, `ghost`, `link` |
| **Card** | `npx shadcn@latest add https://kohl.design/r/card.json` | `default`, `elevated`, `interactive`, `sunken`, `glass` |
| **Badge** | `npx shadcn@latest add https://kohl.design/r/badge.json` | `default`, `editorial`, `success`, `warning`, `destructive`, `info` (supports `dot`, `pulse`) |
| **Input** | `npx shadcn@latest add https://kohl.design/r/input.json` | `default`, `filled`, `ghost`, composable `InputGroup` / `InputAddon` |
| **Tabs** | `npx shadcn@latest add https://kohl.design/r/tabs.json` | `default` (segmented pill), `underline` (editorial line), `pills` (filter chips) |
| **Label** | `npx shadcn@latest add https://kohl.design/r/label.json` | Accessible Radix UI Label |
| **Icon** | `npx shadcn@latest add https://kohl.design/r/icon.json` | Standardized 20px / 1.5px stroke width Lucide wrapper |
| **BrandFlower** | `npx shadcn@latest add https://kohl.design/r/brand-flower.json` | Official floral vector mark |
| **Theme** | `npx shadcn@latest add https://kohl.design/r/theme.json` | Tailwind CSS v4 design tokens and CSS variables |
| **Utils** | `npx shadcn@latest add https://kohl.design/r/utils.json` | `cn()` helper (`clsx` + `tailwind-merge`) |