# Sharing the Kohl Design Language Across Personal Projects

This guide details how to reuse and customize the **kohl.design** design language across your personal apps and side projects, with support for quick personality tweaks (such as making pink the dominant brand color, or adjusting corner sharpness/roundness).

---

## 1. Architectural Foundation

The design system is engineered around **Semantic CSS Token Abstraction** using Tailwind CSS v4 and `@theme inline`. Instead of hardcoding colors or static pixel radii into components, every component binds to CSS variables:

### Key Semantic Tokens
| Token | Kohl Default | Blush Project Variant | Sharp Tech Variant | Pebble Variant | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--radius` | `0.5rem` (8px) | `0.875rem` (14px) | `2px` | `1.125rem` (18px) | Base curvature of interactive elements |
| `--primary` | Pine `#005243` | Cashmere Blush `#FBC8CB` | Pine `#005243` | Pine `#005243` | Main CTA and primary brand moment |
| `--primary-hover` | Pine Dark `#03332a` | Silky Rose `#F8A8B0` | Pine Dark `#03332a` | Pine Dark `#03332a` | Primary button hover state |
| `--accent` | Crimson `#94464f` | Mint `#a8e3d2` | Crimson `#94464f` | Crimson `#94464f` | Secondary highlight hue |
| Dark Surfaces | Midnight Forest Green | Midnight Berry & Plum Scale | Midnight Forest Green | Midnight Forest Green | Background, card, popover, and border scale |

### Dynamic Derived Radii Scale
In `app/globals.css`, child sizes scale proportionally from the single `--radius` token:
```css
@theme inline {
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 4px);
  --radius-xl: calc(var(--radius) + 8px);
}
```
- A small button (`size="sm"`) uses `var(--radius-sm)` (6px default, 12px in Blush, 0px in Sharp).
- A large or hero button (`size="xl"`) uses `var(--radius-lg)` (12px default, 18px in Blush, 6px in Sharp).
- Standard buttons, cards, and toggles use `var(--radius)` (8px default, 14px in Blush, 2px in Sharp, 18px in Pebble).

---

## 2. Three Ways to Share Across Projects

### Method A: GitHub Template Repository (Fastest for new projects)
1. In your GitHub repository settings for `kohl-design` (or a dedicated `kohl-starter` repo), check **"Template repository"**.
2. Whenever you start a new personal project, click **"Use this template"** → **"Create a new repository"**.
3. In the new repository's `app/layout.tsx`, you can instantly activate a project variant by setting the data attribute:
   ```tsx
   <html lang="en" data-theme-variant="blush" suppressHydrationWarning>
   ```
   Or adjust the 3 root variables in `app/globals.css`.

### Method B: Copy-Paste Design Bundle (Zero overhead for existing apps)
Copy these core files into any Next.js 15+ / Tailwind v4 project:
1. `components/ui/button.tsx` — Button component with CVA and tactile micro-press.
2. `components/ui/icon.tsx` — Standardized Lucide icon component with default 20px size and 1.5px stroke width.
3. `components/theme-toggle.tsx` — Minimalist dual-register theme toggle.
4. `lib/utils.ts` — `cn()` helper combining `clsx` and `tailwind-merge`.
5. The CSS tokens block from `app/globals.css` into your new project's `globals.css`.

### Method C: Remote Shadcn Registry (Modern standard)
If you build several micro-tools, you can serve your components as a Shadcn registry:
```bash
npx shadcn add https://kohl.design/r/button.json
```
*(Components install directly into `components/ui/` with exact token bindings preserved).*

---

## 3. Project Personality Recipes

### Recipe 1: "Blush Brand" (Pink Dominant + 14px Soft Curvature + Berry Surfaces)
*Best for: Playful consumer apps, writing tools, personal blogs, or friendly utilities.*

Add this to `app/globals.css` or apply `data-theme-variant="blush"`:
```css
:root {
  --radius: 0.875rem; /* 14px soft organic curve */
  --primary: hsla(356, 86%, 89%, 1); /* Cashmere Blush #FBC8CB */
  --primary-hover: hsla(356, 85%, 82%, 1); /* Silky Rose Petal */
  --primary-foreground: hsla(168, 94%, 6%, 1); /* Deep Pine Ink #011D18 */
  --accent: hsla(170, 100%, 16%, 1); /* Forest pine secondary */
  --accent-foreground: #ffffff;

  /* Surfaces in Blush Light Mode: Delicate Petal Wash */
  --secondary: hsla(356, 60%, 96%, 1);
  --secondary-foreground: hsla(168, 94%, 6%, 1);
  --muted: hsla(356, 60%, 96%, 1);
  --muted-foreground: hsla(354, 25%, 45%, 1);
  --border: hsla(355, 40%, 88%, 1);
  --sidebar: hsla(356, 89%, 96%, 1);
}

.dark {
  /* Surfaces in Blush Dark Mode: Velvety Midnight Berry & Plum Scale */
  --background: hsla(352, 55%, 6.5%, 1); /* Midnight Berry Canvas #1a0709 */
  --foreground: hsla(356, 86%, 96%, 1); /* Luminous Petal White #feeced */
  --card: hsla(352, 42%, 11%, 1); /* Deep Plum Card Surface #281013 */
  --card-foreground: hsla(356, 86%, 96%, 1);
  --popover: hsla(352, 42%, 11%, 1);
  --popover-foreground: hsla(356, 86%, 96%, 1);

  --primary: hsla(356, 86%, 89%, 1); /* Luminous blush #FCD3D6 */
  --primary-hover: hsla(356, 90%, 94%, 1);
  --primary-foreground: hsla(168, 94%, 6%, 1);

  --secondary: hsla(352, 22%, 18%, 1); /* Dark dusty mauve/berry #382426 */
  --secondary-foreground: hsla(356, 86%, 96%, 1);
  --muted: hsla(352, 22%, 18%, 1);
  --muted-foreground: hsla(352, 20%, 65%, 1); /* Warm dusty rose #b89499 */

  --accent: hsla(164, 48%, 77%, 1); /* Mint secondary */
  --accent-foreground: hsla(168, 94%, 6%, 1);

  --border: hsla(352, 20%, 26%, 1); /* Deep berry border #503539 */
  --sidebar: hsla(352, 45%, 9%, 1); /* Deep night berry sidebar #210c10 */
}
```

### Recipe 2: "Sharp Tech" (Razor-Sharp 2px Corners)
*Best for: Developer dashboards, CLI companion apps, code editors, data tools.*

```css
:root {
  --radius: 2px; /* Razor sharp corners */
}
```

### Recipe 3: "Pebble Round" (18px Organic Curvature)
*Best for: Mobile-first web apps, casual games, journaling tools.*

```css
:root {
  --radius: 1.125rem; /* 18px pebble */
}
```

### Recipe 4: Custom HSL/Hex Brand Color
To adopt a completely new brand color (e.g. Cobalt Blue or Amber) while keeping the same tactile feel:
```css
:root {
  --primary: #2563eb; /* Your brand hue */
  --primary-hover: #1d4ed8;
  --primary-foreground: #ffffff;
  --radius: 10px; /* Desired curvature */
}
```

---

## 4. Live Preview & Interactive Testing

You can test how all variants look and feel live before applying them to a new project:
1. Navigate to [`/design-system/button`](file:///Users/henrikkohl/Documents/dev/kohl-design/app/design-system/button/page.tsx).
2. Use the **Project Preset Switcher** in the top toolbar to switch between:
   - **Pine Base (8px)**
   - **Blush Brand (14px • Pink)**
   - **Sharp Tech (2px Razor)**
   - **Pebble Round (18px Organic)**
3. Scroll to **Section 6: Multi-Project Token Customization** to copy the generated CSS tokens for the active preset with a single click.
