import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const pageData: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Bernardo Trindade de Abreu',
    description: 'Senior Full Stack Engineer specializing in React, Node.js, Python, AI, and Cloud technologies',
  },
  about: {
    title: 'About Me',
    description: 'Learn more about my background, experience, and what drives me as a software engineer',
  },
  projects: {
    title: 'Projects',
    description: 'A collection of things I\'ve built and contributed to over the years',
  },
  writing: {
    title: 'Writing',
    description: 'Thoughts and insights on software engineering, technology, and development practices',
  },
  books: {
    title: 'Books',
    description: 'Books that have shaped my thinking and that I recommend to others',
  },
  music: {
    title: 'Music',
    description: 'What I\'m listening to and music that inspires my work',
  },
  movies: {
    title: 'Movies',
    description: 'Films that I love and recommend watching',
  },
  work: {
    title: 'Work Experience',
    description: 'My professional journey and the companies I\'ve worked with',
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || 'home'
  
  const data = pageData[page] || pageData.home

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
              fontSize: data.title.length > 30 ? '56px' : '72px',
              fontWeight: 700,
              color: '#fafafa',
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {data.title}
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#a1a1aa',
              lineHeight: 1.4,
              margin: 0,
              maxWidth: '850px',
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Footer spacer */}
        <div style={{ display: 'flex' }} />
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
}
