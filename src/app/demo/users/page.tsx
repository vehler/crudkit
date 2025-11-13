'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/demo/mock-data-provider'
import { userSchema, mockUsers } from '@/lib/demo/schemas/user'
import { UserCell } from './components/user-cell'
import { UserRow } from './components/user-row'

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
          Showcasing avatars, role badges, status indicators, and custom row styling
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Crud schema={userSchema} dataProvider={userDataProvider}>
          <Crud.Toolbar />
          <Crud.Filters />
          <Crud.List
            columns={['name', 'email', 'role', 'status', 'department']}
            components={{
              Cell: UserCell,
              Row: UserRow,
            }}
          />
          <Crud.Form />
          <Crud.View />
        </Crud>
      </div>

      {/* Customization Info */}
      <div className="mt-6 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/30 dark:bg-purple-900/10">
        <h3 className="font-semibold text-purple-900 dark:text-purple-400">
          🎨 Custom Component Renderers
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-purple-800 dark:text-purple-300">
          <li>• <strong>Name:</strong> Avatar with initials generated from full name</li>
          <li>• <strong>Role:</strong> Badge with icons (👑 Admin, 👤 User, 🔓 Guest)</li>
          <li>• <strong>Status:</strong> Animated pulse dot for active users</li>
          <li>• <strong>Department:</strong> Emoji icons for visual identification</li>
          <li>• <strong>Rows:</strong> Blue left border for admins, reduced opacity for inactive users</li>
        </ul>
      </div>

      {/* Code Example */}
      <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Implementation
        </h3>
        <pre className="overflow-x-auto rounded bg-zinc-100 p-3 text-xs dark:bg-zinc-950">
          <code className="text-zinc-800 dark:text-zinc-200">{`<Crud.List
  columns={['name', 'email', 'role', 'status', 'department']}
  components={{
    Cell: UserCell,  // Avatars, badges, and icons
    Row: UserRow,    // Custom row styling & hover effects
  }}
/>`}</code>
        </pre>
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
