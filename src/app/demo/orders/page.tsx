'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { orderSchema } from '@/lib/examples/order-schema'
import { mockOrders } from '@/lib/examples/mock-orders'
import { OrderCell } from './components/order-cell'
import { OrderView } from './components/order-view'

// Force dynamic rendering for this page (uses URL state)
export const dynamic = 'force-dynamic'

// Create data provider instance
const orderDataProvider = new MockDataProvider(mockOrders)

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Order Management</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Track customer orders with status workflows and custom views
      </p>

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
  )
}
