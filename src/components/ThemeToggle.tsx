'use client';

import { useTheme } from 'next-themes';
import { JSX, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle(): JSX.Element | null {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect((): void => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={(): void => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg px-4 py-2 text-gray-700 transition dark:text-white"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
