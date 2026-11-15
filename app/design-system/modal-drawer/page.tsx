"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ModalDrawer,
  ModalDrawerClose,
  ModalDrawerContent,
  ModalDrawerDescription,
  ModalDrawerFooter,
  ModalDrawerHeader,
  ModalDrawerTitle,
  ModalDrawerTrigger,
} from "@/components/ui/modal-drawer"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/modal-drawer.json"

const USAGE_CODE = `import {
  ModalDrawer,
  ModalDrawerTrigger,
  ModalDrawerContent,
  ModalDrawerHeader,
  ModalDrawerTitle,
  ModalDrawerDescription,
  ModalDrawerFooter,
  ModalDrawerClose,
} from "@/components/ui/modal-drawer"
import { Button } from "@/components/ui/button"

export function LogEntryModal() {
  return (
    <ModalDrawer>
      <ModalDrawerTrigger render={<Button variant="default" />}>
        Log entry
      </ModalDrawerTrigger>
      <ModalDrawerContent>
        <ModalDrawerHeader>
          <ModalDrawerTitle>Log entry</ModalDrawerTitle>
          <ModalDrawerDescription>
            Renders as a swipeable Drawer on mobile and a Dialog on desktop.
          </ModalDrawerDescription>
        </ModalDrawerHeader>
        <ModalDrawerFooter>
          <ModalDrawerClose render={<Button variant="outline" />}>Cancel</ModalDrawerClose>
          <ModalDrawerClose render={<Button variant="default" />}>Save</ModalDrawerClose>
        </ModalDrawerFooter>
      </ModalDrawerContent>
    </ModalDrawer>
  )
}`

export default function ModalDrawerDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [title, setTitle] = React.useState("Afternoon nap")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Modal Drawer
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Responsive modal pattern that renders a swipeable bottom <code className="text-foreground">Drawer</code> on mobile (&lt; 640px) and a centered <code className="text-foreground">Dialog</code> on desktop (&ge; 640px).
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
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-foreground border-b border-border/60 pb-4">
            Current entry title: <span className="font-semibold">{title}</span>
          </p>

          <ModalDrawer>
            <ModalDrawerTrigger render={<Button variant="default" />}>
              Open ModalDrawer
            </ModalDrawerTrigger>
            <ModalDrawerContent>
              <ModalDrawerHeader>
                <ModalDrawerTitle>Edit entry</ModalDrawerTitle>
                <ModalDrawerDescription>
                  Resize your viewport below 640px to see the swipeable bottom sheet.
                </ModalDrawerDescription>
              </ModalDrawerHeader>
              <div className="space-y-1.5">
                <Label htmlFor="md-title">Title</Label>
                <Input
                  id="md-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <ModalDrawerFooter>
                <ModalDrawerClose render={<Button variant="outline" />}>
                  Cancel
                </ModalDrawerClose>
                <ModalDrawerClose render={<Button variant="default" />}>
                  Save
                </ModalDrawerClose>
              </ModalDrawerFooter>
            </ModalDrawerContent>
          </ModalDrawer>
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
