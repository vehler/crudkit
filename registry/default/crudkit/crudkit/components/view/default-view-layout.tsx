import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ViewLayoutProps } from '../../lib/component-types'

/**
 * Default ViewLayout Component
 *
 * Wraps the entire detail view with title, fields, and action buttons.
 * Override this to change the view structure (e.g., card layout, tabs, sections).
 *
 * @example
 * ```typescript
 * import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
 *
 * const CardViewLayout: React.FC<ViewLayoutProps> = ({ children, item, onEdit, onBack, schema }) => (
 *   <Card>
 *     <CardHeader>
 *       <h2>View {schema.title}</h2>
 *     </CardHeader>
 *     <CardContent>
 *       <div className="grid grid-cols-2 gap-4">{children}</div>
 *     </CardContent>
 *     <CardFooter className="flex gap-2">
 *       <Button onClick={onBack}>Back</Button>
 *       <Button onClick={onEdit}>Edit</Button>
 *     </CardFooter>
 *   </Card>
 * )
 *
 * <Crud.View components={{ Layout: CardViewLayout }} />
 * ```
 */
export const DefaultViewLayout = React.forwardRef<HTMLDivElement, ViewLayoutProps>(
  ({ children, item, onEdit, onBack, className, schema, actions, state }, ref) => {
    return (
      <div ref={ref} className={cn('max-w-2xl space-y-6', className)}>
        <h2 className="text-xl font-bold">
          View {schema.title}
        </h2>

        {state.loading && (
          <div className="space-y-3">
            {schema.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))}
          </div>
        )}

        {!state.loading && item && (
          <div className="space-y-3">
            {children}
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={onEdit}>
            Edit
          </Button>
          <Button onClick={onBack} variant="outline">
            Back to List
          </Button>
        </div>
      </div>
    )
  }
)
DefaultViewLayout.displayName = 'DefaultViewLayout'
