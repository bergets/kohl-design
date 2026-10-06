import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-sans font-medium transition-all duration-150 select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
  {
    variants: {
      variant: {
        default:
          "bg-pine-100/70 text-pine-900 border border-pine-200/60 dark:bg-[#A8E3D2]/15 dark:text-[#A8E3D2] dark:border-[#3B7D6F]/30",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/70",
        outline:
          "border border-border text-foreground bg-transparent",
        editorial:
          "bg-crimson-50 text-crimson-700 border border-crimson-200/60 dark:bg-crimson-900/30 dark:text-crimson-100 dark:border-crimson-700/40",
        success:
          "bg-emerald-50 text-emerald-800 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
        warning:
          "bg-amber-50 text-amber-800 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
        destructive:
          "bg-red-50 text-red-800 border border-red-200/60 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/40",
        info:
          "bg-sky-50 text-sky-800 border border-sky-200/60 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-[var(--radius-sm)]",
      },
      size: {
        sm: "h-5 px-2 text-[10px] gap-1 font-semibold [&_svg]:size-2.5",
        default: "h-6 px-2.5 text-xs gap-1.5 [&_svg]:size-3",
        lg: "h-7 px-3 text-xs gap-2 font-medium [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "pill",
      size: "default",
    },
  }
)

const dotColorMap: Record<string, string> = {
  default: "bg-pine-600 dark:bg-[#A8E3D2]",
  secondary: "bg-muted-foreground",
  outline: "bg-foreground",
  editorial: "bg-crimson-500 dark:bg-crimson-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  destructive: "bg-red-500",
  info: "bg-sky-500",
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  pulse?: boolean
  onRemove?: () => void
  removeLabel?: string
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      shape = "pill",
      size = "default",
      dot = false,
      pulse = false,
      onRemove,
      removeLabel = "Remove tag",
      children,
      ...props
    },
    ref
  ) => {
    const dotColor = dotColorMap[variant || "default"] || "bg-current"

    return (
      <span
        ref={ref}
        data-slot="badge"
        data-variant={variant}
        data-shape={shape}
        data-size={size}
        className={cn(badgeVariants({ variant, shape, size }), className)}
        {...props}
      >
        {dot && (
          <span className="relative flex size-1.5 shrink-0" aria-hidden="true">
            {pulse && (
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                  dotColor
                )}
              />
            )}
            <span className={cn("relative inline-flex size-1.5 rounded-full", dotColor)} />
          </span>
        )}

        <span>{children}</span>

        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            aria-label={removeLabel}
            className="hover:opacity-100 opacity-60 transition-opacity cursor-pointer p-0.5 -mr-1 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-auto"
          >
            <X className={size === "sm" ? "size-2.5" : "size-3"} />
          </button>
        )}
      </span>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
