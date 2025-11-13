import type { Schema } from '@/lib/crudkit/data-provider'

export const orderSchema: Schema = {
  title: 'Order',
  idField: 'id',
  fields: [
    {
      name: 'orderNumber',
      label: 'Order Number',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'customer',
      label: 'Customer Name',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'email',
      label: 'Customer Email',
      type: 'email',
      required: true,
    },
    {
      name: 'total',
      label: 'Total Amount ($)',
      type: 'number',
      required: true,
      sortable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'date',
      label: 'Order Date',
      type: 'date',
      required: true,
      sortable: true,
    },
    {
      name: 'items',
      label: 'Items',
      type: 'text',
      showOnCreate: true,
      showOnEdit: true,
    },
  ],
}
