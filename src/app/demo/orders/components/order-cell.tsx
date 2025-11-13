import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Cell } from '@/components/crudkit/table'
import type { CellProps } from '@/lib/crudkit/types'
import { Package, Truck, CheckCircle2, XCircle, Clock } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  customer: string
  email: string
  total: number
  status: string
  date: string
  items?: string
}

export const OrderCell = React.forwardRef<HTMLTableCellElement, CellProps<Order>>(
  ({ field, value, row, ...props }, ref) => {
    // Custom order number with icon
    if (field.name === 'orderNumber') {
      return (
        <td ref={ref} className="px-4 py-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-zinc-500" />
            <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {value}
            </span>
          </div>
        </td>
      )
    }

    // Custom total with currency formatting
    if (field.name === 'total') {
      return (
        <td ref={ref} className="px-4 py-3">
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            ${Number(value).toFixed(2)}
          </span>
        </td>
      )
    }

    // Custom status with icons and colors
    if (field.name === 'status') {
      const statusConfig = {
        pending: {
          variant: 'outline' as const,
          label: 'Pending',
          icon: Clock,
          color: 'text-zinc-600',
        },
        processing: {
          variant: 'secondary' as const,
          label: 'Processing',
          icon: Package,
          color: 'text-blue-600',
        },
        shipped: {
          variant: 'default' as const,
          label: 'Shipped',
          icon: Truck,
          color: 'text-blue-600',
        },
        delivered: {
          variant: 'default' as const,
          label: 'Delivered',
          icon: CheckCircle2,
          color: 'text-green-600',
        },
        cancelled: {
          variant: 'destructive' as const,
          label: 'Cancelled',
          icon: XCircle,
          color: 'text-red-600',
        },
      }

      const config = statusConfig[value as keyof typeof statusConfig] || {
        variant: 'outline' as const,
        label: value,
        icon: Package,
        color: 'text-zinc-600',
      }

      const Icon = config.icon

      return (
        <td ref={ref} className="px-4 py-3">
          <Badge variant={config.variant} className="gap-1">
            <Icon className={`h-3 w-3 ${config.color}`} />
            {config.label}
          </Badge>
        </td>
      )
    }

    // Custom date formatting
    if (field.name === 'date') {
      const date = new Date(value as string)
      const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

      return (
        <td ref={ref} className="px-4 py-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{formatted}</span>
        </td>
      )
    }

    // Use default rendering for other fields
    return <Cell ref={ref} field={field} value={value} row={row} {...props} />
  }
)

OrderCell.displayName = 'OrderCell'
