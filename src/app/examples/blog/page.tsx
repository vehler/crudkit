import Link from 'next/link'

export default function BlogPage() {
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
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">Blog CMS</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Content management with draft/publish states and organization</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full">
            <thead className="border-b-2 bg-zinc-50 dark:bg-zinc-950">
              <tr>
                <th className="p-3 text-left text-xs font-semibold uppercase">Title</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Author</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Category</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Status</th>
                <th className="p-3 text-left text-xs font-semibold uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3">Getting Started with React 19</td><td className="p-3">Jane Developer</td><td className="p-3">Technology</td><td className="p-3"><span className="rounded-full bg-green-100 px-2 py-1 text-xs dark:bg-green-900/30">Published</span></td><td className="p-3">2024-01-15</td></tr>
              <tr><td className="p-3">Design Systems That Scale</td><td className="p-3">Alex Designer</td><td className="p-3">Design</td><td className="p-3"><span className="rounded-full bg-green-100 px-2 py-1 text-xs dark:bg-green-900/30">Published</span></td><td className="p-3">2024-02-01</td></tr>
              <tr><td className="p-3">Building Your First API</td><td className="p-3">Mike Coder</td><td className="p-3">Tutorial</td><td className="p-3"><span className="rounded-full bg-yellow-100 px-2 py-1 text-xs dark:bg-yellow-900/30">Draft</span></td><td className="p-3">2024-03-01</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">📝 Draft System</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Write and save drafts before publishing</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">🏷️ Tags & Categories</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Organize content with categories and tags</p></div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">📅 Scheduling</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Set publish dates for your content calendar</p></div>
        </div>
      </div>
    </div>
  )
}
