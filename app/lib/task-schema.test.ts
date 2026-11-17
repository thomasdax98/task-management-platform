import { describe, expect, it } from "vitest";

import { parseTaskForm } from "./task-schema";

function form(fields: Record<string, string>) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
        formData.set(key, value);
    }
    return formData;
}

const uuid = "3f6c1d1e-8a3b-4c52-9d0e-6b1f2a7c9e10";

describe("parseTaskForm", () => {
    it("trims the title", () => {
        const result = parseTaskForm(
            form({ title: "  Write docs  ", description: "", assigneeId: "" }),
        );
        expect(result).toMatchObject({ ok: true, data: { title: "Write docs" } });
    });

    it("rejects a blank title", () => {
        const result = parseTaskForm(form({ title: "   ", description: "", assigneeId: "" }));
        expect(result).toMatchObject({ ok: false, errors: { title: "Title is required" } });
    });

    it("accepts 200 and rejects 201 title characters", () => {
        const ok = parseTaskForm(form({ title: "a".repeat(200), description: "", assigneeId: "" }));
        const bad = parseTaskForm(
            form({ title: "a".repeat(201), description: "", assigneeId: "" }),
        );
        expect(ok.ok).toBe(true);
        expect(bad).toMatchObject({ ok: false, errors: { title: expect.stringContaining("200") } });
    });

    it("turns an empty description into null", () => {
        const result = parseTaskForm(form({ title: "A", description: "  ", assigneeId: "" }));
        expect(result).toMatchObject({ ok: true, data: { description: null } });
    });

    it("accepts 5000 and rejects 5001 description characters", () => {
        const ok = parseTaskForm(
            form({ title: "A", description: "a".repeat(5000), assigneeId: "" }),
        );
        const bad = parseTaskForm(
            form({ title: "A", description: "a".repeat(5001), assigneeId: "" }),
        );
        expect(ok.ok).toBe(true);
        expect(bad).toMatchObject({
            ok: false,
            errors: { description: expect.stringContaining("5000") },
        });
    });

    it("turns an empty assignee into null", () => {
        const result = parseTaskForm(form({ title: "A", description: "", assigneeId: "" }));
        expect(result).toMatchObject({ ok: true, data: { assigneeId: null } });
    });

    it("passes a valid assignee id through", () => {
        const result = parseTaskForm(form({ title: "A", description: "", assigneeId: uuid }));
        expect(result).toMatchObject({ ok: true, data: { assigneeId: uuid } });
    });

    it("rejects an assignee that is not a uuid", () => {
        const result = parseTaskForm(form({ title: "A", description: "", assigneeId: "nope" }));
        expect(result).toMatchObject({ ok: false, errors: { assigneeId: expect.any(String) } });
    });

    it("keeps the submitted values when invalid", () => {
        const result = parseTaskForm(form({ title: "", description: "Keep me", assigneeId: uuid }));
        expect(result).toMatchObject({
            ok: false,
            values: { description: "Keep me", assigneeId: uuid },
        });
    });
});
