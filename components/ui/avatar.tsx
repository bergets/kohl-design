"use client";

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden select-none",
  {
    variants: {
      size: {
        xs: "size-5 text-[10px]",
        sm: "size-7 text-xs",
        default: "size-9 text-sm",
        lg: "size-11 text-base",
        xl: "size-14 text-lg",
        "2xl": "size-20 text-2xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-[var(--radius)]",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "circle",
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape }), className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square size-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center font-medium font-sans uppercase select-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        pine: "bg-pine-100 text-pine-900 dark:bg-pine-900/60 dark:text-pine-200",
        crimson: "bg-crimson-100 text-crimson-900 dark:bg-crimson-900/60 dark:text-crimson-200",
        neutral: "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, variant, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackVariants({ variant }), className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "online" | "busy" | "away" | "offline"
  position?: "bottom-right" | "top-right"
}

const statusColorMap = {
  online: "bg-emerald-500",
  busy: "bg-rose-500",
  away: "bg-amber-500",
  offline: "bg-neutral-400 dark:bg-neutral-600",
}

const positionMap = {
  "bottom-right": "bottom-0 right-0",
  "top-right": "top-0 right-0",
}

const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, status = "online", position = "bottom-right", ...props }, ref) => (
    <span
      ref={ref}
      aria-label={`Status: ${status}`}
      className={cn(
        "absolute block size-2.5 rounded-full ring-2 ring-background z-10",
        positionMap[position],
        statusColorMap[status],
        className
      )}
      {...props}
    />
  )
)
AvatarBadge.displayName = "AvatarBadge"

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, ...props }, ref) => {
    const arrayChildren = React.Children.toArray(children)
    const visibleChildren = max ? arrayChildren.slice(0, max) : arrayChildren
    const excessCount = max ? arrayChildren.length - max : 0

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center -space-x-2.5 *:ring-2 *:ring-background",
          className
        )}
        {...props}
      >
        {visibleChildren}
        {excessCount > 0 && (
          <div className="relative flex size-9 items-center justify-center rounded-full bg-muted font-sans text-xs font-semibold text-muted-foreground ring-2 ring-background shadow-2xs">
            +{excessCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  avatarVariants,
}
