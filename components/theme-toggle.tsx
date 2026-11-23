"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

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
    const shouldReduceMotion = useReducedMotion()

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
            className={`group relative overflow-hidden ${className}`}
            aria-label="Toggle color theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={isDark ? "moon" : "sun"}
                    initial={
                        shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, filter: "blur(6px)", scale: 0.82 }
                    }
                    animate={
                        shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 1, filter: "blur(0px)", scale: 1 }
                    }
                    exit={
                        shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, filter: "blur(6px)", scale: 0.82 }
                    }
                    transition={{ duration: 0.16, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center"
                >
                    {isDark ? (
                        <Moon
                            className={`${iconSizeClass} text-pine-900 dark:text-emblem group-hover:text-primary dark:group-hover:text-white transition-colors`}
                            strokeWidth={1.5}
                        />
                    ) : (
                        <Sun
                            className={`${iconSizeClass} text-pine-900 dark:text-emblem group-hover:text-primary dark:group-hover:text-white transition-colors`}
                            strokeWidth={1.5}
                        />
                    )}
                </motion.span>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
