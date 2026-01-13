import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Writing - Bernardo Trindade de Abreu",
  description: "Thoughts and insights on software engineering, technology, and development practices.",
  openGraph: {
    title: "Writing - Bernardo Trindade de Abreu",
    description: "Thoughts and insights on software engineering, technology, and development practices",
    images: [
      {
        url: "/api/og?page=writing",
        width: 1200,
        height: 630,
        alt: "Writing - Bernardo Trindade de Abreu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing - Bernardo Trindade de Abreu",
    description: "Thoughts and insights on software engineering, technology, and development practices",
    images: ["/api/og?page=writing"],
  },
}

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
