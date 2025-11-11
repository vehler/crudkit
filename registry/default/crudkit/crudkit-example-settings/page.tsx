'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { settingSchema } from '@/lib/examples/setting-schema'
import { mockSettings } from '@/lib/examples/mock-settings'

// Create data provider instance
const settingDataProvider = new MockDataProvider(mockSettings)

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={settingSchema} dataProvider={settingDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['settingLabel', 'category', 'type', 'value']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}
