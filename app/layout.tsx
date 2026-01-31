import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

import BackgroundShader from "@/components/BackgroundShader";
import CustomCursor from "@/components/CustomCursor";

import { dmSans, cooper } from "./fonts";


export const metadata: Metadata = {
  title: "kohl.design | Product Designer",
  description: "Portfolio of Henrik Kohl, a Product Designer based in Stockholm.",
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: "#01201a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.className} ${dmSans.variable} ${cooper.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <BackgroundShader />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
