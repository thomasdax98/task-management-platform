import { expect, it } from "vitest";

import { isForeignKeyViolation } from "./pg-errors";

it("detects a foreign key violation, also when wrapped in cause", () => {
    expect(isForeignKeyViolation({ code: "23503" })).toBe(true);
    expect(isForeignKeyViolation(new Error("failed", { cause: { code: "23503" } }))).toBe(true);
});

it("ignores other errors", () => {
    expect(isForeignKeyViolation({ code: "23505" })).toBe(false);
    expect(isForeignKeyViolation(new Error("boom"))).toBe(false);
    expect(isForeignKeyViolation(undefined)).toBe(false);
});
