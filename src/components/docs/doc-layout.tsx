import Link from 'next/link'
import { SiteLayout } from '@/components/layout/site-layout'

interface DocLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function DocLayout({ children, title, description }: DocLayoutProps) {
  return (
    <SiteLayout>
      <div className="bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                Documentation
              </Link>
              <span>/</span>
              <span className="text-zinc-900 dark:text-zinc-50">{title}</span>
            </nav>

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
              </h1>
              {description && (
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              {children}
            </div>

            {/* Navigation Footer */}
            <div className="mt-16 flex items-center justify-between border-t pt-8 dark:border-zinc-800">
              <Link
                href="/docs"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                ← Back to Documentation
              </Link>
              <Link
                href="/examples"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                View Examples →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
