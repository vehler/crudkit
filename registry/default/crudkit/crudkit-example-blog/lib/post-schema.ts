import type { Schema } from '@/lib/crudkit/data-provider'

export const postSchema: Schema = {
  title: 'Post',
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
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
      sortable: true,
      filterable: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'business', label: 'Business' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'travel', label: 'Travel' },
        { value: 'food', label: 'Food & Cooking' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' },
      ],
      required: true,
      filterable: true,
      sortable: true,
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      required: true,
      sortable: true,
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      showOnCreate: true,
      showOnEdit: true,
    },
  ],
}
