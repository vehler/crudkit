import * as React from 'react'
import { TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ActionsProps } from '@/lib/crudkit/types'

/**
 * Default Actions Component
 *
 * Renders action buttons for view, edit, and delete operations.
 * Override this component to customize the action buttons
 * (e.g., use a dropdown menu, add more actions, etc.).
 *
 * @example
 * ```typescript
 * import { DropdownMenu } from '@/components/ui/dropdown-menu'
 *
 * const MyActions: React.FC<ActionsProps> = ({ row, onView, onEdit, onDelete }) => (
 *   <TableCell>
 *     <DropdownMenu>
 *       <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
 *       <DropdownMenuContent>
 *         <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
 *         <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
 *         <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
 *       </DropdownMenuContent>
 *     </DropdownMenu>
 *   </TableCell>
 * )
 * ```
 */
export const DefaultActions = React.forwardRef<HTMLTableCellElement, ActionsProps>(
  ({ row, onView, onEdit, onDelete, className, schema, actions, state }, ref) => {
    return (
      <TableCell ref={ref} className={cn(className)}>
        <div className="flex gap-2">
          <Button
            onClick={onView}
            variant="ghost"
            size="sm"
          >
            View
          </Button>
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            Delete
          </Button>
        </div>
      </TableCell>
    )
  }
)
DefaultActions.displayName = 'DefaultActions'
