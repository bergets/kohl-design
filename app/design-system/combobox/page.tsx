"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/combobox.json"

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "solidstart", label: "SolidStart" },
]

const USAGE_CODE = `import {
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
} from "@/components/ui/combobox"

export function FrameworkSelect() {
  return (
    <Combobox>
      <div className="flex flex-col gap-1.5">
        <ComboboxLabel>Framework</ComboboxLabel>
        <div className="flex items-center gap-2">
          <ComboboxInput placeholder="Select a framework..." />
          <ComboboxTrigger aria-label="Show frameworks" />
        </div>
      </div>
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {frameworks.map((fw) => (
            <ComboboxItem key={fw.value} value={fw.value} label={fw.label}>
              <span>{fw.label}</span>
              <ComboboxItemIndicator />
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`

export default function ComboboxDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [selected, setSelected] = React.useState<string | null>("next")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Combobox
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Searchable option list supporting keyboard filtering, single or multi-select chips, and Level 2 popover elevation. Built on <code className="text-foreground">@ui-sdk/react/combobox</code>.
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
            Selected framework: <span className="font-semibold">{selected ?? "none"}</span>
          </p>

          <div className="max-w-sm">
            <Combobox
              value={selected}
              onValueChange={(next) => setSelected(next as string | null)}
            >
              <div className="flex flex-col gap-1.5">
                <ComboboxLabel>Framework</ComboboxLabel>
                <div className="flex items-center gap-2">
                  <ComboboxInput placeholder="Search frameworks..." />
                  <ComboboxClear />
                  <ComboboxTrigger aria-label="Show frameworks" />
                </div>
              </div>
              <ComboboxContent>
                <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                <ComboboxList>
                  {FRAMEWORKS.map((fw) => (
                    <ComboboxItem key={fw.value} value={fw.value} label={fw.label}>
                      <span>{fw.label}</span>
                      <ComboboxItemIndicator />
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
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
