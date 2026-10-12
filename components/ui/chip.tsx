"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Check } from "lucide-react"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-sans font-medium transition-all duration-150 outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:active:scale-100 shrink-0 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-muted/70 text-foreground border border-border/70 hover:bg-muted hover:border-border data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:border-primary data-[selected=true]:shadow-2xs data-[selected=true]:font-semibold",
        outline:
          "bg-transparent text-foreground border border-border shadow-2xs hover:bg-muted data-[selected=true]:bg-muted data-[selected=true]:text-foreground data-[selected=true]:border-foreground/40 data-[selected=true]:font-semibold",
        primary:
          "bg-transparent text-foreground border border-primary/40 hover:bg-primary/10 hover:border-primary/60 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:border-primary data-[selected=true]:shadow-2xs data-[selected=true]:font-semibold",
        editorial:
          "bg-crimson-50/70 text-crimson-900 border border-crimson-200/70 hover:bg-crimson-100/80 dark:bg-crimson-900/30 dark:text-crimson-100 dark:border-crimson-700/50 data-[selected=true]:bg-crimson-600 data-[selected=true]:text-white data-[selected=true]:border-crimson-600 dark:data-[selected=true]:bg-crimson-400 dark:data-[selected=true]:text-crimson-950 dark:data-[selected=true]:border-crimson-400 data-[selected=true]:font-semibold data-[selected=true]:shadow-2xs",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/80 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 data-[selected=true]:bg-neutral-900 data-[selected=true]:text-white dark:data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:text-neutral-950 data-[selected=true]:border-transparent data-[selected=true]:font-semibold data-[selected=true]:shadow-2xs",
      },
      size: {
        xs: "h-6 px-2 text-[11px] gap-1 rounded-[var(--radius-sm)] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 px-2.5 text-xs gap-1.5 rounded-[var(--radius-sm)] [&_svg:not([class*='size-'])]:size-3",
        default: "h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 px-3.5 text-sm gap-2 rounded-[var(--radius)] [&_svg:not([class*='size-'])]:size-4",
        xl: "h-10 px-4 text-sm gap-2 rounded-[var(--radius)] [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-[var(--radius-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "pill",
    },
  }
)

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  selected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
  onRemove?: () => void
  removeLabel?: string
  leadingIcon?: React.ReactNode
  showCheckmark?: boolean
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      shape = "pill",
      selected: controlledSelected,
      defaultSelected = false,
      onSelectedChange,
      onRemove,
      removeLabel = "Remove tag",
      leadingIcon,
      showCheckmark = false,
      children,
      onClick,
      onKeyDown,
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolledSelected, setUncontrolledSelected] =
      React.useState(defaultSelected)
    const isControlled = controlledSelected !== undefined
    const isSelected = isControlled ? controlledSelected : uncontrolledSelected

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledSelected(!uncontrolledSelected)
      }
      onSelectedChange?.(!isSelected)
      onClick?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (onRemove && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault()
        onRemove()
      }
      onKeyDown?.(e)
    }

    const handleRemoveClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      if (disabled) return
      onRemove?.()
    }

    const isSelectable = onSelectedChange !== undefined || controlledSelected !== undefined

    return (
      <button
        ref={ref}
        type="button"
        role={isSelectable ? "checkbox" : "button"}
        aria-checked={isSelectable ? isSelected : undefined}
        data-selected={isSelected}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(chipVariants({ variant, size, shape }), className)}
        {...props}
      >
        {/* Leading element or checkmark indicator */}
        {showCheckmark && isSelected ? (
          <Check className="size-3 animate-in fade-in zoom-in-75 duration-150" />
        ) : (
          leadingIcon && <span className="inline-flex shrink-0">{leadingIcon}</span>
        )}

        {/* Chip Label */}
        <span>{children}</span>

        {/* Trailing Dismiss Action */}
        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            aria-label={removeLabel}
            onClick={handleRemoveClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                e.stopPropagation()
                onRemove()
              }
            }}
            className="inline-flex size-3.5 items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-current/15 transition-opacity cursor-pointer -mr-0.5"
          >
            <X className="size-2.5" />
          </span>
        )}
      </button>
    )
  }
)
Chip.displayName = "Chip"

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    />
  )
)
ChipGroup.displayName = "ChipGroup"

export { Chip, ChipGroup, chipVariants }
