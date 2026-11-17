# Feature Specification: Task Creation

**Feature Branch**: `001-task-creation`

**Created**: 2026-11-17

**Status**: Draft

**Input**: User description: "Task creation"

## Clarifications

### Session 2026-11-17

- Q: Since the kanban board is a separate feature, where should a newly created task be visible when this feature ships on its own? → A: A minimal task list page showing all tasks with status and assignee; the board replaces it later.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Create a task with a title and description (Priority: P1)

A user opens a form, enters a title and a description for a piece of work, and submits it. The new
task is saved and shown in the task list with the status "To Do".

**Why this priority**: Creating tasks is the foundation of the product. Assignment and the board
have nothing to show without it.

**Independent Test**: Fill in the form with a title and description, submit it, and confirm the
task is visible in the task list with the status "To Do" and still there after reloading the page.

**Acceptance Scenarios**:

1. **Given** the create-task form is open, **When** the user enters a title and a description and
   submits, **Then** the task is saved, appears in the task list with the status "To Do" and persists after a reload.
2. **Given** the create-task form is open, **When** the user enters only a title and submits,
   **Then** the task is saved with an empty description.
3. **Given** the create-task form is open, **When** the user submits with an empty or
   whitespace-only title, **Then** no task is created and a message next to the title field says
   the title is required, with the user's other input kept.

---

### User Story 2 - Optionally assign the task while creating it (Priority: P2)

While creating a task, the user can pick one of the existing users as its assignee, or leave the
task unassigned.

**Why this priority**: It saves a second step for the common case, but a task is useful without
an assignee.

**Independent Test**: Create a task choosing a user and confirm the list entry shows that user. Create
another without choosing and confirm it shows "Unassigned".

**Acceptance Scenarios**:

1. **Given** at least one user exists, **When** the user picks that user as assignee and submits,
   **Then** the task is saved with that assignee.
2. **Given** the form is open, **When** the user leaves the assignee empty and submits, **Then**
   the task is saved and shows as "Unassigned".
3. **Given** no users exist, **When** the user opens the form, **Then** the form still works and
   the task can be created unassigned.

---

### Edge Cases

- Title or description exceeds the maximum length: the task is not created and a field-level
  message states the limit.
- Title has leading or trailing spaces: they are trimmed before saving.
- The user double-clicks submit: only one task is created.
- The chosen assignee is deleted between opening the form and submitting: the task is not lost,
  and the user sees a message to pick another assignee or leave it unassigned.
- Saving fails (for example the database is unavailable): the user sees a clear error and the
  entered input is kept.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Users MUST be able to create a task by submitting a form with a title and a
  description.
- **FR-002**: The title MUST be required, trimmed, and between 1 and 200 characters.
- **FR-003**: The description MUST be optional, with a maximum of 5,000 characters.
- **FR-004**: Users MUST be able to optionally choose one existing user as the task's assignee.
- **FR-005**: A new task MUST start with the status "To Do".
- **FR-006**: A newly created task MUST appear in the task list without the user having to do
  anything else, and MUST persist across page reloads.
- **FR-010**: The system MUST provide a minimal task list page showing every task's title,
  status and assignee (or "Unassigned"). The kanban board feature replaces this page later.
- **FR-007**: Invalid input MUST be rejected with field-level messages shown next to the
  offending field, and the user's input MUST be kept.
- **FR-008**: Submitting the form more than once for the same action MUST NOT create duplicate
  tasks.
- **FR-009**: A failed save MUST show an understandable error and MUST NOT create a partial task.

### Key Entities _(include if feature involves data)_

- **Task**: A unit of work. Has a title (required), a description (optional), a status
  (starts as "To Do"), an optional assignee and a creation time.
- **User**: A person who can be chosen as assignee. A plain record (name, email) with no login.
  A task has at most one assignee, and a user can be assigned many tasks.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A user can create a task with a title and description in under 30 seconds from
  opening the form.
- **SC-002**: 100% of valid submissions result in exactly one persisted task visible in the task list
  with the status "To Do" after a reload.
- **SC-003**: 100% of invalid submissions are rejected with a message identifying the field and
  the problem.
- **SC-004**: At least 90% of first-time users can create a task without help.

## Assumptions

- There is no authentication and no "current user", so the creator is not recorded
  (per `docs/mvp.md`).
- The exact task fields were an open decision in `docs/mvp.md`. This spec fixes them as: title
  (required, max 200), description (optional, max 5,000), optional assignee. The decision MUST be
  recorded in `docs/mvp.md`.
- Task ID format is not user-visible in this feature and is left to planning.
- Users are created elsewhere (the Users page or the seed script), not by this feature.
- Viewing, editing, deleting, reassigning and moving tasks between columns are separate
  features. This feature only provides the create form and a minimal task list so created tasks can be seen.
  The list is read-only and has no ordering, filtering or paging requirements.
- The kanban board is a separate feature that will replace the task list.
- Desktop browsers are the target. Mobile layout is out of scope for the MVP.
