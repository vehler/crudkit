/**
 * Example: Custom Empty and Loading States
 *
 * This example demonstrates how to customize empty state and loading state components.
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FileQuestion, Plus, Loader2 } from 'lucide-react'
import type { EmptyStateProps, LoadingStateProps } from '../lib/component-types'

// =============================================================================
// EXAMPLE 1: Illustrated Empty State
// =============================================================================

const IllustratedEmptyState: React.FC<EmptyStateProps> = ({
  hasFilters,
  onClearFilters,
  schema,
  actions,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-[400px]">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileQuestion className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {hasFilters ? 'No results found' : `No ${schema.title.toLowerCase()} yet`}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md">
            {hasFilters
              ? 'Try adjusting your search or filters to find what you are looking for.'
              : `Get started by creating your first ${schema.title.toLowerCase()}.`}
          </p>
          <div className="flex gap-2">
            {hasFilters ? (
              <Button onClick={onClearFilters} variant="outline">
                Clear filters
              </Button>
            ) : (
              <Button onClick={() => actions.setMode('create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create {schema.title}
              </Button>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}

// =============================================================================
// EXAMPLE 2: Compact Empty State
// =============================================================================

const CompactEmptyState: React.FC<EmptyStateProps> = ({
  hasFilters,
  onClearFilters,
  schema,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-24 text-center">
        <p className="text-sm text-muted-foreground">
          {hasFilters ? (
            <>
              No results found.{' '}
              <button
                onClick={onClearFilters}
                className="text-primary hover:underline"
              >
                Clear filters
              </button>
            </>
          ) : (
            `No ${schema.title.toLowerCase()} available`
          )}
        </p>
      </TableCell>
    </TableRow>
  )
}

// =============================================================================
// EXAMPLE 3: Animated Loading State
// =============================================================================

const AnimatedLoadingState: React.FC<LoadingStateProps> = ({ rowCount, schema }) => {
  const fieldCount = schema.fields.length + 2 // +2 for checkbox and actions

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: fieldCount }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton
                className="h-4 w-full"
                style={{
                  animationDelay: `${(rowIndex * fieldCount + cellIndex) * 50}ms`,
                }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

// =============================================================================
// EXAMPLE 4: Spinner Loading State
// =============================================================================

const SpinnerLoadingState: React.FC<LoadingStateProps> = ({ schema }) => {
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-[400px]">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-sm text-muted-foreground">
            Loading {schema.title.toLowerCase()}...
          </p>
        </div>
      </TableCell>
    </TableRow>
  )
}

// =============================================================================
// EXAMPLE 5: Pulse Loading State (Simplified Skeleton)
// =============================================================================

const PulseLoadingState: React.FC<LoadingStateProps> = ({ rowCount, schema }) => {
  const fieldCount = schema.fields.length + 2

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="animate-pulse">
          {Array.from({ length: fieldCount }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <div className="h-4 bg-muted rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

export function TableWithIllustratedEmpty() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.List components={{ EmptyState: IllustratedEmptyState }} />
    </Crud>
  )
}

export function TableWithCompactEmpty() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.List components={{ EmptyState: CompactEmptyState }} />
    </Crud>
  )
}

export function TableWithAnimatedLoading() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.List components={{ LoadingState: AnimatedLoadingState }} />
    </Crud>
  )
}

export function TableWithSpinnerLoading() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.List components={{ LoadingState: SpinnerLoadingState }} />
    </Crud>
  )
}

export function TableWithPulseLoading() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.List components={{ LoadingState: PulseLoadingState }} />
    </Crud>
  )
}

export function TableWithBothCustomStates() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.List
        components={{
          EmptyState: IllustratedEmptyState,
          LoadingState: AnimatedLoadingState,
        }}
      />
    </Crud>
  )
}

// Mock schema and provider (replace with actual implementations)
const schema: any = {
  title: 'Task',
  fields: [
    { name: 'title', label: 'Title' },
    { name: 'status', label: 'Status' },
  ],
}
const dataProvider: any = {}
