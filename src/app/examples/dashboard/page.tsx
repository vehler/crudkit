'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/code/code-block'
import { getSiteUrl } from '@/lib/install-command'

export default function DashboardPage() {
  const siteUrl = getSiteUrl()
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
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Track user behavior, events, and conversion metrics
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
            Install the CRUDKit analytics dashboard example using the CLI
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`npx shadcn add ${siteUrl}/r/crudkit-example-dashboard`}
              language="bash"
              title="CLI"
            />
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            This will install all required files including the page component, analytics event schema, and 50+ sample tracking events.
          </p>
        </div>

        {/* Demo Preview */}
        {/* Stats Grid */}
        <div className="mt-8 mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Events</div>
            <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">10</div>
          </div>
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Unique Users</div>
            <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">8</div>
          </div>
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Revenue</div>
            <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">$229.98</div>
          </div>
          <div className="rounded-lg border bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Avg Order Value</div>
            <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">$114.99</div>
          </div>
        </div>

        {/* Events Table */}
        <div className="rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Analytics Events
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Track and analyze user behavior with detailed event tracking.
            </p>
          </div>

          {/* Sample Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Event
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Type
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Device
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Value
                  </th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Homepage Visit</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Page View</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Desktop</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$0.00</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">US</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Product Click</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Click</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Mobile</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$0.00</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">UK</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">Purchase Complete</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Purchase</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">Desktop</td>
                  <td className="p-3 text-sm text-zinc-900 dark:text-zinc-50">$149.99</td>
                  <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">US</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              📊 Event Tracking
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Monitor user interactions and behavior patterns
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              🌍 Geographic Data
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Track user locations and regional performance
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              💰 Revenue Metrics
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Monitor conversions and purchase values
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Usage
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            After installation, use the analytics dashboard in your application:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`'use client'

import { Crud } from '@/components/crudkit'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { analyticsEventSchema } from '@/lib/examples/analytics-event-schema'
import { mockAnalyticsEvents } from '@/lib/examples/mock-analytics-events'

const analyticsDataProvider = new MockDataProvider(mockAnalyticsEvents)

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={analyticsEventSchema} dataProvider={analyticsDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['eventName', 'eventType', 'device', 'value', 'country', 'timestamp']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}`}
              language="typescript"
              title="app/examples/dashboard/page.tsx"
            />
          </div>
        </div>

        {/* Schema Definition */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Schema Definition
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Define your analytics event structure:
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`const analyticsEventSchema = {
  title: 'Analytics Event',
  idField: 'id',
  fields: [
    { name: 'eventName', label: 'Event Name', type: 'text', required: true },
    {
      name: 'eventType',
      label: 'Event Type',
      type: 'select',
      options: [
        { value: 'pageview', label: 'Page View' },
        { value: 'click', label: 'Click' },
        { value: 'purchase', label: 'Purchase' },
        { value: 'signup', label: 'Sign Up' },
        { value: 'custom', label: 'Custom' },
      ],
      filterable: true,
    },
    {
      name: 'device',
      label: 'Device',
      type: 'select',
      options: [
        { value: 'desktop', label: 'Desktop' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'tablet', label: 'Tablet' },
      ],
      filterable: true,
    },
    { name: 'value', label: 'Value', type: 'number' },
    { name: 'country', label: 'Country', type: 'text', filterable: true },
    { name: 'userId', label: 'User ID', type: 'text' },
    { name: 'timestamp', label: 'Timestamp', type: 'datetime', required: true },
  ],
}`}
              language="typescript"
              title="lib/examples/analytics-event-schema.ts"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400">
            💡 Next Steps
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>• Integrate with your analytics platform (Google Analytics, Mixpanel, etc.)</li>
            <li>• Add custom event properties and user segmentation</li>
            <li>• Implement real-time dashboards with WebSocket updates</li>
            <li>• Create automated reports and conversion funnel analysis</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
