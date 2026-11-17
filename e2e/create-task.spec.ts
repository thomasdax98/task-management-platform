import { expect, test } from "@playwright/test";

// These tests use the local database (see docs/tech-stack.md): run db:up, db:migrate and
// db:seed first. Each test uses a unique title so repeated runs do not interfere.
const unique = (label: string) =>
    `${label} ${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

test("creates a task with title and description", async ({ page }) => {
    const title = unique("With description");
    await page.goto("/tasks/new");
    await page.getByLabel("Title").fill(title);
    await page.getByLabel("Description").fill("Some details");
    await page.getByRole("button", { name: "Create task" }).click();

    await expect(page).toHaveURL(/\/tasks$/);
    await page.reload();
    const row = page.getByRole("listitem").filter({ hasText: title });
    await expect(row).toContainText("To Do");
    await expect(row).toContainText("Unassigned");
});

test("shows an error for a blank title and keeps the other input", async ({ page }) => {
    await page.goto("/tasks/new");
    await page.getByLabel("Title").fill("   ");
    await page.getByLabel("Description").fill("Keep me");
    await page.getByRole("button", { name: "Create task" }).click();

    await expect(page.getByText("Title is required")).toBeVisible();
    await expect(page.getByLabel("Description")).toHaveValue("Keep me");
    await expect(page).toHaveURL(/\/tasks\/new$/);
});

test("rejects a title over 200 characters", async ({ page }) => {
    await page.goto("/tasks/new");
    // The input has maxlength 200, so set the value directly to bypass it.
    await page.getByLabel("Title").evaluate((el: HTMLInputElement) => {
        el.removeAttribute("maxlength");
        el.value = "a".repeat(201);
    });
    await page.getByRole("button", { name: "Create task" }).click();
    await expect(page.getByText("Title must be at most 200 characters")).toBeVisible();
});

test("assigns the task to a user when creating it", async ({ page }) => {
    const title = unique("Assigned");
    await page.goto("/tasks/new");
    await page.getByLabel("Title").fill(title);
    await page.getByLabel("Assignee").selectOption({ label: "Grace Hopper" });
    await page.getByRole("button", { name: "Create task" }).click();

    await expect(page).toHaveURL(/\/tasks$/);
    await expect(page.getByRole("listitem").filter({ hasText: title })).toContainText(
        "Grace Hopper",
    );
});

test("leaves the task unassigned when no user is chosen", async ({ page }) => {
    const title = unique("Unassigned");
    await page.goto("/tasks/new");
    await page.getByLabel("Title").fill(title);
    await page.getByRole("button", { name: "Create task" }).click();

    await expect(page.getByRole("listitem").filter({ hasText: title })).toContainText("Unassigned");
});

test("creates only one task when the submit button is clicked twice", async ({ page }) => {
    await page.route("**/tasks/new*", async (route) => {
        if (route.request().method() === "POST") {
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        await route.continue();
    });
    const title = unique("Double click");
    await page.goto("/tasks/new");
    await page.getByLabel("Title").fill(title);
    const button = page.getByRole("button", { name: "Create task" });
    await button.dblclick();
    await expect(page.getByRole("button", { name: "Creating…" })).toBeDisabled();

    await expect(page).toHaveURL(/\/tasks$/);
    await expect(page.getByRole("listitem").filter({ hasText: title })).toHaveCount(1);
});

test("shows a message when the chosen assignee was deleted before submitting", async ({ page }) => {
    await page.goto("/tasks/new");
    await page.getByLabel("Title").fill(unique("Ghost assignee"));
    // Offer an id that does not exist, as if the user had been deleted after the form loaded.
    await page.getByLabel("Assignee").evaluate((el: HTMLSelectElement) => {
        const option = document.createElement("option");
        option.value = "00000000-0000-4000-8000-000000000000";
        option.textContent = "Gone";
        el.append(option);
        el.value = option.value;
    });
    await page.getByRole("button", { name: "Create task" }).click();
    await expect(page.getByText("This user no longer exists")).toBeVisible();
});
