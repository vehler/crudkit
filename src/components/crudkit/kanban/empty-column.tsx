import * as React from 'react'
import { cn } from '@/lib/utils'
import type { EmptyColumnProps } from '@/lib/crudkit/types'

/**
 * Default EmptyColumn Component
 *
 * Shown when a kanban column has no items.
 * Override this to customize the empty state (e.g., add illustrations, CTA buttons).
 *
 * @example
 * ```typescript
 * import { Button } from '@/components/ui/button'
 * import { PlusIcon } from 'lucide-react'
 *
 * const CustomEmptyColumn: React.FC<EmptyColumnProps> = ({ label, column, actions }) => (
 *   <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
 *     <EmptyIllustration />
 *     <p className="text-muted-foreground mb-4">No items in {label}</p>
 *     <Button size="sm" onClick={() => actions.setMode('create')}>
 *       <PlusIcon className="mr-2" />
 *       Add Item
 *     </Button>
 *   </div>
 * )
 *
 * <KanbanBoard components={{ EmptyColumn: CustomEmptyColumn }} />
 * ```
 */
export const DefaultEmptyColumn = React.forwardRef<HTMLDivElement, EmptyColumnProps>(
  ({ column, label, className, schema, actions, state }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-center rounded-lg border-2 border-dashed p-8 text-center text-muted-foreground',
          className
        )}
      >
        No items
      </div>
    )
  }
)
DefaultEmptyColumn.displayName = 'DefaultEmptyColumn'
