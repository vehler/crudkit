import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-commerce Products - CRUDKit Examples',
  description: 'Product catalog management with inventory tracking',
}

export default function ProductsPage() {
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
            E-commerce Products
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Product catalog with categories, inventory management, and bulk operations
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Demo Preview */}
        <div className="rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Product Management System
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              A complete product catalog with inventory tracking, category filtering, and bulk operations.
            </p>
          </div>

          {/* Sample Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Product
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    SKU
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Category
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Price
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Stock
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Wireless Headphones</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">WH-001</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Electronics</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$79.99</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">45</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Cotton T-Shirt</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">CT-101</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Clothing</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$19.99</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">120</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Yoga Mat</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">YM-301</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Sports</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$24.99</td>
                  <td className="p-3 text-sm text-red-600 dark:text-red-400">0</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Out of Stock
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              📦 Inventory Tracking
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Monitor stock levels and manage product availability in real-time
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🏷️ Category Filtering
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Organize products by categories for easy management and filtering
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              ⚡ Bulk Operations
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Select multiple products for batch updates, price changes, or deletion
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 rounded-lg border bg-zinc-900 p-6 dark:border-zinc-800">
          <div className="mb-3 text-sm font-medium text-zinc-400">Schema Definition</div>
          <pre className="overflow-x-auto text-sm text-zinc-50">
{`const productSchema = {
  title: 'Product',
  idField: 'id',
  fields: [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'sku', label: 'SKU', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'sports', label: 'Sports' },
      ],
      filterable: true,
    },
    { name: 'stock', label: 'Stock', type: 'number', required: true },
  ],
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
