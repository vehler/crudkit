import { Hero } from '@/components/home/hero'
import { Features } from '@/components/home/features'
import { CodeExample } from '@/components/home/code-example'
import { LiveDemo } from '@/components/home/live-demo'
import { Comparison } from '@/components/home/comparison'
import { SiteLayout } from '@/components/layout/site-layout'
import Link from 'next/link'

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Features />
      <CodeExample />
      <LiveDemo />
      <Comparison />

      {/* CTA Section */}
      <section className="bg-white py-24 dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Ready to build faster?
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Start building production-ready CRUD applications today
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Try Live Demos
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 bg-white px-8 text-base font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
