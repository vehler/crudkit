---
title: Installation
description: Get CRUDKit up and running in your Next.js project
---

## Prerequisites

Before you begin, make sure you have:

- Node.js 18.17 or later
- A Next.js 14+ project with App Router
- Tailwind CSS configured
- TypeScript (recommended)

## Step 1: Initialize shadcn/ui

CRUDKit uses the shadcn/ui CLI to install components. If you haven't already, initialize shadcn/ui in your project:

```bash
npx shadcn@latest init
```

Follow the prompts to configure your project. We recommend using the "Default" style and "Zinc" as the base color.

## Step 2: Add CRUDKit Components

Install the core CRUDKit components. This will also install all required dependencies (nuqs, clsx, tailwind-merge):

```bash
npx shadcn@latest add https://crudkit.dev/registry/crudkit.json
```

This will add the following files to your project:

- `components/crudkit/crud-table.tsx`
- `hooks/use-crud.ts`
- `lib/crudkit/data-provider.ts`

## Step 3: Optional Plugins

Install optional plugins as needed:

### Kanban Board Plugin

Adds drag-and-drop Kanban board support:

```bash
npx shadcn@latest add https://crudkit.dev/registry/crudkit-kanban.json
```

## Verification

Verify your installation by checking that the following files exist:

```
✓ components/crudkit/crud-table.tsx
✓ hooks/use-crud.ts
✓ lib/crudkit/data-provider.ts
```

## Next Steps

Now that you've installed CRUDKit, continue to the [Quick Start Guide](/docs/quick-start) to build your first CRUD table.
