'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-zinc-50 via-white to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border bg-white px-4 py-1.5 text-sm font-medium shadow-sm dark:bg-zinc-900">
            <span className="mr-2">⚡</span>
            <span>Open source CRUD components for Next.js</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
            Build CRUD Applications at{' '}
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-400">
              Lightning Speed
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
            A shadcn-based component registry for Next.js. Copy, paste, and
            customize. Built with TypeScript, Tailwind CSS, and best practices.{' '}
            <strong>You own the code.</strong>
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-50"
            >
              Get Started
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/examples"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 bg-white px-8 text-base font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              View Examples
            </Link>
          </div>

          {/* Quick Install */}
          <div className="mt-12">
            <div className="inline-flex items-start rounded-lg border bg-zinc-50 p-4 font-mono text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <span className="select-none text-zinc-500">$ </span>
              <span className="ml-2 text-zinc-900 dark:text-zinc-50">
                npx shadcn add https://crudkit.dev/r/crudkit
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    'npx shadcn add https://crudkit.dev/r/crudkit'
                  )
                }}
                className="ml-4 rounded p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                aria-label="Copy to clipboard"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-zinc-200 to-zinc-400 opacity-20 dark:from-zinc-700 dark:to-zinc-900"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  )
}
