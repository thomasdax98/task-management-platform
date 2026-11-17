# Data Model: Task Creation

## users

| Column     | Type         | Rules                       |
| ---------- | ------------ | --------------------------- |
| id         | uuid         | primary key, default random |
| name       | varchar(100) | not null                    |
| email      | varchar(254) | not null, unique            |
| created_at | timestamptz  | not null, default now       |

## tasks

| Column      | Type               | Rules                                            |
| ----------- | ------------------ | ------------------------------------------------ |
| id          | uuid               | primary key, default random                      |
| title       | varchar(200)       | not null, CHECK `btrim(title) <> ''`             |
| description | varchar(5000)      | nullable                                         |
| status      | enum `task_status` | not null, default `todo`                         |
| assignee_id | uuid               | nullable, FK to `users.id`, `ON DELETE SET NULL` |
| created_at  | timestamptz        | not null, default now                            |

`task_status` values: `todo`, `in_progress`, `done`.

## Relationships and rules

- A user has many tasks. A task has at most one assignee.
- Deleting a user sets `assignee_id` to null, so the task shows as "Unassigned".
- This feature inserts tasks with status `todo` only. Status transitions belong to the board feature.
- The task list is sorted by `created_at` descending.

## Validation (Zod, mirrors the database)

- `title`: trimmed string, 1–200 chars.
- `description`: string, max 5,000 chars, empty becomes `null`.
- `assigneeId`: empty becomes `null`, otherwise a UUID.
