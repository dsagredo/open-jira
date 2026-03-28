import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { darkTheme } from '@/themes/dark-theme';
import { JSX } from 'react';
import { SupabaseProvider } from '@store/context/SupabaseContext';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                <SupabaseProvider>
                    <Component {...pageProps} />
                </SupabaseProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
