---
title: "Modern Web Performance: Beyond the Basics"
date: "2024-01-15"
excerpt: "Exploring advanced techniques for optimizing web applications in 2024, from edge computing to selective hydration."
author: "Bernardo Trindade de Abreu"
category: "Engineering"
image: "/images/blog/performance.jpg"
---

# Modern Web Performance: Beyond the Basics

Web performance has evolved significantly over the past few years. While we've mastered the fundamentals—code splitting, lazy loading, and image optimization—modern applications demand more sophisticated approaches.

## The Edge Computing Revolution

Edge computing has transformed how we think about latency<Footnote id="fn-1">Latency is the time delay between a user's action and the web application's response. Every 100ms of latency can reduce conversion rates by up to 7% according to studies by Akamai.</Footnote>. By moving computation closer to users, we can dramatically reduce the time it takes for data to travel across the internet.

Platforms like Vercel Edge Functions and Cloudflare Workers<Footnote id="fn-2">Cloudflare Workers run on Cloudflare's edge network which spans over 275 cities in more than 100 countries, ensuring your code runs close to your users regardless of their location.</Footnote> allow us to run server-side logic at the edge. This means a user in Tokyo and a user in London can both experience sub-100ms response times.

```typescript
// Example: Edge function for personalized content
export const config = { runtime: 'edge' }
export default async function handler(req: Request) {
  const country = req.headers.get('x-vercel-ip-country')
  const content = await getLocalizedContent(country)
  return new Response(JSON.stringify(content), {
    headers: { 'content-type': 'application/json' },
  })
}
```

## Selective Hydration

React Server Components<Footnote id="fn-3">RSC is a new paradigm introduced by the React team that allows components to render on the server without sending their code to the client. This significantly reduces JavaScript bundle sizes.</Footnote> have introduced a new paradigm where not all components need to be interactive. This selective approach to hydration can reduce JavaScript bundle sizes by 30-50% in typical applications.

The key insight is simple: most of your page content doesn't need to be interactive<Footnote id="fn-4">Studies show that on average, only 20-30% of components on a typical web page actually require client-side interactivity. The rest are purely presentational and can be rendered on the server.</Footnote>. Blog posts, product descriptions, and static headers can all be rendered on the server and sent as HTML.

## Performance Budgets in Practice

Setting performance budgets<Footnote id="fn-5">A performance budget is a limit that you set for key performance metrics. Common budgets include: Total bundle size < 200KB, Time to Interactive < 3s on 3G, Lighthouse Performance Score > 90.</Footnote> isn't just about setting numbers—it's about enforcement. Modern tools like Lighthouse CI and bundle analyzers can fail your CI/CD pipeline if budgets are exceeded.

```json
{
  "budgets": [
    {
      "path": "/*",
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "first-contentful-paint", "budget": 1000 }
      ],
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 },
        { "resourceType": "total", "budget": 500 }
      ]
    }
  ]
}
```

## The Future: Speculation Rules API

The Speculation Rules API<Footnote id="fn-6">This new API allows developers to tell the browser which pages a user is likely to navigate to next, enabling intelligent prefetching and prerendering. It's currently supported in Chromium-based browsers.</Footnote> represents the next frontier in performance optimization. By intelligently prefetching and prerendering pages before users even click, we can create near-instant navigation experiences.

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "where": {
        "href_matches": "/articles/*"
      }
    }
  ]
}
</script>
```

## Conclusion

Modern web performance is about making smart trade-offs. Edge computing, selective hydration, and proactive prefetching all contribute to faster experiences. But remember: the fastest request is the one you never make<Footnote id="fn-7">This principle, popularized by the HTTP Archive, reminds us that aggressive caching strategies and efficient data fetching patterns are often more impactful than optimizing the speed of individual requests.</Footnote>.

The web platform continues to evolve, giving us better tools every year. Stay curious, measure everything, and always prioritize your users' experience.
