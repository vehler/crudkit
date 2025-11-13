/**
 * CRUDKit - Complete CRUD Component Library
 *
 * Main entry point for CRUDKit components.
 *
 * @example
 * ```typescript
 * import { Crud } from '@/components/crudkit'
 * import { KanbanBoard } from '@/components/crudkit/kanban'
 *
 * <Crud schema={schema} dataProvider={dataProvider}>
 *   <Crud.Toolbar />
 *   <Crud.Filters />
 *   <Crud.List />
 *   <Crud.Form />
 *   <Crud.View />
 * </Crud>
 * ```
 */

export { Crud, useCrudContext } from './crud'
export type { CrudProps } from './crud'

// Re-export subcomponents for advanced usage
export * from './table'
export * from './form'
export * from './filters'
export * from './toolbar'
export * from './view'
