'use client'

import { CopyButton } from '@/components/layout/copy-button'
import { getSiteUrl } from '@/lib/install-command'

interface InstallCommandProps {
  component: string
  className?: string
}

export function InstallCommand({ component, className }: InstallCommandProps) {
  const siteUrl = getSiteUrl()
  const command = `npx shadcn@latest add ${siteUrl}/registry/${component}.json`

  return (
    <div className={className}>
      <div className="relative rounded-lg border bg-zinc-950 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">bash</span>
          <CopyButton text={command} variant="ghost" size="sm" />
        </div>
        <div className="overflow-x-auto p-4">
          <code className="text-sm text-zinc-50">{command}</code>
        </div>
      </div>
    </div>
  )
}
