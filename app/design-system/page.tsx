import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Square,
  Sparkles,
  CheckCircle2,
  Compass,
  TextCursorInput,
  Tag,
  Bell,
  Code2,
  ShieldAlert,
  Palette,
  Type,
  PanelsTopLeft,
  PanelTop,
  ToggleLeft,
  CircleUser,
  SlidersHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DesignSystemIndexPage() {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Kohl Design System
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          A high-craft design system built for utilitarian consumer and productivity applications. Rooted in Midnight Forest Pine, warm Crimson Coral accents, Cooper editorial headlines, and 5-layer elevation.
        </p>
      </div>

      {/* Foundations Quick Access */}
      <section className="space-y-4">
        <h2 className="font-cooper text-xl sm:text-2xl font-normal text-foreground">
          Foundations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/design-system/anti-slop" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <ShieldAlert className="size-5 text-crimson-600 dark:text-crimson-400" />
                  <Badge variant="editorial" size="sm">Essential</Badge>
                </div>
                <h3 className="font-semibold text-base text-foreground group-hover:text-link transition-colors">
                  Anti-slop Guide
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Explicit rules and anti-patterns preventing generic AI clichés in interface generation.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>View Rules</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          <Link href="/design-system/colors" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <Palette className="size-5 text-link" />
                <h3 className="font-semibold text-base text-foreground group-hover:text-link transition-colors">
                  Color Tokens
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  28 brand tokens across Pine, Crimson, and Neutrals with live Pine ↔ Blush theme switching.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>View Palettes</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          <Link href="/design-system/typography" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <Type className="size-5 text-link" />
                <h3 className="font-semibold text-base text-foreground group-hover:text-link transition-colors">
                  Typography Hierarchy
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Expressive Cooper serif for display titles and high-legibility DM Sans for UI copy.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>View Typography</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          <Link href="/design-system/surfaces" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <Layers className="size-5 text-link" />
                <h3 className="font-semibold text-base text-foreground group-hover:text-link transition-colors">
                  Surfaces & Elevation
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  5 elevation layers, concentric corner radius geometry, and material depth physics.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>View Surfaces</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Components Catalog */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cooper text-xl sm:text-2xl font-normal text-foreground">
            Components
          </h2>
          <Link
            href="/design-system/registry"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Code2 className="size-3.5" />
            <span>Install via shadcn Registry</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Button Card */}
          <Link href="/design-system/button" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Square className="size-4 text-link" />
                  <Badge variant="default" size="sm">Interactive</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Button
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Brand Pine, Crimson, Editorial, Secondary, tactile click feedback, and loading spinners.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Button</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Card Component */}
          <Link href="/design-system/card" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <PanelsTopLeft className="size-4 text-link" />
                  <Badge variant="default" size="sm">5 Variants</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Card
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Primary content container with 5 elevation variants, interactive hover lifts, and subcomponent slots.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Card</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Badge */}
          <Link href="/design-system/badge" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Tag className="size-4 text-link" />
                  <Badge variant="editorial" size="sm">Tags</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Badge
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Color washes, animated pulse dots, status indicators, and dismissible pills.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Badge</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Input */}
          <Link href="/design-system/input" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TextCursorInput className="size-4 text-link" />
                  <Badge variant="secondary" size="sm">Forms</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Input & Field
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Text inputs with leading/trailing icons, error rings, and composable InputGroup wrappers.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Input</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Icons */}
          <Link href="/design-system/icons" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Compass className="size-4 text-link" />
                  <Badge variant="default" size="sm">20px / 1.5px</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Iconography
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Standardized Lucide wrapper enforcing optical 20px size and 1.5px stroke width.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Icons</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Toast */}
          <Link href="/design-system/toast" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Bell className="size-4 text-link" />
                  <Badge variant="secondary" size="sm">Sonner</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Toast Notification
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Accessible, stacked notifications powered by Sonner with brand tokens and spring motion.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Toast</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Tabs */}
          <Link href="/design-system/tabs" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <PanelTop className="size-4 text-link" />
                  <Badge variant="default" size="sm">3 Variants</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Tabs
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Accessible tabs with segmented pill, editorial underline, and filter chip variants.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Tabs</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Toggle & Toggle Group */}
          <Link href="/design-system/toggle" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <ToggleLeft className="size-4 text-link" />
                  <Badge variant="default" size="sm">Single & Group</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Toggle & Group
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Two-state buttons and group clusters with roving focus for formatting and view controls.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Toggle</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Avatar */}
          <Link href="/design-system/avatar" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CircleUser className="size-4 text-link" />
                  <Badge variant="default" size="sm">User Elements</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Avatar
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Profile image containers with fallback initials, online telemetry dots, and stacked AvatarGroup.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Avatar</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          {/* Chip */}
          <Link href="/design-system/chip" className="group">
            <Card variant="interactive" className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <SlidersHorizontal className="size-4 text-link" />
                  <Badge variant="editorial" size="sm">Interactive</Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-link transition-colors">
                  Chip
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Interactive filter chips, selectable badges with checkmark states, and dismissible tag tokens.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-link">
                <span>Explore Chip</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
