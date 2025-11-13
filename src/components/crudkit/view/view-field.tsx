import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ViewFieldProps } from '@/lib/crudkit/types'

/**
 * Default ViewField Component
 *
 * Displays a single field in detail view with label and value.
 * Override this for global field display customization or use fieldRenderers for specific fields.
 *
 * @example
 * ```typescript
 * import { DefaultViewField } from '@/components/crudkit/components/view'
 * import { Avatar, AvatarImage } from '@/components/ui/avatar'
 *
 * // Extend default view field
 * const MyViewField: React.FC<ViewFieldProps> = (props) => {
 *   if (props.field.name === 'avatar') {
 *     return (
 *       <div>
 *         <strong>{props.field.label}:</strong>
 *         <Avatar><AvatarImage src={props.value} /></Avatar>
 *       </div>
 *     )
 *   }
 *   return <DefaultViewField {...props} />
 * }
 *
 * // Use with Crud.View
 * <Crud.View components={{ Field: MyViewField }} />
 * ```
 */
export const DefaultViewField = React.forwardRef<HTMLDivElement, ViewFieldProps>(
  ({ field, value, item, className, schema, actions, state }, ref) => {
    return (
      <div ref={ref} className={cn(className)}>
        <strong className="font-medium">{field.label}:</strong>{' '}
        <span className="text-muted-foreground">
          {value ?? '-'}
        </span>
      </div>
    )
  }
)
DefaultViewField.displayName = 'DefaultViewField'
