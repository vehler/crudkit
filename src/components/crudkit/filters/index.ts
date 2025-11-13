/**
 * Filter Components
 *
 * Export all filter components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { Filter, FilterInput, FilterLayout } from '@/components/crudkit/filters'
 *
 * // Extend filter
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
 *   return <Filter {...props} />
 * }
 *
 * <Crud.Filters components={{ filters: { createdAt: DateRangeFilter } }} />
 * ```
 */

export { DefaultFilter as Filter } from './filter'
export { DefaultFilterInput as FilterInput } from './filter-input'
export { DefaultFilterLayout as FilterLayout } from './filter-layout'
