import { Navigation } from "@/components/navigation"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Bernardo Trindade de Abreu",
  description: "Senior Full Stack Engineer specializing in React, Node.js, Python, AI, and Cloud technologies.",
  openGraph: {
    title: "About - Bernardo Trindade de Abreu",
    description: "Learn more about my background, experience, and what drives me as a software engineer",
    images: [
      {
        url: "/api/og?page=about",
        width: 1200,
        height: 630,
        alt: "About - Bernardo Trindade de Abreu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Bernardo Trindade de Abreu",
    description: "Learn more about my background, experience, and what drives me as a software engineer",
    images: ["/api/og?page=about"],
  },
}

export default function AboutPage() {
  return (
    <div className="root layout-root">
      {/* Header with back link and navigation */}
      <header className="mb-16 flex items-center justify-between gap-4">
        <Link 
          className="text-sm text-primary hover:opacity-70 transition-opacity no-underline" 
          href="/"
        >
          ← About
        </Link>
        <Navigation showShare />
      </header>

      <div className="article">
        <h1 className="mb-8 font-semibold text-primary">About</h1>

        <div className="mb-6">
          <a
            href="/Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 dark:bg-white/10 px-4 py-2 text-sm font-medium text-primary no-underline transition-colors hover:bg-gray-300 dark:hover:bg-white/20"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="space-y-6">
          <p className="text-secondary">
            I'm a software engineer with 6+ years of experience building scalable applications. I work with React, Next.js, Node.js, Python, GraphQL, and AWS—focusing on products that are fast, maintainable, and useful.
          </p>

          <p className="text-secondary">
            I've worked on production systems for <a href="https://www.nbcuniversal.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">NBCUniversal</a>, <a href="https://www.nationalgrid.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">National Grid</a>, <a href="https://www.cancerawarenesstrust.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">Cancer Awareness Trust</a>, <a href="https://www.philips.com/healthcare" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">Philips Healthcare</a>, <a href="https://www.trustly.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">Trustly</a>, <a href="https://www.ninjaone.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">NinjaOne</a>, the São Paulo Government, and several Brazilian companies—mostly in fintech, healthcare, and media.
          </p>

          <p className="text-secondary">
            I focus on full-stack development, system design, and integrating AI features with LLMs and RAG. I enjoy solving complex problems, modernizing legacy systems, and building things that work well. I value clean architecture, automation, and thoughtful engineering practices.
          </p>

          <h2 className="mt-12 text-primary">Experience</h2>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-primary">Senior Full Stack Engineer at <a href="https://ustwo.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">ustwo</a></p>
              <p className="text-sm text-tertiary mt-1">December 2023 - Present · London, UK</p>
              <p className="text-sm text-secondary mt-1">
                Building enterprise solutions with React, Next.js, Node.js, Python, and AWS infrastructure. 
                Working on AI-powered features with LangChain, OpenAI APIs, and AWS Bedrock.
              </p>
            </div>

            <div>
              <p className="font-medium text-primary">Software Engineer at NinjaOne</p>
              <p className="text-sm text-tertiary mt-1">May 2022 - November 2023 · Florida, US</p>
              <p className="text-sm text-secondary mt-1">
                Contributed to IT management platform features, including remote access, session management, 
                and security controls using React and WebSocket communication.
              </p>
            </div>

            <div>
              <p className="font-medium text-primary">Frontend Engineer at PrimeIT (Trustly)</p>
              <p className="text-sm text-tertiary mt-1">January 2022 - April 2022 · Lisbon, Portugal</p>
              <p className="text-sm text-secondary mt-1">
                Delivered GDPR compliance interface using React, Material UI, and GraphQL for open banking 
                payment solutions.
              </p>
            </div>
          </div>

          <h2 className="mt-12 text-primary">Technical Skills</h2>
          
          <div className="space-y-2">
            <p className="text-sm text-secondary">
              <span className="font-medium text-primary">Frontend:</span> React, Next.js, React Native, AngularJS, TypeScript, 
              Styled Components, Storybook
            </p>
            <p className="text-sm text-secondary">
              <span className="font-medium text-primary">Backend:</span> Node.js, Python (FastAPI), .NET, Java (Spring Boot), 
              NestJS, GraphQL, REST APIs
            </p>
            <p className="text-sm text-secondary">
              <span className="font-medium text-primary">AI & Data:</span> LangChain, OpenAI APIs, AWS Bedrock, RAG, PostgreSQL, 
              MongoDB, Prisma
            </p>
            <p className="text-sm text-secondary">
              <span className="font-medium text-primary">Cloud & DevOps:</span> AWS (ECS, Lambda, Cognito, Amplify), Terraform, 
              Docker, GitHub Actions, CI/CD
            </p>
            <p className="text-sm text-secondary">
              <span className="font-medium text-primary">Testing:</span> Jest, Vitest, Cypress, Playwright, React Testing Library
            </p>
          </div>

          <h2 className="mt-12 text-primary">Education</h2>
          
          <div className="space-y-2">
            <div>
              <p className="font-medium text-primary">Bachelor's Degree in Computer Science</p>
              <p className="text-sm text-tertiary mt-1">Universidade Feevale · 2014 - 2023</p>
            </div>
          </div>

          <h2 className="mt-12 text-primary">Connect</h2>
          
          <div className="space-y-2">
            <p className="text-secondary">
              <a 
                href="https://x.com/btrindadeabreu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:opacity-70 transition-opacity"
              >
                X (Twitter)
              </a>
              {" · "}
              <a 
                href="https://github.com/berTrindade" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:opacity-70 transition-opacity"
              >
                GitHub
              </a>
              {" · "}
              <a 
                href="mailto:btrindadedeabreu@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:opacity-70 transition-opacity"
              >
                Email
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
