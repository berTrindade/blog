'use client'

interface FootnoteProps {
  id: string
  children: React.ReactNode
}

export function Footnote({ id, children }: FootnoteProps) {
  return (
    <>
      <sup className="footnote-ref">
        <a href={`#${id}`} id={`${id}-ref`} className="footnote-link">
          {id.replace('fn-', '')}
        </a>
      </sup>
      <span className="sidenote" id={id}>
        <span className="sidenote-number">{id.replace('fn-', '')}</span>
        {children}
      </span>
    </>
  )
}
