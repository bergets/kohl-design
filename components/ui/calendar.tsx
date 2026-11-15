"use client"

import * as React from "react"
import {
  Calendar as CalendarPrimitive,
  CalendarDay as CalendarDayPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeading as CalendarHeadingPrimitive,
  CalendarNext as CalendarNextPrimitive,
  CalendarPrevious as CalendarPreviousPrimitive,
  CalendarWeekday as CalendarWeekdayPrimitive,
  CalendarWeekdays as CalendarWeekdaysPrimitive,
  CalendarWeeks as CalendarWeeksPrimitive,
} from "@ui-sdk/react/calendar"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

function Calendar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarPrimitive>) {
  return (
    <CalendarPrimitive
      className={cn(
        "inline-flex flex-col gap-3 rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground shadow-xs font-sans select-none",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <CalendarHeader>
            <CalendarPrevious />
            <CalendarHeading />
            <CalendarNext />
          </CalendarHeader>
          <CalendarGrid>
            <CalendarWeekdays>
              {(index) => <CalendarWeekday index={index} />}
            </CalendarWeekdays>
            <CalendarWeeks>
              {(cell) => <CalendarDay value={cell.date} />}
            </CalendarWeeks>
          </CalendarGrid>
        </>
      )}
    </CalendarPrimitive>
  )
}

function CalendarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

function CalendarHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarHeadingPrimitive>) {
  return (
    <CalendarHeadingPrimitive
      className={cn("text-sm font-semibold text-foreground tracking-tight", className)}
      {...props}
    />
  )
}

const navButtonClasses =
  "relative inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-border/70 bg-background/60 text-muted-foreground transition-colors duration-150 cursor-pointer hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 after:absolute after:-inset-1.5 after:content-[''] sm:after:hidden"

function CalendarPrevious({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarPreviousPrimitive>) {
  return (
    <CalendarPreviousPrimitive
      className={cn(navButtonClasses, className)}
      {...props}
    >
      {children ?? <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />}
    </CalendarPreviousPrimitive>
  )
}

function CalendarNext({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarNextPrimitive>) {
  return (
    <CalendarNextPrimitive
      className={cn(navButtonClasses, className)}
      {...props}
    >
      {children ?? <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden="true" />}
    </CalendarNextPrimitive>
  )
}

function CalendarGrid({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarGridPrimitive>) {
  return (
    <CalendarGridPrimitive
      className={cn("w-full border-collapse", className)}
      {...props}
    />
  )
}

function CalendarWeekdays({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarWeekdaysPrimitive>) {
  return (
    <CalendarWeekdaysPrimitive
      className={cn("grid grid-cols-7 gap-1 mb-1", className)}
      {...props}
    />
  )
}

function CalendarWeekday({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarWeekdayPrimitive>) {
  return (
    <CalendarWeekdayPrimitive
      className={cn(
        "flex h-8 w-9 items-center justify-center text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CalendarWeeks({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarWeeksPrimitive>) {
  return (
    <CalendarWeeksPrimitive
      className={cn("grid grid-cols-7 gap-1", className)}
      {...props}
    />
  )
}

function CalendarDay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CalendarDayPrimitive>) {
  return (
    <CalendarDayPrimitive
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-sm font-normal tabular-nums text-foreground transition-colors duration-100 outline-none cursor-pointer hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[today]:border data-[today]:border-primary/40 data-[today]:font-medium data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:font-semibold data-[selected]:hover:bg-primary/90 data-[range-start]:bg-primary data-[range-start]:text-primary-foreground data-[range-end]:bg-primary data-[range-end]:text-primary-foreground data-[range-middle]:bg-primary/15 data-[range-middle]:text-foreground data-[outside]:text-muted-foreground/40 data-[disabled]:pointer-events-none data-[disabled]:opacity-35 data-[unavailable]:line-through data-[unavailable]:opacity-40",
        className
      )}
      {...props}
    />
  )
}

export {
  Calendar,
  CalendarHeader,
  CalendarHeading,
  CalendarPrevious,
  CalendarNext,
  CalendarGrid,
  CalendarWeekdays,
  CalendarWeekday,
  CalendarWeeks,
  CalendarDay,
}
