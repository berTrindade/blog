import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import rehypeShiki from '@shikijs/rehype'
import remarkGfm from "remark-gfm"
import { Mermaid } from "@/components/mermaid"
import { Heading } from "@/components/heading"
import { CodeBlock } from "@/components/code-block"
import { Video } from "@/components/video"
import { Footnote } from "@/components/footnote"
import { 
  XSSDemo, 
  TokenStorageDemo, 
  AuthDemo, 
  SecretsDemo, 
  DependenciesDemo, 
  OWASPDemo,
  XSSDemoSandpack,
  TokenStorageDemoSandpack
} from "@/components/security"
import {
  SquashAndStretchDemo,
  AnticipationDemo,
  TimingDemo,
  GestureDemo,
  LayoutAnimationDemo
} from "@/components/motion-demos"
import {
  CodeMorphDemo,
  InlineCodeMorphDemo,
  HighlightMorphDemo
} from "@/components/code-morph"
import { CodeMorphDemoV2 } from "@/components/code-morph-v2"
import { ClipPathButtonDemo } from "@/components/clip-path-button"

interface MDXContentProps {
  source: string
}

const components = {
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  p: (props: any) => <p className="mb-[26px] opacity-[0.9]" {...props} />,
  a: (props: any) => <a className="underline inline-block min-h-[24px] py-1" {...props} />,
  code: (props: any) => {
    // Helper to extract text from React elements recursively
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node
      if (typeof node === 'number') return String(node)
      if (!node) return ''
      if (Array.isArray(node)) return node.map(extractText).join('')
      if (typeof node === 'object' && node.props?.children) {
        return extractText(node.props.children)
      }
      return ''
    }
    
    // Inline code (not in pre block)
    if (!props.className) {
      return <code {...props} />
    }
    // Mermaid diagrams
    if (props.className === 'language-mermaid') {
      const chartText = extractText(props.children)
      return <Mermaid chart={chartText} />
    }
    return <code {...props} />
  },
  pre: (props: any) => {
    // Helper to extract text from React elements recursively
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node
      if (typeof node === 'number') return String(node)
      if (!node) return ''
      if (Array.isArray(node)) return node.map(extractText).join('')
      if (typeof node === 'object' && node.props?.children) {
        return extractText(node.props.children)
      }
      return ''
    }
    
    // Check if this is a mermaid code block
    const child = props.children
    
    // Check direct child
    if (child && child.props && child.props.className === 'language-mermaid') {
      const chartText = extractText(child.props.children)
      return <Mermaid chart={chartText} />
    }
    
    // Check if Shiki wrapped it but left mermaid untouched
    if (props.className?.includes('mermaid') || 
        props['data-language'] === 'mermaid' ||
        (typeof child === 'object' && child?.props?.['data-language'] === 'mermaid')) {
      const chartText = extractText(child)
      return <Mermaid chart={chartText} />
    }
    
    return <CodeBlock {...props} />
  },
  Video: (props: any) => <Video {...props} />,
  XSSDemo,
  TokenStorageDemo,
  AuthDemo,
  SecretsDemo,
  DependenciesDemo,
  OWASPDemo,
  XSSDemoSandpack,
  TokenStorageDemoSandpack,
  SquashAndStretchDemo,
  AnticipationDemo,
  TimingDemo,
  GestureDemo,
  LayoutAnimationDemo,
  CodeMorphDemo,
  CodeMorphDemoV2,
  InlineCodeMorphDemo,
  HighlightMorphDemo,
  ClipPathButtonDemo,
  Footnote,
}

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <article className="max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              [remarkGfm, {
                footnoteLabel: 'Footnotes',
                footnoteBackLabel: (referenceIndex: number) => `Back to reference ${referenceIndex}`
              }]
            ],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeShiki as any,
                {
                  themes: {
                    light: 'github-light',
                    dark: 'github-dark',
                  },
                  defaultColor: false,
                  transformers: [
                    {
                      name: 'mermaid-skip',
                      preprocess(code: string, options: { lang?: string }) {
                        // Don't process mermaid blocks at all
                        if (options.lang === 'mermaid') {
                          return undefined
                        }
                      }
                    },
                    {
                      name: 'trim-trailing-newline',
                      preprocess(code: string) {
                        // Fix: Remove trailing newline added by markdown-it
                        // See: https://github.com/shikijs/shiki/pull/585
                        return code.trimEnd()
                      }
                    },
                    {
                      name: 'add-language-attribute',
                      pre(node: { properties: Record<string, unknown> }) {
                        // Add data-language attribute to pre element
                        // @ts-expect-error - this.options exists at runtime
                        const lang = this.options?.lang
                        if (lang) {
                          node.properties['data-language'] = lang
                        }
                      }
                    }
                  ]
                }
              ],
            ],
          },
        }}
      />
    </article>
  )
}
