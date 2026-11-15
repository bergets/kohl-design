"use client"

import * as React from "react"
import { CalendarDays, Check, Copy, Home, MoreHorizontal, Plus, Shapes } from "lucide-react"
import {
  BottomBar,
  BottomBarAction,
  BottomBarDock,
  BottomBarList,
  BottomBarTab,
} from "@/components/ui/bottom-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/bottom-bar.json"

const USAGE_CODE = `import {
  BottomBar,
  BottomBarDock,
  BottomBarList,
  BottomBarTab,
  BottomBarAction,
} from "@/components/ui/bottom-bar"
import { Home, CalendarDays, Shapes, MoreHorizontal } from "lucide-react"

export function MobileNav({ activeTab, onSelect, onAdd }) {
  return (
    <BottomBar>
      <BottomBarDock>
        <BottomBarList>
          <BottomBarTab active={activeTab === "home"} aria-label="Home" onClick={() => onSelect("home")}>
            <Home strokeWidth={activeTab === "home" ? 1.75 : 1.5} fill={activeTab === "home" ? "currentColor" : "none"} />
          </BottomBarTab>
          <BottomBarTab active={activeTab === "timeline"} aria-label="Timeline" onClick={() => onSelect("timeline")}>
            <CalendarDays strokeWidth={activeTab === "timeline" ? 1.75 : 1.5} />
          </BottomBarTab>
          <BottomBarTab active={activeTab === "activities"} aria-label="Activities" onClick={() => onSelect("activities")}>
            <Shapes strokeWidth={activeTab === "activities" ? 1.75 : 1.5} fill={activeTab === "activities" ? "currentColor" : "none"} />
          </BottomBarTab>
          <BottomBarTab active={activeTab === "more"} aria-label="More" onClick={() => onSelect("more")}>
            <MoreHorizontal strokeWidth={activeTab === "more" ? 1.75 : 1.5} />
          </BottomBarTab>
        </BottomBarList>
        <BottomBarAction aria-label="Add entry" onClick={onAdd} />
      </BottomBarDock>
    </BottomBar>
  )
}`

export default function BottomBarDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<"home" | "timeline" | "activities" | "more">("home")
  const [addCount, setAddCount] = React.useState(0)

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Bottom Bar
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Floating translucent glass island tab bar for mobile screens, paired with a primary circular action button and safe-area clearance.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <div className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-1.5 text-foreground">
            <span className="text-muted-foreground select-none">$</span>
            <code>{INSTALL_CMD}</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copy(INSTALL_CMD, "cli")}
            aria-label="Copy install command"
          >
            {copied === "cli" ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
          </Button>
        </div>
      </section>

      <Card variant="default">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <p className="text-sm text-foreground">
              Active tab: <span className="font-semibold">{activeTab}</span> · Primary action clicks: <span className="font-semibold tabular-nums">{addCount}</span>
            </p>
          </div>

          {/* Inline preview of the floating island dock */}
          <div className="flex justify-center rounded-[var(--radius)] border border-border/60 bg-muted/30 py-8">
            <BottomBar responsive={false} className="static pointer-events-auto">
              <BottomBarDock>
                <BottomBarList>
                  <BottomBarTab
                    active={activeTab === "home"}
                    aria-label="Home"
                    onClick={() => setActiveTab("home")}
                  >
                    <Home
                      strokeWidth={activeTab === "home" ? 1.75 : 1.5}
                      fill={activeTab === "home" ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  </BottomBarTab>
                  <BottomBarTab
                    active={activeTab === "timeline"}
                    aria-label="Timeline"
                    onClick={() => setActiveTab("timeline")}
                  >
                    <CalendarDays
                      strokeWidth={activeTab === "timeline" ? 1.75 : 1.5}
                      aria-hidden="true"
                    />
                  </BottomBarTab>
                  <BottomBarTab
                    active={activeTab === "activities"}
                    aria-label="Activities"
                    onClick={() => setActiveTab("activities")}
                  >
                    <Shapes
                      strokeWidth={activeTab === "activities" ? 1.75 : 1.5}
                      fill={activeTab === "activities" ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  </BottomBarTab>
                  <BottomBarTab
                    active={activeTab === "more"}
                    aria-label="More"
                    onClick={() => setActiveTab("more")}
                  >
                    <MoreHorizontal
                      strokeWidth={activeTab === "more" ? 1.75 : 1.5}
                      aria-hidden="true"
                    />
                  </BottomBarTab>
                </BottomBarList>
                <BottomBarAction
                  aria-label="Add entry"
                  onClick={() => setAddCount((c) => c + 1)}
                >
                  <Plus className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </BottomBarAction>
              </BottomBarDock>
            </BottomBar>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-cooper text-2xl font-normal text-foreground">Usage</h2>
          <Button variant="ghost" size="sm" onClick={() => copy(USAGE_CODE, "usage")}>
            {copied === "usage" ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
            <span>{copied === "usage" ? "Copied" : "Copy"}</span>
          </Button>
        </div>
        <Card variant="sunken" size="sm">
          <pre className="overflow-x-auto text-xs leading-relaxed text-foreground font-mono">
            <code>{USAGE_CODE}</code>
          </pre>
        </Card>
      </section>
    </div>
  )
}
