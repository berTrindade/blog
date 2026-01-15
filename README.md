# Personal Blog

A modern personal blog built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

- 📝 MDX-powered blog posts
- 🎨 Dark mode support
- 📊 Mermaid diagram support
- 🔍 SEO optimized with Open Graph tags
- ♿ Accessibility focused (WCAG AA compliant)
- 📱 Fully responsive design

## Tech Stack

- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS 4
- **Content**: MDX with syntax highlighting (Shiki)
- **Analytics**: Vercel Analytics
- **Animations**: Motion

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SITE_URL` | Production site URL (e.g., `https://btrinda.de`) | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for RSS feed | Yes |
| `RESEND_API_KEY` | Resend API key for newsletter | Yes |
| `RESEND_AUDIENCE_ID` | Resend audience ID | Yes |
| `RESEND_FROM_EMAIL` | Sender email address | No |
| `NEWSLETTER_ADMIN_KEY` | Admin key for broadcast endpoint | Yes |

## License

All rights reserved © 2026 Bernardo Trindade de Abreu
