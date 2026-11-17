import { isForeignKeyViolation } from "./pg-errors";
import type { TaskFieldErrors, TaskFormValues } from "./task-schema";

export const ASSIGNEE_GONE_MESSAGE =
    "This user no longer exists. Pick another or leave it unassigned.";
export const SAVE_FAILED_MESSAGE = "Could not save the task. Try again.";

export type CreateTaskFailure = {
    status: 400 | 500;
    body: { errors: TaskFieldErrors; values: TaskFormValues; formError: string | null };
};

// Turns an error thrown while saving a task into the response shown to the user.
// The entered values are always kept, except that a deleted assignee is reset.
export function toCreateTaskFailure(error: unknown, values: TaskFormValues): CreateTaskFailure {
    if (isForeignKeyViolation(error)) {
        return {
            status: 400,
            body: {
                errors: { assigneeId: ASSIGNEE_GONE_MESSAGE },
                values: { ...values, assigneeId: "" },
                formError: null,
            },
        };
    }
    return { status: 500, body: { errors: {}, values, formError: SAVE_FAILED_MESSAGE } };
}
