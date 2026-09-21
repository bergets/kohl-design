import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[4px] font-sans font-medium text-sm transition-all duration-150 ease-out outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:active:scale-100 shrink-0 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_5px_rgba(0,32,26,0.22)] hover:bg-pine-700 active:bg-pine-800 dark:hover:bg-pine-500",
        accent:
          "bg-accent text-accent-foreground shadow-xs hover:bg-crimson-600 active:bg-crimson-700 dark:hover:bg-crimson-500",
        editorial:
          "bg-crimson-50 text-crimson-600 border border-crimson-200/70 shadow-2xs hover:bg-crimson-100 hover:border-crimson-300 active:bg-crimson-200/60 dark:bg-crimson-900/30 dark:text-crimson-100 dark:border-crimson-700/40 dark:hover:bg-crimson-900/50",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/70 shadow-2xs hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-700 dark:active:bg-neutral-600",
        outline:
          "border border-border bg-transparent text-foreground shadow-2xs hover:bg-neutral-50 dark:hover:bg-neutral-800/60 active:bg-neutral-100 dark:active:bg-neutral-800",
        ghost:
          "text-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800/60 active:bg-neutral-200 dark:active:bg-neutral-700",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 active:bg-destructive/80",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium active:scale-100 shadow-none",
      },
      size: {
        default: "h-10 px-5 text-sm gap-2 [&_svg:not([class*='size-'])]:size-4",
        sm: "h-8 px-3 text-xs gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 px-6 text-base gap-2.5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 p-0 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-8 p-0 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12 p-0 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
