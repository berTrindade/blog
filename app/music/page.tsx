"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllMusic, getAllArtists } from "@/lib/media-utils"
import { Navigation } from "@/components/navigation"

export default function MusicPage() {
  const music = getAllMusic()
  const artists = getAllArtists()
  const [activeTab, setActiveTab] = useState<'artists' | 'tracks'>('artists')

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
          <h1 className="text-4xl font-bold text-gray-1200 dark:text-white mb-2">Music</h1>
          <p className="text-gray-1000 dark:text-white opacity-70">My listening stats from Spotify.</p>
        </div>

        {/* Tab pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('artists')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'artists'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Top Artists
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'tracks'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            Top Tracks
          </button>
        </div>

        <section className="mb-16 min-h-[500px]">
          {activeTab === 'artists' && (
            <div className="space-y-2">
              {artists.map((artist, index) => (
                <a
                  key={artist.id}
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-2 -mx-3 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-200 transition-colors"
                >
                  <span className="w-5 text-sm text-gray-1000 dark:text-white opacity-70 tabular-nums text-right">
                    {index + 1}
                  </span>
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-300">
                    <Image 
                      src={artist.image} 
                      alt={artist.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span className="font-medium text-sm text-gray-1200 dark:text-white">
                    {artist.name}
                  </span>
                </a>
              ))}
            </div>
          )}

          {activeTab === 'tracks' && (
            <div className="space-y-2">
              {music.map((item, index) => (
                <a
                  key={item.id}
                  href={item.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-2 -mx-3 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-200 transition-colors"
                >
                  <span className="w-5 text-sm text-gray-1000 dark:text-white opacity-70 tabular-nums text-right">
                    {index + 1}
                  </span>
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-300">
                    <Image 
                      src={item.image} 
                      alt={`${item.title} by ${item.artist}`}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-sm text-gray-1200 dark:text-white truncate">
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-1000 dark:text-white opacity-70 truncate">
                      {item.artist}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
