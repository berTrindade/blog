"use client"

interface HeadingProps {
  id?: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

export function Heading({ id, level, children }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  // For H2, make it clickable
  if (level === 2 && id) {
    return (
      <a 
        href={`#${id}`}
        className="block no-underline"
      >
        <Tag 
          className="font-[550] text-gray-1200 dark:text-white cursor-pointer transition-colors duration-200 ease-out hover:text-gray-1200 dark:hover:text-white" 
          id={id}
        >
          {children}
        </Tag>
      </a>
    )
  }

  return (
    <Tag 
      id={id} 
      className="font-[550] text-gray-1200 dark:text-white"
    >
      {children}
    </Tag>
  )
}
