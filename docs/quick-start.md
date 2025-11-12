---
title: Quick Start
description: Build your first CRUD table in 5 minutes
---

This guide will walk you through creating a simple user management system with CRUDKit. By the end, you'll have a fully functional CRUD interface with filtering, sorting, and pagination.

## Step 1: Define Your Schema

Create a schema file that describes your data structure:

```typescript title="lib/user-schema.ts"
import { Schema } from '@/lib/crudkit/data-provider'

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
}
```

## Step 2: Create a Data Provider

Implement a data provider to connect to your backend. Here's a mock example:

```typescript title="lib/mock-data-provider.ts"
import { DataProvider } from '@/lib/crudkit/data-provider'

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  // ... more users
]

export const mockDataProvider: DataProvider = {
  getList: async (params) => {
    // Filter, sort, and paginate
    let filtered = [...mockUsers]
    if (params.search) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(params.search.toLowerCase())
      )
    }
    // Sort and paginate...
    return {
      data: filtered.slice(start, end),
      totalCount: filtered.length,
    }
  },
  getOne: async (id) => { /* ... */ },
  create: async (data) => { /* ... */ },
  update: async (id, data) => { /* ... */ },
  delete: async (id) => { /* ... */ },
  deleteMany: async (ids) => { /* ... */ },
}
```

## Step 3: Create Your CRUD Page

Now use the Crud component to build your interface:

```typescript title="app/users/page.tsx"
import { Crud } from '@/components/crudkit/crud-table'
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
}
```

## That's it!

You now have a fully functional CRUD interface with:

- ✓ List view with sortable columns
- ✓ Search and filtering
- ✓ Pagination
- ✓ Create, edit, and view forms
- ✓ Delete and bulk delete operations
- ✓ URL state management (shareable links!)

## What's Next?

**View Full Example**
See a complete working example with all features at [/examples/users](/examples/users)

**Read the Docs**
Learn about advanced features and customization in the [documentation](/docs)

---

**Need Help?**
Check out the [examples page](/examples) for more use cases.
