---
title: Web Performance Optimization Techniques
date: 2025-04-05
category: Engineering
excerpt: Optimize web apps for maximum performance.
image: https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop
---

Performance is a feature. Learn how to make your web applications blazingly fast.

## Core Web Vitals

Focus on the metrics that matter:

- **LCP (Largest Contentful Paint)**: Should be < 2.5s
- **FID (First Input Delay)**: Should be < 100ms
- **CLS (Cumulative Layout Shift)**: Should be < 0.1

## Image Optimization

Images are often the largest assets:

```tsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={800}
  height={600}
  alt="Description"
  loading="lazy"
  placeholder="blur"
/>
```

## Code Splitting

Split your code to reduce initial bundle size:

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## Caching Strategies

Implement effective caching:

```typescript
// API Route with cache headers
export async function GET() {
  return new Response(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600'
    }
  });
}
```

## Bundle Analysis

Regularly analyze your bundle:

```bash
npx @next/bundle-analyzer
```

## Lazy Loading

Load resources only when needed:

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadResource();
    }
  });
});
```

Performance optimization is an ongoing process. Measure, optimize, and repeat.