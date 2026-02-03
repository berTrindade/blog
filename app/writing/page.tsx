"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArticleCover } from "@/components/article-cover"
import { Navigation } from "@/components/navigation"
import type { BlogPost } from "@/lib/blog-utils"

export default function WritingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [loading, setLoading] = useState(true)

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

  // Get unique categories
  const categories = ["All", ...new Set(posts.map(p => p.meta.category || "Uncategorized"))]

  // Filter posts by category
  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(p => p.meta.category === selectedCategory)

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
        {/* Main content */}
        <div className="min-h-[600px]">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-2">Writing</h1>
            <p className="text-tertiary">Thoughts, ideas, and explorations.</p>
          </div>

          {/* Category filter pills */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${selectedCategory === 'All'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('Engineering')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${selectedCategory === 'Engineering'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Engineering
            </button>
            <button
              onClick={() => setSelectedCategory('Reflections')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${selectedCategory === 'Reflections'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Reflections
            </button>
            <button
              onClick={() => setSelectedCategory('Personal')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${selectedCategory === 'Personal'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal
            </button>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
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
              {filteredPosts.map(post => (
                <ArticleListItem key={post.slug} post={post} />
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            <p className="text-center text-tertiary py-12">No articles found in this category.</p>
          )}
        </div>
      </main>
    </div>
  )
}

function ArticleListItem({ post }: { post: BlogPost }) {
  // Calculate reading time
  const wordCount = post.meta.excerpt.split(/\s+/).length * 10
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Shorten excerpt to first 80 characters
  const shortExcerpt = post.meta.excerpt.length > 80
    ? post.meta.excerpt.substring(0, 80).trim() + '...'
    : post.meta.excerpt

  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group -mx-3 flex items-center gap-4 rounded-xl py-3 pr-4 pl-3 no-underline hover:bg-gray-200 dark:hover:bg-gray-300"
    >
      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-black/6 dark:border-white/5">
        <ArticleCover title={post.meta.title} tags={post.meta.tags} size="thumbnail" />
      </div>
      <div className="flex h-20 w-full min-w-0 flex-col items-start justify-center gap-0.5">
        <span className="w-full truncate font-medium text-primary">
          {post.meta.title}
        </span>
        <p className="text-sm text-secondary line-clamp-1 mb-0.5">
          {shortExcerpt}
        </p>
        <span className="shrink-0 whitespace-nowrap text-sm text-tertiary">
          {new Date(post.meta.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })} · {readingTime} min read
        </span>
      </div>
    </Link>
  )
}
