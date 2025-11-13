'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/demo/mock-data-provider'
import { orderSchema, mockOrders } from '@/lib/demo/schemas/order'
import { OrderCell } from './components/order-cell'
import { OrderView } from './components/order-view'

// Force dynamic rendering for this page (uses URL state)
export const dynamic = 'force-dynamic'

// Create data provider instance
const orderDataProvider = new MockDataProvider(mockOrders)

export default function OrdersDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Order Management Demo
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Showcasing status badges with icons, formatted dates, and custom view layout
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Crud schema={orderSchema} dataProvider={orderDataProvider}>
          <Crud.Toolbar />
          <Crud.Filters />
          <Crud.List
            columns={['orderNumber', 'customer', 'email', 'total', 'status', 'date']}
            components={{
              Cell: OrderCell,
            }}
          />
          <Crud.Form />
          <Crud.View
            components={{
              ViewLayout: OrderView,
            }}
          />
        </Crud>
      </div>

      {/* Customization Info */}
      <div className="mt-6 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/30 dark:bg-purple-900/10">
        <h3 className="font-semibold text-purple-900 dark:text-purple-400">
          🎨 Custom Component Renderers
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-purple-800 dark:text-purple-300">
          <li>• <strong>Order Number:</strong> Package icon with monospace font</li>
          <li>• <strong>Status:</strong> Badges with icons (⏰ Pending, 📦 Processing, 🚚 Shipped, ✅ Delivered, ❌ Cancelled)</li>
          <li>• <strong>Total:</strong> Formatted currency display</li>
          <li>• <strong>Date:</strong> Human-readable date format</li>
          <li>• <strong>View Layout:</strong> Custom card layout with organized sections</li>
        </ul>
      </div>

      {/* Code Example */}
      <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Implementation
        </h3>
        <pre className="overflow-x-auto rounded bg-zinc-100 p-3 text-xs dark:bg-zinc-950">
          <code className="text-zinc-800 dark:text-zinc-200">{`<Crud.List
  components={{
    Cell: OrderCell,  // Custom cells with icons & formatting
  }}
/>

<Crud.View
  components={{
    ViewLayout: OrderView,  // Custom card-based layout
  }}
/>`}</code>
        </pre>
      </div>

      {/* Instructions */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
        <h3 className="font-semibold text-blue-900 dark:text-blue-400">
          Try it out!
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
          <li>• Click the eye icon to see the custom view layout</li>
          <li>• Notice how status badges include icons based on order state</li>
          <li>• Filter orders by status to see different badge styles</li>
          <li>• The view shows order details in an organized card format</li>
        </ul>
      </div>
    </div>
  )
}
