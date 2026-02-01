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
          className="group flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-300 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform" 
          href="/"
          aria-label="Home"
        >
          <svg 
            aria-label="Arrow back icon" 
            className="size-[18px] stroke-gray-1000 transition-colors duration-300 ease-out group-hover:stroke-gray-1200 dark:stroke-gray-1000 dark:group-hover:stroke-gray-1200" 
            fill="none" 
            height="24" 
            role="graphics-symbol" 
            viewBox="0 0 24 24" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2.25"
          >
            <path d="M19 12H5m6-6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Navigation showShare />
      </header>

      <div className="article">
        <h1 className="mb-8 font-semibold text-white">About</h1>

        <div className="mb-6">
          <a
            href="/Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-white/20"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="space-y-6">
          <p className="text-white">
            I'm a Senior Full Stack Engineer with a Computer Science degree from Universidade Feevale. 
            I currently work at ustwo, where I focus on developing scalable, secure applications that provide 
            exceptional user experiences, integrating AI-driven features and modern cloud technologies.
          </p>

          <p className="text-white">
            My work involves building full-stack solutions with React, Next.js, Node.js, Python (FastAPI), 
            and .NET, while deploying and maintaining systems on AWS using Terraform and Docker. I'm passionate 
            about exploring innovative technologies like AI, LLMs, RAG techniques, and DevOps practices to 
            drive impactful solutions.
          </p>

          <p className="text-white">
            Previously, I've worked at NinjaOne, PrimeIT (Trustly), Aurum Software, and Meta, contributing 
            to enterprise platforms, healthcare systems, fintech solutions, and legal technology modernization.
          </p>

          <h2 className="mt-12 text-white">Experience</h2>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white">Senior Full Stack Engineer at ustwo</p>
              <p className="text-sm text-white opacity-70 mt-1">December 2023 - Present · London, UK</p>
              <p className="text-sm text-white opacity-70 mt-1">
                Building enterprise solutions with React, Next.js, Node.js, Python, and AWS infrastructure. 
                Working on AI-powered features with LangChain, OpenAI APIs, and AWS Bedrock.
              </p>
            </div>

            <div>
              <p className="font-medium text-white">Software Engineer at NinjaOne</p>
              <p className="text-sm text-white opacity-70 mt-1">May 2022 - November 2023 · Florida, US</p>
              <p className="text-sm text-white opacity-70 mt-1">
                Contributed to IT management platform features, including remote access, session management, 
                and security controls using React and WebSocket communication.
              </p>
            </div>

            <div>
              <p className="font-medium text-white">Frontend Engineer at PrimeIT (Trustly)</p>
              <p className="text-sm text-white opacity-70 mt-1">January 2022 - April 2022 · Lisbon, Portugal</p>
              <p className="text-sm text-white opacity-70 mt-1">
                Delivered GDPR compliance interface using React, Material UI, and GraphQL for open banking 
                payment solutions.
              </p>
            </div>
          </div>

          <h2 className="mt-12 text-white">Technical Skills</h2>
          
          <div className="space-y-2">
            <p className="text-sm text-white">
              <span className="font-medium">Frontend:</span> React, Next.js, React Native, AngularJS, TypeScript, 
              Styled Components, Storybook
            </p>
            <p className="text-sm text-white">
              <span className="font-medium">Backend:</span> Node.js, Python (FastAPI), .NET, Java (Spring Boot), 
              NestJS, GraphQL, REST APIs
            </p>
            <p className="text-sm text-white">
              <span className="font-medium">AI & Data:</span> LangChain, OpenAI APIs, AWS Bedrock, RAG, PostgreSQL, 
              MongoDB, Prisma
            </p>
            <p className="text-sm text-white">
              <span className="font-medium">Cloud & DevOps:</span> AWS (ECS, Lambda, Cognito, Amplify), Terraform, 
              Docker, GitHub Actions, CI/CD
            </p>
            <p className="text-sm text-white">
              <span className="font-medium">Testing:</span> Jest, Vitest, Cypress, Playwright, React Testing Library
            </p>
          </div>

          <h2 className="mt-12 text-white">Education</h2>
          
          <div className="space-y-2">
            <div>
              <p className="font-medium text-white">Bachelor's Degree in Computer Science</p>
              <p className="text-sm text-white opacity-70 mt-1">Universidade Feevale · 2014 - 2023</p>
            </div>
          </div>

          <h2 className="mt-12 text-white">Connect</h2>
          
          <div className="space-y-2">
            <p className="text-white">
              <a 
                href="https://x.com/btrindadeabreu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
              >
                X (Twitter)
              </a>
              {" · "}
              <a 
                href="https://github.com/berTrindade" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
              >
                GitHub
              </a>
              {" · "}
              <a 
                href="mailto:btrindadedeabreu@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
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
