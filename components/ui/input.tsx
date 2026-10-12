import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-[var(--radius)] border bg-background/60 text-foreground transition-all duration-150 ease-out outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/30",
  {
    variants: {
      variant: {
        default:
          "border-input shadow-2xs hover:border-foreground/30 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
        filled:
          "border-transparent bg-muted/60 shadow-none hover:bg-muted/80 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
        ghost:
          "border-0 border-b border-border rounded-none bg-transparent px-0 shadow-none hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-0",
      },
      inputSize: {
        xs: "h-7 px-2.5 text-xs rounded-[var(--radius-sm)]",
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
        default: "h-9 px-3.5 text-sm rounded-[var(--radius)]",
        lg: "h-10 px-4 text-sm rounded-[var(--radius)]",
        xl: "h-12 px-4.5 text-base rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  error?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant = "default",
      inputSize = "default",
      size: propSize,
      error,
      startIcon,
      endIcon,
      startAdornment,
      endAdornment,
      disabled,
      ...props
    },
    ref
  ) => {
    const resolvedSize = propSize || inputSize || "default"
    const hasStart = Boolean(startIcon || startAdornment)
    const hasEnd = Boolean(endIcon || endAdornment)

    const inputElement = (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? true : props["aria-invalid"]}
        className={cn(
          inputVariants({ variant, inputSize: resolvedSize }),
          hasStart &&
            (resolvedSize === "xs"
              ? "pl-7"
              : resolvedSize === "sm"
              ? "pl-8"
              : resolvedSize === "lg"
              ? "pl-10"
              : resolvedSize === "xl"
              ? "pl-12"
              : "pl-9"),
          hasEnd &&
            (resolvedSize === "xs"
              ? "pr-7"
              : resolvedSize === "sm"
              ? "pr-8"
              : resolvedSize === "lg"
              ? "pr-10"
              : resolvedSize === "xl"
              ? "pr-12"
              : "pr-9"),
          className
        )}
        {...props}
      />
    )

    if (!hasStart && !hasEnd) {
      return inputElement
    }

    const iconSizeClass =
      resolvedSize === "xs"
        ? "size-3"
        : resolvedSize === "sm"
        ? "size-3.5"
        : resolvedSize === "xl"
        ? "size-5"
        : "size-4"

    return (
      <div className="relative flex items-center w-full">
        {hasStart && (
          <div
            className={cn(
              "absolute inset-y-0 left-0 flex items-center justify-center pointer-events-none select-none text-muted-foreground/75 transition-colors",
              resolvedSize === "xs" && "w-7",
              resolvedSize === "sm" && "w-8",
              resolvedSize === "default" && "w-9",
              resolvedSize === "lg" && "w-10",
              resolvedSize === "xl" && "w-12",
              startIcon && `[&_svg:not([class*='size-'])]:${iconSizeClass} [&_svg]:shrink-0 [&_svg]:stroke-[1.5]`
            )}
          >
            {startIcon || startAdornment}
          </div>
        )}

        {inputElement}

        {hasEnd && (
          <div
            className={cn(
              "absolute inset-y-0 right-0 flex items-center justify-center select-none text-muted-foreground/75 transition-colors",
              resolvedSize === "xs" && "w-7",
              resolvedSize === "sm" && "w-8",
              resolvedSize === "default" && "w-9",
              resolvedSize === "lg" && "w-10",
              resolvedSize === "xl" && "w-12",
              endIcon && `[&_svg:not([class*='size-'])]:${iconSizeClass} [&_svg]:shrink-0 [&_svg]:stroke-[1.5]`
            )}
          >
            {endIcon || endAdornment}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

/* Composable InputGroup for composite inputs (e.g. URL prefixes, inline buttons) */
interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "default" | "lg" | "xl"
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    const radiusClass =
      size === "sm"
        ? "rounded-[var(--radius-sm)]"
        : size === "lg"
        ? "rounded-[var(--radius-lg)]"
        : "rounded-[var(--radius)]"

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-stretch w-full shadow-2xs border border-input bg-background/60 transition-all duration-150 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25 focus-within:bg-background overflow-hidden",
          radiusClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: "left" | "right"
}

const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, placement = "left", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 text-xs sm:text-sm font-medium text-muted-foreground bg-muted/40 select-none whitespace-nowrap",
          placement === "left" ? "border-r border-border/80" : "border-l border-border/80",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputAddon.displayName = "InputAddon"

export { Input, InputGroup, InputAddon, inputVariants }
