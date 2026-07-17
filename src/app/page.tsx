import { JSX } from 'react';
import { prisma } from '@/lib/prisma';
import TaskBoard from '@/components/TaskBoard';

export default async function Page(): Promise<JSX.Element> {
    const sprint = await prisma.sprint.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
    });

    const tasks = await prisma.task.findMany({
        where: {
            sprintId: sprint?.id,
        },
    });

    return <TaskBoard initialTasks={tasks} />;
}
