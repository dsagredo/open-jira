'use client';
import { createContext, JSX, useContext, useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { TaskT } from '@models/tasks.types';

type SupabaseContextType = {
    supabase: ReturnType<typeof createBrowserClient>;
    tasks: TaskT[];
    setTasks: React.Dispatch<React.SetStateAction<TaskT[]>>;
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
    const [tasks, setTasks] = useState<TaskT[]>([]);

    useEffect(() => {
        const getTasks = async () => {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: true });
            if (error) console.error(error);
            else setTasks(data || []);
        };
        getTasks();

        const channel = supabase
            .channel('tasks-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'tasks' },
                (payload: any) => {
                    if (payload.eventType === 'INSERT') {
                        setTasks((prev) => [...prev, payload.new as TaskT]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTasks((prev) =>
                            prev.map((t) =>
                                t.id === (payload.new as TaskT).id
                                    ? (payload.new as TaskT)
                                    : t
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setTasks((prev) =>
                            prev.filter((t) => t.id !== (payload.old as TaskT).id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <SupabaseContext.Provider value={{ supabase, tasks, setTasks }}>
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

export const useTasks = () => {
    const context = useContext(SupabaseContext);
    if (!context) {
        throw new Error('useTasks debe usarse dentro de <SupabaseProvider>');
    }
    return { tasks: context.tasks, setTasks: context.setTasks };
};
