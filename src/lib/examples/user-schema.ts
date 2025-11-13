import type { Schema } from '@/lib/crudkit/data-provider'

export const userSchema: Schema = {
  title: 'User',
  idField: 'id',
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      sortable: true,
      filterable: false,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      sortable: true,
      filterable: false,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'User' },
        { value: 'guest', label: 'Guest' },
      ],
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
      sortable: true,
      filterable: true,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Support', label: 'Support' },
      ],
      sortable: true,
      filterable: true,
    },
  ],
}
