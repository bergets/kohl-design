"use client"

import * as React from "react"
import {
  Checkbox as CheckboxPrimitive,
  CheckboxGroup as CheckboxGroupPrimitive,
  CheckboxIndicator as CheckboxIndicatorPrimitive,
} from "@ui-sdk/react/checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive>) {
  return (
    <CheckboxPrimitive
      className={cn(
        "peer relative inline-flex size-5 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-input bg-background/60 text-primary-foreground shadow-2xs transition-all duration-150 outline-none cursor-pointer hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary disabled:cursor-not-allowed disabled:opacity-50 after:absolute after:-inset-2.5 after:content-['']",
        className
      )}
      {...props}
    >
      {children ?? (
        <CheckboxIndicatorPrimitive className="flex items-center justify-center text-current">
          <Check className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
        </CheckboxIndicatorPrimitive>
      )}
    </CheckboxPrimitive>
  )
}

function CheckboxIndicator({
  className,
  children,
  indeterminate,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxIndicatorPrimitive> & {
  indeterminate?: boolean
}) {
  return (
    <CheckboxIndicatorPrimitive
      className={cn("flex items-center justify-center text-current", className)}
      {...props}
    >
      {children ??
        (indeterminate ? (
          <Minus className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
        ) : (
          <Check className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
        ))}
    </CheckboxIndicatorPrimitive>
  )
}

const CheckboxGroup = CheckboxGroupPrimitive

export { Checkbox, CheckboxIndicator, CheckboxGroup }
