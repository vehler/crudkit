import { describe, it, expect, vi } from 'vitest'
import { BaseDataProvider, type GetListParams } from '@/lib/crudkit/data-provider'

// Create a test implementation of BaseDataProvider
class TestDataProvider extends BaseDataProvider {
  async getList(params: GetListParams) {
    return {
      data: [],
      total: 0,
      page: params.pagination.page,
      pageSize: params.pagination.pageSize,
    }
  }

  async getOne(id: string) {
    return { id }
  }

  async create(data: any) {
    return { id: '1', ...data }
  }

  async update(id: string, data: any) {
    return { id, ...data }
  }

  async delete(id: string) {
    return Promise.resolve()
  }

  async deleteMany(ids: string[]) {
    return Promise.resolve()
  }

  // Expose protected methods for testing
  public buildQueryStringTest(params: GetListParams) {
    return this.buildQueryString(params)
  }

  public handleResponseTest<R>(response: Response): Promise<R> {
    return this.handleResponse<R>(response)
  }
}

describe('BaseDataProvider', () => {
  let provider: TestDataProvider

  beforeEach(() => {
    provider = new TestDataProvider()
  })

  describe('buildQueryString', () => {
    it('should build query string with pagination', () => {
      const params: GetListParams = {
        pagination: { page: 2, pageSize: 25 },
      }

      const query = provider.buildQueryStringTest(params)

      expect(query).toBe('page=2&pageSize=25')
    })

    it('should include sort parameters', () => {
      const params: GetListParams = {
        pagination: { page: 1, pageSize: 10 },
        sort: { field: 'name', order: 'desc' },
      }

      const query = provider.buildQueryStringTest(params)

      expect(query).toContain('sortField=name')
      expect(query).toContain('sortOrder=desc')
    })

    it('should include filters', () => {
      const params: GetListParams = {
        pagination: { page: 1, pageSize: 10 },
        filters: { role: 'admin', status: 'active' },
      }

      const query = provider.buildQueryStringTest(params)

      // URLSearchParams encodes brackets as %5B and %5D
      expect(decodeURIComponent(query)).toContain('filter[role]=admin')
      expect(decodeURIComponent(query)).toContain('filter[status]=active')
    })

    it('should skip empty filter values', () => {
      const params: GetListParams = {
        pagination: { page: 1, pageSize: 10 },
        filters: { role: 'admin', status: '', emptyKey: null },
      }

      const query = provider.buildQueryStringTest(params)
      const decoded = decodeURIComponent(query)

      expect(decoded).toContain('filter[role]=admin')
      expect(decoded).not.toContain('filter[status]')
      expect(decoded).not.toContain('filter[emptyKey]')
    })

    it('should include search parameter', () => {
      const params: GetListParams = {
        pagination: { page: 1, pageSize: 10 },
        search: 'john doe',
      }

      const query = provider.buildQueryStringTest(params)

      expect(query).toContain('search=john+doe')
    })

    it('should build complete query string with all parameters', () => {
      const params: GetListParams = {
        pagination: { page: 3, pageSize: 50 },
        sort: { field: 'createdAt', order: 'asc' },
        filters: { role: 'user', department: 'Engineering' },
        search: 'test query',
      }

      const query = provider.buildQueryStringTest(params)
      const decoded = decodeURIComponent(query)

      expect(query).toContain('page=3')
      expect(query).toContain('pageSize=50')
      expect(query).toContain('sortField=createdAt')
      expect(query).toContain('sortOrder=asc')
      expect(decoded).toContain('filter[role]=user')
      expect(decoded).toContain('filter[department]=Engineering')
      expect(query).toContain('search=test+query')
    })
  })

  describe('handleResponse', () => {
    it('should parse successful JSON response', async () => {
      const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })

      const result = await provider.handleResponseTest<{ data: string }>(mockResponse)

      expect(result).toEqual({ data: 'test' })
    })

    it('should throw error on 404 response', async () => {
      const mockResponse = new Response('Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      })

      await expect(provider.handleResponseTest(mockResponse)).rejects.toThrow(
        'API Error: 404 - Not Found'
      )
    })

    it('should throw error on 500 response', async () => {
      const mockResponse = new Response('Internal Server Error', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      })

      await expect(provider.handleResponseTest(mockResponse)).rejects.toThrow(
        'API Error: 500 - Internal Server Error'
      )
    })

    it('should throw error on 401 unauthorized', async () => {
      const mockResponse = new Response('Unauthorized', {
        status: 401,
      })

      await expect(provider.handleResponseTest(mockResponse)).rejects.toThrow(
        'API Error: 401 - Unauthorized'
      )
    })
  })

  describe('interface implementation', () => {
    it('should implement all required DataProvider methods', () => {
      expect(typeof provider.getList).toBe('function')
      expect(typeof provider.getOne).toBe('function')
      expect(typeof provider.create).toBe('function')
      expect(typeof provider.update).toBe('function')
      expect(typeof provider.delete).toBe('function')
      expect(typeof provider.deleteMany).toBe('function')
    })

    it('should call getList with params', async () => {
      const spy = vi.spyOn(provider, 'getList')
      const params: GetListParams = {
        pagination: { page: 1, pageSize: 10 },
      }

      await provider.getList(params)

      expect(spy).toHaveBeenCalledWith(params)
    })

    it('should call getOne with id', async () => {
      const spy = vi.spyOn(provider, 'getOne')

      await provider.getOne('123')

      expect(spy).toHaveBeenCalledWith('123')
    })

    it('should call create with data', async () => {
      const spy = vi.spyOn(provider, 'create')
      const data = { name: 'Test' }

      await provider.create(data)

      expect(spy).toHaveBeenCalledWith(data)
    })

    it('should call update with id and data', async () => {
      const spy = vi.spyOn(provider, 'update')
      const data = { name: 'Updated' }

      await provider.update('123', data)

      expect(spy).toHaveBeenCalledWith('123', data)
    })

    it('should call delete with id', async () => {
      const spy = vi.spyOn(provider, 'delete')

      await provider.delete('123')

      expect(spy).toHaveBeenCalledWith('123')
    })

    it('should call deleteMany with ids array', async () => {
      const spy = vi.spyOn(provider, 'deleteMany')
      const ids = ['1', '2', '3']

      await provider.deleteMany(ids)

      expect(spy).toHaveBeenCalledWith(ids)
    })
  })
})
