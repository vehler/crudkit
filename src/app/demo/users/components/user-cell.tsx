import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Cell } from '@/components/crudkit/table'
import type { CellProps } from '@/lib/crudkit/types'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  department: string
}

export const UserCell = React.forwardRef<HTMLTableCellElement, CellProps<User>>(
  ({ field, value, row, ...props }, ref) => {
    // Custom name with avatar
    if (field.name === 'name') {
      const initials = value
        .toString()
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

      return (
        <td ref={ref} className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs dark:bg-blue-900/30 dark:text-blue-400">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-zinc-900 dark:text-zinc-50">{value}</span>
          </div>
        </td>
      )
    }

    // Custom role badges with icons
    if (field.name === 'role') {
      const roleConfig = {
        admin: {
          variant: 'default' as const,
          label: 'Administrator',
          icon: '👑',
        },
        user: {
          variant: 'secondary' as const,
          label: 'User',
          icon: '👤',
        },
        guest: {
          variant: 'outline' as const,
          label: 'Guest',
          icon: '🔓',
        },
      }

      const config = roleConfig[value as keyof typeof roleConfig] || {
        variant: 'outline' as const,
        label: value,
        icon: '❓',
      }

      return (
        <td ref={ref} className="px-4 py-3">
          <Badge variant={config.variant}>
            <span className="mr-1">{config.icon}</span>
            {config.label}
          </Badge>
        </td>
      )
    }

    // Custom status with colored dots
    if (field.name === 'status') {
      const isActive = value === 'active'

      return (
        <td ref={ref} className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                isActive
                  ? 'bg-green-500 animate-pulse'
                  : 'bg-zinc-300 dark:bg-zinc-600'
              }`}
            />
            <span
              className={`text-sm ${
                isActive
                  ? 'text-green-700 dark:text-green-400 font-medium'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </td>
      )
    }

    // Custom department with emoji
    if (field.name === 'department') {
      const deptIcons: Record<string, string> = {
        Engineering: '⚙️',
        Marketing: '📢',
        Sales: '💼',
        Support: '🎧',
      }

      const icon = deptIcons[value as string] || '📁'

      return (
        <td ref={ref} className="px-4 py-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {icon} {value}
          </span>
        </td>
      )
    }

    // Use default rendering for other fields
    return <Cell ref={ref} field={field} value={value} row={row} {...props} />
  }
)

UserCell.displayName = 'UserCell'
