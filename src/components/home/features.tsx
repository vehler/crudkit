export function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Fast to Implement',
      description:
        'Add complete CRUD functionality in minutes. No complex setup, no boilerplate. Just copy, paste, and customize.',
    },
    {
      icon: '🎨',
      title: 'Fully Customizable',
      description:
        'You own the code. Every component is in your codebase. Extend, modify, and adapt to your exact needs.',
    },
    {
      icon: '🔌',
      title: 'Provider Agnostic',
      description:
        'Works with any backend. REST, GraphQL, tRPC, Supabase, Firebase, or your custom API. You decide.',
    },
    {
      icon: '🧩',
      title: 'Compound Components',
      description:
        'Flexible composition pattern. Mix and match components to build exactly what you need.',
    },
    {
      icon: '🔗',
      title: 'URL State Management',
      description:
        'Built-in URL state with nuqs. Filters, sorting, and pagination are shareable and bookmarkable.',
    },
    {
      icon: '📘',
      title: 'TypeScript First',
      description:
        'Full type safety out of the box. Autocomplete, type checking, and IntelliSense for the best DX.',
    },
    {
      icon: '🎯',
      title: 'Drag & Drop',
      description:
        'Kanban boards and sortable lists powered by dnd-kit. Smooth, accessible, and performant.',
    },
    {
      icon: '♿',
      title: 'Accessible',
      description:
        'Built with accessibility in mind. Keyboard navigation, ARIA labels, and semantic HTML.',
    },
    {
      icon: '🌙',
      title: 'Dark Mode Ready',
      description:
        'Beautiful in light and dark modes. Powered by Tailwind CSS with seamless theme switching.',
    },
  ]

  return (
    <section className="border-b bg-white py-24 dark:bg-zinc-900 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Everything you need to build CRUD UIs
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Production-ready components with batteries included. No dependencies
            on proprietary packages.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-2xl dark:bg-zinc-800">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
