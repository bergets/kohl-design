"use client"

import * as React from "react"
import {
  TimeInput as TimeInputPrimitive,
  TimeInputSegment as TimeInputSegmentPrimitive,
} from "@ui-sdk/react/time-input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const timeInputVariants = cva(
  "inline-flex items-center gap-0.5 border border-input bg-background/60 font-sans tabular-nums text-foreground shadow-2xs transition-all duration-150 ease-out hover:border-foreground/30 focus-within:bg-background focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:bg-muted/30 data-[invalid]:border-destructive",
  {
    variants: {
      size: {
        xs: "h-7 px-2 text-xs rounded-[var(--radius-sm)]",
        sm: "h-8 px-2.5 text-xs rounded-[var(--radius-sm)]",
        default: "h-9 px-3 text-base sm:text-sm rounded-[var(--radius)]",
        lg: "h-10 px-3.5 text-base sm:text-sm rounded-[var(--radius)]",
        xl: "h-12 px-4 text-base rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface TimeInputProps
  extends React.ComponentPropsWithoutRef<typeof TimeInputPrimitive>,
    VariantProps<typeof timeInputVariants> {}

function TimeInput({
  className,
  size = "default",
  ...props
}: TimeInputProps) {
  return (
    <TimeInputPrimitive
      className={cn(
        timeInputVariants({ size }),
        "[&_[data-slot=time-input-segment]]:rounded-[calc(var(--radius-sm)/2)] [&_[data-slot=time-input-segment]]:px-0.5 [&_[data-slot=time-input-segment]]:outline-none [&_[data-slot=time-input-segment]:focus]:bg-primary [&_[data-slot=time-input-segment]:focus]:text-primary-foreground [&_[data-slot=time-input-segment][data-placeholder]]:text-muted-foreground/60",
        className
      )}
      {...props}
    />
  )
}

function TimeInputSegment({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TimeInputSegmentPrimitive>) {
  return (
    <TimeInputSegmentPrimitive
      className={cn(
        "rounded-[calc(var(--radius-sm)/2)] px-0.5 outline-none focus:bg-primary focus:text-primary-foreground data-[placeholder]:text-muted-foreground/60",
        className
      )}
      {...props}
    />
  )
}

export { TimeInput, TimeInputSegment }
