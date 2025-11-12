import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { FilterInputProps } from '../../lib/component-types'

/**
 * Default FilterInput Component
 *
 * Renders the input element for a filter (text input or select).
 * Override this to customize the input type for all filters.
 *
 * @example
 * ```typescript
 * import { DefaultFilterInput } from '@/registry/default/crudkit/crudkit/components/filters'
 *
 * const CustomFilterInput: React.FC<FilterInputProps> = (props) => {
 *   const { field, value, onChange } = props
 *
 *   // Custom date picker for date fields
 *   if (field.type === 'date') {
 *     return <DatePicker value={value} onChange={onChange} />
 *   }
 *
 *   // Fall back to default for other types
 *   return <DefaultFilterInput {...props} />
 * }
 *
 * <Crud.Filters components={{ FilterInput: CustomFilterInput }} />
 * ```
 */
export const DefaultFilterInput = React.forwardRef<HTMLDivElement, FilterInputProps>(
  ({ field, value, onChange, className, schema, actions, state }, ref) => {
    if (field.type === 'select' && field.options) {
      return (
        <Select
          value={value || '__all__'}
          onValueChange={(newValue) =>
            onChange(newValue === '__all__' ? '' : newValue)
          }
        >
          <SelectTrigger
            ref={ref as any}
            id={`filter-${field.name}`}
            className={cn('w-[180px]', className)}
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All</SelectItem>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    return (
      <Input
        ref={ref as any}
        id={`filter-${field.name}`}
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={cn('w-[180px]', className)}
      />
    )
  }
)
DefaultFilterInput.displayName = 'DefaultFilterInput'
