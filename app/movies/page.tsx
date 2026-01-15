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
          className="group flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-300 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform" 
          href="/"
          aria-label="Home"
        >
          <svg 
            aria-label="Arrow back icon" 
            className="size-[18px] stroke-gray-1000 transition-colors duration-300 ease-out group-hover:stroke-gray-1200 dark:stroke-gray-1000 dark:group-hover:stroke-gray-1200" 
            fill="none" 
            height="24" 
            role="graphics-symbol" 
            viewBox="0 0 24 24" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2.25"
          >
            <path d="M19 12H5m6-6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Navigation showShare />
      </header>

      <main>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Movies</h1>
          <p className="text-gray-900 dark:text-gray-900">Films I've watched recently.</p>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-6">All Movies</h2>
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
                  <span className="truncate font-medium text-sm text-black dark:text-white">
                    {film.title}
                  </span>
                  <span className="text-xs text-gray-1000">
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
