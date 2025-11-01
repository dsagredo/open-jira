import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { darkTheme, lightTheme } from '@/themes';
import { JSX, useEffect, useState } from 'react';
import { SupabaseProvider } from '@store/context/SupabaseContext';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    const [isTheme, setTheme] = useState(darkTheme);
    const [isSelectedTheme, setSelectedTheme] = useState<'dark' | 'light'>(
        'dark'
    );

    const getTheme = (mode: 'dark' | 'light') =>
        mode === 'dark' ? darkTheme : lightTheme;

    const toggleTheme = (): void => {
        const theme = isSelectedTheme === 'dark' ? 'light' : 'dark';
        setSelectedTheme(theme);
    };

    useEffect((): void => {
        setTheme(getTheme(isSelectedTheme));
    }, [isSelectedTheme]);

    return (
        <SnackbarProvider maxSnack={3}>
            <SupabaseProvider>
                <Component
                    {...pageProps}
                    toggleTheme={toggleTheme}
                    isTheme={isTheme}
                />
            </SupabaseProvider>
        </SnackbarProvider>
    );
}
