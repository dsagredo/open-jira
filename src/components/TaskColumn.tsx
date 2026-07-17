'use client';

import { FC, JSX } from 'react';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { TaskT, TaskStatus } from '@/types/task';

interface TaskColumnT {
    status: TaskStatus;
    title: string;
    tasks: TaskT[];
    onUpdated: (task: TaskT) => void;
    onDeleted: (id: number) => void;
}

const TaskColumn: FC<TaskColumnT> = ({
    status,
    title,
    tasks,
    onUpdated,
    onDeleted,
}: TaskColumnT): JSX.Element => {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    const filtered = tasks.filter(
        (task: TaskT): boolean => task.status === status,
    );

    const getHeaderColor = (status: TaskStatus): string => {
        switch (status) {
            case 'pending':
                return 'bg-linear-135 from-sky-500 to-sky-700';

            case 'in_progress':
                return 'bg-linear-135 from-amber-500 to-orange-600';

            case 'finished':
                return 'bg-linear-135 from-emerald-500 to-green-700';

            default:
                return 'bg-linear-135 from-slate-500 to-slate-700';
        }
    };

    return (
        <section className="overflow-hidden rounded-xl border">
            <header
                className={`${getHeaderColor(status)} p-4 font-bold text-white`}
            >
                {title}
                <span className="float-right">{filtered.length}</span>
            </header>

            <SortableContext
                items={filtered.map((t: TaskT): number => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <div
                    ref={setNodeRef}
                    className="h-[calc(100vh-250px)] min-h-75 overflow-y-auto bg-gray-100 p-4 dark:bg-gray-900"
                >
                    {filtered.map((task: TaskT): JSX.Element => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdated={onUpdated}
                            onDeleted={onDeleted}
                        />
                    ))}
                </div>
            </SortableContext>
        </section>
    );
};

export default TaskColumn;
