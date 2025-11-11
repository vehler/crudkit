import Link from 'next/link'

export default function DashboardPage() {
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
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">Analytics Dashboard</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Track user behavior, events, and conversion metrics</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"><div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Events</div><div className="mt-2 text-3xl font-bold">10</div></div>
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"><div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Unique Users</div><div className="mt-2 text-3xl font-bold">8</div></div>
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"><div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Revenue</div><div className="mt-2 text-3xl font-bold">$229.98</div></div>
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"><div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Avg Order Value</div><div className="mt-2 text-3xl font-bold">$114.99</div></div>
        </div>

        <div className="rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full">
            <thead className="border-b-2 bg-zinc-50 dark:bg-zinc-950">
              <tr>
                <th className="p-3 text-left text-xs font-semibold uppercase">Event</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Type</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Device</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Value</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Country</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3">Homepage Visit</td><td className="p-3">Page View</td><td className="p-3">Desktop</td><td className="p-3">$0.00</td><td className="p-3">US</td></tr>
              <tr><td className="p-3">Product Click</td><td className="p-3">Click</td><td className="p-3">Mobile</td><td className="p-3">$0.00</td><td className="p-3">UK</td></tr>
              <tr><td className="p-3">Purchase Complete</td><td className="p-3">Purchase</td><td className="p-3">Desktop</td><td className="p-3">$149.99</td><td className="p-3">US</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">📊 Event Tracking</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Monitor user interactions and behavior patterns</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">🌍 Geographic Data</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Track user locations and regional performance</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">💰 Revenue Metrics</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Monitor conversions and purchase values</p></div>
        </div>
      </div>
    </div>
  )
}
