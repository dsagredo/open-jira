'use client';
import { createContext, JSX, useContext } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type SupabaseContextType = {
    supabase: ReturnType<typeof createBrowserClient>;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
    undefined
);

export const SupabaseProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createBrowserClient(supabaseUrl, supabaseKey);

    return (
        <SupabaseContext.Provider value={{ supabase }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    if (!context) {
        throw new Error('useSupabase debe usarse dentro de <SupabaseProvider>');
    }
    return context.supabase;
};
