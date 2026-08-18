import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../app/context/LanguageContext";

// فونت انگلیسی
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// فونت فارسی وزیرمتن
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Ahmadreza Farhadi - Frontend Developer",
  description:
    "Frontend developer specializing in React, Next.js, and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${vazirmatn.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
