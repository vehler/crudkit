import type { Schema } from '@/lib/crudkit/data-provider'

export const taskSchema: Schema = {
  title: 'Task',
  idField: 'id',
  fields: [
    {
      name: 'title',
      label: 'Task Title',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'todo', label: 'To Do' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
      ],
      required: true,
      filterable: true,
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
      required: true,
      filterable: true,
    },
    {
      name: 'assignee',
      label: 'Assignee',
      type: 'text',
      required: false,
      filterable: true,
    },
  ],
}
