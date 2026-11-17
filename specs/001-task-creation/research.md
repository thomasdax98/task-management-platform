# Research: Task Creation

No NEEDS CLARIFICATION items remained. These are the design decisions.

## Decisions

- **Task ID**: `uuid` primary key with `defaultRandom()`. Rationale: not user-visible in this
  feature, safe for later URLs, no sequence to manage. Alternatives: serial integer (guessable,
  but simpler); human keys like `TASK-12` (needs a counter, out of scope).
- **Status**: Postgres enum `task_status` (`todo`, `in_progress`, `done`), default `todo`.
  Per `docs/mvp.md`. Only `todo` is written by this feature.
- **Length limits in the database**: `varchar(200)` for title, `varchar(5000)` for description,
  plus a CHECK that the title is not blank. Rationale: Principle IV. Zod enforces the same
  limits to give field-level messages.
- **Validation**: one Zod schema in `app/lib/task-schema.ts`. Title is trimmed and 1–200 chars.
  An empty description becomes `null`. An empty assignee value becomes `null`; otherwise it
  must be a UUID.
- **Duplicate submit (FR-008)**: redirect after a successful POST (post/redirect/get), and
  disable the submit button while the navigation is in flight. No idempotency key, because
  that would be over-engineering for the MVP.
- **Assignee deleted between load and submit**: the insert fails with Postgres error `23503`
  (foreign key violation). The action catches it and returns a field error on the assignee
  field.
- **Other save failures (FR-009)**: the action catches unexpected errors, returns a
  form-level error and keeps the input. A single `INSERT` is atomic, so there is no partial task.
- **Form and list routes**: `/tasks` lists tasks (newest first), `/tasks/new` holds the form.
  The home page is left alone until the board feature.
- **Users for the picker**: the `users` table is created here (name, email). Users are
  filled by the seed script, because the Users page is a separate feature.
- **Seed**: `app/db/seed.ts` and the `db:seed` npm script, as planned in `docs/tech-stack.md`.
  It deletes nothing and is safe to run on an empty database.
- **Tests**: Vitest covers the Zod schema (trim, limits, empty values). Playwright covers
  create with and without assignee and the validation error.
