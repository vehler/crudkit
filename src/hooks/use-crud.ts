import { useCallback, useEffect, useState } from 'react'
import { useQueryStates, parseAsString, parseAsInteger, parseAsJson } from 'nuqs'
import type { DataProvider, GetListParams, Schema } from '@/lib/crudkit/data-provider'

// ============================================
// TYPES
// ============================================

type Mode = 'list' | 'create' | 'edit' | 'view'

interface CrudState<T = any> {
  mode: Mode
  selectedId: string | null
  page: number
  pageSize: number
  sortField: string | null
  sortOrder: 'asc' | 'desc'
  filters: Record<string, string>
  search: string
  data: T[]
  totalCount: number
  loading: boolean
  error: string | null
  selectedRows: string[]
  currentItem: T | null
}

interface CrudActions {
  setMode: (mode: Mode, id?: string | null) => void
  setSort: (field: string) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setFilter: (key: string, value: string | null) => void
  clearFilters: () => void
  setSearch: (query: string) => void
  selectRows: (ids: string[]) => void
  refresh: () => Promise<void>
  save: (formData: any) => Promise<void>
  delete: (id: string) => Promise<void>
  deleteMany: () => Promise<void>
}

export interface UseCrudReturn<T = any> {
  state: CrudState<T>
  actions: CrudActions
}

// ============================================
// HOOK
// ============================================

/**
 * useCrud Hook
 *
 * Main state management hook for CRUDKit.
 * Handles URL state persistence, data fetching, and CRUD operations.
 *
 * @param schema - Resource schema definition
 * @param dataProvider - Data provider implementation
 * @returns State and actions for CRUD operations
 *
 * @example
 * ```typescript
 * const { state, actions } = useCrud(userSchema, userDataProvider)
 *
 * // Access state
 * console.log(state.data, state.loading)
 *
 * // Perform actions
 * actions.setMode('create')
 * actions.save(formData)
 * ```
 */
export function useCrud<T = any>(
  schema: Schema,
  dataProvider: DataProvider<T>
): UseCrudReturn<T> {
  // ============================================
  // URL STATE (via nuqs)
  // ============================================

  const [urlState, setUrlState] = useQueryStates(
    {
      mode: parseAsString.withDefault('list'),
      id: parseAsString,
      page: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(10),
      sortField: parseAsString,
      sortOrder: parseAsString.withDefault('asc'),
      filters: parseAsJson<Record<string, string>>().withDefault({}),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'replace', // Use replace to avoid cluttering history
    }
  )

  // ============================================
  // LOCAL STATE
  // ============================================

  const [data, setData] = useState<T[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentItem, setCurrentItem] = useState<T | null>(null)

  // ============================================
  // DATA FETCHING
  // ============================================

  const fetchList = useCallback(async () => {
    if (urlState.mode !== 'list') return

    setLoading(true)
    setError(null)

    try {
      const params: GetListParams = {
        pagination: {
          page: urlState.page,
          pageSize: urlState.pageSize,
        },
        sort: urlState.sortField
          ? {
              field: urlState.sortField,
              order: urlState.sortOrder as 'asc' | 'desc',
            }
          : null,
        filters: urlState.filters,
        search: urlState.search,
      }

      const result = await dataProvider.getList(params)

      setData(result.data)
      setTotalCount(result.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [
    urlState.mode,
    urlState.page,
    urlState.pageSize,
    urlState.sortField,
    urlState.sortOrder,
    urlState.filters,
    urlState.search,
    dataProvider,
  ])

  const fetchItem = useCallback(async () => {
    if (!urlState.id || !['view', 'edit'].includes(urlState.mode)) return

    setLoading(true)
    setError(null)

    try {
      const item = await dataProvider.getOne(urlState.id)
      setCurrentItem(item)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch item')
    } finally {
      setLoading(false)
    }
  }, [urlState.id, urlState.mode, dataProvider])

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    fetchList()
  }, [fetchList])

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  // Reset currentItem when entering create mode
  useEffect(() => {
    if (urlState.mode === 'create') {
      setCurrentItem({} as T)
    }
  }, [urlState.mode])

  // ============================================
  // ACTIONS
  // ============================================

  const actions: CrudActions = {
    setMode: (newMode: Mode, id: string | null = null) => {
      setUrlState({ mode: newMode, id })
    },

    setSort: (field: string) => {
      if (urlState.sortField === field) {
        // Toggle order if same field
        setUrlState({
          sortOrder: urlState.sortOrder === 'asc' ? 'desc' : 'asc',
        })
      } else {
        // Set new field with asc order
        setUrlState({
          sortField: field,
          sortOrder: 'asc',
        })
      }
    },

    setPage: (newPage: number) => {
      setUrlState({ page: newPage })
    },

    setPageSize: (newSize: number) => {
      setUrlState({ pageSize: newSize, page: 1 }) // Reset to first page
    },

    setFilter: (key: string, value: string | null) => {
      setUrlState((prev) => ({
        filters: {
          ...prev.filters,
          [key]: value || undefined, // Remove if null/empty
        },
        page: 1, // Reset to first page
      }))
    },

    clearFilters: () => {
      setUrlState({ filters: {}, page: 1 })
    },

    setSearch: (query: string) => {
      setUrlState({ search: query, page: 1 })
    },

    selectRows: (ids: string[]) => {
      setSelectedRows(ids)
    },

    refresh: async () => {
      await fetchList()
    },

    save: async (formData: any) => {
      setLoading(true)
      setError(null)

      try {
        if (urlState.mode === 'create') {
          await dataProvider.create(formData)
        } else if (urlState.mode === 'edit' && urlState.id) {
          await dataProvider.update(urlState.id, formData)
        }

        // Return to list and refresh
        setUrlState({ mode: 'list', id: null })
        await fetchList()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save')
        throw err // Re-throw to let form handle it
      } finally {
        setLoading(false)
      }
    },

    delete: async (id: string) => {
      if (!window.confirm('Are you sure you want to delete this item?')) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        await dataProvider.delete(id)
        await fetchList()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete')
      } finally {
        setLoading(false)
      }
    },

    deleteMany: async () => {
      if (selectedRows.length === 0) return

      if (
        !window.confirm(
          `Are you sure you want to delete ${selectedRows.length} item(s)?`
        )
      ) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        await dataProvider.deleteMany(selectedRows)
        setSelectedRows([])
        await fetchList()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete items')
      } finally {
        setLoading(false)
      }
    },
  }

  // ============================================
  // RETURN
  // ============================================

  const state: CrudState<T> = {
    mode: urlState.mode as Mode,
    selectedId: urlState.id,
    page: urlState.page,
    pageSize: urlState.pageSize,
    sortField: urlState.sortField,
    sortOrder: urlState.sortOrder as 'asc' | 'desc',
    filters: urlState.filters,
    search: urlState.search,
    data,
    totalCount,
    loading,
    error,
    selectedRows,
    currentItem,
  }

  return { state, actions }
}
