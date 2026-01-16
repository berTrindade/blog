import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000"

export const metadata: Metadata = {
  title: "Bernardo Trindade de Abreu - Senior Full Stack Engineer",
  description: "Senior Full Stack Engineer specializing in React, Node.js, Python, AI, and Cloud technologies at ustwo",
  generator: "v0.app",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Bernardo Trindade de Abreu - Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer specializing in React, Node.js, Python, AI, and Cloud technologies at ustwo",
    url: siteUrl,
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
      <head>
        {/* Prevent theme flash - runs synchronously before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var theme = localStorage.getItem('theme') || 'system';
                var resolved = theme === 'system'
                  ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                  : theme;
                document.documentElement.classList.add(resolved);
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-background font-inter text-gray-1200 antialiased flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex-1">
            {children}
          </div>
          <footer className="py-8 text-center text-xs text-gray-1000">
            <p>© {new Date().getFullYear()} Bernardo Trindade de Abreu. All rights reserved.</p>
          </footer>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
