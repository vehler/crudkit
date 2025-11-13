/**
 * Example: Custom Row and Actions Components
 *
 * This example demonstrates how to customize row rendering and action buttons.
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TableCell, TableRow } from '@/components/ui/table'
import { DefaultCell } from '../components/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Edit, Trash, Copy, Archive } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RowProps, ActionsProps } from '../lib/component-types'

// =============================================================================
// EXAMPLE 1: Hoverable Row with Highlight
// =============================================================================

const HoverableRow: React.FC<RowProps<Task>> = ({
  row,
  index,
  selected,
  onSelect,
  visibleColumns,
  schema,
  actions,
  state,
  CellComponent,
  ActionsComponent,
  showActions,
}) => {
  return (
    <TableRow
      className={cn(
        'transition-colors hover:bg-muted/50',
        selected && 'bg-muted',
        index % 2 === 0 && 'bg-background'
      )}
    >
      <TableCell className="w-[50px]">
        <Checkbox checked={selected} onCheckedChange={onSelect} />
      </TableCell>
      {visibleColumns.map((columnName) => {
        const field = schema.fields.find((f: any) => f.name === columnName)
        if (!field) return null

        return (
          <CellComponent
            key={columnName}
            value={row[columnName]}
            row={row}
            field={field}
            column={columnName}
            schema={schema}
            actions={actions}
            state={state}
          />
        )
      })}
      {showActions && (
        <TableCell>
          <ActionsComponent
            row={row}
            onView={() => actions.setMode('view', row[schema.idField])}
            onEdit={() => actions.setMode('edit', row[schema.idField])}
            onDelete={() => actions.delete(row[schema.idField])}
            schema={schema}
            actions={actions}
            state={state}
          />
        </TableCell>
      )}
    </TableRow>
  )
}

// =============================================================================
// EXAMPLE 2: Conditional Row Styling (Priority-based)
// =============================================================================

const PriorityRow: React.FC<RowProps<Task>> = (props) => {
  const { row } = props

  const priorityStyles = {
    high: 'border-l-4 border-l-destructive bg-destructive/5',
    medium: 'border-l-4 border-l-warning bg-warning/5',
    low: 'border-l-4 border-l-muted',
  }

  const style = priorityStyles[row.priority as keyof typeof priorityStyles] || ''

  return (
    <TableRow className={cn('transition-colors hover:bg-muted/50', style)}>
      <TableCell className="w-[50px]">
        <Checkbox checked={props.selected} onCheckedChange={props.onSelect} />
      </TableCell>
      {props.visibleColumns.map((columnName) => {
        const field = props.schema.fields.find((f: any) => f.name === columnName)
        if (!field) return null

        return (
          <props.CellComponent
            key={columnName}
            value={row[columnName]}
            row={row}
            field={field}
            column={columnName}
            schema={props.schema}
            actions={props.actions}
            state={props.state}
          />
        )
      })}
      {props.showActions && (
        <TableCell>
          <props.ActionsComponent
            row={row}
            onView={() => props.actions.setMode('view', row[props.schema.idField])}
            onEdit={() => props.actions.setMode('edit', row[props.schema.idField])}
            onDelete={() => props.actions.delete(row[props.schema.idField])}
            schema={props.schema}
            actions={props.actions}
            state={props.state}
          />
        </TableCell>
      )}
    </TableRow>
  )
}

// =============================================================================
// EXAMPLE 3: Dropdown Menu Actions
// =============================================================================

const DropdownActions: React.FC<ActionsProps<Task>> = ({
  row,
  onView,
  onEdit,
  onDelete,
}) => {
  const handleDuplicate = () => {
    console.log('Duplicate:', row)
    // Implement duplicate logic
  }

  const handleArchive = () => {
    console.log('Archive:', row)
    // Implement archive logic
  }

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
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// =============================================================================
// EXAMPLE 4: Icon-only Actions (Compact)
// =============================================================================

const CompactActions: React.FC<ActionsProps> = ({ onView, onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={onView}
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        title="View"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        onClick={onEdit}
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        title="Edit"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        onClick={onDelete}
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        title="Delete"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

interface Task {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: string
  assignee: string
}

export function TableWithHoverableRows() {
  return (
    <Crud schema={taskSchema} dataProvider={taskProvider}>
      <Crud.Toolbar />
      <Crud.List<Task> components={{ Row: HoverableRow }} />
    </Crud>
  )
}

export function TableWithPriorityRows() {
  return (
    <Crud schema={taskSchema} dataProvider={taskProvider}>
      <Crud.Toolbar />
      <Crud.List<Task> components={{ Row: PriorityRow }} />
    </Crud>
  )
}

export function TableWithDropdownActions() {
  return (
    <Crud schema={taskSchema} dataProvider={taskProvider}>
      <Crud.Toolbar />
      <Crud.List<Task> components={{ Actions: DropdownActions }} />
    </Crud>
  )
}

export function TableWithCompactActions() {
  return (
    <Crud schema={taskSchema} dataProvider={taskProvider}>
      <Crud.Toolbar />
      <Crud.List components={{ Actions: CompactActions }} />
    </Crud>
  )
}

export function TableWithBothCustomizations() {
  return (
    <Crud schema={taskSchema} dataProvider={taskProvider}>
      <Crud.Toolbar />
      <Crud.List<Task>
        components={{
          Row: PriorityRow,
          Actions: DropdownActions,
        }}
      />
    </Crud>
  )
}

// Mock schema and provider (replace with actual implementations)
const taskSchema: any = {}
const taskProvider: any = {}
