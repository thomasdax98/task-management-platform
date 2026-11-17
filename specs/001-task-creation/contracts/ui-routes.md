# UI Contracts: Task Creation

## GET /tasks

Shows every task, newest first. Each row shows title, status label and assignee name or
"Unassigned". Empty state: "No tasks yet" with a link to the form. Has a "New task" link.

## GET /tasks/new

Shows the form.

| Field       | Name          | Input                                                     | Required |
| ----------- | ------------- | --------------------------------------------------------- | -------- |
| Title       | `title`       | text, maxlength 200                                       | yes      |
| Description | `description` | textarea, maxlength 5000                                  | no       |
| Assignee    | `assigneeId`  | select: "Unassigned" (empty value) plus all users by name | no       |

The select is still shown, with only "Unassigned", when no users exist.

## POST /tasks/new

Form-encoded body with the fields above.

- **Success**: inserts a task with status `todo` and redirects (303) to `/tasks`.
- **Validation failure**: status 400, re-renders the form with the submitted values and
  `errors: { title?, description?, assigneeId? }`, each a message shown next to its field.
- **Assignee no longer exists**: status 400, `errors.assigneeId` = "This user no longer
  exists. Pick another or leave it unassigned."
- **Unexpected failure**: status 500, a form-level message "Could not save the task. Try
  again.", with the input kept.
