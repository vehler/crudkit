---
title: Crud.Filters Component
description: Dynamic filtering interface based on schema field definitions
category: components
order: 3
---

# Crud.Filters

The `Crud.Filters` component provides a dynamic filtering interface that automatically generates filter controls based on your schema's filterable fields.

## Usage

```tsx
import { Crud } from '@/components/crudkit/crud-table'

<Crud schema={schema} dataProvider={provider}>
  <Crud.Toolbar />
  <Crud.Filters />
  <Crud.List />
</Crud>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filterFields` | `Field[]` | No | Override which fields to show. Defaults to all fields with `filterable: true` |

## Features

- **Auto-Generated Filters**: Automatically creates filter controls for filterable fields
- **Field Type Support**: Renders appropriate input types (text, select, etc.)
- **Clear Filters**: Provides a button to reset all filters at once
- **Conditional Rendering**: Only shows if filterable fields exist and in list mode

## Field Types

### Text Fields
```tsx
// Schema field
{ name: 'email', type: 'email', filterable: true }

// Renders as text input for substring matching
```

### Select Fields
```tsx
// Schema field
{
  name: 'status',
  type: 'select',
  filterable: true,
  options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]
}

// Renders as dropdown with "All" option
```

## Example

### Basic Usage
```tsx
<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.Toolbar />
  <Crud.Filters />
  <Crud.List />
</Crud>
```

### Custom Filter Fields
```tsx
<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.Toolbar />
  <Crud.Filters
    filterFields={[
      userSchema.fields.find(f => f.name === 'status'),
      userSchema.fields.find(f => f.name === 'role')
    ]}
  />
  <Crud.List />
</Crud>
```

## Behavior

### Text Input Filters
- Performs case-insensitive substring matching
- Updates immediately on change
- Empty value removes the filter

### Select Filters
- "All" option removes the filter
- Exact match filtering
- Dropdown interface for better UX

### Clear Filters Button
- Resets all active filters
- Maintains current search and sort settings
- Located at the end of the filters row

## Styling

The filters component uses:
- Muted background color
- Padding and rounded corners
- Flexbox layout with wrapping
- Consistent spacing between controls

## Related

- [Crud.List](/docs/components/list) - Works with filters to display results
- [Schema Definition](/docs/guides/schemas) - Define filterable fields
- [Crud.Toolbar](/docs/components/toolbar) - Complementary action bar
