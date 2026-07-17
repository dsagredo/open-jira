'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { JSX, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function ThemeProvider({ children }: Props): JSX.Element {
    return (
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
        </NextThemesProvider>
    );
}
