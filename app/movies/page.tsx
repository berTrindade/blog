import Link from "next/link"
import Image from "next/image"
import { getAllFilms } from "@/lib/media-utils"
import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Movies - Bernardo Trindade de Abreu",
  description: "Films I've watched recently and recommend.",
  openGraph: {
    title: "Movies - Bernardo Trindade de Abreu",
    description: "Films that I love and recommend watching",
    images: [
      {
        url: "/api/og?page=movies",
        width: 1200,
        height: 630,
        alt: "Movies - Bernardo Trindade de Abreu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies - Bernardo Trindade de Abreu",
    description: "Films that I love and recommend watching",
    images: ["/api/og?page=movies"],
  },
}

export default function MoviesPage() {
  const films = getAllFilms()

  return (
    <div className="root layout-root">
      {/* Header with back link and navigation */}
      <header className="mb-16 flex items-center justify-between gap-4">
        <Link 
          className="text-sm text-primary hover:opacity-70 transition-opacity no-underline" 
          href="/"
        >
          ← Home
        </Link>
        <Navigation showShare />
      </header>

      <main>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Movies</h1>
          <p className="text-tertiary">Films I've watched recently.</p>
        </div>

        <section className="mb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {films.map((film, index) => (
              <a
                key={film.id}
                href={film.letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2"
              >
                <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm dark:border dark:border-gray-600 transition-transform hover:scale-105 cursor-pointer">
                  <Image 
                    src={film.image} 
                    alt={film.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    priority={index < 4}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="truncate font-medium text-sm text-primary">
                    {film.title}
                  </span>
                  <span className="text-xs text-tertiary">
                    {film.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
