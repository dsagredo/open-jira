export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type TaskStatus = 'pending' | 'in-progress' | 'finished';

export interface Task {
    public: {
        Tables: {
            tasks: {
                Row: {
                    id: string;
                    description: string;
                    status: TaskStatus;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    description: string;
                    status?: TaskStatus;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    description?: string;
                    status?: TaskStatus;
                    created_at?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

export interface TaskT {
    id: string;
    description: string;
    status: TaskStatus;
    created_at: string;
}
