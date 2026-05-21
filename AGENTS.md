# Agent Instructions

## Project Description

This project is a static personal website built with Svelte. The site presents the brand and professional profile of **Butter 巴特**, a financial lecturer, professional trader, and music creator.

The website content is written in **Traditional Chinese** and should maintain a clear, professional, and personal tone. The design and implementation should support a static-site workflow, with emphasis on fast loading, clean structure, accessible markup, and maintainable Svelte components.

Primary content themes include:

- Financial education and lecture-related information
- Professional trading experience and market commentary
- Music creation, personal branding, and creative work
- Public-facing biographical and contact/promotion content

When modifying the project, preserve the Traditional Chinese language style, avoid unnecessary complexity, and keep the site optimized for static deployment.

## Tech Stack

- **Runtime:** Node.js 24
- **Framework:** Svelte 5 / SvelteKit
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS 4
- **Package Manager:** pnpm 10
- **Deployment**: Static site (via `@sveltejs/adapter-static`)

## Project Strcture

```text
project-root/
|-- src/
|   |-- app.html             # HTML template wrapper
|   |-- lib/                 # Shared library code
|   |   |-- components/      # Reusable Svelte components
|   |   |-- data/            # Content data
|   |   |-- types/           # Shared TypeScript type definitions
|   |   `-- utils/           # Utility functions
|   `-- routes/              # SvelteKit file-based routing
|       |-- +layout.svelte   # Root layout component
|       |-- +page.svelte     # Homepage
|       `-- layout.css       # Global styles
|-- static/                  # Static assets (served at /)
|-- package.json             # Dependencies and scripts
|-- svelte.config.js         # SvelteKit configuration
|-- vite.config.ts           # Vite configuration
|-- tsconfig.json            # TypeScript configuration
|-- eslint.config.js         # ESLint configuration
`-- AGENTS.md                # Agent behavior guidelines
```

## Development Workflow

### Keep Documentation Current

Whenever adding a new feature or modifying existing behavior, update the relevant documentation in the same change set.

Documentation updates may include, but are not limited to:

- README files
- API documentation
- package-level docs
- configuration notes
- usage examples
- architecture or implementation notes

Do not leave documentation stale after code changes.

### Commit Every Discrete Update

Use the `git-commit` skill after each discrete, self-contained update.

A discrete update should include related code, tests, configuration, and documentation changes that belong together logically.

### Validate Changes Before Commit

The following scripts must all pass before you commit changes:

```bash
pnpm format
pnpm lint
pnpm check
pnpm build
```
