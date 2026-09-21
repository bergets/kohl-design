"use client"

import * as React from "react"
import { useTheme } from "next-themes"

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
    const dotSizeClass = size === "lg" ? "size-5 sm:size-6" : "size-4"

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`group rounded-[8px] border border-border/80 dark:border-[#3B7D6F]/60 bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 backdrop-blur-sm transition-all cursor-pointer ${buttonSizeClass} ${className}`}
            aria-label="Toggle color theme"
        >
            <span
                className={`${dotSizeClass} rounded-full bg-primary dark:bg-[#A8E3D2] transition-all duration-300 transform group-hover:scale-110 group-active:scale-90 shadow-2xs`}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
