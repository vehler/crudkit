'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Crud', href: '/docs/components/crud' },
      { title: 'Crud.Toolbar', href: '/docs/components/toolbar' },
      { title: 'Crud.Filters', href: '/docs/components/filters' },
      { title: 'Crud.List', href: '/docs/components/list' },
      { title: 'Crud.Form', href: '/docs/components/form' },
      { title: 'Crud.View', href: '/docs/components/view' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Data Providers', href: '/docs/guides/data-providers' },
      { title: 'Schemas', href: '/docs/guides/schemas' },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0">
      <nav className="sticky top-20 space-y-8">
        {navigation.map((section) => (
          <div key={section.title}>
            <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm transition-colors',
                      pathname === item.href
                        ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
