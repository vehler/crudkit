export function Comparison() {
  return (
    <section className="border-b bg-zinc-50 py-24 dark:bg-zinc-950 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Not another component library
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            CRUDKit is a different approach to building CRUD applications
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Traditional Libraries */}
            <div className="rounded-lg border bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                  <svg
                    className="h-6 w-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Traditional Libraries
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Installed as npm dependencies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Black box components you can't modify</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Version lock-in and breaking changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Limited customization options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Bundle size overhead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Fighting against the library's opinions</span>
                </li>
              </ul>
            </div>

            {/* CRUDKit Approach */}
            <div className="rounded-lg border-2 border-green-500 bg-white p-8 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  CRUDKit Approach
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Code lives in your codebase</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Full access to modify anything</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>No version lock-in concerns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Infinite customization possibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Only bundle what you use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Your code, your rules</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/10">
            <p className="text-center text-sm font-medium text-blue-900 dark:text-blue-400">
              <strong>The shadcn approach:</strong> Copy components into your
              project, own the code, and customize without limits.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
