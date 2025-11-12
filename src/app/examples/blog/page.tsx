'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/code/code-block'
import { getSiteUrl } from '@/lib/install-command'

export default function BlogPage() {
  const siteUrl = getSiteUrl()
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
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
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Docs
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Examples
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link
              href="/examples"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to Examples
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Blog CMS
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Content management with draft/publish states and organization
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Installation */}
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Installation
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Install the CRUDKit blog CMS example using the CLI
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`npx shadcn add ${siteUrl}/r/crudkit-example-blog`}
              language="bash"
              title="CLI"
            />
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            This will install all required files including the page component, blog post schema, and 15+ sample articles with various categories.
          </p>
        </div>

        {/* Demo Preview */}
        <div className="mt-8 rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Blog Content Management
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Create, organize, and publish blog posts with a complete CMS workflow.
            </p>
          </div>

          {/* Sample Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Title
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Author
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Category
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Status
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Getting Started with React 19</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Jane Developer</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Technology</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Published
                    </span>
                  </td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">2024-01-15</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Design Systems That Scale</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Alex Designer</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Design</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Published
                    </span>
                  </td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">2024-02-01</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Building Your First API</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Mike Coder</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Tutorial</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Draft
                    </span>
                  </td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">2024-03-01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              📝 Draft System
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Write and save drafts before publishing
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🏷️ Tags & Categories
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Organize content with categories and tags
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              📅 Scheduling
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Set publish dates for your content calendar
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Usage
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            After installation, use the blog CMS example in your application:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { blogPostSchema } from '@/lib/examples/blog-post-schema'
import { mockBlogPosts } from '@/lib/examples/mock-blog-posts'

const blogDataProvider = new MockDataProvider(mockBlogPosts)

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={blogPostSchema} dataProvider={blogDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['title', 'author', 'category', 'status', 'publishDate']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}`}
              language="typescript"
              title="app/examples/blog/page.tsx"
            />
          </div>
        </div>

        {/* Schema Definition */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Schema Definition
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Define your blog post structure:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`const blogPostSchema = {
  title: 'Blog Post',
  idField: 'id',
  fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true },
    { name: 'author', label: 'Author', type: 'text', required: true },
    { name: 'content', label: 'Content', type: 'textarea', required: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'design', label: 'Design' },
        { value: 'tutorial', label: 'Tutorial' },
        { value: 'business', label: 'Business' },
      ],
      filterable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' },
      ],
      filterable: true,
    },
    { name: 'publishDate', label: 'Publish Date', type: 'date', required: true },
  ],
}`}
              language="typescript"
              title="lib/examples/blog-post-schema.ts"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400">
            💡 Next Steps
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>• Add rich text editor integration for content creation</li>
            <li>• Implement SEO metadata fields and social sharing</li>
            <li>• Add image upload and media library support</li>
            <li>• Create scheduled publishing with automated workflows</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
