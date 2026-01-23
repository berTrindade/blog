"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllBooks } from "@/lib/media-utils"
import { Navigation } from "@/components/navigation"

export default function BooksPage() {
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>("All")
  
  const books = getAllBooks()
  
  // Filter books by category
  const filteredBooks = selectedBookCategory === "All" 
    ? books 
    : books.filter(b => b.category === selectedBookCategory)

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
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Books</h1>
          <p className="text-gray-900 dark:text-gray-900">My own little library.</p>
        </div>

        {/* Category filter pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedBookCategory('All')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              selectedBookCategory === 'All'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedBookCategory('Currently reading')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              selectedBookCategory === 'Currently reading'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
            Reading
          </button>
          <button
            onClick={() => setSelectedBookCategory('Planning to read')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              selectedBookCategory === 'Planning to read'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
            Will Read
          </button>
          <button
            onClick={() => setSelectedBookCategory('Completed')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              selectedBookCategory === 'Completed'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Read
          </button>
        </div>

        {/* Books grid */}
        <section className="mb-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="group flex flex-col gap-2"
              >
                {/* Book cover */}
                {book.amazonUrl ? (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-md transition-transform hover:scale-[1.03] cursor-pointer bg-gray-200 dark:bg-gray-800"
                  >
                    <Image 
                      src={book.image} 
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      priority={index < 4}
                    />
                  </a>
                ) : (
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-md transition-transform hover:scale-[1.03] bg-gray-200 dark:bg-gray-800">
                    <Image 
                      src={book.image} 
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      priority={index < 4}
                    />
                  </div>
                )}
                
                {/* Book info */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm leading-tight text-black dark:text-white line-clamp-2">
                    {book.title}
                  </span>
                  <span className="text-sm text-gray-1000">
                    {book.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
