import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// Use Edge Runtime for faster cold starts
export const runtime = 'edge'

// Define supported page types
type PageType = 'homepage' | 'blog' | 'blogArticle' | 'about' | 'work' | 'writing'

// Color palette
const GLOW_COLORS = [
  '#10b981', // Green
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#f97316', // Orange
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#eab308', // Yellow
  '#14b8a6', // Teal
]

// Generate consistent color based on title
function getColorFromTitle(title: string): string {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  return GLOW_COLORS[Math.abs(hash) % GLOW_COLORS.length]
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    // Extract parameters with defaults
    const type = (searchParams.get('type') as PageType) || 'homepage'
    const title = searchParams.get('title') || 'Bernardo Trindade'
    const subtitle = searchParams.get('subtitle') || ''

    // Get glow color based on title for articles, or type for other pages
    const glowColor = type === 'blogArticle' 
      ? getColorFromTitle(title)
      : {
          homepage: '#3b82f6',
          blog: '#8b5cf6',
          blogArticle: '#f97316',
          about: '#10b981',
          work: '#06b6d4',
          writing: '#eab308',
        }[type] || '#3b82f6'

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
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            background: '#0d1117',
          }}
        >
          {/* Hexagonal pattern overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-opacity='0.03' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Radial glow effect */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              height: 500,
              background: `radial-gradient(circle, ${glowColor}40 0%, ${glowColor}20 25%, ${glowColor}08 50%, transparent 70%)`,
              filter: 'blur(20px)',
            }}
          />

          {/* Secondary glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              height: 300,
              background: `radial-gradient(circle, ${glowColor}60 0%, transparent 60%)`,
              filter: 'blur(40px)',
            }}
          />

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              zIndex: 1,
              maxWidth: 900,
              padding: '0 60px',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 60 ? 40 : title.length > 40 ? 48 : 56,
                fontWeight: 600,
                color: 'white',
                lineHeight: 1.2,
                margin: 0,
                textAlign: 'center',
              }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                style={{
                  fontSize: 24,
                  color: '#8b949e',
                  lineHeight: 1.4,
                  margin: 0,
                  textAlign: 'center',
                  maxWidth: 700,
                }}
              >
                {subtitle.length > 100 ? `${subtitle.slice(0, 100)}...` : subtitle}
              </p>
            )}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)

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
            background: '#0d1117',
            color: 'white',
            fontSize: 48,
            fontWeight: 'bold',
          }}
        >
          Bernardo Trindade
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
}
