import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    useDraggable,
    useDroppable,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import { useFetcher, useFetchers } from "react-router";

import { statuses, type TaskStatus } from "../task-status";

export type BoardTask = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assigneeName: string | null;
};

function initials(name: string) {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

function TaskCard({ task }: { task: BoardTask }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
    });
    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`cursor-grab touch-none rounded-lg border border-border bg-surface p-3.5 shadow-[0_1px_2px_rgba(22,24,29,0.05)] focus-visible:outline-2 focus-visible:outline-primary ${
                isDragging ? "relative z-10 cursor-grabbing opacity-90" : ""
            }`}
        >
            <h3 className="text-card-title font-card-title leading-card-title text-ink">
                {task.title}
            </h3>
            {task.description && (
                <p className="mt-1 line-clamp-2 text-caption leading-caption text-ink-muted">
                    {task.description}
                </p>
            )}
            <div className="mt-3 flex items-center gap-2 text-caption leading-caption text-ink-muted">
                {task.assigneeName ? (
                    <>
                        <span
                            aria-hidden
                            className="flex size-[26px] items-center justify-center rounded-full bg-avatar-blue font-caption text-on-primary"
                        >
                            {initials(task.assigneeName)}
                        </span>
                        {task.assigneeName}
                    </>
                ) : (
                    "Unassigned"
                )}
            </div>
        </li>
    );
}

function Column({ status, tasks }: { status: (typeof statuses)[number]; tasks: BoardTask[] }) {
    const { setNodeRef, isOver } = useDroppable({ id: status.value });

    return (
        <section
            ref={setNodeRef}
            aria-labelledby={`column-${status.value}`}
            className={`flex min-w-[260px] flex-1 flex-col rounded-xl bg-surface-sunken p-3 ${
                isOver ? "outline-2 outline-primary" : ""
            }`}
        >
            <header className="mb-3 flex items-center gap-2">
                <span aria-hidden className={`size-2.5 rounded-full ${status.dot}`} />
                <h2
                    id={`column-${status.value}`}
                    className="text-card-title font-card-title leading-card-title text-ink"
                >
                    {status.label}
                </h2>
                <span className="text-caption leading-caption text-ink-muted">{tasks.length}</span>
            </header>
            <ul className="flex flex-1 flex-col gap-2.5">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </ul>
            {tasks.length === 0 && (
                <p className="py-4 text-center text-caption leading-caption text-ink-subtle">
                    No tasks
                </p>
            )}
        </section>
    );
}

export function Board({ tasks }: { tasks: BoardTask[] }) {
    const fetcher = useFetcher();
    const pending = useFetchers();
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    // Optimistic UI: show in-flight moves before the server confirms them.
    const moves = new Map<string, TaskStatus>();
    for (const f of pending) {
        if (f.formData?.get("intent") === "move") {
            moves.set(String(f.formData.get("id")), f.formData.get("status") as TaskStatus);
        }
    }
    const visible = tasks.map((t) => ({ ...t, status: moves.get(t.id) ?? t.status }));

    function onDragEnd({ active, over }: DragEndEvent) {
        if (!over) return;
        const task = visible.find((t) => t.id === active.id);
        if (!task || task.status === over.id) return;
        fetcher.submit(
            { intent: "move", id: task.id, status: String(over.id) },
            { method: "post" },
        );
    }

    return (
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {statuses.map((status) => (
                    <Column
                        key={status.value}
                        status={status}
                        tasks={visible.filter((t) => t.status === status.value)}
                    />
                ))}
            </div>
        </DndContext>
    );
}
