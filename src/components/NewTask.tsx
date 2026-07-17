'use client';

import { ChangeEvent, FC, JSX, useState } from 'react';
import { createTask } from '@/app/actions/task';
import { useSnackbar } from 'notistack';

interface NewTaskT {
    onCreated?: () => void;
}

const NewTask: FC<NewTaskT> = ({ onCreated }: NewTaskT): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        try {
            setLoading(true);
            await createTask(inputValue);
            setInputValue('');
            enqueueSnackbar('Tarea creada', {
                variant: 'success',
            });
            onCreated?.();
        } catch (error) {
            enqueueSnackbar('Error al crear tarea', {
                variant: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="dark:border-gray-700">
            <textarea
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                    setInputValue(e.target.value)
                }
                placeholder="
                Escribe una nueva tarea...
                "
                className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                rows={3}
            />

            <button
                disabled={loading}
                className="mt-3 mb-5 w-full cursor-pointer rounded-lg bg-sky-500 py-2 font-semibold text-white disabled:opacity-50"
            >
                {loading ? 'Creando...' : 'Agregar tarea'}
            </button>
        </form>
    );
};

export default NewTask;
