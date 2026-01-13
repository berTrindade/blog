import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog-utils'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Use Node.js runtime (Vercel recommended for local file access)
// See: https://vercel.com/docs/og-image-generation
export const runtime = 'nodejs'

/**
 * Load local image using fs.readFile and convert to base64 data URL
 * Vercel docs: "Local resources can be loaded directly using fs.readFile"
 * @see https://vercel.com/docs/og-image-generation
 */
async function getLocalImageAsBase64(imagePath: string): Promise<string | null> {
  try {
    // Remove leading slash and join with public directory
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    const fullPath = join(process.cwd(), 'public', cleanPath)
    
    // Read file using fs.readFile (Vercel recommended)
    const imageBuffer = await readFile(fullPath)
    const base64 = imageBuffer.toString('base64')
    
    // Determine MIME type from extension
    const ext = imagePath.split('.').pop()?.toLowerCase() || 'png'
    const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`
    
    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    console.error(`[OG] Failed to load image: ${imagePath}`, error)
    return null
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await getBlogPost(slug)

    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    // Load local image if available (must be under 500KB for bundle limit)
    let backgroundImage: string | null = null
    if (post.meta.image?.startsWith('/')) {
      backgroundImage = await getLocalImageAsBase64(post.meta.image)
    }

    const hasBackground = !!backgroundImage

    // Generate OG image (1200x630 recommended by Vercel)
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 60,
            fontFamily: 'system-ui, sans-serif',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
            position: 'relative',
          }}
        >
          {/* Background image layer */}
          {hasBackground && backgroundImage && (
            <img
              src={backgroundImage}
              alt=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}

          {/* Dark overlay for readability */}
          {hasBackground && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)',
              }}
            />
          )}

          {/* Header with logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              B
            </div>
            <span style={{ color: '#e4e4e7', fontSize: 24, fontWeight: 500 }}>
              bernardo.dev
            </span>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1 }}>
            <h1
              style={{
                fontSize: post.meta.title.length > 50 ? 48 : 56,
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
                textShadow: hasBackground ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              {post.meta.title}
            </h1>
            <p
              style={{
                fontSize: 24,
                color: '#d4d4d8',
                lineHeight: 1.4,
                margin: 0,
                textShadow: hasBackground ? '0 1px 5px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              {post.meta.excerpt.length > 120
                ? `${post.meta.excerpt.slice(0, 120)}...`
                : post.meta.excerpt}
            </p>
          </div>

          {/* Footer with category and date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
            {post.meta.category && (
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'white',
                  background: '#3b82f6',
                  padding: '8px 16px',
                  borderRadius: 8,
                }}
              >
                {post.meta.category}
              </span>
            )}
            <span style={{ fontSize: 18, color: '#a1a1aa' }}>
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
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
  } catch (error) {
    console.error('[OG] Error generating image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
