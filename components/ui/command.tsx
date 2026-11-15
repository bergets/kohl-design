"use client"

import * as React from "react"
import {
  Command as CommandPrimitive,
  CommandEmpty as CommandEmptyPrimitive,
  CommandGroup as CommandGroupPrimitive,
  CommandGroupLabel as CommandGroupLabelPrimitive,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandItemIcon as CommandItemIconPrimitive,
  CommandList as CommandListPrimitive,
  CommandSeparator as CommandSeparatorPrimitive,
  CommandShortcut as CommandShortcutPrimitive,
} from "@ui-sdk/react/command"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"

function Command({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card text-card-foreground shadow-xs font-sans",
        className
      )}
      {...props}
    />
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandInputPrimitive>) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border/70 px-3.5">
      <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
      <CommandInputPrimitive
        className={cn(
          "flex h-10 w-full bg-transparent py-2 text-base sm:text-sm text-foreground outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandListPrimitive>) {
  return (
    <CommandListPrimitive
      className={cn(
        "max-h-72 overflow-y-auto overscroll-contain p-1.5 flex flex-col gap-1",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandEmptyPrimitive>) {
  return (
    <CommandEmptyPrimitive
      className={cn(
        "py-6 text-center text-sm text-muted-foreground empty:hidden",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandGroupPrimitive>) {
  return (
    <CommandGroupPrimitive
      className={cn("flex flex-col gap-0.5 py-1", className)}
      {...props}
    />
  )
}

function CommandGroupLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandGroupLabelPrimitive>) {
  return (
    <CommandGroupLabelPrimitive
      className={cn(
        "px-2.5 py-1 text-xs font-medium text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandItemPrimitive>) {
  return (
    <CommandItemPrimitive
      className={cn(
        "relative flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm text-foreground outline-none select-none cursor-pointer transition-colors duration-100 data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      {...props}
    />
  )
}

function CommandItemIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandItemIconPrimitive>) {
  return (
    <CommandItemIconPrimitive
      className={cn(
        "inline-flex shrink-0 items-center text-muted-foreground [&_svg]:size-4 [&_svg]:stroke-[1.5]",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandSeparatorPrimitive>) {
  return (
    <CommandSeparatorPrimitive
      className={cn("-mx-1.5 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandShortcutPrimitive>) {
  return (
    <CommandShortcutPrimitive
      className={cn(
        "ml-auto text-xs tracking-wider text-muted-foreground font-mono",
        className
      )}
      {...props}
    />
  )
}

export {
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
}
