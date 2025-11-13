import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Cell } from '@/components/crudkit/table'
import type { CellProps } from '@/lib/crudkit/types'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: string
  description?: string
}

export const ProductCell = React.forwardRef<HTMLTableCellElement, CellProps<Product>>(
  ({ field, value, row, ...props }, ref) => {
    // Custom price formatting
    if (field.name === 'price') {
      return (
        <td ref={ref} className="px-4 py-3">
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            ${Number(value).toFixed(2)}
          </span>
        </td>
      )
    }

    // Custom stock badges with color coding
    if (field.name === 'stock') {
      const stockLevel = Number(value)
      let variant: 'default' | 'destructive' | 'outline' | 'secondary' = 'default'
      let badgeText = `${stockLevel} in stock`

      if (stockLevel === 0) {
        variant = 'destructive'
        badgeText = 'Out of Stock'
      } else if (stockLevel < 20) {
        variant = 'outline'
        badgeText = `Low: ${stockLevel}`
      } else if (stockLevel < 50) {
        variant = 'secondary'
        badgeText = `${stockLevel} units`
      }

      return (
        <td ref={ref} className="px-4 py-3">
          <Badge variant={variant}>{badgeText}</Badge>
        </td>
      )
    }

    // Custom status badges
    if (field.name === 'status') {
      const statusConfig = {
        active: { variant: 'default' as const, label: 'Active' },
        discontinued: { variant: 'secondary' as const, label: 'Discontinued' },
        'out-of-stock': { variant: 'destructive' as const, label: 'Out of Stock' },
      }

      const config = statusConfig[value as keyof typeof statusConfig] || {
        variant: 'outline' as const,
        label: value,
      }

      return (
        <td ref={ref} className="px-4 py-3">
          <Badge variant={config.variant}>{config.label}</Badge>
        </td>
      )
    }

    // Custom category with emoji icons
    if (field.name === 'category') {
      const categoryIcons: Record<string, string> = {
        electronics: '📱',
        clothing: '👕',
        sports: '⚽',
        home: '🏠',
        books: '📚',
      }

      const icon = categoryIcons[value as string] || '📦'
      const label = field.options?.find((opt) => opt.value === value)?.label || value

      return (
        <td ref={ref} className="px-4 py-3">
          <span className="text-sm text-zinc-900 dark:text-zinc-50">
            {icon} {label}
          </span>
        </td>
      )
    }

    // Use default rendering for other fields
    return <Cell ref={ref} field={field} value={value} row={row} {...props} />
  }
)

ProductCell.displayName = 'ProductCell'
