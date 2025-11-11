import type { Schema } from '@/lib/crudkit/data-provider'

export const settingSchema: Schema = {
  title: 'Setting',
  idField: 'id',
  fields: [
    {
      name: 'settingKey',
      label: 'Setting Key',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'settingLabel',
      label: 'Setting Label',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'appearance', label: 'Appearance' },
        { value: 'notifications', label: 'Notifications' },
        { value: 'privacy', label: 'Privacy & Security' },
        { value: 'general', label: 'General' },
        { value: 'account', label: 'Account' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'toggle', label: 'Toggle (Boolean)' },
        { value: 'select', label: 'Select (Dropdown)' },
        { value: 'text', label: 'Text Input' },
        { value: 'number', label: 'Number' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      required: true,
      sortable: false,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      showOnCreate: true,
      showOnEdit: true,
    },
  ],
}
