---
title: Schema Definition
description: Define your data structure with schemas to auto-generate forms, tables, and filters
category: guides
order: 2
---

# Schema Definition

Schemas are the blueprint for your CRUD interface. They define your data structure, field types, validation rules, and UI behavior. CRUDKit uses schemas to automatically generate forms, tables, filters, and more.

## Schema Interface

```typescript
interface Schema {
  title: string      // Resource title (e.g., "User", "Product")
  idField: string    // Name of the ID field (default: "id")
  fields: Field[]    // Array of field definitions
}
```

## Field Interface

```typescript
interface Field {
  name: string                  // Field name (matches data property)
  label: string                 // Human-readable label
  type?: string                 // Input type
  required?: boolean            // Is field required?
  sortable?: boolean            // Can sort by this field?
  filterable?: boolean          // Can filter by this field?
  showOnCreate?: boolean        // Show in create form?
  showOnEdit?: boolean          // Show in edit form?
  options?: Array<{             // For select/radio fields
    value: string
    label: string
  }>
}
```

## Basic Example

```typescript
import { Schema } from '@/lib/crudkit/data-provider'

const userSchema: Schema = {
  title: 'User',
  idField: 'id',
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
      sortable: true,
      filterable: true,
    },
  ],
}
```

## Field Types

CRUDKit supports various field types that determine how fields are rendered:

### Text Input
```typescript
{
  name: 'name',
  label: 'Full Name',
  type: 'text',
  required: true
}
// Renders: <Input type="text" />
```

### Email Input
```typescript
{
  name: 'email',
  label: 'Email Address',
  type: 'email',
  required: true
}
// Renders: <Input type="email" />
// Includes email validation
```

### Number Input
```typescript
{
  name: 'age',
  label: 'Age',
  type: 'number'
}
// Renders: <Input type="number" />
```

### Textarea
```typescript
{
  name: 'bio',
  label: 'Biography',
  type: 'textarea'
}
// Renders: <Textarea />
// Multi-line text input
```

### Select Dropdown
```typescript
{
  name: 'role',
  label: 'Role',
  type: 'select',
  options: [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'Regular User' },
    { value: 'guest', label: 'Guest' }
  ]
}
// Renders: <Select> with options
```

### Checkbox
```typescript
{
  name: 'active',
  label: 'Is Active',
  type: 'checkbox'
}
// Renders: <Checkbox />
// Boolean value
```

### Date Input
```typescript
{
  name: 'birthdate',
  label: 'Birth Date',
  type: 'date'
}
// Renders: <Input type="date" />
```

### Password Input
```typescript
{
  name: 'password',
  label: 'Password',
  type: 'password',
  required: true,
  showOnCreate: true,
  showOnEdit: false  // Don't show in edit form
}
// Renders: <Input type="password" />
```

## Field Options

### required
Makes the field mandatory in forms:

```typescript
{
  name: 'email',
  label: 'Email',
  type: 'email',
  required: true  // Cannot submit form without this
}
```

### sortable
Enables sorting by this field in lists:

```typescript
{
  name: 'createdAt',
  label: 'Created',
  type: 'date',
  sortable: true  // Clicking column header sorts
}
```

### filterable
Adds this field to the filters component:

```typescript
{
  name: 'status',
  label: 'Status',
  type: 'select',
  filterable: true,  // Shows in filter bar
  options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]
}
```

### showOnCreate / showOnEdit
Control field visibility in forms:

```typescript
{
  name: 'id',
  label: 'ID',
  type: 'text',
  showOnCreate: false,  // Auto-generated, don't show
  showOnEdit: false     // Read-only, don't allow editing
}
```

## Complete Examples

### User Management Schema

```typescript
const userSchema: Schema = {
  title: 'User',
  idField: 'id',
  fields: [
    {
      name: 'id',
      label: 'ID',
      type: 'text',
      showOnCreate: false,
      showOnEdit: false,
    },
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      sortable: true,
      filterable: true,
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
    },
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
      sortable: true,
      filterable: true,
    },
    {
      name: 'createdAt',
      label: 'Created',
      type: 'date',
      sortable: true,
      showOnCreate: false,
      showOnEdit: false,
    },
  ],
}
```

### Product Catalog Schema

```typescript
const productSchema: Schema = {
  title: 'Product',
  idField: 'id',
  fields: [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      sortable: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      filterable: true,
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'books', label: 'Books' },
      ],
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: 'checkbox',
      filterable: true,
    },
  ],
}
```

### Blog Post Schema

```typescript
const postSchema: Schema = {
  title: 'Post',
  idField: 'id',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      filterable: true,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' },
      ],
    },
    {
      name: 'publishedAt',
      label: 'Published',
      type: 'date',
      sortable: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      filterable: true,
    },
  ],
}
```

## Best Practices

### 1. Keep ID Fields Hidden
Don't show auto-generated IDs in create/edit forms:

```typescript
{
  name: 'id',
  label: 'ID',
  showOnCreate: false,
  showOnEdit: false
}
```

### 2. Make Essential Fields Required
Use `required: true` for mandatory data:

```typescript
{
  name: 'email',
  type: 'email',
  required: true
}
```

### 3. Enable Sorting for Key Fields
Allow sorting on commonly used fields:

```typescript
{
  name: 'createdAt',
  type: 'date',
  sortable: true
}
```

### 4. Add Filters for Categories
Make categorical fields filterable:

```typescript
{
  name: 'status',
  type: 'select',
  filterable: true,
  options: [...]
}
```

### 5. Use Appropriate Field Types
Choose the right input type for data:
- `email` for emails (validation included)
- `number` for numeric values
- `textarea` for long text
- `checkbox` for booleans
- `select` for predefined options

## TypeScript Types

For better type safety, define your data types:

```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  active: boolean
  createdAt: string
}

const userSchema: Schema = {
  // ... schema definition
}

// Use with Data Provider
const userProvider: DataProvider<User> = new RestDataProvider('/api/users')

// Use with Crud
<Crud<User> schema={userSchema} dataProvider={userProvider}>
  {/* ... */}
</Crud>
```

## Related

- [Data Providers](/docs/guides/data-providers) - Connect schemas to data
- [Crud Component](/docs/components/crud) - Use schemas with Crud
- [Examples](/examples) - See complete schema examples
