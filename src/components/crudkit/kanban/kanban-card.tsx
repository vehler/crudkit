import * as React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { CardProps } from '@/lib/crudkit/types'

/**
 * Default KanbanCard Component
 *
 * Draggable card displaying item information.
 * Override this to customize card appearance and content.
 *
 * @example
 * ```typescript
 * import { DefaultKanbanCard } from '@/components/crudkit-kanban/components/kanban'
 * import { Badge } from '@/components/ui/badge'
 *
 * const PriorityCard: React.FC<CardProps<Task>> = (props) => {
 *   const { item, onView, onEdit, isDragging } = props
 *
 *   return (
 *     <Card className={cn('cursor-move', isDragging && 'opacity-50')}>
 *       <CardHeader>
 *         <div className="flex justify-between">
 *           <CardTitle>{item.title}</CardTitle>
 *           <Badge variant={item.priority === 'high' ? 'destructive' : 'default'}>
 *             {item.priority}
 *           </Badge>
 *         </div>
 *       </CardHeader>
 *       <CardFooter>
 *         <Button size="sm" onClick={onView}>View</Button>
 *         <Button size="sm" onClick={onEdit}>Edit</Button>
 *       </CardFooter>
 *     </Card>
 *   )
 * }
 *
 * <KanbanBoard components={{ Card: PriorityCard }} />
 * ```
 */
export const DefaultKanbanCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ item, column, onView, onEdit, isDragging, className, schema, actions, state }, ref) => {
    const { attributes, listeners, setNodeRef, transform, isDragging: isDraggingFromHook } = useDraggable({
      id: item[schema.idField],
    })

    const style = transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined

    // Default card rendering - find title and description fields
    const titleField = schema.fields.find(
      (f: any) => f.name === 'title' || f.name === 'name'
    )
    const descriptionField = schema.fields.find(
      (f: any) => f.name === 'description'
    )

    return (
      <Card
        ref={(node) => {
          setNodeRef(node)
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          'cursor-move transition-opacity hover:shadow-md',
          (isDragging || isDraggingFromHook) && 'opacity-50',
          className
        )}
      >
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-base">
            {titleField ? item[titleField.name] : item[schema.idField]}
          </CardTitle>
          {descriptionField && item[descriptionField.name] && (
            <CardDescription className="text-sm">
              {item[descriptionField.name]}
            </CardDescription>
          )}
        </CardHeader>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onView()
            }}
            variant="ghost"
            size="sm"
          >
            View
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            variant="ghost"
            size="sm"
          >
            Edit
          </Button>
        </CardFooter>
      </Card>
    )
  }
)
DefaultKanbanCard.displayName = 'DefaultKanbanCard'
