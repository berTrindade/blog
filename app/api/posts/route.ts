import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog-utils'

export async function GET() {
  const posts = await getAllBlogPosts()
  return NextResponse.json(posts)
}
