import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-dm-sans",
});

export const cooper = localFont({
    src: "./fonts/Cooper-Regular.otf",
    variable: "--font-cooper",
    weight: "400",
});
