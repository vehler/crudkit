---
title: Crud Component
description: Main wrapper component that provides context and state management for CRUD operations
category: components
order: 1
---

# Crud

The `Crud` component is the main wrapper that provides context and state management for all CRUD operations. It must wrap all other CRUDKit components.

## Installation

```bash
npx shadcn@latest add https://your-domain.com/registry/crudkit.json
```

## Usage

```tsx
import { Crud } from '@/components/crudkit/crud-table'
import { userSchema } from './schemas/user-schema'
import { userDataProvider } from './providers/user-provider'

export default function UsersPage() {
  return (
    <Crud schema={userSchema} dataProvider={userDataProvider}>
      <Crud.Toolbar />
      <Crud.Filters />
      <Crud.List />
      <Crud.Form />
      <Crud.View />
    </Crud>
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `schema` | `Schema` | Yes | Data schema definition that describes your data structure |
| `dataProvider` | `DataProvider` | Yes | Data provider instance that handles CRUD operations |
| `children` | `ReactNode` | Yes | Child components (Toolbar, Filters, List, Form, View) |

## Features

- **Context Provider**: Provides CRUD state and actions to all child components
- **State Management**: Manages global state for list view, filters, sorting, pagination
- **Mode Switching**: Handles transitions between list, create, edit, and view modes
- **Data Integration**: Connects schema and data provider to child components

## Example with All Sub-components

```tsx
<Crud schema={productSchema} dataProvider={productProvider}>
  {/* Toolbar with create and refresh buttons */}
  <Crud.Toolbar />

  {/* Dynamic filters based on schema */}
  <Crud.Filters />

  {/* Data table with sorting and pagination */}
  <Crud.List />

  {/* Create and edit form */}
  <Crud.Form />

  {/* Read-only detail view */}
  <Crud.View />
</Crud>
```

## State Management

The `Crud` component maintains the following state:

- **mode**: Current view mode (`list`, `create`, `edit`, `view`)
- **selectedId**: ID of the currently selected record
- **data**: Array of records from the data provider
- **filters**: Active filter values
- **search**: Current search query
- **sort**: Current sort configuration
- **pagination**: Page size and current page

## Related

- [Schema Definition](/docs/guides/schemas) - Learn how to define schemas
- [Data Providers](/docs/guides/data-providers) - Understand data providers
- [Crud.Toolbar](/docs/components/toolbar) - Toolbar component
- [Crud.List](/docs/components/list) - List component
