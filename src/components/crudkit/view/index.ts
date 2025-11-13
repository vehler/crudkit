/**
 * View Components
 *
 * Export all view components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { ViewField, ViewLayout } from '@/components/crudkit/view'
 *
 * // Extend components
 * const MyViewField: React.FC<ViewFieldProps> = (props) => {
 *   if (props.field.name === 'createdAt') {
 *     return (
 *       <div>
 *         <strong>{props.field.label}:</strong>
 *         <time>{new Date(props.value).toLocaleDateString()}</time>
 *       </div>
 *     )
 *   }
 *   return <ViewField {...props} />
 * }
 *
 * <Crud.View components={{ Field: MyViewField }} />
 * ```
 */

export { DefaultViewField as ViewField } from './view-field'
export { DefaultViewLayout as ViewLayout } from './view-layout'
