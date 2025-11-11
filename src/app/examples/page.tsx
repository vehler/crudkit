import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Examples - CRUDKit',
  description: 'Explore live examples of CRUD applications built with CRUDKit',
}

const examples = [
  {
    title: 'User Management',
    description:
      'Complete user management system with CRUD operations, filtering, sorting, and pagination. Perfect starting point for admin panels.',
    href: '/examples/users',
    badge: 'Core',
    difficulty: 'Beginner',
    features: ['CRUD Operations', 'Filters & Search', 'Pagination', 'Sorting'],
  },
  {
    title: 'Kanban Board',
    description:
      'Drag-and-drop task management with Kanban view. Shows how to integrate CRUDKit with dnd-kit for interactive boards.',
    href: '/examples/kanban',
    badge: 'Plugin',
    difficulty: 'Intermediate',
    features: ['Drag & Drop', 'Status Workflow', 'Task Management', 'Custom Views'],
  },
  {
    title: 'E-commerce Products',
    description:
      'Product catalog with categories, inventory management, and bulk operations. Great for e-commerce applications.',
    href: '/examples/products',
    badge: 'Coming Soon',
    difficulty: 'Intermediate',
    features: ['Categories', 'Image Upload', 'Inventory', 'Bulk Actions'],
  },
  {
    title: 'Customer Orders',
    description:
      'Order management with complex relationships, status workflows, and export functionality.',
    href: '/examples/orders',
    badge: 'Coming Soon',
    difficulty: 'Advanced',
    features: ['Relationships', 'Date Filtering', 'Export', 'Workflows'],
  },
  {
    title: 'Blog CMS',
    description:
      'Content management system with rich text editing, draft/publish states, and content organization.',
    href: '/examples/blog',
    badge: 'Coming Soon',
    difficulty: 'Intermediate',
    features: ['Rich Text', 'Draft State', 'Tags', 'Preview'],
  },
  {
    title: 'Settings Panel',
    description:
      'Form-heavy example showcasing different field types, validation, and settings management.',
    href: '/examples/settings',
    badge: 'Coming Soon',
    difficulty: 'Beginner',
    features: ['Various Fields', 'Validation', 'Toggle/Switch', 'Form Handling'],
  },
]

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        colors[difficulty as keyof typeof colors]
      }`}
    >
      {difficulty}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Coming Soon') {
    return (
      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
        Coming Soon
      </span>
    )
  }

  const colors = {
    Core: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Plugin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        colors[status as keyof typeof colors]
      }`}
    >
      {status}
    </span>
  )
}

export default function ExamplesPage() {
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

      {/* Header */}
      <div className="border-b bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Examples
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Explore live, interactive examples of CRUD applications built with
              CRUDKit. Each example includes full source code you can copy and
              customize.
            </p>
          </div>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, index) => (
              <Link
                key={index}
                href={example.href}
                className={`group relative flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 ${
                  example.badge === 'Coming Soon'
                    ? 'pointer-events-none opacity-60'
                    : ''
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <StatusBadge status={example.badge} />
                  <DifficultyBadge difficulty={example.difficulty} />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
                  {example.title}
                </h3>

                <p className="mb-4 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {example.description}
                </p>

                <div className="border-t pt-4 dark:border-zinc-800">
                  <div className="flex flex-wrap gap-2">
                    {example.features.map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {example.badge !== 'Coming Soon' && (
                  <div className="mt-4 flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    View Example
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
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Ready to get started?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Install CRUDKit and start building your CRUD application today
            </p>
            <div className="mt-8">
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
