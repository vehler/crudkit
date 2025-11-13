import * as React from 'react'
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { EmptyStateProps } from '../../lib/component-types'

/**
 * Default EmptyState Component
 *
 * Shown when no data is available in the table.
 * Displays different messages based on whether filters are active.
 *
 * @example
 * ```typescript
 * const MyEmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => (
 *   <TableRow>
 *     <TableCell colSpan={999} className="h-32 text-center">
 *       <div className="flex flex-col items-center gap-4">
 *         <EmptyIllustration />
 *         <p>No items found</p>
 *         {hasFilters && (
 *           <Button onClick={onClearFilters}>Clear all filters</Button>
 *         )}
 *       </div>
 *     </TableCell>
 *   </TableRow>
 * )
 * ```
 */
export const DefaultEmptyState = React.forwardRef<HTMLTableRowElement, EmptyStateProps>(
  ({ message, hasFilters, onClearFilters, className, schema, actions, state }, ref) => {
    return (
      <TableRow ref={ref} className={cn(className)}>
        <TableCell
          colSpan={999}
          className="h-24 text-center text-muted-foreground"
        >
          <div className="flex flex-col items-center gap-2">
            <p>{message || 'No data found'}</p>
            {hasFilters && (
              <Button
                onClick={onClearFilters}
                variant="outline"
                size="sm"
              >
                Clear filters
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    )
  }
)
DefaultEmptyState.displayName = 'DefaultEmptyState'
