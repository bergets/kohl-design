"use client"

import * as React from "react"
import { Check, Copy, Edit2, MoreHorizontal, Trash2, CopyPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIcon,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/components/ui/menu"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/menu.json"

const USAGE_CODE = `import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemIcon,
  MenuSeparator,
} from "@/components/ui/menu"
import { Button } from "@/components/ui/button"

export function RowActions() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" size="sm" />}>
        Actions
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="edit">Edit entry</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem value="delete" destructive>Delete</MenuItem>
      </MenuContent>
    </Menu>
  )
}`

export default function MenuDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [lastAction, setLastAction] = React.useState("None yet")
  const [showSeconds, setShowSeconds] = React.useState(false)

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Menu
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Dropdown and context menu with arrow-key navigation, typeahead, checkbox/radio items, and submenus. Built on <code className="text-foreground">@ui-sdk/react/menu</code>.
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
            Last action: <span className="font-semibold">{lastAction}</span>
          </p>

          <Menu onAction={(val) => setLastAction(val)}>
            <MenuTrigger render={<Button variant="outline" />}>
              <MoreHorizontal className="size-4" strokeWidth={1.5} aria-hidden="true" />
              <span>Entry actions</span>
            </MenuTrigger>
            <MenuContent>
              <MenuGroup>
                <MenuGroupLabel>Entry</MenuGroupLabel>
                <MenuItem value="edit" shortcut="mod+e">
                  <MenuItemIcon><Edit2 /></MenuItemIcon>
                  <span>Edit log</span>
                  <MenuShortcut />
                </MenuItem>
                <MenuItem value="duplicate">
                  <MenuItemIcon><CopyPlus /></MenuItemIcon>
                  <span>Duplicate</span>
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuCheckboxItem
                value="seconds"
                checked={showSeconds}
                onCheckedChange={setShowSeconds}
              >
                Show seconds
              </MenuCheckboxItem>
              <MenuSeparator />
              <MenuItem value="delete" destructive>
                <MenuItemIcon><Trash2 /></MenuItemIcon>
                <span>Delete entry</span>
              </MenuItem>
            </MenuContent>
          </Menu>
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
