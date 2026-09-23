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
    size?: "default" | "lg";
}) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted ? resolvedTheme === "dark" : true
    const buttonSizeClass = size === "lg" ? "size-11 sm:size-12" : "size-10"
    const iconSizeClass = size === "lg" ? "size-6" : "size-5"

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`group relative rounded-[var(--radius)] border border-border/80 dark:border-[#3B7D6F]/60 bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 backdrop-blur-sm transition-all cursor-pointer ${buttonSizeClass} ${className}`}
            aria-label="Toggle color theme"
        >
            <Sun
                className={`${iconSizeClass} text-pine-900 dark:text-[#FCD3D6] group-hover:text-primary dark:group-hover:text-white transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0`}
                strokeWidth={1.5}
            />
            <Moon
                className={`absolute ${iconSizeClass} text-pine-900 dark:text-[#FCD3D6] group-hover:text-primary dark:group-hover:text-white transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100`}
                strokeWidth={1.5}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
