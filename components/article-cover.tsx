'use client'

import {
  Activity,
  FlaskConical,
  Zap,
  Database,
  FileCode,
  Shield,
  Play,
  Atom,
  Globe,
  Code,
  Video,
  FileText,
  type LucideIcon,
} from 'lucide-react'

interface ArticleCoverProps {
  title: string
  size?: 'thumbnail' | 'hero'
  className?: string
}

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

// Keywords to match articles to icons
const ICON_MAPPINGS: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ['telemetry', 'observability', 'monitoring', 'metrics', 'tracing'], icon: Activity },
  { keywords: ['test', 'testing', 'jest', 'cypress', 'playwright'], icon: FlaskConical },
  { keywords: ['performance', 'speed', 'optimization', 'fast', 'lighthouse'], icon: Zap },
  { keywords: ['api', 'rest', 'graphql', 'endpoint', 'server', 'database'], icon: Database },
  { keywords: ['typescript', 'types', 'patterns'], icon: FileCode },
  { keywords: ['security', 'secure', 'auth', 'xss', 'csrf', 'owasp'], icon: Shield },
  { keywords: ['animation', 'motion', 'framer', 'transition', 'clip-path'], icon: Play },
  { keywords: ['react', 'component', 'hooks', 'server components', 'rsc'], icon: Atom },
  { keywords: ['web', 'browser', 'frontend', 'html', 'css'], icon: Globe },
  { keywords: ['code', 'coding', 'programming', 'getting started', 'best practices'], icon: Code },
  { keywords: ['video', 'media', 'player'], icon: Video },
]

// Get icon based on article title
function getIconForTitle(title: string): LucideIcon {
  const lowerTitle = title.toLowerCase()
  
  for (const mapping of ICON_MAPPINGS) {
    if (mapping.keywords.some(keyword => lowerTitle.includes(keyword))) {
      return mapping.icon
    }
  }
  
  return FileText // Default
}

// Generate consistent color based on title
function getColorFromTitle(title: string): string {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  return GLOW_COLORS[Math.abs(hash) % GLOW_COLORS.length]
}

/**
 * Article cover with glow effect and topic icon
 */
export function ArticleCover({ title, size = 'thumbnail', className = '' }: ArticleCoverProps) {
  const isHero = size === 'hero'
  const glowColor = getColorFromTitle(title)
  const Icon = getIconForTitle(title)

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        background: '#0d1117',
        aspectRatio: isHero ? '1200/630' : '158/100',
        width: '100%',
        height: isHero ? '400px' : 'auto',
      }}
    >
      {/* Hexagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: isHero ? '60px 60px' : '20px 20px',
        }}
      />

      {/* Radial glow effect */}
      <div 
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isHero ? '400px' : '100px',
          height: isHero ? '400px' : '100px',
          background: `radial-gradient(circle, ${glowColor}40 0%, ${glowColor}20 25%, ${glowColor}08 50%, transparent 70%)`,
          filter: 'blur(15px)',
        }}
      />

      {/* Secondary glow for depth */}
      <div 
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isHero ? '250px' : '60px',
          height: isHero ? '250px' : '60px',
          background: `radial-gradient(circle, ${glowColor}50 0%, transparent 60%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
        {/* Topic icon from Lucide */}
        <Icon
          size={isHero ? 80 : 32}
          color={glowColor}
          strokeWidth={1.5}
          style={{
            opacity: 0.7,
            filter: `drop-shadow(0 0 ${isHero ? '12px' : '6px'} ${glowColor}80)`,
          }}
        />

        {/* Title - hero only */}
        {isHero && (
          <h3
            className="text-white text-center mt-8"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: title.length > 60 ? '28px' : title.length > 40 ? '32px' : '40px',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.022em',
              maxWidth: '800px',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {title}
          </h3>
        )}
      </div>
    </div>
  )
}
