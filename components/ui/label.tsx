import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  error?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, error, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs sm:text-sm font-medium text-foreground select-none inline-flex items-center gap-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          error && "text-destructive",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-destructive font-bold text-xs" aria-hidden="true">
            *
          </span>
        )}
      </label>
    )
  }
)
Label.displayName = "Label"

export { Label }
