'use client'

import { Crud } from '@/components/crudkit'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { productSchema } from '@/lib/examples/product-schema'
import { mockProducts } from '@/lib/examples/mock-products'
import { ProductCell } from './components/product-cell'
import { ProductActions } from './components/product-actions'

// Force dynamic rendering for this page (uses URL state)
export const dynamic = 'force-dynamic'

// Create data provider instance
const productDataProvider = new MockDataProvider(mockProducts)

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Product Management</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        E-commerce product catalog with custom component renderers
      </p>

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
  )
}
