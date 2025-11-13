/**
 * Kanban Components
 *
 * Export all kanban components for easy import and extension.
 *
 * @example
 * ```typescript
 * import { KanbanCard } from '@/components/crudkit/kanban'
 *
 * // Extend card
 * const MyCard: React.FC<CardProps<Task>> = (props) => {
 *   return (
 *     <div className="relative">
 *       <KanbanCard {...props} />
 *       {props.item.isUrgent && <UrgentBadge />}
 *     </div>
 *   )
 * }
 *
 * <KanbanBoard components={{ Card: MyCard }} />
 * ```
 */

export { DefaultKanbanCard as KanbanCard } from './kanban-card'
export { DefaultColumnHeader as ColumnHeader } from './column-header'
export { DefaultEmptyColumn as EmptyColumn } from './empty-column'
