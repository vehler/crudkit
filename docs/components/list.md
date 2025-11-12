---
title: Crud.List Component
description: Data table with search, sorting, pagination, and row actions
category: components
order: 4
---

# Crud.List

The `Crud.List` component renders a fully-featured data table with search, sorting, pagination, and row-level actions.

## Usage

```tsx
import { Crud } from '@/components/crudkit/crud-table'

<Crud schema={schema} dataProvider={provider}>
  <Crud.Toolbar />
  <Crud.List />
</Crud>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `columns` | `string[]` | No | All fields | Specify which columns to display |
| `showActions` | `boolean` | No | `true` | Show/hide action buttons column |

## Features

- **Search Bar**: Global text search across all fields
- **Sortable Columns**: Click headers to sort (supports asc/desc)
- **Pagination**: Page through large datasets
- **Row Actions**: View, edit, and delete buttons for each row
- **Loading States**: Skeleton loaders during data fetching
- **Empty States**: Helpful messages when no data exists

## Search

The search bar provides:
- Real-time search as you type
- Searches across all text fields
- Case-insensitive matching
- Clear button to reset search

```tsx
// Search is included by default
<Crud.List />
```

## Sorting

Click any column header to sort:
- First click: Ascending order
- Second click: Descending order
- Third click: Remove sorting
- Visual indicator (▲/▼) shows current sort

## Pagination

Automatic pagination controls:
- Previous/Next buttons
- Page number display
- Configurable page size (default: 10)
- Total count display

## Row Actions

Each row includes action buttons:
- **View** (👁️): Opens read-only detail view
- **Edit** (✏️): Opens edit form
- **Delete** (🗑️): Shows confirmation, then deletes record

## Example

### Basic Usage
```tsx
<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.List />
</Crud>
```

### Custom Columns
```tsx
<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.List
    columns={['name', 'email', 'role', 'status']}
  />
</Crud>
```

### Without Actions
```tsx
<Crud schema={userSchema} dataProvider={userProvider}>
  <Crud.List
    showActions={false}
  />
</Crud>
```

## Field Rendering

The List component automatically formats fields based on their type:

### Boolean Fields
```tsx
// Renders as Badge
true  → <Badge variant="default">Yes</Badge>
false → <Badge variant="secondary">No</Badge>
```

### Select Fields
```tsx
// Shows the label from options
value: 'active'
// Displays: "Active" (from options array)
```

### Date Fields
```tsx
// Formats as locale date string
'2025-01-15' → "1/15/2025"
```

## Loading States

Shows skeleton loaders while fetching:
- Table structure preserved
- Shimmer effect on placeholder rows
- Smooth transition to actual data

## Empty States

Displays helpful messages:
- "No records found" - when data is empty
- "No results match your search" - when search returns nothing
- Suggestion to clear filters/search

## Related

- [Crud.Filters](/docs/components/filters) - Filter data before display
- [Crud.Form](/docs/components/form) - Edit records from list actions
- [Crud.View](/docs/components/view) - View record details
- [Schema Definition](/docs/guides/schemas) - Define table columns
