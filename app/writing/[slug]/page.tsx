import { notFound } from "next/navigation"
import { getAllBlogPosts, getBlogPost } from "@/lib/blog-utils"
import { generateOgMetadata, truncateText } from "@/lib/og-image"
import { MDXContent } from "@/components/mdx-content"
import { TableOfContents } from "@/components/table-of-contents"
import { Navigation } from "@/components/navigation"
import { Newsletter } from "@/components/newsletter"
import Link from "next/link"
import { ArticleCover } from "@/components/article-cover"

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

  return generateOgMetadata({
    title: post.meta.title,
    description: post.meta.excerpt,
    ogImageParams: {
      type: 'blogArticle',
      title: truncateText(post.meta.title, 60),
      subtitle: truncateText(post.meta.excerpt, 120),
      tags: post.meta.tags,
    },
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Fetch post and all posts in parallel for better performance
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug),
    getAllBlogPosts()
  ])

  if (!post) {
    notFound()
  }

  // Get prev/next posts for navigation (circular - wraps around)
  // Posts are sorted newest first, so:
  // - "Previous" goes to newer article (index - 1)
  // - "Next" goes to older article (index + 1)
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex > 0 
    ? allPosts[currentIndex - 1] 
    : allPosts[allPosts.length - 1] // Wrap to oldest if at newest
  const nextPost = currentIndex < allPosts.length - 1 
    ? allPosts[currentIndex + 1] 
    : allPosts[0] // Wrap to newest if at oldest

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
          className="text-sm text-primary hover:opacity-70 transition-opacity no-underline" 
          href="/writing"
        >
          ← Writing
        </Link>
        <Navigation showShare />
      </header>

      <main>
      <div className="article" data-main-content>
        {/* Article Header */}
        <h1 className="mb-2 font-semibold text-primary">{post.meta.title}</h1>
        <div className="mb-8 text-sm text-tertiary">
          {formattedDate} · {readingTime}min
        </div>

        {/* Hero Cover */}
        <div className="w-full mb-12 rounded-2xl overflow-hidden border border-black/6 dark:border-white/5">
          <ArticleCover title={post.meta.title} tags={post.meta.tags} size="hero" />
        </div>

        {/* Article Content */}
        <MDXContent source={post.markdown} />

        {/* Thank you section */}
        <div className="pt-12">
          <p className="text-secondary mb-4">
            Thank you for reading! I hope you found this useful. Feel free to reach out to me on{' '}
            <a 
              href="https://x.com/btrindadeabreu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-white/10 text-primary font-medium text-sm transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-white/20 no-underline"
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @btrindadeabreu
            </a>
            {' '}if you have any questions or feedback.
          </p>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
          <Newsletter />
        </div>

        {/* Previous/Next Navigation */}
        <div className="mt-16 flex flex-row justify-between gap-4 border-t border-gray-300 dark:border-gray-600 pt-6">
          <Link 
            className="flex w-1/2 flex-col items-start text-sm no-underline hover:opacity-70 transition-opacity" 
            href={`/writing/${prevPost.slug}`}
          >
            <span className="text-tertiary">Previous</span>
            <span className="text-primary line-clamp-2">{prevPost.meta.title}</span>
          </Link>
          <Link 
            className="flex w-1/2 flex-col items-end text-sm no-underline hover:opacity-70 transition-opacity" 
            href={`/writing/${nextPost.slug}`}
          >
            <span className="text-tertiary">Next</span>
            <span className="text-primary text-right line-clamp-2">{nextPost.meta.title}</span>
          </Link>
        </div>
      </div>
      </main>
    </div>
  )
}
