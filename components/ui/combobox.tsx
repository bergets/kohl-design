"use client"

import * as React from "react"
import {
  Combobox as ComboboxPrimitive,
  ComboboxChip as ComboboxChipPrimitive,
  ComboboxChipRemove as ComboboxChipRemovePrimitive,
  ComboboxChips as ComboboxChipsPrimitive,
  ComboboxClear as ComboboxClearPrimitive,
  ComboboxContent as ComboboxContentPrimitive,
  ComboboxEmpty as ComboboxEmptyPrimitive,
  ComboboxGroup as ComboboxGroupPrimitive,
  ComboboxGroupLabel as ComboboxGroupLabelPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  ComboboxItem as ComboboxItemPrimitive,
  ComboboxItemIndicator as ComboboxItemIndicatorPrimitive,
  ComboboxLabel as ComboboxLabelPrimitive,
  ComboboxList as ComboboxListPrimitive,
  ComboboxTrigger as ComboboxTriggerPrimitive,
  type ComboboxProps as ComboboxPrimitiveProps,
} from "@ui-sdk/react/combobox"
import { cva } from "class-variance-authority"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"

type ComboboxSize = "xs" | "sm" | "default" | "lg" | "xl"

const ComboboxSizeContext = React.createContext<ComboboxSize>("default")

const comboboxInputVariants = cva(
  "flex w-full min-w-0 flex-1 border border-input bg-background/60 font-sans text-foreground shadow-2xs transition-all duration-150 ease-out outline-none placeholder:text-muted-foreground/60 hover:border-foreground/30 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30 data-[invalid]:border-destructive",
  {
    variants: {
      size: {
        xs: "h-7 px-2.5 text-xs rounded-[var(--radius-sm)]",
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
        default: "h-9 px-3.5 text-base sm:text-sm rounded-[var(--radius)]",
        lg: "h-10 px-4 text-base sm:text-sm rounded-[var(--radius)]",
        xl: "h-12 px-4.5 text-base rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const comboboxTriggerVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center border border-input bg-background/60 text-muted-foreground shadow-2xs transition-all duration-150 cursor-pointer hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 after:absolute after:-inset-2 after:content-[''] sm:after:hidden",
  {
    variants: {
      size: {
        xs: "h-7 w-7 rounded-[var(--radius-sm)] [&_svg]:size-3.5",
        sm: "h-8 w-8 rounded-[var(--radius-sm)] [&_svg]:size-3.5",
        default: "h-9 w-9 rounded-[var(--radius)] [&_svg]:size-4",
        lg: "h-10 w-10 rounded-[var(--radius)] [&_svg]:size-4",
        xl: "h-12 w-12 rounded-[var(--radius-lg)] [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type ComboboxProps<
  T = string,
  Multiple extends boolean | undefined = false,
> = ComboboxPrimitiveProps<T, Multiple> & {
  size?: ComboboxSize
}

function Combobox<
  T = string,
  Multiple extends boolean | undefined = false,
>({ size = "default", ...props }: ComboboxProps<T, Multiple>) {
  return (
    <ComboboxSizeContext.Provider value={size}>
      <ComboboxPrimitive<T, Multiple> {...(props as ComboboxPrimitiveProps<T, Multiple>)} />
    </ComboboxSizeContext.Provider>
  )
}

function ComboboxLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxLabelPrimitive>) {
  return (
    <ComboboxLabelPrimitive
      className={cn(
        "text-sm font-medium leading-none text-foreground select-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function ComboboxInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxInputPrimitive>) {
  const size = React.useContext(ComboboxSizeContext)

  return (
    <ComboboxInputPrimitive
      className={cn(comboboxInputVariants({ size }), className)}
      {...props}
    />
  )
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxTriggerPrimitive>) {
  const size = React.useContext(ComboboxSizeContext)

  return (
    <ComboboxTriggerPrimitive
      className={cn(comboboxTriggerVariants({ size }), className)}
      {...props}
    >
      {children ?? <ChevronDown strokeWidth={1.5} aria-hidden="true" />}
    </ComboboxTriggerPrimitive>
  )
}

function ComboboxClear({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxClearPrimitive>) {
  const size = React.useContext(ComboboxSizeContext)

  return (
    <ComboboxClearPrimitive
      aria-label="Clear selection"
      className={cn(comboboxTriggerVariants({ size }), className)}
      {...props}
    >
      {children ?? <X strokeWidth={1.5} aria-hidden="true" />}
    </ComboboxClearPrimitive>
  )
}

function ComboboxContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxContentPrimitive>) {
  return (
    <ComboboxContentPrimitive
      className={cn(
        "z-50 m-0 min-w-[var(--anchor-width,12rem)] max-h-[var(--available-height,18rem)] overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] outline-none",
        className
      )}
      {...props}
    />
  )
}

function ComboboxList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxListPrimitive>) {
  return (
    <ComboboxListPrimitive
      className={cn("flex flex-col gap-0.5 font-sans", className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxItemPrimitive>) {
  return (
    <ComboboxItemPrimitive
      className={cn(
        "relative flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm text-foreground outline-none select-none cursor-pointer transition-colors duration-100 data-[highlighted]:bg-muted data-[selected]:font-medium data-[selected]:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItemIndicator({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxItemIndicatorPrimitive>) {
  return (
    <ComboboxItemIndicatorPrimitive
      className={cn("inline-flex shrink-0 items-center text-primary", className)}
      {...props}
    >
      {children ?? <Check className="size-4" strokeWidth={1.5} aria-hidden="true" />}
    </ComboboxItemIndicatorPrimitive>
  )
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxEmptyPrimitive>) {
  return (
    <ComboboxEmptyPrimitive
      className={cn(
        "px-3 py-4 text-center text-xs text-muted-foreground empty:hidden",
        className
      )}
      {...props}
    />
  )
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxGroupPrimitive>) {
  return (
    <ComboboxGroupPrimitive
      className={cn("flex flex-col gap-0.5 py-1", className)}
      {...props}
    />
  )
}

function ComboboxGroupLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxGroupLabelPrimitive>) {
  return (
    <ComboboxGroupLabelPrimitive
      className={cn(
        "px-2.5 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxChipsPrimitive>) {
  return (
    <ComboboxChipsPrimitive
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxChipPrimitive>) {
  return (
    <ComboboxChipPrimitive
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-muted/70 px-2.5 py-0.5 text-xs font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChipRemove({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxChipRemovePrimitive>) {
  return (
    <ComboboxChipRemovePrimitive
      className={cn(
        "inline-flex size-4 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground cursor-pointer",
        className
      )}
      {...props}
    >
      {children ?? <X className="size-3" strokeWidth={1.5} aria-hidden="true" />}
    </ComboboxChipRemovePrimitive>
  )
}

export {
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
}
