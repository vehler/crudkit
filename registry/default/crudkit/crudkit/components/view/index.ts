/**
 * View Default Components
 *
 * Export all default view components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { DefaultViewField, DefaultViewLayout } from '@/registry/default/crudkit/crudkit/components/view'
 *
 * // Extend default components
 * const MyViewField: React.FC<ViewFieldProps> = (props) => {
 *   if (props.field.name === 'createdAt') {
 *     return (
 *       <div>
 *         <strong>{props.field.label}:</strong>
 *         <time>{new Date(props.value).toLocaleDateString()}</time>
 *       </div>
 *     )
 *   }
 *   return <DefaultViewField {...props} />
 * }
 *
 * <Crud.View components={{ Field: MyViewField }} />
 * ```
 */

export { DefaultViewField } from './default-view-field'
export { DefaultViewLayout } from './default-view-layout'
