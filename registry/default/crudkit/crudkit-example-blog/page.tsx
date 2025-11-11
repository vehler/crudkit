'use client'

import { Crud } from '@/components/crudkit/crud-table'
import { MockDataProvider } from '@/lib/examples/mock-data-provider'
import { postSchema } from '@/lib/examples/post-schema'
import { mockPosts } from '@/lib/examples/mock-posts'

// Create data provider instance
const postDataProvider = new MockDataProvider(mockPosts)

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8">
      <Crud schema={postSchema} dataProvider={postDataProvider}>
        <Crud.Toolbar />
        <Crud.Filters />
        <Crud.List columns={['title', 'author', 'category', 'status', 'publishDate']} />
        <Crud.Form />
        <Crud.View />
      </Crud>
    </div>
  )
}
