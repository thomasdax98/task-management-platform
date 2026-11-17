import { sql } from "drizzle-orm";
import { check, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const taskStatus = pgEnum("task_status", ["todo", "in_progress", "done"]);

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 254 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const tasks = pgTable(
    "tasks",
    {
        id: uuid().primaryKey().defaultRandom(),
        title: varchar({ length: 200 }).notNull(),
        description: varchar({ length: 5000 }),
        status: taskStatus().notNull().default("todo"),
        assigneeId: uuid("assignee_id").references(() => users.id, { onDelete: "set null" }),
        createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => [check("tasks_title_not_blank", sql`btrim(${table.title}) <> ''`)],
);
