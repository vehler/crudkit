import React from 'react'
import type { RowProps } from '@/lib/crudkit/types'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  department: string
}

export const UserRow = React.forwardRef<HTMLTableRowElement, RowProps<User> & { children?: React.ReactNode }>(
  ({ row, children, className, selected, onSelect, onView, onEdit, onDelete, schema, actions, state, index, ...domProps }, ref) => {
    // Add subtle background color for inactive users
    const isInactive = row.status === 'inactive'
    const isAdmin = row.role === 'admin'

    return (
      <tr
        ref={ref}
        className={`
          transition-colors
          hover:bg-blue-50 dark:hover:bg-blue-950/20
          ${isInactive ? 'opacity-60' : ''}
          ${isAdmin ? 'border-l-2 border-l-blue-500' : ''}
          ${className || ''}
        `}
        data-state={selected ? 'selected' : undefined}
        {...domProps}
      >
        {children}
      </tr>
    )
  }
)

UserRow.displayName = 'UserRow'
