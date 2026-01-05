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
    // Inline code (not in pre block)
    if (!props.className) {
      return <code {...props} />
    }
    // Mermaid diagrams
    if (props.className === 'language-mermaid') {
      // Extract the actual chart text from children
      const chartText = typeof props.children === 'string' 
        ? props.children 
        : String(props.children)
      return <Mermaid chart={chartText} />
    }
    return <code {...props} />
  },
  pre: (props: any) => {
    // Check if this is a mermaid code block
    const child = props.children
    
    // Check direct child
    if (child && child.props && child.props.className === 'language-mermaid') {
      const chartText = typeof child.props.children === 'string'
        ? child.props.children
        : String(child.props.children)
      return <Mermaid chart={chartText} />
    }
    
    // Check if Shiki wrapped it but left mermaid untouched
    if (props.className?.includes('mermaid') || 
        props['data-language'] === 'mermaid' ||
        (typeof child === 'object' && child?.props?.['data-language'] === 'mermaid')) {
      const code = typeof child === 'string' ? child : child?.props?.children || ''
      return <Mermaid chart={String(code)} />
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
                      preprocess(code, options) {
                        // Don't process mermaid blocks at all
                        if (options.lang === 'mermaid') {
                          return undefined
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
