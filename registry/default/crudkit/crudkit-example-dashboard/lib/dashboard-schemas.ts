import type { Schema } from '@/lib/crudkit/data-provider'

// Simple user activity schema for recent activity widget
export const activitySchema: Schema = {
  title: 'Recent Activity',
  idField: 'id',
  fields: [
    {
      name: 'user',
      label: 'User',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'action',
      label: 'Action',
      type: 'select',
      options: [
        { value: 'login', label: 'Login' },
        { value: 'logout', label: 'Logout' },
        { value: 'create', label: 'Created' },
        { value: 'update', label: 'Updated' },
        { value: 'delete', label: 'Deleted' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'resource',
      label: 'Resource',
      type: 'text',
      sortable: true,
    },
    {
      name: 'timestamp',
      label: 'Timestamp',
      type: 'datetime-local',
      required: true,
      sortable: true,
    },
  ],
}

// Simple metrics schema for key metrics widget
export const metricSchema: Schema = {
  title: 'Key Metrics',
  idField: 'id',
  fields: [
    {
      name: 'name',
      label: 'Metric Name',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'value',
      label: 'Value',
      type: 'number',
      required: true,
      sortable: true,
    },
    {
      name: 'unit',
      label: 'Unit',
      type: 'text',
      sortable: true,
    },
    {
      name: 'trend',
      label: 'Trend',
      type: 'select',
      options: [
        { value: 'up', label: '↑ Up' },
        { value: 'down', label: '↓ Down' },
        { value: 'stable', label: '→ Stable' },
      ],
      filterable: true,
      sortable: true,
    },
  ],
}

// Quick task schema for tasks widget
export const quickTaskSchema: Schema = {
  title: 'Quick Tasks',
  idField: 'id',
  fields: [
    {
      name: 'task',
      label: 'Task',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
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
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'dueDate',
      label: 'Due Date',
      type: 'date',
      sortable: true,
    },
  ],
}
