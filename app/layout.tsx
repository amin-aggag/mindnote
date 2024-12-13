import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./(marketing)/_components/providers.tsx/theme-provider";
import { ConvexClientProvider } from "@/components/ui/providers/convex-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IlmMind",
  description: "The second brain app built for Islamic knowledge.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/logo_light.svg",
        href: "/logo_light.svg"
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/logo_dark.svg",
        href: "/logo_dark.svg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="ilmmind-theme-2"
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
