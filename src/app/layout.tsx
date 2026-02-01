import type { Metadata } from "next";
import { Fredoka, Geist, Geist_Mono, Playpen_Sans, Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playpenSans = Playpen_Sans({
  variable: "--font-playpen-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
})

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: "Rate My Degree",
  description: "Rate My Degree helps students explore, review, and compare university degrees based on real student experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playpenSans.variable} ${fredoka.variable} ${ubuntu.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          closeButton
          richColors
          theme="light"
        />
      </body>
    </html>
  );
}
