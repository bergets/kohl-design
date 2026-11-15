"use client"

import * as React from "react"
import {
  Select as SelectPrimitive,
  SelectContent as SelectContentPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectGroupLabel as SelectGroupLabelPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectItemIndicator as SelectItemIndicatorPrimitive,
  SelectLabel as SelectLabelPrimitive,
  SelectSeparator as SelectSeparatorPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue as SelectValuePrimitive,
  type SelectProps as SelectPrimitiveProps,
} from "@ui-sdk/react/select"
import { cva } from "class-variance-authority"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type SelectSize = "xs" | "sm" | "default" | "lg" | "xl"

const SelectSizeContext = React.createContext<SelectSize>("default")

const selectTriggerVariants = cva(
  "relative inline-flex w-full items-center justify-between gap-2 border border-input bg-background/60 font-sans text-foreground shadow-2xs transition-all duration-150 ease-out outline-none select-none cursor-pointer hover:border-foreground/30 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30 data-[placeholder]:text-muted-foreground/60 data-[invalid]:border-destructive after:absolute after:-inset-y-1 after:inset-x-0 after:content-[''] sm:after:hidden",
  {
    variants: {
      size: {
        xs: "h-7 px-2.5 text-xs rounded-[var(--radius-sm)] [&_svg]:size-3.5",
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)] [&_svg]:size-3.5",
        default: "h-9 px-3.5 text-base sm:text-sm rounded-[var(--radius)] [&_svg]:size-4",
        lg: "h-10 px-4 text-base sm:text-sm rounded-[var(--radius)] [&_svg]:size-4",
        xl: "h-12 px-4.5 text-base rounded-[var(--radius-lg)] [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type SelectProps<
  T = string,
  Multiple extends boolean | undefined = false,
> = SelectPrimitiveProps<T, Multiple> & {
  size?: SelectSize
}

function Select<
  T = string,
  Multiple extends boolean | undefined = false,
>({ size = "default", ...props }: SelectProps<T, Multiple>) {
  return (
    <SelectSizeContext.Provider value={size}>
      <SelectPrimitive<T, Multiple> {...(props as SelectPrimitiveProps<T, Multiple>)} />
    </SelectSizeContext.Provider>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectLabelPrimitive>) {
  return (
    <SelectLabelPrimitive
      className={cn(
        "text-sm font-medium leading-none text-foreground select-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof SelectTriggerPrimitive>, "children"> & {
  children?: React.ReactNode
}) {
  const size = React.useContext(SelectSizeContext)

  return (
    <SelectTriggerPrimitive
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      {children ?? <SelectValue />}
      <ChevronDown className="shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
    </SelectTriggerPrimitive>
  )
}

function SelectValue({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectValuePrimitive>) {
  return (
    <SelectValuePrimitive
      className={cn("truncate text-left", className)}
      {...props}
    />
  )
}

function SelectContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectContentPrimitive>) {
  return (
    <SelectContentPrimitive
      className={cn(
        "z-50 m-0 min-w-[var(--anchor-width,10rem)] max-h-[var(--available-height,18rem)] overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] outline-none font-sans",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof SelectItemPrimitive>, "children"> & {
  children?: React.ReactNode
}) {
  return (
    <SelectItemPrimitive
      className={cn(
        "relative flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm text-foreground outline-none select-none cursor-pointer transition-colors duration-100 data-[highlighted]:bg-muted data-[selected]:font-medium data-[selected]:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <SelectItemIndicator />
    </SelectItemPrimitive>
  )
}

function SelectItemIndicator({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectItemIndicatorPrimitive>) {
  return (
    <SelectItemIndicatorPrimitive
      className={cn("inline-flex shrink-0 items-center text-primary", className)}
      {...props}
    >
      {children ?? <Check className="size-4" strokeWidth={1.5} aria-hidden="true" />}
    </SelectItemIndicatorPrimitive>
  )
}

function SelectGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectGroupPrimitive>) {
  return (
    <SelectGroupPrimitive
      className={cn("flex flex-col gap-0.5 py-1", className)}
      {...props}
    />
  )
}

function SelectGroupLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectGroupLabelPrimitive>) {
  return (
    <SelectGroupLabelPrimitive
      className={cn(
        "px-2.5 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectSeparatorPrimitive>) {
  return (
    <SelectSeparatorPrimitive
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
}
