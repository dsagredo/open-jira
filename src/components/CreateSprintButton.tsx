'use client';

import { useRouter } from 'next/navigation';
import { createSprint } from '@/app/actions/sprint';
import { useSnackbar } from 'notistack';
import { JSX } from 'react';

interface CreateSprintButtonT {
    disabled: boolean;
    onCreated: () => Promise<void>;
}

export default function CreateSprintButton({
    disabled,
    onCreated,
}: CreateSprintButtonT): JSX.Element {
    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();

    const handleCreate = async (): Promise<void> => {
        await createSprint();
        await onCreated();

        enqueueSnackbar('Nuevo sprint creado', {
            variant: 'success',
        });

        router.refresh();
    };

    return (
        <button
            disabled={disabled}
            onClick={handleCreate}
            className={`rounded-lg px-4 py-2 font-semibold ${
                disabled
                    ? 'cursor-not-allowed bg-gray-100 text-black text-gray-400'
                    : 'cursor-pointer bg-sky-600 text-white'
            }`}
        >
            Crear próximo Sprint
        </button>
    );
}
