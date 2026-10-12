import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center font-sans font-medium text-xs transition-all duration-150 outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:active:scale-100 shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-muted data-[state=on]:text-foreground data-[state=on]:font-semibold",
        outline:
          "border border-border bg-transparent text-muted-foreground shadow-2xs hover:bg-muted hover:text-foreground data-[state=on]:bg-muted data-[state=on]:text-foreground data-[state=on]:border-foreground/30 data-[state=on]:font-semibold",
        primary:
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-2xs data-[state=on]:font-semibold",
        editorial:
          "bg-transparent text-muted-foreground hover:bg-crimson-50/50 dark:hover:bg-crimson-900/20 hover:text-crimson-800 dark:hover:text-crimson-200 data-[state=on]:bg-crimson-100/70 data-[state=on]:text-crimson-900 dark:data-[state=on]:bg-crimson-900/40 dark:data-[state=on]:text-crimson-200 data-[state=on]:font-semibold",
      },
      size: {
        xs: "h-7 min-w-7 px-2 text-xs gap-1 rounded-[var(--radius-sm)] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 min-w-8 px-2.5 text-xs gap-1.5 rounded-[var(--radius-sm)] [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-9 min-w-9 px-3 text-sm gap-2 rounded-[var(--radius)] [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 min-w-10 px-3.5 text-sm gap-2 rounded-[var(--radius)] [&_svg:not([class*='size-'])]:size-4",
        xl: "h-12 min-w-12 px-4 text-base gap-2.5 rounded-[var(--radius-lg)] [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
