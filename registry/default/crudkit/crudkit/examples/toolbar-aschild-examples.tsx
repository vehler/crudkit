/**
 * Example: Toolbar and asChild Pattern
 *
 * This example demonstrates how to use the Toolbar compound components
 * and the asChild pattern for integrating with routing libraries.
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RefreshCw, Download, Upload, Settings } from 'lucide-react'

// =============================================================================
// EXAMPLE 1: Basic Toolbar Usage
// =============================================================================

export function BasicToolbar() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 2: Custom Toolbar with Additional Buttons
// =============================================================================

export function CustomToolbar() {
  const handleExport = () => {
    console.log('Exporting data...')
  }

  const handleImport = () => {
    console.log('Importing data...')
  }

  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleImport} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Crud.Toolbar.CreateButton />
          <Crud.Toolbar.RefreshButton />
        </div>
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 3: Toolbar with Search Bar
// =============================================================================

export function ToolbarWithSearch() {
  const [search, setSearch] = React.useState('')

  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <div className="flex items-center gap-4 flex-1">
          <Crud.Toolbar.Title />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex gap-2">
          <Crud.Toolbar.CreateButton />
          <Crud.Toolbar.RefreshButton />
        </div>
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 4: Toolbar with Settings
// =============================================================================

export function ToolbarWithSettings() {
  const [showArchived, setShowArchived] = React.useState(false)

  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <div className="flex gap-2">
          <Button
            onClick={() => setShowArchived(!showArchived)}
            variant="ghost"
            size="sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            {showArchived ? 'Hide' : 'Show'} Archived
          </Button>
          <Crud.Toolbar.CreateButton />
          <Crud.Toolbar.RefreshButton />
        </div>
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 5: Custom Create Button Text
// =============================================================================

export function CustomCreateButtonText() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <div className="flex gap-2">
          <Crud.Toolbar.CreateButton>
            <Plus className="h-4 w-4 mr-2" />
            Add New Task
          </Crud.Toolbar.CreateButton>
          <Crud.Toolbar.RefreshButton />
        </div>
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 6: asChild Pattern with Next.js Link
// =============================================================================

/**
 * This example shows how to use the asChild pattern to integrate
 * with routing libraries like Next.js Link.
 *
 * NOTE: This is a conceptual example. In a real Next.js app, you would
 * import Link from 'next/link' and the navigation would work properly.
 */

// Mock Link component for demonstration
const Link = ({
  href,
  children,
  ...props
}: {
  href: string
  children: React.ReactNode
  [key: string]: any
}) => (
  <a href={href} {...props}>
    {children}
  </a>
)

export function ToolbarWithNextJsLink() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <div className="flex gap-2">
          {/* asChild replaces the Button with Link while keeping the Button's styles */}
          <Crud.Toolbar.CreateButton asChild>
            <Link href="/tasks/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Task
            </Link>
          </Crud.Toolbar.CreateButton>
          <Crud.Toolbar.RefreshButton />
        </div>
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 7: asChild with React Router Link
// =============================================================================

/**
 * This example shows integration with React Router.
 *
 * NOTE: This is a conceptual example. In a real React Router app,
 * you would import Link from 'react-router-dom'.
 */

// Mock React Router Link for demonstration
const RouterLink = ({
  to,
  children,
  ...props
}: {
  to: string
  children: React.ReactNode
  [key: string]: any
}) => (
  <a href={to} {...props}>
    {children}
  </a>
)

export function ToolbarWithReactRouterLink() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <Crud.Toolbar.Title />
        <div className="flex gap-2">
          <Crud.Toolbar.CreateButton asChild>
            <RouterLink to="/tasks/create">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </RouterLink>
          </Crud.Toolbar.CreateButton>
          <Crud.Toolbar.RefreshButton />
        </div>
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 8: Completely Custom Toolbar (No Compound Components)
// =============================================================================

export function CompletelyCustomToolbar() {
  const handleCreate = () => {
    console.log('Create clicked')
  }

  const handleRefresh = () => {
    console.log('Refresh clicked')
  }

  const handleBulkEdit = () => {
    console.log('Bulk edit clicked')
  }

  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <div className="mb-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Task Management</h2>
            <p className="text-sm text-muted-foreground">
              Manage all your tasks in one place
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleBulkEdit} variant="outline" size="sm">
              Bulk Edit
            </Button>
            <Button onClick={handleCreate} variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
            <Button onClick={handleRefresh} variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 9: Minimal Toolbar
// =============================================================================

export function MinimalToolbar() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Crud.Toolbar.CreateButton />
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// =============================================================================
// EXAMPLE 10: Toolbar with Stats
// =============================================================================

export function ToolbarWithStats() {
  const stats = {
    total: 42,
    active: 28,
    completed: 14,
  }

  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar>
        <div className="flex items-center gap-6">
          <Crud.Toolbar.Title />
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total:</span>{' '}
              <span className="font-semibold">{stats.total}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Active:</span>{' '}
              <span className="font-semibold">{stats.active}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Completed:</span>{' '}
              <span className="font-semibold">{stats.completed}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Crud.Toolbar.CreateButton />
          <Crud.Toolbar.RefreshButton />
        </div>
      </Crud.Toolbar>
      <Crud.List />
    </Crud>
  )
}

// Mock schema and provider (replace with actual implementations)
const schema: any = {
  title: 'Task',
  fields: [],
}
const dataProvider: any = {}
