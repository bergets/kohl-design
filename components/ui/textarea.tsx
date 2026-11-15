"use client"

import * as React from "react"
import { Textarea as TextareaPrimitive } from "@ui-sdk/react/textarea"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-24 w-full rounded-[var(--radius)] border px-3.5 py-2.5 font-sans text-base sm:text-sm text-foreground transition-all duration-150 ease-out outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default:
          "border-input bg-background/60 shadow-2xs hover:border-foreground/30 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
        filled:
          "border-transparent bg-muted/60 shadow-none hover:bg-muted/80 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextareaPrimitive>,
    VariantProps<typeof textareaVariants> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", error, ...props }, ref) => {
    return (
      <TextareaPrimitive
        ref={ref}
        aria-invalid={error ? true : props["aria-invalid"]}
        className={cn(textareaVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
