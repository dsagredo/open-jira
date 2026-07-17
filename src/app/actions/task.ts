'use server';

import { prisma } from '@/lib/prisma';
import { TaskStatus } from '@/types';

export async function getTasks() {
    const sprint = await prisma.sprint.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!sprint) {
        return [];
    }

    return await prisma.task.findMany({
        where: {
            sprintId: sprint.id,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
}

export async function createTask(description: string) {
    let sprint = await prisma.sprint.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!sprint) {
        sprint = await prisma.sprint.create({
            data: {
                name: 'Sprint 1',
            },
        });
    }

    return await prisma.task.create({
        data: {
            title: description,
            description,
            status: 'pending',
            sprintId: sprint.id,
        },
    });
}

export async function updateTaskStatus(id: number, status: TaskStatus) {
    const task = await prisma.task.findUnique({
        where: {
            id,
        },
    });

    if (!task) {
        throw new Error(`Task ${id} no existe`);
    }

    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });
}

export async function deleteTask(id: number): Promise<void> {
    const task = await prisma.task.findUnique({
        where: {
            id,
        },
    });

    if (!task) {
        throw new Error(`Task ${id} no existe`);
    }

    await prisma.task.delete({
        where: {
            id,
        },
    });
}

export async function updateTask(id: number, description: string) {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            description,
        },
    });
}
