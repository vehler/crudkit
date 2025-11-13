/**
 * Kanban Default Components
 *
 * Export all default kanban components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { DefaultKanbanCard } from '@/registry/default/crudkit/crudkit-kanban/components/kanban'
 *
 * // Extend default card
 * const MyCard: React.FC<CardProps<Task>> = (props) => {
 *   return (
 *     <div className="relative">
 *       <DefaultKanbanCard {...props} />
 *       {props.item.isUrgent && <UrgentBadge />}
 *     </div>
 *   )
 * }
 *
 * <KanbanBoard components={{ Card: MyCard }} />
 * ```
 */

export { DefaultKanbanCard } from './default-kanban-card'
export { DefaultColumnHeader } from './default-column-header'
export { DefaultEmptyColumn } from './default-empty-column'
