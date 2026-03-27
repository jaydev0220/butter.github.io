---
name: project-structure
description: Provides comprehensive knowledge of the project structure, directory conventions, and file locations. Use this skill whenever exploring the codebase, searching for specific files, creating new components/routes/types, or understanding where files should be placed. Trigger when users mention "where should I", "create a new", "add a component", "find the", "what's in", or any file/directory navigation tasks.
---

# Project Structure

This skill provides agents with comprehensive knowledge of the project's directory layout, naming conventions, and file organization patterns.

## When to Use This Skill

Consult this skill when:

- Creating new files, components, routes, or types
- Exploring the codebase to find existing functionality
- Understanding where specific types of code belong
- Navigating the SvelteKit project structure
- Making architectural decisions about file placement

## Directory Structure

```
project-root/
├── .agents/
│   └── skills/               # Custom agent skills
├── src/
│   ├── app.html             # HTML template wrapper
│   ├── lib/                 # Shared library code
│   │   ├── components/      # Reusable Svelte components
│   │   ├── types/           # Shared TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── routes/              # SvelteKit file-based routing
│       ├── +layout.svelte   # Root layout component
│       ├── +page.svelte     # Homepage
│       └── layout.css       # Global styles
├── static/                  # Static assets (served at /)
│   └── robots.txt
├── package.json             # Dependencies and scripts
├── svelte.config.js         # SvelteKit configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
└── AGENTS.md                # Agent behavior guidelines
```

## SvelteKit Routing Conventions

SvelteKit uses file-based routing with special filename prefixes:

- `+page.svelte` — Page component for a route
- `+page.ts` or `+page.js` — Page load function (runs on server and client)
- `+page.server.ts` — Server-only page load function
- `+layout.svelte` — Layout wrapper for routes
- `+layout.ts` or `+layout.js` — Layout load function
- `+layout.server.ts` — Server-only layout load function
- `+error.svelte` — Error page
- `+server.ts` — API endpoint (no page rendering)

### Route Examples

```
src/routes/+page.svelte              → /
src/routes/about/+page.svelte        → /about
src/routes/blog/[slug]/+page.svelte  → /blog/:slug (dynamic)
src/routes/api/users/+server.ts      → /api/users (API endpoint)
```

## File Placement Guidelines

### Components

**Reusable components** (used across multiple routes):

- Location: `src/lib/components/`
- Naming: PascalCase (e.g., `Button.svelte`, `Card.svelte`)
- Import: `import Button from '$lib/components/Button.svelte'`

**Route-specific components** (used only within one route):

- Location: Same directory as the route
- Naming: PascalCase with descriptive prefix (e.g., `ProfileHeader.svelte`)

### Types

**Shared types** (used across multiple files):

- Location: `src/lib/types/`
- Naming: Descriptive names in PascalCase or camelCase
- Example: `src/lib/types/user.ts`, `src/lib/types/api.ts`
- Import: `import type { User } from '$lib/types/user'`

**Route-specific types**:

- Location: Same directory as the route or in route's `+page.ts`/`+page.server.ts`
- Use when types are only relevant to that specific route

### Utilities

**Utility functions**:

- Location: `src/lib/utils/` or `src/lib/` (if no utils subdirectory)
- Naming: camelCase function names in kebab-case files
- Example: `src/lib/utils/format-date.ts`
- Import: `import { formatDate } from '$lib/utils/format-date'`

### Stores

**Svelte stores** (reactive state management):

- Location: `src/lib/stores/`
- Naming: camelCase store names in kebab-case files
- Example: `src/lib/stores/user-store.ts`
- Import: `import { userStore } from '$lib/stores/user-store'`

### Styles

**Global styles**:

- Location: `src/routes/layout.css`
- Contains: Tailwind theme configuration, CSS custom properties
- Applied via: `+layout.svelte` import

**Component-scoped styles**:

- Use `<style>` blocks within `.svelte` components
- Prefer Tailwind utility classes over custom CSS

**Shared style utilities**:

- Define CSS custom properties in `layout.css`
- Access via `theme()` in Tailwind classes

### Static Assets

**Public files** (images, fonts, robots.txt, etc.):

- Location: `static/`
- Accessible at: Root path (e.g., `static/logo.png` → `/logo.png`)
- Use for: Favicon, robots.txt, manifest.json, images, fonts

## Project Aliases

SvelteKit provides the `$lib` alias:

- `$lib` → `src/lib/`
- Example: `import Button from '$lib/components/Button.svelte'`

**IMPORTANT:** Always use `$lib` for imports from `src/lib/`, never relative paths like `../../lib/`.

## Creating New Files

### New Route

1. Create directory: `src/routes/your-route/`
2. Add page: `src/routes/your-route/+page.svelte`
3. Optional: Add load function `+page.ts` or `+page.server.ts`

### New Component

**Reusable component:**

```typescript
// src/lib/components/Button.svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary';
    onclick?: () => void;
  }

  let { variant = 'primary', onclick }: Props = $props();
</script>

<button class="btn btn-{variant}" {onclick}>
  {@render children?.()}
</button>
```

**Usage:**

```svelte
<script>
	import Button from '$lib/components/Button.svelte';
</script>

<Button variant="primary">Click me</Button>
```

### New Type Definition

```typescript
// src/lib/types/user.ts
export interface User {
	id: string;
	name: string;
	email: string;
}

export type UserRole = 'admin' | 'user' | 'guest';
```

### New Utility Function

```typescript
// src/lib/utils/format-date.ts
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
```

## Key Principles

1. **$lib for shared code** — Anything used in multiple places goes in `src/lib/`
2. **Co-locate route-specific code** — Components/types used in one route stay in that route's directory
3. **Use TypeScript** — All new files should use `.ts` or `.svelte` with TypeScript
4. **Follow SvelteKit conventions** — Use `+page.svelte`, `+layout.svelte`, etc. for routing
5. **Type everything** — No `any` types; use explicit interfaces/types
6. **Import with $lib** — Always use `$lib` alias for library imports

## Navigation Workflow

When asked to create or find files:

1. **Determine scope:** Is this shared (multiple routes) or route-specific?
2. **Choose location:**
   - Shared → `src/lib/[components|types|utils]/`
   - Route-specific → `src/routes/[route-name]/`
3. **Follow naming conventions:** PascalCase for components, camelCase for functions
4. **Use TypeScript:** Explicit types for all functions and component props
5. **Import with $lib:** Use the alias for library imports

## Quick Reference

| What             | Where                            | Import                                           |
| ---------------- | -------------------------------- | ------------------------------------------------ |
| Shared component | `src/lib/components/Name.svelte` | `import Name from '$lib/components/Name.svelte'` |
| Route page       | `src/routes/path/+page.svelte`   | N/A (file-based routing)                         |
| Shared type      | `src/lib/types/name.ts`          | `import type { Type } from '$lib/types/name'`    |
| Utility          | `src/lib/utils/name.ts`          | `import { fn } from '$lib/utils/name'`           |
| Static asset     | `static/file.ext`                | `/file.ext` (absolute URL)                       |
| Global CSS       | `src/routes/layout.css`          | Import in `+layout.svelte`                       |

## Examples

### Creating a New Feature

**Task:** Add a user profile page with a reusable avatar component

**Structure:**

```
src/
├── lib/
│   ├── components/
│   │   └── Avatar.svelte          # Reusable component
│   └── types/
│       └── user.ts                # User interface
└── routes/
    └── profile/
        ├── +page.svelte           # Profile page
        ├── +page.ts               # Load user data
        └── ProfileBio.svelte      # Route-specific component
```

**Why:**

- `Avatar.svelte` is reusable → goes in `$lib/components/`
- `User` type is shared → goes in `$lib/types/`
- `ProfileBio.svelte` is page-specific → stays in route directory
- `+page.svelte` and `+page.ts` follow SvelteKit conventions

---

This skill ensures consistent file organization and helps agents navigate the Butter project structure effectively.
