import { DocLayout } from '@/components/docs/doc-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Start - CRUDKit',
  description: 'Build your first CRUD table in 5 minutes',
}

export default function QuickStartPage() {
  return (
    <DocLayout
      title="Quick Start"
      description="Build your first CRUD table in 5 minutes"
    >
      <div className="space-y-8">
        <section>
          <p className="text-zinc-600 dark:text-zinc-400">
            This guide will walk you through creating a simple user management
            system with CRUDKit. By the end, you'll have a fully functional CRUD
            interface with filtering, sorting, and pagination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Step 1: Define Your Schema
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Create a schema file that describes your data structure:
          </p>
          <div className="mt-4 rounded-lg border bg-zinc-900 p-4 dark:border-zinc-800">
            <div className="mb-2 text-xs text-zinc-400">lib/user-schema.ts</div>
            <pre className="overflow-x-auto">
              <code className="text-sm text-zinc-50">
{`import { Schema } from '@/lib/crudkit/data-provider'

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
        { value: 'user', label: 'User' },
      ],
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
      ],
      filterable: true,
    },
  ],
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Step 2: Create a Data Provider
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Implement a data provider to connect to your backend. Here's a mock
            example:
          </p>
          <div className="mt-4 rounded-lg border bg-zinc-900 p-4 dark:border-zinc-800">
            <div className="mb-2 text-xs text-zinc-400">lib/mock-data-provider.ts</div>
            <pre className="overflow-x-auto">
              <code className="text-sm text-zinc-50">
{`import { DataProvider } from '@/lib/crudkit/data-provider'

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  // ... more users
]

export const mockDataProvider: DataProvider = {
  getList: async (params) => {
    // Filter
    let filtered = [...mockUsers]
    if (params.search) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(params.search.toLowerCase())
      )
    }

    // Sort
    if (params.sortField) {
      filtered.sort((a, b) => {
        const aVal = a[params.sortField]
        const bVal = b[params.sortField]
        return params.sortOrder === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal))
      })
    }

    // Paginate
    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize

    return {
      data: filtered.slice(start, end),
      totalCount: filtered.length,
    }
  },

  getOne: async (id) => {
    const user = mockUsers.find(u => u.id === id)
    if (!user) throw new Error('User not found')
    return user
  },

  create: async (data) => {
    const newUser = { ...data, id: mockUsers.length + 1 }
    mockUsers.push(newUser)
    return newUser
  },

  update: async (id, data) => {
    const index = mockUsers.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    mockUsers[index] = { ...mockUsers[index], ...data }
    return mockUsers[index]
  },

  delete: async (id) => {
    const index = mockUsers.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    mockUsers.splice(index, 1)
  },

  deleteMany: async (ids) => {
    ids.forEach(id => {
      const index = mockUsers.findIndex(u => u.id === id)
      if (index !== -1) mockUsers.splice(index, 1)
    })
  },
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Step 3: Create Your CRUD Page
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Now use the Crud component to build your interface:
          </p>
          <div className="mt-4 rounded-lg border bg-zinc-900 p-4 dark:border-zinc-800">
            <div className="mb-2 text-xs text-zinc-400">app/users/page.tsx</div>
            <pre className="overflow-x-auto">
              <code className="text-sm text-zinc-50">
{`import { Crud } from '@/components/crudkit/crud-table'
import { userSchema } from '@/lib/user-schema'
import { mockDataProvider } from '@/lib/mock-data-provider'

export default function UsersPage() {
  return (
    <div className="container mx-auto p-8">
      <Crud schema={userSchema} dataProvider={mockDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            That's it!
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            You now have a fully functional CRUD interface with:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-600 dark:text-zinc-400">
            <li>✓ List view with sortable columns</li>
            <li>✓ Search and filtering</li>
            <li>✓ Pagination</li>
            <li>✓ Create, edit, and view forms</li>
            <li>✓ Delete and bulk delete operations</li>
            <li>✓ URL state management (shareable links!)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            What's Next?
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <a
              href="/examples/users"
              className="rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                View Full Example
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                See a complete working example with all features
              </p>
            </a>
            <a
              href="/docs"
              className="rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Read the Docs
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Learn about advanced features and customization
              </p>
            </a>
          </div>
        </section>

        <section className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900/30 dark:bg-green-900/10">
          <h3 className="font-semibold text-green-900 dark:text-green-400">
            Need Help?
          </h3>
          <p className="mt-2 text-sm text-green-800 dark:text-green-300">
            Check out the{' '}
            <a
              href="/examples"
              className="font-medium underline hover:no-underline"
            >
              examples page
            </a>{' '}
            for more use cases, or{' '}
            <a
              href="https://github.com/vehler/crudkit/issues"
              className="font-medium underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              open an issue
            </a>{' '}
            on GitHub.
          </p>
        </section>
      </div>
    </DocLayout>
  )
}
