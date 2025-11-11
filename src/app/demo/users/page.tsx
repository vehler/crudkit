'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/demo/mock-data-provider'
import { userSchema, mockUsers } from '@/lib/demo/schemas/user'

// Force dynamic rendering for this page (uses URL state)
export const dynamic = 'force-dynamic'

// Create data provider instance
const userDataProvider = new MockDataProvider(mockUsers)

export default function UsersDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          User Management Demo
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Interactive demo showing all CRUD operations: List, View, Create, Update, and Delete
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Crud schema={userSchema} dataProvider={userDataProvider}>
          <Crud.Toolbar />
          <Crud.Filters />
          <Crud.List columns={['name', 'email', 'role', 'status', 'department']} />
          <Crud.Form />
          <Crud.View />
        </Crud>
      </div>

      {/* Instructions */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
        <h3 className="font-semibold text-blue-900 dark:text-blue-400">
          Try it out!
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
          <li>• Click "Create New" to add a user</li>
          <li>• Click the eye icon to view user details</li>
          <li>• Click the pencil icon to edit a user</li>
          <li>• Click the trash icon to delete a user</li>
          <li>• Use filters and search to find specific users</li>
          <li>• Sort columns by clicking on headers</li>
        </ul>
      </div>
    </div>
  )
}
