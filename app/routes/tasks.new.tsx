import { useEffect } from "react";
import { Form, Link, data, redirect, useNavigation } from "react-router";

import { createTask, listUsers } from "../db/tasks.server";
import { toCreateTaskFailure } from "../lib/create-task-error";
import { DESCRIPTION_MAX, TITLE_MAX, parseTaskForm } from "../lib/task-schema";
import type { Route } from "./+types/tasks.new";

export function meta() {
    return [{ title: "New task" }];
}

export async function loader() {
    return { users: await listUsers() };
}

export async function action({ request }: Route.ActionArgs) {
    const parsed = parseTaskForm(await request.formData());
    if (!parsed.ok) {
        return data({ errors: parsed.errors, values: parsed.values, formError: null }, 400);
    }
    const { title, description, assigneeId } = parsed.data;
    const values = { title, description: description ?? "", assigneeId: assigneeId ?? "" };
    try {
        await createTask(parsed.data);
    } catch (error) {
        console.error("Failed to create task", error);
        const failure = toCreateTaskFailure(error, values);
        return data(failure.body, failure.status);
    }
    return redirect("/tasks");
}

const fieldClass =
    "mt-1 w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900";

export default function NewTask({ loaderData, actionData }: Route.ComponentProps) {
    const { users } = loaderData;
    const errors: Partial<Record<"title" | "description" | "assigneeId", string>> =
        actionData?.errors ?? {};
    const values = actionData?.values;
    const navigation = useNavigation();
    const submitting = navigation.state === "submitting";

    // After a failed submit, move focus to the first field with an error.
    useEffect(() => {
        const first = (["title", "description", "assigneeId"] as const).find(
            (name) => errors[name],
        );
        if (first) {
            document.getElementById(first)?.focus();
        }
        // Run only when a new action result arrives.
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [actionData]);

    return (
        <main className="mx-auto max-w-xl p-6">
            <h1 className="mb-6 text-2xl font-semibold">New task</h1>
            <Form method="post" className="space-y-4" noValidate>
                {actionData?.formError ? (
                    <p role="alert" className="rounded bg-red-50 p-3 text-red-700">
                        {actionData.formError}
                    </p>
                ) : null}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        maxLength={TITLE_MAX}
                        defaultValue={values?.title}
                        aria-invalid={errors.title ? true : undefined}
                        aria-describedby={errors.title ? "title-error" : undefined}
                        className={fieldClass}
                    />
                    {errors.title ? (
                        <p id="title-error" className="mt-1 text-sm text-red-600">
                            {errors.title}
                        </p>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        maxLength={DESCRIPTION_MAX}
                        defaultValue={values?.description}
                        aria-invalid={errors.description ? true : undefined}
                        aria-describedby={errors.description ? "description-error" : undefined}
                        className={fieldClass}
                    />
                    {errors.description ? (
                        <p id="description-error" className="mt-1 text-sm text-red-600">
                            {errors.description}
                        </p>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="assigneeId" className="block text-sm font-medium">
                        Assignee
                    </label>
                    <select
                        id="assigneeId"
                        name="assigneeId"
                        defaultValue={values?.assigneeId ?? ""}
                        aria-invalid={errors.assigneeId ? true : undefined}
                        aria-describedby={errors.assigneeId ? "assigneeId-error" : undefined}
                        className={fieldClass}
                    >
                        <option value="">Unassigned</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    {errors.assigneeId ? (
                        <p id="assigneeId-error" className="mt-1 text-sm text-red-600">
                            {errors.assigneeId}
                        </p>
                    ) : null}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {submitting ? "Creating…" : "Create task"}
                    </button>
                    <Link to="/tasks" className="text-sm text-blue-600 underline">
                        Cancel
                    </Link>
                </div>
            </Form>
        </main>
    );
}
