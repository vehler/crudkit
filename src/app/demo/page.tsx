import Link from 'next/link'
import { Card } from '@/components/ui/card'

const demos = [
  {
    title: 'User Management',
    description: 'Complete user management system with roles, departments, and status tracking',
    href: '/demo/users',
    features: ['Role-based access', 'Department organization', 'Status management', 'Search & filter'],
    icon: '👥',
  },
  {
    title: 'Product Catalog',
    description: 'Product inventory management with categories, pricing, and stock tracking',
    href: '/demo/products',
    features: ['Category filtering', 'Stock management', 'Price tracking', 'Product descriptions'],
    icon: '📦',
  },
  {
    title: 'Order Processing',
    description: 'Order management with status tracking, customer info, and order details',
    href: '/demo/orders',
    features: ['Status pipeline', 'Customer tracking', 'Order totals', 'Date sorting'],
    icon: '📋',
  },
]

export default function DemoIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Live Demos
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Interactive demonstrations of CRUDKit components. Try all CRUD operations in action.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-zinc-600 dark:text-zinc-400">Theme:</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              Use the toggle in the top-right to test light/dark modes
            </span>
          </div>
        </div>
      </div>

      {/* Demo Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            className="group block transition-transform hover:scale-105"
          >
            <Card className="h-full overflow-hidden border-2 border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-50">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-4xl">{demo.icon}</span>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {demo.title}
                </h2>
              </div>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                {demo.description}
              </p>
              <div className="mb-4 space-y-2">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Features:
                </p>
                <ul className="space-y-1">
                  {demo.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-zinc-900 group-hover:gap-3 dark:text-zinc-50">
                Try it now
                <span className="transition-all">→</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          What you can do in these demos:
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
            <div className="mb-2 text-2xl">📋</div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">List View</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Browse all items with pagination
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
            <div className="mb-2 text-2xl">👁️</div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">View Details</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              See full item information
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
            <div className="mb-2 text-2xl">➕</div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Create New</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Add new items with forms
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
            <div className="mb-2 text-2xl">✏️</div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Edit Items</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Update existing data
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
            <div className="mb-2 text-2xl">🗑️</div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Delete</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Remove items safely
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
