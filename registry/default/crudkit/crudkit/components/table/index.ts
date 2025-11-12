/**
 * Table Default Components
 *
 * Export all default table components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { DefaultCell, DefaultRow } from '@/registry/default/crudkit/crudkit/components/table'
 *
 * // Extend default components
 * const MyCell: React.FC<CellProps> = (props) => {
 *   if (props.field.name === 'status') {
 *     return <TableCell><Badge>{props.value}</Badge></TableCell>
 *   }
 *   return <DefaultCell {...props} />
 * }
 * ```
 */

export { DefaultRow } from './default-row'
export { DefaultCell } from './default-cell'
export { DefaultActions } from './default-actions'
export { DefaultHeader } from './default-header'
export { DefaultEmptyState } from './default-empty-state'
export { DefaultLoadingState } from './default-loading-state'
