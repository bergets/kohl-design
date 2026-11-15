"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  OTPInput,
  OTPInputGroup,
  OTPInputSeparator,
  OTPInputSlot,
} from "@/components/ui/otp-input"

const INSTALL_CMD = "npx shadcn@latest add https://kohl.design/r/otp-input.json"

const USAGE_CODE = `import {
  OTPInput,
  OTPInputGroup,
  OTPInputSeparator,
  OTPInputSlot,
} from "@/components/ui/otp-input"

export function VerificationCode() {
  return (
    <OTPInput maxLength={6}>
      <OTPInputGroup>
        <OTPInputSlot index={0} />
        <OTPInputSlot index={1} />
        <OTPInputSlot index={2} />
      </OTPInputGroup>
      <OTPInputSeparator />
      <OTPInputGroup>
        <OTPInputSlot index={3} />
        <OTPInputSlot index={4} />
        <OTPInputSlot index={5} />
      </OTPInputGroup>
    </OTPInput>
  )
}`

export default function OTPInputDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [size, setSize] = React.useState<"xs" | "sm" | "default" | "lg" | "xl">("default")
  const [code, setCode] = React.useState("")

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-cooper text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
          OTP Input
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          One-time verification code input backed by a single native input for seamless paste, undo, and SMS autofill. Built on <code className="text-foreground">@ui-sdk/react/otp-input</code>.
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
              Entered code: <span className="font-mono font-semibold">{code || "------"}</span>
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

          <div className="space-y-2">
            <Label>Verification code</Label>
            <OTPInput
              size={size}
              maxLength={6}
              value={code}
              onValueChange={(next) => setCode(next)}
              aria-label="Verification code"
            >
              <OTPInputGroup>
                <OTPInputSlot index={0} />
                <OTPInputSlot index={1} />
                <OTPInputSlot index={2} />
              </OTPInputGroup>
              <OTPInputSeparator />
              <OTPInputGroup>
                <OTPInputSlot index={3} />
                <OTPInputSlot index={4} />
                <OTPInputSlot index={5} />
              </OTPInputGroup>
            </OTPInput>
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
