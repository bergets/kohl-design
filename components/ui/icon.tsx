import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Kohl Design System default icon specifications:
 * - Size: 20x20px
 * - Stroke width: 1.5px
 */
export const DEFAULT_ICON_SIZE = 20;
export const DEFAULT_ICON_STROKE_WIDTH = 1.5;

export const ICON_SIZE_MAP: Record<string, number> = {
  xs: 14,
  sm: 16,
  default: 20,
  md: 20,
  lg: 24,
  xl: 28,
};

export type IconSize = keyof typeof ICON_SIZE_MAP | number | string;

export function resolveIconSize(size: IconSize | undefined): number | string {
  if (typeof size === "string" && size in ICON_SIZE_MAP) {
    return ICON_SIZE_MAP[size];
  }
  return size ?? DEFAULT_ICON_SIZE;
}

const iconVariants = cva("shrink-0 transition-colors duration-150 inline-block align-middle", {
  variants: {
    intent: {
      default: "text-current",
      primary: "text-primary dark:text-[#A8E3D2]",
      accent: "text-accent dark:text-[#FCD3D6]",
      muted: "text-muted-foreground",
      pine: "text-pine-800 dark:text-pine-200",
      crimson: "text-crimson-600 dark:text-crimson-300",
      white: "text-white",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export interface IconProps
  extends Omit<LucideProps, "ref" | "size">,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  size?: IconSize;
  strokeWidth?: number | string;
}

/**
 * Standard Icon component for kohl.design.
 * Automatically defaults any Lucide icon to 20x20px with 1.5px stroke width.
 * Supports unified size tiers ('xs', 'sm', 'default', 'lg', 'xl') or numeric pixel values.
 *
 * @example
 * ```tsx
 * import { Icon } from "@/components/ui/icon";
 * import { ArrowRight, Sparkles } from "lucide-react";
 *
 * <Icon icon={ArrowRight} size="sm" />
 * <Icon icon={Sparkles} intent="primary" size={24} />
 * ```
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: Component,
      size = DEFAULT_ICON_SIZE,
      strokeWidth = DEFAULT_ICON_STROKE_WIDTH,
      intent,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const resolvedSize = resolveIconSize(size);
    return (
      <Component
        ref={ref}
        size={resolvedSize}
        strokeWidth={strokeWidth}
        className={cn(iconVariants({ intent, className }))}
        style={{
          width: resolvedSize,
          height: resolvedSize,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

/**
 * Higher-Order Component factory to create pre-configured Lucide icons
 * with kohl.design standard defaults (20px, 1.5px stroke width).
 *
 * @example
 * ```tsx
 * import { createIcon } from "@/components/ui/icon";
 * import { Sparkles } from "lucide-react";
 *
 * export const SparklesIcon = createIcon(Sparkles);
 * // Usage: <SparklesIcon className="text-primary" />
 * ```
 */
export function createIcon(Component: LucideIcon) {
  const WrappedIcon = React.forwardRef<
    SVGSVGElement,
    Omit<LucideProps, "ref" | "size"> &
      VariantProps<typeof iconVariants> & {
        size?: IconSize;
        strokeWidth?: number | string;
      }
  >(
    (
      {
        size = DEFAULT_ICON_SIZE,
        strokeWidth = DEFAULT_ICON_STROKE_WIDTH,
        intent,
        className,
        style,
        ...props
      },
      ref
    ) => {
      const resolvedSize = resolveIconSize(size);
      return (
        <Component
          ref={ref}
          size={resolvedSize}
          strokeWidth={strokeWidth}
          className={cn(iconVariants({ intent, className }))}
          style={{
            width: resolvedSize,
            height: resolvedSize,
            ...style,
          }}
          {...props}
        />
      );
    }
  );

  WrappedIcon.displayName = `Icon(${Component.displayName || Component.name || "LucideIcon"})`;
  return WrappedIcon;
}
