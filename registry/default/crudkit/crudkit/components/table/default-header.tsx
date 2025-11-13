import * as React from 'react'
import { TableHead } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { HeaderProps } from '../../lib/component-types'

/**
 * Default Header Component
 *
 * Renders a sortable column header.
 * Shows sort indicators (↑/↓) when column is sorted.
 *
 * @example
 * ```typescript
 * const MyHeader: React.FC<HeaderProps> = (props) => (
 *   <TableHead onClick={() => props.sortable && props.onSort(props.field.name)}>
 *     <div className="flex items-center gap-2">
 *       <Icon name={props.field.name} />
 *       {props.field.label}
 *       {props.currentSort?.field === props.field.name && (
 *         props.currentSort.order === 'asc' ? '↑' : '↓'
 *       )}
 *     </div>
 *   </TableHead>
 * )
 * ```
 */
export const DefaultHeader = React.forwardRef<HTMLTableCellElement, HeaderProps>(
  ({ field, sortable, currentSort, onSort, className, schema, actions, state }, ref) => {
    const isSorted = currentSort?.field === field.name
    const canSort = sortable && field.sortable !== false

    return (
      <TableHead
        ref={ref}
        className={cn(
          canSort && 'cursor-pointer select-none hover:bg-muted/50',
          className
        )}
        onClick={() => canSort && onSort(field.name)}
      >
        <div className="flex items-center gap-1">
          {field.label}
          {isSorted && (
            <span className="text-muted-foreground">
              {currentSort.order === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </TableHead>
    )
  }
)
DefaultHeader.displayName = 'DefaultHeader'
