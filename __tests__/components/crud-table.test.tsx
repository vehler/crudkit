import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Crud } from '../../registry/default/crudkit/crudkit/crud-table'
import { MockDataProvider } from '../../registry/default/crudkit/crudkit-example-users/mock-data-provider'
import type { Schema } from '../../registry/default/crudkit/crudkit/data-provider'

// Test schema
const testSchema: Schema = {
  title: 'User',
  idField: 'id',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, sortable: true },
    { name: 'email', label: 'Email', type: 'email', required: true, sortable: true },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
      filterable: true,
    },
  ],
}

// Test data
const testData = [
  { id: '1', name: 'Alice', email: 'alice@test.com', role: 'admin' },
  { id: '2', name: 'Bob', email: 'bob@test.com', role: 'user' },
  { id: '3', name: 'Charlie', email: 'charlie@test.com', role: 'user' },
]

describe('Crud Component', () => {
  let provider: MockDataProvider<any>
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    provider = new MockDataProvider(testData, 0)
    user = userEvent.setup()
    vi.clearAllMocks()
  })

  describe('List View', () => {
    it('should render table with data', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument()
      })

      expect(screen.getByText('Bob')).toBeInTheDocument()
      expect(screen.getByText('Charlie')).toBeInTheDocument()
    })

    it('should display loading state initially', () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should render empty state when no data', async () => {
      const emptyProvider = new MockDataProvider([], 0)

      render(
        <Crud schema={testSchema} dataProvider={emptyProvider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('No data found')).toBeInTheDocument()
      })
    })

    it('should show column headers', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('Name')).toBeInTheDocument()
      })

      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Role')).toBeInTheDocument()
    })
  })

  describe('Toolbar', () => {
    it('should render create and refresh buttons', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.Toolbar />
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('+ Create New')).toBeInTheDocument()
      })

      expect(screen.getByText('⟳ Refresh')).toBeInTheDocument()
    })

    it('should show resource title', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.Toolbar />
        </Crud>
      )

      expect(screen.getByText('User Management')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('should filter data by search query', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search...')
      await user.type(searchInput, 'bob')

      await waitFor(() => {
        expect(screen.queryByText('Alice')).not.toBeInTheDocument()
      })

      expect(screen.getByText('Bob')).toBeInTheDocument()
      expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
    })

    it('should clear search on Clear button click', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search...')
      await user.type(searchInput, 'bob')

      await waitFor(() => {
        expect(screen.queryByText('Alice')).not.toBeInTheDocument()
      })

      const clearButton = screen.getByText('Clear')
      await user.click(clearButton)

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument()
      })
    })
  })

  describe('Row Selection', () => {
    it('should select individual rows', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      const firstRowCheckbox = checkboxes[1] // Skip header checkbox

      await user.click(firstRowCheckbox)

      await waitFor(() => {
        expect(screen.getByText('1 items selected')).toBeInTheDocument()
      })
    })

    it('should select all rows with header checkbox', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      const headerCheckbox = checkboxes[0]

      await user.click(headerCheckbox)

      await waitFor(() => {
        expect(screen.getByText('3 items selected')).toBeInTheDocument()
      })
    })
  })

  describe('Form - Create Mode', () => {
    it('should open create form when clicking Create New', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.Toolbar />
          <Crud.List />
          <Crud.Form />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('+ Create New')).toBeInTheDocument()
      })

      await user.click(screen.getByText('+ Create New'))

      await waitFor(() => {
        expect(screen.getByText('Create User')).toBeInTheDocument()
      })

      expect(screen.getByLabelText(/Name/)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
    })

    it('should validate required fields', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.Toolbar />
          <Crud.Form />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('+ Create New')).toBeInTheDocument()
      })

      await user.click(screen.getByText('+ Create New'))

      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument()
      })

      await user.click(screen.getByText('Save'))

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
      })

      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })

    it('should create new item on form submit', async () => {
      const createSpy = vi.spyOn(provider, 'create')

      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.Toolbar />
          <Crud.List />
          <Crud.Form />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('+ Create New')).toBeInTheDocument()
      })

      await user.click(screen.getByText('+ Create New'))

      await waitFor(() => {
        expect(screen.getByLabelText(/Name/)).toBeInTheDocument()
      })

      await user.type(screen.getByLabelText(/Name/), 'New User')
      await user.type(screen.getByLabelText(/Email/), 'new@test.com')

      await user.click(screen.getByText('Save'))

      await waitFor(() => {
        expect(createSpy).toHaveBeenCalled()
      })
    })

    it('should cancel form and return to list', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.Toolbar />
          <Crud.List />
          <Crud.Form />
        </Crud>
      )

      await user.click(screen.getByText('+ Create New'))

      await waitFor(() => {
        expect(screen.getByText('Cancel')).toBeInTheDocument()
      })

      await user.click(screen.getByText('Cancel'))

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument()
      })
    })
  })

  describe('Pagination', () => {
    it('should show pagination controls', async () => {
      render(
        <Crud schema={testSchema} dataProvider={provider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText(/Showing \d+ to \d+ of \d+ items/)).toBeInTheDocument()
      })

      expect(screen.getByText('⏮')).toBeInTheDocument() // First
      expect(screen.getByText('← Previous')).toBeInTheDocument()
      expect(screen.getByText('Next →')).toBeInTheDocument()
      expect(screen.getByText('⏭')).toBeInTheDocument() // Last
    })

    it('should change page size', async () => {
      const manyItems = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        email: `user${i + 1}@test.com`,
        role: 'user',
      }))

      const largeProvider = new MockDataProvider(manyItems, 0)

      render(
        <Crud schema={testSchema} dataProvider={largeProvider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('User 1')).toBeInTheDocument()
      })

      const pageSizeSelect = screen.getByDisplayValue('10 per page')
      await user.selectOptions(pageSizeSelect, '25')

      await waitFor(() => {
        expect(screen.getByText('Showing 1 to 25 of 50 items')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should display error message', async () => {
      const errorProvider = new MockDataProvider([], 0)
      vi.spyOn(errorProvider, 'getList').mockRejectedValue(new Error('Network error'))

      render(
        <Crud schema={testSchema} dataProvider={errorProvider}>
          <Crud.List />
        </Crud>
      )

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })
  })
})
