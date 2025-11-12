/**
 * Example: Custom Cell Components
 *
 * This example demonstrates how to create custom cell renderers
 * for specific data types (status badges, avatars, dates, etc.)
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DefaultCell } from '../components/table'
import type { CellProps } from '../lib/component-types'

// =============================================================================
// EXAMPLE 1: Status Badge Cell
// =============================================================================

const StatusCell: React.FC<CellProps<User>> = (props) => {
  const { value, field } = props

  // Only apply to status field
  if (field.name !== 'status') {
    return <DefaultCell {...props} />
  }

  const statusColors = {
    active: 'default',
    inactive: 'secondary',
    pending: 'outline',
  } as const

  return (
    <td className="px-4 py-2">
      <Badge variant={statusColors[value as keyof typeof statusColors] || 'default'}>
        {value}
      </Badge>
    </td>
  )
}

// =============================================================================
// EXAMPLE 2: Avatar Cell
// =============================================================================

const AvatarCell: React.FC<CellProps<User>> = (props) => {
  const { value, field, row } = props

  // Only apply to avatar field
  if (field.name !== 'avatar') {
    return <DefaultCell {...props} />
  }

  return (
    <td className="px-4 py-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={value} alt={row.name} />
        <AvatarFallback>{row.name?.charAt(0) || '?'}</AvatarFallback>
      </Avatar>
    </td>
  )
}

// =============================================================================
// EXAMPLE 3: Date Formatting Cell
// =============================================================================

const DateCell: React.FC<CellProps> = (props) => {
  const { value, field } = props

  // Only apply to date fields
  if (field.type !== 'date' && !field.name.includes('Date')) {
    return <DefaultCell {...props} />
  }

  const formattedDate = value
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(value))
    : '-'

  return (
    <td className="px-4 py-2">
      <span className="text-sm text-muted-foreground">{formattedDate}</span>
    </td>
  )
}

// =============================================================================
// EXAMPLE 4: Combined Cell Renderer
// =============================================================================

/**
 * A single cell component that handles multiple field types.
 * This is useful when you want centralized cell rendering logic.
 */
const SmartCell: React.FC<CellProps<User>> = (props) => {
  const { value, field, row } = props

  // Status badge
  if (field.name === 'status') {
    const statusColors = {
      active: 'default',
      inactive: 'secondary',
      pending: 'outline',
    } as const

    return (
      <td className="px-4 py-2">
        <Badge variant={statusColors[value as keyof typeof statusColors] || 'default'}>
          {value}
        </Badge>
      </td>
    )
  }

  // Avatar
  if (field.name === 'avatar') {
    return (
      <td className="px-4 py-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={value} alt={row.name} />
          <AvatarFallback>{row.name?.charAt(0) || '?'}</AvatarFallback>
        </Avatar>
      </td>
    )
  }

  // Date formatting
  if (field.type === 'date' || field.name.includes('Date')) {
    const formattedDate = value
      ? new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(new Date(value))
      : '-'

    return (
      <td className="px-4 py-2">
        <span className="text-sm text-muted-foreground">{formattedDate}</span>
      </td>
    )
  }

  // Default for everything else
  return <DefaultCell {...props} />
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

interface User {
  id: string
  name: string
  email: string
  avatar: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

export function TableWithStatusBadges() {
  return (
    <Crud schema={userSchema} dataProvider={userProvider}>
      <Crud.Toolbar />
      <Crud.List<User> components={{ Cell: StatusCell }} />
    </Crud>
  )
}

export function TableWithAvatars() {
  return (
    <Crud schema={userSchema} dataProvider={userProvider}>
      <Crud.Toolbar />
      <Crud.List<User> components={{ Cell: AvatarCell }} />
    </Crud>
  )
}

export function TableWithDateFormatting() {
  return (
    <Crud schema={userSchema} dataProvider={userProvider}>
      <Crud.Toolbar />
      <Crud.List components={{ Cell: DateCell }} />
    </Crud>
  )
}

export function TableWithSmartCell() {
  return (
    <Crud schema={userSchema} dataProvider={userProvider}>
      <Crud.Toolbar />
      <Crud.List<User> components={{ Cell: SmartCell }} />
    </Crud>
  )
}

// Mock schema and provider (replace with actual implementations)
const userSchema: any = {}
const userProvider: any = {}
