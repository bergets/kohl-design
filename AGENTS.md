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
  - Level 4: Frosted Glass (`<Card variant="glass">` or `bg-background/80 backdrop-blur-md`)
- **Icon Standard:** Use `<Icon icon={...} />` from `@/components/ui/icon` (standardized 20px / 1.5px stroke width). Align leading icons with `items-start` against wrapping text.
- **Sentence Case:** Write buttons and titles in sentence case with action verbs. Never ALL CAPS or emoji.
- **Unified Control Scale:** All row-level controls (`Button`, `Toggle`, `ToggleGroup`, segmented `Tabs`, `Input`, `Chip`) strictly follow the unified 5-tier height scale: `xs` (28px / `h-7`), `sm` (32px / `h-8`), `default` (36px / `h-9`), `lg` (40px / `h-10`), `xl` (48px / `h-12`). When composing controls side-by-side in any horizontal toolbar or filter bar, **always use the same `size` prop across all sibling elements** so their top and bottom baselines align with zero vertical layout jitter.

## Anti-Slop Guide
- **NEVER** put small uppercase category eyebrows (`OVERVIEW`, `01`) above titles.
- **NEVER** build rows of identical 3-column stat cards with colored icon boxes.
- **NEVER** nest `<Card><Card>...</Card></Card>`.
- **NEVER** use background gradients, floating blur blobs, or colored side rails (`border-l-4`).
- **NEVER** use `font-cooper` on body copy, table cells, or buttons.
- **NEVER** add scroll entrance reveals (`whileInView`) that delay content.
- **NEVER** use emoji in UI labels or buttons.
- **NEVER** mix mismatched control heights in the same row (e.g. `Button size="sm"` next to `Input size="default"`, or arbitrary `h-[34px]` overrides). Always use matching `size` props.

## Verification
Always verify changes with:
\`\`\`bash
npm run build
\`\`\`
