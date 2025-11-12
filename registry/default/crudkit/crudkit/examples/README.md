# CrudKit Component Customization Examples

This directory contains comprehensive examples demonstrating how to customize CrudKit components using the `components` prop pattern.

## 📁 Files Overview

### Table Components
- **`table-custom-cell.tsx`** - Custom cell renderers for status badges, avatars, dates
- **`table-custom-row-actions.tsx`** - Custom row styling and dropdown/compact action buttons
- **`table-empty-loading-states.tsx`** - Custom empty states and loading indicators

### Form Components
- **`form-custom-fields.tsx`** - Custom field components (rich text, image upload, rating, toggle, tags)
- **`form-custom-layouts.tsx`** - Custom form layouts (card, two-column, tabbed, horizontal)

### View, Kanban, and Filter Components
- **`view-kanban-filter-examples.tsx`** - Custom view layouts, kanban cards, and filter components

### Toolbar and asChild Pattern
- **`toolbar-aschild-examples.tsx`** - Toolbar customization and asChild pattern for routing integration

### Comprehensive Example
- **`comprehensive-example.tsx`** - Full application combining multiple customization patterns

## 🚀 Quick Start

### Basic Component Override

```typescript
import { Crud } from '@/registry/default/crudkit/crudkit/components/crud-table'
import { Badge } from '@/components/ui/badge'
import { DefaultCell } from '@/registry/default/crudkit/crudkit/components/table'
import type { CellProps } from '@/registry/default/crudkit/crudkit/lib/component-types'

// Custom cell component
const StatusCell: React.FC<CellProps> = (props) => {
  if (props.field.name === 'status') {
    return (
      <td className="px-4 py-2">
        <Badge>{props.value}</Badge>
      </td>
    )
  }
  return <DefaultCell {...props} />
}

// Use in your application
function App() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.List components={{ Cell: StatusCell }} />
    </Crud>
  )
}
```

### Field-Specific Override

```typescript
import { Crud } from '@/registry/default/crudkit/crudkit/components/crud-table'
import { Switch } from '@/components/ui/switch'
import type { FieldProps } from '@/registry/default/crudkit/crudkit/lib/component-types'

const ToggleField: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div>
    <label>{field.label}</label>
    <Switch checked={Boolean(value)} onCheckedChange={onChange} />
  </div>
)

function App() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Form
        components={{
          fields: {
            published: ToggleField, // Override only 'published' field
          },
        }}
      />
    </Crud>
  )
}
```

### asChild Pattern (Routing Integration)

```typescript
import { Crud } from '@/registry/default/crudkit/crudkit/components/crud-table'
import Link from 'next/link'
import { Plus } from 'lucide-react'

function App() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <Crud.Toolbar.CreateButton asChild>
          <Link href="/tasks/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Link>
        </Crud.Toolbar.CreateButton>
      </Crud.Toolbar>
    </Crud>
  )
}
```

## 📚 Component Types

All component prop types are available in:
```typescript
import type {
  CellProps,
  RowProps,
  ActionsProps,
  HeaderProps,
  EmptyStateProps,
  LoadingStateProps,
  FieldProps,
  FormLayoutProps,
  SubmitButtonProps,
  ViewFieldProps,
  ViewLayoutProps,
  CardProps,
  FilterProps,
  FilterInputProps,
  FilterLayoutProps,
} from '@/registry/default/crudkit/crudkit/lib/component-types'
```

## 🎨 Available Component Override Props

### Crud.List
```typescript
components={{
  Row: CustomRow,
  Cell: CustomCell,
  Actions: CustomActions,
  Header: CustomHeader,
  EmptyState: CustomEmptyState,
  LoadingState: CustomLoadingState,
}}
```

### Crud.Form
```typescript
components={{
  Field: CustomField,              // Global field override
  Layout: CustomFormLayout,
  SubmitButton: CustomSubmitButton,
  fields: {
    email: EmailField,             // Field-specific overrides
    avatar: ImageUploadField,
  },
}}
```

### Crud.View
```typescript
components={{
  Field: CustomViewField,          // Global field override
  Layout: CustomViewLayout,
  fields: {
    avatar: AvatarDisplay,         // Field-specific overrides
    createdAt: DateDisplay,
  },
}}
```

### KanbanBoard
```typescript
components={{
  Card: CustomKanbanCard,
  ColumnHeader: CustomColumnHeader,
  EmptyColumn: CustomEmptyColumn,
}}
```

### Crud.Filters
```typescript
components={{
  Filter: CustomFilter,            // Global filter override
  FilterInput: CustomFilterInput,
  Layout: CustomFilterLayout,
  filters: {
    createdAt: DateRangeFilter,    // Filter-specific overrides
    tags: MultiSelectFilter,
  },
}}
```

### Crud.Toolbar (Compound Components)
```typescript
<Crud.Toolbar>
  <Crud.Toolbar.Title />
  <Crud.Toolbar.CreateButton asChild>
    <Link href="/new">Create</Link>
  </Crud.Toolbar.CreateButton>
  <Crud.Toolbar.RefreshButton />
</Crud.Toolbar>
```

## 💡 Pattern Guidelines

1. **Always provide TypeScript types**: Use the exported prop types for full type safety
2. **Use React.forwardRef**: If you need ref support, wrap your component with `React.forwardRef`
3. **Fallback to defaults**: For partial customizations, render `DefaultComponent` for fields you don't want to customize
4. **Field-specific > Global**: Field-specific overrides take precedence over global component overrides
5. **asChild pattern**: Use `asChild` prop to replace the component while keeping its styles (e.g., for routing)

## 🔧 Customization Levels

From least to most customized:

1. **Default behavior** - Use components without any `components` prop
2. **Single component override** - Override one component (e.g., just `Cell`)
3. **Multiple overrides** - Override several components
4. **Field-specific overrides** - Override specific fields only
5. **Complete customization** - Replace all components with custom implementations

## 📖 Further Reading

- See `component-types.ts` for complete TypeScript definitions
- See `comprehensive-example.tsx` for a full application example
- Check individual example files for specific use cases

## 🤝 Contributing

When adding new examples:
- Include TypeScript types
- Provide JSDoc comments
- Show both simple and advanced usage
- Include mock schema/provider for testing
