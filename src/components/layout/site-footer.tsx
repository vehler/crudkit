import Link from 'next/link'

export function SiteFooter() {
  return (
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
              {/* GitHub links temporarily hidden - private repo */}
              {/* <li>
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
              </li> */}
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
  )
}
