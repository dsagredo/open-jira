import type { Metadata } from 'next';
import './globals.css';
import { JSX, ReactNode } from 'react';
import Providers from '@/providers/Providers';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'OpenJira',
    description: 'Gestor de tareas Kanban',
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                <Providers>
                    <Header title="OpenJira" />
                    <main className="min-h-screen">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
