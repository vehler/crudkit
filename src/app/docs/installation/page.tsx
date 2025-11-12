'use client'

import { DocLayout } from '@/components/docs/doc-layout'
import { CodeBlock } from '@/components/code/code-block'
import { InstallCommand } from '@/components/docs/install-command'

export default function InstallationPage() {
  return (
    <DocLayout
      title="Installation"
      description="Get CRUDKit up and running in your Next.js project"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Prerequisites
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Before you begin, make sure you have:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-600 dark:text-zinc-400">
            <li>Node.js 18.17 or later</li>
            <li>A Next.js 14+ project with App Router</li>
            <li>Tailwind CSS configured</li>
            <li>TypeScript (recommended)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Step 1: Install shadcn/ui CLI
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            CRUDKit uses the shadcn/ui CLI to install components. If you haven't
            already, initialize shadcn/ui in your project:
          </p>
          <div className="mt-4">
            <CodeBlock
              code="npx shadcn@latest init"
              language="bash"
              showLineNumbers={false}
            />
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Follow the prompts to configure your project. We recommend using the
            "Default" style and "Zinc" as the base color.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Step 2: Add CRUDKit Components
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Install the core CRUDKit components. This will also install all required dependencies (nuqs, clsx, tailwind-merge):
          </p>
          <InstallCommand component="crudkit" className="mt-4" />
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            This will add the following files to your project:
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-6 font-mono text-sm text-zinc-600 dark:text-zinc-400">
            <li>components/crudkit/crud-table.tsx</li>
            <li>hooks/use-crud.ts</li>
            <li>lib/crudkit/data-provider.ts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Step 3: Optional Plugins
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Install optional plugins as needed:
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Kanban Board Plugin
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Adds drag-and-drop Kanban board support:
              </p>
              <InstallCommand component="crudkit-kanban" className="mt-2" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Verification
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Verify your installation by checking that the following files exist:
          </p>
          <div className="mt-4 rounded-lg border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <pre className="overflow-x-auto font-mono text-sm text-zinc-900 dark:text-zinc-50">
{`✓ components/crudkit/crud-table.tsx
✓ hooks/use-crud.ts
✓ lib/crudkit/data-provider.ts`}
            </pre>
          </div>
        </section>

        <section className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400">
            Next Steps
          </h3>
          <p className="mt-2 text-sm text-blue-800 dark:text-blue-300">
            Now that you've installed CRUDKit, continue to the{' '}
            <a
              href="/docs/quick-start"
              className="font-medium underline hover:no-underline"
            >
              Quick Start Guide
            </a>{' '}
            to build your first CRUD table.
          </p>
        </section>
      </div>
    </DocLayout>
  )
}
