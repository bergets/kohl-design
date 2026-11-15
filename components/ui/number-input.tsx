"use client"

import * as React from "react"
import {
  NumberInput as NumberInputPrimitive,
  NumberInputControl as NumberInputControlPrimitive,
  NumberInputDecrement as NumberInputDecrementPrimitive,
  NumberInputGroup as NumberInputGroupPrimitive,
  NumberInputIncrement as NumberInputIncrementPrimitive,
  NumberInputScrubArea as NumberInputScrubAreaPrimitive,
  NumberInputScrubAreaCursor as NumberInputScrubAreaCursorPrimitive,
} from "@ui-sdk/react/number-input"
import { cva, type VariantProps } from "class-variance-authority"
import { Minus, MoveHorizontal, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

type NumberInputSize = "xs" | "sm" | "default" | "lg" | "xl"

const NumberInputSizeContext = React.createContext<NumberInputSize>("default")

const numberInputGroupVariants = cva(
  "inline-flex w-full items-center overflow-hidden border border-input bg-background/60 text-foreground shadow-2xs transition-all duration-150 ease-out hover:border-foreground/30 focus-within:bg-background focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:bg-muted/30 data-[invalid]:border-destructive data-[invalid]:ring-destructive/20",
  {
    variants: {
      size: {
        xs: "h-7 rounded-[var(--radius-sm)] text-xs",
        sm: "h-8 rounded-[var(--radius-sm)] text-xs",
        default: "h-9 rounded-[var(--radius)] text-sm",
        lg: "h-10 rounded-[var(--radius)] text-sm",
        xl: "h-12 rounded-[var(--radius-lg)] text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const numberInputButtonVariants = cva(
  "relative inline-flex h-full shrink-0 items-center justify-center text-muted-foreground transition-colors duration-150 select-none cursor-pointer hover:bg-muted/70 hover:text-foreground active:bg-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:bg-muted/80 after:absolute after:-inset-2 after:content-[''] sm:after:hidden",
  {
    variants: {
      size: {
        xs: "w-7 [&_svg]:size-3",
        sm: "w-8 [&_svg]:size-3.5",
        default: "w-9 [&_svg]:size-4",
        lg: "w-10 [&_svg]:size-4",
        xl: "w-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface NumberInputProps
  extends React.ComponentPropsWithoutRef<typeof NumberInputPrimitive> {
  size?: NumberInputSize
}

function NumberInput({
  size = "default",
  className,
  ...props
}: NumberInputProps) {
  return (
    <NumberInputSizeContext.Provider value={size}>
      <NumberInputPrimitive
        className={cn("flex flex-col gap-1.5 font-sans", className)}
        {...props}
      />
    </NumberInputSizeContext.Provider>
  )
}

export interface NumberInputGroupProps
  extends React.ComponentPropsWithoutRef<typeof NumberInputGroupPrimitive>,
    VariantProps<typeof numberInputGroupVariants> {}

function NumberInputGroup({
  className,
  size,
  ...props
}: NumberInputGroupProps) {
  const ctxSize = React.useContext(NumberInputSizeContext)
  const resolvedSize = size ?? ctxSize

  return (
    <NumberInputGroupPrimitive
      className={cn(numberInputGroupVariants({ size: resolvedSize }), className)}
      {...props}
    />
  )
}

function NumberInputControl({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NumberInputControlPrimitive>) {
  return (
    <NumberInputControlPrimitive
      className={cn(
        "h-full w-full min-w-0 flex-1 bg-transparent px-3 text-center font-sans tabular-nums text-base sm:text-inherit outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function NumberInputDecrement({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NumberInputDecrementPrimitive>) {
  const size = React.useContext(NumberInputSizeContext)

  return (
    <NumberInputDecrementPrimitive
      aria-label="Decrease"
      className={cn(
        numberInputButtonVariants({ size }),
        "border-r border-border/70",
        className
      )}
      {...props}
    >
      {children ?? <Minus strokeWidth={1.5} aria-hidden="true" />}
    </NumberInputDecrementPrimitive>
  )
}

function NumberInputIncrement({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NumberInputIncrementPrimitive>) {
  const size = React.useContext(NumberInputSizeContext)

  return (
    <NumberInputIncrementPrimitive
      aria-label="Increase"
      className={cn(
        numberInputButtonVariants({ size }),
        "border-l border-border/70",
        className
      )}
      {...props}
    >
      {children ?? <Plus strokeWidth={1.5} aria-hidden="true" />}
    </NumberInputIncrementPrimitive>
  )
}

function NumberInputScrubArea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NumberInputScrubAreaPrimitive>) {
  return (
    <NumberInputScrubAreaPrimitive
      className={cn(
        "inline-flex items-center gap-1.5 cursor-ew-resize select-none text-sm font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function NumberInputScrubAreaCursor({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NumberInputScrubAreaCursorPrimitive>) {
  return (
    <NumberInputScrubAreaCursorPrimitive
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children ?? <MoveHorizontal className="size-3.5" strokeWidth={1.5} aria-hidden="true" />}
    </NumberInputScrubAreaCursorPrimitive>
  )
}

export {
  NumberInput,
  NumberInputGroup,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputIncrement,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
}
