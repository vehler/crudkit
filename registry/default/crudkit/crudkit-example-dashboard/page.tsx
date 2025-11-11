'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { activitySchema, metricSchema, quickTaskSchema } from '@/lib/examples/dashboard-schemas'
import { mockActivities, mockMetrics, mockQuickTasks } from '@/lib/examples/mock-dashboard-data'

// Create data provider instances for each widget
const activityDataProvider = new MockDataProvider(mockActivities)
const metricDataProvider = new MockDataProvider(mockMetrics)
const taskDataProvider = new MockDataProvider(mockQuickTasks)

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Widget */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Crud schema={activitySchema} dataProvider={activityDataProvider}>
            <Crud.List columns={['user', 'action', 'resource', 'timestamp']} />
          </Crud>
        </div>

        {/* Key Metrics Widget */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <Crud schema={metricSchema} dataProvider={metricDataProvider}>
            <Crud.Toolbar />
            <Crud.List columns={['name', 'value', 'unit', 'trend']} />
            <Crud.Form />
          </Crud>
        </div>

        {/* Quick Tasks Widget */}
        <div className="border rounded-lg p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Quick Tasks</h2>
          <Crud schema={quickTaskSchema} dataProvider={taskDataProvider}>
            <Crud.Toolbar />
            <Crud.Filters />
            <Crud.List columns={['task', 'priority', 'status', 'dueDate']} />
            <Crud.Form />
          </Crud>
        </div>
      </div>
    </div>
  )
}
