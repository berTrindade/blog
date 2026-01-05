import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  meta: {
    title: string
    date: string
    excerpt: string
    category?: string
    tags?: string[]
    image?: string
    imageFit?: 'cover' | 'contain'
    thumbnail?: string
    thumbnailFit?: 'cover' | 'contain'
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(contentDirectory)
  
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const filePath = path.join(contentDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        meta: {
          title: data.title || '',
          date: data.date || '',
          excerpt: data.excerpt || '',
          category: data.category || 'Uncategorized',
          tags: data.tags || [],
          image: data.image || undefined,
          imageFit: data.imageFit === 'contain' ? ('contain' as const) : undefined,
          thumbnail: data.thumbnail || undefined,
          thumbnailFit: data.thumbnailFit === 'contain' ? ('contain' as const) : undefined,
        },
      }
    })
    .sort((a, b) => {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    })
  
  return posts
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    meta: {
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      image: data.image || undefined,
      imageFit: data.imageFit === 'contain' ? ('contain' as const) : undefined,
      thumbnail: data.thumbnail || undefined,
      thumbnailFit: data.thumbnailFit === 'contain' ? ('contain' as const) : undefined,
    },
    markdown: content,
  }
}
