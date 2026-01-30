import { TypewriterText } from "@/components/TypewriterText";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between pt-4 pb-4 sm:pt-8 sm:pb-8">
      <h1 className="text-[15vw] leading-[0.8] font-normal tracking-tighter w-full text-left pl-2">
        kohl.design
      </h1>
      <div className="pl-2">
        <div>
          <TypewriterText
            lines={[
              { text: "Exceeding expectations is great business.", className: "text-2xl md:text-4xl font-normal" },
              {
                text: "Want help doing just that? Slide into my LinkedIn DMs.",
                className: "text-2xl md:text-4xl font-normal",
                content: (
                  <span>
                    Want help doing just that? Slide into my <a href="https://linkedin.com/in/henrikkohl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">LinkedIn DMs</a>.
                  </span>
                )
              }
            ]}
            delay={0.5}
          />
        </div>
      </div>
    </main>
  );
}
