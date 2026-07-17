'use server';

import { prisma } from '@/lib/prisma';

export async function createSprint(): Promise<void> {
    const count = await prisma.sprint.count();

    await prisma.sprint.create({
        data: {
            name: `Sprint ${count + 1}`,
        },
    });
}
