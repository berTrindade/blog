"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface BlogPost {
  slug: string
  meta: {
    title: string
    date: string
    excerpt: string
    category?: string
    tags?: string[]
  }
}

export default function WorkPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [groupByYear, setGroupByYear] = useState(true)

  useEffect(() => {
    // Fetch posts from API or use static data
    fetch('/api/posts').then(res => res.json()).then(setPosts).catch(() => {
      // Fallback: you can import this directly server-side
    })
  }, [])

  // Get unique categories
  const categories = ["All", ...new Set(posts.map(p => p.meta.category || "Uncategorized"))]
  
  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(p => p.meta.category === selectedCategory)

  // Group posts by year
  const postsByYear = filteredPosts.reduce((acc, post) => {
    const year = new Date(post.meta.date).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<number, BlogPost[]>)

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="root layout-root">
      {/* Header with navigation */}
      <header className="mb-16 flex items-center justify-between gap-4">
        <Link 
          className="text-sm text-primary hover:opacity-70 transition-opacity no-underline" 
          href="/"
        >
          ← Work
        </Link>
        <Navigation showShare />
      </header>

      {/* Experiments/Articles section */}
      <section className="mb-32">
        <h1 className="mb-8 text-2xl font-medium leading-none text-primary">
          Experiments
        </h1>

        {/* Category filter and view toggle */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none rounded-lg border border-gray-400 dark:border-gray-300 bg-white dark:bg-black/50 px-4 py-2 pr-10 text-sm text-gray-1200 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-500 cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-gray-1000 dark:text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            onClick={() => setGroupByYear(!groupByYear)}
            className="text-sm text-primary hover:opacity-70 transition-opacity"
          >
            {groupByYear ? "Show all" : "Group by year"}
          </button>
        </div>

        {groupByYear ? (
          /* Grouped by year view */
          <div className="space-y-16">
            {years.map(year => (
              <div key={year}>
                <h2 className="mb-6 text-xl font-medium text-primary">{year}</h2>
                <div className="space-y-2">
                  {postsByYear[Number(year)].map(post => (
                    <ArticleListItem key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-2">
            {filteredPosts.map(post => (
              <ArticleListItem key={post.slug} post={post} />
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <p className="text-center text-tertiary py-12">No articles found in this category.</p>
        )}
      </section>
    </div>
  )
}

function ArticleListItem({ post }: { post: BlogPost }) {
  return (
    <Link 
      href={`/writing/${post.slug}`}
      className="flex items-start justify-between gap-4 rounded-md py-3 no-underline hover:bg-[#F5F4F4] dark:hover:bg-gray-300 sm:-mx-3 sm:px-3"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-medium text-primary">
            {post.meta.title}
          </h2>
          {post.meta.category && post.meta.category !== "Uncategorized" && (
            <span className="shrink-0 rounded-full bg-gray-200 dark:bg-white/10 px-2 py-0.5 text-xs text-primary">
              {post.meta.category}
            </span>
          )}
        </div>
        <p className="text-sm text-secondary line-clamp-2">
          {post.meta.excerpt}
        </p>
      </div>
      <time className="shrink-0 text-xs text-tertiary mt-1">
        {new Date(post.meta.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </time>
    </Link>
  )
}
