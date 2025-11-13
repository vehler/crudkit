import type {
  DataProvider,
  GetListParams,
  GetListResult,
} from '@/lib/crudkit/data-provider'

/**
 * Mock Data Provider
 *
 * In-memory data provider for testing and examples.
 * Simulates API delays and implements all CRUD operations.
 *
 * @example
 * ```typescript
 * const provider = new MockDataProvider(mockUsers)
 * ```
 */
export class MockDataProvider<T extends Record<string, any>> implements DataProvider<T> {
  private data: T[]
  private delay: number

  constructor(initialData: T[], delay: number = 300) {
    this.data = [...initialData]
    this.delay = delay
  }

  async getList(params: GetListParams): Promise<GetListResult<T>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, this.delay))

    let result = [...this.data]

    // Apply search
    if (params.search) {
      const searchLower = params.search.toLowerCase()
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchLower)
        )
      )
    }

    // Apply filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value) {
          result = result.filter((item) => item[key] === value)
        }
      })
    }

    // Apply sort
    if (params.sort) {
      result.sort((a, b) => {
        const aVal = a[params.sort!.field]
        const bVal = b[params.sort!.field]
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return params.sort!.order === 'asc' ? comparison : -comparison
      })
    }

    // Get total before pagination
    const total = result.length

    // Apply pagination
    const start = (params.pagination.page - 1) * params.pagination.pageSize
    const paginatedData = result.slice(
      start,
      start + params.pagination.pageSize
    )

    return {
      data: paginatedData,
      total,
      page: params.pagination.page,
      pageSize: params.pagination.pageSize,
    }
  }

  async getOne(id: string): Promise<T> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, this.delay))

    const item = this.data.find((d) => d.id === id)
    if (!item) {
      throw new Error(`Item with id ${id} not found`)
    }
    return item
  }

  async create(newData: Partial<T>): Promise<T> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, this.delay))

    const newItem = {
      ...newData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    } as T

    this.data.push(newItem)
    return newItem
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, this.delay))

    const index = this.data.findIndex((d) => d.id === id)
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`)
    }

    this.data[index] = { ...this.data[index], ...updates }
    return this.data[index]
  }

  async delete(id: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, this.delay))

    const index = this.data.findIndex((d) => d.id === id)
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`)
    }

    this.data.splice(index, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, this.delay))

    this.data = this.data.filter((d) => !ids.includes(d.id))
  }

  /**
   * Reset data to initial state (useful for demos)
   */
  reset(initialData: T[]) {
    this.data = [...initialData]
  }

  /**
   * Get current data snapshot (useful for debugging)
   */
  getData() {
    return [...this.data]
  }
}
