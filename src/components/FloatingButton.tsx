'use client';

import { JSX, useState } from 'react';
import { Plus } from 'lucide-react';
import NewTaskModal from './NewTaskModal';

interface FloatingButtonProps {
    onCreated: () => void;
}

export default function FloatingButton({
    onCreated,
}: FloatingButtonProps): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={(): void => setOpen(true)}
                className="fixed right-6 bottom-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-sky-600 text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-sky-700 active:scale-95"
                aria-label="Nueva tarea"
            >
                <Plus size={28} strokeWidth={2.5} />
            </button>

            <NewTaskModal
                open={open}
                onClose={(): void => setOpen(false)}
                onCreated={onCreated}
            />
        </>
    );
}
