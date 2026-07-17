export type TaskStatus = 'pending' | 'in_progress' | 'finished';

export type TaskT = {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    createdAt: Date;
};

export type TaskState = {
    tasks: TaskT[];
};
