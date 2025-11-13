/**
 * Example: View, Kanban, and Filter Customizations
 *
 * This example demonstrates custom components for View, Kanban, and Filters.
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { KanbanBoard } from '@/registry/default/crudkit/crudkit-kanban/components/kanban-board'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Clock, User } from 'lucide-react'
import { DefaultViewField, DefaultViewLayout } from '../components/view'
import { DefaultKanbanCard } from '@/registry/default/crudkit/crudkit-kanban/components/kanban'
import { DefaultFilter } from '../components/filters'
import { cn } from '@/lib/utils'
import type {
  ViewFieldProps,
  ViewLayoutProps,
  CardProps,
  FilterProps,
} from '../lib/component-types'

// =============================================================================
// VIEW EXAMPLES
// =============================================================================

/**
 * Custom View Field with Icons
 */
const IconViewField: React.FC<ViewFieldProps> = (props) => {
  const { field, value } = props

  const icons: Record<string, React.ReactNode> = {
    email: <User className="h-4 w-4" />,
    createdAt: <Clock className="h-4 w-4" />,
    assignee: <User className="h-4 w-4" />,
  }

  const icon = icons[field.name]

  if (!icon) {
    return <DefaultViewField {...props} />
  }

  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <strong className="font-medium">{field.label}:</strong>{' '}
        <span className="text-muted-foreground">{value ?? '-'}</span>
      </div>
    </div>
  )
}

/**
 * Card-based View Layout
 */
const CardViewLayout: React.FC<ViewLayoutProps> = ({
  children,
  item,
  onEdit,
  onBack,
  schema,
}) => {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">View {schema.title}</h2>
        </CardHeader>
        <CardContent className="space-y-3">{children}</CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={onEdit}>Edit</Button>
          <Button onClick={onBack} variant="outline">
            Back to List
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

/**
 * Two-Column View Layout
 */
const TwoColumnViewLayout: React.FC<ViewLayoutProps> = ({
  children,
  item,
  onEdit,
  onBack,
  schema,
}) => {
  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-xl font-bold">View {schema.title}</h2>
      <div className="grid grid-cols-2 gap-6">{children}</div>
      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onBack} variant="outline">
          Back to List
        </Button>
      </div>
    </div>
  )
}

// =============================================================================
// KANBAN EXAMPLES
// =============================================================================

/**
 * Priority-based Kanban Card
 */
const PriorityKanbanCard: React.FC<CardProps<Task>> = (props) => {
  const { item } = props

  const priorityColors = {
    high: 'destructive',
    medium: 'warning',
    low: 'secondary',
  } as const

  return (
    <div className="relative">
      <DefaultKanbanCard {...props} />
      {item.priority && (
        <Badge
          variant={priorityColors[item.priority as keyof typeof priorityColors]}
          className="absolute -top-2 -right-2 text-xs"
        >
          {item.priority}
        </Badge>
      )}
    </div>
  )
}

/**
 * Kanban Card with Avatar
 */
const AvatarKanbanCard: React.FC<CardProps<Task>> = ({
  item,
  onView,
  onEdit,
  isDragging,
  schema,
}) => {
  return (
    <Card
      className={cn(
        'cursor-move transition-opacity hover:shadow-md',
        isDragging && 'opacity-50'
      )}
    >
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.avatar} alt={item.assignee} />
            <AvatarFallback>{item.assignee?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.assignee}</p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button onClick={onView} variant="ghost" size="sm">
          View
        </Button>
        <Button onClick={onEdit} variant="ghost" size="sm">
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

/**
 * Minimalist Kanban Card
 */
const MinimalistKanbanCard: React.FC<CardProps> = ({
  item,
  onView,
  isDragging,
  schema,
}) => {
  const titleField = schema.fields.find(
    (f: any) => f.name === 'title' || f.name === 'name'
  )

  return (
    <div
      onClick={onView}
      className={cn(
        'p-3 bg-card rounded-md border cursor-move hover:shadow-sm transition-all',
        isDragging && 'opacity-50'
      )}
    >
      <p className="text-sm font-medium">
        {titleField ? item[titleField.name] : item[schema.idField]}
      </p>
    </div>
  )
}

// =============================================================================
// FILTER EXAMPLES
// =============================================================================

/**
 * Date Range Filter
 */
const DateRangeFilter: React.FC<FilterProps> = ({
  field,
  value,
  onChange,
  className,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{field.label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[180px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? date.toLocaleDateString() : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              onChange(newDate ? newDate.toISOString() : '')
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/**
 * Multi-Select Filter (Simplified)
 */
const MultiSelectFilter: React.FC<FilterProps> = ({
  field,
  value,
  onChange,
  className,
}) => {
  const selectedValues = value ? value.split(',') : []

  const toggleValue = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue]

    onChange(newValues.join(','))
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{field.label}</label>
      <div className="flex flex-wrap gap-2">
        {field.options?.map((option: any) => (
          <Badge
            key={option.value}
            variant={selectedValues.includes(option.value) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggleValue(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
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
  status: string
  priority: 'high' | 'medium' | 'low'
  assignee: string
  avatar: string
  createdAt: string
}

export function ViewWithIcons() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.View components={{ Field: IconViewField }} />
    </Crud>
  )
}

export function ViewWithCardLayout() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.View components={{ Layout: CardViewLayout }} />
    </Crud>
  )
}

export function ViewWithTwoColumns() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.View components={{ Layout: TwoColumnViewLayout }} />
    </Crud>
  )
}

export function KanbanWithPriorityCards() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <KanbanBoard<Task>
        groupBy="status"
        columns={['todo', 'in-progress', 'done']}
        components={{ Card: PriorityKanbanCard }}
      />
    </Crud>
  )
}

export function KanbanWithAvatarCards() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <KanbanBoard<Task>
        groupBy="status"
        columns={['todo', 'in-progress', 'done']}
        components={{ Card: AvatarKanbanCard }}
      />
    </Crud>
  )
}

export function KanbanWithMinimalistCards() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <KanbanBoard
        groupBy="status"
        columns={['todo', 'in-progress', 'done']}
        components={{ Card: MinimalistKanbanCard }}
      />
    </Crud>
  )
}

export function FiltersWithDateRange() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Filters
        components={{
          filters: {
            createdAt: DateRangeFilter,
          },
        }}
      />
    </Crud>
  )
}

export function FiltersWithMultiSelect() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Filters
        components={{
          filters: {
            priority: MultiSelectFilter,
          },
        }}
      />
    </Crud>
  )
}

// Mock schema and provider (replace with actual implementations)
const schema: any = {}
const dataProvider: any = {}
