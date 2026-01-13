import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog-utils'

export const runtime = 'nodejs'

// Cache for 1 week, revalidate every day
export const revalidate = 86400

// Pre-fetch image and convert to base64 data URL
async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    // Use simple fetch without Next.js cache options for compatibility
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8s timeout
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'image/*',
      },
    })
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      return null
    }
    
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    
    return `data:${contentType};base64,${base64}`
  } catch (error) {
    console.error('Error fetching image:', error)
    return null
  }
}

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

    // Get base URL for local images
    const url = new URL(request.url)
    const baseUrl = `${url.protocol}//${url.host}`
    
    // Fetch featured image as base64 (works for both external and local images)
    let backgroundImage: string | null = null
    
    if (post.meta.image) {
      let imageUrl = post.meta.image
      console.log(`[OG] Post image URL: ${imageUrl}`)
      
      // Convert local paths to absolute URLs
      if (imageUrl.startsWith('/')) {
        const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : baseUrl
        imageUrl = `${prodUrl}${imageUrl}`
        console.log(`[OG] Converted to absolute URL: ${imageUrl}`)
      }
      
      // Fetch and convert to base64
      if (imageUrl.startsWith('http')) {
        console.log(`[OG] Fetching image...`)
        backgroundImage = await fetchImageAsBase64(imageUrl)
        console.log(`[OG] Fetch result: ${backgroundImage ? 'SUCCESS' : 'FAILED'}`)
      }
    } else {
      console.log(`[OG] No image for post: ${slug}`)
    }
    
    const hasImage = !!backgroundImage

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background image with overlay */}
          {hasImage && backgroundImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={backgroundImage}
                alt=""
                width={1200}
                height={630}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Dark overlay for text readability */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.75) 100%)',
                }}
              />
            </>
          )}

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              position: 'relative',
              zIndex: 10,
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
                color: 'rgba(255,255,255,0.9)',
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
              gap: '20px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <h1
              style={{
                fontSize: post.meta.title.length > 50 ? '48px' : '56px',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.15,
                margin: 0,
                maxWidth: '900px',
                textShadow: hasImage ? '0 2px 20px rgba(0,0,0,0.8)' : 'none',
              }}
            >
              {post.meta.title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '800px',
                textShadow: hasImage ? '0 1px 10px rgba(0,0,0,0.8)' : 'none',
              }}
            >
              {post.meta.excerpt.length > 100 
                ? post.meta.excerpt.slice(0, 100) + '...' 
                : post.meta.excerpt}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {post.meta.category && (
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: 600,
                  padding: '8px 16px',
                  background: 'rgba(59, 130, 246, 0.9)',
                  borderRadius: '8px',
                }}
              >
                {post.meta.category}
              </span>
            )}
            <span
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '18px',
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
        headers: {
          'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
        },
      }
    )

    return imageResponse
  } catch {
    return new Response('Error generating image', { status: 500 })
  }
}
