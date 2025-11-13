/**
 * Filters Default Components
 *
 * Export all default filter components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { DefaultFilter, DefaultFilterInput, DefaultFilterLayout } from '@/registry/default/crudkit/crudkit/components/filters'
 *
 * // Extend default filter
 * const DateRangeFilter: React.FC<FilterProps> = (props) => {
 *   const { field, value, onChange } = props
 *
 *   if (field.type === 'date') {
 *     return (
 *       <div className="space-y-2">
 *         <Label>{field.label}</Label>
 *         <DateRangePicker value={value} onChange={onChange} />
 *       </div>
 *     )
 *   }
 *
 *   return <DefaultFilter {...props} />
 * }
 *
 * <Crud.Filters components={{ filters: { createdAt: DateRangeFilter } }} />
 * ```
 */

export { DefaultFilter } from './default-filter'
export { DefaultFilterInput } from './default-filter-input'
export { DefaultFilterLayout } from './default-filter-layout'
