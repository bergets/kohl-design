"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BottomBarProps extends React.HTMLAttributes<HTMLElement> {
  responsive?: boolean
}

const BottomBar = React.forwardRef<HTMLElement, BottomBarProps>(
  ({ className, responsive = true, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Mobile navigation"
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] inset-x-0 z-40 flex justify-center pointer-events-none",
        responsive && "md:hidden",
        className
      )}
      {...props}
    />
  )
)
BottomBar.displayName = "BottomBar"

const BottomBarDock = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pointer-events-auto flex items-center gap-2.5", className)}
    {...props}
  />
))
BottomBarDock.displayName = "BottomBarDock"

const BottomBarList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn(
      "flex items-center gap-0.5 rounded-full border border-border/50 bg-background/60 dark:bg-card/60 p-1 backdrop-blur-md shadow-lg",
      className
    )}
    {...props}
  />
))
BottomBarList.displayName = "BottomBarList"

export interface BottomBarTabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  active?: boolean
}

const BottomBarTab = React.forwardRef<HTMLButtonElement, BottomBarTabProps>(
  ({ className, asChild = false, active = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        role="tab"
        aria-selected={active}
        aria-current={active ? "page" : undefined}
        data-active={active ? "" : undefined}
        className={cn(
          "flex h-11 w-14 min-[375px]:w-16 shrink-0 items-center justify-center rounded-full transition-all duration-150 select-none cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-6",
          active
            ? "bg-muted text-foreground shadow-2xs"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
BottomBarTab.displayName = "BottomBarTab"

export interface BottomBarActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const BottomBarAction = React.forwardRef<HTMLButtonElement, BottomBarActionProps>(
  ({ className, asChild = false, children, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-150 select-none cursor-pointer hover:bg-primary-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        {...props}
      >
        {children ?? <Plus className="size-6" strokeWidth={1.75} aria-hidden="true" />}
      </Comp>
    )
  }
)
BottomBarAction.displayName = "BottomBarAction"

export {
  BottomBar,
  BottomBarDock,
  BottomBarList,
  BottomBarTab,
  BottomBarAction,
}
