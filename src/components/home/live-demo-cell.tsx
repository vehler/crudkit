import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Cell } from '@/components/crudkit/table'
import type { CellProps } from '@/lib/crudkit/types'

interface DemoUser {
  id: string
  name: string
  email: string
  role: string
  status: string
}

export const LiveDemoCell = React.forwardRef<HTMLTableCellElement, CellProps<DemoUser>>(
  ({ field, value, row, ...props }, ref) => {
    // Custom role badges
    if (field.name === 'role') {
      const roleVariants = {
        Admin: 'default' as const,
        User: 'secondary' as const,
      }

      return (
        <td ref={ref} className="px-4 py-3">
          <Badge variant={roleVariants[value as keyof typeof roleVariants] || 'outline'}>
            {value}
          </Badge>
        </td>
      )
    }

    // Custom status badges
    if (field.name === 'status') {
      const isActive = value === 'Active'

      return (
        <td ref={ref} className="px-4 py-3">
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {value}
          </Badge>
        </td>
      )
    }

    // Use default rendering for other fields
    return <Cell ref={ref} field={field} value={value} row={row} {...props} />
  }
)

LiveDemoCell.displayName = 'LiveDemoCell'
