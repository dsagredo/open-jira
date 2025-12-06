'use client';

import React, { FC, useMemo, DragEvent, JSX, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { List, Paper, Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
    const [isDraggingOver, setIsDraggingOver] = useState(false);

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

    const tasksByStatus = useMemo(
        () => tasks.filter((t) => t.status === status),
        [tasks, status]
    );

    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const onDragLeave = () => {
        setIsDraggingOver(false);
    };

    const onDrag = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const id = Number(e.dataTransfer.getData('text'));
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

        enqueueSnackbar('Tarea movida', {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
    };

    const getEmptyStateConfig = () => {
        switch (status) {
            case 'pending':
                return {
                    icon: InboxIcon,
                    message: 'No hay tareas pendientes',
                    subtext: 'Crea una nueva tarea para comenzar',
                };
            case 'in-progress':
                return {
                    icon: PlayCircleOutlineIcon,
                    message: 'No hay tareas en progreso',
                    subtext: 'Arrastra una tarea aquí para comenzar a trabajar',
                };
            case 'finished':
                return {
                    icon: CheckCircleOutlineIcon,
                    message: 'No hay tareas completadas',
                    subtext: 'Las tareas finalizadas aparecerán aquí',
                };
            default:
                return {
                    icon: InboxIcon,
                    message: 'No hay tareas',
                    subtext: '',
                };
        }
    };

    const emptyState = getEmptyStateConfig();
    const EmptyIcon = emptyState.icon;

    return (
        <div
            onDrop={onDrag}
            onDragOver={allowDrop}
            onDragLeave={onDragLeave}
            className={draggingId ? styles.dragging : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflow: 'scroll',
                    backgroundColor: 'transparent',
                    padding: 2,
                    border: isDraggingOver ? '2px dashed' : '2px solid transparent',
                    borderColor: isDraggingOver ? 'primary.main' : 'transparent',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    position: 'relative',
                    '&::after': isDraggingOver
                        ? {
                              content: '""',
                              position: 'absolute',
                              inset: 0,
                              backgroundColor: 'primary.main',
                              opacity: 0.05,
                              borderRadius: 3,
                              pointerEvents: 'none',
                          }
                        : {},
                }}
            >
                {tasksByStatus.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            textAlign: 'center',
                            opacity: isDraggingOver ? 0.5 : 0.6,
                            transition: 'opacity 0.3s ease',
                            py: 4,
                        }}
                    >
                        <EmptyIcon
                            sx={{
                                fontSize: 64,
                                color: 'text.secondary',
                                opacity: 0.4,
                                mb: 2,
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 600,
                                mb: 0.5,
                            }}
                        >
                            {emptyState.message}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                opacity: 0.7,
                            }}
                        >
                            {emptyState.subtext}
                        </Typography>
                    </Box>
                ) : (
                    <List
                        sx={{
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
                )}
            </Paper>
        </div>
    );
};

export default ListTask;
