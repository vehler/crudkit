'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/demo/mock-data-provider'
import { LiveDemoCell } from './live-demo-cell'
import type { Schema } from '@/lib/crudkit/data-provider'

interface DemoUser {
  id: string
  name: string
  email: string
  role: string
  status: string
}

const mockUsers: DemoUser[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
]

const demoSchema: Schema = {
  title: 'User',
  idField: 'id',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, sortable: true },
    { name: 'email', label: 'Email', type: 'email', required: true, sortable: true },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
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
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
  ],
}

const demoDataProvider = new MockDataProvider(mockUsers)

export function LiveDemo() {

  return (
    <section className="bg-white py-24 dark:bg-zinc-900 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            See it in action
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A fully functional CRUD system with custom component renderers, filtering, and actions
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="rounded-lg border bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Crud schema={demoSchema} dataProvider={demoDataProvider}>
              <Crud.Toolbar />
              <Crud.Filters />
              <Crud.List
                columns={['name', 'email', 'role', 'status']}
                components={{
                  Cell: LiveDemoCell,
                }}
              />
              <Crud.Form />
              <Crud.View />
            </Crud>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/demo/users"
              className="inline-flex items-center text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-50"
            >
              View more demo examples
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
