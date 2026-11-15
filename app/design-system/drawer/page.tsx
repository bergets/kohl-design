"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerGrip,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/drawer.json"

const USAGE_CODE = `import {
  Drawer,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerContent,
  DrawerGrip,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function GoalDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="default" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerGrip />
        <DrawerTitle>Daily target</DrawerTitle>
        <DrawerDescription>Adjust your daily focus goal.</DrawerDescription>
        <div className="flex justify-end gap-2 pt-2">
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          <DrawerClose render={<Button variant="default" />}>Save</DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}`

export default function DrawerDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [side, setSide] = React.useState<"bottom" | "right" | "left" | "top">("bottom")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Drawer
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Draggable, snap-point sheet from any screen edge with focus trapping, backdrop dismissal, and safe-area padding. Built on <code className="text-foreground">@ui-sdk/react/drawer</code>.
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
              Edge: <span className="font-semibold">{side}</span>
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {(["bottom", "right", "left", "top"] as const).map((s) => (
                <Button
                  key={s}
                  size="xs"
                  variant={side === s ? "default" : "outline"}
                  onClick={() => setSide(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <Drawer side={side}>
            <DrawerTrigger render={<Button variant="default" />}>
              Open {side} drawer
            </DrawerTrigger>
            <DrawerBackdrop />
            <DrawerContent>
              {side === "bottom" && <DrawerGrip />}
              <div className="space-y-1.5">
                <DrawerTitle>Session preferences</DrawerTitle>
                <DrawerDescription>
                  Drag toward the edge or press Escape to dismiss.
                </DrawerDescription>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
                </DrawerClose>
                <DrawerClose render={<Button variant="default" />}>
                  Save changes
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
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
