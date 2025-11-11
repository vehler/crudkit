'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
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

// ============================================
// CONTEXT
// ============================================

interface CrudContextValue extends UseCrudReturn {
  schema: Schema
}

const CrudContext = createContext<CrudContextValue | null>(null)

function useCrudContext() {
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

function CrudToolbar() {
  const { schema, state, actions } = useCrudContext()

  if (state.mode !== 'list') return null

  return (
    <div
      className={cn(
        'crud-toolbar',
        'mb-4 flex items-center justify-between'
      )}
    >
      <h1 className={cn('text-2xl font-bold')}>{schema.title} Management</h1>
      <div className={cn('flex gap-2')}>
        <Button
          onClick={() => actions.setMode('create')}
          variant="default"
        >
          + Create New
        </Button>
        <Button
          onClick={() => actions.refresh()}
          variant="outline"
        >
          ⟳ Refresh
        </Button>
      </div>
    </div>
  )
}

// ============================================
// FILTERS COMPONENT
// ============================================

interface CrudFiltersProps {
  filterFields?: Field[]
}

function CrudFilters({ filterFields }: CrudFiltersProps) {
  const { schema, state, actions } = useCrudContext()

  if (state.mode !== 'list') return null

  const fields = filterFields || schema.fields.filter((f) => f.filterable)

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
                value={state.filters[field.name] || ''}
                onValueChange={(value) =>
                  actions.setFilter(field.name, value || null)
                }
              >
                <SelectTrigger id={`filter-${field.name}`} className="w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
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
            onClick={() => actions.clearFilters()}
            variant="outline"
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// LIST COMPONENT
// ============================================

interface CrudListProps {
  columns?: string[]
  showActions?: boolean
}

function CrudList({ columns, showActions = true }: CrudListProps) {
  const { schema, state, actions } = useCrudContext()

  if (state.mode !== 'list') return null

  const displayColumns = columns || schema.fields.map((f) => f.name)

  return (
    <div className={cn('crud-list')}>
      {/* Search Bar */}
      <div className={cn('mb-4 flex gap-2')}>
        <Input
          type="text"
          placeholder="Search..."
          value={state.search}
          onChange={(e) => actions.setSearch(e.target.value)}
          className="w-80"
        />
        {state.search && (
          <Button
            onClick={() => actions.setSearch('')}
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
            onClick={() => actions.deleteMany()}
            variant="destructive"
            size="sm"
          >
            Delete Selected
          </Button>
          <Button
            onClick={() => actions.selectRows([])}
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
                onCheckedChange={(checked) => {
                  if (checked) {
                    actions.selectRows(
                      state.data.map((item) => item[schema.idField])
                    )
                  } else {
                    actions.selectRows([])
                  }
                }}
              />
            </TableHead>
            {displayColumns.map((col) => {
              const field = schema.fields.find((f) => f.name === col)
              return (
                <TableHead
                  key={col}
                  className={cn(
                    field?.sortable !== false && 'cursor-pointer'
                  )}
                  onClick={() =>
                    field?.sortable !== false && actions.setSort(col)
                  }
                >
                  {field?.label || col}
                  {state.sortField === col && (
                    <span className={cn('ml-1')}>
                      {state.sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
              )
            })}
            {showActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.loading && (
            <TableRow>
              <TableCell
                colSpan={displayColumns.length + 2}
                className="h-24 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </TableCell>
            </TableRow>
          )}
          {!state.loading && state.data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={displayColumns.length + 2}
                className="h-24 text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
          {!state.loading &&
            state.data.map((item) => (
              <TableRow key={item[schema.idField]}>
                <TableCell>
                  <Checkbox
                    checked={state.selectedRows.includes(item[schema.idField])}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        actions.selectRows([
                          ...state.selectedRows,
                          item[schema.idField],
                        ])
                      } else {
                        actions.selectRows(
                          state.selectedRows.filter(
                            (id) => id !== item[schema.idField]
                          )
                        )
                      }
                    }}
                  />
                </TableCell>
                {displayColumns.map((col) => (
                  <TableCell key={col}>
                    {item[col]}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          actions.setMode('view', item[schema.idField])
                        }
                        variant="ghost"
                        size="sm"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() =>
                          actions.setMode('edit', item[schema.idField])
                        }
                        variant="ghost"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => actions.delete(item[schema.idField])}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
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
            onValueChange={(value) => actions.setPageSize(Number(value))}
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
            onClick={() => actions.setPage(1)}
            disabled={state.page === 1}
            variant="outline"
            size="sm"
          >
            ⏮
          </Button>
          <Button
            onClick={() => actions.setPage(state.page - 1)}
            disabled={state.page === 1}
            variant="outline"
            size="sm"
          >
            ← Previous
          </Button>
          <Button
            onClick={() => actions.setPage(state.page + 1)}
            disabled={state.page * state.pageSize >= state.totalCount}
            variant="outline"
            size="sm"
          >
            Next →
          </Button>
          <Button
            onClick={() =>
              actions.setPage(Math.ceil(state.totalCount / state.pageSize))
            }
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
}

// ============================================
// FORM COMPONENT
// ============================================

interface CrudFormProps {
  fields?: Field[]
}

function CrudForm({ fields }: CrudFormProps) {
  const { schema, state, actions } = useCrudContext()
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (state.mode === 'edit' && state.currentItem) {
      setFormData(state.currentItem)
    } else if (state.mode === 'create') {
      setFormData({})
    }
  }, [state.mode, state.currentItem])

  if (!['create', 'edit'].includes(state.mode)) return null

  const displayFields =
    fields ||
    schema.fields.filter((f) =>
      state.mode === 'create' ? f.showOnCreate !== false : f.showOnEdit !== false
    )

  const handleSubmit = async (e: React.FormEvent) => {
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
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <form onSubmit={handleSubmit} className={cn('max-w-2xl space-y-6')}>
      <h2 className={cn('text-xl font-bold')}>
        {state.mode === 'create' ? 'Create' : 'Edit'} {schema.title}
      </h2>

      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {displayFields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={`form-${field.name}`}>
            {field.label}
            {field.required && <span className="text-destructive"> *</span>}
          </Label>

          {field.type === 'select' ? (
            <Select
              value={formData[field.name] || ''}
              onValueChange={(value) => handleChange(field.name, value)}
            >
              <SelectTrigger id={`form-${field.name}`}>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === 'textarea' ? (
            <Textarea
              id={`form-${field.name}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={4}
            />
          ) : (
            <Input
              id={`form-${field.name}`}
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {errors[field.name] && (
            <p className="text-sm text-destructive">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={state.loading}
        >
          {state.loading ? 'Saving...' : 'Save'}
        </Button>
        <Button
          type="button"
          onClick={() => actions.setMode('list')}
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

// ============================================
// VIEW COMPONENT
// ============================================

function CrudView() {
  const { schema, state, actions } = useCrudContext()

  if (state.mode !== 'view' || !state.currentItem) return null

  return (
    <div className={cn('max-w-2xl space-y-6')}>
      <h2 className={cn('text-xl font-bold')}>
        View {schema.title}
      </h2>

      {state.loading && (
        <div className="space-y-3">
          {schema.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          ))}
        </div>
      )}

      {!state.loading && state.currentItem && (
        <div className="space-y-3">
          {schema.fields.map((field) => (
            <div key={field.name}>
              <strong className="font-medium">{field.label}:</strong>{' '}
              <span className="text-muted-foreground">
                {state.currentItem[field.name] || '-'}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => actions.setMode('edit', state.selectedId)}
        >
          Edit
        </Button>
        <Button
          onClick={() => actions.setMode('list')}
          variant="outline"
        >
          Back to List
        </Button>
      </div>
    </div>
  )
}

// ============================================
// EXPORTS
// ============================================

Crud.Toolbar = CrudToolbar
Crud.Filters = CrudFilters
Crud.List = CrudList
Crud.Form = CrudForm
Crud.View = CrudView

export { Crud, useCrudContext }
export type { CrudProps }
