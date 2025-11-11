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
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
// Import the Crud context from crudkit
// Note: Users will need to ensure proper path resolution
import { useCrudContext } from '@/components/crudkit/crud-table'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

export interface KanbanBoardProps {
  /** Field to group items by (e.g., 'status') */
  groupBy: string

  /** Column values to display (e.g., ['todo', 'in-progress', 'done']) */
  columns: string[]

  /** Optional display labels for columns */
  columnLabels?: Record<string, string>

  /** Optional custom card renderer */
  renderCard?: (item: any) => React.ReactNode
}

// ============================================
// KANBAN BOARD COMPONENT
// ============================================

export function KanbanBoard({
  groupBy,
  columns,
  columnLabels,
  renderCard,
}: KanbanBoardProps) {
  const { schema, state, actions } = useCrudContext()
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

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
  const groupedData: Record<string, any[]> = {}
  columns.forEach((col) => {
    groupedData[col] = state.data.filter((item) => item[groupBy] === col)
  })

  // Find the currently dragged item
  const activeItem = activeId
    ? state.data.find((item) => item[schema.idField] === activeId)
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
    const item = state.data.find((d) => d[schema.idField] === itemId)

    if (item && item[groupBy] !== newStatus) {
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
      <div className={cn('flex gap-4 overflow-x-auto p-4')}>
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            id={column}
            title={columnLabels?.[column] || column}
            items={groupedData[column] || []}
            schema={schema}
            actions={actions}
            renderCard={renderCard}
          />
        ))}
      </div>

      <DragOverlay>
        {activeItem ? (
          <KanbanCard
            item={activeItem}
            schema={schema}
            actions={actions}
            isDragging
            renderCard={renderCard}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// ============================================
// KANBAN COLUMN COMPONENT
// ============================================

interface KanbanColumnProps {
  id: string
  title: string
  items: any[]
  schema: any
  actions: any
  renderCard?: (item: any) => React.ReactNode
}

function KanbanColumn({
  id,
  title,
  items,
  schema,
  actions,
  renderCard,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex min-w-[280px] flex-1 flex-col rounded-lg bg-gray-100 p-4 transition-colors',
        isOver && 'bg-gray-200'
      )}
    >
      <div className={cn('mb-4 flex items-center justify-between')}>
        <h3 className={cn('text-lg font-semibold')}>{title}</h3>
        <span
          className={cn(
            'rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-600'
          )}
        >
          {items.length}
        </span>
      </div>

      <div className={cn('flex flex-1 flex-col gap-3')}>
        {items.length === 0 ? (
          <div
            className={cn(
              'flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-400'
            )}
          >
            No items
          </div>
        ) : (
          items.map((item) => (
            <KanbanCard
              key={item[schema.idField]}
              item={item}
              schema={schema}
              actions={actions}
              renderCard={renderCard}
            />
          ))
        )}
      </div>
    </div>
  )
}

// ============================================
// KANBAN CARD COMPONENT
// ============================================

interface KanbanCardProps {
  item: any
  schema: any
  actions: any
  isDragging?: boolean
  renderCard?: (item: any) => React.ReactNode
}

function KanbanCard({
  item,
  schema,
  actions,
  isDragging = false,
  renderCard,
}: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging: isDraggingFromHook } = useDraggable({
    id: item[schema.idField],
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  // If custom renderer provided, use it
  if (renderCard) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          'cursor-move rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
          (isDragging || isDraggingFromHook) && 'opacity-50'
        )}
      >
        {renderCard(item)}
      </div>
    )
  }

  // Default card rendering
  const titleField = schema.fields.find(
    (f: any) => f.name === 'title' || f.name === 'name'
  )
  const descriptionField = schema.fields.find(
    (f: any) => f.name === 'description'
  )

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'cursor-move rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        (isDragging || isDraggingFromHook) && 'opacity-50'
      )}
    >
      <div className={cn('mb-2 font-semibold')}>
        {titleField ? item[titleField.name] : item[schema.idField]}
      </div>

      {descriptionField && item[descriptionField.name] && (
        <div className={cn('mb-3 text-sm text-gray-600')}>
          {item[descriptionField.name]}
        </div>
      )}

      <div className={cn('flex gap-2')}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            actions.setMode('view', item[schema.idField])
          }}
          className={cn(
            'rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100'
          )}
        >
          View
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            actions.setMode('edit', item[schema.idField])
          }}
          className={cn(
            'rounded bg-gray-50 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100'
          )}
        >
          Edit
        </button>
      </div>
    </div>
  )
}
