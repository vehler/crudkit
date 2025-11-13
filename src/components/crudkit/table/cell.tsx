import * as React from 'react'
import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { CellProps } from '@/lib/crudkit/types'

/**
 * Default Cell Component
 *
 * Renders a table cell with the field value.
 * Override this component to customize cell rendering globally,
 * or use it as a fallback in your custom cell component.
 *
 * @example
 * ```typescript
 * import { DefaultCell } from '@/components/crudkit/components/table'
 *
 * const MyCell: React.FC<CellProps> = (props) => {
 *   if (props.field.name === 'status') {
 *     return <TableCell><Badge>{props.value}</Badge></TableCell>
 *   }
 *   // Use default for other fields
 *   return <DefaultCell {...props} />
 * }
 * ```
 */
export const DefaultCell = React.forwardRef<HTMLTableCellElement, CellProps>(
  ({ value, field, row, column, className, schema, actions, state }, ref) => {
    return (
      <TableCell ref={ref} className={cn(className)}>
        {value ?? '-'}
      </TableCell>
    )
  }
)
DefaultCell.displayName = 'DefaultCell'
