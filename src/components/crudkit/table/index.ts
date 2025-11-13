/**
 * Table Components
 *
 * Export all table components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { Cell, Row } from '@/components/crudkit/table'
 *
 * // Extend components
 * const MyCell: React.FC<CellProps> = (props) => {
 *   if (props.field.name === 'status') {
 *     return <TableCell><Badge>{props.value}</Badge></TableCell>
 *   }
 *   return <Cell {...props} />
 * }
 * ```
 */

export { DefaultRow as Row } from './row'
export { DefaultCell as Cell } from './cell'
export { DefaultActions as Actions } from './actions'
export { DefaultHeader as Header } from './header'
export { DefaultEmptyState as EmptyState } from './empty-state'
export { DefaultLoadingState as LoadingState } from './loading-state'
