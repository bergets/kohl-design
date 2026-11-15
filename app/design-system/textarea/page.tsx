"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/textarea.json"

const USAGE_CODE = `import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function NotesField() {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="notes">Handover notes</Label>
      <Textarea
        id="notes"
        autoResize
        placeholder="Write handover notes for the evening..."
      />
    </div>
  )
}`

export default function TextareaDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [variant, setVariant] = React.useState<"default" | "filled">("default")
  const [notes, setNotes] = React.useState("")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Textarea
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Multi-line text field with optional auto-growing height and Kohl surface variants. Built on <code className="text-foreground">@ui-sdk/react/textarea</code>.
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
              Characters: <span className="font-semibold tabular-nums">{notes.length}</span>
            </p>
            <div className="flex items-center gap-1.5">
              {(["default", "filled"] as const).map((v) => (
                <Button
                  key={v}
                  size="xs"
                  variant={variant === v ? "default" : "outline"}
                  onClick={() => setVariant(v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>

          <div className="max-w-lg space-y-1.5">
            <Label htmlFor="demo-textarea">Handover notes</Label>
            <Textarea
              id="demo-textarea"
              variant={variant}
              autoResize
              value={notes}
              onValueChange={(next) => setNotes(next)}
              placeholder="Write notes—grows automatically as you type..."
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
