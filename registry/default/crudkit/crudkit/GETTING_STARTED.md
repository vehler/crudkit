# Getting Started with Component Customization

This guide will walk you through customizing CrudKit components from beginner to advanced usage.

## Quick Start

### 1. Using Default Components

CrudKit works out of the box with sensible defaults:

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

No customization needed! Everything works with defaults.

### 2. Your First Customization

Let's add a status badge to your table:

```typescript
import { Badge } from '@/components/ui/badge'
import { DefaultCell } from '@/registry/default/crudkit/crudkit/components/table'
import type { CellProps } from '@/registry/default/crudkit/crudkit/lib/component-types'

// Step 1: Create your custom component
const StatusCell: React.FC<CellProps> = (props) => {
  // Only customize 'status' field
  if (props.field.name === 'status') {
    return (
      <td className="px-4 py-2">
        <Badge>{props.value}</Badge>
      </td>
    )
  }

  // Use default for everything else
  return <DefaultCell {...props} />
}

// Step 2: Use it in your app
function App() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.List components={{ Cell: StatusCell }} />
    </Crud>
  )
}
```

That's it! Your status field now displays as a badge.

## 5-Minute Tutorial

Let's build a task management app with custom components.

### Step 1: Define Your Type

```typescript
interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
}
```

### Step 2: Create Custom Cells

```typescript
import type { CellProps } from '@/registry/default/crudkit/crudkit/lib/component-types'
import { DefaultCell } from '@/registry/default/crudkit/crudkit/components/table'
import { Badge } from '@/components/ui/badge'

const TaskCell: React.FC<CellProps<Task>> = (props) => {
  const { field, value, row } = props

  // Status badge
  if (field.name === 'status') {
    const variants = {
      'todo': 'secondary',
      'in-progress': 'default',
      'done': 'outline',
    } as const

    return (
      <td className="px-4 py-2">
        <Badge variant={variants[value]}>{value}</Badge>
      </td>
    )
  }

  // Priority badge
  if (field.name === 'priority') {
    const variants = {
      'low': 'secondary',
      'medium': 'default',
      'high': 'destructive',
    } as const

    return (
      <td className="px-4 py-2">
        <Badge variant={variants[value]}>{value}</Badge>
      </td>
    )
  }

  // Date formatting
  if (field.name === 'dueDate') {
    const formatted = new Date(value).toLocaleDateString()
    return <td className="px-4 py-2">{formatted}</td>
  }

  // Default for other fields
  return <DefaultCell {...props} />
}
```

### Step 3: Add Custom Form Field

```typescript
import type { FieldProps } from '@/registry/default/crudkit/crudkit/lib/component-types'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const DescriptionField: React.FC<FieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`form-${field.name}`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={`form-${field.name}`}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={5}
        placeholder="Enter task description..."
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
```

### Step 4: Put It All Together

```typescript
function TaskManagement() {
  return (
    <Crud schema={taskSchema} dataProvider={taskProvider}>
      {/* Toolbar */}
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <Crud.Toolbar.CreateButton>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Crud.Toolbar.CreateButton>
        <Crud.Toolbar.RefreshButton />
      </Crud.Toolbar>

      {/* Filters */}
      <Crud.Filters />

      {/* Table with custom cells */}
      <Crud.List<Task>
        components={{
          Cell: TaskCell,
        }}
      />

      {/* Form with custom description field */}
      <Crud.Form
        components={{
          fields: {
            description: DescriptionField,
          },
        }}
      />

      {/* View (uses defaults) */}
      <Crud.View />
    </Crud>
  )
}
```

Done! You now have a fully customized task management app.

## Common Patterns

### Pattern 1: Conditional Cell Rendering

Override specific fields, use default for others:

```typescript
const SmartCell: React.FC<CellProps> = (props) => {
  const { field, value } = props

  // Custom rendering for specific fields
  if (field.name === 'email') {
    return <td><a href={`mailto:${value}`}>{value}</a></td>
  }

  if (field.name === 'phone') {
    return <td><a href={`tel:${value}`}>{value}</a></td>
  }

  // Default for everything else
  return <DefaultCell {...props} />
}
```

### Pattern 2: Field-Specific Form Overrides

Override only the fields you need:

```typescript
<Crud.Form
  components={{
    fields: {
      avatar: ImageUploadField,    // Custom image uploader
      bio: RichTextEditor,          // Custom rich text editor
      // All other fields use default
    },
  }}
/>
```

### Pattern 3: Router Integration with asChild

Integrate with Next.js or React Router:

```typescript
import Link from 'next/link'

<Crud.Toolbar>
  <Crud.Toolbar.CreateButton asChild>
    <Link href="/tasks/new">
      <Plus className="h-4 w-4 mr-2" />
      Create Task
    </Link>
  </Crud.Toolbar.CreateButton>
</Crud.Toolbar>
```

The `Link` component receives all Button props (onClick, className, etc.).

### Pattern 4: Custom Layouts

Change the form layout:

```typescript
import { Card } from '@/components/ui/card'
import type { FormLayoutProps } from '@/registry/default/crudkit/crudkit/lib/component-types'

const CardFormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  onSubmit,
  onCancel,
}) => (
  <form onSubmit={onSubmit}>
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

<Crud.Form components={{ Layout: CardFormLayout }} />
```

## Progressive Customization

Start simple, add complexity as needed:

### Level 1: Use Defaults

```typescript
<Crud.List />
```

### Level 2: Single Component Override

```typescript
<Crud.List components={{ Cell: CustomCell }} />
```

### Level 3: Multiple Overrides

```typescript
<Crud.List
  components={{
    Cell: CustomCell,
    Actions: DropdownActions,
    EmptyState: IllustratedEmptyState,
  }}
/>
```

### Level 4: Field-Specific Overrides

```typescript
<Crud.Form
  components={{
    fields: {
      avatar: ImageUploadField,
      bio: RichTextEditor,
      tags: TagsInputField,
    },
  }}
/>
```

### Level 5: Complete Customization

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

## TypeScript Tips

### 1. Use Type Inference

Let TypeScript infer types from your data:

```typescript
interface User {
  id: string
  name: string
  email: string
}

// TypeScript knows row is User
<Crud.List<User>
  components={{
    Cell: (props) => {
      props.row // Type: User (autocomplete works!)
    },
  }}
/>
```

### 2. Import Prop Types

Always import and use the correct prop types:

```typescript
import type {
  CellProps,
  FieldProps,
  ViewFieldProps,
} from '@/registry/default/crudkit/crudkit/lib/component-types'

const CustomCell: React.FC<CellProps<User>> = (props) => {
  // Full type safety
}
```

### 3. Use as const for Mapping Objects

```typescript
const statusVariants = {
  active: 'default',
  inactive: 'secondary',
  pending: 'outline',
} as const // Type: { active: "default", inactive: "secondary", ... }
```

## Common Recipes

### Recipe 1: Badge Cell

```typescript
const BadgeCell: React.FC<CellProps> = (props) => {
  if (props.field.name === 'status') {
    return (
      <td>
        <Badge>{props.value}</Badge>
      </td>
    )
  }
  return <DefaultCell {...props} />
}
```

### Recipe 2: Avatar Cell

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

### Recipe 3: Date Formatter

```typescript
const DateCell: React.FC<CellProps> = (props) => {
  if (props.field.type === 'date') {
    const formatted = new Date(props.value).toLocaleDateString()
    return <td>{formatted}</td>
  }
  return <DefaultCell {...props} />
}
```

### Recipe 4: Image Upload Field

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

### Recipe 5: Toggle Field

```typescript
const ToggleField: React.FC<FieldProps> = ({
  field,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Label>{field.label}</Label>
      <Switch checked={Boolean(value)} onCheckedChange={onChange} />
    </div>
  )
}
```

## Debugging Tips

### 1. Check Props

Log props to see what's available:

```typescript
const CustomCell: React.FC<CellProps> = (props) => {
  console.log('Cell props:', props)
  return <DefaultCell {...props} />
}
```

### 2. Use TypeScript Errors

TypeScript will tell you if you're missing required props or using wrong types.

### 3. Test with Defaults First

If your component isn't working, test with the default:

```typescript
// Does this work?
<Crud.List components={{ Cell: DefaultCell }} />

// If yes, the issue is in your custom component
```

### 4. Check Field Names

Make sure field names match your data:

```typescript
// Schema field name must match data property
schema: {
  fields: [
    { name: 'firstName' } // Must match data.firstName
  ]
}

data: {
  firstName: 'John' // Not 'first_name' or 'FirstName'
}
```

## Next Steps

Now that you've learned the basics:

1. **Explore Examples**: Check out [examples/](./examples) for 40+ working examples
2. **Read the Guide**: See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for advanced patterns
3. **API Reference**: See [API_REFERENCE.md](./API_REFERENCE.md) for complete prop documentation
4. **Build Something**: Start customizing your own CRUD app!

## Getting Help

- Review the examples in `examples/` directory
- Check the default implementations in `components/` directories
- Look at the TypeScript types in `lib/component-types.ts`
- Read the full documentation in `CUSTOMIZATION.md`

## Quick Reference Card

```typescript
// Table
<Crud.List components={{ Cell, Row, Actions, Header, EmptyState, LoadingState }} />

// Form (global)
<Crud.Form components={{ Field, Layout, SubmitButton }} />

// Form (per-field)
<Crud.Form components={{ fields: { email: EmailField } }} />

// View (global)
<Crud.View components={{ Field, Layout }} />

// View (per-field)
<Crud.View components={{ fields: { avatar: AvatarDisplay } }} />

// Kanban
<KanbanBoard components={{ Card, ColumnHeader, EmptyColumn }} />

// Filters (global)
<Crud.Filters components={{ Filter, FilterInput, Layout }} />

// Filters (per-filter)
<Crud.Filters components={{ filters: { date: DateRangeFilter } }} />

// Toolbar
<Crud.Toolbar>
  <Crud.Toolbar.Title />
  <Crud.Toolbar.CreateButton asChild>
    <Link href="/new">Create</Link>
  </Crud.Toolbar.CreateButton>
  <Crud.Toolbar.RefreshButton />
</Crud.Toolbar>
```

Happy customizing! 🎨
