import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}
