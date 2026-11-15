"use client"

import * as React from "react"
import {
  Drawer as DrawerPrimitive,
  DrawerBackdrop as DrawerBackdropPrimitive,
  DrawerClose as DrawerClosePrimitive,
  DrawerContent as DrawerContentPrimitive,
  DrawerDescription as DrawerDescriptionPrimitive,
  DrawerTitle as DrawerTitlePrimitive,
  DrawerTrigger as DrawerTriggerPrimitive,
} from "@ui-sdk/react/drawer"

import { cn } from "@/lib/utils"

const Drawer = DrawerPrimitive
const DrawerTrigger = DrawerTriggerPrimitive
const DrawerClose = DrawerClosePrimitive

function DrawerBackdrop({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerBackdropPrimitive>) {
  return (
    <DrawerBackdropPrimitive
      className={cn(
        "fixed inset-0 z-50 bg-neutral-950/40 dark:bg-neutral-950/65 backdrop-blur-xs transition-opacity duration-200 data-[hidden]:hidden data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerContentPrimitive>) {
  return (
    <DrawerContentPrimitive
      className={cn(
        "fixed z-50 flex flex-col gap-4 border-border bg-card p-6 text-card-foreground shadow-xl outline-none font-sans transition-transform duration-300 ease-out",
        "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:mx-auto data-[side=bottom]:max-w-xl data-[side=bottom]:rounded-t-[var(--radius-lg)] data-[side=bottom]:border-t data-[side=bottom]:pb-[max(1.5rem,env(safe-area-inset-bottom))]",
        "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:mx-auto data-[side=top]:max-w-xl data-[side=top]:rounded-b-[var(--radius-lg)] data-[side=top]:border-b",
        "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-full data-[side=right]:max-w-sm data-[side=right]:border-l",
        "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-full data-[side=left]:max-w-sm data-[side=left]:border-r",
        className
      )}
      {...props}
    >
      {children}
    </DrawerContentPrimitive>
  )
}

function DrawerGrip({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      data-slot="grip"
      className={cn(
        "mx-auto -mt-2 mb-1 h-1.5 w-10 shrink-0 rounded-full bg-muted-foreground/25",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerTitlePrimitive>) {
  return (
    <DrawerTitlePrimitive
      className={cn(
        "font-cooper text-xl font-normal tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerDescriptionPrimitive>) {
  return (
    <DrawerDescriptionPrimitive
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerContent,
  DrawerGrip,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
