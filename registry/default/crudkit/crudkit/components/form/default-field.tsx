import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { FieldProps } from '../../lib/component-types'

/**
 * Default Field Component
 *
 * Renders form inputs based on field type (text, select, textarea, etc.).
 * Override this for global field customization or use fieldRenderers for specific fields.
 *
 * @example
 * ```typescript
 * import { DefaultField } from '@/registry/default/crudkit/crudkit/components/form'
 *
 * // Extend default field
 * const MyField: React.FC<FieldProps> = (props) => {
 *   if (props.field.type === 'custom') {
 *     return <CustomInput {...props} />
 *   }
 *   return <DefaultField {...props} />
 * }
 *
 * // Use with Crud.Form
 * <Crud.Form components={{ Field: MyField }} />
 * ```
 */
export const DefaultField = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ field, value, error, onChange, onBlur, disabled, mode, className, schema, actions, state }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        <Label htmlFor={`form-${field.name}`}>
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>

        {field.type === 'select' ? (
          <Select
            value={value ? String(value) : undefined}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger id={`form-${field.name}`}>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === 'textarea' ? (
          <Textarea
            id={`form-${field.name}`}
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            rows={4}
          />
        ) : (
          <Input
            id={`form-${field.name}`}
            type={field.type || 'text'}
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
          />
        )}

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)
DefaultField.displayName = 'DefaultField'
