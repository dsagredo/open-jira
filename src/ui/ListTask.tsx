'use client';

import React, { FC, useMemo, DragEvent, JSX, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { List, Paper } from '@mui/material';
import { TaskStatus, TaskT } from '@models/tasks.types';
import { useSupabase, useTasks } from '@store/context/SupabaseContext';
import styles from '@styles/TaskList.module.css';
import Card from '@components/Card';

interface ListTaskT {
    status: TaskStatus;
}

const ListTask: FC<ListTaskT> = ({ status }: ListTaskT) => {
    const supabase = useSupabase();
    const { tasks } = useTasks();
    const { enqueueSnackbar } = useSnackbar();
    const [draggingId, setDraggingId] = useState<number | null>(null);

    useEffect(() => {
        const onNativeDragStart = (e: globalThis.DragEvent) => {
            try {
                const idStr = e.dataTransfer?.getData('text');
                setDraggingId(idStr ? Number(idStr) : null);
            } catch {
                setDraggingId(null);
            }
        };
        const onNativeDragEnd = () => setDraggingId(null);

        window.addEventListener('dragstart', onNativeDragStart);
        window.addEventListener('dragend', onNativeDragEnd);

        return () => {
            window.removeEventListener('dragstart', onNativeDragStart);
            window.removeEventListener('dragend', onNativeDragEnd);
        };
    }, []);

    // filtrar por estado (columna)
    const tasksByStatus = useMemo(
        () => tasks.filter((t) => t.status === status),
        [tasks, status]
    );

    // permitir el drop
    const allowDrop = (e: React.DragEvent<HTMLDivElement>) =>
        e.preventDefault();

    const onDrag = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const task = tasks.find((t) => t.id === id);
        if (!task || task.status === status) return;

        const { error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', id);

        if (error) {
            enqueueSnackbar('Error al mover tarea', { variant: 'error' });
            return;
        }

        enqueueSnackbar('Tarea movida ✅', {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
    };

    return (
        <div
            onDrop={onDrag}
            onDragOver={allowDrop}
            className={draggingId ? styles.dragging : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflow: 'scroll',
                    backgroundColor: 'transparent',
                    padding: 1,
                }}
            >
                <List
                    sx={{
                        //opacity: draggingId ? 0.2 : 1,
                        transition: 'all .3s',
                        padding: 0,
                    }}
                >
                    {tasksByStatus.map(
                        (task): JSX.Element => (
                            <Card key={task.id} task={task} />
                        )
                    )}
                </List>
            </Paper>
        </div>
    );
};

export default ListTask;
