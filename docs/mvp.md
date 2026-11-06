# MVP

The first milestone is a rough MVP that covers three things:

1. **Create tasks.** A user can create a task with at least a title and a description.
2. **Assign tasks to a user.** A task has one assignee, which can be changed.
3. **Organize tasks in a kanban board.** Tasks appear as cards in columns (for example "To Do", "In Progress", "Done"). Moving a card to another column changes the task's status.

## In scope

- Task: create, view, edit, delete
- Assignee: a task has at most one assignee. `assignee_id` is nullable with `ON DELETE SET NULL`, so deleting a user unassigns their tasks, which then show as "Unassigned". Tasks can also be created without an assignee.
- Users: plain records (for example name and email), created on a simple "Users" page or by a seed script, used only to pick an assignee. There is no authentication and no "current user".
- Board: one kanban board with three fixed status columns: To Do, In Progress and Done. The status is a Postgres enum (`todo`, `in_progress`, `done`) on the task, and new tasks start as `todo`. Tasks move between columns by drag and drop (`dnd-kit`), and dropping a card saves the task's new status. Cards inside a column are sorted by creation time, with no manual ordering and no position column.

## Open decisions

- Limits on task fields (for example maximum title length) are not defined yet.

## Decided: first schema and board

- Tables: `users` (`id` uuid, `name`, `email` unique, `created_at`) and `tasks` (`id` uuid, `title`, `description` default empty, `status` enum default `todo`, nullable `assignee_id`, `created_at`).
- The homepage (`/`) is the board: three columns, cards sorted by creation time, drag and drop with `@dnd-kit/core`. A drop posts `intent=move`, `id` and `status` to the route action (validated with Zod), and the UI updates optimistically.
- The card shows title, a two-line description preview and the assignee (initials avatar and name, or "Unassigned"). The whole card is the drag handle, and it can also be moved with the keyboard (focus it, press Space, use the arrow keys).
- `DESIGN.md` describes four statuses (with "In review"). The MVP keeps three, so the review column and the tags, priorities and subtasks on its cards are not built.
- Creating, editing and deleting tasks and the Users page are not built yet. Run `npm run db:seed` to get sample data (it replaces all users and tasks).

## Out of scope (possible later)

- Multiple projects or boards
- Custom workflows and columns
- Manual ordering of cards inside a column
- Comments, attachments, labels, priorities, due dates
- Sprints, backlog, epics, reporting
- Notifications, search, permissions and roles
