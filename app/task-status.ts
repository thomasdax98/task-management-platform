import { z } from "zod";

export const statuses = [
    { value: "todo", label: "To do", dot: "bg-status-todo" },
    { value: "in_progress", label: "In progress", dot: "bg-status-progress" },
    { value: "done", label: "Done", dot: "bg-status-done" },
] as const;

export type TaskStatus = (typeof statuses)[number]["value"];

export const moveTaskSchema = z.object({
    id: z.uuid(),
    status: z.enum(["todo", "in_progress", "done"]),
});
