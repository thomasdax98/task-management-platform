# Task Management Platform Constitution

## Core Principles

### I. MVP Scope Discipline

Work MUST stay within the scope in `docs/mvp.md`: create tasks, assign them to a user, and
organize them on a kanban board. Items listed under "Out of scope" (multiple boards, custom
workflows, manual card ordering, comments, labels, auth, search and so on) MUST NOT be built
unless the scope document is amended first. Prefer the simplest design that satisfies the
documented requirements.

Rationale: this is a rough MVP. Unplanned scope growth is the main risk to delivering it.

### II. Documentation Is the Source of Truth

Every decision, scope change, requirement or convention agreed in conversation MUST be written
to `docs/` as soon as it is agreed. `AGENTS.md` MUST stay short and link to `docs/` for details.
Code MUST NOT contradict `docs/`; if reality changes, the docs MUST be updated in the same
change.

Rationale: agreements that live only in chat are lost and cannot be reviewed.

### III. Single Full-Stack TypeScript App

The product is one TypeScript package built on React Router (framework mode), with no separate
frontend and backend projects. Server-only code MUST live in `*.server.ts` modules. All input
from forms MUST be parsed with Zod schemas in actions, and validation failures MUST be returned
as field-level messages. Environment variables MUST be read through the Zod-validated config
module, which fails at startup when a value is missing.

Rationale: one package with validated boundaries keeps the MVP small and its failures early.

### IV. Database Integrity and Versioned Migrations

PostgreSQL is the system of record, accessed through Drizzle and the `postgres` driver. Schema
changes MUST be made by changing the Drizzle schema, running `drizzle-kit generate`, committing
the SQL migration and applying it with `drizzle-kit migrate`; `drizzle-kit push` MUST NOT be
used. Integrity rules (for example the status enum, and the nullable `assignee_id` with
`ON DELETE SET NULL`) MUST be enforced in the database, not only in application code.

Rationale: reviewable, reproducible migrations and database-level constraints prevent drift
between environments and invalid data.

### V. Automated Quality Gates

Code MUST pass formatting (oxfmt), linting (oxlint) and type checking (`tsc`) before commit,
enforced by the Lefthook pre-commit hook; the hook MUST NOT be bypassed. Behavior changes MUST be
covered by Vitest unit tests, and user-visible flows (creating a task, assigning it, moving a
card) MUST be covered by Playwright E2E tests in `e2e/`. Tooling choices in `docs/tech-stack.md`
(npm, oxlint, oxfmt, Drizzle, Tailwind without a component library) MUST NOT be swapped for
alternatives without amending that document.

Rationale: fast automated checks keep quality consistent without CI, which is not yet set up.

## Technology & Data Constraints

- The stack and tooling are defined in `docs/tech-stack.md`, which is authoritative for versions
  and tool choices.
- The app MUST run locally with Docker Compose Postgres, using throwaway local credentials only.
  Real secrets MUST NOT be committed; `.env` stays gitignored and `.env.example` is committed.
- Shared AI tooling config is committed; per-machine files such as
  `.claude/settings.local.json` MUST be gitignored.
- The MVP has no authentication and no "current user". Introducing either requires a scope
  amendment under Principle I.

## Development Workflow & Quality Gates

- Features follow the Spec Kit flow: specify, plan, tasks, implement. Plans MUST be checked
  against this constitution before design work and again after.
- Commits MUST be small and focused, and MUST leave format, lint and typecheck passing.
- Before a change is considered done, `npm run test` and, for UI or flow changes,
  `npm run test:e2e` MUST pass.
- Any deviation from a principle MUST be justified in writing in the plan or pull request.

## Governance

This constitution supersedes other practices where they conflict. Amendments MUST be made by
editing this file with a rationale, updating any affected documents in `docs/`, and bumping the
version using semantic versioning: MAJOR for removing or redefining a principle in a backward
incompatible way, MINOR for adding a principle or section or materially expanding guidance, PATCH
for clarifications and wording. Every plan and review MUST verify compliance with these
principles, and complexity beyond the MVP scope MUST be justified. Runtime development guidance
lives in `AGENTS.md` and `docs/`.

**Version**: 1.0.0 | **Ratified**: 2026-11-17 | **Last Amended**: 2026-11-17
