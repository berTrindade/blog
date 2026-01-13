import { notFound } from "next/navigation"
import { getAllBlogPosts, getBlogPost } from "@/lib/blog-utils"
import { MDXContent } from "@/components/mdx-content"
import { TableOfContents } from "@/components/table-of-contents"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  const ogImage = `/api/og/${slug}`

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Get all posts for prev/next navigation
  const allPosts = await getAllBlogPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // Calculate reading time (average 200 words per minute)
  const wordCount = post.markdown.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  // Format date
  const formattedDate = new Date(post.meta.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="root layout-root relative">
      <TableOfContents />
      
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
      <div className="article" data-main-content>
        {/* Article Header */}
        <h1 className="mb-2 font-semibold dark:text-white">{post.meta.title}</h1>
        <div className="mb-8 text-sm text-gray-1000">
          {formattedDate} · {readingTime}min
        </div>

        {/* Featured Image */}
        {post.meta.image && (
          <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden border border-black/6 bg-[#f6f8fa] dark:border-white/5 dark:bg-[#0F0F0F]">
            <Image 
              src={post.meta.image} 
              alt={post.meta.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <MDXContent source={post.markdown} />

        {/* Thank you section */}
        <div className="pt-12">
          <p className="text-gray-1000 mb-4">
            Thank you for reading! I hope you found this useful. Feel free to reach out to me on{' '}
            <a 
              href="https://x.com/btrindadeabreu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              X
            </a>
            {' '}if you have any questions or feedback.
          </p>
        </div>

        {/* Previous/Next Navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-16 flex justify-between border-t border-gray-300 dark:border-gray-600 pt-6">
            {prevPost ? (
              <Link 
                className="flex w-[48%] md:w-auto min-w-0 shrink-0 flex-col items-start text-sm no-underline hover:opacity-70 transition-opacity" 
                href={`/blog/${prevPost.slug}`}
              >
                <span className="text-gray-1000">Previous</span>
                <span className="inline-block min-w-0 max-w-full truncate text-black dark:text-white">{prevPost.meta.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link 
                className="ml-auto flex w-[48%] md:w-auto shrink-0 flex-col items-end text-sm no-underline hover:opacity-70 transition-opacity" 
                href={`/blog/${nextPost.slug}`}
              >
                <span className="text-gray-1000">Next</span>
                <span className="inline-block min-w-0 max-w-full truncate text-black dark:text-white">{nextPost.meta.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* Footer with copyright */}
        <footer className="mt-16 pt-8 text-center text-xs text-gray-1000">
          <p>© {new Date().getFullYear()} Bernardo Trindade de Abreu. All rights reserved.</p>
        </footer>
      </div>
      </main>
    </div>
  )
}
