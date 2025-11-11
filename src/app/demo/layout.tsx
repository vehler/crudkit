'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { cn } from '@/lib/utils'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// Force dynamic rendering for all demo pages
export const dynamic = 'force-dynamic'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: '/demo', label: 'All Demos' },
    { href: '/demo/users', label: 'Users' },
    { href: '/demo/products', label: 'Products' },
    { href: '/demo/orders', label: 'Orders' },
  ]

  return (
    <NuqsAdapter>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                CRUDKit
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/docs"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Docs
              </Link>
              <Link
                href="/examples"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Examples
              </Link>
              <Link
                href="/demo"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Live Demos
              </Link>
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Sub-navigation */}
      <div className="border-b bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative whitespace-nowrap py-4 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-zinc-50" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
      </div>
    </NuqsAdapter>
  )
}
