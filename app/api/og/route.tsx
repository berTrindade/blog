import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// Use Edge Runtime for faster cold starts
export const runtime = 'edge'

// Define supported page types
type PageType = 'homepage' | 'blog' | 'blogArticle' | 'about' | 'projects' | 'work' | 'writing'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    // Extract parameters with defaults
    const type = (searchParams.get('type') as PageType) || 'homepage'
    const title = searchParams.get('title') || 'Bernardo Trindade'
    const subtitle = searchParams.get('subtitle') || ''
    const backgroundImage = searchParams.get('image') || ''

    // Build background image URL if provided
    const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'

    const imageUrl = backgroundImage ? `${baseUrl}/${backgroundImage}` : null

    // Fetch background image as base64 if provided
    let imageData: string | null = null
    if (imageUrl) {
      try {
        const imageResponse = await fetch(imageUrl)
        if (imageResponse.ok) {
          const buffer = await imageResponse.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'
          imageData = `data:${contentType};base64,${base64}`
        }
      } catch (e) {
        console.error('Failed to fetch background image:', e)
      }
    }

    const hasBackground = !!imageData

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 60,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
            position: 'relative',
          }}
        >
          {/* Background image layer */}
          {hasBackground && (
            <img
              src={imageData!}
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

          {/* Dark overlay for text readability */}
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
                fontSize: title.length > 50 ? 48 : 56,
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
                textShadow: hasBackground ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  fontSize: 24,
                  color: '#d4d4d8',
                  lineHeight: 1.4,
                  margin: 0,
                  textShadow: hasBackground ? '0 1px 5px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                {subtitle.length > 120 ? `${subtitle.slice(0, 120)}...` : subtitle}
              </p>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 1 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
              }}
            />
            <span style={{ fontSize: 18, color: '#a1a1aa' }}>
              {type === 'blogArticle' ? 'Blog Article' : type.charAt(0).toUpperCase() + type.slice(1)}
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
    console.error('Error generating OG image:', error)

    // Return fallback image on error
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            color: 'white',
            fontSize: 48,
            fontWeight: 'bold',
          }}
        >
          bernardo.dev
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
}
