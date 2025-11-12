'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/layout/site-header'
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
        <SiteHeader />

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
