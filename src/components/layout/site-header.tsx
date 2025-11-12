import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function SiteHeader() {
  return (
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
            href="/demo"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Live Demos
          </Link>
          <Link
            href="/examples"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Examples
          </Link>
          {/* GitHub link temporarily hidden - private repo */}
          {/* <a
            href="https://github.com/vehler/crudkit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            GitHub
          </a> */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
