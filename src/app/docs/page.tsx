import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - CRUDKit',
  description: 'Learn how to build CRUD applications with CRUDKit',
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              CRUDKit
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Docs
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Examples
            </Link>
            <a
              href="https://github.com/vehler/crudkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Documentation
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need to build powerful CRUD applications with
              CRUDKit.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            <Link
              href="/docs/installation"
              className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Installation
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Get started with CRUDKit in your Next.js project
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Read more
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </div>
            </Link>

            <Link
              href="/docs/quick-start"
              className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Quick Start
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Build your first CRUD table in 5 minutes
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Read more
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </div>
            </Link>
          </div>

          {/* Documentation Sections */}
          <div className="space-y-12">
            <section>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Getting Started
              </h2>
              <div className="space-y-3">
                <Link
                  href="/docs/introduction"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Introduction
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    What is CRUDKit and why use it
                  </div>
                </Link>
                <Link
                  href="/docs/installation"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Installation
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    How to install CRUDKit in your project
                  </div>
                </Link>
                <Link
                  href="/docs/quick-start"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Quick Start
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Build your first CRUD application
                  </div>
                </Link>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Core Concepts
              </h2>
              <div className="space-y-3">
                <div className="block rounded-lg border p-4 opacity-60 dark:border-zinc-800">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Data Provider
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Understanding the data provider interface
                    <span className="ml-2 text-xs text-zinc-500">Coming Soon</span>
                  </div>
                </div>
                <div className="block rounded-lg border p-4 opacity-60 dark:border-zinc-800">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Schema Definition
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Defining your data schema
                    <span className="ml-2 text-xs text-zinc-500">Coming Soon</span>
                  </div>
                </div>
                <div className="block rounded-lg border p-4 opacity-60 dark:border-zinc-800">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    URL State Management
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Managing state in the URL with nuqs
                    <span className="ml-2 text-xs text-zinc-500">Coming Soon</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Components
              </h2>
              <div className="space-y-3">
                <div className="block rounded-lg border p-4 opacity-60 dark:border-zinc-800">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Main wrapper component
                    <span className="ml-2 text-xs text-zinc-500">Coming Soon</span>
                  </div>
                </div>
                <div className="block rounded-lg border p-4 opacity-60 dark:border-zinc-800">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud.List
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Data table component
                    <span className="ml-2 text-xs text-zinc-500">Coming Soon</span>
                  </div>
                </div>
                <div className="block rounded-lg border p-4 opacity-60 dark:border-zinc-800">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud.Form
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Create and edit forms
                    <span className="ml-2 text-xs text-zinc-500">Coming Soon</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-lg border bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Need help?
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Check out our examples or open an issue on GitHub
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/examples"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                View Examples
              </Link>
              <a
                href="https://github.com/vehler/crudkit/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                GitHub Issues
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
