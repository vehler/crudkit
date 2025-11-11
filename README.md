# CRUDKit

**Build CRUD Applications at Lightning Speed**

A shadcn-based component registry for Next.js. Copy, paste, and customize. Built with TypeScript, Tailwind CSS, and best practices.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- ⚡ **Fast to Implement** - Add complete CRUD functionality in minutes
- 🎨 **Fully Customizable** - Own your code, extend and modify components
- 🔌 **Provider Agnostic** - Works with any backend (REST, GraphQL, tRPC)
- 🧩 **Compound Components** - Flexible composition pattern
- 🔗 **URL State Management** - Built-in with nuqs
- 📘 **TypeScript First** - Full type safety
- 🎯 **Drag & Drop Support** - Kanban boards with dnd-kit
- ♿ **Accessible** - Built with best practices
- 🌙 **Dark Mode Ready** - Tailwind CSS powered

## Quick Start

### Installation

```bash
# Install shadcn/ui (if you haven't already)
npx shadcn@latest init

# Install dependencies
npm install nuqs clsx tailwind-merge

# Add CRUDKit components
npx shadcn add https://crudkit.dev/r/crudkit
```

### Basic Usage

```tsx
import { Crud } from '@/components/crudkit/crud-table'
import { userSchema } from '@/lib/user-schema'
import { dataProvider } from '@/lib/data-provider'

export default function UsersPage() {
  return (
    <Crud schema={userSchema} dataProvider={dataProvider}>
      <Crud.Toolbar />
      <Crud.Filters />
      <Crud.List />
      <Crud.Form />
      <Crud.View />
    </Crud>
  )
}
```

## Documentation

- [Installation Guide](https://crudkit.dev/docs/installation)
- [Quick Start Tutorial](https://crudkit.dev/docs/quick-start)
- [Full Documentation](https://crudkit.dev/docs)

## Examples

CRUDKit includes 7 complete, working examples demonstrating various use cases:

- **[User Management](https://crudkit.dev/examples/users)** - Complete CRUD with filtering, pagination, and 50+ mock users
- **[Kanban Board](https://crudkit.dev/examples/kanban)** - Drag-and-drop task management with status columns
- **[E-commerce Products](https://crudkit.dev/examples/products)** - Product catalog with inventory tracking and categories
- **[Order Management](https://crudkit.dev/examples/orders)** - Order fulfillment system with status workflow
- **[Blog/CMS](https://crudkit.dev/examples/blog)** - Content management with publishing workflow
- **[Settings Management](https://crudkit.dev/examples/settings)** - Application configuration and preferences
- **[Multi-Widget Dashboard](https://crudkit.dev/examples/dashboard)** - Multiple CRUDKit instances on one page

[View All Examples](https://crudkit.dev/examples)

## What's Included

### Core Components

- **Crud** - Main wrapper with context provider
- **Crud.Toolbar** - Action bar with create and refresh buttons
- **Crud.Filters** - Dynamic filters based on schema
- **Crud.List** - Data table with sorting, search, and pagination
- **Crud.Form** - Create/Edit forms with validation
- **Crud.View** - Read-only detail view

All CRUDKit components are built on top of **shadcn/ui base components**, including:

- Button, Input, Label, Select, Textarea (forms)
- Table components (data display)
- Badge, Card, Alert, Skeleton (UI feedback)
- Checkbox (selections)

### Plugins

- **Kanban Board** - Drag-and-drop board view powered by @dnd-kit

### Hooks

- **useCrud** - Core hook for state management and CRUD operations

### Utilities

- **DataProvider** - Interface for backend integration (REST, GraphQL, tRPC)
- **Schema** - Type-safe schema definition with field configuration
- **MockDataProvider** - In-memory data provider for examples and prototyping

## Architecture

CRUDKit follows the shadcn/ui philosophy: components live in your codebase, not as npm dependencies. This means:

- ✅ Full control over the code
- ✅ No version lock-in
- ✅ Easy customization
- ✅ Only bundle what you use
- ✅ No proprietary dependencies

## Tech Stack

- **Next.js 16** - App Router
- **React 19** - Latest features
- **TypeScript** - Type safety
- **shadcn/ui** - Base component library
- **Radix UI** - Accessible primitives
- **Tailwind CSS 4** - Styling with CSS variables
- **nuqs 2.7+** - URL state management
- **@dnd-kit** - Drag and drop
- **Vitest** - Testing

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build registry
npm run registry:build

# Format code
npm run format

# Lint code
npm run lint
```

## Project Structure

```
crudkit/
├── src/
│   ├── app/                          # Next.js app pages
│   │   ├── (home)/                  # Homepage
│   │   ├── docs/                    # Documentation pages
│   │   └── examples/                # Example applications
│   ├── components/
│   │   ├── ui/                      # shadcn/ui base components
│   │   └── home/                    # Homepage components
│   └── lib/
│       └── utils.ts                 # Utility functions (cn, etc.)
├── registry/                         # shadcn registry
│   ├── index.json                   # Main registry definition
│   └── default/crudkit/             # CRUDKit components
│       ├── crudkit/                 # Core CRUD system
│       │   ├── components/          # React components
│       │   ├── hooks/               # React hooks
│       │   └── lib/                 # Utilities and types
│       ├── crudkit-kanban/          # Kanban plugin
│       ├── crudkit-example-users/   # User management example
│       ├── crudkit-example-kanban/  # Kanban board example
│       ├── crudkit-example-products/     # Products example
│       ├── crudkit-example-orders/       # Orders example
│       ├── crudkit-example-blog/         # Blog/CMS example
│       ├── crudkit-example-settings/     # Settings example
│       └── crudkit-example-dashboard/    # Dashboard example
├── public/r/                        # Built registry JSON files
└── __tests__/                       # Test files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Component patterns from [React-Admin](https://marmelab.com/react-admin/) and [Refine](https://refine.dev/)

## Links

- [Website](https://crudkit.dev)
- [Documentation](https://crudkit.dev/docs)
- [Examples](https://crudkit.dev/examples)
- [GitHub](https://github.com/vehler/crudkit)
- [Issues](https://github.com/vehler/crudkit/issues)

---

**Built with ❤️ by the CRUDKit team**
