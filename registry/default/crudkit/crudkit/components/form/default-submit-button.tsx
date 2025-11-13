import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SubmitButtonProps } from '../../lib/component-types'

/**
 * Default SubmitButton Component
 *
 * Submit button with loading state and dynamic text based on mode.
 * Override this to customize the submit button appearance or add additional functionality.
 *
 * @example
 * ```typescript
 * const CustomSubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, mode, disabled }) => (
 *   <Button
 *     type="submit"
 *     disabled={isSubmitting || disabled}
 *     className="bg-green-500"
 *   >
 *     {isSubmitting ? (
 *       <>
 *         <Spinner className="mr-2" />
 *         Saving...
 *       </>
 *     ) : (
 *       <>
 *         <CheckIcon className="mr-2" />
 *         {mode === 'create' ? 'Create' : 'Update'}
 *       </>
 *     )}
 *   </Button>
 * )
 *
 * <Crud.Form components={{ SubmitButton: CustomSubmitButton }} />
 * ```
 */
export const DefaultSubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ isSubmitting, disabled, mode, className, schema, actions, state }, ref) => {
    return (
      <Button
        ref={ref}
        type="submit"
        disabled={isSubmitting || disabled}
        className={cn(className)}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    )
  }
)
DefaultSubmitButton.displayName = 'DefaultSubmitButton'
