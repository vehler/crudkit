import { describe, it, expect, beforeEach } from 'vitest'
import { MockDataProvider } from '../../registry/default/crudkit/crudkit-example-users/mock-data-provider'

describe('MockDataProvider', () => {
  let provider: MockDataProvider<any>
  const mockData = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'admin', status: 'active' },
    { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'guest', status: 'active' },
  ]

  beforeEach(() => {
    provider = new MockDataProvider(mockData, 0) // 0ms delay for faster tests
  })

  describe('getList', () => {
    it('should return paginated data', async () => {
      const result = await provider.getList({
        pagination: { page: 1, pageSize: 2 },
      })

      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(5)
      expect(result.page).toBe(1)
      expect(result.pageSize).toBe(2)
      expect(result.data[0].id).toBe('1')
      expect(result.data[1].id).toBe('2')
    })

    it('should return second page of data', async () => {
      const result = await provider.getList({
        pagination: { page: 2, pageSize: 2 },
      })

      expect(result.data).toHaveLength(2)
      expect(result.data[0].id).toBe('3')
      expect(result.data[1].id).toBe('4')
    })

    it('should filter by search query', async () => {
      const result = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
        search: 'john',
      })

      expect(result.data).toHaveLength(2) // John Doe and Bob Johnson
      expect(result.total).toBe(2)
    })

    it('should filter by exact field value', async () => {
      const result = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
        filters: { role: 'admin' },
      })

      expect(result.data).toHaveLength(2) // John and Alice
      expect(result.total).toBe(2)
      expect(result.data.every((item) => item.role === 'admin')).toBe(true)
    })

    it('should apply multiple filters', async () => {
      const result = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
        filters: { role: 'user', status: 'active' },
      })

      expect(result.data).toHaveLength(1) // Only Jane
      expect(result.data[0].name).toBe('Jane Smith')
    })

    it('should sort ascending', async () => {
      const result = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
        sort: { field: 'name', order: 'asc' },
      })

      expect(result.data[0].name).toBe('Alice Williams')
      expect(result.data[4].name).toBe('John Doe')
    })

    it('should sort descending', async () => {
      const result = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
        sort: { field: 'name', order: 'desc' },
      })

      expect(result.data[0].name).toBe('John Doe')
      expect(result.data[4].name).toBe('Alice Williams')
    })

    it('should combine search, filter, sort, and pagination', async () => {
      // Add more data with specific pattern
      const provider2 = new MockDataProvider(
        [
          ...mockData,
          { id: '6', name: 'John Admin', email: 'john2@example.com', role: 'admin', status: 'active' },
        ],
        0
      )

      const result = await provider2.getList({
        pagination: { page: 1, pageSize: 2 },
        search: 'john',
        filters: { status: 'active' },
        sort: { field: 'name', order: 'asc' },
      })

      expect(result.total).toBe(2) // John Doe and John Admin (both active)
      expect(result.data).toHaveLength(2)
      expect(result.data[0].name).toBe('John Admin')
      expect(result.data[1].name).toBe('John Doe')
    })
  })

  describe('getOne', () => {
    it('should return single item by id', async () => {
      const item = await provider.getOne('2')

      expect(item.id).toBe('2')
      expect(item.name).toBe('Jane Smith')
    })

    it('should throw error if item not found', async () => {
      await expect(provider.getOne('999')).rejects.toThrow('Item with id 999 not found')
    })
  })

  describe('create', () => {
    it('should create new item with generated id', async () => {
      const newItem = await provider.create({
        name: 'New User',
        email: 'new@example.com',
        role: 'user',
        status: 'active',
      })

      expect(newItem.id).toBeDefined()
      expect(newItem.name).toBe('New User')
      expect(newItem.createdAt).toBeDefined()

      // Verify item was added
      const list = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
      })
      expect(list.total).toBe(6)
    })
  })

  describe('update', () => {
    it('should update existing item', async () => {
      const updated = await provider.update('2', { name: 'Jane Updated' })

      expect(updated.id).toBe('2')
      expect(updated.name).toBe('Jane Updated')
      expect(updated.email).toBe('jane@example.com') // Other fields unchanged
    })

    it('should throw error if item not found', async () => {
      await expect(provider.update('999', { name: 'Test' })).rejects.toThrow(
        'Item with id 999 not found'
      )
    })
  })

  describe('delete', () => {
    it('should delete item by id', async () => {
      await provider.delete('2')

      // Verify item was removed
      const list = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
      })
      expect(list.total).toBe(4)
      expect(list.data.find((item) => item.id === '2')).toBeUndefined()
    })

    it('should throw error if item not found', async () => {
      await expect(provider.delete('999')).rejects.toThrow('Item with id 999 not found')
    })
  })

  describe('deleteMany', () => {
    it('should delete multiple items', async () => {
      await provider.deleteMany(['1', '3', '5'])

      const list = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
      })
      expect(list.total).toBe(2)
      expect(list.data.map((item) => item.id)).toEqual(['2', '4'])
    })

    it('should handle empty array', async () => {
      await provider.deleteMany([])

      const list = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
      })
      expect(list.total).toBe(5)
    })
  })

  describe('reset', () => {
    it('should reset data to initial state', async () => {
      // Modify data
      await provider.create({ name: 'New', email: 'new@test.com' })
      await provider.delete('1')

      // Reset
      provider.reset(mockData)

      const list = await provider.getList({
        pagination: { page: 1, pageSize: 10 },
      })
      expect(list.total).toBe(5)
      expect(list.data[0].id).toBe('1')
    })
  })

  describe('getData', () => {
    it('should return current data snapshot', () => {
      const snapshot = provider.getData()

      expect(snapshot).toHaveLength(5)
      expect(snapshot[0].id).toBe('1')
    })

    it('should return copy not reference', async () => {
      const snapshot = provider.getData()
      snapshot.push({ id: '999', name: 'Test' } as any)

      const snapshot2 = provider.getData()
      expect(snapshot2).toHaveLength(5) // Original data unchanged
    })
  })
})
