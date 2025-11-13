/**
 * Form Default Components
 *
 * Export all default form components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { DefaultField, DefaultFormLayout } from '@/registry/default/crudkit/crudkit/components/form'
 *
 * // Extend default components
 * const MyField: React.FC<FieldProps> = (props) => {
 *   if (props.field.name === 'avatar') {
 *     return <ImageUploadField {...props} />
 *   }
 *   return <DefaultField {...props} />
 * }
 *
 * <Crud.Form components={{ Field: MyField }} />
 * ```
 */

export { DefaultField } from './default-field'
export { DefaultFormLayout } from './default-form-layout'
export { DefaultSubmitButton } from './default-submit-button'
