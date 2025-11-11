'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useCrud, type UseCrudReturn } from '@/hooks/use-crud'
import type { DataProvider, Schema, Field } from '@/lib/crudkit/data-provider'
import { cn } from '@/lib/utils'

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
        <button
          onClick={() => actions.setMode('create')}
          className={cn(
            'rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'
          )}
        >
          + Create New
        </button>
        <button
          onClick={() => actions.refresh()}
          className={cn(
            'rounded border border-gray-300 px-4 py-2 hover:bg-gray-50'
          )}
        >
          ⟳ Refresh
        </button>
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
    <div className={cn('crud-filters', 'mb-4 rounded bg-gray-50 p-4')}>
      <h3 className={cn('mb-2 font-semibold')}>Filters</h3>
      <div className={cn('flex flex-wrap gap-4')}>
        {fields.map((field) => (
          <div key={field.name}>
            <label className={cn('mb-1 block text-sm font-medium')}>
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                value={state.filters[field.name] || ''}
                onChange={(e) =>
                  actions.setFilter(field.name, e.target.value || null)
                }
                className={cn('rounded border border-gray-300 px-2 py-1')}
              >
                <option value="">All</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={state.filters[field.name] || ''}
                onChange={(e) =>
                  actions.setFilter(field.name, e.target.value || null)
                }
                className={cn('rounded border border-gray-300 px-2 py-1')}
              />
            )}
          </div>
        ))}
        <div className={cn('flex items-end')}>
          <button
            onClick={() => actions.clearFilters()}
            className={cn('rounded border border-gray-300 px-3 py-1 text-sm')}
          >
            Clear Filters
          </button>
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
      <div className={cn('mb-4')}>
        <input
          type="text"
          placeholder="Search..."
          value={state.search}
          onChange={(e) => actions.setSearch(e.target.value)}
          className={cn(
            'w-80 rounded border border-gray-300 px-3 py-2'
          )}
        />
        {state.search && (
          <button
            onClick={() => actions.setSearch('')}
            className={cn('ml-2 rounded border px-3 py-2')}
          >
            Clear
          </button>
        )}
      </div>

      {/* Bulk Actions */}
      {state.selectedRows.length > 0 && (
        <div className={cn('mb-4 rounded bg-gray-100 p-3')}>
          <span className={cn('mr-4')}>
            {state.selectedRows.length} items selected
          </span>
          <button
            onClick={() => actions.deleteMany()}
            className={cn('mr-2 text-red-600 hover:underline')}
          >
            Delete Selected
          </button>
          <button
            onClick={() => actions.selectRows([])}
            className={cn('text-gray-600 hover:underline')}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <div className={cn('mb-4 rounded bg-red-50 p-3 text-red-700')}>
          {state.error}
        </div>
      )}

      {/* Table */}
      <table className={cn('w-full border-collapse')}>
        <thead>
          <tr className={cn('border-b-2 border-gray-300')}>
            <th className={cn('p-2 text-left')}>
              <input
                type="checkbox"
                checked={
                  state.selectedRows.length === state.data.length &&
                  state.data.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    actions.selectRows(
                      state.data.map((item) => item[schema.idField])
                    )
                  } else {
                    actions.selectRows([])
                  }
                }}
              />
            </th>
            {displayColumns.map((col) => {
              const field = schema.fields.find((f) => f.name === col)
              return (
                <th
                  key={col}
                  className={cn(
                    'p-2 text-left',
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
                </th>
              )
            })}
            {showActions && <th className={cn('p-2')}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {state.loading && (
            <tr>
              <td
                colSpan={displayColumns.length + 2}
                className={cn('p-8 text-center')}
              >
                Loading...
              </td>
            </tr>
          )}
          {!state.loading && state.data.length === 0 && (
            <tr>
              <td
                colSpan={displayColumns.length + 2}
                className={cn('p-8 text-center text-gray-500')}
              >
                No data found
              </td>
            </tr>
          )}
          {!state.loading &&
            state.data.map((item) => (
              <tr key={item[schema.idField]} className={cn('border-b')}>
                <td className={cn('p-2')}>
                  <input
                    type="checkbox"
                    checked={state.selectedRows.includes(item[schema.idField])}
                    onChange={(e) => {
                      if (e.target.checked) {
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
                </td>
                {displayColumns.map((col) => (
                  <td key={col} className={cn('p-2')}>
                    {item[col]}
                  </td>
                ))}
                {showActions && (
                  <td className={cn('p-2')}>
                    <button
                      onClick={() =>
                        actions.setMode('view', item[schema.idField])
                      }
                      className={cn('mr-1 text-blue-600 hover:underline')}
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        actions.setMode('edit', item[schema.idField])
                      }
                      className={cn('mr-1 text-blue-600 hover:underline')}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => actions.delete(item[schema.idField])}
                      className={cn('text-red-600 hover:underline')}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        className={cn(
          'mt-4 flex items-center justify-between rounded bg-gray-50 p-4'
        )}
      >
        <div className={cn('flex items-center gap-4')}>
          <span>
            Showing {Math.min((state.page - 1) * state.pageSize + 1, state.totalCount)} to{' '}
            {Math.min(state.page * state.pageSize, state.totalCount)} of{' '}
            {state.totalCount} items
          </span>
          <select
            value={state.pageSize}
            onChange={(e) => actions.setPageSize(Number(e.target.value))}
            className={cn('rounded border px-2 py-1')}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
        <div className={cn('flex items-center gap-1')}>
          <button
            onClick={() => actions.setPage(1)}
            disabled={state.page === 1}
            className={cn('rounded border px-2 py-1 disabled:opacity-50')}
          >
            ⏮
          </button>
          <button
            onClick={() => actions.setPage(state.page - 1)}
            disabled={state.page === 1}
            className={cn('rounded border px-3 py-1 disabled:opacity-50')}
          >
            ← Previous
          </button>
          <button
            onClick={() => actions.setPage(state.page + 1)}
            disabled={state.page * state.pageSize >= state.totalCount}
            className={cn('rounded border px-3 py-1 disabled:opacity-50')}
          >
            Next →
          </button>
          <button
            onClick={() =>
              actions.setPage(Math.ceil(state.totalCount / state.pageSize))
            }
            disabled={state.page * state.pageSize >= state.totalCount}
            className={cn('rounded border px-2 py-1 disabled:opacity-50')}
          >
            ⏭
          </button>
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
    <form onSubmit={handleSubmit} className={cn('max-w-2xl')}>
      <h2 className={cn('mb-4 text-xl font-bold')}>
        {state.mode === 'create' ? 'Create' : 'Edit'} {schema.title}
      </h2>

      {state.error && (
        <div className={cn('mb-4 rounded bg-red-50 p-3 text-red-700')}>
          {state.error}
        </div>
      )}

      {displayFields.map((field) => (
        <div key={field.name} className={cn('mb-4')}>
          <label className={cn('mb-1 block font-medium')}>
            {field.label}
            {field.required && <span className={cn('text-red-600')}> *</span>}
          </label>

          {field.type === 'select' ? (
            <select
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={cn('w-full rounded border border-gray-300 px-3 py-2')}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={cn('w-full rounded border border-gray-300 px-3 py-2')}
              rows={4}
            />
          ) : (
            <input
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={cn('w-full rounded border border-gray-300 px-3 py-2')}
            />
          )}

          {errors[field.name] && (
            <span className={cn('text-sm text-red-600')}>
              {errors[field.name]}
            </span>
          )}
        </div>
      ))}

      <div className={cn('mt-6 flex gap-2')}>
        <button
          type="submit"
          disabled={state.loading}
          className={cn(
            'rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50'
          )}
        >
          {state.loading ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => actions.setMode('list')}
          className={cn('rounded border px-4 py-2')}
        >
          Cancel
        </button>
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
    <div className={cn('max-w-2xl')}>
      <h2 className={cn('mb-4 text-xl font-bold')}>
        View {schema.title}
      </h2>

      {state.loading && <div>Loading...</div>}

      {!state.loading && state.currentItem && (
        <div>
          {schema.fields.map((field) => (
            <div key={field.name} className={cn('mb-3')}>
              <strong className={cn('font-medium')}>{field.label}:</strong>{' '}
              {state.currentItem[field.name] || '-'}
            </div>
          ))}
        </div>
      )}

      <div className={cn('mt-6 flex gap-2')}>
        <button
          onClick={() => actions.setMode('edit', state.selectedId)}
          className={cn('rounded bg-blue-600 px-4 py-2 text-white')}
        >
          Edit
        </button>
        <button
          onClick={() => actions.setMode('list')}
          className={cn('rounded border px-4 py-2')}
        >
          Back to List
        </button>
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
