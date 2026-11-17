import { desc, eq } from "drizzle-orm";

import { db } from "./index.server";
import { tasks, users } from "./schema";

export async function listTasks() {
    return db
        .select({
            id: tasks.id,
            title: tasks.title,
            status: tasks.status,
            assigneeName: users.name,
        })
        .from(tasks)
        .leftJoin(users, eq(tasks.assigneeId, users.id))
        .orderBy(desc(tasks.createdAt));
}

export async function listUsers() {
    return db.select({ id: users.id, name: users.name }).from(users).orderBy(users.name);
}

export async function createTask(input: {
    title: string;
    description: string | null;
    assigneeId: string | null;
}) {
    const [task] = await db.insert(tasks).values(input).returning();
    return task;
}
