'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/demo/mock-data-provider'
import { productSchema, mockProducts } from '@/lib/demo/schemas/product'

// Force dynamic rendering for this page (uses URL state)
export const dynamic = 'force-dynamic'

// Create data provider instance
const productDataProvider = new MockDataProvider(mockProducts)

export default function ProductsDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Product Management Demo
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Manage products with inventory tracking, categorization, and status management
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Crud schema={productSchema} dataProvider={productDataProvider}>
          <Crud.Toolbar />
          <Crud.Filters />
          <Crud.List columns={['name', 'sku', 'category', 'price', 'stock', 'status']} />
          <Crud.Form />
          <Crud.View />
        </Crud>
      </div>

      {/* Instructions */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
        <h3 className="font-semibold text-blue-900 dark:text-blue-400">
          Features Demonstrated
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
          <li>• Multi-field forms with text, number, select, and textarea inputs</li>
          <li>• Category filtering and status-based filtering</li>
          <li>• Price and stock management</li>
          <li>• Product descriptions using textarea fields</li>
          <li>• Sortable columns for better data organization</li>
        </ul>
      </div>
    </div>
  )
}
