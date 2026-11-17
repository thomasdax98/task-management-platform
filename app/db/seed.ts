import { eq } from "drizzle-orm";

import { env } from "../env.server";
import { db } from "./index.server";
import { tasks, users } from "./schema";

const seedUsers = [
    { name: "Ada Lovelace", email: "ada@example.com" },
    { name: "Grace Hopper", email: "grace@example.com" },
    { name: "Alan Turing", email: "alan@example.com" },
];

// Safe to re-run: users are matched by email, and tasks are only added when there are none.
await db.insert(users).values(seedUsers).onConflictDoNothing({ target: users.email });

const existing = await db.select({ id: tasks.id }).from(tasks).limit(1);
if (existing.length === 0) {
    const [ada] = await db.select().from(users).where(eq(users.email, "ada@example.com"));
    await db.insert(tasks).values([
        {
            title: "Set up the project",
            description: "Repo, tooling and database.",
            assigneeId: ada.id,
        },
        { title: "Write the first user story", description: null, assigneeId: null },
    ]);
}

console.log(`Seeded ${env.DATABASE_URL.split("@").pop()}`);
process.exit(0);
