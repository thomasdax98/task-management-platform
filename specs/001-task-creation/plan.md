# Implementation Plan: Task Creation

**Branch**: `001-task-creation` | **Date**: 2026-11-17 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-task-creation/spec.md`

## Summary

Add a create-task form (title, optional description, optional assignee) and a minimal read-only
task list. Tasks and users are stored in PostgreSQL through Drizzle with a versioned migration.
The form posts to a React Router action, which parses `FormData` with Zod and returns
field-level errors, or redirects to the list on success. A users table and seed script are
included because the assignee picker needs existing users.

## Technical Context

**Language/Version**: TypeScript, Node current LTS (>=24)

**Primary Dependencies**: React Router 8 (framework mode), Zod 4, Drizzle ORM, postgres.js, Tailwind CSS

**Storage**: PostgreSQL 18 (Docker Compose), versioned Drizzle migrations

**Testing**: Vitest (validation schema), Playwright (create flow)

**Target Platform**: Desktop browsers, Node server

**Project Type**: Single full-stack web app

**Performance Goals**: Create and list feel instant for a few hundred tasks (SC-001: under 30 s to create)

**Constraints**: No auth, no current user; no `drizzle-kit push`; no component library

**Scale/Scope**: Local MVP, one board, tens to hundreds of tasks and users

## Constitution Check

_GATE: passed before Phase 0 and re-checked after Phase 1._

| Principle                                       | Status            | Notes                                                                                                                                                                                     |
| ----------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I. MVP Scope Discipline                         | Pass              | Only create form and a minimal list (FR-010), added by clarification. No edit, delete, board or Users page. A seed script and users table are the minimum needed for the assignee picker. |
| II. Documentation Is the Source of Truth        | Pass, with action | `docs/mvp.md` and `docs/tech-stack.md` MUST be updated (task fields, list page, schema, seed script) as part of this feature.                                                             |
| III. Single Full-Stack TypeScript App           | Pass              | Zod parses `FormData` in the action; DB access only in `*.server.ts`.                                                                                                                     |
| IV. Database Integrity and Versioned Migrations | Pass              | Status enum, NOT NULL and length limits, `assignee_id` FK `ON DELETE SET NULL`, all in the migration.                                                                                     |
| V. Automated Quality Gates                      | Pass              | Vitest for the schema, Playwright for the flow, Lefthook unchanged.                                                                                                                       |

No violations, so Complexity Tracking is empty.

## Project Structure

### Documentation (this feature)

```text
specs/001-task-creation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-routes.md
└── tasks.md             # created by /speckit-tasks
```

### Source Code (repository root)

```text
app/
├── routes.ts                     # add /tasks and /tasks/new
├── routes/
│   ├── tasks.tsx                 # loader: list tasks with assignee; link to the form
│   └── tasks.new.tsx             # loader: users for the picker; action: validate and insert
├── db/
│   ├── schema.ts                 # users, tasks, task_status enum
│   ├── index.server.ts
│   ├── seed.ts                   # a few users and tasks (db:seed)
│   └── tasks.server.ts           # createTask, listTasks, listUsers
└── lib/
    ├── task-schema.ts            # Zod schema, shared by action and form
    └── task-schema.test.ts
drizzle/                          # generated migration
e2e/
└── create-task.spec.ts
```

**Structure Decision**: single package in the repo root, as defined in `docs/tech-stack.md`.
Routes stay thin, and database functions live in `app/db/tasks.server.ts`.

## Complexity Tracking

No violations.
