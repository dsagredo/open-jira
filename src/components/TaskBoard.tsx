'use client';

import { FC, JSX, useState, useCallback } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import TaskColumn from './TaskColumn';
import { TaskT, TaskStatus } from '@/types';
import { updateTaskStatus, getTasks } from '@/app/actions/task';
import { useSnackbar } from 'notistack';
import FloatingButton from './FloatingButton';
import CreateSprintButton from './CreateSprintButton';

interface TaskBoardProps {
    initialTasks: TaskT[];
}

const COLUMNS: {
    status: TaskStatus;
    title: string;
}[] = [
    {
        status: 'pending',
        title: 'Pendientes',
    },
    {
        status: 'in_progress',
        title: 'En Progreso',
    },
    {
        status: 'finished',
        title: 'Completadas',
    },
];

const TaskBoard: FC<TaskBoardProps> = ({
    initialTasks,
}: TaskBoardProps): JSX.Element => {
    const [tasks, setTasks] = useState<TaskT[]>(initialTasks);
    const [activeId, setActiveId] = useState<number | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const activeTask = tasks.find(
        (task: TaskT): boolean => task.id === activeId,
    );

    const handleTaskCreated = useCallback(async (): Promise<void> => {
        try {
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error al refrescar tareas:', error);
        }
    }, []);

    const handleTaskDeleted = useCallback((id: number): void => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }, []);

    const handleTaskUpdated = useCallback((updatedTask: TaskT): void => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
            ),
        );
    }, []);

    const handleSprintCreated = useCallback(async (): Promise<void> => {
        try {
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const handleDragStart = (event: DragStartEvent): void =>
        setActiveId(Number(event.active.id));

    const handleDragOver = (event: DragOverEvent): void => {
        const { active, over } = event;

        if (!over) return;

        const taskId = Number(active.id);

        const currentTask = tasks.find(
            (task: TaskT): boolean => task.id === taskId,
        );

        if (!currentTask) return;

        let newStatus: TaskStatus | null = null;

        if (
            COLUMNS.some(
                (c: { status: TaskStatus; title: string }): boolean =>
                    c.status === over.id,
            )
        ) {
            newStatus = over.id as TaskStatus;
        } else {
            const overTask = tasks.find(
                (task: TaskT): boolean => task.id === Number(over.id),
            );

            if (overTask) {
                newStatus = overTask.status;
            }
        }

        if (!newStatus || currentTask.status === newStatus) return;

        setTasks((prev: TaskT[]): TaskT[] =>
            prev.map((task: TaskT): TaskT =>
                task.id === taskId
                    ? {
                          ...task,
                          status: newStatus!,
                      }
                    : task,
            ),
        );
    };

    const handleDragEnd = useCallback(
        async ({ active, over }: DragEndEvent): Promise<void> => {
            if (!over) return;

            const taskId = Number(active.id);

            let newStatus: TaskStatus | undefined;

            if (
                COLUMNS.some(
                    (column: { status: TaskStatus }): boolean =>
                        column.status === over.id,
                )
            ) {
                newStatus = over.id as TaskStatus;
            } else {
                const overTask = tasks.find(
                    (t: TaskT): boolean => t.id === Number(over.id),
                );

                if (overTask) {
                    newStatus = overTask.status;
                }
            }

            if (!newStatus) return;

            try {
                await updateTaskStatus(taskId, newStatus);

                setTasks((prev: TaskT[]): TaskT[] =>
                    prev.map((task: TaskT): TaskT =>
                        task.id === taskId
                            ? {
                                  ...task,
                                  status: newStatus!,
                              }
                            : task,
                    ),
                );

                enqueueSnackbar('Tarea movida correctamente', {
                    variant: 'success',
                });
            } catch (error) {
                console.error(error);

                enqueueSnackbar('Error al mover tarea', {
                    variant: 'error',
                });
            }
        },
        [tasks, enqueueSnackbar],
    );

    const canCreateSprint =
        tasks.length > 0 &&
        tasks.every((task: TaskT) => task.status === 'finished');
    return (
        <>
            <div className="flex justify-between p-5">
                <CreateSprintButton
                    disabled={!canCreateSprint}
                    onCreated={handleSprintCreated}
                />
            </div>
            <FloatingButton onCreated={handleTaskCreated} />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">
                    {COLUMNS.map(({ status, title }): JSX.Element => (
                        <TaskColumn
                            key={status}
                            status={status}
                            title={title}
                            tasks={tasks}
                            onUpdated={handleTaskUpdated}
                            onDeleted={handleTaskDeleted}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeTask && (
                        <div className="w-72 rounded-xl bg-white p-4 opacity-90 shadow-xl dark:bg-gray-800">
                            {activeTask.description}
                        </div>
                    )}
                </DragOverlay>
            </DndContext>
        </>
    );
};

export default TaskBoard;
