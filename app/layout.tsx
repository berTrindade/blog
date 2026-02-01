import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"
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
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
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
      <body className={`${GeistSans.variable} min-h-screen bg-gray-background text-gray-1200 antialiased flex flex-col`} suppressHydrationWarning>
        {/* Grain texture overlay - matches reference blog */}
        <div className="grain-overlay" />
        <ThemeProvider>
          <div className="flex-1">
            {children}
          </div>
          <footer className="max-w-[700px] w-full mx-auto h-16 flex items-center justify-between border-t border-gray-300 dark:border-gray-600 px-6">
            <p className="text-gray-1200 dark:text-white text-sm">© {new Date().getFullYear()}</p>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="https://x.com/btrindadeabreu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-1200 dark:text-white hover:opacity-70 transition-opacity"
                  aria-label="X (Twitter)"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/berTrindade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-1200 dark:text-white hover:opacity-70 transition-opacity"
                  aria-label="GitHub"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 256 250" aria-hidden="true">
                    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.74-43.12-17.04-43.12-17.04-5.814-14.777-14.2-18.73-14.2-18.73-11.612-7.944.877-7.78.877-7.78 12.846.902 19.606 13.18 19.606 13.18 11.406 19.546 29.915 13.908 37.227 10.64 1.149-8.275 4.464-13.908 8.124-17.12-28.425-3.235-58.3-14.2-58.3-63.23 0-13.974 4.998-25.405 13.18-34.38-1.324-3.235-5.707-16.252 1.235-33.906 0 0 10.74-3.444 35.201 13.13 10.21-2.837 21.17-4.26 32.052-4.31 10.883.05 21.842 1.473 32.052 4.31 24.461-16.574 35.201-13.13 35.201-13.13 6.942 17.654 2.559 30.671 1.235 33.906 8.182 8.975 13.18 20.406 13.18 34.38 0 49.145-29.915 59.97-58.36 63.135 4.59 3.97 8.678 11.773 8.678 23.72 0 17.12-.149 30.93-.149 35.201 0 3.408 2.349 7.406 8.803 6.143C219.324 232.536 256 184.555 256 128.001 256 57.307 198.691 0 128.001 0z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/bertrindade/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-1200 dark:text-white hover:opacity-70 transition-opacity"
                      aria-label="LinkedIn"
                    >
                      <svg className="size-4" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
                        <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.374-19.728-32.374-19.756 0-22.779 15.434-22.779 31.369v60.408h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0135.928-19.733c38.445 0 45.533 25.289 45.533 58.186l-.016 67.013zM56.955 79.27c-12.157.012-22.014-9.852-22.026-22.009-.013-12.157 9.852-22.014 22.009-22.026 12.157-.013 22.014 9.852 22.026 22.009.013 12.157-9.852 22.014-22.009 22.026zM76.291 218.127H38.366V95.967h37.925v122.16zM237.033 0H18.89C8.58-.011 0 8.437 0 18.747v218.533c0 10.329 8.58 18.747 18.89 18.747h218.144c10.329 0 18.89-8.418 18.89-18.747V18.747C255.924 8.437 247.362 0 237.033 0z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/your-discord-invite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-1200 dark:text-white hover:opacity-70 transition-opacity"
                      aria-label="Discord"
                    >
                      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </footer>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
