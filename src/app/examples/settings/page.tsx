import Link from 'next/link'

export default function SettingsPage() {
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
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">Settings Panel</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Application configuration with various field types</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full">
            <thead className="border-b-2 bg-zinc-50 dark:bg-zinc-950">
              <tr>
                <th className="p-3 text-left text-xs font-semibold uppercase">Setting</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Category</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Type</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Value</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Public</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3">Site Name</td><td className="p-3">General</td><td className="p-3">Text</td><td className="p-3">My Awesome Site</td><td className="p-3"><span className="rounded-full bg-green-100 px-2 py-1 text-xs dark:bg-green-900/30">Yes</span></td></tr>
              <tr><td className="p-3">Items Per Page</td><td className="p-3">General</td><td className="p-3">Number</td><td className="p-3">10</td><td className="p-3"><span className="rounded-full bg-red-100 px-2 py-1 text-xs dark:bg-red-900/30">No</span></td></tr>
              <tr><td className="p-3">Enable 2FA</td><td className="p-3">Security</td><td className="p-3">Boolean</td><td className="p-3">true</td><td className="p-3"><span className="rounded-full bg-red-100 px-2 py-1 text-xs dark:bg-red-900/30">No</span></td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">⚙️ Configuration</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Manage all application settings in one place</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">📝 Field Types</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Support for text, number, boolean, and select</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">🔒 Visibility</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Mark settings as public or private</p></div>
        </div>
      </div>
    </div>
  )
}
