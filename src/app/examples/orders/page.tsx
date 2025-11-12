'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/code/code-block'
import { getSiteUrl } from '@/lib/install-command'

export default function OrdersPage() {
  const siteUrl = getSiteUrl()
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              CRUDKit
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Docs
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Examples
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link
              href="/examples"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to Examples
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Customer Orders
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Order management with status workflows and customer data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Installation */}
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Installation
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Install the CRUDKit orders example using the CLI
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`npx shadcn add ${siteUrl}/r/crudkit-example-orders`}
              language="bash"
              title="CLI"
            />
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            This will install all required files including the page component, order schema, and 20+ mock orders with various statuses.
          </p>
        </div>

        {/* Demo Preview */}
        <div className="mt-8 rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Order Management System
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Track customer orders through their complete lifecycle from placement to delivery.
            </p>
          </div>

          {/* Sample Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Order #
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Customer
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Total
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Status
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">ORD-2024-001</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">John Smith</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$249.99</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Delivered
                    </span>
                  </td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">2024-01-15</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">ORD-2024-002</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Sarah Johnson</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$89.99</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      Shipped
                    </span>
                  </td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">2024-02-10</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">ORD-2024-003</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Michael Chen</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$459.50</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Processing
                    </span>
                  </td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">2024-02-28</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              📦 Order Workflow
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Track orders through their lifecycle from pending to delivered
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              👤 Customer Data
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Store customer information and shipping details
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              💳 Payment Tracking
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Monitor payment methods and transaction status
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Usage
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            After installation, use the orders example in your application:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { orderSchema } from '@/lib/examples/order-schema'
import { mockOrders } from '@/lib/examples/mock-orders'

const orderDataProvider = new MockDataProvider(mockOrders)

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={orderSchema} dataProvider={orderDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['orderNumber', 'customer', 'total', 'status', 'orderDate']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}`}
              language="typescript"
              title="app/examples/orders/page.tsx"
            />
          </div>
        </div>

        {/* Schema Definition */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Schema Definition
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Define your order management structure:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`const orderSchema = {
  title: 'Order',
  idField: 'id',
  fields: [
    { name: 'orderNumber', label: 'Order #', type: 'text', required: true },
    { name: 'customer', label: 'Customer', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'total', label: 'Total', type: 'number', required: true },
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
      filterable: true,
    },
    { name: 'orderDate', label: 'Order Date', type: 'date', required: true },
  ],
}`}
              language="typescript"
              title="lib/examples/order-schema.ts"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400">
            💡 Next Steps
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>• Connect to your order management API or database</li>
            <li>• Add email notifications for status changes</li>
            <li>• Implement order tracking and shipping integration</li>
            <li>• Add invoice generation and PDF export features</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
