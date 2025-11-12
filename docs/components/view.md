---
title: Crud.View Component
description: Read-only detail view for displaying individual records
category: components
order: 6
---

# Crud.View

The `Crud.View` component provides a read-only detail view for displaying individual records. It's triggered when users click the "View" button in the list.

## Usage

```tsx
import { Crud } from '@/components/crudkit/crud-table'

<Crud schema={schema} dataProvider={provider}>
  <Crud.List />
  <Crud.View />
</Crud>
```

## Props

The `Crud.View` component does not accept props. It automatically displays the currently selected record.

## Features

- **Read-Only Display**: Shows formatted field values without edit capabilities
- **Schema-Based Layout**: Automatically renders all fields from schema
- **Type-Aware Formatting**: Formats values based on field type
- **Action Buttons**: Edit and back navigation
- **Conditional Rendering**: Only visible in view mode

## Field Display

The View component formats fields based on their type:

### Text Fields
```tsx
{ name: 'name', type: 'text', label: 'Name' }
// Displays: Name: John Doe
```

### Boolean Fields
```tsx
{ name: 'active', type: 'checkbox', label: 'Active' }
// Displays: Active: Yes (or No)
```

### Select Fields
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
// Displays: Status: Active (shows label, not value)
```

### Date Fields
```tsx
{ name: 'createdAt', type: 'date', label: 'Created' }
// Displays: Created: January 15, 2025
```

## Behavior

### View Mode Trigger
- Triggered by clicking "View" (👁️) button in List
- Loads record data from data provider
- Switches to view mode

### Navigation
- **Edit Button**: Switches to edit mode for the current record
- **Back Button**: Returns to list view

### Data Loading
- Fetches fresh data when opened
- Shows loading state during fetch
- Handles errors gracefully

## Example

### Basic View
```tsx
<Crud schema={productSchema} dataProvider={productProvider}>
  <Crud.List />
  <Crud.View />
</Crud>
```

### Complete CRUD with View
```tsx
<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.Toolbar />
  <Crud.Filters />
  <Crud.List />
  <Crud.Form />
  <Crud.View />
</Crud>
```

## Layout

The View component uses:
- Card-style container
- Field label/value pairs
- Proper spacing between fields
- Action buttons at the bottom
- Responsive layout

## Actions

### Edit Button
- Switches to edit mode
- Pre-populates form with current data
- Same record ID maintained

### Back Button
- Returns to list view
- Maintains filters and search
- Clears selected record

## Use Cases

### Quick Preview
Users can quickly view record details without opening edit mode:
```tsx
<Crud.List showActions={true} />
<Crud.View />
```

### Read-Only Access
For users with view-only permissions:
```tsx
<Crud.List showActions={false} />
<Crud.View />
// No edit or delete actions available
```

### Audit Trail
Display detailed record information with timestamps:
```tsx
const auditSchema = {
  fields: [
    { name: 'action', type: 'text', label: 'Action' },
    { name: 'user', type: 'text', label: 'User' },
    { name: 'timestamp', type: 'date', label: 'Timestamp' },
    { name: 'details', type: 'textarea', label: 'Details' }
  ]
}

<Crud schema={auditSchema} dataProvider={auditProvider}>
  <Crud.List />
  <Crud.View />
</Crud>
```

## Styling

The view includes:
- Clean, readable layout
- Label/value contrast
- Proper whitespace
- Accessible color scheme
- Responsive design

## Related

- [Crud.List](/docs/components/list) - Trigger view from list actions
- [Crud.Form](/docs/components/form) - Switch to edit mode
- [Schema Definition](/docs/guides/schemas) - Define display fields
- [Data Providers](/docs/guides/data-providers) - Fetch record data
