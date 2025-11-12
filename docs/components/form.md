---
title: Crud.Form Component
description: Dynamic form for creating and editing records based on schema
category: components
order: 5
---

# Crud.Form

The `Crud.Form` component provides a dynamic form interface for creating new records and editing existing ones. It automatically generates form fields based on your schema definition.

## Usage

```tsx
import { Crud } from '@/components/crudkit/crud-table'

<Crud schema={schema} dataProvider={provider}>
  <Crud.List />
  <Crud.Form />
</Crud>
```

## Props

The `Crud.Form` component does not accept props. It automatically adapts based on the current mode (create or edit).

## Features

- **Auto-Generated Fields**: Creates form inputs based on schema fields
- **Field Type Support**: Text, email, select, textarea, number, checkbox
- **Validation**: Built-in validation based on field requirements
- **Error Handling**: Displays validation and submission errors
- **Mode-Aware**: Handles both create and edit operations
- **Cancel Support**: Returns to list view without saving

## Supported Field Types

### Text Input
```tsx
{
  name: 'name',
  type: 'text',
  label: 'Full Name',
  required: true
}
// Renders as: <Input type="text" />
```

### Email Input
```tsx
{
  name: 'email',
  type: 'email',
  label: 'Email Address',
  required: true
}
// Renders as: <Input type="email" />
```

### Select Dropdown
```tsx
{
  name: 'status',
  type: 'select',
  label: 'Status',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]
}
// Renders as: <Select>
```

### Textarea
```tsx
{
  name: 'bio',
  type: 'textarea',
  label: 'Biography'
}
// Renders as: <Textarea />
```

### Number Input
```tsx
{
  name: 'age',
  type: 'number',
  label: 'Age'
}
// Renders as: <Input type="number" />
```

### Checkbox
```tsx
{
  name: 'active',
  type: 'checkbox',
  label: 'Is Active'
}
// Renders as: <Checkbox />
```

## Behavior

### Create Mode
- Triggered by clicking "Create New" in Toolbar
- Shows empty form
- Submit button: "Create"
- Calls `dataProvider.create(data)`

### Edit Mode
- Triggered by clicking "Edit" in List
- Pre-populates form with existing data
- Submit button: "Update"
- Calls `dataProvider.update(id, data)`

### Validation
- Required fields are validated
- Type-specific validation (email format, etc.)
- Displays error messages below fields
- Prevents submission if invalid

## Example

### Basic Form
```tsx
<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.Toolbar />
  <Crud.List />
  <Crud.Form />
</Crud>
```

### Complete CRUD Flow
```tsx
const userSchema = {
  name: 'users',
  title: 'User',
  fields: [
    { name: 'name', type: 'text', label: 'Full Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'User' }
      ]
    },
    { name: 'active', type: 'checkbox', label: 'Active' }
  ]
}

<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.Toolbar />
  <Crud.List />
  <Crud.Form />
</Crud>
```

## Form Actions

### Submit Button
- Text changes based on mode (Create/Update)
- Disabled during submission
- Shows loading state
- Success: Returns to list view
- Error: Displays error message

### Cancel Button
- Discards changes
- Returns to list view
- No confirmation dialog

### Back Button
- Appears at the top of the form
- Returns to list view
- Alternative to Cancel button

## Error Handling

The form handles three types of errors:

1. **Validation Errors**: Field-level errors shown inline
2. **Submission Errors**: Network or server errors shown at top
3. **Data Provider Errors**: Caught and displayed to user

## Styling

The form includes:
- Card-style container
- Proper label/input spacing
- Error message styling
- Responsive button layout
- Loading states

## Related

- [Crud.List](/docs/components/list) - Trigger form from list actions
- [Crud.Toolbar](/docs/components/toolbar) - Trigger create form
- [Schema Definition](/docs/guides/schemas) - Define form fields
- [Data Providers](/docs/guides/data-providers) - Handle form submission
