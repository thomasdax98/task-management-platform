import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const taskStatus = pgEnum("task_status", ["todo", "in_progress", "done"]);

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const tasks = pgTable("tasks", {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    description: text().notNull().default(""),
    status: taskStatus().notNull().default("todo"),
    assigneeId: uuid().references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
