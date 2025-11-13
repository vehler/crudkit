import * as React from 'react'
import { TableRow, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { RowProps } from '@/lib/crudkit/types'
import { Cell as DefaultCell } from '.'
import { Actions as DefaultActions } from '.'

/**
 * Default Row Component
 *
 * Renders a complete table row with selection checkbox, cells, and actions.
 * This is the most complex default component as it orchestrates the entire row.
 *
 * @example
 * ```typescript
 * const ExpandableRow: React.FC<RowProps<User>> = (props) => {
 *   const [expanded, setExpanded] = useState(false)
 *   return (
 *     <>
 *       <TableRow onClick={() => setExpanded(!expanded)}>
 *         <TableCell><Checkbox checked={props.selected} onCheckedChange={props.onSelect} /></TableCell>
 *         <TableCell>{props.row.name}</TableCell>
 *         <TableCell>{props.row.email}</TableCell>
 *       </TableRow>
 *       {expanded && <TableRow><TableCell colSpan={999}>Expanded details...</TableCell></TableRow>}
 *     </>
 *   )
 * }
 * ```
 */
export const DefaultRow = React.forwardRef<HTMLTableRowElement, RowProps & {
  visibleColumns: string[]
  showActions: boolean
  CellComponent: React.ComponentType<any>
  ActionsComponent: React.ComponentType<any>
}>(
  ({
    row,
    index,
    selected,
    onSelect,
    onView,
    onEdit,
    onDelete,
    className,
    schema,
    actions,
    state,
    visibleColumns,
    showActions,
    CellComponent,
    ActionsComponent
  }, ref) => {
    const itemId = row[schema.idField]

    return (
      <TableRow
        ref={ref}
        className={cn(className)}
        data-state={selected ? 'selected' : undefined}
      >
        <TableCell>
          <Checkbox
            checked={selected}
            onCheckedChange={(checked) => onSelect(!!checked)}
          />
        </TableCell>
        {visibleColumns.map((col) => {
          const field = schema.fields.find((f) => f.name === col)
          if (!field) return null

          return (
            <CellComponent
              key={col}
              value={row[col]}
              row={row}
              field={field}
              column={col}
              schema={schema}
              actions={actions}
              state={state}
            />
          )
        })}
        {showActions && (
          <ActionsComponent
            row={row}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            schema={schema}
            actions={actions}
            state={state}
          />
        )}
      </TableRow>
    )
  }
)
DefaultRow.displayName = 'DefaultRow'
