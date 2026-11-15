"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { TimeInput } from "@/components/ui/time-input"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/time-input.json"

const USAGE_CODE = `import { TimeInput } from "@/components/ui/time-input"
import { Label } from "@/components/ui/label"

export function NapStartField() {
  return (
    <div className="space-y-1.5">
      <Label>Nap start</Label>
      <TimeInput defaultValue="13:30" aria-label="Nap start" />
    </div>
  )
}`

export default function TimeInputDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [size, setSize] = React.useState<"xs" | "sm" | "default" | "lg" | "xl">("default")
  const [time, setTime] = React.useState<string | null>("13:30")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Time Input
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Locale-aware segmented time field emitting 24-hour <code className="text-foreground">HH:mm</code> strings with arrow-key stepping. Built on <code className="text-foreground">@ui-sdk/react/time-input</code>.
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
              24-hour value: <span className="font-mono font-semibold">{time ?? "empty"}</span>
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
                <Button
                  key={s}
                  size="xs"
                  variant={size === s ? "default" : "outline"}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Nap start time</Label>
            <TimeInput
              size={size}
              value={time}
              onValueChange={(next) => setTime(next)}
              aria-label="Nap start time"
            />
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
