'use client';

import { ChangeEvent, FC, JSX, useState } from 'react';
import { X } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { updateTask } from '@/app/actions/task';
import { TaskT } from '@/types';

interface EditTaskModalT {
    task: TaskT;
    open: boolean;
    onClose: () => void;
    onUpdated: (task: TaskT) => void;
}

const EditTaskModal: FC<EditTaskModalT> = ({
    task,
    open,
    onClose,
    onUpdated,
}: EditTaskModalT): JSX.Element | null => {
    const [value, setValue] = useState<string>(task.description ?? '');
    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    if (!open) return null;

    const handleSave = async (): Promise<void> => {
        if (!value.trim()) return;

        try {
            setLoading(true);
            await updateTask(task.id, value);
            onUpdated({
                ...task,
                description: value,
            });
            enqueueSnackbar('Tarea actualizada', {
                variant: 'success',
            });
            onClose();
        } catch (error) {
            enqueueSnackbar('Error al actualizar tarea', {
                variant: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
                <header className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Editar tarea</h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="p-5">
                    <textarea
                        value={value}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                            setValue(e.target.value)
                        }
                        rows={3}
                        className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                    />

                    <button
                        disabled={loading}
                        onClick={handleSave}
                        className="mt-3 mb-5 w-full cursor-pointer rounded-lg bg-sky-500 py-2 font-semibold text-white disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
