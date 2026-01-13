import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bernardo Trindade de Abreu - Senior Full Stack Engineer",
  description: "Senior Full Stack Engineer specializing in React, Node.js, Python, AI, and Cloud technologies at ustwo",
  generator: "v0.app",
  metadataBase: new URL("https://blog-c30ge148o-bertrindades-projects.vercel.app"),
  openGraph: {
    title: "Bernardo Trindade de Abreu - Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer specializing in React, Node.js, Python, AI, and Cloud technologies at ustwo",
    url: "https://blog-c30ge148o-bertrindades-projects.vercel.app",
    siteName: "Bernardo Trindade de Abreu",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og?page=home",
        width: 1200,
        height: 630,
        alt: "Bernardo Trindade de Abreu - Senior Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bernardo Trindade de Abreu - Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer specializing in React, Node.js, Python, AI, and Cloud technologies",
    images: ["/api/og?page=home"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = { width: "device-width", initialScale: 1 }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-background font-inter text-gray-1200 antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
