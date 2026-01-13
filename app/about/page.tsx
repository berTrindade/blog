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
      {/* Bernardo's header style with navigation */}
      <header className="mb-32 flex items-start justify-between">
        {/* <div className="flex flex-col items-start">
          <Link className="text-medium inline-block font-medium no-underline dark:text-white" href="/">
            Bernardo Trindade de Abreu
          </Link>
          <span className="text-medium font-medium leading-none text-gray-1100">Senior Full Stack Engineer</span>
        </div> */}
        <Navigation />
      </header>

      <div className="article">
        <h1 className="mb-8 font-semibold dark:text-white">About</h1>

        <div className="mb-6">
          <a
            href="/Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-gray-300 dark:bg-gray-300 px-4 py-2 text-sm font-medium text-black dark:text-white no-underline transition-colors hover:bg-gray-400 dark:hover:bg-gray-400"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="space-y-6">
          <p>
            I'm a Senior Full Stack Engineer with a Computer Science degree from Universidade Feevale. 
            I currently work at ustwo, where I focus on developing scalable, secure applications that provide 
            exceptional user experiences, integrating AI-driven features and modern cloud technologies.
          </p>

          <p>
            My work involves building full-stack solutions with React, Next.js, Node.js, Python (FastAPI), 
            and .NET, while deploying and maintaining systems on AWS using Terraform and Docker. I'm passionate 
            about exploring innovative technologies like AI, LLMs, RAG techniques, and DevOps practices to 
            drive impactful solutions.
          </p>

          <p>
            Previously, I've worked at NinjaOne, PrimeIT (Trustly), Aurum Software, and Meta, contributing 
            to enterprise platforms, healthcare systems, fintech solutions, and legal technology modernization.
          </p>

          <h2 className="mt-12">Experience</h2>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium">Senior Full Stack Engineer at ustwo</p>
              <p className="text-sm text-gray-1000 mt-1">December 2023 - Present · London, UK</p>
              <p className="text-sm text-gray-1000 mt-1">
                Building enterprise solutions with React, Next.js, Node.js, Python, and AWS infrastructure. 
                Working on AI-powered features with LangChain, OpenAI APIs, and AWS Bedrock.
              </p>
            </div>

            <div>
              <p className="font-medium">Software Engineer at NinjaOne</p>
              <p className="text-sm text-gray-1000 mt-1">May 2022 - November 2023 · Florida, US</p>
              <p className="text-sm text-gray-1000 mt-1">
                Contributed to IT management platform features, including remote access, session management, 
                and security controls using React and WebSocket communication.
              </p>
            </div>

            <div>
              <p className="font-medium">Frontend Engineer at PrimeIT (Trustly)</p>
              <p className="text-sm text-gray-1000 mt-1">January 2022 - April 2022 · Lisbon, Portugal</p>
              <p className="text-sm text-gray-1000 mt-1">
                Delivered GDPR compliance interface using React, Material UI, and GraphQL for open banking 
                payment solutions.
              </p>
            </div>
          </div>

          <h2 className="mt-12">Technical Skills</h2>
          
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Frontend:</span> React, Next.js, React Native, AngularJS, TypeScript, 
              Styled Components, Storybook
            </p>
            <p className="text-sm">
              <span className="font-medium">Backend:</span> Node.js, Python (FastAPI), .NET, Java (Spring Boot), 
              NestJS, GraphQL, REST APIs
            </p>
            <p className="text-sm">
              <span className="font-medium">AI & Data:</span> LangChain, OpenAI APIs, AWS Bedrock, RAG, PostgreSQL, 
              MongoDB, Prisma
            </p>
            <p className="text-sm">
              <span className="font-medium">Cloud & DevOps:</span> AWS (ECS, Lambda, Cognito, Amplify), Terraform, 
              Docker, GitHub Actions, CI/CD
            </p>
            <p className="text-sm">
              <span className="font-medium">Testing:</span> Jest, Vitest, Cypress, Playwright, React Testing Library
            </p>
          </div>

          <h2 className="mt-12">Education</h2>
          
          <div className="space-y-2">
            <div>
              <p className="font-medium">Bachelor's Degree in Computer Science</p>
              <p className="text-sm text-gray-1000 mt-1">Universidade Feevale · 2014 - 2023</p>
            </div>
          </div>

          <h2 className="mt-12">Connect</h2>
          
          <div className="space-y-2">
            <p>
              <a 
                href="https://x.com/btrindadeabreu" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                X (Twitter)
              </a>
              {" · "}
              <a 
                href="https://github.com/berTrindade" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {" · "}
              <a 
                href="mailto:btrindadedeabreu@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
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
