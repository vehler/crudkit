# API Reference

Complete reference for all customizable components and their prop types.

## Table of Contents

- [Base Props](#base-props)
- [Table Components](#table-components)
- [Form Components](#form-components)
- [View Components](#view-components)
- [Kanban Components](#kanban-components)
- [Filter Components](#filter-components)
- [Toolbar Components](#toolbar-components)

## Base Props

All component props extend `BaseComponentProps`:

```typescript
interface BaseComponentProps<T = any> {
  /** Schema definition */
  schema: Schema

  /** Current CRUD state */
  state: CrudState<T>

  /** Available CRUD actions */
  actions: CrudActions

  /** Optional className override */
  className?: string
}
```

### Schema

```typescript
interface Schema {
  /** Resource name (e.g., "User", "Task") */
  title: string

  /** ID field name (default: "id") */
  idField: string

  /** Field definitions */
  fields: Field[]
}
```

### Field

```typescript
interface Field {
  /** Field name (must match data property) */
  name: string

  /** Display label */
  label: string

  /** Field type */
  type?: 'text' | 'number' | 'select' | 'textarea' | 'date' | 'boolean'

  /** Required validation */
  required?: boolean

  /** Show in create form */
  showOnCreate?: boolean

  /** Show in edit form */
  showOnEdit?: boolean

  /** Enable sorting */
  sortable?: boolean

  /** Enable filtering */
  filterable?: boolean

  /** Select options */
  options?: Array<{ value: string; label: string }>

  /** Field description */
  description?: string
}
```

### CrudState

```typescript
interface CrudState<T = any> {
  /** Current mode */
  mode: 'list' | 'create' | 'edit' | 'view'

  /** Data items */
  data: T[]

  /** Loading state */
  loading: boolean

  /** Error message */
  error: string | null

  /** Currently selected item */
  currentItem: T | null

  /** Selected item ID */
  selectedId: string | null

  /** Selected row IDs */
  selectedRows: string[]

  /** Current page */
  page: number

  /** Items per page */
  pageSize: number

  /** Total item count */
  totalCount: number

  /** Search query */
  search: string

  /** Active filters */
  filters: Record<string, any>

  /** Sort field */
  sortField: string | null

  /** Sort order */
  sortOrder: 'asc' | 'desc'
}
```

### CrudActions

```typescript
interface CrudActions {
  /** Set current mode */
  setMode: (mode: 'list' | 'create' | 'edit' | 'view', id?: string) => void

  /** Save item (create or update) */
  save: (data: any) => Promise<void>

  /** Delete single item */
  delete: (id: string) => Promise<void>

  /** Delete multiple items */
  deleteMany: () => Promise<void>

  /** Refresh data */
  refresh: () => Promise<void>

  /** Set search query */
  setSearch: (query: string) => void

  /** Set filter value */
  setFilter: (field: string, value: any) => void

  /** Clear all filters */
  clearFilters: () => void

  /** Set sort */
  setSort: (field: string) => void

  /** Set page */
  setPage: (page: number) => void

  /** Set page size */
  setPageSize: (size: number) => void

  /** Select rows */
  selectRows: (ids: string[]) => void
}
```

## Table Components

### CrudListProps

```typescript
interface CrudListProps<T = any> {
  /** Visible column names (defaults to all fields) */
  columns?: string[]

  /** Show action buttons column (default: true) */
  showActions?: boolean

  /** Optional className override */
  className?: string

  /** Custom component overrides */
  components?: TableComponents<T>
}
```

### TableComponents

```typescript
interface TableComponents<T = any> {
  /** Custom row component */
  Row?: React.ComponentType<RowProps<T>>

  /** Custom cell component */
  Cell?: React.ComponentType<CellProps<T>>

  /** Custom actions component */
  Actions?: React.ComponentType<ActionsProps<T>>

  /** Custom header component */
  Header?: React.ComponentType<HeaderProps>

  /** Custom empty state component */
  EmptyState?: React.ComponentType<EmptyStateProps>

  /** Custom loading state component */
  LoadingState?: React.ComponentType<LoadingStateProps>
}
```

### RowProps

```typescript
interface RowProps<T = any> extends BaseComponentProps<T> {
  /** Row data */
  row: T

  /** Row index */
  index: number

  /** Is row selected */
  selected: boolean

  /** Selection callback */
  onSelect: (checked: boolean) => void

  /** View callback */
  onView: () => void

  /** Edit callback */
  onEdit: () => void

  /** Delete callback */
  onDelete: () => void

  /** Visible columns */
  visibleColumns: string[]

  /** Show actions column */
  showActions: boolean

  /** Cell component to use */
  CellComponent: React.ComponentType<CellProps<T>>

  /** Actions component to use */
  ActionsComponent: React.ComponentType<ActionsProps<T>>
}
```

### CellProps

```typescript
interface CellProps<T = any> extends BaseComponentProps<T> {
  /** Cell value */
  value: any

  /** Row data */
  row: T

  /** Field definition */
  field: Field

  /** Column name */
  column: string
}
```

### ActionsProps

```typescript
interface ActionsProps<T = any> extends BaseComponentProps<T> {
  /** Row data */
  row: T

  /** View callback */
  onView: () => void

  /** Edit callback */
  onEdit: () => void

  /** Delete callback */
  onDelete: () => void
}
```

### HeaderProps

```typescript
interface HeaderProps extends BaseComponentProps {
  /** Field definition */
  field: Field

  /** Is sortable */
  sortable: boolean

  /** Current sort state */
  currentSort: { field: string; order: 'asc' | 'desc' } | null

  /** Sort callback */
  onSort: (field: string) => void
}
```

### EmptyStateProps

```typescript
interface EmptyStateProps extends BaseComponentProps {
  /** Are filters active */
  hasFilters: boolean

  /** Clear filters callback */
  onClearFilters: () => void
}
```

### LoadingStateProps

```typescript
interface LoadingStateProps extends BaseComponentProps {
  /** Number of skeleton rows to show */
  rowCount: number
}
```

## Form Components

### CrudFormProps

```typescript
interface CrudFormProps {
  /** Fields to display (defaults to all) */
  fields?: Field[]

  /** Optional className override */
  className?: string

  /** Custom component overrides */
  components?: FormComponents
}
```

### FormComponents

```typescript
interface FormComponents {
  /** Custom field component (applies to all fields) */
  Field?: React.ComponentType<FieldProps>

  /** Custom form layout component */
  Layout?: React.ComponentType<FormLayoutProps>

  /** Custom submit button component */
  SubmitButton?: React.ComponentType<SubmitButtonProps>

  /** Field-specific overrides (by field name) */
  fields?: Record<string, React.ComponentType<FieldProps>>
}
```

### FieldProps

```typescript
interface FieldProps extends BaseComponentProps {
  /** Field definition */
  field: Field

  /** Current value */
  value: any

  /** Validation error */
  error?: string

  /** Change callback */
  onChange: (value: any) => void

  /** Blur callback */
  onBlur?: () => void

  /** Is disabled */
  disabled: boolean

  /** Current mode */
  mode: 'create' | 'edit'
}
```

### FormLayoutProps

```typescript
interface FormLayoutProps extends BaseComponentProps {
  /** Form fields */
  children: React.ReactNode

  /** Form title */
  title: string

  /** Form error */
  error: string | null

  /** Submit callback */
  onSubmit: (e: React.FormEvent) => void

  /** Cancel callback */
  onCancel: () => void

  /** Is submitting */
  isSubmitting: boolean

  /** Current mode */
  mode: 'create' | 'edit'
}
```

### SubmitButtonProps

```typescript
interface SubmitButtonProps extends BaseComponentProps {
  /** Is submitting */
  isSubmitting: boolean

  /** Current mode */
  mode: 'create' | 'edit'
}
```

## View Components

### CrudViewProps

```typescript
interface CrudViewProps<T = any> {
  /** Optional className override */
  className?: string

  /** Custom component overrides */
  components?: ViewComponents<T>
}
```

### ViewComponents

```typescript
interface ViewComponents<T = any> {
  /** Custom field display component (applies to all fields) */
  Field?: React.ComponentType<ViewFieldProps<T>>

  /** Custom view layout component */
  Layout?: React.ComponentType<ViewLayoutProps<T>>

  /** Field-specific overrides (by field name) */
  fields?: Record<string, React.ComponentType<ViewFieldProps<T>>>
}
```

### ViewFieldProps

```typescript
interface ViewFieldProps<T = any> extends BaseComponentProps<T> {
  /** Field definition */
  field: Field

  /** Field value */
  value: any

  /** Complete item data */
  item: T
}
```

### ViewLayoutProps

```typescript
interface ViewLayoutProps<T = any> extends BaseComponentProps<T> {
  /** View fields */
  children: React.ReactNode

  /** Item data */
  item: T

  /** Edit callback */
  onEdit: () => void

  /** Back to list callback */
  onBack: () => void
}
```

## Kanban Components

### KanbanBoardProps

```typescript
interface KanbanBoardProps<T = any> {
  /** Field to group by */
  groupBy: string

  /** Column values */
  columns: string[]

  /** Column labels (optional) */
  columnLabels?: Record<string, string>

  /** Optional className override */
  className?: string

  /** Custom component overrides */
  components?: KanbanComponents<T>
}
```

### KanbanComponents

```typescript
interface KanbanComponents<T = any> {
  /** Custom card component */
  Card?: React.ComponentType<CardProps<T>>

  /** Custom column header component */
  ColumnHeader?: React.ComponentType<ColumnHeaderProps>

  /** Custom empty column component */
  EmptyColumn?: React.ComponentType<EmptyColumnProps>
}
```

### CardProps

```typescript
interface CardProps<T = any> extends BaseComponentProps<T> {
  /** Card item data */
  item: T

  /** Column value */
  column: string

  /** View callback */
  onView: () => void

  /** Edit callback */
  onEdit: () => void

  /** Is being dragged */
  isDragging: boolean
}
```

### ColumnHeaderProps

```typescript
interface ColumnHeaderProps extends BaseComponentProps {
  /** Column value */
  column: string

  /** Column label */
  label: string

  /** Number of items in column */
  count: number
}
```

### EmptyColumnProps

```typescript
interface EmptyColumnProps extends BaseComponentProps {
  /** Column value */
  column: string

  /** Column label */
  label: string
}
```

## Filter Components

### CrudFiltersProps

```typescript
interface CrudFiltersProps {
  /** Fields to show filters for (defaults to filterable fields) */
  filterFields?: Field[]

  /** Optional className override */
  className?: string

  /** Custom component overrides */
  components?: FilterComponents
}
```

### FilterComponents

```typescript
interface FilterComponents {
  /** Custom filter component (applies to all filters) */
  Filter?: React.ComponentType<FilterProps>

  /** Custom filter input component */
  FilterInput?: React.ComponentType<FilterInputProps>

  /** Custom filter layout component */
  Layout?: React.ComponentType<FilterLayoutProps>

  /** Filter-specific overrides (by field name) */
  filters?: Record<string, React.ComponentType<FilterProps>>
}
```

### FilterProps

```typescript
interface FilterProps extends BaseComponentProps {
  /** The field to filter by */
  field: Field

  /** Current filter value */
  value: string

  /** Callback when filter value changes */
  onChange: (value: string) => void

  /** Callback to clear this filter */
  onClear: () => void
}
```

### FilterInputProps

```typescript
interface FilterInputProps extends BaseComponentProps {
  /** The field to filter by */
  field: Field

  /** Current filter value */
  value: string

  /** Callback when filter value changes */
  onChange: (value: string) => void
}
```

### FilterLayoutProps

```typescript
interface FilterLayoutProps extends BaseComponentProps {
  /** The child filter components */
  children: React.ReactNode

  /** Callback to clear all filters */
  onClearFilters: () => void

  /** Whether there are any active filters */
  hasActiveFilters: boolean
}
```

## Toolbar Components

### Toolbar (Compound Component)

```typescript
<Crud.Toolbar>
  <Crud.Toolbar.Title />
  <Crud.Toolbar.CreateButton />
  <Crud.Toolbar.RefreshButton />
</Crud.Toolbar>
```

### ToolbarProps

```typescript
interface ToolbarProps extends BaseComponentProps {
  /** Toolbar content */
  children?: React.ReactNode
}
```

### ToolbarTitleProps

```typescript
interface ToolbarTitleProps {
  /** Optional className override */
  className?: string

  /** Optional children (overrides schema title) */
  children?: React.ReactNode
}
```

### ToolbarCreateButtonProps

```typescript
interface ToolbarCreateButtonProps {
  /** Replace button with child (keeps functionality) */
  asChild?: boolean

  /** Optional className override */
  className?: string

  /** Optional children (overrides default text) */
  children?: React.ReactNode

  /** Optional click handler (called before setMode) */
  onClick?: () => void
}
```

### ToolbarRefreshButtonProps

```typescript
interface ToolbarRefreshButtonProps {
  /** Replace button with child (keeps functionality) */
  asChild?: boolean

  /** Optional className override */
  className?: string

  /** Optional children (overrides default text) */
  children?: React.ReactNode

  /** Optional click handler (called before refresh) */
  onClick?: () => void
}
```

## Default Component Exports

All default components are exported for extension:

### Table Defaults

```typescript
import {
  DefaultRow,
  DefaultCell,
  DefaultActions,
  DefaultHeader,
  DefaultEmptyState,
  DefaultLoadingState,
} from '@/registry/default/crudkit/crudkit/components/table'
```

### Form Defaults

```typescript
import {
  DefaultField,
  DefaultFormLayout,
  DefaultSubmitButton,
} from '@/registry/default/crudkit/crudkit/components/form'
```

### View Defaults

```typescript
import {
  DefaultViewField,
  DefaultViewLayout,
} from '@/registry/default/crudkit/crudkit/components/view'
```

### Kanban Defaults

```typescript
import {
  DefaultKanbanCard,
  DefaultColumnHeader,
  DefaultEmptyColumn,
} from '@/registry/default/crudkit/crudkit-kanban/components/kanban'
```

### Filter Defaults

```typescript
import {
  DefaultFilter,
  DefaultFilterInput,
  DefaultFilterLayout,
} from '@/registry/default/crudkit/crudkit/components/filters'
```

## Usage Examples

### Example 1: Type-Safe Custom Cell

```typescript
import type { CellProps } from '@/registry/default/crudkit/crudkit/lib/component-types'
import { DefaultCell } from '@/registry/default/crudkit/crudkit/components/table'

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

const PriceCell: React.FC<CellProps<Product>> = (props) => {
  const { field, value, row } = props

  if (field.name === 'price') {
    return (
      <td className="font-semibold">
        ${Number(value).toFixed(2)}
      </td>
    )
  }

  return <DefaultCell {...props} />
}

// Usage
<Crud.List<Product> components={{ Cell: PriceCell }} />
```

### Example 2: Custom Form Field

```typescript
import type { FieldProps } from '@/registry/default/crudkit/crudkit/lib/component-types'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const ToggleField: React.FC<FieldProps> = ({
  field,
  value,
  onChange,
  disabled,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <Label htmlFor={`form-${field.name}`}>
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Switch
          id={`form-${field.name}`}
          checked={Boolean(value)}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

// Usage
<Crud.Form
  components={{
    fields: {
      published: ToggleField,
    },
  }}
/>
```

### Example 3: Custom Kanban Card

```typescript
import type { CardProps } from '@/registry/default/crudkit/crudkit/lib/component-types'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Task {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
}

const PriorityCard: React.FC<CardProps<Task>> = ({
  item,
  onView,
  isDragging,
}) => {
  const priorityColors = {
    low: 'secondary',
    medium: 'default',
    high: 'destructive',
  } as const

  return (
    <Card
      onClick={onView}
      className={isDragging ? 'opacity-50' : 'cursor-pointer hover:shadow-md'}
    >
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold">{item.title}</h4>
          <Badge variant={priorityColors[item.priority]}>
            {item.priority}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  )
}

// Usage
<KanbanBoard<Task>
  groupBy="status"
  columns={['todo', 'done']}
  components={{ Card: PriorityCard }}
/>
```

## Type Inference

TypeScript will automatically infer types when you use generics:

```typescript
interface User {
  id: string
  name: string
  email: string
}

// Type is automatically inferred
<Crud.List<User>
  components={{
    Cell: (props) => {
      // props.row is typed as User
      // Full autocomplete available
    },
  }}
/>
```

## See Also

- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Comprehensive customization guide
- [examples/](./examples) - 40+ working examples
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Quick start guide
