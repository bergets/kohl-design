"use client"

import * as React from "react"
import {
  TokenInput as TokenInputPrimitive,
  TokenInputEditor as TokenInputEditorPrimitive,
  TokenInputToken as TokenInputTokenPrimitive,
  TokenInputTokenRemove as TokenInputTokenRemovePrimitive,
} from "@ui-sdk/react/token-input"
import {
  TriggerMenu as TriggerMenuPrimitive,
  TriggerMenuContent as TriggerMenuContentPrimitive,
  TriggerMenuEmpty as TriggerMenuEmptyPrimitive,
  TriggerMenuItem as TriggerMenuItemPrimitive,
  TriggerMenuList as TriggerMenuListPrimitive,
  type TriggerMenuDataItem,
} from "@ui-sdk/react/trigger-menu"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const TokenInput = TokenInputPrimitive

function TokenInputEditor({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TokenInputEditorPrimitive>) {
  return (
    <TokenInputEditorPrimitive
      className={cn(
        "min-h-11 sm:min-h-9 w-full rounded-[var(--radius)] border border-input bg-background/60 px-3 py-2 font-sans text-base sm:text-sm text-foreground shadow-2xs transition-all duration-150 ease-out outline-none hover:border-foreground/30 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/60 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:bg-muted/30",
        className
      )}
      {...props}
    />
  )
}

function TokenInputToken({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TokenInputTokenPrimitive>) {
  return (
    <TokenInputTokenPrimitive
      className={cn(
        "mx-0.5 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary align-baseline select-none data-[selected]:ring-2 data-[selected]:ring-ring",
        className
      )}
      {...props}
    />
  )
}

function TokenInputTokenRemove({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof TokenInputTokenRemovePrimitive>) {
  return (
    <TokenInputTokenRemovePrimitive
      aria-label="Remove token"
      className={cn(
        "inline-flex size-3.5 items-center justify-center rounded-full text-primary/70 hover:bg-primary/20 hover:text-primary cursor-pointer",
        className
      )}
      {...props}
    >
      {children ?? <X className="size-3" strokeWidth={1.75} aria-hidden="true" />}
    </TokenInputTokenRemovePrimitive>
  )
}

const TokenMenu = TriggerMenuPrimitive

function TokenMenuContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TriggerMenuContentPrimitive>) {
  return (
    <TriggerMenuContentPrimitive
      className={cn(
        "z-50 m-0 min-w-48 max-h-[var(--available-height,16rem)] overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-popover p-1 text-popover-foreground shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] outline-none font-sans",
        className
      )}
      {...props}
    />
  )
}

function TokenMenuList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TriggerMenuListPrimitive>) {
  return (
    <TriggerMenuListPrimitive
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function TokenMenuItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TriggerMenuItemPrimitive>) {
  return (
    <TriggerMenuItemPrimitive
      className={cn(
        "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm text-foreground outline-none select-none cursor-pointer transition-colors duration-100 data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      {...props}
    />
  )
}

function TokenMenuEmpty({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TriggerMenuEmptyPrimitive>) {
  return (
    <TriggerMenuEmptyPrimitive
      className={cn(
        "px-3 py-3 text-center text-xs text-muted-foreground empty:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  TokenInput,
  TokenInputEditor,
  TokenInputToken,
  TokenInputTokenRemove,
  TokenMenu,
  TokenMenuContent,
  TokenMenuList,
  TokenMenuItem,
  TokenMenuEmpty,
  type TriggerMenuDataItem,
}
