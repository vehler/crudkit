import * as React from 'react'
import { TableRow, TableCell } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { LoadingStateProps } from '../../lib/component-types'

/**
 * Default LoadingState Component
 *
 * Shown while data is being fetched.
 * Displays skeleton loaders for a better UX.
 *
 * @example
 * ```typescript
 * const MyLoadingState: React.FC<LoadingStateProps> = ({ rowCount = 5 }) => (
 *   <>
 *     {Array.from({ length: rowCount }).map((_, i) => (
 *       <TableRow key={i}>
 *         <TableCell><Skeleton className="h-10 w-10" /></TableCell>
 *         <TableCell><Skeleton className="h-4 w-full" /></TableCell>
 *         <TableCell><Skeleton className="h-4 w-full" /></TableCell>
 *       </TableRow>
 *     ))}
 *   </>
 * )
 * ```
 */
export const DefaultLoadingState = React.forwardRef<HTMLTableRowElement, LoadingStateProps>(
  ({ rowCount, className, schema, actions, state }, ref) => {
    const skeletonRows = rowCount ?? state.pageSize ?? 5

    return (
      <TableRow ref={ref} className={cn(className)}>
        <TableCell
          colSpan={999}
          className="h-24 text-center"
        >
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </TableCell>
      </TableRow>
    )
  }
)
DefaultLoadingState.displayName = 'DefaultLoadingState'
