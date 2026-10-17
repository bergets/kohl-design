"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * AppBar Container
 * ------------------------------------------------------------------------- */
const appBarVariants = cva(
  "w-full select-none transition-colors",
  {
    variants: {
      position: {
        sticky: "sticky top-0 z-40",
        fixed: "fixed top-0 left-0 right-0 z-40",
        static: "relative z-10",
      },
      variant: {
        default:
          "border-b border-sidebar-border/80 bg-sidebar/95 backdrop-blur-md text-sidebar-foreground",
        glass:
          "border-b border-border/80 bg-background/80 backdrop-blur-md text-foreground",
        plain:
          "border-b border-border bg-background text-foreground",
      },
      size: {
        sm: "h-12",
        default: "h-14",
        lg: "h-16",
      },
      responsive: {
        true: "md:hidden",
        false: "",
      },
      safeArea: {
        true: "pt-[env(safe-area-inset-top,0px)]",
        false: "",
      },
    },
    defaultVariants: {
      position: "sticky",
      variant: "default",
      size: "default",
      responsive: true,
      safeArea: true,
    },
  }
);

export interface AppBarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof appBarVariants> {
  asChild?: boolean;
}

export const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  (
    {
      className,
      position,
      variant,
      size,
      responsive,
      safeArea,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "header";
    return (
      <Comp
        ref={ref as React.Ref<any>}
        data-slot="app-bar"
        className={cn(
          appBarVariants({
            position,
            variant,
            size,
            responsive,
            safeArea,
          }),
          className
        )}
        {...props}
      />
    );
  }
);
AppBar.displayName = "AppBar";

/* -------------------------------------------------------------------------
 * AppBar Container (Inner Flex Area)
 * ------------------------------------------------------------------------- */
export interface AppBarContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

export const AppBarContainer = React.forwardRef<
  HTMLDivElement,
  AppBarContainerProps
>(({ className, maxWidth = "lg", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="app-bar-container"
      className={cn(
        "mx-auto flex h-full items-center justify-between px-4 sm:px-6 gap-3",
        maxWidthMap[maxWidth],
        className
      )}
      {...props}
    />
  );
});
AppBarContainer.displayName = "AppBarContainer";

/* -------------------------------------------------------------------------
 * AppBar Leading Slot (Left side: Brand, Back, or Drawer Trigger)
 * ------------------------------------------------------------------------- */
export interface AppBarLeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AppBarLeading = React.forwardRef<
  HTMLDivElement,
  AppBarLeadingProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="app-bar-leading"
      className={cn("flex items-center gap-2.5 min-w-0 shrink-0", className)}
      {...props}
    />
  );
});
AppBarLeading.displayName = "AppBarLeading";

/* -------------------------------------------------------------------------
 * AppBar Title
 * ------------------------------------------------------------------------- */
export interface AppBarTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export const AppBarTitle = React.forwardRef<
  HTMLHeadingElement,
  AppBarTitleProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp
      ref={ref as React.Ref<any>}
      data-slot="app-bar-title"
      className={cn(
        "font-sans font-semibold text-xs sm:text-sm text-foreground truncate",
        className
      )}
      {...props}
    />
  );
});
AppBarTitle.displayName = "AppBarTitle";

/* -------------------------------------------------------------------------
 * AppBar Context Pill (Context Switcher / Child / Workspace Selector)
 * ------------------------------------------------------------------------- */
export interface AppBarContextPillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  avatar?: React.ReactNode;
  label: React.ReactNode;
  isOpen?: boolean;
  chevron?: boolean;
}

export const AppBarContextPill = React.forwardRef<
  HTMLButtonElement,
  AppBarContextPillProps
>(
  (
    {
      className,
      avatar,
      label,
      isOpen = false,
      chevron = true,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="app-bar-context-pill"
        aria-expanded={isOpen}
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 rounded-full border border-border bg-secondary/80 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-foreground shadow-2xs backdrop-blur-md transition-all hover:bg-secondary active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-w-0 cursor-pointer",
          className
        )}
        {...props}
      >
        {avatar}
        <span className="max-w-[110px] xs:max-w-[160px] truncate font-semibold leading-none">
          {label}
        </span>
        {chevron && (
          <ChevronDown
            className={cn(
              "size-3.5 text-muted-foreground transition-transform duration-200 shrink-0",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>
    );
  }
);
AppBarContextPill.displayName = "AppBarContextPill";

/* -------------------------------------------------------------------------
 * AppBar Actions Slot (Right side: actions, settings, notifications)
 * ------------------------------------------------------------------------- */
export interface AppBarActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AppBarActions = React.forwardRef<
  HTMLDivElement,
  AppBarActionsProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="app-bar-actions"
      className={cn("flex items-center gap-2 shrink-0", className)}
      {...props}
    />
  );
});
AppBarActions.displayName = "AppBarActions";

/* -------------------------------------------------------------------------
 * AppBar Avatar Trigger (With integrated sync / connectivity badge)
 * ------------------------------------------------------------------------- */
const syncStatusVariants = cva(
  "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-background shrink-0",
  {
    variants: {
      status: {
        online: "bg-emerald-500",
        offline: "bg-amber-500",
        syncing: "bg-amber-400 animate-pulse",
        none: "hidden",
      },
    },
    defaultVariants: {
      status: "none",
    },
  }
);

export interface AppBarAvatarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: "online" | "offline" | "syncing" | "none";
  initials?: string;
  asChild?: boolean;
}

export const AppBarAvatarTrigger = React.forwardRef<
  HTMLButtonElement,
  AppBarAvatarTriggerProps
>(
  (
    {
      className,
      status = "none",
      initials,
      asChild = false,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        data-slot="app-bar-avatar-trigger"
        className={cn(
          "group relative flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-sans text-xs font-bold shadow-xs ring-1 ring-border transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
          className
        )}
        {...props}
      >
        {children || (initials ? <span>{initials}</span> : null)}
        {status !== "none" && (
          <span className={syncStatusVariants({ status })}>
            <span className="sr-only">
              {status === "online"
                ? "Online"
                : status === "offline"
                ? "Offline"
                : "Syncing"}
            </span>
          </span>
        )}
      </Comp>
    );
  }
);
AppBarAvatarTrigger.displayName = "AppBarAvatarTrigger";
