'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { productSchema } from '@/lib/examples/product-schema'
import { mockProducts } from '@/lib/examples/mock-products'

// Create data provider instance
const productDataProvider = new MockDataProvider(mockProducts)

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={productSchema} dataProvider={productDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['name', 'sku', 'category', 'price', 'stock', 'status']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}
