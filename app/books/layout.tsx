import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Books - Bernardo Trindade de Abreu",
  description: "Books that have shaped my thinking and that I recommend to others.",
  openGraph: {
    title: "Books - Bernardo Trindade de Abreu",
    description: "Books that have shaped my thinking and that I recommend to others",
    images: [
      {
        url: "/api/og?page=books",
        width: 1200,
        height: 630,
        alt: "Books - Bernardo Trindade de Abreu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Books - Bernardo Trindade de Abreu",
    description: "Books that have shaped my thinking and that I recommend to others",
    images: ["/api/og?page=books"],
  },
}

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
