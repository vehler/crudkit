'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/demo/mock-data-provider'
import { productSchema, mockProducts } from '@/lib/demo/schemas/product'
import { ProductCell } from './components/product-cell'
import { ProductActions } from './components/product-actions'

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
          Showcasing custom component renderers: formatted prices, stock badges, category icons, and dropdown actions
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Crud schema={productSchema} dataProvider={productDataProvider}>
          <Crud.Toolbar />
          <Crud.Filters />
          <Crud.List
            columns={['name', 'sku', 'category', 'price', 'stock', 'status']}
            components={{
              Cell: ProductCell,
              Actions: ProductActions,
            }}
          />
          <Crud.Form />
          <Crud.View />
        </Crud>
      </div>

      {/* Customization Info */}
      <div className="mt-6 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/30 dark:bg-purple-900/10">
        <h3 className="font-semibold text-purple-900 dark:text-purple-400">
          🎨 Custom Component Renderers
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-purple-800 dark:text-purple-300">
          <li>• <strong>Price:</strong> Formatted as currency with $ symbol</li>
          <li>• <strong>Stock:</strong> Color-coded badges (red: out of stock, yellow: low, green: in stock)</li>
          <li>• <strong>Status:</strong> Badge variants based on product status</li>
          <li>• <strong>Category:</strong> Emoji icons for visual categorization</li>
          <li>• <strong>Actions:</strong> Dropdown menu with View, Edit, Duplicate, and Delete options</li>
        </ul>
      </div>

      {/* Code Example */}
      <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Implementation
        </h3>
        <pre className="overflow-x-auto rounded bg-zinc-100 p-3 text-xs dark:bg-zinc-950">
          <code className="text-zinc-800 dark:text-zinc-200">{`<Crud.List
  columns={['name', 'sku', 'category', 'price', 'stock', 'status']}
  components={{
    Cell: ProductCell,      // Custom cell with badges & formatting
    Actions: ProductActions, // Dropdown menu for actions
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  )
}
