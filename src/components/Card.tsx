import React, { FC, DragEvent, JSX } from 'react';
import { useRouter } from 'next/router';
import {
    Card as CardMUI,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { formatDate } from '@utils/formatDate';
import { TaskT } from '@models/tasks.types';

interface CardProps {
    task: TaskT;
}

const Card: FC<CardProps> = ({ task }): JSX.Element => {
    const router = useRouter();

    const onDragStart = (event: DragEvent<HTMLDivElement>): void => {
        event.dataTransfer.setData('text', task.id);
        event.currentTarget.style.opacity = '0.5';
        event.currentTarget.style.cursor = 'grabbing';
    };

    const onDragEnd = (event: DragEvent<HTMLDivElement>): void => {
        event.currentTarget.style.opacity = '1';
        event.currentTarget.style.cursor = 'grab';
    };

    const onClick = (): Promise<boolean> => router.push(`/task/${task.id}`);

    return (
        <CardMUI
            onClick={onClick}
            sx={{
                marginBottom: 1.5,
                cursor: 'grab',
                '&:active': {
                    cursor: 'grabbing',
                },
                '&:hover': {
                    transform: 'translateY(-2px)',
                },
                borderLeft: 4,
                borderLeftColor: 'primary.main',
            }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent sx={{ pb: 1 }}>
                    <Typography
                        sx={{
                            whiteSpace: 'pre-line',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            color: 'text.primary',
                        }}
                    >
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        px: 2,
                        pb: 1.5,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.8rem',
                            color: 'text.secondary',
                            fontWeight: 500,
                        }}
                    >
                        {formatDate(task.created_at)}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </CardMUI>
    );
};

export default Card;
