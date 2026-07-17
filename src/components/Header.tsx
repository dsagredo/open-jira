'use client';

import { JSX } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ title }: { title: string }): JSX.Element {
    return (
        <header className="border-b border-gray-400 bg-white/90 p-2.5 dark:bg-gray-600/90">
            <div className="flex justify-between">
                <div className="text-xl font-bold">
                    <span className="bg-linear-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                        {title}
                    </span>
                </div>
                <ThemeToggle />
            </div>
        </header>
    );
}
