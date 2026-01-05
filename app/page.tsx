"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllProjects } from "@/lib/projects-utils"
import { getAllFilms, getAllBooks, getAllMusic } from "@/lib/media-utils"
import { Navigation } from "@/components/navigation"
import { Newsletter } from "@/components/newsletter"
import type { BlogPost } from "@/lib/blog-utils"

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const projects = getAllProjects()
  const featuredProjects = projects.slice(0, 4)
  const films = getAllFilms()
  const books = getAllBooks()
  const music = getAllMusic()

  useEffect(() => {
    setLoading(true)
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="root layout-root">
      {/* Bernardo's style header with navigation */}
      <header className="mb-32 flex items-start justify-between">
        <div className="flex flex-col items-start">
          <Link className="text-medium inline-block font-medium no-underline dark:text-white" href="/">
            Bernardo Trindade de Abreu
          </Link>
          <span className="text-medium font-medium leading-none text-gray-1100">Senior Full Stack Engineer</span>
        </div>
        <Navigation />
      </header>

      <main>
      {/* Today section */}
      <section className="mb-32">
        <h2 className="mb-6 text-lg font-medium leading-none text-black dark:text-white">Today</h2>
        <p className="text-base leading-relaxed opacity-90">
          I work at ustwo as a Senior Full Stack Engineer, building scalable applications with React, Node.js, Python, and AWS. I focus on integrating AI-driven features using LLMs and RAG techniques to deliver exceptional user experiences.
        </p>
        <p className="mt-4 text-base leading-relaxed opacity-90">
          Previously, I worked at NinjaOne, PrimeIT (Trustly), Aurum Software, and Meta, contributing to enterprise platforms and innovative solutions.
        </p>
        
        {/* Social links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:btrindadedeabreu@gmail.com"
            className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-300 p-3 text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
            aria-label="Email"
            title="Email"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href="https://x.com/btrindadeabreu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-300 p-3 text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
            aria-label="Twitter/X"
            title="Twitter/X"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://github.com/berTrindade"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-300 p-3 text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/bertrindade/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-300 p-3 text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
            </svg>
          </a>          <a
            href="https://cal.com/bertrindade"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-300 p-3 text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
            aria-label="Cal.com"
            title="Book a meeting"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M162.8 347.3c-50.4 0-88.4-39.9-88.4-89.3s35.9-89.6 88.4-89.6c27.9 0 47 8.6 62.1 28l-24.3 20.1c-10.1-10.8-22.5-16.2-37.8-16.2-34.1 0-52.8 26.1-52.8 57.6s20.5 57.1 52.8 57.1c15.1 0 28-5.3 38.4-16.2l23.9 21c-14.5 18.9-34.3 27.5-62.3 27.5m166.4-131.2h32.7v128.1h-32.7v-18.7c-6.7 13.2-18.1 22.2-39.7 22.2-34.6 0-62.3-30.1-62.3-66.9 0-37 27.7-66.9 62.3-66.9 21.5 0 33 8.9 39.7 22.2zm1.1 64.5c0-20-13.8-36.6-35.4-36.6-20.8 0-34.4 16.7-34.4 36.6 0 19.4 13.6 36.6 34.4 36.6 21.4 0 35.4-16.7 35.4-36.6M385 164.3h32.7v179.6H385z"/>
            </svg>
          </a>
          <a
            href="https://discord.gg/your-discord-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-300 p-3 text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
            aria-label="Discord"
            title="Discord"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
          <a
            href="/Resume.pdf"
            download
            className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-300 p-3 text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
            aria-label="Download Resume"
            title="Download Resume"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Projects section */}
      <section className="mb-32">
        <h2 className="mb-6 text-lg font-medium leading-none text-black dark:text-white">Projects</h2>
        <div className="space-y-2">
          {featuredProjects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-3 flex items-center gap-4 rounded-xl py-3 pr-4 pl-3 no-underline hover:bg-gray-200 dark:hover:bg-gray-300"
            >
              <div className="flex w-full flex-col items-start justify-center gap-0.5">
                <span className="w-full truncate font-medium text-black dark:text-white">
                  {project.title}
                </span>
                <p className="text-sm text-gray-1000 line-clamp-1">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Films & Books section */}
      {/* Films section */}
      <section className="mb-32">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium leading-none text-black dark:text-white">Movies</h2>
          <Link 
            href="/movies"
            className="text-sm text-gray-1000 hover:text-black dark:hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {films.slice(0, 4).map((film) => (
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

      {/* Books section */}
      <section className="mb-32">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium leading-none text-black dark:text-white">Books</h2>
          <Link 
            href="/books"
            className="text-sm text-gray-1000 hover:text-black dark:hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>
          
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {books.slice(0, 4).map((book) => (
            <Link
              key={book.id}
              href="/books"
              className="group flex flex-col gap-2"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-md transition-transform hover:scale-[1.03]">
                <Image 
                  src={book.image} 
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm leading-tight text-black dark:text-white line-clamp-2">
                  {book.title}
                </span>
                <span className="text-sm text-gray-1000">
                  {book.author}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Music section */}
      <section className="mb-32">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium leading-none text-black dark:text-white">Music</h2>
          <Link 
            href="/music"
            className="text-sm text-gray-1000 hover:text-black dark:hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {music.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm dark:border dark:border-gray-600 transition-transform hover:scale-105 cursor-pointer">
                <Image 
                  src={item.image} 
                  alt={`${item.title} by ${item.artist}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
              <div className="flex flex-col">
                <span className="truncate font-medium text-sm text-black dark:text-white">
                  {item.title}
                </span>
                <span className="text-xs text-gray-1000">
                  {item.artist} · {item.year}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Writing section */}
      <section className="mb-32">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium leading-none text-black dark:text-white">Writing</h2>
          <Link href="/writing" className="text-sm text-gray-1000 hover:text-black dark:hover:text-white transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-4 rounded-md py-3">
                <div className="relative h-20 w-32 bg-gray-300 dark:bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-300 dark:bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {posts.slice(0, 4).map(post => (
              <ArticleListItem key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter section */}
      <section className="mb-32">
        <Newsletter />
      </section>
      </main>
    </div>
  )
}

function ArticleListItem({ post }: { post: BlogPost }) {
  const previewImage = post.meta.thumbnail ?? post.meta.image

  // Calculate reading time
  const wordCount = post.meta.excerpt.split(/\s+/).length * 10 // Rough estimate based on excerpt
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))
  
  // Shorten excerpt to first 80 characters
  const shortExcerpt = post.meta.excerpt.length > 80 
    ? post.meta.excerpt.substring(0, 80).trim() + '...'
    : post.meta.excerpt

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group -mx-3 flex items-center gap-4 rounded-xl py-3 pr-4 pl-3 no-underline hover:bg-gray-200 dark:hover:bg-gray-300"
    >
      {previewImage && (
        <div className="relative aspect-158/100 h-20 shrink-0 overflow-hidden rounded-lg border border-black/6 bg-[#f6f8fa] dark:border-white/5 dark:bg-[#0F0F0F]">
          <Image 
            src={previewImage} 
            alt={post.meta.title}
            fill
            className="object-cover"
            sizes="126px"
          />
        </div>
      )}
      <div className="flex h-20 w-full min-w-0 flex-col items-start justify-center gap-0.5">
        <span className="w-full truncate font-medium text-black dark:text-white">
          {post.meta.title}
        </span>
        <p className="text-sm text-gray-1000 line-clamp-1 mb-0.5">
          {shortExcerpt}
        </p>
        <span className="shrink-0 whitespace-nowrap text-sm text-gray-900">
          {new Date(post.meta.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          })} · {readingTime} min read
        </span>
      </div>
    </Link>
  )
}
