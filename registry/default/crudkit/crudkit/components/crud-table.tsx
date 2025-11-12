'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { useCrud, type UseCrudReturn } from '@/hooks/use-crud'
import type { DataProvider, Schema, Field } from '@/lib/crudkit/data-provider'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DefaultRow,
  DefaultCell,
  DefaultActions,
  DefaultHeader,
  DefaultEmptyState,
  DefaultLoadingState,
} from './table'
import { Toolbar } from './toolbar'
import { DefaultField, DefaultFormLayout, DefaultSubmitButton } from './form'
import { DefaultViewField, DefaultViewLayout } from './view'
import type { CrudListProps, CrudFormProps as CrudFormPropsType, CrudViewProps } from '../lib/component-types'

// ============================================
// CONTEXT
// ============================================

interface CrudContextValue extends UseCrudReturn {
  schema: Schema
}

const CrudContext = createContext<CrudContextValue | null>(null)

function useCrudContext<T = any>(): CrudContextValue {
  const context = useContext(CrudContext)
  if (!context) {
    throw new Error('Crud compound components must be used within <Crud>')
  }
  return context
}

// ============================================
// MAIN CRUD COMPONENT
// ============================================

interface CrudProps {
  schema: Schema
  dataProvider: DataProvider
  children: React.ReactNode
}

function Crud({ schema, dataProvider, children }: CrudProps) {
  const crudReturn = useCrud(schema, dataProvider)

  return (
    <CrudContext.Provider value={{ ...crudReturn, schema }}>
      <div className={cn('crud-container', 'p-4')}>{children}</div>
    </CrudContext.Provider>
  )
}

// ============================================
// TOOLBAR COMPONENT
// ============================================
// Toolbar is now a compound component imported from ./toolbar
// with sub-components: Toolbar.Title, Toolbar.CreateButton, Toolbar.RefreshButton

// ============================================
// FILTERS COMPONENT
// ============================================

interface CrudFiltersProps {
  filterFields?: Field[]
}

const CrudFilters = React.memo(({ filterFields }: CrudFiltersProps) => {
  const { schema, state, actions } = useCrudContext()

  const fields = useMemo(
    () => filterFields || schema.fields.filter((f) => f.filterable),
    [filterFields, schema.fields]
  )

  const handleClearFilters = useCallback(() => {
    actions.clearFilters()
  }, [actions])

  if (state.mode !== 'list') return null
  if (fields.length === 0) return null

  return (
    <div className={cn('crud-filters', 'mb-4 rounded bg-muted p-4')}>
      <h3 className={cn('mb-2 font-semibold')}>Filters</h3>
      <div className={cn('flex flex-wrap gap-4')}>
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={`filter-${field.name}`}>
              {field.label}
            </Label>
            {field.type === 'select' ? (
              <Select
                value={state.filters[field.name] || '__all__'}
                onValueChange={(value) =>
                  actions.setFilter(field.name, value === '__all__' ? null : value)
                }
              >
                <SelectTrigger id={`filter-${field.name}`} className="w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All</SelectItem>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={`filter-${field.name}`}
                type="text"
                value={state.filters[field.name] || ''}
                onChange={(e) =>
                  actions.setFilter(field.name, e.target.value || null)
                }
                className="w-[180px]"
              />
            )}
          </div>
        ))}
        <div className={cn('flex items-end')}>
          <Button
            onClick={handleClearFilters}
            variant="outline"
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
})
CrudFilters.displayName = 'CrudFilters'

// ============================================
// LIST COMPONENT
// ============================================

const CrudList = React.memo(<T,>({ columns, showActions = true, className, components = {} }: CrudListProps<T>) => {
  const { schema, state, actions } = useCrudContext<T>()

  // Use custom components or defaults
  const Row = components.Row ?? DefaultRow
  const Cell = components.Cell ?? DefaultCell
  const Actions = components.Actions ?? DefaultActions
  const Header = components.Header ?? DefaultHeader
  const EmptyState = components.EmptyState ?? DefaultEmptyState
  const LoadingState = components.LoadingState ?? DefaultLoadingState

  const displayColumns = useMemo(
    () => columns || schema.fields.map((f) => f.name),
    [columns, schema.fields]
  )

  const visibleFields = useMemo(
    () => schema.fields.filter((f) => displayColumns.includes(f.name)),
    [schema.fields, displayColumns]
  )

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setSearch(e.target.value)
  }, [actions])

  const handleClearSearch = useCallback(() => {
    actions.setSearch('')
  }, [actions])

  const handleDeleteMany = useCallback(() => {
    actions.deleteMany()
  }, [actions])

  const handleClearSelection = useCallback(() => {
    actions.selectRows([])
  }, [actions])

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      actions.selectRows(state.data.map((item: any) => item[schema.idField]))
    } else {
      actions.selectRows([])
    }
  }, [actions, state.data, schema.idField])

  const handleSort = useCallback((col: string) => {
    actions.setSort(col)
  }, [actions])

  const handleView = useCallback((id: string | number) => {
    actions.setMode('view', String(id))
  }, [actions])

  const handleEdit = useCallback((id: string | number) => {
    actions.setMode('edit', String(id))
  }, [actions])

  const handleDelete = useCallback((id: string | number) => {
    actions.delete(String(id))
  }, [actions])

  const handleRowSelect = useCallback((id: string | number, checked: boolean) => {
    if (checked) {
      actions.selectRows([...state.selectedRows, String(id)])
    } else {
      actions.selectRows(state.selectedRows.filter((rowId) => rowId !== String(id)))
    }
  }, [actions, state.selectedRows])

  const handlePageChange = useCallback((page: number) => {
    actions.setPage(page)
  }, [actions])

  const handlePageSizeChange = useCallback((value: string) => {
    actions.setPageSize(Number(value))
  }, [actions])

  if (state.mode !== 'list') return null

  return (
    <div className={cn('crud-list', className)}>
      {/* Search Bar */}
      <div className={cn('mb-4 flex gap-2')}>
        <Input
          type="text"
          placeholder="Search..."
          value={state.search}
          onChange={handleSearchChange}
          className="w-80"
        />
        {state.search && (
          <Button
            onClick={handleClearSearch}
            variant="outline"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Bulk Actions */}
      {state.selectedRows.length > 0 && (
        <div className={cn('mb-4 rounded bg-muted p-3 flex items-center gap-4')}>
          <span>
            {state.selectedRows.length} items selected
          </span>
          <Button
            onClick={handleDeleteMany}
            variant="destructive"
            size="sm"
          >
            Delete Selected
          </Button>
          <Button
            onClick={handleClearSelection}
            variant="ghost"
            size="sm"
          >
            Clear Selection
          </Button>
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  state.selectedRows.length === state.data.length &&
                  state.data.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            {visibleFields.map((field) => (
              <Header
                key={field.name}
                field={field}
                sortable={field.sortable !== false}
                currentSort={
                  state.sortField === field.name
                    ? { field: state.sortField, order: state.sortOrder as 'asc' | 'desc' }
                    : null
                }
                onSort={handleSort}
                schema={schema}
                actions={actions}
                state={state}
              />
            ))}
            {showActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.loading && (
            <LoadingState
              rowCount={state.pageSize}
              schema={schema}
              actions={actions}
              state={state}
            />
          )}
          {!state.loading && state.data.length === 0 && (
            <EmptyState
              hasFilters={Object.keys(state.filters).length > 0 || state.search !== ''}
              onClearFilters={() => {
                actions.clearFilters()
                actions.setSearch('')
              }}
              schema={schema}
              actions={actions}
              state={state}
            />
          )}
          {!state.loading &&
            state.data.map((item: any, index: number) => {
              const itemId = item[schema.idField]
              return (
                <Row
                  key={itemId}
                  row={item}
                  index={index}
                  selected={state.selectedRows.includes(String(itemId))}
                  onSelect={(checked) => handleRowSelect(itemId, checked)}
                  onView={() => handleView(itemId)}
                  onEdit={() => handleEdit(itemId)}
                  onDelete={() => handleDelete(itemId)}
                  schema={schema}
                  actions={actions}
                  state={state}
                  visibleColumns={displayColumns}
                  showActions={showActions}
                  CellComponent={Cell}
                  ActionsComponent={Actions}
                />
              )
            })}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div
        className={cn(
          'mt-4 flex items-center justify-between rounded bg-muted p-4'
        )}
      >
        <div className={cn('flex items-center gap-4')}>
          <span className="text-sm">
            Showing {Math.min((state.page - 1) * state.pageSize + 1, state.totalCount)} to{' '}
            {Math.min(state.page * state.pageSize, state.totalCount)} of{' '}
            {state.totalCount} items
          </span>
          <Select
            value={String(state.pageSize)}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="25">25 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={cn('flex items-center gap-1')}>
          <Button
            onClick={() => handlePageChange(1)}
            disabled={state.page === 1}
            variant="outline"
            size="sm"
          >
            ⏮
          </Button>
          <Button
            onClick={() => handlePageChange(state.page - 1)}
            disabled={state.page === 1}
            variant="outline"
            size="sm"
          >
            ← Previous
          </Button>
          <Button
            onClick={() => handlePageChange(state.page + 1)}
            disabled={state.page * state.pageSize >= state.totalCount}
            variant="outline"
            size="sm"
          >
            Next →
          </Button>
          <Button
            onClick={() => handlePageChange(Math.ceil(state.totalCount / state.pageSize))}
            disabled={state.page * state.pageSize >= state.totalCount}
            variant="outline"
            size="sm"
          >
            ⏭
          </Button>
        </div>
      </div>
    </div>
  )
}) as <T = any>(props: CrudListProps<T>) => React.ReactElement | null
CrudList.displayName = 'CrudList'

// ============================================
// FORM COMPONENT
// ============================================

const CrudForm = React.memo(({ fields, className, components = {} }: CrudFormPropsType) => {
  const { schema, state, actions } = useCrudContext()
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Use custom components or defaults
  const Field = components.Field ?? DefaultField
  const Layout = components.Layout ?? DefaultFormLayout
  const SubmitButton = components.SubmitButton ?? DefaultSubmitButton

  useEffect(() => {
    if (state.mode === 'edit' && state.currentItem) {
      setFormData(state.currentItem)
    } else if (state.mode === 'create') {
      setFormData({})
    }
  }, [state.mode, state.currentItem])

  const displayFields = useMemo(
    () => fields ||
      schema.fields.filter((f) =>
        state.mode === 'create' ? f.showOnCreate !== false : f.showOnEdit !== false
      ),
    [fields, schema.fields, state.mode]
  )

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    displayFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await actions.save(formData)
      setFormData({})
      setErrors({})
    } catch (err) {
      // Error already handled in useCrud
    }
  }, [displayFields, formData, actions])

  const handleChange = useCallback((field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }, [])

  const handleCancel = useCallback(() => {
    actions.setMode('list')
  }, [actions])

  if (!['create', 'edit'].includes(state.mode)) return null

  return (
    <Layout
      title={`${state.mode === 'create' ? 'Create' : 'Edit'} ${schema.title}`}
      error={state.error}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={state.loading}
      mode={state.mode as 'create' | 'edit'}
      schema={schema}
      actions={actions}
      state={state}
      className={className}
    >
      {displayFields.map((field) => {
        // Use field-specific renderer if provided
        const FieldComponent = components.fields?.[field.name] ?? Field

        return (
          <FieldComponent
            key={field.name}
            field={field}
            value={formData[field.name]}
            error={errors[field.name]}
            onChange={(value) => handleChange(field.name, value)}
            onBlur={() => {/* optional field blur handler */}}
            disabled={state.loading}
            mode={state.mode as 'create' | 'edit'}
            schema={schema}
            actions={actions}
            state={state}
          />
        )
      })}
    </Layout>
  )
})
CrudForm.displayName = 'CrudForm'

// ============================================
// VIEW COMPONENT
// ============================================

const CrudView = React.memo(({ className, components = {} }: CrudViewProps) => {
  const { schema, state, actions } = useCrudContext()

  // Use custom components or defaults
  const Field = components.Field ?? DefaultViewField
  const Layout = components.Layout ?? DefaultViewLayout

  const handleEdit = useCallback(() => {
    actions.setMode('edit', state.selectedId)
  }, [actions, state.selectedId])

  const handleBackToList = useCallback(() => {
    actions.setMode('list')
  }, [actions])

  if (state.mode !== 'view' || !state.currentItem) return null

  return (
    <Layout
      item={state.currentItem}
      onEdit={handleEdit}
      onBack={handleBackToList}
      schema={schema}
      actions={actions}
      state={state}
      className={className}
    >
      {schema.fields.map((field) => {
        // Use field-specific renderer if provided
        const FieldComponent = components.fields?.[field.name] ?? Field

        return (
          <FieldComponent
            key={field.name}
            field={field}
            value={state.currentItem[field.name]}
            item={state.currentItem}
            schema={schema}
            actions={actions}
            state={state}
          />
        )
      })}
    </Layout>
  )
})
CrudView.displayName = 'CrudView'

// ============================================
// EXPORTS
// ============================================

Crud.Toolbar = Toolbar
Crud.Filters = CrudFilters
Crud.List = CrudList
Crud.Form = CrudForm
Crud.View = CrudView

export { Crud, useCrudContext }
export type { CrudProps }
