# CrudKit - Customizable CRUD Components

A powerful, type-safe CRUD component library for React with comprehensive customization capabilities.

## ✨ Features

- 🎨 **Fully Customizable**: Override any component via the `components` prop
- 🔒 **Type-Safe**: Full TypeScript support with auto-inferred generics
- 🧩 **Composable**: Mix and match customizations as needed
- 🚀 **Plug-and-Play**: Works immediately with sensible defaults
- 🔗 **Router-Ready**: `asChild` pattern for seamless routing integration
- 📦 **Zero Config**: No setup required to get started

## 🚀 Quick Start

```typescript
import { Crud } from '@/registry/default/crudkit/crudkit/components/crud-table'

function App() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.Filters />
      <Crud.List />
      <Crud.Form />
      <Crud.View />
    </Crud>
  )
}
```

That's it! Everything works out of the box with beautiful defaults.

## 🎨 Customization Example

Override specific components to match your design:

```typescript
import { Badge } from '@/components/ui/badge'
import { DefaultCell } from '@/registry/default/crudkit/crudkit/components/table'
import type { CellProps } from '@/registry/default/crudkit/crudkit/lib/component-types'

// Custom cell with status badges
const StatusCell: React.FC<CellProps> = (props) => {
  if (props.field.name === 'status') {
    return (
      <td>
        <Badge variant={props.value}>{props.value}</Badge>
      </td>
    )
  }
  return <DefaultCell {...props} />
}

// Use it
<Crud.List components={{ Cell: StatusCell }} />
```

## 📚 Documentation

### Getting Started
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - 5-minute tutorial and common recipes
- Start here if you're new to CrudKit customization

### Comprehensive Guide
- **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** - Complete customization guide
- Core concepts, patterns, best practices, and real-world examples

### API Reference
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Full API documentation
- All component props, types, and interfaces

### Examples
- **[examples/](./examples)** - 40+ working examples
- Table, Form, View, Kanban, Filter, and Toolbar customizations
- See [examples/README.md](./examples/README.md) for the full list

## 🧱 Component Overview

### Table Components

```typescript
<Crud.List
  components={{
    Row: CustomRow,
    Cell: CustomCell,
    Actions: CustomActions,
    Header: CustomHeader,
    EmptyState: CustomEmptyState,
    LoadingState: CustomLoadingState,
  }}
/>
```

[See Table Examples →](./examples/table-custom-cell.tsx)

### Form Components

```typescript
// Global override
<Crud.Form components={{ Field: CustomField }} />

// Per-field override
<Crud.Form
  components={{
    fields: {
      avatar: ImageUploadField,
      bio: RichTextEditor,
    },
  }}
/>
```

[See Form Examples →](./examples/form-custom-fields.tsx)

### View Components

```typescript
<Crud.View
  components={{
    Field: CustomViewField,
    Layout: CardLayout,
    fields: {
      avatar: AvatarDisplay,
    },
  }}
/>
```

[See View Examples →](./examples/view-kanban-filter-examples.tsx)

### Kanban Components

```typescript
<KanbanBoard
  groupBy="status"
  columns={['todo', 'in-progress', 'done']}
  components={{
    Card: PriorityCard,
    ColumnHeader: CustomHeader,
  }}
/>
```

[See Kanban Examples →](./examples/view-kanban-filter-examples.tsx)

### Filter Components

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

[See Filter Examples →](./examples/view-kanban-filter-examples.tsx)

### Toolbar Components (Compound)

```typescript
<Crud.Toolbar>
  <Crud.Toolbar.Title />
  <Crud.Toolbar.CreateButton asChild>
    <Link href="/new">Create</Link>
  </Crud.Toolbar.CreateButton>
  <Crud.Toolbar.RefreshButton />
</Crud.Toolbar>
```

[See Toolbar Examples →](./examples/toolbar-aschild-examples.tsx)

## 🎯 Key Concepts

### 1. The `components` Prop

Override components globally or per-field:

```typescript
// Global override - affects all instances
<Crud.List components={{ Cell: CustomCell }} />

// Field-specific override - affects only specific fields
<Crud.Form
  components={{
    fields: {
      email: EmailField, // Only 'email' field
    },
  }}
/>
```

### 2. Type Safety

Full TypeScript support with auto-inferred generics:

```typescript
interface User {
  id: string
  name: string
  email: string
}

<Crud.List<User>
  components={{
    Cell: (props) => {
      props.row // Type: User (autocomplete works!)
    },
  }}
/>
```

### 3. asChild Pattern

Replace component while keeping functionality:

```typescript
import Link from 'next/link'

<Crud.Toolbar.CreateButton asChild>
  <Link href="/tasks/new">Create Task</Link>
</Crud.Toolbar.CreateButton>
```

The Link receives all Button props (onClick, className, etc.).

### 4. Default Components

Extend defaults instead of starting from scratch:

```typescript
import { DefaultCell } from '@/registry/default/crudkit/crudkit/components/table'

const CustomCell: React.FC<CellProps> = (props) => {
  // Handle special cases
  if (props.field.name === 'status') {
    return <td><Badge>{props.value}</Badge></td>
  }

  // Use default for everything else
  return <DefaultCell {...props} />
}
```

## 📦 Component Structure

```
crudkit/
├── components/
│   ├── crud-table.tsx         # Main CRUD component
│   ├── table/                 # Table default components
│   │   ├── default-row.tsx
│   │   ├── default-cell.tsx
│   │   ├── default-actions.tsx
│   │   ├── default-header.tsx
│   │   ├── default-empty-state.tsx
│   │   └── default-loading-state.tsx
│   ├── form/                  # Form default components
│   │   ├── default-field.tsx
│   │   ├── default-form-layout.tsx
│   │   └── default-submit-button.tsx
│   ├── view/                  # View default components
│   │   ├── default-view-field.tsx
│   │   └── default-view-layout.tsx
│   ├── filters/               # Filter default components
│   │   ├── default-filter.tsx
│   │   ├── default-filter-input.tsx
│   │   └── default-filter-layout.tsx
│   └── toolbar/               # Toolbar compound components
│       ├── toolbar-root.tsx
│       ├── toolbar-title.tsx
│       ├── toolbar-create-button.tsx
│       └── toolbar-refresh-button.tsx
├── lib/
│   └── component-types.ts     # All TypeScript types
├── examples/                  # 40+ working examples
├── GETTING_STARTED.md         # Quick start guide
├── CUSTOMIZATION.md           # Comprehensive guide
├── API_REFERENCE.md           # Full API docs
└── README.md                  # This file
```

## 🛠️ Common Recipes

### Badge Cell

```typescript
const BadgeCell: React.FC<CellProps> = (props) => {
  if (props.field.name === 'status') {
    return <td><Badge>{props.value}</Badge></td>
  }
  return <DefaultCell {...props} />
}
```

### Avatar Cell

```typescript
const AvatarCell: React.FC<CellProps<User>> = (props) => {
  if (props.field.name === 'avatar') {
    return (
      <td>
        <Avatar>
          <AvatarImage src={props.value} />
          <AvatarFallback>{props.row.name[0]}</AvatarFallback>
        </Avatar>
      </td>
    )
  }
  return <DefaultCell {...props} />
}
```

### Date Formatter

```typescript
const DateCell: React.FC<CellProps> = (props) => {
  if (props.field.type === 'date') {
    return <td>{new Date(props.value).toLocaleDateString()}</td>
  }
  return <DefaultCell {...props} />
}
```

### Image Upload Field

```typescript
const ImageUploadField: React.FC<FieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const [preview, setPreview] = React.useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Label>{field.label}</Label>
      {preview && <img src={preview} className="w-32 h-32" />}
      <Input type="file" accept="image/*" onChange={handleChange} />
    </div>
  )
}
```

### Toggle Field

```typescript
const ToggleField: React.FC<FieldProps> = ({
  field,
  value,
  onChange,
}) => (
  <div className="flex items-center justify-between">
    <Label>{field.label}</Label>
    <Switch checked={Boolean(value)} onCheckedChange={onChange} />
  </div>
)
```

[See more recipes in GETTING_STARTED.md →](./GETTING_STARTED.md#common-recipes)

## 🎓 Learning Path

1. **New to CrudKit?** Start with [GETTING_STARTED.md](./GETTING_STARTED.md)
2. **Want to customize?** Read [CUSTOMIZATION.md](./CUSTOMIZATION.md)
3. **Need specific examples?** Browse [examples/](./examples)
4. **Looking for API details?** Check [API_REFERENCE.md](./API_REFERENCE.md)

## 🧩 Design Principles

This customization system follows:

- **SRP** (Single Responsibility Principle) - Each component does one thing
- **DRY** (Don't Repeat Yourself) - Reuse defaults, customize only what's needed
- **KISS** (Keep It Simple, Stupid) - Simple patterns, easy to understand
- **YAGNI** (You Aren't Gonna Need It) - No unnecessary complexity

## 🔗 Quick Links

- [Getting Started Guide](./GETTING_STARTED.md)
- [Customization Guide](./CUSTOMIZATION.md)
- [API Reference](./API_REFERENCE.md)
- [Examples Directory](./examples)
- [Component Types](./lib/component-types.ts)

## 💡 Need Help?

1. Check the [examples](./examples) directory for working code
2. Review the [GETTING_STARTED.md](./GETTING_STARTED.md) guide
3. Read component prop types in [lib/component-types.ts](./lib/component-types.ts)
4. Look at default implementations in component directories

## 🚀 What's Included

- ✅ **24 Default Components** - Ready to extend or replace
- ✅ **25+ Type Interfaces** - Full TypeScript support
- ✅ **40+ Working Examples** - Copy-paste ready code
- ✅ **950+ Lines of Docs** - Comprehensive guides
- ✅ **Compound Components** - Explicit dot notation (Crud.Toolbar.CreateButton)
- ✅ **Field-Specific Overrides** - Granular customization
- ✅ **Router Integration** - asChild pattern for Next.js/React Router
- ✅ **Zero Breaking Changes** - Clean, modern API

---

**Happy building! 🎉**
