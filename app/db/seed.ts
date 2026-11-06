import { db } from "./index.server";
import { tasks, users } from "./schema";

await db.delete(tasks);
await db.delete(users);

const [ada, grace, linus] = await db
    .insert(users)
    .values([
        { name: "Ada Lovelace", email: "ada@example.com" },
        { name: "Grace Hopper", email: "grace@example.com" },
        { name: "Linus Torvalds", email: "linus@example.com" },
    ])
    .returning();

await db.insert(tasks).values([
    {
        title: "Design homepage hero section",
        description: "Sketch the layout.",
        assigneeId: ada.id,
    },
    { title: "Write onboarding copy", description: "Short and plain.", assigneeId: grace.id },
    { title: "Set up error tracking", description: "" },
    {
        title: "Build the kanban board",
        description: "Three columns with drag and drop.",
        status: "in_progress",
        assigneeId: linus.id,
    },
    {
        title: "Create the database schema",
        description: "Users and tasks.",
        status: "done",
        assigneeId: ada.id,
    },
]);

console.log("Seeded 3 users and 5 tasks.");
process.exit(0);
