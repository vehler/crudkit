'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/code/code-block'
import { getSiteUrl } from '@/lib/install-command'

export default function SettingsPage() {
  const siteUrl = getSiteUrl()
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
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
              href="/examples"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Examples
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link
              href="/examples"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to Examples
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Settings Panel
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Application configuration with various field types
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Installation */}
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Installation
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Install the CRUDKit settings panel example using the CLI
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`npx shadcn add ${siteUrl}/r/crudkit-example-settings`}
              language="bash"
              title="CLI"
            />
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            This will install all required files including the page component, settings schema, and configuration management utilities.
          </p>
        </div>

        {/* Demo Preview */}
        <div className="mt-8 rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Application Settings
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Centralized configuration panel for managing all application settings.
            </p>
          </div>

          {/* Sample Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Setting
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Category
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Type
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Value
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Public
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Site Name</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">General</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Text</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">My Awesome Site</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Yes
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Items Per Page</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">General</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Number</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">10</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      No
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Enable 2FA</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Security</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Boolean</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">true</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      No
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              ⚙️ Configuration
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Manage all application settings in one place
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              📝 Field Types
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Support for text, number, boolean, and select
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🔒 Visibility
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Mark settings as public or private
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Usage
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            After installation, use the settings panel in your application:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`'use client'

import { Crud } from '@/components/crudkit'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { settingSchema } from '@/lib/examples/setting-schema'
import { mockSettings } from '@/lib/examples/mock-settings'

const settingDataProvider = new MockDataProvider(mockSettings)

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={settingSchema} dataProvider={settingDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['name', 'category', 'type', 'value', 'isPublic']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}`}
              language="typescript"
              title="app/examples/settings/page.tsx"
            />
          </div>
        </div>

        {/* Schema Definition */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Schema Definition
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Define your settings configuration structure:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`const settingSchema = {
  title: 'Setting',
  idField: 'id',
  fields: [
    { name: 'name', label: 'Setting Name', type: 'text', required: true },
    { name: 'key', label: 'Key', type: 'text', required: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'general', label: 'General' },
        { value: 'security', label: 'Security' },
        { value: 'notifications', label: 'Notifications' },
        { value: 'appearance', label: 'Appearance' },
      ],
      filterable: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
        { value: 'boolean', label: 'Boolean' },
        { value: 'select', label: 'Select' },
      ],
      required: true,
    },
    { name: 'value', label: 'Value', type: 'text', required: true },
    { name: 'isPublic', label: 'Public', type: 'boolean', required: true },
  ],
}`}
              language="typescript"
              title="lib/examples/setting-schema.ts"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400">
            💡 Next Steps
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>• Connect to your configuration API or environment variables</li>
            <li>• Add validation rules for different setting types</li>
            <li>• Implement role-based access control for sensitive settings</li>
            <li>• Add audit logging for configuration changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
