import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

type TabsVariant = "default" | "underline" | "pills"
type TabsSize = "xs" | "sm" | "default" | "lg" | "xl"

interface TabsListContextValue {
  variant: TabsVariant
  size: TabsSize
}

const TabsListContext = React.createContext<TabsListContextValue>({
  variant: "default",
  size: "default",
})

const tabsListVariants = cva(
  "inline-flex items-center justify-center font-sans",
  {
    variants: {
      variant: {
        default:
          "bg-muted/70 p-1 text-muted-foreground rounded-[var(--radius)] border border-border/70",
        underline:
          "border-b border-border w-full justify-start gap-1 bg-transparent p-0 rounded-none",
        pills:
          "gap-1.5 bg-transparent p-0",
      },
      size: {
        xs: "h-7 p-0.5 rounded-[var(--radius-sm)]",
        sm: "h-8 p-0.5 rounded-[var(--radius-sm)]",
        default: "h-9 p-1 rounded-[var(--radius)]",
        lg: "h-10 p-1 rounded-[var(--radius)]",
        xl: "h-12 p-1.5 rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-sans font-medium transition-all duration-150 outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-full [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-[var(--radius-sm)] text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:shadow-xs",
        underline:
          "border-b-2 border-transparent -mb-px text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:font-semibold",
        pills:
          "rounded-full text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold",
      },
      size: {
        xs: "text-[11px] px-2 gap-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "text-xs px-2.5 gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        default: "text-xs px-3 gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "text-sm px-3.5 gap-2 [&_svg:not([class*='size-'])]:size-4",
        xl: "text-base px-4.5 gap-2.5 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const resolvedVariant = variant || "default"
  const resolvedSize = size || "default"

  return (
    <TabsListContext.Provider
      value={{ variant: resolvedVariant, size: resolvedSize }}
    >
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant: resolvedVariant, size: resolvedSize, className }))}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsListContext.Provider>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, ...props }, ref) => {
  const context = React.useContext(TabsListContext)
  const resolvedVariant = variant ?? context.variant
  const resolvedSize = size ?? context.size

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        tabsTriggerVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          className,
        })
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants }
