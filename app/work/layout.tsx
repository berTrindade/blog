import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work - Bernardo Trindade de Abreu",
  description: "My professional journey and the companies I've worked with.",
  openGraph: {
    title: "Work - Bernardo Trindade de Abreu",
    description: "My professional journey and the companies I've worked with",
    images: [
      {
        url: "/api/og?page=work",
        width: 1200,
        height: 630,
        alt: "Work - Bernardo Trindade de Abreu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work - Bernardo Trindade de Abreu",
    description: "My professional journey and the companies I've worked with",
    images: ["/api/og?page=work"],
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
