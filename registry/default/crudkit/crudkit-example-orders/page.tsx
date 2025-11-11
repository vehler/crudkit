'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { orderSchema } from '@/lib/examples/order-schema'
import { mockOrders } from '@/lib/examples/mock-orders'

// Create data provider instance
const orderDataProvider = new MockDataProvider(mockOrders)

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={orderSchema} dataProvider={orderDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['orderNumber', 'customer', 'total', 'status', 'date']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}
