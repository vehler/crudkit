import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteLayout } from '@/components/layout/site-layout'

export const metadata: Metadata = {
  title: 'Documentation - CRUDKit',
  description: 'Learn how to build CRUD applications with CRUDKit',
}

export default function DocsPage() {
  return (
    <SiteLayout>
      <div className="bg-white dark:bg-zinc-900">
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
                Guides
              </h2>
              <div className="space-y-3">
                <Link
                  href="/docs/guides/data-providers"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Data Providers
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Connect CRUDKit to your backend API, database, or data source
                  </div>
                </Link>
                <Link
                  href="/docs/guides/schemas"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Schema Definition
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Define your data structure to auto-generate forms and tables
                  </div>
                </Link>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Components
              </h2>
              <div className="space-y-3">
                <Link
                  href="/docs/components/crud"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Main wrapper component that provides context and state management
                  </div>
                </Link>
                <Link
                  href="/docs/components/toolbar"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud.Toolbar
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Action bar with create and refresh buttons
                  </div>
                </Link>
                <Link
                  href="/docs/components/filters"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud.Filters
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Dynamic filtering interface based on schema
                  </div>
                </Link>
                <Link
                  href="/docs/components/list"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud.List
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Data table with search, sorting, pagination, and actions
                  </div>
                </Link>
                <Link
                  href="/docs/components/form"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud.Form
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Dynamic forms for creating and editing records
                  </div>
                </Link>
                <Link
                  href="/docs/components/view"
                  className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    Crud.View
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Read-only detail view for displaying records
                  </div>
                </Link>
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
              {/* GitHub link temporarily hidden - private repo */}
              {/* <a
                href="https://github.com/vehler/crudkit/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                GitHub Issues
              </a> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </SiteLayout>
  )
}
