# Quickstart: Task Creation

## Prerequisites

```bash
npm install
cp .env.example .env
npm run db:up
npm run db:migrate
npm run db:seed
```

## Run

```bash
npm run dev
```

## Validate manually

1. Open `/tasks`. Seeded tasks are listed, or "No tasks yet".
2. Click "New task", enter a title and description, pick a user, and submit. You land on
   `/tasks` and the task is listed as "To Do" with that user. Reload: it is still there.
3. Create a task with a title only. It shows "Unassigned" and has no description.
4. Submit with an empty or whitespace title. The form shows "Title is required" and keeps your input.
5. Enter 201 characters in the title. A message states the 200 character limit.

## Automated

```bash
npm run test        # schema unit tests
npm run test:e2e    # create-task flow
npm run typecheck && npm run lint && npm run format
```
