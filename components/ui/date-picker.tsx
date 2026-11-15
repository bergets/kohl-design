"use client"

import * as React from "react"
import {
  CalendarDay as CalendarDayPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeading as CalendarHeadingPrimitive,
  CalendarNext as CalendarNextPrimitive,
  CalendarPrevious as CalendarPreviousPrimitive,
  CalendarWeekday as CalendarWeekdayPrimitive,
  CalendarWeekdays as CalendarWeekdaysPrimitive,
  CalendarWeeks as CalendarWeeksPrimitive,
  DatePicker as DatePickerPrimitive,
  DatePickerContent as DatePickerContentPrimitive,
  DatePickerHint as DatePickerHintPrimitive,
  DatePickerInput as DatePickerInputPrimitive,
  DatePickerTrigger as DatePickerTriggerPrimitive,
} from "@ui-sdk/react/date-picker"
import { cva } from "class-variance-authority"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type DatePickerSize = "xs" | "sm" | "default" | "lg" | "xl"

const DatePickerSizeContext = React.createContext<DatePickerSize>("default")

const datePickerInputVariants = cva(
  "flex w-full min-w-0 flex-1 border border-input bg-background/60 font-sans tabular-nums text-foreground shadow-2xs transition-all duration-150 ease-out outline-none placeholder:text-muted-foreground/60 hover:border-foreground/30 focus-visible:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30 data-[invalid]:border-destructive",
  {
    variants: {
      size: {
        xs: "h-7 px-2.5 text-xs rounded-[var(--radius-sm)]",
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
        default: "h-9 px-3.5 text-base sm:text-sm rounded-[var(--radius)]",
        lg: "h-10 px-4 text-base sm:text-sm rounded-[var(--radius)]",
        xl: "h-12 px-4.5 text-base rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const datePickerTriggerVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center border border-input bg-background/60 text-muted-foreground shadow-2xs transition-all duration-150 cursor-pointer hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 after:absolute after:-inset-2 after:content-[''] sm:after:hidden",
  {
    variants: {
      size: {
        xs: "h-7 w-7 rounded-[var(--radius-sm)] [&_svg]:size-3.5",
        sm: "h-8 w-8 rounded-[var(--radius-sm)] [&_svg]:size-3.5",
        default: "h-9 w-9 rounded-[var(--radius)] [&_svg]:size-4",
        lg: "h-10 w-10 rounded-[var(--radius)] [&_svg]:size-4",
        xl: "h-12 w-12 rounded-[var(--radius-lg)] [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type DatePickerProps = React.ComponentPropsWithoutRef<typeof DatePickerPrimitive> & {
  size?: DatePickerSize
}

function DatePicker({ size = "default", className, ...props }: DatePickerProps) {
  return (
    <DatePickerSizeContext.Provider value={size}>
      <DatePickerPrimitive
        className={cn("flex flex-col gap-1.5 font-sans", className)}
        {...props}
      />
    </DatePickerSizeContext.Provider>
  )
}

function DatePickerInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DatePickerInputPrimitive>) {
  const size = React.useContext(DatePickerSizeContext)

  return (
    <DatePickerInputPrimitive
      className={cn(datePickerInputVariants({ size }), className)}
      {...props}
    />
  )
}

function DatePickerTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DatePickerTriggerPrimitive>) {
  const size = React.useContext(DatePickerSizeContext)

  return (
    <DatePickerTriggerPrimitive
      aria-label="Open calendar"
      className={cn(datePickerTriggerVariants({ size }), className)}
      {...props}
    >
      {children ?? <CalendarIcon strokeWidth={1.5} aria-hidden="true" />}
    </DatePickerTriggerPrimitive>
  )
}

function DatePickerHint({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DatePickerHintPrimitive>) {
  return (
    <DatePickerHintPrimitive
      className={cn("text-xs text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function DatePickerContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DatePickerContentPrimitive>) {
  return (
    <DatePickerContentPrimitive
      className={cn(
        "z-50 m-0 max-w-[var(--available-width,22rem)] max-h-[var(--available-height,24rem)] overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-popover p-4 text-popover-foreground shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] outline-none font-sans select-none",
        className
      )}
      {...props}
    >
      {children ?? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <CalendarPreviousPrimitive className="inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-border/70 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
              <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </CalendarPreviousPrimitive>
            <CalendarHeadingPrimitive className="text-sm font-semibold text-foreground tracking-tight" />
            <CalendarNextPrimitive className="inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-border/70 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
              <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </CalendarNextPrimitive>
          </div>
          <CalendarGridPrimitive className="w-full border-collapse">
            <CalendarWeekdaysPrimitive className="grid grid-cols-7 gap-1 mb-1">
              {(index) => (
                <CalendarWeekdayPrimitive
                  index={index}
                  className="flex h-8 w-9 items-center justify-center text-xs font-medium text-muted-foreground"
                />
              )}
            </CalendarWeekdaysPrimitive>
            <CalendarWeeksPrimitive className="grid grid-cols-7 gap-1">
              {(cell) => (
                <CalendarDayPrimitive
                  value={cell.date}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-sm font-normal tabular-nums text-foreground transition-colors duration-100 outline-none cursor-pointer hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[today]:border data-[today]:border-primary/40 data-[today]:font-medium data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:font-semibold data-[range-start]:bg-primary data-[range-start]:text-primary-foreground data-[range-end]:bg-primary data-[range-end]:text-primary-foreground data-[range-middle]:bg-primary/15 data-[outside]:text-muted-foreground/40 data-[disabled]:pointer-events-none data-[disabled]:opacity-35"
                />
              )}
            </CalendarWeeksPrimitive>
          </CalendarGridPrimitive>
        </div>
      )}
    </DatePickerContentPrimitive>
  )
}

export {
  DatePicker,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerHint,
  DatePickerContent,
}
