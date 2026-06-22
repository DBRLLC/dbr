import type { Metadata } from "next";
import { Syne, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "@/lib/registry";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Deep Blue Resources — ROV Exploration & Subsea Engineering",
  description: "95% of the ocean remains unseen. Deep Blue Resources builds the machines to change that. Join a live expedition into the abyss.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-abyss text-white font-body">
        <StyledJsxRegistry>
          <main className="flex-grow">
            {children}
          </main>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
