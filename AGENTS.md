# Kohl Design — Agent Rules & Engineering Standards

## Priority Order
1. **Editorial Restraint & Layout Rhythm:** Less is more. Maximum 1 primary surface per view. Sentences over giant numbers. Strict visual uniformity.
2. **Accessibility & Keyboard Behavior:** 2px focus-visible rings, ARIA roles, minimum 44×44px touch sizes.
3. **Tokens by Role:** Always use semantic tokens (`bg-primary`, `bg-card`, `bg-background`, `border-border`), never raw hex or px values.
4. **Existing Components First:** Always use `@/components/ui/*`, never hand-roll duplicates.
5. **Typography & Elevation Scales:** `font-cooper` strictly for display titles, `font-sans` for UI; Levels 0–4 elevation layers.
6. **Polish:** Subtle hover lifts (`-translate-y-0.5`), border glows, spring transitions.

## Editorial Restraint & Composition (How to One-Shot Good UI)
- **Less is More (Cut in Half):** LLM agents naturally over-clutter screens by adding too many widgets, cards, badges, and tips. Before generating JSX, audit your elements: if a screen has more than 3 distinct visual sections, **cut half of them**. Strive for a calm, breathing interface.
- **Sentences Over Big Stat Numbers:** NEVER build dashboard slop with 3–4 boxed cards each holding a giant number (`text-3xl font-bold`) and an icon square. Instead, summarize state in a calm, human **editorial sentence** or a single inline metric with quiet contextual copy:
  - *Good:* `<p className="text-sm text-foreground">Astrid slept <span className="font-semibold">1h 45m</span> this morning · <span className="text-muted-foreground">Next nap in ~2h</span></p>`
  - *Bad:* 3 side-by-side cards with `14h 20m`, `3 naps`, `98% quality`.
- **Single Focal Surface:** Use whitespace to separate content. Anchor the view with **exactly one primary `<Card variant="default">`** housing the main list or task, partitioned internally by hairline borders (`divide-y divide-border/60`), rather than scattering 4 separate cards across the screen.
- **Strict Uniformity:**
  - **One Control Scale per View:** Never mix control sizes. If the search input is `size="default"`, all sibling buttons, segmented tabs, and toggles must also be `size="default"`.
  - **Uniform Spacing:** Stick to predictable rhythm tokens (`space-y-6`, `p-5` or `p-6` for card containers, `gap-2.5` for control clusters). Never introduce arbitrary ad-hoc margins (`mt-7`, `mb-3`, `gap-5`).
- **The One-Shot Golden Recipe:**
  1. **Header:** Title in `font-cooper text-2xl sm:text-3xl font-normal text-foreground`, with optional quiet single-line subtitle in `text-xs sm:text-sm text-muted-foreground`.
  2. **Context:** A single calm status row or editorial sentence (no big numbers).
  3. **Primary Surface:** Exactly ONE `<Card variant="default">` with hairline-separated rows (`divide-y divide-border/60`).
  4. **Primary Action:** Exactly ONE primary button (`variant="default"` for Pine/Neutral or `variant="accent"` for Crimson).

## Global Rules
- **Components First:** Always use `@/components/ui/button`, `@/components/ui/card`, etc.
- **Tokens Only:** Never write arbitrary Tailwind colors (`bg-[#005243]`) or generic grays (`zinc`, `slate`). Use semantic tokens (`bg-primary`, `bg-card`, `bg-background`) or brand scales (`pine-*`, `crimson-*`, `neutral-*`).
- **One Action Per View:** One primary Pine (`variant="default"`) or Crimson (`variant="accent"`) action per screen; all others are secondary, outline, or ghost.
- **Font Hierarchy:** `font-cooper` (Cooper Regular) is strictly for hero/display titles and section headings. Body text and all UI controls must use `font-sans` (DM Sans).
- **Elevation Layers:**
  - Level 0: Canvas (`bg-background`)
  - Level 1: Surface (`<Card variant="default">`)
  - Level 2: Elevated Overlay (`<Card variant="elevated">` or popovers)
  - Level 3: Recessed Well (`<Card variant="sunken">` or `bg-muted`)
  - Level 4: Frosted Glass (`<Card variant="glass">` or `bg-background/60 dark:bg-card/60 backdrop-blur-md border border-border/50`)
- **Icon Standard:** Use `<Icon icon={...} />` from `@/components/ui/icon` (standardized 20px / 1.5px stroke width). Align leading icons with `items-start` against wrapping text.
- **Sentence Case:** Write buttons and titles in sentence case with action verbs. Never ALL CAPS or emoji.
- **Unified Control Scale:** All row-level controls (`Button`, `Toggle`, `ToggleGroup`, segmented `Tabs`, `Input`, `Chip`) strictly follow the unified 5-tier height scale: `xs` (28px / `h-7`), `sm` (32px / `h-8`), `default` (36px / `h-9`), `lg` (40px / `h-10`), `xl` (48px / `h-12`). When composing controls side-by-side in any horizontal toolbar or filter bar, **always use the same `size` prop across all sibling elements** so their top and bottom baselines align with zero vertical layout jitter.
- **Mobile Touch Targets & Input Standard:** On mobile screens and touch devices, all interactive elements must satisfy a minimum **44 × 44 CSS px** touch envelope (Apple HIG / WCAG 2.5.5 AAA). Form inputs must render at `min-h-[44px]` (or `h-11 sm:h-9`) with `font-size: 16px` (`text-base sm:text-sm`) to eliminate iOS Safari viewport auto-zoom. Compact controls (`icon-xs`, `icon-sm`, `checkbox`) must use invisible pseudo-element expansion (`relative after:absolute after:-inset-2 after:content-['']`).
- **Mobile Floating Topbar Standard:** On mobile screens, topbars must NEVER be full-width edge-to-edge docked bars with borders stretching across the viewport. Instead, topbars must render as floating actionable island pills with translucent frosted glass (`bg-background/60 dark:bg-card/60 backdrop-blur-md border border-border/50 shadow-xs`) positioned above safe area (`pt-[max(0.75rem,env(safe-area-inset-top))]`). The outer container must be `pointer-events-none` and inner island pills `pointer-events-auto`, allowing content to smoothly glide underneath with soft luminous blur. Actionable buttons inside islands must satisfy the minimum 44×44 CSS px touch envelope.
- **Mobile Tab Bar Standard:** Use a floating island tab bar centered above the safe area (`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] inset-x-0 flex justify-center pointer-events-none md:hidden`) that strictly occupies only the space needed for the tabs and primary add action (`pointer-events-auto flex items-center gap-2.5`). The tab bar island must use Level 4 translucent frosted glass (`bg-background/60 dark:bg-card/60 backdrop-blur-md border border-border/50 shadow-lg`). Use icon-only navigation without text labels (skip labels for all tabs, including the selected tab), prominent 24px icons (`size="lg"`), tactile pill backgrounds (`rounded-full bg-muted text-foreground h-11 w-14 min-[375px]:w-16`) for active tabs, solid silhouette fills (`fill="currentColor"`), explicit ARIA attributes (`role="tab"`, `aria-label`), and position the primary add action button to the right (`h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg shrink-0`). Content views must maintain `pb-28 md:pb-8` bottom clearance.

## Anti-Slop Guide
- **NEVER** put small uppercase category eyebrows (`OVERVIEW`, `01`) above titles.
- **NEVER** build rows of identical 3-column stat cards with colored icon boxes or giant numbers.
- **NEVER** fragment a view into 4+ separate small cards. Group into 1 unified surface with hairline dividers.
- **NEVER** nest `<Card><Card>...</Card></Card>`.
- **NEVER** invent decorative widgets (quotes, tips, weather boxes, streak badges) unless explicitly requested.
- **NEVER** use background gradients, floating blur blobs, or colored side rails (`border-l-4`).
- **NEVER** build full-width edge-to-edge docked topbars or bottom navigation bars with stretched borders. Use floating translucent islands.
- **NEVER** use `font-cooper` on body copy, table cells, or buttons.
- **NEVER** add scroll entrance reveals (`whileInView`) that delay content.
- **NEVER** use emoji in UI labels or buttons.
- **NEVER** mix mismatched control heights in the same row (e.g. `Button size="sm"` next to `Input size="default"`, or arbitrary `h-[34px]` overrides). Always use matching `size` props.

## Verification
Always verify changes with:
\`\`\`bash
npm run build
\`\`\`
