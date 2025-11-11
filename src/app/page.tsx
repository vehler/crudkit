import { Hero } from '@/components/home/hero'
import { Features } from '@/components/home/features'
import { CodeExample } from '@/components/home/code-example'
import { LiveDemo } from '@/components/home/live-demo'
import { Comparison } from '@/components/home/comparison'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
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
            <a
              href="https://github.com/vehler/crudkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              GitHub
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <CodeExample />
        <LiveDemo />
        <Comparison />

        {/* CTA Section */}
        <section className="bg-white py-24 dark:bg-zinc-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                Ready to build faster?
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                Start building production-ready CRUD applications today
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/demo"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Try Live Demos
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 bg-white px-8 text-base font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                CRUDKit
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Build CRUD applications at lightning speed with shadcn-based
                components.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Documentation
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/docs"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/installation"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Installation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/components"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Components
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Demos & Examples
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/demo"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Live Demos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo/users"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    User Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/examples"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Code Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Community
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/vehler/crudkit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/vehler/crudkit/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Issues
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 dark:border-zinc-800">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Built with Next.js, Tailwind CSS, and shadcn/ui. Open source and
              MIT licensed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
