import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.confirm and window.alert
global.confirm = vi.fn(() => true)
global.alert = vi.fn()

// Mock window.history for URL state management
Object.defineProperty(window, 'history', {
  value: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    go: vi.fn(),
  },
  writable: true,
})

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
  },
  writable: true,
})

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock nuqs with a more realistic implementation
vi.mock('nuqs', async () => {
  const actual = await vi.importActual('nuqs')
  return {
    ...actual,
    useQueryStates: vi.fn((config) => {
      const initialState: Record<string, any> = {}

      // Extract default values from config
      Object.entries(config).forEach(([key, parser]: [string, any]) => {
        if (parser && typeof parser === 'object' && 'defaultValue' in parser) {
          initialState[key] = parser.defaultValue
        } else if (typeof parser === 'function') {
          initialState[key] = null
        }
      })

      const setState = vi.fn((updates) => {
        if (typeof updates === 'function') {
          // Handle functional updates
          return Promise.resolve()
        }
        return Promise.resolve()
      })

      return [initialState, setState]
    }),
  }
})
