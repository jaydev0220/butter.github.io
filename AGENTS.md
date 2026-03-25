# AGENTS.md

## Tech Stack

- **Runtime:** Node.js 24+
- **Framework:** Svelte 5 / SvelteKit
- **Language:** TypeScript 5.9+
- **Styling:** Tailwind CSS 4+
- **Package Manager:** pnpm 10+
- **Deployment**: Static site (via `@sveltejs/adapter-static`)

## Agent Rules

### No Fabrication

- Verify API signatures, props, types by reading source first
- State explicitly when files/functions don't exist yet
- Consult `svelte-code-writer` skill for Svelte 5 syntax; don't guess

### Minimal Changes

- Write minimum code to satisfy the requirement
- Touch only files in scope
- Comments explain _why_, not _what_
- One logical change per commit (use `git-commit` skill)

### Objectivity

- Evaluate solutions against actual constraints, not trends
- Present trade-offs when multiple valid approaches exist
- Don't change working code for style preference

### Type Safety

- No `any`, `@ts-ignore`, or unsafe casts without documented reason
- Every function has an explicit return type
- Shared types in `src/lib/types/`

### Documentation Updates

- Modify README.md immediately when altering setup instructions, dependencies, or core features
- Ensure documentation strictly reflects the newly written code; do not document planned features
- Keep updates concise and relevant to the scope of the current commit

## Code Quality

- **KISS:** Simplest solution that works; no premature optimization
- **DRY:** Extract common logic; no copy-paste
- **YAGNI:** Don't build features before needed
- **Immutability:** Use spread operators; avoid direct mutation
- **Early returns:** Flatten nested conditionals
- **Named constants:** No magic numbers

## Project Conventions

### Tailwind CSS 4

- Use theme tokens from `./src/routes/layout.css`
- No arbitrary color values for existing tokens
- Mobile-first: base → `sm:` → `md:` → `lg:`

### Validation

- `pnpm lint` and `pnpm check` must pass before commit
- No `console.log` or commented-out code in commits
