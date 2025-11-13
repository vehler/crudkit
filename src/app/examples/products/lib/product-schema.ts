import type { Schema } from '@/lib/crudkit/data-provider'

export const productSchema: Schema = {
  title: 'Product',
  idField: 'id',
  fields: [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'sports', label: 'Sports' },
        { value: 'home', label: 'Home & Garden' },
        { value: 'books', label: 'Books' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'price',
      label: 'Price ($)',
      type: 'number',
      required: true,
      sortable: true,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'number',
      required: true,
      sortable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'discontinued', label: 'Discontinued' },
        { value: 'out-of-stock', label: 'Out of Stock' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      showOnCreate: true,
      showOnEdit: true,
    },
  ],
}
