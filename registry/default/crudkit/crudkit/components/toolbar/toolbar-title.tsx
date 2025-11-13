import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { useCrudContext } from '../crud-table'
import type { ToolbarTitleProps } from '../../lib/component-types'

/**
 * Toolbar.Title Component
 *
 * Displays the resource title. Supports asChild pattern for custom rendering.
 *
 * @example
 * ```typescript
 * // Default usage
 * <Crud.Toolbar.Title />
 *
 * // Custom text
 * <Crud.Toolbar.Title>My Custom Title</Crud.Toolbar.Title>
 *
 * // With custom styling
 * <Crud.Toolbar.Title className="text-3xl text-primary">
 *   Team Members
 * </Crud.Toolbar.Title>
 *
 * // With asChild (render as custom element)
 * <Crud.Toolbar.Title asChild>
 *   <h1 className="custom-heading">
 *     <TeamIcon /> Team Members
 *   </h1>
 * </Crud.Toolbar.Title>
 * ```
 */
export const ToolbarTitle = React.forwardRef<HTMLHeadingElement, ToolbarTitleProps>(
  ({ asChild = false, className, children }, ref) => {
    const { schema } = useCrudContext()
    const Comp = asChild ? Slot : 'h2'

    return (
      <Comp
        ref={ref}
        className={cn('text-2xl font-bold', className)}
      >
        {children || `${schema.title} Management`}
      </Comp>
    )
  }
)
ToolbarTitle.displayName = 'Crud.Toolbar.Title'
