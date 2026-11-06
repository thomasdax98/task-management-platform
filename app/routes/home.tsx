import { asc, eq } from "drizzle-orm";

import type { Route } from "./+types/home";
import { Board } from "../components/board";
import { db } from "../db/index.server";
import { tasks, users } from "../db/schema";
import { moveTaskSchema } from "../task-status";

export function meta() {
    return [
        { title: "Board · Tasklane" },
        { name: "description", content: "Kanban board for your tasks." },
    ];
}

export async function loader() {
    const rows = await db
        .select({
            id: tasks.id,
            title: tasks.title,
            description: tasks.description,
            status: tasks.status,
            assigneeName: users.name,
        })
        .from(tasks)
        .leftJoin(users, eq(tasks.assigneeId, users.id))
        .orderBy(asc(tasks.createdAt));
    return { tasks: rows };
}

export async function action({ request }: Route.ActionArgs) {
    const parsed = moveTaskSchema.safeParse(Object.fromEntries(await request.formData()));
    if (!parsed.success) {
        throw new Response("Invalid task move", { status: 400 });
    }
    await db.update(tasks).set({ status: parsed.data.status }).where(eq(tasks.id, parsed.data.id));
    return null;
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <main className="min-h-screen bg-background px-8 py-8 font-sans text-body text-ink">
            <h1 className="mb-6 text-page-title font-page-title leading-page-title tracking-page-title">
                Board
            </h1>
            <Board tasks={loaderData.tasks} />
        </main>
    );
}
