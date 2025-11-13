'use client'

import React from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  type UniqueIdentifier,
  useDroppable,
} from '@dnd-kit/core'
import { useCrudContext } from '@/components/crudkit/crud'
import { cn } from '@/lib/utils'
import { KanbanCard as DefaultKanbanCard, ColumnHeader as DefaultColumnHeader, EmptyColumn as DefaultEmptyColumn } from '.'
import type { KanbanBoardProps } from '@/lib/crudkit/types'

// ============================================
// KANBAN BOARD COMPONENT
// ============================================

export function KanbanBoard<T = any>({
  groupBy,
  columns,
  columnLabels,
  className,
  components = {},
}: KanbanBoardProps<T>) {
  const { schema, state, actions } = useCrudContext<T>()
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  // Use custom components or defaults
  const Card = components.Card ?? DefaultKanbanCard
  const ColumnHeader = components.ColumnHeader ?? DefaultColumnHeader
  const EmptyColumn = components.EmptyColumn ?? DefaultEmptyColumn

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    })
  )

  if (state.mode !== 'list') return null

  // Group data by the specified field
  const groupedData: Record<string, T[]> = {}
  columns.forEach((col) => {
    groupedData[col] = state.data.filter((item: any) => item[groupBy] === col)
  })

  // Find the currently dragged item
  const activeItem = activeId
    ? state.data.find((item: any) => item[schema.idField] === activeId)
    : null

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const itemId = active.id as string
    const newStatus = over.id as string

    // Find the item
    const item = state.data.find((d: any) => d[schema.idField] === itemId)

    if (item && (item as any)[groupBy] !== newStatus) {
      // Update the item's status
      try {
        await actions.save({ ...item, [groupBy]: newStatus })
        await actions.refresh()
      } catch (error) {
        console.error('Failed to update item:', error)
      }
    }

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className={cn('flex gap-4 overflow-x-auto p-4', className)}>
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            id={column}
            label={columnLabels?.[column] || column}
            items={groupedData[column] || []}
            schema={schema}
            actions={actions}
            state={state}
            CardComponent={Card}
            ColumnHeaderComponent={ColumnHeader}
            EmptyColumnComponent={EmptyColumn}
          />
        ))}
      </div>

      <DragOverlay>
        {activeItem ? (
          <Card
            item={activeItem}
            column={String((activeItem as any)[groupBy])}
            onView={() => actions.setMode('view', (activeItem as any)[schema.idField])}
            onEdit={() => actions.setMode('edit', (activeItem as any)[schema.idField])}
            isDragging
            schema={schema}
            actions={actions}
            state={state}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// ============================================
// KANBAN COLUMN COMPONENT
// ============================================

interface KanbanColumnProps<T = any> {
  id: string
  label: string
  items: T[]
  schema: any
  actions: any
  state: any
  CardComponent: React.ComponentType<any>
  ColumnHeaderComponent: React.ComponentType<any>
  EmptyColumnComponent: React.ComponentType<any>
}

function KanbanColumn<T>({
  id,
  label,
  items,
  schema,
  actions,
  state,
  CardComponent,
  ColumnHeaderComponent,
  EmptyColumnComponent,
}: KanbanColumnProps<T>) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex min-w-[280px] flex-1 flex-col rounded-lg bg-muted/50 p-4 transition-colors',
        isOver && 'bg-muted'
      )}
    >
      <ColumnHeaderComponent
        column={id}
        label={label}
        count={items.length}
        schema={schema}
        actions={actions}
        state={state}
      />

      <div className={cn('flex flex-1 flex-col gap-3')}>
        {items.length === 0 ? (
          <EmptyColumnComponent
            column={id}
            label={label}
            schema={schema}
            actions={actions}
            state={state}
          />
        ) : (
          items.map((item: any) => (
            <CardComponent
              key={item[schema.idField]}
              item={item}
              column={id}
              onView={() => actions.setMode('view', item[schema.idField])}
              onEdit={() => actions.setMode('edit', item[schema.idField])}
              isDragging={false}
              schema={schema}
              actions={actions}
              state={state}
            />
          ))
        )}
      </div>
    </div>
  )
}
