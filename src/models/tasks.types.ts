export type TaskStatus = 'pending' | 'in-progress' | 'finished';

export type TaskT = {
    id: string;
    description: string;
    status: TaskStatus;
    created_at: string;
};

export type TaskState = {
    tasks: TaskT[];
};
