import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.resolve(rootDir, "public/r");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function readFile(relativePath) {
  const fullPath = path.resolve(rootDir, relativePath);
  return fs.readFileSync(fullPath, "utf8");
}

const registryItems = [
  {
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description: "Utility functions including cn() for Tailwind CSS class merging.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        content: readFile("lib/utils.ts"),
        type: "registry:lib",
        target: "lib/utils.ts",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Kohl Design Button with default (pine), accent (crimson), editorial, and secondary variants, plus loading state.",
    dependencies: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "lucide-react",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/button.tsx",
        content: readFile("components/ui/button.tsx"),
        type: "registry:ui",
        target: "components/ui/button.tsx",
      },
    ],
  },
  {
    name: "card",
    type: "registry:ui",
    title: "Card",
    description: "Kohl Design Card supporting 5 elevation layers: default, elevated, interactive, sunken, and glass.",
    dependencies: [
      "@radix-ui/react-slot",
      "class-variance-authority",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/card.tsx",
        content: readFile("components/ui/card.tsx"),
        type: "registry:ui",
        target: "components/ui/card.tsx",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "Kohl Design Badge with Pine/Crimson washes, status tones, animated pulse dots, and dismissible tags.",
    dependencies: [
      "class-variance-authority",
      "lucide-react",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/badge.tsx",
        content: readFile("components/ui/badge.tsx"),
        type: "registry:ui",
        target: "components/ui/badge.tsx",
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description: "Kohl Design Input with leading/trailing icons, error states, and composable InputGroup / InputAddon.",
    dependencies: [
      "class-variance-authority",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/input.tsx",
        content: readFile("components/ui/input.tsx"),
        type: "registry:ui",
        target: "components/ui/input.tsx",
      },
    ],
  },
  {
    name: "label",
    type: "registry:ui",
    title: "Label",
    description: "Accessible form label primitive built on Radix UI Label.",
    dependencies: [
      "@radix-ui/react-label",
      "class-variance-authority",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/label.tsx",
        content: readFile("components/ui/label.tsx"),
        type: "registry:ui",
        target: "components/ui/label.tsx",
      },
    ],
  },
  {
    name: "icon",
    type: "registry:ui",
    title: "Icon",
    description: "Kohl Design Icon wrapper ensuring standardized 20px size and 1.5px stroke width across Lucide icons.",
    dependencies: [
      "class-variance-authority",
      "lucide-react",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/icon.tsx",
        content: readFile("components/ui/icon.tsx"),
        type: "registry:ui",
        target: "components/ui/icon.tsx",
      },
    ],
  },
  {
    name: "sonner",
    type: "registry:ui",
    title: "Sonner",
    description: "Toaster wrapper for Sonner styled to match Kohl Design tokens.",
    dependencies: [
      "sonner",
      "next-themes",
    ],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/sonner.tsx",
        content: readFile("components/ui/sonner.tsx"),
        type: "registry:ui",
        target: "components/ui/sonner.tsx",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description: "Accessible Kohl Design Tabs supporting default (segmented pill), underline, and pills variants.",
    dependencies: [
      "@radix-ui/react-tabs",
      "class-variance-authority",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/tabs.tsx",
        content: readFile("components/ui/tabs.tsx"),
        type: "registry:ui",
        target: "components/ui/tabs.tsx",
      },
    ],
  },
  {
    name: "toggle",
    type: "registry:ui",
    title: "Toggle",
    description: "Kohl Design two-state button component with default, outline, primary, and editorial variants.",
    dependencies: [
      "@radix-ui/react-toggle",
      "class-variance-authority",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/toggle.tsx",
        content: readFile("components/ui/toggle.tsx"),
        type: "registry:ui",
        target: "components/ui/toggle.tsx",
      },
    ],
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    title: "ToggleGroup",
    description: "Kohl Design set of two-state buttons supporting single and multiple selection with unified variant and size inheritance.",
    dependencies: [
      "@radix-ui/react-toggle-group",
      "class-variance-authority",
    ],
    registryDependencies: ["utils", "toggle"],
    files: [
      {
        path: "components/ui/toggle-group.tsx",
        content: readFile("components/ui/toggle-group.tsx"),
        type: "registry:ui",
        target: "components/ui/toggle-group.tsx",
      },
    ],
  },
  {
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description: "Kohl Design image element with fallback initials, online status badges, and overlapping AvatarGroup stack.",
    dependencies: [
      "@radix-ui/react-avatar",
      "class-variance-authority",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/avatar.tsx",
        content: readFile("components/ui/avatar.tsx"),
        type: "registry:ui",
        target: "components/ui/avatar.tsx",
      },
    ],
  },
  {
    name: "chip",
    type: "registry:ui",
    title: "Chip",
    description: "Interactive, selectable, and dismissible tag chip component with checkmark feedback and ChipGroup wrapper.",
    dependencies: [
      "class-variance-authority",
      "lucide-react",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/chip.tsx",
        content: readFile("components/ui/chip.tsx"),
        type: "registry:ui",
        target: "components/ui/chip.tsx",
      },
    ],
  },
  {
    name: "brand-flower",
    type: "registry:ui",
    title: "BrandFlower",
    description: "Official blooming radial floral emblem vector component for Kohl Design.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/BrandFlower.tsx",
        content: readFile("components/BrandFlower.tsx"),
        type: "registry:ui",
        target: "components/BrandFlower.tsx",
      },
    ],
  },
  {
    name: "sidebar",
    type: "registry:ui",
    title: "Sidebar",
    description: "Composable desktop sidebar navigation layout with brand, context switcher, navigation items, status dots, widgets, and user profile.",
    dependencies: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "lucide-react",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/sidebar.tsx",
        content: readFile("components/ui/sidebar.tsx"),
        type: "registry:ui",
        target: "components/ui/sidebar.tsx",
      },
    ],
  },
  {
    name: "app-bar",
    type: "registry:ui",
    title: "AppBar",
    description: "Responsive mobile top header bar supporting brand marks, context selector pills, title, and action/avatar triggers with sync status dots.",
    dependencies: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "lucide-react",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/app-bar.tsx",
        content: readFile("components/ui/app-bar.tsx"),
        type: "registry:ui",
        target: "components/ui/app-bar.tsx",
      },
    ],
  },
  {
    name: "number-input",
    type: "registry:ui",
    title: "Number Input",
    description: "Locale-aware numeric input with step buttons, keyboard stepping, and optional label scrubbing.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/number-input.tsx",
        content: readFile("components/ui/number-input.tsx"),
        type: "registry:ui",
        target: "components/ui/number-input.tsx",
      },
    ],
  },
  {
    name: "otp-input",
    type: "registry:ui",
    title: "OTP Input",
    description: "One-time verification code input with paste, autofill, and slot navigation.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/otp-input.tsx",
        content: readFile("components/ui/otp-input.tsx"),
        type: "registry:ui",
        target: "components/ui/otp-input.tsx",
      },
    ],
  },
  {
    name: "combobox",
    type: "registry:ui",
    title: "Combobox",
    description: "Searchable option list supporting single or multi-select chips.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/combobox.tsx",
        content: readFile("components/ui/combobox.tsx"),
        type: "registry:ui",
        target: "components/ui/combobox.tsx",
      },
    ],
  },
  {
    name: "command",
    type: "registry:ui",
    title: "Command",
    description: "Filterable command list and palette with keyboard navigation, groups, and shortcuts.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/command.tsx",
        content: readFile("components/ui/command.tsx"),
        type: "registry:ui",
        target: "components/ui/command.tsx",
      },
    ],
  },
  {
    name: "calendar",
    type: "registry:ui",
    title: "Calendar",
    description: "Accessible month grid supporting single date, multiple dates, and date ranges.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/calendar.tsx",
        content: readFile("components/ui/calendar.tsx"),
        type: "registry:ui",
        target: "components/ui/calendar.tsx",
      },
    ],
  },
  {
    name: "date-picker",
    type: "registry:ui",
    title: "Date Picker",
    description: "Locale-aware date input paired with a Calendar popover.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/date-picker.tsx",
        content: readFile("components/ui/date-picker.tsx"),
        type: "registry:ui",
        target: "components/ui/date-picker.tsx",
      },
    ],
  },
  {
    name: "token-input",
    type: "registry:ui",
    title: "Token Input",
    description: "Rich text field mixing editable text with inline mention/tag tokens and trigger menus.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/token-input.tsx",
        content: readFile("components/ui/token-input.tsx"),
        type: "registry:ui",
        target: "components/ui/token-input.tsx",
      },
    ],
  },
  {
    name: "drawer",
    type: "registry:ui",
    title: "Drawer",
    description: "Draggable, snap-point sheet from any screen edge with focus management and backdrop.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/drawer.tsx",
        content: readFile("components/ui/drawer.tsx"),
        type: "registry:ui",
        target: "components/ui/drawer.tsx",
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description: "Accessible modal dialog with focus trapping, backdrop, and keyboard dismissal.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/dialog.tsx",
        content: readFile("components/ui/dialog.tsx"),
        type: "registry:ui",
        target: "components/ui/dialog.tsx",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description: "Accessible popup select supporting single or multi-select, groups, and 5-tier sizing.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/select.tsx",
        content: readFile("components/ui/select.tsx"),
        type: "registry:ui",
        target: "components/ui/select.tsx",
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    title: "Textarea",
    description: "Multi-line text input with auto-grow support and Kohl surface variants.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/textarea.tsx",
        content: readFile("components/ui/textarea.tsx"),
        type: "registry:ui",
        target: "components/ui/textarea.tsx",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    title: "Checkbox",
    description: "Accessible checkbox and checkbox group with indeterminate state and 44px touch expansion.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/checkbox.tsx",
        content: readFile("components/ui/checkbox.tsx"),
        type: "registry:ui",
        target: "components/ui/checkbox.tsx",
      },
    ],
  },
  {
    name: "menu",
    type: "registry:ui",
    title: "Menu",
    description: "Dropdown and context menu with items, checkbox/radio items, submenus, and keyboard typeahead.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/menu.tsx",
        content: readFile("components/ui/menu.tsx"),
        type: "registry:ui",
        target: "components/ui/menu.tsx",
      },
    ],
  },
  {
    name: "time-input",
    type: "registry:ui",
    title: "Time Input",
    description: "Locale-aware segmented time input with keyboard stepping and 5-tier sizing.",
    dependencies: ["@ui-sdk/react", "@ui-sdk/core", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/time-input.tsx",
        content: readFile("components/ui/time-input.tsx"),
        type: "registry:ui",
        target: "components/ui/time-input.tsx",
      },
    ],
  },
  {
    name: "bottom-bar",
    type: "registry:ui",
    title: "Bottom Bar",
    description: "Floating translucent glass island mobile tab bar with primary circular action button and safe-area clearance.",
    dependencies: ["@radix-ui/react-slot", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/bottom-bar.tsx",
        content: readFile("components/ui/bottom-bar.tsx"),
        type: "registry:ui",
        target: "components/ui/bottom-bar.tsx",
      },
    ],
  },
  {
    name: "theme",
    type: "registry:theme",
    title: "Kohl Theme Tokens",
    description: "Complete Tailwind CSS v4 design tokens and CSS variables for Kohl Design (Pine, Crimson, and Neutral scales, dark, blush, and neutral monochrome modes).",
    dependencies: ["tailwindcss", "tw-animate-css"],
    registryDependencies: [],
    files: [
      {
        path: "app/globals.css",
        content: readFile("app/globals.css"),
        type: "registry:theme",
        target: "app/globals.css",
      },
    ],
  },
];

for (const item of registryItems) {
  const filePath = path.resolve(outputDir, `${item.name}.json`);
  const jsonPayload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
  };
  fs.writeFileSync(filePath, JSON.stringify(jsonPayload, null, 2), "utf8");
  console.log(`Generated public/r/${item.name}.json`);
}

// Generate registry index
const indexPath = path.resolve(outputDir, "index.json");
fs.writeFileSync(
  indexPath,
  JSON.stringify(
    registryItems.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
    })),
    null,
    2
  ),
  "utf8"
);
console.log(`Generated public/r/index.json (${registryItems.length} items)`);
