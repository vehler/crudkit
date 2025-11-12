/**
 * CRUDKit Component Types
 *
 * Type definitions for customizable component props throughout CRUDKit.
 * These types enable type-safe component overrides via the `components` prop pattern.
 *
 * @example
 * ```typescript
 * import type { CellProps } from '@/registry/default/crudkit/crudkit/lib/component-types'
 *
 * const CustomCell: React.FC<CellProps> = ({ value, field, row }) => {
 *   if (field.name === 'status') {
 *     return <Badge>{value}</Badge>
 *   }
 *   return <TableCell>{value}</TableCell>
 * }
 *
 * <Crud.List components={{ Cell: CustomCell }} />
 * ```
 */

import type * as React from 'react'
import type { Schema, Field } from './data-provider'

// Re-export types from use-crud for convenience
export type { CrudState, CrudActions, UseCrudReturn } from '@/hooks/use-crud'

// ============================================================================
// BASE PROPS - All component props extend this
// ============================================================================

/**
 * Base props provided to all custom components.
 * Contains shared context for accessing schema, state, and actions.
 */
export interface BaseComponentProps<T = any> {
  /** Resource schema definition */
  schema: Schema
  /** CRUD state (data, loading, filters, etc.) */
  state: {
    mode: 'list' | 'create' | 'edit' | 'view'
    selectedId: string | null
    page: number
    pageSize: number
    sortField: string | null
    sortOrder: 'asc' | 'desc'
    filters: Record<string, string>
    search: string
    data: T[]
    totalCount: number
    loading: boolean
    error: string | null
    selectedRows: string[]
    currentItem: T | null
  }
  /** CRUD actions (setMode, save, delete, etc.) */
  actions: {
    setMode: (mode: 'list' | 'create' | 'edit' | 'view', id?: string | null) => void
    setSort: (field: string) => void
    setPage: (page: number) => void
    setPageSize: (size: number) => void
    setFilter: (key: string, value: string | null) => void
    clearFilters: () => void
    setSearch: (query: string) => void
    selectRows: (ids: string[]) => void
    refresh: () => Promise<void>
    save: (formData: Record<string, unknown>) => Promise<void>
    delete: (id: string) => Promise<void>
    deleteMany: () => Promise<void>
  }
  /** Optional className for styling overrides */
  className?: string
}

// ============================================================================
// TABLE COMPONENT PROPS
// ============================================================================

/**
 * Props for custom Row component.
 *
 * @example
 * ```typescript
 * const ExpandableRow: React.FC<RowProps<User>> = ({ row, onView, onEdit }) => {
 *   const [expanded, setExpanded] = useState(false)
 *   return (
 *     <>
 *       <TableRow onClick={() => setExpanded(!expanded)}>
 *         <TableCell>{row.name}</TableCell>
 *         <TableCell>{row.email}</TableCell>
 *       </TableRow>
 *       {expanded && <TableRow>...</TableRow>}
 *     </>
 *   )
 * }
 * ```
 */
export interface RowProps<T = any> extends BaseComponentProps<T> {
  /** The data row being rendered */
  row: T
  /** Row index in current page */
  index: number
  /** Whether this row is selected */
  selected: boolean
  /** Callback when selection changes */
  onSelect: (selected: boolean) => void
  /** Callback to view this row's details */
  onView: () => void
  /** Callback to edit this row */
  onEdit: () => void
  /** Callback to delete this row */
  onDelete: () => void
}

/**
 * Props for custom Cell component.
 *
 * @example
 * ```typescript
 * const StatusCell: React.FC<CellProps> = ({ value, field }) => {
 *   if (field.name === 'status') {
 *     return <Badge variant={value === 'active' ? 'success' : 'destructive'}>{value}</Badge>
 *   }
 *   return <TableCell>{value}</TableCell>
 * }
 * ```
 */
export interface CellProps<T = any> extends BaseComponentProps<T> {
  /** The cell value to display */
  value: any
  /** The entire row data */
  row: T
  /** The field definition for this cell */
  field: Field
  /** The column name */
  column: string
}

/**
 * Props for custom Actions component (row action buttons).
 *
 * @example
 * ```typescript
 * const CustomActions: React.FC<ActionsProps> = ({ row, onView, onEdit, onDelete }) => (
 *   <DropdownMenu>
 *     <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
 *     <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
 *     <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
 *   </DropdownMenu>
 * )
 * ```
 */
export interface ActionsProps<T = any> extends BaseComponentProps<T> {
  /** The row data */
  row: T
  /** Callback to view this row */
  onView: () => void
  /** Callback to edit this row */
  onEdit: () => void
  /** Callback to delete this row */
  onDelete: () => void
}

/**
 * Props for custom Header component (column header).
 *
 * @example
 * ```typescript
 * const CustomHeader: React.FC<HeaderProps> = ({ field, sortable, onSort, currentSort }) => (
 *   <TableHead onClick={() => sortable && onSort(field.name)}>
 *     {field.label}
 *     {currentSort?.field === field.name && (currentSort.order === 'asc' ? '↑' : '↓')}
 *   </TableHead>
 * )
 * ```
 */
export interface HeaderProps extends BaseComponentProps {
  /** The field definition for this column */
  field: Field
  /** Whether this column is sortable */
  sortable: boolean
  /** Current sort state (null if not sorted by this column) */
  currentSort: { field: string; order: 'asc' | 'desc' } | null
  /** Callback to sort by this column */
  onSort: (field: string) => void
}

/**
 * Props for custom EmptyState component (shown when no data).
 *
 * @example
 * ```typescript
 * const CustomEmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => (
 *   <TableRow>
 *     <TableCell colSpan={999}>
 *       <div className="text-center py-12">
 *         {hasFilters ? (
 *           <>
 *             <p>No results found</p>
 *             <Button onClick={onClearFilters}>Clear filters</Button>
 *           </>
 *         ) : (
 *           <p>No data available</p>
 *         )}
 *       </div>
 *     </TableCell>
 *   </TableRow>
 * )
 * ```
 */
export interface EmptyStateProps extends BaseComponentProps {
  /** Optional custom message */
  message?: string
  /** Whether filters are currently applied */
  hasFilters: boolean
  /** Callback to clear all filters */
  onClearFilters: () => void
}

/**
 * Props for custom LoadingState component (shown during data fetch).
 *
 * @example
 * ```typescript
 * const CustomLoadingState: React.FC<LoadingStateProps> = ({ rowCount = 5 }) => (
 *   <>
 *     {Array.from({ length: rowCount }).map((_, i) => (
 *       <TableRow key={i}>
 *         <TableCell><Skeleton className="h-4 w-full" /></TableCell>
 *       </TableRow>
 *     ))}
 *   </>
 * )
 * ```
 */
export interface LoadingStateProps extends BaseComponentProps {
  /** Number of skeleton rows to show (defaults to pageSize) */
  rowCount?: number
}

// ============================================================================
// FORM COMPONENT PROPS
// ============================================================================

/**
 * Props for custom Field component (form input).
 *
 * @example
 * ```typescript
 * const ImageUploadField: React.FC<FieldProps> = ({ field, value, onChange, error }) => (
 *   <div>
 *     <Label>{field.label}</Label>
 *     <ImageUpload value={value} onChange={onChange} />
 *     {error && <span className="text-destructive">{error}</span>}
 *   </div>
 * )
 *
 * <Crud.Form components={{ fields: { avatar: ImageUploadField } }} />
 * ```
 */
export interface FieldProps extends BaseComponentProps {
  /** The field definition */
  field: Field
  /** Current field value */
  value: any
  /** Validation error message (if any) */
  error?: string
  /** Callback when value changes */
  onChange: (value: any) => void
  /** Callback when field loses focus */
  onBlur: () => void
  /** Whether field is disabled */
  disabled?: boolean
  /** Current form mode */
  mode: 'create' | 'edit'
}

/**
 * Props for custom FormLayout component (wraps entire form).
 *
 * @example
 * ```typescript
 * const WizardFormLayout: React.FC<FormLayoutProps> = ({ children, title, onSubmit, onCancel }) => (
 *   <Card>
 *     <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
 *     <CardContent>
 *       <form onSubmit={onSubmit}>
 *         <div className="grid grid-cols-2 gap-4">{children}</div>
 *         <div className="flex gap-2 mt-4">
 *           <Button type="button" onClick={onCancel}>Cancel</Button>
 *           <Button type="submit">Save</Button>
 *         </div>
 *       </form>
 *     </CardContent>
 *   </Card>
 * )
 * ```
 */
export interface FormLayoutProps extends BaseComponentProps {
  /** Form field elements to render */
  children: React.ReactNode
  /** Form title (e.g., "Create User" or "Edit User") */
  title: string
  /** Form-level error message */
  error?: string | null
  /** Callback when form is submitted */
  onSubmit: () => void
  /** Callback when form is cancelled */
  onCancel: () => void
  /** Whether form is currently submitting */
  isSubmitting: boolean
  /** Current form mode */
  mode: 'create' | 'edit'
}

/**
 * Props for custom SubmitButton component.
 *
 * @example
 * ```typescript
 * const CustomSubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, mode }) => (
 *   <Button type="submit" disabled={isSubmitting}>
 *     {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
 *   </Button>
 * )
 * ```
 */
export interface SubmitButtonProps extends BaseComponentProps {
  /** Whether form is currently submitting */
  isSubmitting: boolean
  /** Whether button should be disabled */
  disabled?: boolean
  /** Current form mode */
  mode: 'create' | 'edit'
}

// ============================================================================
// VIEW COMPONENT PROPS
// ============================================================================

/**
 * Props for custom ViewField component (detail view field display).
 *
 * @example
 * ```typescript
 * const AvatarViewField: React.FC<ViewFieldProps<User>> = ({ field, value, item }) => {
 *   if (field.name === 'avatar') {
 *     return (
 *       <div>
 *         <Label>{field.label}</Label>
 *         <Avatar><AvatarImage src={value} /></Avatar>
 *       </div>
 *     )
 *   }
 *   return <div><Label>{field.label}</Label><p>{value}</p></div>
 * }
 * ```
 */
export interface ViewFieldProps<T = any> extends BaseComponentProps<T> {
  /** The field definition */
  field: Field
  /** The field value to display */
  value: any
  /** The entire item being viewed */
  item: T
}

/**
 * Props for custom ViewLayout component (wraps entire detail view).
 *
 * @example
 * ```typescript
 * const CardViewLayout: React.FC<ViewLayoutProps> = ({ children, item, onEdit, onBack }) => (
 *   <Card>
 *     <CardHeader>
 *       <CardTitle>Details</CardTitle>
 *     </CardHeader>
 *     <CardContent>{children}</CardContent>
 *     <CardFooter>
 *       <Button onClick={onBack}>Back</Button>
 *       <Button onClick={onEdit}>Edit</Button>
 *     </CardFooter>
 *   </Card>
 * )
 * ```
 */
export interface ViewLayoutProps<T = any> extends BaseComponentProps<T> {
  /** Field display elements to render */
  children: React.ReactNode
  /** The item being viewed */
  item: T
  /** Callback to switch to edit mode */
  onEdit: () => void
  /** Callback to return to list */
  onBack: () => void
}

// ============================================================================
// KANBAN COMPONENT PROPS
// ============================================================================

/**
 * Props for custom Card component (kanban card).
 *
 * @example
 * ```typescript
 * const PriorityCard: React.FC<CardProps<Task>> = ({ item, isDragging, onView, onEdit }) => (
 *   <Card className={isDragging ? 'opacity-50' : ''}>
 *     <CardHeader>
 *       <CardTitle>{item.title}</CardTitle>
 *       <Badge variant={item.priority === 'high' ? 'destructive' : 'default'}>
 *         {item.priority}
 *       </Badge>
 *     </CardHeader>
 *     <CardContent>{item.description}</CardContent>
 *     <CardFooter>
 *       <Button size="sm" onClick={onView}>View</Button>
 *       <Button size="sm" onClick={onEdit}>Edit</Button>
 *     </CardFooter>
 *   </Card>
 * )
 * ```
 */
export interface CardProps<T = any> extends BaseComponentProps<T> {
  /** The item data for this card */
  item: T
  /** The column this card belongs to */
  column: string
  /** Callback to view item details */
  onView: () => void
  /** Callback to edit item */
  onEdit: () => void
  /** Whether card is currently being dragged */
  isDragging: boolean
}

/**
 * Props for custom ColumnHeader component (kanban column header).
 *
 * @example
 * ```typescript
 * const CustomColumnHeader: React.FC<ColumnHeaderProps> = ({ label, count }) => (
 *   <div className="flex items-center justify-between p-4">
 *     <h3 className="font-semibold">{label}</h3>
 *     <Badge>{count}</Badge>
 *   </div>
 * )
 * ```
 */
export interface ColumnHeaderProps extends BaseComponentProps {
  /** The column identifier */
  column: string
  /** The column display label */
  label: string
  /** Number of items in this column */
  count: number
}

/**
 * Props for custom EmptyColumn component (shown when column has no items).
 *
 * @example
 * ```typescript
 * const CustomEmptyColumn: React.FC<EmptyColumnProps> = ({ label }) => (
 *   <div className="text-center py-8 text-muted-foreground">
 *     No items in {label}
 *   </div>
 * )
 * ```
 */
export interface EmptyColumnProps extends BaseComponentProps {
  /** The column identifier */
  column: string
  /** The column display label */
  label: string
}

// ============================================================================
// TOOLBAR COMPONENT PROPS (Compound Components)
// ============================================================================

/**
 * Props for Toolbar root component.
 *
 * @example
 * ```typescript
 * <Crud.Toolbar>
 *   <Crud.Toolbar.Title>My Users</Crud.Toolbar.Title>
 *   <Crud.Toolbar.CreateButton />
 * </Crud.Toolbar>
 * ```
 */
export interface ToolbarProps extends BaseComponentProps {
  /** Child components (Title, CreateButton, etc.) */
  children?: React.ReactNode
}

/**
 * Props for Toolbar.Title component (supports asChild).
 *
 * @example
 * ```typescript
 * <Crud.Toolbar.Title className="text-3xl">
 *   Team Members
 * </Crud.Toolbar.Title>
 *
 * // Or with asChild
 * <Crud.Toolbar.Title asChild>
 *   <h1 className="custom-heading">Team Members</h1>
 * </Crud.Toolbar.Title>
 * ```
 */
export interface ToolbarTitleProps {
  /** Use Slot pattern to render as child element */
  asChild?: boolean
  /** Optional className override */
  className?: string
  /** Title content (uses schema.title if not provided) */
  children?: React.ReactNode
}

/**
 * Props for Toolbar.CreateButton component (supports asChild).
 *
 * @example
 * ```typescript
 * <Crud.Toolbar.CreateButton />
 *
 * // Or with asChild
 * <Crud.Toolbar.CreateButton asChild>
 *   <Link href="/users/new">
 *     <PlusIcon /> Invite Member
 *   </Link>
 * </Crud.Toolbar.CreateButton>
 * ```
 */
export interface ToolbarCreateButtonProps {
  /** Use Slot pattern to render as child element */
  asChild?: boolean
  /** Optional className override */
  className?: string
  /** Button content (uses default if not provided) */
  children?: React.ReactNode
  /** Optional additional onClick handler (called before setMode) */
  onClick?: () => void
}

/**
 * Props for Toolbar.RefreshButton component (supports asChild).
 *
 * @example
 * ```typescript
 * <Crud.Toolbar.RefreshButton />
 *
 * // Or with asChild
 * <Crud.Toolbar.RefreshButton asChild>
 *   <Button variant="outline">
 *     <RefreshIcon /> Reload Data
 *   </Button>
 * </Crud.Toolbar.RefreshButton>
 * ```
 */
export interface ToolbarRefreshButtonProps {
  /** Use Slot pattern to render as child element */
  asChild?: boolean
  /** Optional className override */
  className?: string
  /** Button content (uses default if not provided) */
  children?: React.ReactNode
  /** Optional additional onClick handler (called before refresh) */
  onClick?: () => void
}

// ============================================================================
// FILTER COMPONENT PROPS
// ============================================================================

/**
 * Props for custom Filter component (individual filter).
 *
 * @example
 * ```typescript
 * const DateRangeFilter: React.FC<FilterProps> = ({ field, value, onChange }) => (
 *   <div>
 *     <Label>{field.label}</Label>
 *     <DateRangePicker value={value} onChange={onChange} />
 *   </div>
 * )
 * ```
 */
export interface FilterProps extends BaseComponentProps {
  /** The field to filter by */
  field: Field
  /** Current filter value */
  value: string
  /** Callback when filter value changes */
  onChange: (value: string) => void
  /** Callback to clear this filter */
  onClear: () => void
}

/**
 * Props for custom FilterInput component (filter input element).
 *
 * @example
 * ```typescript
 * const CustomFilterInput: React.FC<FilterInputProps> = ({ field, value, onChange }) => {
 *   if (field.type === 'select') {
 *     return <Select value={value} onValueChange={onChange} options={field.options} />
 *   }
 *   return <Input value={value} onChange={(e) => onChange(e.target.value)} />
 * }
 * ```
 */
export interface FilterInputProps extends BaseComponentProps {
  /** The field to filter by */
  field: Field
  /** Current filter value */
  value: string
  /** Callback when filter value changes */
  onChange: (value: string) => void
}

/**
 * Props for custom FilterLayout component (filters container).
 *
 * @example
 * ```typescript
 * const CardFilterLayout: React.FC<FilterLayoutProps> = ({ children, onClearFilters, hasActiveFilters }) => (
 *   <Card className="mb-4">
 *     <CardHeader>
 *       <h3>Filter Results</h3>
 *     </CardHeader>
 *     <CardContent>
 *       <div className="grid grid-cols-3 gap-4">{children}</div>
 *     </CardContent>
 *     {hasActiveFilters && (
 *       <CardFooter>
 *         <Button onClick={onClearFilters}>Reset Filters</Button>
 *       </CardFooter>
 *     )}
 *   </Card>
 * )
 * ```
 */
export interface FilterLayoutProps extends BaseComponentProps {
  /** The child filter components */
  children: React.ReactNode
  /** Callback to clear all filters */
  onClearFilters: () => void
  /** Whether there are any active filters */
  hasActiveFilters: boolean
}

// ============================================================================
// COMPONENT COLLECTIONS (for `components` prop)
// ============================================================================

/**
 * Collection of customizable table components.
 *
 * @example
 * ```typescript
 * <Crud.List
 *   components={{
 *     Row: CustomRow,
 *     Cell: StatusCell,
 *     Actions: DropdownActions,
 *     EmptyState: CustomEmptyState,
 *   }}
 * />
 * ```
 */
export interface TableComponents<T = any> {
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

/**
 * Collection of customizable form components.
 *
 * @example
 * ```typescript
 * <Crud.Form
 *   components={{
 *     Field: CustomField,
 *     Layout: TwoColumnLayout,
 *     fields: {
 *       avatar: ImageUploadField,
 *       bio: RichTextEditor,
 *     }
 *   }}
 * />
 * ```
 */
export interface FormComponents {
  /** Custom field component (applies to all fields) */
  Field?: React.ComponentType<FieldProps>
  /** Custom form layout component */
  Layout?: React.ComponentType<FormLayoutProps>
  /** Custom submit button component */
  SubmitButton?: React.ComponentType<SubmitButtonProps>
  /** Field-specific overrides (by field name) */
  fields?: Record<string, React.ComponentType<FieldProps>>
}

/**
 * Collection of customizable view components.
 *
 * @example
 * ```typescript
 * <Crud.View
 *   components={{
 *     Field: CustomViewField,
 *     Layout: CardLayout,
 *     fields: {
 *       avatar: AvatarDisplay,
 *       createdAt: DateDisplay,
 *     }
 *   }}
 * />
 * ```
 */
export interface ViewComponents<T = any> {
  /** Custom field display component (applies to all fields) */
  Field?: React.ComponentType<ViewFieldProps<T>>
  /** Custom view layout component */
  Layout?: React.ComponentType<ViewLayoutProps<T>>
  /** Field-specific overrides (by field name) */
  fields?: Record<string, React.ComponentType<ViewFieldProps<T>>>
}

/**
 * Collection of customizable kanban components.
 *
 * @example
 * ```typescript
 * <KanbanBoard
 *   components={{
 *     Card: PriorityCard,
 *     ColumnHeader: CustomColumnHeader,
 *     EmptyColumn: CustomEmptyState,
 *   }}
 * />
 * ```
 */
export interface KanbanComponents<T = any> {
  /** Custom card component */
  Card?: React.ComponentType<CardProps<T>>
  /** Custom column header component */
  ColumnHeader?: React.ComponentType<ColumnHeaderProps>
  /** Custom empty column component */
  EmptyColumn?: React.ComponentType<EmptyColumnProps>
}

/**
 * Collection of customizable filter components.
 *
 * @example
 * ```typescript
 * <Crud.Filters
 *   components={{
 *     Filter: CustomFilter,
 *     FilterInput: CustomInput,
 *     Layout: CardFilterLayout,
 *     filters: {
 *       createdAt: DateRangeFilter,
 *       tags: MultiSelectFilter,
 *     }
 *   }}
 * />
 * ```
 */
export interface FilterComponents {
  /** Custom filter component (applies to all filters) */
  Filter?: React.ComponentType<FilterProps>
  /** Custom filter input component */
  FilterInput?: React.ComponentType<FilterInputProps>
  /** Custom filter layout component */
  Layout?: React.ComponentType<FilterLayoutProps>
  /** Filter-specific overrides (by field name) */
  filters?: Record<string, React.ComponentType<FilterProps>>
}

// ============================================================================
// MAIN COMPONENT PROPS
// ============================================================================

/**
 * Props for Crud.List component.
 *
 * @example
 * ```typescript
 * <Crud.List<User>
 *   columns={['name', 'email', 'status']}
 *   showActions={true}
 *   components={{
 *     Cell: StatusCell,
 *     EmptyState: CustomEmptyState,
 *   }}
 * />
 * ```
 */
export interface CrudListProps<T = any> {
  /** Visible column names (defaults to all fields) */
  columns?: string[]
  /** Show action buttons column (default: true) */
  showActions?: boolean
  /** Optional className override */
  className?: string
  /** Custom component overrides */
  components?: TableComponents<T>
}

/**
 * Props for Crud.Form component.
 *
 * @example
 * ```typescript
 * <Crud.Form
 *   fields={['name', 'email', 'role']}
 *   components={{
 *     Field: CustomField,
 *     fields: {
 *       avatar: ImageUploadField,
 *     }
 *   }}
 * />
 * ```
 */
export interface CrudFormProps {
  /** Visible field names (defaults to all fields based on mode) */
  fields?: Field[]
  /** Optional className override */
  className?: string
  /** Custom component overrides */
  components?: FormComponents
}

/**
 * Props for Crud.View component.
 *
 * @example
 * ```typescript
 * <Crud.View<User>
 *   components={{
 *     Field: CustomViewField,
 *     Layout: CardLayout,
 *   }}
 * />
 * ```
 */
export interface CrudViewProps<T = any> {
  /** Optional className override */
  className?: string
  /** Custom component overrides */
  components?: ViewComponents<T>
}

/**
 * Props for KanbanBoard component.
 *
 * @example
 * ```typescript
 * <KanbanBoard<Task>
 *   groupBy="status"
 *   columns={['todo', 'in-progress', 'done']}
 *   columnLabels={{ todo: 'To Do', 'in-progress': 'In Progress' }}
 *   components={{
 *     Card: PriorityCard,
 *   }}
 * />
 * ```
 */
export interface KanbanBoardProps<T = any> {
  /** Field name to group items by */
  groupBy: string
  /** Column values to display */
  columns: string[]
  /** Optional custom labels for columns */
  columnLabels?: Record<string, string>
  /** Optional className override */
  className?: string
  /** Custom component overrides */
  components?: KanbanComponents<T>
}

/**
 * Props for Crud.Filters component.
 *
 * @example
 * ```typescript
 * <Crud.Filters
 *   filterFields={schema.fields.filter(f => f.filterable)}
 *   components={{
 *     Filter: CustomFilter,
 *     filters: {
 *       createdAt: DateRangeFilter,
 *     }
 *   }}
 * />
 * ```
 */
export interface CrudFiltersProps {
  /** Fields to show filters for (defaults to filterable fields) */
  filterFields?: Field[]
  /** Optional className override */
  className?: string
  /** Custom component overrides */
  components?: FilterComponents
}
