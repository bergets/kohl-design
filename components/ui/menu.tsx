"use client"

import * as React from "react"
import {
  Menu as MenuPrimitive,
  MenuCheckboxItem as MenuCheckboxItemPrimitive,
  MenuContent as MenuContentPrimitive,
  MenuContextTrigger as MenuContextTriggerPrimitive,
  MenuGroup as MenuGroupPrimitive,
  MenuGroupLabel as MenuGroupLabelPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuItemIcon as MenuItemIconPrimitive,
  MenuItemIndicator as MenuItemIndicatorPrimitive,
  MenuRadioGroup as MenuRadioGroupPrimitive,
  MenuRadioItem as MenuRadioItemPrimitive,
  MenuSeparator as MenuSeparatorPrimitive,
  MenuShortcut as MenuShortcutPrimitive,
  MenuSub as MenuSubPrimitive,
  MenuSubContent as MenuSubContentPrimitive,
  MenuSubTrigger as MenuSubTriggerPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
} from "@ui-sdk/react/menu"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const Menu = MenuPrimitive
const MenuTrigger = MenuTriggerPrimitive
const MenuContextTrigger = MenuContextTriggerPrimitive
const MenuSub = MenuSubPrimitive
const MenuRadioGroup = MenuRadioGroupPrimitive

function MenuContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuContentPrimitive>) {
  return (
    <MenuContentPrimitive
      className={cn(
        "z-50 m-0 min-w-48 max-h-[var(--available-height,20rem)] overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] outline-none font-sans",
        className
      )}
      {...props}
    />
  )
}

function MenuSubContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuSubContentPrimitive>) {
  return (
    <MenuSubContentPrimitive
      className={cn(
        "z-50 m-0 min-w-44 max-h-[var(--available-height,20rem)] overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] outline-none font-sans",
        className
      )}
      {...props}
    />
  )
}

const itemClasses =
  "relative flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm text-foreground outline-none select-none cursor-pointer transition-colors duration-100 data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[destructive]:text-destructive data-[destructive]:data-[highlighted]:bg-destructive/10"

function MenuItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuItemPrimitive>) {
  return (
    <MenuItemPrimitive className={cn(itemClasses, className)} {...props} />
  )
}

function MenuCheckboxItem({
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof MenuCheckboxItemPrimitive>, "children"> & {
  children?: React.ReactNode
}) {
  return (
    <MenuCheckboxItemPrimitive
      className={cn(itemClasses, "pl-8", className)}
      {...props}
    >
      <MenuItemIndicatorPrimitive className="absolute left-2 inline-flex items-center justify-center text-primary">
        <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </MenuItemIndicatorPrimitive>
      {children}
    </MenuCheckboxItemPrimitive>
  )
}

function MenuRadioItem({
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof MenuRadioItemPrimitive>, "children"> & {
  children?: React.ReactNode
}) {
  return (
    <MenuRadioItemPrimitive
      className={cn(itemClasses, "pl-8", className)}
      {...props}
    >
      <MenuItemIndicatorPrimitive className="absolute left-2 inline-flex items-center justify-center text-primary">
        <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </MenuItemIndicatorPrimitive>
      {children}
    </MenuRadioItemPrimitive>
  )
}

function MenuSubTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof MenuSubTriggerPrimitive>, "children"> & {
  children?: React.ReactNode
}) {
  return (
    <MenuSubTriggerPrimitive
      className={cn(itemClasses, "justify-between", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
    </MenuSubTriggerPrimitive>
  )
}

function MenuItemIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuItemIconPrimitive>) {
  return (
    <MenuItemIconPrimitive
      className={cn(
        "inline-flex shrink-0 items-center text-muted-foreground [&_svg]:size-4 [&_svg]:stroke-[1.5]",
        className
      )}
      {...props}
    />
  )
}

function MenuItemIndicator({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuItemIndicatorPrimitive>) {
  return (
    <MenuItemIndicatorPrimitive
      className={cn("inline-flex items-center text-primary", className)}
      {...props}
    >
      {children ?? <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />}
    </MenuItemIndicatorPrimitive>
  )
}

function MenuGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuGroupPrimitive>) {
  return (
    <MenuGroupPrimitive
      className={cn("flex flex-col gap-0.5 py-0.5", className)}
      {...props}
    />
  )
}

function MenuGroupLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuGroupLabelPrimitive>) {
  return (
    <MenuGroupLabelPrimitive
      className={cn(
        "px-2.5 py-1 text-xs font-medium text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  )
}

function MenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuSeparatorPrimitive>) {
  return (
    <MenuSeparatorPrimitive
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function MenuShortcut({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuShortcutPrimitive>) {
  return (
    <MenuShortcutPrimitive
      className={cn(
        "ml-auto text-xs tracking-wider text-muted-foreground font-mono",
        className
      )}
      {...props}
    />
  )
}

export {
  Menu,
  MenuTrigger,
  MenuContextTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuItemIcon,
  MenuItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
}
