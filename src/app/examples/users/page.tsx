'use client'

import { Crud } from '@/components/crudkit'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { userSchema } from '@/lib/examples/user-schema'
import { mockUsers } from '@/lib/examples/mock-users'
import { UserCell } from './components/user-cell'
import { UserRow } from './components/user-row'

// Force dynamic rendering for this page (uses URL state)
export const dynamic = 'force-dynamic'

// Create data provider instance
const userDataProvider = new MockDataProvider(mockUsers)

export default function UsersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">User Management</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Manage users with avatars, role badges, and status indicators
      </p>

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
  )
}
