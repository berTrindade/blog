"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface Project {
  id: string
  title: string
  description: string
  url?: string
  icon?: string
  category?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    // Fetch projects from API or use static data
    fetch('/api/projects').then(res => res.json()).then(setProjects).catch(() => {})
  }, [])

  // Get unique categories
  const categories = ["All", ...new Set(projects.map(p => p.category || "Uncategorized"))]
  
  // Filter projects by category
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <div className="root layout-root">
      {/* Header with navigation */}
      <header className="mb-32 flex items-center justify-between">
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
        <Navigation />
      </header>

      {/* Projects section */}
      <section className="mb-32">
        <h1 className="mb-8 text-2xl font-medium leading-none text-black dark:text-white">
          Projects
        </h1>

        {/* Category filter */}
        <div className="mb-8">
          <div className="relative inline-block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none rounded-lg border border-gray-400 dark:border-gray-300 bg-white dark:bg-black px-4 py-2 pr-10 text-sm text-gray-1200 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-500 cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-gray-1000" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Projects list */}
        <div className="space-y-2">
          {filteredProjects.map(project => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-1000 py-12">No projects found in this category.</p>
        )}
      </section>
    </div>
  )
}

function ProjectListItem({ project }: { project: Project }) {
  const Component = project.url ? 'a' : 'div'
  const props = project.url 
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {}

  return (
    <Component
      {...props}
      className="flex items-start justify-between gap-4 rounded-md py-3 no-underline hover:bg-[#F5F4F4] dark:hover:bg-gray-300 sm:-mx-3 sm:px-3 cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-medium text-black dark:text-white">
            {project.title}
          </h2>
          {project.category && project.category !== "Uncategorized" && (
            <span className="shrink-0 rounded-full bg-gray-300 dark:bg-gray-200 px-2 py-0.5 text-xs text-gray-1200">
              {project.category}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-1000">
          {project.description}
        </p>
      </div>
      {project.url && (
        <svg className="shrink-0 h-4 w-4 text-gray-900 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </Component>
  )
}
