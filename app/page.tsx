import Link from "next/link"
import Image from "next/image"
import { ArticleCover } from "@/components/article-cover"
import { getAllFilms, getAllBooks, getAllMusic } from "@/lib/media-utils"
import { getAllBlogPosts, type BlogPost } from "@/lib/blog-utils"
import { Navigation } from "@/components/navigation"
import { Newsletter } from "@/components/newsletter"

export default async function HomePage() {
  // Fetch all data in parallel on the server
  const [posts, films, books, music] = await Promise.all([
    getAllBlogPosts(),
    Promise.resolve(getAllFilms()),
    Promise.resolve(getAllBooks()),
    Promise.resolve(getAllMusic()),
  ])

  return (
    <div className="root layout-root">
      {/* Navigation header */}
      <header className="mb-8 flex items-start justify-end">
        <Navigation />
      </header>

      <main>
        {/* Introduction section */}
        <section className="mb-32">
          <p className="text-2xl font-medium leading-relaxed text-primary mb-6">
            I'm Bernardo,
          </p>
          <p className="text-base leading-relaxed text-secondary">
            I'm a husband and a software engineer from southern Brazil, now living in Portugal.
            I work at <strong><a href="https://ustwo.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-70 transition-opacity no-underline">ustwo</a></strong>, where I get to build things that matter.
            When I'm not coding, I love spending time with my family, watching films, reading books, finding new music, or traveling.
          </p>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            I write about engineering topics, thoughts, and whatever else I'm exploring.
            Feel free to reach out if you want to chat.{" "}
            <a
              href="https://cal.com/bertrindade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-white/10 text-primary font-medium text-sm transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-white/20 no-underline"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
              </svg>
              Let's talk
            </a>
          </p>
        </section>

        {/* Films section */}
        <section className="mb-32">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium leading-none text-primary">Movies</h2>
            <Link
              href="/movies"
              className="text-sm text-primary hover:opacity-70 transition-opacity"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {films.slice(0, 4).map((film) => (
              <a
                key={film.id}
                href={film.letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2"
              >
                <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm dark:border dark:border-gray-600 transition-transform hover:scale-105 cursor-pointer">
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="truncate font-medium text-sm text-primary">
                    {film.title}
                  </span>
                  <span className="text-xs text-tertiary">
                    {film.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Books section */}
        <section className="mb-32">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium leading-none text-primary">Books</h2>
            <Link
              href="/books"
              className="text-sm text-primary hover:opacity-70 transition-opacity"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {books.slice(0, 4).map((book) => (
              <Link
                key={book.id}
                href="/books"
                className="group flex flex-col gap-2"
              >
                <div className="relative aspect-2/3 w-full overflow-hidden rounded-md shadow-md transition-transform hover:scale-[1.03]">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm leading-tight text-primary line-clamp-2">
                    {book.title}
                  </span>
                  <span className="text-sm text-tertiary">
                    {book.author}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Music section */}
        <section className="mb-32">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium leading-none text-primary">Music</h2>
            <Link
              href="/music"
              className="text-sm text-primary hover:opacity-70 transition-opacity"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {music.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href={item.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm dark:border dark:border-gray-600 transition-transform hover:scale-105 cursor-pointer">
                  <Image
                    src={item.image}
                    alt={`${item.title} by ${item.artist}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="truncate font-medium text-sm text-primary">
                    {item.title}
                  </span>
                  <span className="text-xs text-tertiary">
                    {item.artist} · {item.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Writing section */}
        <section className="mb-32">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium leading-none text-primary">Writing</h2>
            <Link href="/writing" className="text-sm text-primary hover:opacity-70 transition-opacity">
              View all →
            </Link>
          </div>

          <div className="space-y-2">
            {posts.slice(0, 4).map(post => (
              <ArticleListItem key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Newsletter section */}
        <section className="mb-32">
          <Newsletter />
        </section>
      </main>
    </div>
  )
}

function ArticleListItem({ post }: Readonly<{ post: BlogPost }>) {
  // Calculate reading time
  const wordCount = post.meta.excerpt.split(/\s+/).length * 10 // Rough estimate based on excerpt
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Shorten excerpt to first 80 characters
  const shortExcerpt = post.meta.excerpt.length > 80
    ? post.meta.excerpt.substring(0, 80).trim() + '...'
    : post.meta.excerpt

  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group -mx-3 flex items-center gap-4 rounded-xl py-3 pr-4 pl-3 no-underline hover:bg-gray-200 dark:hover:bg-gray-300"
    >
      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-black/6 dark:border-white/5">
        <ArticleCover title={post.meta.title} tags={post.meta.tags} size="thumbnail" />
      </div>
      <div className="flex h-20 w-full min-w-0 flex-col items-start justify-center gap-0.5">
        <span className="w-full truncate font-medium text-primary">
          {post.meta.title}
        </span>
        <p className="text-sm text-secondary line-clamp-1 mb-0.5">
          {shortExcerpt}
        </p>
        <span className="shrink-0 whitespace-nowrap text-sm text-tertiary">
          {new Date(post.meta.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          })} · {readingTime} min read
        </span>
      </div>
    </Link>
  )
}
