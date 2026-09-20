import Link from "next/link";
import { cooper } from "./fonts";
import { TypewriterText } from "@/components/TypewriterText";
import { BrandFlower } from "@/components/BrandFlower";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14 relative z-10">
      {/* Top Bar / Navigation */}
      <header className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center group transition-transform duration-300 hover:scale-105"
          aria-label="kohl.design home"
        >
          <BrandFlower className="size-8 sm:size-9 text-pine-800 dark:text-crimson-100 transition-colors duration-300" />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Display Title */}
      <div className="my-auto py-8 sm:py-12 w-full">
        <h1
          className={`${cooper.className} text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[140px] xl:text-[165px] leading-[0.82] font-normal tracking-tighter text-left text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
        >
          kohl.design
        </h1>
      </div>

      {/* Bottom Typewriter Sequence */}
      <div className="w-full">
        <TypewriterText
          lines={[
            {
              text: "Exceeding expectations is great business.",
              className:
                "text-lg sm:text-2xl md:text-3xl font-normal leading-snug text-pine-600 dark:text-[#A8E3D2]",
            },
            {
              text: "Want help doing just that? Slide into my LinkedIn DMs.",
              className:
                "text-lg sm:text-2xl md:text-3xl font-normal leading-snug text-pine-800 dark:text-white",
              content: (
                <span>
                  <span className="text-pine-800 dark:text-white">
                    Want help doing just that? Slide into my{" "}
                  </span>
                  <a
                    href="https://linkedin.com/in/henrikkohl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 sm:underline-offset-6 decoration-primary/40 hover:decoration-primary dark:decoration-crimson-100/40 dark:hover:decoration-crimson-100 text-primary dark:text-crimson-100 transition-colors"
                  >
                    LinkedIn DMs.
                  </a>
                </span>
              ),
            },
          ]}
          delay={0.4}
          showPrompt={false}
          cursorClassName="inline-block w-[3px] h-[1em] bg-primary dark:bg-accent ml-1.5 align-middle"
        />
      </div>
    </main>
  );
}
