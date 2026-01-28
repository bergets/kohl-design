import { TypewriterText } from "@/components/TypewriterText";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between pt-4 pb-4 sm:pt-8 sm:pb-8">
      <h1 className="text-[15vw] leading-[0.8] font-normal tracking-tighter w-full text-left pl-2">
        kohl.design
      </h1>
      <div className="pl-2">
        <p className="text-2xl md:text-4xl font-normal">
          <TypewriterText text="Your next partner in crime. Soon." delay={0.5} />
        </p>
      </div>
    </main>
  );
}
