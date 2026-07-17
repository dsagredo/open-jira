'use client';

import { X } from 'lucide-react';
import NewTask from './NewTask';
import { JSX } from 'react';

interface NewTaskModalT {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export default function NewTaskModal({
    open,
    onClose,
    onCreated,
}: NewTaskModalT): JSX.Element | null {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
                <header className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Nueva tarea</h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="p-5">
                    <NewTask
                        onCreated={(): void => {
                            onCreated();
                            onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
