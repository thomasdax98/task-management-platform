import { Link } from "react-router";

import { listTasks } from "../db/tasks.server";
import type { Route } from "./+types/tasks";

export function meta() {
    return [{ title: "Tasks" }];
}

export async function loader() {
    return { tasks: await listTasks() };
}

const statusLabels = { todo: "To Do", in_progress: "In Progress", done: "Done" } as const;

export default function Tasks({ loaderData }: Route.ComponentProps) {
    const { tasks } = loaderData;
    return (
        <main className="mx-auto max-w-3xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Tasks</h1>
                <Link
                    to="/tasks/new"
                    className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    New task
                </Link>
            </div>
            {tasks.length === 0 ? (
                <p>
                    No tasks yet.{" "}
                    <Link to="/tasks/new" className="text-blue-600 underline">
                        Create the first one
                    </Link>
                    .
                </p>
            ) : (
                <ul className="divide-y divide-gray-200 rounded border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex items-center justify-between gap-4 p-3">
                            <span className="font-medium">{task.title}</span>
                            <span className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span>{statusLabels[task.status]}</span>
                                <span>{task.assigneeName ?? "Unassigned"}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
