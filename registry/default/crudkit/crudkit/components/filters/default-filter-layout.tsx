import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { FilterLayoutProps } from '../../lib/component-types'

/**
 * Default FilterLayout Component
 *
 * Wraps the entire filters section with title and clear button.
 * Override this to customize the overall filter container layout.
 *
 * @example
 * ```typescript
 * import type { FilterLayoutProps } from '@/registry/default/crudkit/crudkit/components/filters'
 * import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
 *
 * const CardFilterLayout: React.FC<FilterLayoutProps> = ({ children, onClearFilters, hasActiveFilters }) => (
 *   <Card>
 *     <CardHeader>
 *       <h3 className="font-semibold">Filter Results</h3>
 *     </CardHeader>
 *     <CardContent>
 *       <div className="grid grid-cols-3 gap-4">{children}</div>
 *     </CardContent>
 *     {hasActiveFilters && (
 *       <CardFooter>
 *         <Button onClick={onClearFilters}>Reset All Filters</Button>
 *       </CardFooter>
 *     )}
 *   </Card>
 * )
 *
 * <Crud.Filters components={{ Layout: CardFilterLayout }} />
 * ```
 */
export const DefaultFilterLayout = React.forwardRef<HTMLDivElement, FilterLayoutProps>(
  ({ children, onClearFilters, hasActiveFilters, className, schema, actions, state }, ref) => {
    return (
      <div ref={ref} className={cn('crud-filters', 'mb-4 rounded bg-muted p-4', className)}>
        <h3 className={cn('mb-2 font-semibold')}>Filters</h3>
        <div className={cn('flex flex-wrap gap-4')}>
          {children}
          <div className={cn('flex items-end')}>
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="sm"
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    )
  }
)
DefaultFilterLayout.displayName = 'DefaultFilterLayout'
