/**
 * Example: Custom Form Layouts
 *
 * This example demonstrates how to customize form layouts and submit buttons.
 */

import * as React from 'react'
import { Crud } from '../components/crud-table'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Save, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FormLayoutProps, SubmitButtonProps } from '../lib/component-types'

// =============================================================================
// EXAMPLE 1: Card Layout
// =============================================================================

const CardFormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  error,
  onSubmit,
  onCancel,
  isSubmitting,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={cn('max-w-2xl', className)}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {children}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

// =============================================================================
// EXAMPLE 2: Two-Column Layout
// =============================================================================

const TwoColumnFormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  error,
  onSubmit,
  onCancel,
  isSubmitting,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={cn('max-w-4xl space-y-6', className)}>
      <h2 className="text-xl font-bold">{title}</h2>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-6">{children}</div>

      <div className="flex gap-2 pt-4 border-t">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}

// =============================================================================
// EXAMPLE 3: Tabbed Layout
// =============================================================================

const TabbedFormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  error,
  onSubmit,
  onCancel,
  isSubmitting,
  schema,
  className,
}) => {
  // Group fields by category (this is a simplified example)
  const childrenArray = React.Children.toArray(children)
  const halfPoint = Math.ceil(childrenArray.length / 2)
  const basicFields = childrenArray.slice(0, halfPoint)
  const advancedFields = childrenArray.slice(halfPoint)

  return (
    <form onSubmit={onSubmit} className={cn('max-w-2xl space-y-6', className)}>
      <h2 className="text-xl font-bold">{title}</h2>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4">
          {basicFields}
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4">
          {advancedFields}
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}

// =============================================================================
// EXAMPLE 4: Horizontal Layout
// =============================================================================

const HorizontalFormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  error,
  onSubmit,
  onCancel,
  isSubmitting,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={cn('max-w-4xl space-y-4', className)}>
      <h2 className="text-xl font-bold">{title}</h2>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Each field rendered horizontally with label on left */}
      <div className="space-y-4">
        {React.Children.map(children, (child) => (
          <div className="grid grid-cols-3 gap-4 items-start">
            {child}
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}

// =============================================================================
// EXAMPLE 5: Custom Submit Buttons
// =============================================================================

const SaveAndContinueButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  mode,
  schema,
}) => {
  return (
    <div className="flex gap-2">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Save className="mr-2 h-4 w-4" />
        {mode === 'create' ? 'Create' : 'Update'} {schema.title}
      </Button>
      <Button
        type="submit"
        variant="outline"
        disabled={isSubmitting}
        onClick={(e) => {
          // Add logic to continue editing after save
          e.currentTarget.dataset.action = 'save-continue'
        }}
      >
        Save & Continue Editing
      </Button>
    </div>
  )
}

const IconSubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <Button type="submit" disabled={isSubmitting} size="icon" className="rounded-full">
      {isSubmitting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
    </Button>
  )
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

export function FormWithCardLayout() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Form components={{ Layout: CardFormLayout }} />
    </Crud>
  )
}

export function FormWithTwoColumns() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Form components={{ Layout: TwoColumnFormLayout }} />
    </Crud>
  )
}

export function FormWithTabs() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Form components={{ Layout: TabbedFormLayout }} />
    </Crud>
  )
}

export function FormWithHorizontalLayout() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Form components={{ Layout: HorizontalFormLayout }} />
    </Crud>
  )
}

export function FormWithCustomSubmitButton() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Form components={{ SubmitButton: SaveAndContinueButton }} />
    </Crud>
  )
}

export function FormWithIconSubmitButton() {
  return (
    <Crud schema={schema} dataProvider={dataProvider}>
      <Crud.Form components={{ SubmitButton: IconSubmitButton }} />
    </Crud>
  )
}

// Mock schema and provider (replace with actual implementations)
const schema: any = {
  title: 'Task',
  fields: [],
}
const dataProvider: any = {}
