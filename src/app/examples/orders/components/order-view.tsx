import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { ViewLayoutProps } from '@/lib/crudkit/types'
import { Package, User, Mail, DollarSign, Calendar, ShoppingBag } from 'lucide-react'

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

export const OrderView = React.forwardRef<HTMLDivElement, ViewLayoutProps<Order>>(
  ({ item, schema }, ref) => {
    const order = item as Order

    const statusConfig = {
      pending: { variant: 'outline' as const, label: 'Pending' },
      processing: { variant: 'secondary' as const, label: 'Processing' },
      shipped: { variant: 'default' as const, label: 'Shipped' },
      delivered: { variant: 'default' as const, label: 'Delivered' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled' },
    }

    const status = statusConfig[order.status as keyof typeof statusConfig] || {
      variant: 'outline' as const,
      label: order.status,
    }

    return (
      <div ref={ref} className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {order.orderNumber}
              </CardTitle>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Customer Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-zinc-500" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {order.customer}
                </p>
                <p className="text-xs text-zinc-500">Customer Name</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-zinc-500" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {order.email}
                </p>
                <p className="text-xs text-zinc-500">Email Address</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">Total Amount</span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                ${order.total.toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">Order Date</span>
              </div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {new Date(order.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            {order.items && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Items</span>
                  </div>
                  <p className="ml-7 text-sm text-zinc-900 dark:text-zinc-50">
                    {order.items}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }
)

OrderView.displayName = 'OrderView'
