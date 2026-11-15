"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  TokenInput,
  TokenInputEditor,
  TokenInputToken,
  TokenInputTokenRemove,
  TokenMenu,
  TokenMenuContent,
  TokenMenuItem,
  TokenMenuList,
  type TriggerMenuDataItem,
} from "@/components/ui/token-input"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/token-input.json"

const PEOPLE = [
  { value: "henrik", label: "Henrik Kohl" },
  { value: "astrid", label: "Astrid Lind" },
  { value: "ines", label: "Inès Moreau" },
  { value: "kofi", label: "Kofi Mensah" },
]

const USAGE_CODE = `import {
  TokenInput,
  TokenInputEditor,
  TokenInputToken,
  TokenInputTokenRemove,
  TokenMenu,
  TokenMenuContent,
  TokenMenuList,
  TokenMenuItem,
  type TriggerMenuDataItem,
} from "@/components/ui/token-input"

export function MentionComposer({ people }: { people: TriggerMenuDataItem[] }) {
  return (
    <TokenInput
      renderToken={(token) => (
        <TokenInputToken>
          {token.label}
          <TokenInputTokenRemove />
        </TokenInputToken>
      )}
    >
      <TokenInputEditor placeholder="Type @ to mention someone..." />
      <TokenMenu triggers={[{ char: "@", type: "mention", items: people }]}>
        <TokenMenuContent>
          <TokenMenuList>
            {(state) =>
              (state.items as TriggerMenuDataItem[]).map((item) => (
                <TokenMenuItem key={item.value} value={item.value} label={item.label}>
                  {item.label}
                </TokenMenuItem>
              ))
            }
          </TokenMenuList>
        </TokenMenuContent>
      </TokenMenu>
    </TokenInput>
  )
}`

export default function TokenInputDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Token Input
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Rich text composer mixing editable prose with inline atomic tokens for mentions, files, or tags. Built on <code className="text-foreground">@ui-sdk/react/token-input</code>.
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
          <div className="max-w-lg space-y-1.5">
            <Label>Message</Label>
            <TokenInput
              renderToken={(token) => (
                <TokenInputToken>
                  {token.label}
                  <TokenInputTokenRemove />
                </TokenInputToken>
              )}
            >
              <TokenInputEditor
                aria-label="Message"
                placeholder="Type @ to mention a teammate..."
              />
              <TokenMenu triggers={[{ char: "@", type: "mention", items: PEOPLE }]}>
                <TokenMenuContent>
                  <TokenMenuList>
                    {(state) =>
                      (state.items as TriggerMenuDataItem[]).map((item) => (
                        <TokenMenuItem
                          key={item.value}
                          value={item.value}
                          label={item.label}
                        >
                          {item.label}
                        </TokenMenuItem>
                      ))
                    }
                  </TokenMenuList>
                </TokenMenuContent>
              </TokenMenu>
            </TokenInput>
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
