# Kohl Design — Design System Specification

> Connected to Paper.design: [kohl.design Canvas](https://app.paper.design/file/01M1M7RQVXNV1JKV82N80ZQEMV/1-0)

## 1. Brand Core & Identity
- **Keywords:** Clean · Minimalistic · Professional · High Craft · Retro-Editorial
- **Primary Body & UI Font:** `DM Sans` (Weights: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold)
- **Brand Display Font:** `Cooper` (Regular 400, tight tracking, used across all Brand Editorial Vibe artboards, hero headlines, and wordmarks)
- **Official Brand Logo & Mark:** The line-art blooming floral emblem (radial looped petals centered around a core disk).
  - Used as the favicon, app icon, and official company emblem.
  - **Asset Locations in Repository:**
    - Master App Icon: [`app/icon.png`](file:///Users/henrikkohl/Documents/dev/kohl-design/app/icon.png) (512×512 PNG, Midnight Pine background `#03372e` with Blush Petals `#fbc8cb`)
    - Web Favicon: [`app/favicon.ico`](file:///Users/henrikkohl/Documents/dev/kohl-design/app/favicon.ico)
    - Vector Master SVG: [`public/brand-flower.svg`](file:///Users/henrikkohl/Documents/dev/kohl-design/public/brand-flower.svg) (Pure mathematical SVG path, responsive `viewBox="0 0 512 512"`, `fill="currentColor"`)
    - Dark Canvas Vector Mark: [`public/brand-flower-blush.png`](file:///Users/henrikkohl/Documents/dev/kohl-design/public/brand-flower-blush.png) (Transparent cutout in Blush Pink `#fbc8cb`)
    - Light / Utility Vector Mark: [`public/brand-flower-pine.png`](file:///Users/henrikkohl/Documents/dev/kohl-design/public/brand-flower-pine.png) (Transparent cutout in Brand Pine `#005243`)
    - Blush Coral Mark: [`public/brand-flower-crimson.png`](file:///Users/henrikkohl/Documents/dev/kohl-design/public/brand-flower-crimson.png) (Transparent cutout in Crimson `#93484f`)
    - White Mark: [`public/brand-flower-white.png`](file:///Users/henrikkohl/Documents/dev/kohl-design/public/brand-flower-white.png)

---

## 2. Design Tokens in Paper & Code

### Color Architecture (28 Brand Colors)

#### 1. Pine Forest Green Scale (Primary Brand Scale)
- `--color-pine-50`: `hsla(160, 30%, 96%, 1)` / `#eff7f4` (Canvas wash / light tint)
- `--color-pine-100`: `hsla(164, 48%, 77%, 1)` / `#a8e3d2`
- `--color-pine-200`: `hsla(166, 33%, 65%, 1)` / `#8ad0be`
- `--color-pine-300`: `hsla(166, 26%, 55%, 1)` / `#6fb4a3`
- `--color-pine-400`: `hsla(167, 35%, 36%, 1)` / `#3b7d6f`
- `--color-pine-500`: `hsla(169, 54%, 27%, 1)` / `#1f6b5c`
- `--color-pine-600` / `--color-primary`: `hsla(170, 100%, 16%, 1)` / `#005243` (Brand Signature Pine Green)
- `--color-pine-700` / `--color-primary-hover`: `hsla(170, 90%, 11%, 1)` / `#03352c` (Deep Pine Hover)
- `--color-pine-800` / `--color-dark-background`: `hsla(168, 94%, 6%, 1)` / `#011d18` (Midnight Forest / Dark Canvas)

#### 2. Neutrals & Sage Slates Scale (Structural Surfaces & Text)
- `--color-neutral-50` / `--color-muted`: `hsla(0, 0%, 95%, 1)` / `#f2f2f2` (Light neutral surface)
- `--color-neutral-100` / `--color-border`: `hsla(0, 0%, 83%, 1)` / `#d4d4d4` (Border line)
- `--color-neutral-200`: `hsla(0, 0%, 73%, 1)` / `#bababa`
- `--color-neutral-300`: `hsla(169, 8%, 60%, 1)` / `#92a09c` (Sage gray)
- `--color-neutral-400`: `hsla(169, 8%, 44%, 1)` / `#6a7673`
- `--color-neutral-500` / `--color-muted-foreground`: `hsla(170, 10%, 35%, 1)` / `#50625e` (Muted body text)
- `--color-neutral-600`: `hsla(168, 11%, 26%, 1)` / `#3b4a46`
- `--color-neutral-700`: `hsla(170, 13%, 18%, 1)` / `#283431`
- `--color-neutral-800`: `hsla(173, 18%, 10%, 1)` / `#151e1c` (Deep slate)
- `--color-neutral-900` / `--color-black`: `hsla(0, 0%, 0%, 1)` / `#000000` (True Black)

#### 3. Crimson Coral Scale (Accent Highlight Scale)
- `--color-crimson-50`: `hsla(356, 89%, 96%, 1)` / `#fef1f2` (Tint / Wash)
- `--color-crimson-100`: `hsla(356, 86%, 88%, 1)` / `#fcd3d6`
- `--color-crimson-200`: `hsla(355, 73%, 79%, 1)` / `#f79da5`
- `--color-crimson-300`: `hsla(355, 47%, 68%, 1)` / `#dc858b`
- `--color-crimson-400`: `hsla(355, 29%, 51%, 1)` / `#a65e64`
- `--color-crimson-500` / `--color-accent`: `hsla(354, 34%, 43%, 1)` / `#93484f` (Signature Crimson Accent)
- `--color-crimson-600` / `--color-accent-hover`: `hsla(354, 50%, 30%, 1)` / `#73262d` (Deep Crimson Hover)
- `--color-crimson-700`: `hsla(352, 70%, 22%, 1)` / `#601119`
- `--color-crimson-800`: `hsla(352, 100%, 13%, 1)` / `#420006` (Deep Wine)
- `--color-crimson-900`: `hsla(352, 55%, 6.5%, 1)` / `#1a0709` (Midnight Berry Canvas)
- `--color-crimson-950`: `hsla(352, 60%, 4.5%, 1)` / `#120406` (Velvet Noir)

#### Semantic Mappings (Default Pine vs. Blush Mode)
- **Default Pine Light Mode:**
  - `--background`: `#ffffff` (or `var(--color-pine-50)`)
  - `--foreground`: `var(--color-pine-800)` (`hsla(168, 94%, 6%, 1)`)
  - `--primary`: `var(--color-pine-600)` (`hsla(170, 100%, 16%, 1)`)
  - `--primary-foreground`: `#ffffff`
  - `--accent`: `var(--color-crimson-500)` (`hsla(354, 34%, 43%, 1)`)
  - `--accent-foreground`: `#ffffff`
  - `--muted`: `var(--color-neutral-50)` (`hsla(0, 0%, 95%, 1)`)
  - `--muted-foreground`: `var(--color-neutral-500)` (`hsla(170, 10%, 35%, 1)`)
  - `--border`: `var(--color-neutral-100)` (`hsla(0, 0%, 83%, 1)`)
- **Default Pine Dark Mode (Midnight Forest):**
  - `--background`: `var(--color-pine-800)` (`hsla(168, 94%, 6%, 1)`)
  - `--foreground`: `var(--color-neutral-50)` (`hsla(0, 0%, 95%, 1)`)
  - `--card`: `var(--color-pine-700)` (`hsla(170, 90%, 11%, 1)`)
  - `--primary`: `var(--color-pine-600)` (`hsla(170, 100%, 16%, 1)`)
  - `--accent`: `var(--color-crimson-500)` (`hsla(354, 34%, 43%, 1)`)
- **Blush Mode (Pink Surface Scale):**
  - **Light Surfaces:** Soft petal wash (`hsla(356, 60%, 96%, 1)`), delicate rose border (`hsla(355, 40%, 88%, 1)`), and dusty rose muted text (`hsla(354, 25%, 45%, 1)`).
  - **Dark Surfaces (Midnight Berry):** Deep velvet berry canvas (`hsla(352, 55%, 6.5%, 1)` / `#1a0709`), plum card (`hsla(352, 42%, 11%, 1)` / `#281013`), dusty mauve secondary (`hsla(352, 22%, 18%, 1)` / `#382426`), berry border (`hsla(352, 20%, 26%, 1)` / `#503539`), and luminous petal white text (`hsla(356, 86%, 96%, 1)` / `#feeced`). Contrast exceeds 17:1 (WCAG AAA).

---

### Surface & Elevation Architecture

#### The 5 Elevation Layers
1. **Level 0 · Canvas (`--background`):** Viewport background (`#ffffff` light, `#011d18` Pine dark, `#1a0709` Blush dark).
2. **Level 1 · Surface / Card (`--card`):** Primary content containers, metric cards, deliverables.
3. **Level 2 · Elevated Overlay (`--popover`):** Context menus, tooltips, flyout panels, sheets.
4. **Level 3 · Recessed Well (`--muted` / `--secondary`):** Code blocks, terminal viewports, settings callout panels.
5. **Level 4 · Frosted Glass (`bg-background/80 backdrop-blur-md`):** Sticky navigation bars, floating docks.

#### Standard Card Component (`components/ui/card.tsx`)
- **`variant="default"`:** Clean 1px border line for dense dashboards and settings.
- **`variant="elevated"`:** Multi-layered transparent depth shadow for hero marketing moments.
- **`variant="interactive"`:** Hover lift (`-translate-y-0.5`), border glow (`hover:border-primary/50`), and `active:scale-[0.995]` for clickable cards.
- **`variant="sunken"`:** Muted background well for code viewports or nested containers.
- **`variant="glass"`:** Translucent frosted surface with `backdrop-blur-md`.

#### Concentric Corner Radius
Outer and inner radii must remain optically concentric:
```
outerRadius = innerRadius + padding
```
In code, nested buttons consume `calc(var(--radius) - 2px)` while outer cards use `var(--radius)` (or `calc(var(--radius) + 4px)`), preserving geometric harmony across all presets (Pine 8px, Blush 14px, Sharp 2px).

---

### Spatial System & Geometry
- **Grid Base:** 4px
- **Spacing Scale:**
  - `--spacing-1`: `4px` (Compact)
  - `--spacing-2`: `8px` (Inline gap)
  - `--spacing-3`: `12px` (Intermediate)
  - `--spacing-4`: `16px` (Container padding)
  - `--spacing-6`: `24px` (Card spacing)
  - `--spacing-8`: `32px` (Section rhythm)
  - `--spacing-12`: `48px` (Generous break)
  - `--spacing-16`: `64px` (Page / Hero whitespace)
- **Border Radius:**
  - `--radius-none`: `0px`
  - `--radius-sm`: `2px`
  - `--radius-base`: `4px` (`0.25rem` — Brand default for cards, inputs, buttons)
  - `--radius-md`: `6px`
  - `--radius-lg`: `8px`
  - `--radius-full`: `9999px` (Pills, badges, avatars)
- **Border Width:** `1px` solid `var(--color-border)`

### Typography Scale
- `--font-size-xs`: `12px` (Captions, metadata, badges)
- `--font-size-sm`: `14px` (UI labels, secondary text)
- `--font-size-base`: `16px` (Body copy)
- `--font-size-lg`: `18px` (Lead paragraph, emphasized body)
- `--font-size-xl`: `20px` (Card titles, subheads)
- `--font-size-2xl`: `24px` (Section headings)
- `--font-size-3xl`: `32px` (Major section titles)
- `--font-size-4xl`: `44px` (Hero headlines)
- `Display / Wordmark`: `Cooper` `96px` / `15vw` (Homepage hero)

---

## 3. Paper Canvas Artboards

1. **`01 · Foundations`** (`1440px` wide, fit-content):
   - Design System Header & Status Tag
   - Brand Color Architecture (Full 28 swatches across Pine Forest, Neutrals/Sage, and Crimson Coral)
   - Typography Hierarchy (Cooper Wordmark, DM Sans H1–H4, Body, Caption)
   - Spatial Scale & Corner Radius Visualizers
2. **`02 · UI Components`** (`1440px` wide, fit-content):
   - Buttons & Interactive States (Primary Pine, Hover, Accent Crimson, Secondary, Outline, Ghost, 3 sizes)
   - Form Elements & Status Tags (Input Idle, Active Focus Ring in Pine, Status Badges & Pills)
   - Cards & Surfaces (Craft & Engineering Card, Founder Pairing Card, 100% Metric Card)
   - Signature Website Pattern (Live reproduction of the `kohl.design` homepage hero + typewriter block)
3. **`03 · Brand Editorial Vibe`** (`1440px` wide, fit-content):
   - **Midnight Pine Mode**: Signature deep forest canvas (`hsla(168, 94%, 6%, 1)`), retro serif display typography in blush cream, "STAY KOHL!" brand mark.
   - **Blush Coral Mode**: Soft blush wash canvas (`hsla(356, 89%, 96%, 1)`), terracotta-crimson display typography.
   - **Device Mockup Framing**: Editorial typography overlapping a hardware display ("Simple HR for everyone.").
4. **`04 · Neutral Utility Theme`** (`1440px` wide, fit-content):
   - **Workspaces & Client Dashboards**: Subdued grey-slate surfaces (`#f8fafc` / `#f1f5f9` / `#ffffff`) with crisp `1px` borders (`#e2e8f0`).
   - **Dense Data & Analytics**: Metric summary cards, client deliverable status tables (Shipped, Review, In Progress), filter inputs, and subtle sidebar navigation.
   - **Disciplined Accent Use**: Pine Green (`hsla(170, 100%, 16%, 1)`) is reserved strictly for primary interactive actions and positive status indicators.
5. **`05 · Floral Emblem (Vector Master)`** (`1440px` wide, fit-content):
   - **Native SVG Vector Master**: Pure vector Bézier curve representation of the brand mark rendered natively in Paper using `<svg viewBox="0 0 512 512">` with `fill="currentColor"`.
   - **Multi-Register Canvas Presentations**: Showcased in Midnight Pine, White light surface, and Blush Coral.
   - **Scalability Matrix**: Micro-display verification from `128px` down to `16px` (favicon scale).

---

## 4. Theme Registers & Usage Rules

### Register A: The Brand Editorial Register (Marketing & Landing Moments)
- **Context:** Homepage, case study covers, hero viewports, storytelling pages.
- **Palette:** High-character contrasts — either Midnight Pine canvas with pale blush type, or Blush Coral wash with crimson type.
- **Typography:** Bold `Cooper` typeface exclusively at large scales (56px–96px) with tight tracking and signature flared serifs.

### Register B: The Neutral Utility Register (Applications, Portals & Tools)
- **Context:** Client project portals, dashboards, data tables, settings, billing, and productivity workflows.
- **Palette:** Low-contrast, low-fatigue slate & cool grey surfaces (`#f8fafc`, `#f1f5f9`, `#ffffff`, `#e2e8f0`).
- **Typography:** Clear geometric sans (`DM Sans` / `Inter`) with generous line heights and distinct hierarchy.
- **Color Discipline:** Brand pine green and crimson are applied sparingly — only for active tabs, primary CTAs, and review alerts — ensuring maximum clarity and readability for extended work sessions.

---

## 5. Component Behavior & Interaction Guidelines
- **Animations:** Fast & snappy (150ms–250ms ease-out transitions, staggered typewriter cadence).
- **Cards:** Flat surface with `1px` subtle border (`var(--color-border)`), 4px corner radius (`0.25rem`), and soft elevation shadow (`0 1px 2px rgba(0,0,0,0.04)`).
- **Whitespace:** Spacious layout with generous breathing room.

---

## 6. shadcn/ui Component Architecture

The component system builds directly on top of **shadcn/ui** primitives (`class-variance-authority`, Radix UI, Lucide icons), fully customized to express the `kohl.design` identity.

### Button Component (`components/ui/button.tsx`)
- **Base Corner Radius:** Strict `4px` (`rounded-[4px]`) matching `--radius-base`.
- **Tactile Click Feedback:** `active:scale-[0.98] transition-all duration-150 ease-out`.
- **Focus Ring:** Pine green offset ring (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
- **Loading State:** Native `loading?: boolean` prop that automatically swaps in an animated Lucide `<Loader2 className="animate-spin" />` spinner and disables pointer events.
- **Link Composition:** Full Radix `<Slot>` (`asChild?: boolean`) support for seamless Next.js `<Link>` integration.

#### Variant Matrix
| Variant | Purpose | Light Token Mapping | Dark Token Mapping |
| :--- | :--- | :--- | :--- |
| `default` | Primary Brand CTAs & conversion buttons | `bg-primary` (Pine 600 `#005243`), hover Pine 700 | `bg-primary`, hover Pine 500 |
| `accent` | Highlight actions, hero moments, featured items | `bg-accent` (Crimson 500 `#93484f`), hover Crimson 600 | `bg-accent`, hover Crimson 500 |
| `editorial` | High-character retro/editorial register | `bg-crimson-50 text-crimson-600 border-crimson-200` | `bg-crimson-900/30 text-crimson-100 border-crimson-700/40` |
| `secondary` | Lower-emphasis supporting actions | `bg-secondary` (Neutral 50 `#f2f2f2`), text foreground | `bg-secondary` (Neutral 700 `#283431`), text foreground |
| `outline` | Filters, secondary pairs, toolbar buttons | `border border-border bg-transparent` | `border border-border bg-transparent` |
| `ghost` | Minimal clean actions, data table actions | Transparent, hover `bg-neutral-100` | Transparent, hover `bg-neutral-800/60` |
| `destructive` | Resource deletion, project cancellations | `bg-destructive text-white` | `bg-destructive text-white` |
| `link` | Underlined link appearance with button semantics | `text-primary underline-offset-4` | `text-primary underline-offset-4` |

#### Size Scale
- `sm`: `h-8 px-3 text-xs gap-1.5` (32px)
- `default`: `h-10 px-5 text-sm gap-2` (40px — standard Paper canvas button height)
- `lg`: `h-12 px-6 text-base gap-2.5` (48px)
- `icon-sm`: `size-8 p-0` (32px square)
- `icon`: `size-10 p-0` (40px square)
- `icon-lg`: `size-12 p-0` (48px square)

#### Interactive Showcase
- Catalog Route: [`/design-system`](http://localhost:3000/design-system)
- Button Specification & Playground: [`/design-system/button`](http://localhost:3000/design-system/button)