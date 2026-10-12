"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Palette,
  Type,
  Layers,
  Sparkles,
  Square,
  Tag,
  TextCursorInput,
  Bell,
  Code2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  PanelsTopLeft,
  PanelTop,
  ToggleLeft,
  CircleUser,
  SlidersHorizontal,
} from "lucide-react";
import { BrandFlower } from "@/components/BrandFlower";
import { useDesignSystem } from "./DesignSystemContext";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "System",
    items: [
      {
        title: "Introduction",
        href: "/design-system",
        icon: FileText,
      },
    ],
  },
  {
    title: "Foundations",
    items: [
      {
        title: "Anti-slop Guide",
        href: "/design-system/anti-slop",
        icon: ShieldAlert,
        badge: "Essential",
      },
      {
        title: "Colors & Tokens",
        href: "/design-system/colors",
        icon: Palette,
      },
      {
        title: "Typography",
        href: "/design-system/typography",
        icon: Type,
      },
      {
        title: "Surfaces & Elevation",
        href: "/design-system/surfaces",
        icon: Layers,
      },
      {
        title: "Iconography (1.5px)",
        href: "/design-system/icons",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/design-system/button",
        icon: Square,
      },
      {
        title: "Card",
        href: "/design-system/card",
        icon: PanelsTopLeft,
      },
      {
        title: "Badge",
        href: "/design-system/badge",
        icon: Tag,
      },
      {
        title: "Input & Field",
        href: "/design-system/input",
        icon: TextCursorInput,
      },
      {
        title: "Toast",
        href: "/design-system/toast",
        icon: Bell,
      },
      {
        title: "Tabs",
        href: "/design-system/tabs",
        icon: PanelTop,
      },
      {
        title: "Toggle",
        href: "/design-system/toggle",
        icon: ToggleLeft,
      },
      {
        title: "Avatar",
        href: "/design-system/avatar",
        icon: CircleUser,
      },
      {
        title: "Chip",
        href: "/design-system/chip",
        icon: SlidersHorizontal,
      },
    ],
  },
  {
    title: "Distribution",
    items: [
      {
        title: "shadcn Registry",
        href: "/design-system/registry",
        icon: Code2,
        badge: "v1.0",
      },
    ],
  },
];

export function DocsSidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const { setMobileNavOpen, viewMode } = useDesignSystem();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-card/60 backdrop-blur-md select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-5">
        <Link
          href="/design-system"
          onClick={() => setMobileNavOpen(false)}
          className="group flex items-center gap-2.5 font-medium text-foreground hover:opacity-90 transition-opacity"
        >
          <BrandFlower className="size-5 text-primary transition-transform group-hover:rotate-12 duration-300" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-cooper text-base tracking-tight text-foreground">Kohl</span>
            <span className="font-sans text-[11px] font-medium text-muted-foreground">design</span>
          </div>
        </Link>
        <span className="rounded-full bg-pine-100/70 dark:bg-pine-900/40 px-2 py-0.5 text-[10px] font-semibold text-pine-900 dark:text-pine-200 border border-pine-200/50 dark:border-pine-800/50">
          v1.0.0
        </span>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-3 text-[11px] font-medium text-muted-foreground/80 tracking-normal">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                const targetHref = viewMode === "agent" ? `${item.href}?view=agent` : item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={targetHref}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "group relative flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={cn(
                            "size-3.5 shrink-0 transition-colors",
                            isActive ? "text-primary-foreground" : "text-muted-foreground/80 group-hover:text-foreground"
                          )}
                          strokeWidth={1.5}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.2 text-[9px] font-semibold tracking-wide",
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-crimson-100/70 text-crimson-800 dark:bg-crimson-900/40 dark:text-crimson-200"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="border-t border-border p-3 space-y-1.5">
        <a
          href="/design-system.md"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-1.5 text-xs text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-foreground transition-colors"
        >
          <span className="flex items-center gap-2">
            <FileText className="size-3.5" strokeWidth={1.5} />
            <span>Raw Agent Markdown</span>
          </span>
          <ExternalLink className="size-3 opacity-60" />
        </a>
      </div>
    </aside>
  );
}
