'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/code/code-block'
import { getSiteUrl } from '@/lib/install-command'

export default function UsersPage() {
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
            User Management
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Complete user management system with CRUD operations, filtering, sorting, and pagination
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
            Install the CRUDKit user management example using the CLI
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`npx shadcn add ${siteUrl}/r/crudkit-example-users`}
              language="bash"
              title="CLI"
            />
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            This will install all required files including the page component, schema definition, mock data, and the MockDataProvider utility.
          </p>
        </div>

        {/* Demo Preview */}
        <div className="mt-8 rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              User Management System
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Manage users with complete CRUD operations, role-based filtering, and department organization.
            </p>
          </div>

          {/* Sample Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Name
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Email
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Role
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Department
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">John Doe</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">john@example.com</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Admin</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Engineering</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Jane Smith</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">jane@example.com</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Editor</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Marketing</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Bob Wilson</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">bob@example.com</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Viewer</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Sales</td>
                  <td className="p-3">
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Inactive
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
              👥 Role Management
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Organize users by roles (Admin, Editor, Viewer) with filterable permissions
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🔍 Advanced Filtering
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Filter by department, role, status, and search across all fields
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              📊 50+ Sample Users
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Comes with realistic mock data across multiple departments
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Usage
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            After installation, you can use the user management example in your application:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { userSchema } from '@/lib/examples/user-schema'
import { mockUsers } from '@/lib/examples/mock-users'

// Create data provider instance
const userDataProvider = new MockDataProvider(mockUsers)

export default function UsersPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={userSchema} dataProvider={userDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['name', 'email', 'role', 'status', 'department']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}`}
              language="typescript"
              title="app/examples/users/page.tsx"
            />
          </div>
        </div>

        {/* Schema Definition */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Schema Definition
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Define the structure and behavior of your user data:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`import type { Schema } from '@/lib/crudkit/data-provider'

export const userSchema: Schema = {
  title: 'User',
  idField: 'id',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      sortable: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'support', label: 'Support' },
      ],
      filterable: true,
      sortable: true,
    },
  ],
}`}
              language="typescript"
              title="lib/examples/user-schema.ts"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400">
            💡 Next Steps
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>• Replace MockDataProvider with your actual backend API</li>
            <li>• Customize the schema to match your user data structure</li>
            <li>• Add additional fields like avatar, phone, or custom metadata</li>
            <li>• Implement authentication and authorization logic</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
