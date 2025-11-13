/**
 * Example: Custom Form Fields
 *
 * This example demonstrates how to create custom form field components
 * and field-specific overrides.
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { DefaultField } from '../components/form'
import { cn } from '@/lib/utils'
import type { FieldProps } from '../lib/component-types'

// =============================================================================
// EXAMPLE 1: Rich Text Editor Field (Simplified)
// =============================================================================

const RichTextEditor: React.FC<FieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={`form-${field.name}`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="border rounded-md">
        {/* Simplified toolbar */}
        <div className="flex gap-1 p-2 border-b bg-muted/50">
          <button
            type="button"
            className="px-2 py-1 text-xs hover:bg-background rounded"
            onClick={() => {
              /* Bold logic */
            }}
          >
            B
          </button>
          <button
            type="button"
            className="px-2 py-1 text-xs hover:bg-background rounded"
            onClick={() => {
              /* Italic logic */
            }}
          >
            I
          </button>
          <button
            type="button"
            className="px-2 py-1 text-xs hover:bg-background rounded"
            onClick={() => {
              /* Underline logic */
            }}
          >
            U
          </button>
        </div>
        <Textarea
          id={`form-${field.name}`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="min-h-[200px] border-0 focus-visible:ring-0"
          placeholder="Type your content here..."
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

// =============================================================================
// EXAMPLE 2: Image Upload Field
// =============================================================================

const ImageUploadField: React.FC<FieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled,
  className,
}) => {
  const [preview, setPreview] = React.useState<string | null>(value || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={`form-${field.name}`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="space-y-4">
        {preview && (
          <div className="relative w-32 h-32 border rounded-md overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <Input
          id={`form-${field.name}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

// =============================================================================
// EXAMPLE 3: Rating Field (Slider)
// =============================================================================

const RatingField: React.FC<FieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled,
  className,
}) => {
  const rating = Number(value) || 0

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={`form-${field.name}`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="flex items-center gap-4">
        <Slider
          id={`form-${field.name}`}
          value={[rating]}
          onValueChange={(values) => onChange(values[0])}
          disabled={disabled}
          min={0}
          max={5}
          step={0.5}
          className="flex-1"
        />
        <span className="text-sm font-medium w-12 text-right">{rating.toFixed(1)}</span>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

// =============================================================================
// EXAMPLE 4: Toggle Field (Boolean)
// =============================================================================

const ToggleField: React.FC<FieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor={`form-${field.name}`}>
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {field.description && (
            <p className="text-sm text-muted-foreground">{field.description}</p>
          )}
        </div>
        <Switch
          id={`form-${field.name}`}
          checked={Boolean(value)}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

// =============================================================================
// EXAMPLE 5: Tags Input Field
// =============================================================================

const TagsInputField: React.FC<FieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled,
  className,
}) => {
  const tags = (value as string[]) || []
  const [input, setInput] = React.useState('')

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onChange([...tags, input.trim()])
      setInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={`form-${field.name}`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            id={`form-${field.name}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            disabled={disabled}
            placeholder="Type and press Enter"
          />
          <button
            type="button"
            onClick={addTag}
            disabled={disabled}
            className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md"
          >
            Add
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-muted rounded-md"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  disabled={disabled}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

interface BlogPost {
  id: string
  title: string
  content: string
  coverImage: string
  rating: number
  published: boolean
  tags: string[]
}

export function FormWithRichTextEditor() {
  return (
    <Crud schema={blogSchema} dataProvider={blogProvider}>
      <Crud.Form
        components={{
          fields: {
            content: RichTextEditor,
          },
        }}
      />
    </Crud>
  )
}

export function FormWithImageUpload() {
  return (
    <Crud schema={blogSchema} dataProvider={blogProvider}>
      <Crud.Form
        components={{
          fields: {
            coverImage: ImageUploadField,
          },
        }}
      />
    </Crud>
  )
}

export function FormWithRatingSlider() {
  return (
    <Crud schema={blogSchema} dataProvider={blogProvider}>
      <Crud.Form
        components={{
          fields: {
            rating: RatingField,
          },
        }}
      />
    </Crud>
  )
}

export function FormWithToggle() {
  return (
    <Crud schema={blogSchema} dataProvider={blogProvider}>
      <Crud.Form
        components={{
          fields: {
            published: ToggleField,
          },
        }}
      />
    </Crud>
  )
}

export function FormWithTagsInput() {
  return (
    <Crud schema={blogSchema} dataProvider={blogProvider}>
      <Crud.Form
        components={{
          fields: {
            tags: TagsInputField,
          },
        }}
      />
    </Crud>
  )
}

export function FormWithMultipleCustomFields() {
  return (
    <Crud schema={blogSchema} dataProvider={blogProvider}>
      <Crud.Form
        components={{
          fields: {
            content: RichTextEditor,
            coverImage: ImageUploadField,
            rating: RatingField,
            published: ToggleField,
            tags: TagsInputField,
          },
        }}
      />
    </Crud>
  )
}

// Mock schema and provider (replace with actual implementations)
const blogSchema: any = {}
const blogProvider: any = {}
