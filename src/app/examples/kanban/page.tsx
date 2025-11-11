'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/code/code-block'

export default function KanbanPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              CRUDKit
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Docs
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Examples
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link
              href="/examples"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to Examples
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Kanban Board
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Drag-and-drop task management with Kanban view and status workflows
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Installation */}
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Installation
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Install the CRUDKit kanban board example using the CLI
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`npx shadcn add https://crudkit.dev/r/crudkit-example-kanban`}
              language="bash"
              title="CLI"
            />
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            This will install the kanban example along with the kanban plugin component. All required dependencies (@dnd-kit packages) will be automatically installed.
          </p>
        </div>

        {/* Demo Preview */}
        <div className="mt-8 rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Kanban Task Board
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Visual task management with drag-and-drop functionality. Organize tasks across different status columns.
            </p>
          </div>

          {/* Sample Kanban Columns */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* To Do Column */}
            <div className="rounded-lg border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">📋 To Do</h3>
                <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  3
                </span>
              </div>
              <div className="space-y-2">
                <div className="rounded border bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">Setup database schema</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Design and implement data models</div>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      High Priority
                    </span>
                  </div>
                </div>
                <div className="rounded border bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">Write API documentation</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Document all endpoints</div>
                </div>
              </div>
            </div>

            {/* In Progress Column */}
            <div className="rounded-lg border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">🚀 In Progress</h3>
                <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  2
                </span>
              </div>
              <div className="space-y-2">
                <div className="rounded border bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">Implement authentication</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Add JWT token support</div>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Done Column */}
            <div className="rounded-lg border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">✅ Done</h3>
                <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  4
                </span>
              </div>
              <div className="space-y-2">
                <div className="rounded border bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">Initial project setup</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Configure Next.js and dependencies</div>
                </div>
                <div className="rounded border bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">Design system setup</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Install and configure shadcn/ui</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🎯 Drag & Drop
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Powered by @dnd-kit for smooth, accessible drag-and-drop interactions
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🔄 Status Workflow
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Automatically updates task status when moved between columns
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🎨 Customizable
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Define custom columns, card layouts, and group by any field
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Usage
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Integrate the Kanban board with your CRUDKit setup:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`'use client'

import { useState } from 'react'
import { Crud } from '@/components/crudkit/crud-table'
import { KanbanBoard } from '@/components/crudkit/kanban-board'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { taskSchema } from '@/lib/examples/task-schema'
import { mockTasks } from '@/lib/examples/mock-tasks'

const taskDataProvider = new MockDataProvider(mockTasks)

export default function KanbanPage() {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban')

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => setViewMode('table')}
          className={\`px-4 py-2 rounded \${viewMode === 'table' ? 'bg-zinc-900 text-white' : 'bg-zinc-100'}\`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode('kanban')}
          className={\`px-4 py-2 rounded \${viewMode === 'kanban' ? 'bg-zinc-900 text-white' : 'bg-zinc-100'}\`}
        >
          Kanban View
        </button>
      </div>

      <Crud schema={taskSchema} dataProvider={taskDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        {viewMode === 'kanban' ? (
          <KanbanBoard groupField="status" />
        ) : (
          <Crud.List columns={['title', 'status', 'priority', 'assignee']} />
        )}
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}`}
              language="typescript"
              title="app/examples/kanban/page.tsx"
            />
          </div>
        </div>

        {/* Kanban Component */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Kanban Board Configuration
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            The KanbanBoard component is highly configurable:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`import { KanbanBoard } from '@/components/crudkit/kanban-board'

// Basic usage - group by status field
<KanbanBoard groupField="status" />

// With custom columns
<KanbanBoard
  groupField="status"
  columns={[
    { value: 'todo', label: 'To Do', color: 'blue' },
    { value: 'in-progress', label: 'In Progress', color: 'yellow' },
    { value: 'done', label: 'Done', color: 'green' },
  ]}
/>

// Group by different fields
<KanbanBoard groupField="priority" /> // Group by priority
<KanbanBoard groupField="assignee" /> // Group by assignee`}
              language="typescript"
              title="Kanban Configuration"
            />
          </div>
        </div>

        {/* Schema Definition */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Task Schema
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Define your task structure with a status field for kanban grouping:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`import type { Schema } from '@/lib/crudkit/data-provider'

export const taskSchema: Schema = {
  title: 'Task',
  idField: 'id',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      sortable: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'todo', label: 'To Do' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
      filterable: true,
      sortable: true,
    },
  ],
}`}
              language="typescript"
              title="lib/examples/task-schema.ts"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400">
            💡 Next Steps
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>• Add custom card renderers to display additional task metadata</li>
            <li>• Implement real-time updates with WebSockets or polling</li>
            <li>• Add swimlanes for multi-dimensional organization (e.g., by assignee)</li>
            <li>• Customize column colors and add task progress indicators</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
