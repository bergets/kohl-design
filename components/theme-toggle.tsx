"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle({
    className = "",
    size = "default",
}: {
    className?: string;
    size?: "sm" | "default" | "lg";
}) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted ? resolvedTheme === "dark" : true
    const buttonSize =
        size === "sm"
            ? "icon-sm"
            : size === "lg"
            ? "icon-xl"
            : "icon-lg";
    const iconSizeClass =
        size === "sm"
            ? "size-4"
            : size === "lg"
            ? "size-6"
            : "size-5";

    return (
        <Button
            variant="tactile"
            size={buttonSize}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`group relative ${className}`}
            aria-label="Toggle color theme"
        >
            <Sun
                className={`${iconSizeClass} text-pine-900 dark:text-emblem group-hover:text-primary dark:group-hover:text-white transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0`}
                strokeWidth={1.5}
            />
            <Moon
                className={`absolute ${iconSizeClass} text-pine-900 dark:text-emblem group-hover:text-primary dark:group-hover:text-white transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100`}
                strokeWidth={1.5}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
