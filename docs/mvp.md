# MVP

The first milestone is a rough MVP that covers three things:

1. **Create tasks.** A user can create a task with at least a title and a description.
2. **Assign tasks to a user.** A task has one assignee, which can be changed.
3. **Organize tasks in a kanban board.** Tasks appear as cards in columns (for example "To Do", "In Progress", "Done"). Moving a card to another column changes the task's status.

## In scope

- Task: create, view, edit, delete
- Assignee: a task has at most one assignee. `assignee_id` is nullable with `ON DELETE SET NULL`, so deleting a user unassigns their tasks, which then show as "Unassigned". Tasks can also be created without an assignee.
- Users: plain records (for example name and email), created on a simple "Users" page or by a seed script, used only to pick an assignee. There is no authentication and no "current user".
- Task list: a minimal read-only page at `/tasks` shows every task with its title, status and assignee, newest first. The task form is at `/tasks/new`. The list is a stand-in so created tasks can be seen until the board exists, and the board replaces it.
- Board: one kanban board with three fixed status columns: To Do, In Progress and Done. The status is a Postgres enum (`todo`, `in_progress`, `done`) on the task, and new tasks start as `todo`. Tasks move between columns by drag and drop (`dnd-kit`), and dropping a card saves the task's new status. Cards inside a column are sorted by creation time, with no manual ordering and no position column.

## Task fields

- `title`: required, trimmed, 1 to 200 characters.
- `description`: optional, up to 5,000 characters. An empty description is stored as `null`.
- `assignee_id`: optional, see above.
- `status`: see above. New tasks start as `todo`.
- `id`: a uuid. It is not shown to users.
- `created_at`: set on insert.

Details are in [specs/001-task-creation/data-model.md](../specs/001-task-creation/data-model.md).

## Out of scope (possible later)

- Multiple projects or boards
- Custom workflows and columns
- Manual ordering of cards inside a column
- Comments, attachments, labels, priorities, due dates
- Sprints, backlog, epics, reporting
- Notifications, search, permissions and roles
