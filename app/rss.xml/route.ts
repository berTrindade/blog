import { getAllBlogPosts } from "@/lib/blog-utils"
import RSS from "rss"

export async function GET() {
  const posts = await getAllBlogPosts()

  const feed = new RSS({
    title: "My Blog",
    description: "Thoughts on design, development, and digital craftsmanship",
    feed_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/rss.xml`,
    site_url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    managingEditor: "btrindadedeabreu@gmail.com",
    language: "en",
    image_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
  })

  posts.forEach((post) => {
    feed.item({
      title: post.meta.title,
      description: post.meta.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${post.slug}`,
      date: new Date(post.meta.date),
      guid: post.slug,
      categories: [post.meta.category],
      author: "Your Name",
    })
  })

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600",
    },
  })
}
