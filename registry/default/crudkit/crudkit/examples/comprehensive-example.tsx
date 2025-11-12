/**
 * Example: Comprehensive Customization
 *
 * This example demonstrates a fully customized CRUD application
 * combining multiple component overrides.
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { KanbanBoard } from '@/registry/default/crudkit/crudkit-kanban/components/kanban-board'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TableCell } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { DefaultCell } from '../components/table'
import { DefaultField } from '../components/form'
import { DefaultViewField } from '../components/view'
import { DefaultKanbanCard } from '@/registry/default/crudkit/crudkit-kanban/components/kanban'
import { Plus, Download, Eye, Edit, Trash, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type {
  CellProps,
  ActionsProps,
  ViewFieldProps,
  FieldProps,
  CardProps,
} from '../lib/component-types'

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  avatar: string
  completed: boolean
  dueDate: string
  tags: string[]
  createdAt: string
}

// =============================================================================
// CUSTOM COMPONENTS
// =============================================================================

/**
 * Smart Cell - handles multiple field types with custom rendering
 */
const SmartCell: React.FC<CellProps<Task>> = (props) => {
  const { value, field, row } = props

  // Status badge
  if (field.name === 'status') {
    const statusColors = {
      todo: 'secondary',
      'in-progress': 'default',
      done: 'outline',
    } as const

    return (
      <TableCell className="px-4 py-2">
        <Badge variant={statusColors[value as keyof typeof statusColors]}>
          {value}
        </Badge>
      </TableCell>
    )
  }

  // Priority badge
  if (field.name === 'priority') {
    const priorityColors = {
      low: 'secondary',
      medium: 'default',
      high: 'destructive',
    } as const

    return (
      <TableCell className="px-4 py-2">
        <Badge variant={priorityColors[value as keyof typeof priorityColors]}>
          {value}
        </Badge>
      </TableCell>
    )
  }

  // Assignee with avatar
  if (field.name === 'assignee') {
    return (
      <TableCell className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={row.avatar} alt={value} />
            <AvatarFallback>{value?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{value}</span>
        </div>
      </TableCell>
    )
  }

  // Date formatting
  if (field.type === 'date' || field.name.includes('Date')) {
    const formatted = value
      ? new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(value))
      : '-'

    return (
      <TableCell className="px-4 py-2">
        <span className="text-sm text-muted-foreground">{formatted}</span>
      </TableCell>
    )
  }

  // Tags
  if (field.name === 'tags') {
    const tags = (value as string[]) || []
    return (
      <TableCell className="px-4 py-2">
        <div className="flex gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
    )
  }

  return <DefaultCell {...props} />
}

/**
 * Dropdown Actions
 */
const DropdownActions: React.FC<ActionsProps<Task>> = ({
  row,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Card View Field - enhanced display
 */
const CardViewField: React.FC<ViewFieldProps<Task>> = (props) => {
  const { field, value, item } = props

  if (field.name === 'assignee') {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Assigned To</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={item.avatar} alt={value as string} />
              <AvatarFallback>{(value as string)?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{value as string}</p>
              <p className="text-sm text-muted-foreground">Team Member</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (field.name === 'tags') {
    return (
      <div className="space-y-2">
        <strong className="font-medium">{field.label}:</strong>
        <div className="flex flex-wrap gap-2">
          {((value as string[]) || []).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  return <DefaultViewField {...props} />
}

/**
 * Toggle Field for completed status
 */
const CompletedToggleField: React.FC<FieldProps> = (props) => {
  const { field, value, onChange, disabled } = props

  if (field.name !== 'completed') {
    return <DefaultField {...props} />
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="space-y-0.5">
        <Label htmlFor={`form-${field.name}`}>Mark as Completed</Label>
        <p className="text-sm text-muted-foreground">
          Check this box when the task is finished
        </p>
      </div>
      <Switch
        id={`form-${field.name}`}
        checked={Boolean(value)}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

/**
 * Enhanced Kanban Card
 */
const EnhancedKanbanCard: React.FC<CardProps<Task>> = (props) => {
  const { item } = props

  const priorityColors = {
    low: 'bg-secondary',
    medium: 'bg-yellow-500',
    high: 'bg-destructive',
  }

  return (
    <div className="relative">
      <div
        className={cn(
          'absolute top-0 left-0 w-1 h-full rounded-l-md',
          priorityColors[item.priority]
        )}
      />
      <div className="pl-3">
        <DefaultKanbanCard {...props} />
      </div>
      {item.tags && item.tags.length > 0 && (
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="text-xs">
            {item.tags.length} tags
          </Badge>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// MAIN APPLICATION
// =============================================================================

export function ComprehensiveCrudExample() {
  const [view, setView] = React.useState<'table' | 'kanban'>('table')

  const handleExport = () => {
    console.log('Exporting tasks...')
  }

  return (
    <div className="container mx-auto py-8">
      <Crud schema={taskSchema} dataProvider={taskProvider}>
        {/* Custom Toolbar */}
        <Crud.Toolbar>
          <div className="flex items-center gap-4 flex-1">
            <Crud.Toolbar.Title />
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="kanban">Kanban View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Crud.Toolbar.CreateButton>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Crud.Toolbar.CreateButton>
            <Crud.Toolbar.RefreshButton />
          </div>
        </Crud.Toolbar>

        {/* Filters */}
        <Crud.Filters />

        {/* Conditional Views */}
        {view === 'table' ? (
          <Crud.List<Task>
            components={{
              Cell: SmartCell,
              Actions: DropdownActions,
            }}
          />
        ) : (
          <KanbanBoard<Task>
            groupBy="status"
            columns={['todo', 'in-progress', 'done']}
            columnLabels={{
              todo: 'To Do',
              'in-progress': 'In Progress',
              done: 'Done',
            }}
            components={{
              Card: EnhancedKanbanCard,
            }}
          />
        )}

        {/* Custom Form */}
        <Crud.Form
          components={{
            fields: {
              completed: CompletedToggleField,
            },
          }}
        />

        {/* Custom View */}
        <Crud.View
          components={{
            Field: CardViewField,
          }}
        />
      </Crud>
    </div>
  )
}

// Mock schema and provider (replace with actual implementations)
const taskSchema: any = {
  title: 'Task',
  idField: 'id',
  fields: [
    { name: 'title', label: 'Title', required: true },
    { name: 'description', label: 'Description' },
    { name: 'status', label: 'Status', type: 'select' },
    { name: 'priority', label: 'Priority', type: 'select' },
    { name: 'assignee', label: 'Assignee' },
    { name: 'completed', label: 'Completed', type: 'boolean' },
    { name: 'dueDate', label: 'Due Date', type: 'date' },
    { name: 'tags', label: 'Tags' },
    { name: 'createdAt', label: 'Created At', type: 'date' },
  ],
}

const taskProvider: any = {}
