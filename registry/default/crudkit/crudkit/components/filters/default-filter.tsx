import * as React from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { DefaultFilterInput } from './default-filter-input'
import type { FilterProps } from '../../lib/component-types'

/**
 * Default Filter Component
 *
 * Displays a single filter with label and input.
 * Override this to customize the filter layout.
 *
 * @example
 * ```typescript
 * import { DefaultFilter } from '@/registry/default/crudkit/crudkit/components/filters'
 * import { Badge } from '@/components/ui/badge'
 *
 * const FilterWithBadge: React.FC<FilterProps> = (props) => {
 *   const { field, value } = props
 *
 *   return (
 *     <div className="relative space-y-2">
 *       <DefaultFilter {...props} />
 *       {value && <Badge className="absolute -top-2 -right-2">Active</Badge>}
 *     </div>
 *   )
 * }
 *
 * <Crud.Filters components={{ Filter: FilterWithBadge }} />
 * ```
 */
export const DefaultFilter = React.forwardRef<HTMLDivElement, FilterProps>(
  ({ field, value, onChange, onClear, className, schema, actions, state }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        <Label htmlFor={`filter-${field.name}`}>
          {field.label}
        </Label>
        <DefaultFilterInput
          field={field}
          value={value}
          onChange={onChange}
          schema={schema}
          actions={actions}
          state={state}
        />
      </div>
    )
  }
)
DefaultFilter.displayName = 'DefaultFilter'
