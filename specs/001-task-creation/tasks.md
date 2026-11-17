---
description: "Task list for Task Creation"
---

# Tasks: Task Creation

**Input**: Design documents from `/specs/001-task-creation/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-routes.md, quickstart.md

**Tests**: Included. Constitution Principle V requires Vitest for behavior and Playwright for user-visible flows.

**Organization**: Tasks are grouped by user story. The project is already scaffolded (React Router, Drizzle, Zod, Vitest, Playwright, Lefthook), so there is no scaffolding phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story the task belongs to (US1, US2)

## Phase 1: Setup

**Purpose**: Documentation that MUST be agreed before building (Constitution Principle II)

- [x] T001 [P] Update `docs/mvp.md`: replace the "Open decisions" entry with the task fields (title required, trimmed, 1–200 chars; description optional, max 5,000; optional assignee; uuid ID), and add the minimal read-only task list page (`/tasks`) to "In scope" as a stand-in until the board exists
- [x] T002 [P] Update `docs/tech-stack.md`: add `db:seed` usage, the `app/db/tasks.server.ts` data-access module and the `app/lib/` folder for shared Zod schemas

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database schema, data access and routing that both user stories need

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Define the schema in `app/db/schema.ts`: `taskStatus` pgEnum `task_status` with values `todo`, `in_progress`, `done`; `users` table (`id` uuid pk defaultRandom, `name` varchar(100) not null, `email` varchar(254) not null unique, `created_at` timestamptz not null default now); `tasks` table (`id` uuid pk defaultRandom, `title` varchar(200) not null with CHECK `btrim(title) <> ''`, `description` varchar(5000) nullable, `status` task_status not null default `todo`, `assignee_id` uuid nullable references `users.id` ON DELETE SET NULL, `created_at` timestamptz not null default now)
- [x] T004 Generate the migration with `npm run db:generate`, review the SQL in `drizzle/` against the constraints in T003, and apply it with `npm run db:migrate` (never `drizzle-kit push`)
- [x] T005 Create `app/db/tasks.server.ts` with `listTasks()` (tasks left-joined with the assignee's name, ordered by `created_at` descending), `listUsers()` (ordered by name) and `createTask({ title, description, assigneeId })` (inserts with status `todo`, returns the new task)
- [x] T006 [P] Create `app/db/seed.ts` and add the `db:seed` script to `package.json`: insert a few users and tasks (some unassigned), skipping rows that already exist by email so the script is safe to re-run
- [x] T007 [P] Register the routes in `app/routes.ts`: `route("tasks", "routes/tasks.tsx")` and `route("tasks/new", "routes/tasks.new.tsx")`

**Checkpoint**: Schema is migrated, seed data loads, and routes are registered. User stories can start.

---

## Phase 3: User Story 1 - Create a task with a title and description (Priority: P1) 🎯 MVP

**Goal**: A user fills in a title and optional description, submits, and sees the task in the list as "To Do".

**Independent Test**: Open `/tasks/new`, submit a title and description, land on `/tasks`, see the task with status "To Do" and "Unassigned", reload and see it still there. Submit a blank title and see "Title is required" with the input kept.

### Tests for User Story 1

- [x] T008 [P] [US1] Write Vitest tests in `app/lib/task-schema.test.ts` for the task schema: title is trimmed, blank title fails, 200 chars passes and 201 fails, empty description becomes `null`, 5,000 chars passes and 5,001 fails, empty `assigneeId` becomes `null`, non-UUID `assigneeId` fails
- [x] T009 [P] [US1] Write the Playwright test in `e2e/create-task.spec.ts`: create a task with title and description and see it in the list as "To Do" and "Unassigned" after a reload; blank title shows "Title is required" and keeps the other input; a 201 character title shows the 200 character limit message

### Implementation for User Story 1

- [x] T010 [US1] Create the Zod schema in `app/lib/task-schema.ts`: `title` trimmed string, min 1 ("Title is required"), max 200; `description` string, max 5000, empty string becomes `null`; `assigneeId` empty string becomes `null`, otherwise `z.uuid()`. Export a helper that maps Zod issues to `{ title?, description?, assigneeId? }` field messages
- [x] T011 [US1] Create `app/routes/tasks.new.tsx`: the form with `title` (text, maxlength 200), `description` (textarea, maxlength 5000), and the submit button disabled while the navigation is submitting (FR-008). The action parses `FormData` with the T010 schema; on invalid input it returns 400 with `errors` and the submitted values, on success it calls `createTask` and redirects 303 to `/tasks`; unexpected errors are caught and return 500 with the form-level message "Could not save the task. Try again." and the input kept (FR-009). Show each error next to its field, styled with Tailwind
- [x] T012 [US1] Create `app/routes/tasks.tsx`: the loader calls `listTasks()`; render each task's title, a status label ("To Do", "In Progress", "Done") and the assignee name or "Unassigned", with a "New task" link to `/tasks/new` and an empty state "No tasks yet" linking to the form
- [x] T013 [US1] Run `npm run test`, `npm run test:e2e` and the Playwright steps in `quickstart.md` (steps 1, 3, 4, 5) to confirm User Story 1 works on its own

**Checkpoint**: User Story 1 is fully functional and testable. This is the MVP.

---

## Phase 4: User Story 2 - Optionally assign the task while creating it (Priority: P2)

**Goal**: The form offers a user picker so a task can be assigned at creation, or left unassigned.

**Independent Test**: Create a task choosing a seeded user and see that user's name in the list. Create one without choosing and see "Unassigned". With no users in the database, the form still works.

### Tests for User Story 2

- [x] T014 [P] [US2] Extend `e2e/create-task.spec.ts`: create a task choosing a seeded user and see that name in the list; create one leaving "Unassigned" selected and see "Unassigned"
- [x] T015 [P] [US2] Extend `app/lib/task-schema.test.ts` with an `assigneeId` case: a valid UUID is accepted and passed through

### Implementation for User Story 2

- [x] T016 [US2] In `app/routes/tasks.new.tsx`, add a loader that calls `listUsers()` and an `assigneeId` select with an "Unassigned" option (empty value) first and then every user by name; the select still renders with only "Unassigned" when there are no users. Pass `assigneeId` from the action into `createTask`
- [x] T017 [US2] In `app/routes/tasks.new.tsx`, handle a deleted assignee: catch the Postgres foreign key violation (code `23503`) from `createTask` and return 400 with `errors.assigneeId` = "This user no longer exists. Pick another or leave it unassigned.", keeping the other input and reloading the user list
- [x] T018 [US2] Run `npm run test`, `npm run test:e2e` and the `quickstart.md` steps 2 and 3 to confirm User Story 2

**Checkpoint**: Both user stories work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T019 [P] Check keyboard use and labels on the form in `app/routes/tasks.new.tsx`: every field has a visible `<label>`, errors are linked with `aria-describedby`, and focus moves to the first invalid field after a failed submit
- [x] T020 Run `npm run typecheck`, `npm run lint` and `npm run format`, fix any findings, and run the full `quickstart.md` from a fresh database (`docker compose down -v`, `npm run db:up`, `npm run db:migrate`, `npm run db:seed`)
- [x] T021 Confirm `docs/mvp.md` and `docs/tech-stack.md` still match what was built, and update them if the implementation differed

---

## Dependencies & Execution Order

- **Phase 1** has no dependencies. **Phase 2** can start in parallel with it, but T001 should be done before the field limits are built on.
- **Phase 2** blocks all user stories. Order: T003 → T004 → T005; T006 and T007 can run once T004 is done.
- **US1** (Phase 3) depends on Phase 2. **US2** (Phase 4) depends on US1, because it extends the same form route and list.
- **Polish** depends on both stories.

Within US1: T008 and T009 first (they should fail), then T010 → T011 → T012 → T013.

## Parallel Opportunities

- T001 and T002 (different docs)
- T006 and T007 (different files, after T004)
- T008 and T009 (different test files)
- T014 and T015 (different test files)

## Implementation Strategy

**MVP first**: complete Phase 1 → Phase 2 → Phase 3 and stop. Users can create tasks with a title and description and see them in a list. Then add the assignee picker (Phase 4) and finish with Phase 5.
