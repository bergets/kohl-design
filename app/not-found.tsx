import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">
        <div className="my-auto py-10 sm:py-16 w-full max-w-5xl mx-auto space-y-6">
          <div className="space-y-4">
            <h1
              className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
            >
              Nothing here.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
              The page you’re looking for doesn’t exist or has been moved.
            </p>
          </div>

          <div>
            <Button asChild>
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </div>

        <footer className="w-full max-w-5xl mx-auto pt-6 text-xs text-pine-600/70 dark:text-pine-400/50">
          <span>404 · kohl.design</span>
        </footer>
      </main>
    </div>
  );
}
