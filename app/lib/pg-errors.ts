// Drizzle wraps the driver error in `cause`, so look at both levels.
export function isForeignKeyViolation(error: unknown): boolean {
    for (let current = error; current && typeof current === "object";) {
        if ("code" in current && current.code === "23503") {
            return true;
        }
        current = "cause" in current ? current.cause : undefined;
    }
    return false;
}
