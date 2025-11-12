import { SiteLayout } from '@/components/layout/site-layout'
import { DocsSidebar } from './docs-sidebar'
import { CopyMarkdownButton } from './copy-markdown-button'
import { MarkdownContent } from './markdown-content'

interface MarkdownDocsLayoutProps {
  title: string
  description?: string
  markdown: string
}

export function MarkdownDocsLayout({
  title,
  description,
  markdown,
}: MarkdownDocsLayoutProps) {
  return (
    <SiteLayout>
      <div className="bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Sidebar */}
            <DocsSidebar />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header with Copy Button */}
              <div className="mb-12 flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {title}
                  </h1>
                  {description && (
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                      {description}
                    </p>
                  )}
                </div>
                <CopyMarkdownButton markdown={markdown} />
              </div>

              {/* Markdown Content */}
              <div className="prose max-w-none">
                <MarkdownContent content={markdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
