import { expect, it } from "vitest";

import { SAVE_FAILED_MESSAGE, toCreateTaskFailure } from "./create-task-error";

const values = { title: "Write docs", description: "Details", assigneeId: "some-id" };

it("returns a 500 with a form-level message and keeps the input for an unexpected error", () => {
    const failure = toCreateTaskFailure(new Error("connection refused"), values);
    expect(failure.status).toBe(500);
    expect(failure.body).toEqual({ errors: {}, values, formError: SAVE_FAILED_MESSAGE });
});

it("returns a 400 on the assignee field and resets it when the user no longer exists", () => {
    const failure = toCreateTaskFailure(new Error("failed", { cause: { code: "23503" } }), values);
    expect(failure.status).toBe(400);
    expect(failure.body.errors.assigneeId).toContain("no longer exists");
    expect(failure.body.values).toEqual({ ...values, assigneeId: "" });
    expect(failure.body.formError).toBeNull();
});
