import { z } from "zod";

export const TITLE_MAX = 200;
export const DESCRIPTION_MAX = 5000;

export const taskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(TITLE_MAX, `Title must be at most ${TITLE_MAX} characters`),
    description: z
        .string()
        .trim()
        .max(DESCRIPTION_MAX, `Description must be at most ${DESCRIPTION_MAX} characters`)
        .transform((value) => (value === "" ? null : value)),
    assigneeId: z
        .string()
        .refine(
            (value) => value === "" || z.uuid().safeParse(value).success,
            "Pick a user from the list or leave it unassigned",
        )
        .transform((value) => (value === "" ? null : value)),
});

export type TaskFieldErrors = Partial<Record<"title" | "description" | "assigneeId", string>>;

export type TaskFormValues = { title: string; description: string; assigneeId: string };

export type ParsedTaskForm =
    | { ok: true; data: z.output<typeof taskSchema> }
    | { ok: false; errors: TaskFieldErrors; values: TaskFormValues };

function text(formData: FormData, name: string) {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
}

export function parseTaskForm(formData: FormData): ParsedTaskForm {
    const values: TaskFormValues = {
        title: text(formData, "title"),
        description: text(formData, "description"),
        assigneeId: text(formData, "assigneeId"),
    };
    const result = taskSchema.safeParse(values);
    if (result.success) {
        return { ok: true, data: result.data };
    }
    const errors: TaskFieldErrors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === "title" || field === "description" || field === "assigneeId") {
            errors[field] ??= issue.message;
        }
    }
    return { ok: false, errors, values };
}
