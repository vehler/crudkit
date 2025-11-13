import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCrudContext } from '../crud'
import type { ToolbarRefreshButtonProps } from '@/lib/crudkit/types'

/**
 * Toolbar.RefreshButton Component
 *
 * Button to refresh/reload data. Supports asChild pattern.
 *
 * @example
 * ```typescript
 * // Default usage
 * <Crud.Toolbar.RefreshButton />
 *
 * // Custom text
 * <Crud.Toolbar.RefreshButton>Reload Data</Crud.Toolbar.RefreshButton>
 *
 * // With custom styling
 * <Crud.Toolbar.RefreshButton className="text-blue-500">
 *   <RefreshIcon /> Refresh
 * </Crud.Toolbar.RefreshButton>
 *
 * // With asChild
 * <Crud.Toolbar.RefreshButton asChild>
 *   <button className="custom-button">
 *     <RefreshIcon /> Reload
 *   </button>
 * </Crud.Toolbar.RefreshButton>
 * ```
 */
export const ToolbarRefreshButton = React.forwardRef<HTMLButtonElement, ToolbarRefreshButtonProps>(
  ({ asChild = false, className, children, onClick }, ref) => {
    const { actions } = useCrudContext()

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.()
      await actions.refresh()
    }

    if (asChild) {
      return (
        <Slot ref={ref} onClick={handleClick as any}>
          {children}
        </Slot>
      )
    }

    return (
      <Button
        ref={ref}
        variant="outline"
        onClick={handleClick}
        className={cn(className)}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        {children || 'Refresh'}
      </Button>
    )
  }
)
ToolbarRefreshButton.displayName = 'Crud.Toolbar.RefreshButton'
