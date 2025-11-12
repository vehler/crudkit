---
title: Data Providers
description: Learn how to connect CRUDKit to your backend API, database, or data source
category: guides
order: 1
---

# Data Providers

Data Providers are the bridge between CRUDKit and your data source. They handle all CRUD operations (Create, Read, Update, Delete) and communicate with your backend API, database, or any other data storage.

## Overview

A Data Provider implements the `DataProvider` interface and provides six core methods:

- `getList()` - Fetch paginated, filtered, and sorted data
- `getOne()` - Fetch a single record by ID
- `create()` - Create a new record
- `update()` - Update an existing record
- `delete()` - Delete a single record
- `deleteMany()` - Delete multiple records

## DataProvider Interface

```typescript
interface DataProvider<T = any> {
  getList(params: GetListParams): Promise<GetListResult<T>>
  getOne(id: string): Promise<T>
  create(data: Partial<T>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
```

## Creating a Data Provider

### Option 1: REST API Data Provider

Most common use case - connecting to a REST API:

```typescript
import { DataProvider, GetListParams, GetListResult } from '@/lib/crudkit/data-provider'

class RestDataProvider implements DataProvider<User> {
  constructor(private baseUrl: string) {}

  async getList(params: GetListParams): Promise<GetListResult<User>> {
    const queryString = new URLSearchParams({
      page: String(params.pagination.page),
      pageSize: String(params.pagination.pageSize),
      ...(params.sort && {
        sortField: params.sort.field,
        sortOrder: params.sort.order,
      }),
      ...(params.search && { search: params.search }),
    })

    // Add filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value) queryString.append(`filter[${key}]`, String(value))
      })
    }

    const response = await fetch(`${this.baseUrl}?${queryString}`)
    return response.json()
  }

  async getOne(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    return response.json()
  }

  async create(data: Partial<User>): Promise<User> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await Promise.all(ids.map(id => this.delete(id)))
  }
}

// Usage
const userProvider = new RestDataProvider('/api/users')
```

### Option 2: Extend BaseDataProvider

Use the `BaseDataProvider` base class to reduce boilerplate:

```typescript
import { BaseDataProvider, GetListParams, GetListResult } from '@/lib/crudkit/data-provider'

class MyApiProvider extends BaseDataProvider<Product> {
  constructor(private baseUrl: string) {
    super()
  }

  async getList(params: GetListParams): Promise<GetListResult<Product>> {
    const queryString = this.buildQueryString(params) // Helper method
    const response = await fetch(`${this.baseUrl}?${queryString}`)
    return this.handleResponse(response) // Helper method
  }

  async getOne(id: string): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    return this.handleResponse(response)
  }

  async create(data: Partial<Product>): Promise<Product> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await Promise.all(ids.map(id => this.delete(id)))
  }
}
```

## GetListParams

The `getList()` method receives rich parameters for filtering, sorting, and pagination:

```typescript
interface GetListParams {
  pagination: {
    page: number        // Current page (1-indexed)
    pageSize: number    // Items per page
  }
  sort?: {
    field: string       // Field to sort by
    order: 'asc' | 'desc'
  } | null
  filters?: Record<string, any>  // Active filters
  search?: string                // Search query
}
```

## GetListResult

The `getList()` method must return:

```typescript
interface GetListResult<T> {
  data: T[]          // Array of records
  total: number      // Total count (for pagination)
  page: number       // Current page
  pageSize: number   // Items per page
}
```

## Example: GraphQL Data Provider

```typescript
class GraphQLDataProvider implements DataProvider<Post> {
  constructor(private endpoint: string) {}

  async getList(params: GetListParams): Promise<GetListResult<Post>> {
    const query = `
      query GetPosts(
        $page: Int!
        $pageSize: Int!
        $sortField: String
        $sortOrder: String
      ) {
        posts(
          page: $page
          pageSize: $pageSize
          sortField: $sortField
          sortOrder: $sortOrder
        ) {
          data { id title content author }
          total
        }
      }
    `

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: {
          page: params.pagination.page,
          pageSize: params.pagination.pageSize,
          sortField: params.sort?.field,
          sortOrder: params.sort?.order,
        },
      }),
    })

    const { data } = await response.json()
    return {
      data: data.posts.data,
      total: data.posts.total,
      page: params.pagination.page,
      pageSize: params.pagination.pageSize,
    }
  }

  // ... implement other methods
}
```

## Example: Local Storage Provider

```typescript
class LocalStorageProvider implements DataProvider<Todo> {
  constructor(private storageKey: string) {}

  private getData(): Todo[] {
    const json = localStorage.getItem(this.storageKey)
    return json ? JSON.parse(json) : []
  }

  private setData(data: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  async getList(params: GetListParams): Promise<GetListResult<Todo>> {
    let data = this.getData()

    // Apply search
    if (params.search) {
      const search = params.search.toLowerCase()
      data = data.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(search)
        )
      )
    }

    // Apply filters
    if (params.filters) {
      data = data.filter(item =>
        Object.entries(params.filters).every(([key, value]) =>
          value ? item[key] === value : true
        )
      )
    }

    // Apply sorting
    if (params.sort) {
      data.sort((a, b) => {
        const aVal = a[params.sort!.field]
        const bVal = b[params.sort!.field]
        const order = params.sort!.order === 'asc' ? 1 : -1
        return aVal > bVal ? order : -order
      })
    }

    // Apply pagination
    const total = data.length
    const start = (params.pagination.page - 1) * params.pagination.pageSize
    const paginatedData = data.slice(start, start + params.pagination.pageSize)

    return {
      data: paginatedData,
      total,
      page: params.pagination.page,
      pageSize: params.pagination.pageSize,
    }
  }

  async getOne(id: string): Promise<Todo> {
    const data = this.getData()
    const item = data.find(item => item.id === id)
    if (!item) throw new Error('Not found')
    return item
  }

  async create(data: Partial<Todo>): Promise<Todo> {
    const items = this.getData()
    const newItem = { ...data, id: Date.now().toString() } as Todo
    items.push(newItem)
    this.setData(items)
    return newItem
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const items = this.getData()
    const index = items.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Not found')
    items[index] = { ...items[index], ...data }
    this.setData(items)
    return items[index]
  }

  async delete(id: string): Promise<void> {
    const items = this.getData()
    this.setData(items.filter(item => item.id !== id))
  }

  async deleteMany(ids: string[]): Promise<void> {
    const items = this.getData()
    this.setData(items.filter(item => !ids.includes(item.id)))
  }
}
```

## Error Handling

Always handle errors gracefully in your data provider:

```typescript
async getOne(id: string): Promise<User> {
  try {
    const response = await fetch(`${this.baseUrl}/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
```

## Authentication

Add authentication headers to your requests:

```typescript
class AuthenticatedProvider extends BaseDataProvider<User> {
  constructor(
    private baseUrl: string,
    private getToken: () => string
  ) {
    super()
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.getToken()}`,
      },
    })
  }

  async getList(params: GetListParams): Promise<GetListResult<User>> {
    const queryString = this.buildQueryString(params)
    const response = await this.fetchWithAuth(`${this.baseUrl}?${queryString}`)
    return this.handleResponse(response)
  }

  // ... other methods use fetchWithAuth
}
```

## Related

- [Schema Definition](/docs/guides/schemas) - Define your data structure
- [Crud Component](/docs/components/crud) - Use data providers with Crud
- [Examples](/examples) - See complete examples
