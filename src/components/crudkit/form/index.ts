/**
 * Form Components
 *
 * Export all form components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { Field, FormLayout } from '@/components/crudkit/form'
 *
 * // Extend components
 * const MyField: React.FC<FieldProps> = (props) => {
 *   if (props.field.name === 'avatar') {
 *     return <ImageUploadField {...props} />
 *   }
 *   return <Field {...props} />
 * }
 *
 * <Crud.Form components={{ Field: MyField }} />
 * ```
 */

export { DefaultField as Field } from './field'
export { DefaultFormLayout as FormLayout } from './form-layout'
export { DefaultSubmitButton as SubmitButton } from './submit-button'
