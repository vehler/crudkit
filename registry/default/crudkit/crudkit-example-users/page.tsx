'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { userSchema } from '@/lib/examples/user-schema'
import { mockUsers } from '@/lib/examples/mock-users'

// Create data provider instance
const userDataProvider = new MockDataProvider(mockUsers)

export default function UsersPage() {
  return (
    <div className="container mx-auto">
      <Crud schema={userSchema} dataProvider={userDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['name', 'email', 'role', 'status', 'department']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}
