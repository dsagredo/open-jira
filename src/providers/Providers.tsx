'use client';

import { SnackbarProvider } from 'notistack';
import ThemeProvider from '@/components/ThemeProvider';
import { JSX } from 'react';

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <ThemeProvider>
            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={2000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {children}
            </SnackbarProvider>
        </ThemeProvider>
    );
}
