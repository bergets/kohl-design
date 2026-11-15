"use client"

import * as React from "react"
import {
  OTPInput as OTPInputPrimitive,
  OTPInputGroup as OTPInputGroupPrimitive,
  OTPInputSeparator as OTPInputSeparatorPrimitive,
  OTPInputSlot as OTPInputSlotPrimitive,
} from "@ui-sdk/react/otp-input"
import { cva } from "class-variance-authority"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

type OTPInputSize = "xs" | "sm" | "default" | "lg" | "xl"

const OTPInputSizeContext = React.createContext<OTPInputSize>("default")

const otpSlotVariants = cva(
  "relative flex items-center justify-center border-y border-r first:border-l border-input bg-background/60 font-sans font-medium tabular-nums text-foreground transition-all duration-150 select-none first:rounded-l-[var(--radius)] last:rounded-r-[var(--radius)] data-[active]:z-10 data-[active]:bg-background data-[active]:border-ring data-[active]:ring-2 data-[active]:ring-ring/25 data-[disabled]:opacity-50 data-[disabled]:bg-muted/30",
  {
    variants: {
      size: {
        xs: "h-7 w-7 text-xs first:rounded-l-[var(--radius-sm)] last:rounded-r-[var(--radius-sm)]",
        sm: "h-8 w-8 text-xs first:rounded-l-[var(--radius-sm)] last:rounded-r-[var(--radius-sm)]",
        default: "h-9 w-9 text-sm",
        lg: "h-10 w-10 text-sm",
        xl: "h-12 w-12 text-base first:rounded-l-[var(--radius-lg)] last:rounded-r-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface OTPInputProps
  extends React.ComponentPropsWithoutRef<typeof OTPInputPrimitive> {
  size?: OTPInputSize
}

function OTPInput({
  size = "default",
  className,
  ...props
}: OTPInputProps) {
  return (
    <OTPInputSizeContext.Provider value={size}>
      <OTPInputPrimitive
        className={cn(
          "inline-flex items-center gap-2 font-sans has-[:disabled]:opacity-50",
          className
        )}
        {...props}
      />
    </OTPInputSizeContext.Provider>
  )
}

function OTPInputGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof OTPInputGroupPrimitive>) {
  return (
    <OTPInputGroupPrimitive
      className={cn("inline-flex items-center shadow-2xs", className)}
      {...props}
    />
  )
}

function OTPInputSlot({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof OTPInputSlotPrimitive>) {
  const size = React.useContext(OTPInputSizeContext)

  return (
    <OTPInputSlotPrimitive
      className={cn(
        otpSlotVariants({ size }),
        "data-[fake-caret]:after:content-[''] data-[fake-caret]:after:block data-[fake-caret]:after:h-4 data-[fake-caret]:after:w-px data-[fake-caret]:after:bg-foreground data-[fake-caret]:after:animate-pulse",
        className
      )}
      {...props}
    />
  )
}

function OTPInputSeparator({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof OTPInputSeparatorPrimitive>) {
  return (
    <OTPInputSeparatorPrimitive
      className={cn("flex items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      {children ?? <Minus className="size-4" strokeWidth={1.5} aria-hidden="true" />}
    </OTPInputSeparatorPrimitive>
  )
}

export { OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator }
