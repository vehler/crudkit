'use client'

import { useState } from 'react'

const examples = [
  {
    title: 'Installation',
    language: 'bash',
    code: `npx shadcn add https://crudkit.dev/r/crudkit`,
  },
  {
    title: 'Basic Usage',
    language: 'tsx',
    code: `import { Crud } from '@/components/crudkit/crud-table'
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
}`,
  },
  {
    title: 'Define Schema',
    language: 'tsx',
    code: `export const userSchema = {
  title: 'User',
  idField: 'id',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
      filterable: true
    },
    { name: 'status', label: 'Status', type: 'select', filterable: true },
  ],
}`,
  },
]

export function CodeExample() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(examples[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="border-b bg-zinc-50 py-24 dark:bg-zinc-950 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Get started in seconds
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Three simple steps to add powerful CRUD functionality to your app
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'border-b-2 border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative mt-4 rounded-lg border bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
              <span className="text-xs font-medium text-zinc-400">
                {examples[activeTab].language}
              </span>
              <button
                onClick={handleCopy}
                className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="overflow-x-auto p-4">
              <code className="text-sm text-zinc-50">
                {examples[activeTab].code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
