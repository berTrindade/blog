/**
 * OG Image Generation Utilities
 * Based on: https://vercel.com/docs/og-image-generation
 */

// Define supported page types
export type PageType = 'homepage' | 'blog' | 'blogArticle' | 'about' | 'projects' | 'work' | 'writing'

export interface OgImageParams {
  type?: PageType
  title: string
  subtitle?: string
  image?: string // filename relative to public folder (e.g., "images/blog/photo.jpg")
}

/**
 * Generates a URL for dynamic OG image generation
 * @param params - Configuration for the OG image
 * @returns Complete URL for the OG image endpoint
 */
export function getOgImageUrl({
  type = 'homepage',
  title,
  subtitle,
  image,
}: OgImageParams): string {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

  const params = new URLSearchParams({
    type,
    title: title.trim(),
  })

  if (subtitle?.trim()) {
    params.append('subtitle', subtitle.trim())
  }

  if (image?.trim()) {
    // Remove leading slash if present
    const cleanImage = image.startsWith('/') ? image.slice(1) : image
    params.append('image', cleanImage)
  }

  return `${baseUrl}/api/og?${params.toString()}`
}

/**
 * Utility to truncate text for better OG image display
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate metadata object with OG image for Next.js generateMetadata
 */
export function generateOgMetadata({
  title,
  description,
  ogImageParams,
}: {
  title: string
  description: string
  ogImageParams: OgImageParams
}) {
  const ogImageUrl = getOgImageUrl(ogImageParams)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [ogImageUrl],
    },
  }
}
