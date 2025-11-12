import * as React from 'react'
import { cn } from '@/lib/utils'
import { useCrudContext } from '../crud-table'
import type { ToolbarProps } from '../../lib/component-types'
import { ToolbarTitle } from './toolbar-title'
import { ToolbarCreateButton } from './toolbar-create-button'
import { ToolbarRefreshButton } from './toolbar-refresh-button'

/**
 * Toolbar Root Component
 *
 * Container for toolbar items. Provides default layout or accepts custom children.
 *
 * @example
 * ```typescript
 * // Default layout (Title + CreateButton + RefreshButton)
 * <Crud.Toolbar />
 *
 * // Custom children
 * <Crud.Toolbar>
 *   <Crud.Toolbar.Title>My Users</Crud.Toolbar.Title>
 *   <div className="flex gap-2">
 *     <Crud.Toolbar.CreateButton />
 *     <MyExportButton />
 *     <Crud.Toolbar.RefreshButton />
 *   </div>
 * </Crud.Toolbar>
 *
 * // Fully custom layout
 * <Crud.Toolbar>
 *   <div className="flex justify-between w-full">
 *     <div className="flex items-center gap-4">
 *       <TeamIcon />
 *       <Crud.Toolbar.Title />
 *       <Badge>24 members</Badge>
 *     </div>
 *     <div className="flex gap-2">
 *       <SearchInput />
 *       <Crud.Toolbar.CreateButton />
 *     </div>
 *   </div>
 * </Crud.Toolbar>
 * ```
 */
const ToolbarRoot = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, children, schema, actions, state }, ref) => {
    const context = useCrudContext()

    // Only show toolbar in list mode
    if (context.state.mode !== 'list') return null

    return (
      <div
        ref={ref}
        className={cn('mb-4 flex items-center justify-between', className)}
      >
        {children || (
          <>
            <ToolbarTitle />
            <div className="flex gap-2">
              <ToolbarCreateButton />
              <ToolbarRefreshButton />
            </div>
          </>
        )}
      </div>
    )
  }
)
ToolbarRoot.displayName = 'Crud.Toolbar'

/**
 * Toolbar Compound Component
 *
 * Export root component with sub-components attached.
 * This enables the dot notation API: Crud.Toolbar.Title, Crud.Toolbar.CreateButton, etc.
 */
export const Toolbar = Object.assign(ToolbarRoot, {
  Title: ToolbarTitle,
  CreateButton: ToolbarCreateButton,
  RefreshButton: ToolbarRefreshButton,
})
