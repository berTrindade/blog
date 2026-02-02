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
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('Engineering')}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selectedCategory === 'Engineering'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
                Engineering
              </button>
              <button
                onClick={() => setSelectedCategory('Thoughts')}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selectedCategory === 'Thoughts'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 15.61l-2.83-2.83c-.2-.19-.45-.29-.71-.29-.26 0-.51.1-.71.29l-2.83 2.83a.996.996 0 1 0 1.41 1.41L17 15.36V20a1 1 0 0 0 2 0v-4.64l1.66 1.66a.996.996 0 1 0 1.41-1.41zM13 5a4 4 0 0 0-4 4v1a2 2 0 0 0-2 2v7a1 1 0 0 0 2 0v-7h1v7a1 1 0 0 0 2 0v-7h1v7a1 1 0 0 0 2 0v-7a2 2 0 0 0-2-2V9a2 2 0 0 1 4 0v1a1 1 0 0 0 2 0V9a4 4 0 0 0-4-4h-2z"/>
                </svg>
                Thoughts
              </button>
              <button
                onClick={() => setSelectedCategory('Personal')}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selectedCategory === 'Personal'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-200 dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#262626]'
                }`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
