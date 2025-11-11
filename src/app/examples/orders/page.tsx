import Link from 'next/link'

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-50">CRUDKit</Link>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Docs</Link>
            <Link href="/examples" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Examples</Link>
          </div>
        </div>
      </nav>

      <div className="border-b bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/examples" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">← Back to Examples</Link>
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">Customer Orders</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Order management with status workflows and customer data</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full">
            <thead className="border-b-2 bg-zinc-50 dark:bg-zinc-950">
              <tr>
                <th className="p-3 text-left text-xs font-semibold uppercase">Order #</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Customer</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Total</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Status</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3">ORD-2024-001</td><td className="p-3">John Smith</td><td className="p-3">$249.99</td><td className="p-3"><span className="rounded-full bg-green-100 px-2 py-1 text-xs dark:bg-green-900/30">Delivered</span></td><td className="p-3">2024-01-15</td></tr>
              <tr><td className="p-3">ORD-2024-002</td><td className="p-3">Sarah Johnson</td><td className="p-3">$89.99</td><td className="p-3"><span className="rounded-full bg-blue-100 px-2 py-1 text-xs dark:bg-blue-900/30">Shipped</span></td><td className="p-3">2024-02-10</td></tr>
              <tr><td className="p-3">ORD-2024-003</td><td className="p-3">Michael Chen</td><td className="p-3">$459.50</td><td className="p-3"><span className="rounded-full bg-yellow-100 px-2 py-1 text-xs dark:bg-yellow-900/30">Processing</span></td><td className="p-3">2024-02-28</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">📦 Order Workflow</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Track orders through their lifecycle from pending to delivered</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">👤 Customer Data</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Store customer information and shipping details</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">💳 Payment Tracking</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Monitor payment methods and transaction status</p></div>
        </div>
      </div>
    </div>
  )
}
