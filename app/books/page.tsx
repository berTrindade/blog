"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllBooks } from "@/lib/media-utils"
import { Navigation } from "@/components/navigation"

export default function BooksPage() {
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>("Will Read")
  const [sortBy, setSortBy] = useState<string>("best")
  const [language, setLanguage] = useState<string>("all")
  
  const books = getAllBooks()
  
  // Filter books by category
  const filteredBooks = selectedBookCategory === "All" 
    ? books 
    : books.filter(b => b.category === selectedBookCategory)

  return (
    <div className="root layout-root">
      <main className="mx-auto max-w-7xl">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-48 flex-shrink-0 hidden md:block">
            {/* Back button */}
            <Link 
              href="/"
              className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-8"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>

            {/* Filters */}
            <div className="mb-8">
              <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedBookCategory('Currently reading')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    selectedBookCategory === 'Currently reading'
                      ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  Reading
                </button>
                <button
                  onClick={() => setSelectedBookCategory('Planning to read')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    selectedBookCategory === 'Planning to read'
                      ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  Will Read
                </button>
                <button
                  onClick={() => setSelectedBookCategory('Dropped')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    selectedBookCategory === 'Dropped'
                      ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  Dropped
                </button>
                <button className="flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add a +
                </button>
              </div>
            </div>

            {/* Sort */}
            <div className="mb-8">
              <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Sort
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSortBy('best')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    sortBy === 'best'
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  Best
                </button>
                <button
                  onClick={() => setSortBy('worst')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    sortBy === 'worst'
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  Worst
                </button>
                <button
                  onClick={() => setSortBy('abc')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    sortBy === 'abc'
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  ABC
                </button>
                <button
                  onClick={() => setSortBy('zyx')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    sortBy === 'zyx'
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  ZYX
                </button>
              </div>
            </div>

            {/* Language */}
            <div>
              <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Lang
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setLanguage('pt')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    language === 'pt'
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>
                  PT
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                    language === 'en'
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>
                  EN
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Books</h1>
              <p className="text-gray-500 dark:text-gray-400">My own little library.</p>
            </div>

            {/* Books grid */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group flex flex-col gap-3 cursor-pointer"
                >
                  {/* Status badge */}
                  <div className="flex items-center gap-1.5 text-orange-500 dark:text-orange-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span className="text-xs font-medium">
                      {book.category === 'Currently reading' ? 'Reading' : 
                       book.category === 'Planning to read' ? 'Will Read' : 
                       'Read'}
                    </span>
                  </div>
                  
                  {/* Book cover */}
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-md transition-transform hover:scale-[1.03]">
                    <Image 
                      src={book.image} 
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  
                  {/* Book info */}
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm leading-tight text-black dark:text-white line-clamp-2">
                      {book.title}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {book.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
