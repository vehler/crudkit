import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ColumnHeaderProps } from '@/registry/default/crudkit/crudkit/lib/component-types'

/**
 * Default ColumnHeader Component
 *
 * Displays column title and item count.
 * Override this to add filters, actions, or custom styling to column headers.
 *
 * @example
 * ```typescript
 * import { DropdownMenu } from '@/components/ui/dropdown-menu'
 *
 * const CustomColumnHeader: React.FC<ColumnHeaderProps> = ({ label, count, column }) => (
 *   <div className="mb-4 flex items-center justify-between">
 *     <div className="flex items-center gap-2">
 *       <h3 className="text-lg font-semibold">{label}</h3>
 *       <Badge>{count}</Badge>
 *     </div>
 *     <DropdownMenu>
 *       <DropdownMenuTrigger>⋮</DropdownMenuTrigger>
 *       <DropdownMenuContent>
 *         <DropdownMenuItem>Sort by date</DropdownMenuItem>
 *         <DropdownMenuItem>Sort by priority</DropdownMenuItem>
 *       </DropdownMenuContent>
 *     </DropdownMenu>
 *   </div>
 * )
 *
 * <KanbanBoard components={{ ColumnHeader: CustomColumnHeader }} />
 * ```
 */
export const DefaultColumnHeader = React.forwardRef<HTMLDivElement, ColumnHeaderProps>(
  ({ column, label, count, className, schema, actions, state }, ref) => {
    return (
      <div ref={ref} className={cn('mb-4 flex items-center justify-between', className)}>
        <h3 className="text-lg font-semibold">{label}</h3>
        <Badge variant="secondary">
          {count}
        </Badge>
      </div>
    )
  }
)
DefaultColumnHeader.displayName = 'DefaultColumnHeader'
