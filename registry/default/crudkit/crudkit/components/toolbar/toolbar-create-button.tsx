import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCrudContext } from '../crud-table'
import type { ToolbarCreateButtonProps } from '../../lib/component-types'

/**
 * Toolbar.CreateButton Component
 *
 * Button to create a new item. Supports asChild pattern for custom elements (e.g., Link).
 *
 * @example
 * ```typescript
 * // Default usage
 * <Crud.Toolbar.CreateButton />
 *
 * // Custom text
 * <Crud.Toolbar.CreateButton>Add New User</Crud.Toolbar.CreateButton>
 *
 * // With custom styling
 * <Crud.Toolbar.CreateButton className="bg-green-500">
 *   <PlusIcon /> Create
 * </Crud.Toolbar.CreateButton>
 *
 * // With asChild (render as Link for client-side routing)
 * <Crud.Toolbar.CreateButton asChild>
 *   <Link href="/users/new">
 *     <PlusIcon className="mr-2" />
 *     Invite Team Member
 *   </Link>
 * </Crud.Toolbar.CreateButton>
 * ```
 */
export const ToolbarCreateButton = React.forwardRef<HTMLButtonElement, ToolbarCreateButtonProps>(
  ({ asChild = false, className, children, onClick }, ref) => {
    const { actions } = useCrudContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.()
      actions.setMode('create')
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
        onClick={handleClick}
        className={cn(className)}
        variant="default"
      >
        <Plus className="h-4 w-4 mr-2" />
        {children || 'Create New'}
      </Button>
    )
  }
)
ToolbarCreateButton.displayName = 'Crud.Toolbar.CreateButton'
