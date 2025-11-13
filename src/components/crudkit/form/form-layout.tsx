import * as React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { FormLayoutProps } from '@/lib/crudkit/types'

/**
 * Default FormLayout Component
 *
 * Wraps the entire form with title, error display, and action buttons.
 * Override this to change the form structure (e.g., multi-column, wizard, card layout).
 *
 * @example
 * ```typescript
 * import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
 *
 * const CardFormLayout: React.FC<FormLayoutProps> = ({ children, title, error, onSubmit, onCancel }) => (
 *   <Card>
 *     <CardHeader>
 *       <h2>{title}</h2>
 *     </CardHeader>
 *     <CardContent>
 *       <form onSubmit={onSubmit}>
 *         {error && <Alert variant="destructive">{error}</Alert>}
 *         <div className="grid grid-cols-2 gap-4">{children}</div>
 *       </form>
 *     </CardContent>
 *     <CardFooter>
 *       <Button onClick={onCancel}>Cancel</Button>
 *       <Button type="submit">Save</Button>
 *     </CardFooter>
 *   </Card>
 * )
 *
 * <Crud.Form components={{ Layout: CardFormLayout }} />
 * ```
 */
export const DefaultFormLayout = React.forwardRef<HTMLFormElement, FormLayoutProps>(
  ({ children, title, error, onSubmit, onCancel, isSubmitting, mode, className, schema, actions, state }, ref) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit()
    }

    return (
      <form ref={ref} onSubmit={handleSubmit} className={cn('max-w-2xl space-y-6', className)}>
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {children}

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </form>
    )
  }
)
DefaultFormLayout.displayName = 'DefaultFormLayout'
