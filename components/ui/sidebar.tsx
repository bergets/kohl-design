"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * Sidebar Container
 * ------------------------------------------------------------------------- */
const sidebarVariants = cva(
  "flex flex-col bg-sidebar text-sidebar-foreground border-sidebar-border select-none transition-all duration-200",
  {
    variants: {
      variant: {
        fixed:
          "fixed top-0 left-0 bottom-0 h-screen z-30 border-r border-sidebar-border/80 overflow-y-auto",
        inline:
          "h-full border-r border-sidebar-border/80 overflow-y-auto",
        floating:
          "m-3 h-[calc(100vh-1.5rem)] rounded-[var(--radius-lg)] border border-sidebar-border/80 shadow-md overflow-hidden",
      },
      width: {
        default: "w-64 lg:w-72",
        sm: "w-56",
        lg: "w-80",
        collapsed: "w-16",
      },
    },
    defaultVariants: {
      variant: "fixed",
      width: "default",
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {
  asChild?: boolean;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, variant, width, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "aside";
    return (
      <Comp
        ref={ref as React.Ref<any>}
        data-slot="sidebar"
        data-variant={variant || "fixed"}
        className={cn(sidebarVariants({ variant, width }), className)}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

/* -------------------------------------------------------------------------
 * Sidebar Wrapper (Desktop spacing companion for fixed sidebar)
 * ------------------------------------------------------------------------- */
const sidebarWrapperVariants = cva("hidden md:block shrink-0 bg-sidebar", {
  variants: {
    width: {
      default: "w-64 lg:w-72",
      sm: "w-56",
      lg: "w-80",
      collapsed: "w-16",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

export interface SidebarWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarWrapperVariants> {}

export const SidebarWrapper = React.forwardRef<HTMLDivElement, SidebarWrapperProps>(
  ({ className, width, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-wrapper"
        aria-hidden="true"
        className={cn(sidebarWrapperVariants({ width }), className)}
        {...props}
      />
    );
  }
);
SidebarWrapper.displayName = "SidebarWrapper";

/* -------------------------------------------------------------------------
 * Sidebar Header
 * ------------------------------------------------------------------------- */
export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-header"
        className={cn("flex flex-col gap-3 p-4 shrink-0", className)}
        {...props}
      />
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

/* -------------------------------------------------------------------------
 * Sidebar Brand
 * ------------------------------------------------------------------------- */
export interface SidebarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const SidebarBrand = React.forwardRef<HTMLDivElement, SidebarBrandProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-slot="sidebar-brand"
        className={cn("flex items-center justify-between px-1", className)}
        {...props}
      />
    );
  }
);
SidebarBrand.displayName = "SidebarBrand";

/* -------------------------------------------------------------------------
 * Sidebar Content (Scrollable Middle Section)
 * ------------------------------------------------------------------------- */
export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-content"
        className={cn(
          "flex-1 overflow-y-auto px-4 py-2 space-y-5 no-scrollbar",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarContent.displayName = "SidebarContent";

/* -------------------------------------------------------------------------
 * Sidebar Group & Labels
 * ------------------------------------------------------------------------- */
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-group"
        className={cn("space-y-1.5", className)}
        {...props}
      />
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";

export interface SidebarGroupHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupHeader = React.forwardRef<
  HTMLDivElement,
  SidebarGroupHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group-header"
      className={cn("flex items-center justify-between px-1", className)}
      {...props}
    />
  );
});
SidebarGroupHeader.displayName = "SidebarGroupHeader";

export interface SidebarGroupLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const SidebarGroupLabel = React.forwardRef<
  HTMLSpanElement,
  SidebarGroupLabelProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="sidebar-group-label"
      className={cn(
        "text-[11px] font-semibold text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export interface SidebarGroupActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-slot="sidebar-group-action"
      type="button"
      className={cn(
        "flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xs px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

/* -------------------------------------------------------------------------
 * Sidebar Nav & Nav Items
 * ------------------------------------------------------------------------- */
export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        data-slot="sidebar-nav"
        className={cn("space-y-1", className)}
        {...props}
      />
    );
  }
);
SidebarNav.displayName = "SidebarNav";

const sidebarNavItemVariants = cva(
  "group relative flex w-full items-center justify-between rounded-[var(--radius-sm)] px-3 py-2 text-xs font-medium transition-all duration-150 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground font-semibold shadow-xs",
        false:
          "text-muted-foreground hover:text-foreground hover:bg-muted/60 active:scale-[0.99]",
      },
      variant: {
        default: "",
        accent: "",
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: "accent",
        className: "bg-accent text-accent-foreground shadow-xs font-semibold",
      },
    ],
    defaultVariants: {
      active: false,
      variant: "default",
    },
  }
);

export interface SidebarNavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarNavItemVariants> {
  asChild?: boolean;
}

export const SidebarNavItem = React.forwardRef<
  HTMLButtonElement,
  SidebarNavItemProps
>(({ className, active = false, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-slot="sidebar-nav-item"
      data-active={active}
      aria-current={active ? "page" : undefined}
      className={cn(sidebarNavItemVariants({ active, variant }), className)}
      {...props}
    />
  );
});
SidebarNavItem.displayName = "SidebarNavItem";

/* -------------------------------------------------------------------------
 * Sidebar Context Switcher (e.g. Workspace / Profile Selector Trigger)
 * ------------------------------------------------------------------------- */
export interface SidebarContextSwitcherProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  avatar?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  isOpen?: boolean;
}

export const SidebarContextSwitcher = React.forwardRef<
  HTMLButtonElement,
  SidebarContextSwitcherProps
>(({ className, avatar, title, subtitle, isOpen = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      data-slot="sidebar-context-switcher"
      aria-expanded={isOpen}
      className={cn(
        "w-full flex items-center justify-between rounded-[var(--radius-sm)] border border-border/80 bg-card/70 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 truncate">
        {avatar}
        <div className="flex flex-col text-left truncate">
          <span className="truncate font-semibold text-xs leading-tight">
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] text-muted-foreground leading-tight mt-0.5 truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <ChevronDown
        className={cn(
          "size-3.5 text-muted-foreground transition-transform duration-150 shrink-0 ml-2",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
SidebarContextSwitcher.displayName = "SidebarContextSwitcher";

/* -------------------------------------------------------------------------
 * Sidebar Widget (Card slot for timer, quota, pro callout, or helper)
 * ------------------------------------------------------------------------- */
const sidebarWidgetVariants = cva(
  "rounded-[var(--radius-sm)] p-3 text-xs transition-colors",
  {
    variants: {
      variant: {
        default: "border border-border/80 bg-card/60 text-card-foreground shadow-2xs",
        accent: "border border-accent/30 bg-accent/10 text-foreground",
        sunken: "border border-border/60 bg-muted/50 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SidebarWidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarWidgetVariants> {}

export const SidebarWidget = React.forwardRef<
  HTMLDivElement,
  SidebarWidgetProps
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-widget"
      className={cn(sidebarWidgetVariants({ variant }), className)}
      {...props}
    />
  );
});
SidebarWidget.displayName = "SidebarWidget";

/* -------------------------------------------------------------------------
 * Sidebar Footer
 * ------------------------------------------------------------------------- */
export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        className={cn(
          "mt-auto space-y-2.5 p-4 border-t border-sidebar-border/80 shrink-0",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";

/* -------------------------------------------------------------------------
 * Sidebar Status (Connectivity / Sync Dot)
 * ------------------------------------------------------------------------- */
const statusDotVariants = cva("size-2 rounded-full shrink-0", {
  variants: {
    status: {
      online: "bg-emerald-500",
      offline: "bg-amber-500",
      syncing: "bg-amber-400 animate-pulse",
      idle: "bg-muted-foreground/60",
    },
  },
  defaultVariants: {
    status: "online",
  },
});

export interface SidebarStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "online" | "offline" | "syncing" | "idle";
  label?: string;
  meta?: React.ReactNode;
}

export const SidebarStatus = React.forwardRef<
  HTMLDivElement,
  SidebarStatusProps
>(({ className, status = "online", label, meta, ...props }, ref) => {
  const defaultLabel =
    status === "online"
      ? "Connected"
      : status === "offline"
      ? "Working offline"
      : status === "syncing"
      ? "Syncing changes..."
      : "Idle";

  return (
    <div
      ref={ref}
      data-slot="sidebar-status"
      className={cn(
        "flex items-center justify-between px-1 text-[11px] text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <span className={statusDotVariants({ status })} />
        <span>{label || defaultLabel}</span>
      </div>
      {meta && <div className="text-[10px] font-medium">{meta}</div>}
    </div>
  );
});
SidebarStatus.displayName = "SidebarStatus";

/* -------------------------------------------------------------------------
 * Sidebar User Profile Row
 * ------------------------------------------------------------------------- */
export interface SidebarUserProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  name?: React.ReactNode;
  email?: React.ReactNode;
  actions?: React.ReactNode;
}

export const SidebarUser = React.forwardRef<HTMLDivElement, SidebarUserProps>(
  ({ className, avatar, name, email, actions, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-user"
        className={cn(
          "flex items-center justify-between rounded-[var(--radius-sm)] bg-muted/40 p-2 text-xs gap-2 border border-border/50",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 truncate flex-1 min-w-0">
          {avatar}
          <div className="flex flex-col truncate">
            {name && (
              <span className="font-semibold text-foreground text-xs leading-tight truncate">
                {name}
              </span>
            )}
            {email && (
              <span className="text-[11px] text-muted-foreground leading-tight truncate">
                {email}
              </span>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-1 shrink-0">{actions}</div>}
      </div>
    );
  }
);
SidebarUser.displayName = "SidebarUser";
