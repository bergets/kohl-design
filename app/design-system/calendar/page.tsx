"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/calendar.json"

const USAGE_CODE = `import { Calendar } from "@/components/ui/calendar"

export function BookingCalendar() {
  return <Calendar defaultValue="2026-11-15" />
}`

export default function CalendarDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [date, setDate] = React.useState<string | null>("2026-11-15")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Calendar
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Accessible month grid supporting single dates, multiple dates, and date ranges with full arrow-key navigation. Built on <code className="text-foreground">@ui-sdk/react/calendar</code>.
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
            Selected ISO date: <span className="font-mono font-semibold">{date ?? "none"}</span>
          </p>

          <Calendar
            value={date}
            onValueChange={(next) => setDate(typeof next === "string" ? next : null)}
          />
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
