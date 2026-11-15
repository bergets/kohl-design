"use client"

import * as React from "react"
import {
  Calendar,
  Check,
  Copy,
  CreditCard,
  Settings,
  Sparkles,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/command.json"

const USAGE_CODE = `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandItem,
  CommandItemIcon,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandPalette() {
  return (
    <Command>
      <CommandInput aria-label="Search commands" placeholder="Type a command..." />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          <CommandGroupLabel>Suggestions</CommandGroupLabel>
          <CommandItem value="calendar">
            <CommandItemIcon><Calendar /></CommandItemIcon>
            <span>Open calendar</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandGroupLabel>Settings</CommandGroupLabel>
          <CommandItem value="profile" shortcut="mod+p">
            <CommandItemIcon><User /></CommandItemIcon>
            <span>Profile</span>
            <CommandShortcut />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`

export default function CommandDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [lastAction, setLastAction] = React.useState<string>("None yet")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          Command
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Filterable command menu with keyboard roving focus, grouped actions, icons, and shortcut hints. Built on <code className="text-foreground">@ui-sdk/react/command</code>.
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
            Last triggered command: <span className="font-semibold">{lastAction}</span>
          </p>

          <div className="max-w-md">
            <Command>
              <CommandInput
                aria-label="Search commands"
                placeholder="Type a command or search..."
              />
              <CommandEmpty>No matching commands.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandGroupLabel>Suggestions</CommandGroupLabel>
                  <CommandItem value="calendar" onSelect={() => setLastAction("Calendar")}>
                    <CommandItemIcon><Calendar /></CommandItemIcon>
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem value="tokens" onSelect={() => setLastAction("Design tokens")}>
                    <CommandItemIcon><Sparkles /></CommandItemIcon>
                    <span>Design tokens</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <CommandGroupLabel>Settings</CommandGroupLabel>
                  <CommandItem value="profile" shortcut="mod+p" onSelect={() => setLastAction("Profile")}>
                    <CommandItemIcon><User /></CommandItemIcon>
                    <span>Profile</span>
                    <CommandShortcut />
                  </CommandItem>
                  <CommandItem value="billing" shortcut="mod+b" onSelect={() => setLastAction("Billing")}>
                    <CommandItemIcon><CreditCard /></CommandItemIcon>
                    <span>Billing</span>
                    <CommandShortcut />
                  </CommandItem>
                  <CommandItem value="settings" shortcut="mod+s" onSelect={() => setLastAction("Settings")}>
                    <CommandItemIcon><Settings /></CommandItemIcon>
                    <span>Settings</span>
                    <CommandShortcut />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
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
