'use client'

import { useState } from 'react'
import { Crud } from '@/components/crudkit/crud-table'
import { KanbanBoard } from '@/components/crudkit/kanban-board'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { taskSchema } from '@/lib/examples/task-schema'
import { mockTasks } from '@/lib/examples/mock-tasks'

// Create data provider instance
const taskDataProvider = new MockDataProvider(mockTasks)

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban')

  return (
    <div className="container mx-auto">
      <Crud schema={taskSchema} dataProvider={taskDataProvider}>
        <Crud.Toolbar />

        {/* View Mode Switcher */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setViewMode('kanban')}
            className={`rounded px-4 py-2 ${
              viewMode === 'kanban'
                ? 'bg-blue-600 text-white'
                : 'border bg-white text-gray-700'
            }`}
          >
            📋 Kanban View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`rounded px-4 py-2 ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'border bg-white text-gray-700'
            }`}
          >
            📊 Table View
          </button>
        </div>

        <Crud.Filters
          filterFields={[
            taskSchema.fields.find((f) => f.name === 'priority'),
            taskSchema.fields.find((f) => f.name === 'assignee'),
          ]}
        />

        {/* Conditional rendering based on view mode */}
        {viewMode === 'kanban' ? (
          <KanbanBoard
            groupBy="status"
            columns={['todo', 'in-progress', 'done']}
            columnLabels={{
              todo: '📝 To Do',
              'in-progress': '⚡ In Progress',
              done: '✅ Done',
            }}
          />
        ) : (
          <Crud.List columns={['title', 'status', 'priority', 'assignee']} />
        )}

        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}
