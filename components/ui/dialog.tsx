"use client"

import * as React from "react"
import {
  Dialog as DialogPrimitive,
  DialogBackdrop as DialogBackdropPrimitive,
  DialogClose as DialogClosePrimitive,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogTrigger as DialogTriggerPrimitive,
} from "@ui-sdk/react/dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive
const DialogTrigger = DialogTriggerPrimitive
const DialogClose = DialogClosePrimitive

function DialogBackdrop({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogBackdropPrimitive>) {
  return (
    <DialogBackdropPrimitive
      className={cn(
        "fixed inset-0 z-50 bg-neutral-950/45 dark:bg-neutral-950/70 backdrop-blur-xs transition-opacity duration-200 data-[hidden]:hidden data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof DialogContentPrimitive>, "children"> & {
  children?: React.ReactNode
  showCloseButton?: boolean
}) {
  return (
    <DialogContentPrimitive
      className={cn(
        "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100%-2rem))] flex-col gap-4 overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-[0_16px_48px_-12px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65)] outline-none font-sans transition-all duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogClosePrimitive
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer after:absolute after:-inset-2 after:content-[''] sm:after:hidden"
        >
          <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </DialogClosePrimitive>
      )}
    </DialogContentPrimitive>
  )
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 pr-8", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogTitlePrimitive>) {
  return (
    <DialogTitlePrimitive
      className={cn(
        "font-cooper text-xl sm:text-2xl font-normal tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogDescriptionPrimitive>) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
