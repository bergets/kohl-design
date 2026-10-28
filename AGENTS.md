# Kohl Design — Agent Rules & Engineering Standards

## Priority Order
1. Accessibility & keyboard behavior (2px focus-visible rings, ARIA roles, touch sizes)
2. Tokens by role, never raw hex or px values
3. Existing components from `@/components/ui`, never hand-rolled copies
4. Typography & elevation scales (`font-cooper` for display titles, `font-sans` for UI, Levels 0–4 elevation)
5. Polish: subtle hover lifts (`-translate-y-0.5`), border glows, spring transitions

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
- **NEVER** build rows of identical 3-column stat cards with colored icon boxes.
- **NEVER** nest `<Card><Card>...</Card></Card>`.
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
