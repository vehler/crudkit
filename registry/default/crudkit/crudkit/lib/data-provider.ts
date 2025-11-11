/**
 * CRUDKit Data Provider Interface
 *
 * Implement this interface to connect CRUDKit to your data source.
 * Supports REST APIs, GraphQL, local storage, or any custom backend.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Field configuration for a schema
 */
export interface Field {
  /** Field name (must match data property) */
  name: string

  /** Human-readable label */
  label: string

  /** Input type (text, email, select, textarea, etc.) */
  type?: string

  /** Is this field required? */
  required?: boolean

  /** Can this field be sorted? */
  sortable?: boolean

  /** Can this field be filtered? */
  filterable?: boolean

  /** Show on create form? */
  showOnCreate?: boolean

  /** Show on edit form? */
  showOnEdit?: boolean

  /** Options for select/radio inputs */
  options?: Array<{ value: string; label: string }>
}

/**
 * Schema definition for a resource
 */
export interface Schema {
  /** Resource title (e.g., "User", "Product") */
  title: string

  /** Name of the ID field (default: "id") */
  idField: string

  /** Field definitions */
  fields: Field[]
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  /** Current page number (1-indexed) */
  page: number

  /** Items per page */
  pageSize: number
}

/**
 * Sort parameters
 */
export interface SortParams {
  /** Field to sort by */
  field: string

  /** Sort order */
  order: 'asc' | 'desc'
}

/**
 * Filter parameters (field -> value mapping)
 */
export type FilterParams = Record<string, any>

/**
 * Parameters for getList operation
 */
export interface GetListParams {
  /** Pagination settings */
  pagination: PaginationParams

  /** Sort settings (optional) */
  sort?: SortParams | null

  /** Filter settings (optional) */
  filters?: FilterParams

  /** Search query (optional) */
  search?: string
}

/**
 * Result from getList operation
 */
export interface GetListResult<T = any> {
  /** Array of data items */
  data: T[]

  /** Total count of items (for pagination) */
  total: number

  /** Current page number */
  page: number

  /** Items per page */
  pageSize: number
}

// ============================================
// DATA PROVIDER INTERFACE
// ============================================

/**
 * Data Provider Interface
 *
 * Implement this interface to connect your data source to CRUDKit.
 *
 * @example
 * ```typescript
 * class MyDataProvider implements DataProvider {
 *   async getList(params: GetListParams) {
 *     const response = await fetch('/api/users?' + new URLSearchParams({
 *       page: String(params.pagination.page),
 *       pageSize: String(params.pagination.pageSize),
 *       // ... other params
 *     }))
 *     return response.json()
 *   }
 *
 *   async getOne(id: string) {
 *     const response = await fetch(`/api/users/${id}`)
 *     return response.json()
 *   }
 *
 *   // ... implement other methods
 * }
 * ```
 */
export interface DataProvider<T = any> {
  /**
   * Fetch a paginated list of items
   *
   * @param params - Pagination, sorting, filtering, and search parameters
   * @returns Paginated list result
   */
  getList(params: GetListParams): Promise<GetListResult<T>>

  /**
   * Fetch a single item by ID
   *
   * @param id - Item identifier
   * @returns Single item
   */
  getOne(id: string): Promise<T>

  /**
   * Create a new item
   *
   * @param data - Item data
   * @returns Created item
   */
  create(data: Partial<T>): Promise<T>

  /**
   * Update an existing item
   *
   * @param id - Item identifier
   * @param data - Updated fields
   * @returns Updated item
   */
  update(id: string, data: Partial<T>): Promise<T>

  /**
   * Delete a single item
   *
   * @param id - Item identifier
   */
  delete(id: string): Promise<void>

  /**
   * Delete multiple items
   *
   * @param ids - Array of item identifiers
   */
  deleteMany(ids: string[]): Promise<void>
}

// ============================================
// BASE DATA PROVIDER (OPTIONAL)
// ============================================

/**
 * Base Data Provider Class
 *
 * Optional base class with common utilities.
 * Extend this class to reduce boilerplate.
 *
 * @example
 * ```typescript
 * class RestDataProvider extends BaseDataProvider {
 *   constructor(private baseUrl: string) {
 *     super()
 *   }
 *
 *   async getList(params: GetListParams) {
 *     // Implement using this.baseUrl
 *   }
 *
 *   // ... implement other methods
 * }
 * ```
 */
export abstract class BaseDataProvider<T = any> implements DataProvider<T> {
  abstract getList(params: GetListParams): Promise<GetListResult<T>>
  abstract getOne(id: string): Promise<T>
  abstract create(data: Partial<T>): Promise<T>
  abstract update(id: string, data: Partial<T>): Promise<T>
  abstract delete(id: string): Promise<void>
  abstract deleteMany(ids: string[]): Promise<void>

  /**
   * Helper: Build query string from params
   */
  protected buildQueryString(params: GetListParams): string {
    const queryParams = new URLSearchParams()

    // Pagination
    queryParams.set('page', String(params.pagination.page))
    queryParams.set('pageSize', String(params.pagination.pageSize))

    // Sort
    if (params.sort) {
      queryParams.set('sortField', params.sort.field)
      queryParams.set('sortOrder', params.sort.order)
    }

    // Filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          queryParams.set(`filter[${key}]`, String(value))
        }
      })
    }

    // Search
    if (params.search) {
      queryParams.set('search', params.search)
    }

    return queryParams.toString()
  }

  /**
   * Helper: Handle API errors
   */
  protected async handleResponse<R>(response: Response): Promise<R> {
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }
    return response.json()
  }
}
