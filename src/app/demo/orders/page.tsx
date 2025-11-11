'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/demo/mock-data-provider'
import { orderSchema, mockOrders } from '@/lib/demo/schemas/order'

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
          Track orders with status updates, customer information, and order details
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Crud schema={orderSchema} dataProvider={orderDataProvider}>
          <Crud.Toolbar />
          <Crud.Filters />
          <Crud.List columns={['orderNumber', 'customer', 'email', 'total', 'status', 'date']} />
          <Crud.Form />
          <Crud.View />
        </Crud>
      </div>

      {/* Instructions */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
        <h3 className="font-semibold text-blue-900 dark:text-blue-400">
          Order Processing Features
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
          <li>• Track order status through the fulfillment pipeline</li>
          <li>• Filter by status (Pending, Processing, Shipped, Delivered, Cancelled)</li>
          <li>• View customer information and order totals</li>
          <li>• Date-based ordering and sorting</li>
          <li>• Quick search across all order fields</li>
        </ul>
      </div>
    </div>
  )
}
