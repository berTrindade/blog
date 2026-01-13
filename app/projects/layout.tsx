import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Bernardo Trindade de Abreu",
  description: "A collection of things I've built and contributed to over the years.",
  openGraph: {
    title: "Projects - Bernardo Trindade de Abreu",
    description: "A collection of things I've built and contributed to over the years",
    images: [
      {
        url: "/api/og?page=projects",
        width: 1200,
        height: 630,
        alt: "Projects - Bernardo Trindade de Abreu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Bernardo Trindade de Abreu",
    description: "A collection of things I've built and contributed to over the years",
    images: ["/api/og?page=projects"],
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
