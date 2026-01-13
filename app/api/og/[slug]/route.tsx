import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog-utils'

export const runtime = 'nodejs'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  
  try {
    const post = await getBlogPost(slug)
    
    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>B</span>
            </div>
            <span
              style={{
                color: '#a1a1aa',
                fontSize: '24px',
                fontWeight: 500,
              }}
            >
              bernardo.dev
            </span>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <h1
              style={{
                fontSize: post.meta.title.length > 50 ? '52px' : '64px',
                fontWeight: 700,
                color: '#fafafa',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {post.meta.title}
            </h1>
            <p
              style={{
                fontSize: '28px',
                color: '#a1a1aa',
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '800px',
              }}
            >
              {post.meta.excerpt.length > 120 
                ? post.meta.excerpt.slice(0, 120) + '...' 
                : post.meta.excerpt}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {post.meta.category && (
              <span
                style={{
                  color: '#3b82f6',
                  fontSize: '20px',
                  fontWeight: 600,
                  padding: '8px 16px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                }}
              >
                {post.meta.category}
              </span>
            )}
            <span
              style={{
                color: '#71717a',
                fontSize: '20px',
              }}
            >
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch {
    return new Response('Error generating image', { status: 500 })
  }
}
