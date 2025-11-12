# Component Customization Guide

CrudKit provides a powerful and flexible component customization system that allows you to override any part of the UI while maintaining full type safety and functionality.

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Customization Patterns](#customization-patterns)
- [Component Categories](#component-categories)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)

## Overview

### The `components` Prop Pattern

CrudKit uses the industry-standard `components` prop pattern (similar to TanStack Table, Material UI, and other major libraries) to allow component customization:

```typescript
<Crud.List
  components={{
    Cell: CustomCell,
    Row: CustomRow,
    Actions: CustomActions,
  }}
/>
```

### Key Features

✅ **Type-Safe**: Full TypeScript support with auto-inferred generics
✅ **Flexible**: Override globally or per-field
✅ **Composable**: Combine multiple customizations
✅ **Plug-and-Play**: Use defaults, customize only what you need
✅ **Router-Ready**: `asChild` pattern for routing integration
✅ **Zero Config**: Works immediately with sensible defaults

## Core Concepts

### 1. Default Components

Every customizable part has a default component that you can extend or replace:

```typescript
import { DefaultCell } from '@/registry/default/crudkit/crudkit/components/table'

const CustomCell: React.FC<CellProps> = (props) => {
  // Custom logic for specific fields
  if (props.field.name === 'status') {
    return <td><Badge>{props.value}</Badge></td>
  }

  // Fall back to default for other fields
  return <DefaultCell {...props} />
}
```

### 2. Component Props

All component props extend `BaseComponentProps`:

```typescript
interface BaseComponentProps<T = any> {
  schema: Schema        // Schema definition
  state: CrudState<T>   // Current CRUD state
  actions: CrudActions  // Available actions
  className?: string    // Optional className override
}
```

This gives every custom component access to schema, state, and actions.

### 3. Generic Type Support

Use generics for type-safe component props:

```typescript
interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
}

const UserCell: React.FC<CellProps<User>> = ({ value, row, field }) => {
  // row is typed as User
  // Full autocomplete and type checking
}

<Crud.List<User> components={{ Cell: UserCell }} />
```

### 4. Field-Specific Overrides

Override individual fields instead of all instances:

```typescript
<Crud.Form
  components={{
    fields: {
      avatar: ImageUploadField,    // Only 'avatar' field
      bio: RichTextEditor,          // Only 'bio' field
      // All other fields use default
    },
  }}
/>
```

### 5. asChild Pattern

Replace a component while keeping its functionality:

```typescript
import Link from 'next/link'

<Crud.Toolbar.CreateButton asChild>
  <Link href="/tasks/new">
    <Plus className="h-4 w-4 mr-2" />
    Create Task
  </Link>
</Crud.Toolbar.CreateButton>
```

The Link component receives all the Button's props (onClick, className, etc.) via `@radix-ui/react-slot`.

## Customization Patterns

### Pattern 1: Conditional Rendering

Handle specific cases, delegate to default:

```typescript
const SmartCell: React.FC<CellProps> = (props) => {
  const { field, value } = props

  // Custom rendering for status
  if (field.name === 'status') {
    return <td><Badge variant={value}>{value}</Badge></td>
  }

  // Custom rendering for dates
  if (field.type === 'date') {
    return <td>{new Date(value).toLocaleDateString()}</td>
  }

  // Default for everything else
  return <DefaultCell {...props} />
}
```

### Pattern 2: Wrapper/Enhancement

Wrap default component with additional functionality:

```typescript
const EnhancedRow: React.FC<RowProps<Task>> = (props) => {
  const { row } = props
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DefaultRow {...props} />
      {isHovered && <QuickActionMenu task={row} />}
    </div>
  )
}
```

### Pattern 3: Complete Replacement

Replace component entirely:

```typescript
const CustomFormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel} variant="outline">Cancel</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
```

### Pattern 4: Composition

Combine multiple custom components:

```typescript
<Crud schema={schema} dataProvider={provider}>
  <Crud.Toolbar>
    <Crud.Toolbar.Title />
    <CustomSearchBar />
    <CustomFilterToggle />
    <Crud.Toolbar.CreateButton />
  </Crud.Toolbar>

  <Crud.List
    components={{
      Cell: SmartCell,
      Actions: DropdownActions,
      EmptyState: IllustratedEmptyState,
    }}
  />
</Crud>
```

## Component Categories

### Table Components

**Override all instances:**
```typescript
<Crud.List components={{ Cell: CustomCell }} />
```

**Available components:**
- `Row` - Table row wrapper
- `Cell` - Individual cell rendering
- `Actions` - Action buttons column
- `Header` - Column header with sorting
- `EmptyState` - No data display
- `LoadingState` - Loading skeleton

**Common use cases:**
- Custom cell renderers (badges, avatars, formatting)
- Row styling based on data
- Dropdown action menus
- Custom empty/loading states

### Form Components

**Override globally:**
```typescript
<Crud.Form components={{ Field: CustomField }} />
```

**Override per-field:**
```typescript
<Crud.Form
  components={{
    fields: {
      description: RichTextEditor,
      published: ToggleField,
    },
  }}
/>
```

**Available components:**
- `Field` - Form field wrapper (global)
- `Layout` - Form container and structure
- `SubmitButton` - Submit button
- `fields` - Per-field overrides (object)

**Common use cases:**
- Rich text editors
- Image/file uploads
- Date pickers
- Toggle switches
- Custom layouts (card, tabbed, two-column)

### View Components

**Override globally:**
```typescript
<Crud.View components={{ Field: CustomViewField }} />
```

**Override per-field:**
```typescript
<Crud.View
  components={{
    fields: {
      avatar: AvatarDisplay,
      tags: TagsDisplay,
    },
  }}
/>
```

**Available components:**
- `Field` - View field display (global)
- `Layout` - View container
- `fields` - Per-field overrides (object)

**Common use cases:**
- Icon-based field display
- Card layouts
- Two-column layouts
- Custom field formatting

### Kanban Components

```typescript
<KanbanBoard
  groupBy="status"
  columns={['todo', 'in-progress', 'done']}
  components={{
    Card: CustomKanbanCard,
    ColumnHeader: CustomColumnHeader,
    EmptyColumn: CustomEmptyColumn,
  }}
/>
```

**Available components:**
- `Card` - Kanban card
- `ColumnHeader` - Column header
- `EmptyColumn` - Empty column state

**Common use cases:**
- Priority-based styling
- Avatar display
- Minimalist cards
- Custom headers with counts

### Filter Components

**Override globally:**
```typescript
<Crud.Filters components={{ Filter: CustomFilter }} />
```

**Override per-filter:**
```typescript
<Crud.Filters
  components={{
    filters: {
      createdAt: DateRangeFilter,
      tags: MultiSelectFilter,
    },
  }}
/>
```

**Available components:**
- `Filter` - Filter wrapper (global)
- `FilterInput` - Input element
- `Layout` - Filters container
- `filters` - Per-filter overrides (object)

**Common use cases:**
- Date range pickers
- Multi-select filters
- Custom filter layouts

### Toolbar Components (Compound)

```typescript
<Crud.Toolbar>
  <Crud.Toolbar.Title />
  <CustomSearchBar />
  <Crud.Toolbar.CreateButton asChild>
    <Link href="/new">Create</Link>
  </Crud.Toolbar.CreateButton>
  <Crud.Toolbar.RefreshButton />
</Crud.Toolbar>
```

**Available components:**
- `Crud.Toolbar.Title` - Schema title display
- `Crud.Toolbar.CreateButton` - Create button (supports asChild)
- `Crud.Toolbar.RefreshButton` - Refresh button (supports asChild)

**Common use cases:**
- Router integration (Next.js, React Router)
- Custom search bars
- Additional action buttons
- Stats display

## Best Practices

### 1. Type Everything

```typescript
// ✅ Good
const CustomCell: React.FC<CellProps<User>> = (props) => { ... }

// ❌ Bad
const CustomCell = (props: any) => { ... }
```

### 2. Use Defaults for Fallback

```typescript
// ✅ Good - handles specific cases, delegates rest
const CustomCell: React.FC<CellProps> = (props) => {
  if (props.field.name === 'status') {
    return <StatusBadge value={props.value} />
  }
  return <DefaultCell {...props} />
}

// ❌ Bad - reimplements everything
const CustomCell: React.FC<CellProps> = (props) => {
  return <td>{props.value}</td>
}
```

### 3. Prefer Field-Specific Over Global

```typescript
// ✅ Good - only override what's needed
<Crud.Form
  components={{
    fields: {
      avatar: ImageUploadField,
    },
  }}
/>

// ❌ Less efficient - checks every field
<Crud.Form
  components={{
    Field: (props) => {
      if (props.field.name === 'avatar') {
        return <ImageUploadField {...props} />
      }
      return <DefaultField {...props} />
    },
  }}
/>
```

### 4. Use React.forwardRef for Refs

```typescript
export const CustomCell = React.forwardRef<HTMLTableCellElement, CellProps>(
  (props, ref) => {
    return <td ref={ref}>{props.value}</td>
  }
)
CustomCell.displayName = 'CustomCell'
```

### 5. Keep Components Focused (SRP)

```typescript
// ✅ Good - single responsibility
const StatusBadge: React.FC<CellProps> = ({ value }) => (
  <td><Badge>{value}</Badge></td>
)

const DateCell: React.FC<CellProps> = ({ value }) => (
  <td>{formatDate(value)}</td>
)

// ❌ Bad - too many responsibilities
const MegaCell: React.FC<CellProps> = (props) => {
  // 100 lines of conditional logic
}
```

## Real-World Examples

### Example 1: E-commerce Product Table

```typescript
interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

const ProductCell: React.FC<CellProps<Product>> = (props) => {
  const { field, value, row } = props

  // Product with image
  if (field.name === 'name') {
    return (
      <td className="flex items-center gap-3">
        <img src={row.image} alt={value} className="w-12 h-12 rounded" />
        <span className="font-medium">{value}</span>
      </td>
    )
  }

  // Price formatting
  if (field.name === 'price') {
    return (
      <td className="font-semibold">
        ${Number(value).toFixed(2)}
      </td>
    )
  }

  // Stock status
  if (field.name === 'status') {
    const variants = {
      'in-stock': 'default',
      'low-stock': 'warning',
      'out-of-stock': 'destructive',
    } as const
    return (
      <td>
        <Badge variant={variants[value]}>{value}</Badge>
      </td>
    )
  }

  return <DefaultCell {...props} />
}

export function ProductCatalog() {
  return (
    <Crud schema={productSchema} dataProvider={productProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <PriceRangeFilter />
        <Crud.Toolbar.CreateButton>Add Product</Crud.Toolbar.CreateButton>
      </Crud.Toolbar>

      <Crud.List<Product> components={{ Cell: ProductCell }} />
    </Crud>
  )
}
```

### Example 2: Task Management with Kanban

```typescript
interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  assignee: string
  avatar: string
  status: 'todo' | 'in-progress' | 'done'
}

const PriorityKanbanCard: React.FC<CardProps<Task>> = (props) => {
  const { item } = props
  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-green-500',
  }

  return (
    <Card className={`border-l-4 ${priorityColors[item.priority]}`}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold">{item.title}</h4>
          <Avatar className="h-6 w-6">
            <AvatarImage src={item.avatar} />
            <AvatarFallback>{item.assignee[0]}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
    </Card>
  )
}

export function TaskBoard() {
  return (
    <Crud schema={taskSchema} dataProvider={taskProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <ViewToggle />
        <Crud.Toolbar.CreateButton />
      </Crud.Toolbar>

      <KanbanBoard<Task>
        groupBy="status"
        columns={['todo', 'in-progress', 'done']}
        components={{ Card: PriorityKanbanCard }}
      />
    </Crud>
  )
}
```

### Example 3: User Profile with Rich Form

```typescript
const ProfileForm = () => {
  return (
    <Crud schema={userSchema} dataProvider={userProvider}>
      <Crud.Form
        components={{
          Layout: TwoColumnFormLayout,
          fields: {
            avatar: ImageUploadField,
            bio: RichTextEditor,
            emailNotifications: ToggleField,
            skills: TagsInputField,
            birthdate: DatePickerField,
          },
        }}
      />
    </Crud>
  )
}
```

## Next Steps

- 📖 See [examples/README.md](./examples/README.md) for 40+ working examples
- 📚 See [API_REFERENCE.md](./API_REFERENCE.md) for complete prop documentation
- 🚀 See [GETTING_STARTED.md](./GETTING_STARTED.md) for quick start guide

## Need Help?

- Check the [examples](./examples) directory for working code
- Review component prop types in [lib/component-types.ts](./lib/component-types.ts)
- Look at default implementations in [components/](./components) directories
