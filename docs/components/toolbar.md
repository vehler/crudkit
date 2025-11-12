---
title: Crud.Toolbar Component
description: Action bar with create and refresh buttons for managing CRUD operations
category: components
order: 2
---

# Crud.Toolbar

The `Crud.Toolbar` component provides a header with action buttons for creating new records and refreshing the data list.

## Usage

```tsx
import { Crud } from '@/components/crudkit/crud-table'

<Crud schema={schema} dataProvider={provider}>
  <Crud.Toolbar />
  <Crud.List />
</Crud>
```

## Props

The `Crud.Toolbar` component does not accept any props. It automatically uses the schema title and provides standard actions.

## Features

- **Schema-Based Title**: Displays "{schema.title} Management" as the page title
- **Create Button**: Opens the create form when clicked
- **Refresh Button**: Reloads data from the data provider
- **Conditional Rendering**: Only visible in list mode

## Behavior

### Create Button
- Triggers mode change to `create`
- Opens the `Crud.Form` component in create mode
- Button text: "+ Create New"

### Refresh Button
- Calls `dataProvider.getList()` to reload data
- Maintains current filters and sorting
- Button text: "⟳ Refresh"

## Example

```tsx
<Crud schema={productSchema} dataProvider={productProvider}>
  <Crud.Toolbar />
  <Crud.Filters />
  <Crud.List />
  <Crud.Form />
</Crud>
```

## Styling

The toolbar uses these default styles:
- Flexbox layout with space-between alignment
- Heading styled with `text-2xl font-bold`
- Buttons grouped with gap spacing
- Bottom margin for separation from content

## Related

- [Crud Component](/docs/components/crud) - Parent wrapper
- [Crud.List](/docs/components/list) - Data table component
- [Crud.Form](/docs/components/form) - Create/edit form
