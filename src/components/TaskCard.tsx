'use client';

import { FC, JSX, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Pencil, Trash2 } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import { deleteTask } from '@/app/actions/task';
import { useSnackbar } from 'notistack';
import { TaskT } from '@/types';
import { formatDate } from '@/utils/formatDate';
import EditTaskModal from './EditTaskModal';

interface TaskCardT {
    task: TaskT;
    onUpdated: (task: TaskT) => void;
    onDeleted: (id: number) => void;
}

const TaskCard: FC<TaskCardT> = ({
    task,
    onUpdated,
    onDeleted,
}: TaskCardT): JSX.Element => {
    const [openEdit, setOpenEdit] = useState(false);
    const [date, setDate] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        disabled: task.status === 'finished',
    });

    const getBorderClass = (status: TaskT['status']): string => {
        switch (status) {
            case 'pending':
                return 'border-sky-500';

            case 'in_progress':
                return 'border-orange-500';

            case 'finished':
                return 'border-emerald-500';

            default:
                return 'border-sky-500';
        }
    };

    const borderClass = getBorderClass(task.status);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await deleteTask(task.id);
            onDeleted(task.id);
            enqueueSnackbar('Tarea eliminada', {
                variant: 'success',
            });
        } catch (error) {
            enqueueSnackbar('Error al eliminar', {
                variant: 'error',
            });
        }
    };

    useEffect(() => {
        setDate(new Date(task.createdAt).toLocaleDateString('es-CL'));
    }, [task.createdAt]);

    return (
        <article
            suppressHydrationWarning
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`mb-3 cursor-grab touch-none rounded-xl ${
                task.status === 'finished'
                    ? 'cursor-not-allowed'
                    : 'cursor-grab touch-none'
            } border-l-4 ${borderClass} border bg-white p-4 dark:bg-gray-800`}
        >
            <div className="flex justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {task.description}
                    </p>

                    <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                        {date}
                    </div>
                </div>
                <div>
                    {task.status !== 'finished' && (
                        <>
                            <button
                                onClick={(): void => setOpenEdit(true)}
                                className="rounded-lg p-2 text-gray-400 hover:bg-blue-100"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                                title="Eliminar tarea"
                            >
                                <Trash2 size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <EditTaskModal
                task={task}
                open={openEdit}
                onClose={(): void => setOpenEdit(false)}
                onUpdated={onUpdated}
            />
        </article>
    );
};

export default TaskCard;
