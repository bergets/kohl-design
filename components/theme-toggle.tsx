"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle({ className = "" }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted ? resolvedTheme === "dark" : true

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`group rounded-[4px] border border-border/80 dark:border-[#3B7D6F]/60 bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 backdrop-blur-sm transition-all cursor-pointer ${className}`}
            aria-label="Toggle color theme"
        >
            <span
                className="size-3.5 sm:size-4 rounded-full bg-primary dark:bg-[#A8E3D2] transition-all duration-300 transform group-hover:scale-110 group-active:scale-90 shadow-2xs"
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
