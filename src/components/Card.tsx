import React, { FC, DragEvent, JSX, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Card as CardMUI,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
    Box,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { formatDate } from '@utils/formatDate';
import { TaskT } from '@models/tasks.types';

interface CardProps {
    task: TaskT;
}

const Card: FC<CardProps> = ({ task }): JSX.Element => {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);

    const onDragStart = (event: DragEvent<HTMLDivElement>): void => {
        event.dataTransfer.setData('text', String(task.id));
        setIsDragging(true);
    };

    const onDragEnd = (event: DragEvent<HTMLDivElement>): void => {
        setIsDragging(false);
    };

    const onClick = (): Promise<boolean> => router.push(`/task/${task.id}`);

    const getStatusColor = () => {
        switch (task.status) {
            case 'pending':
                return 'primary.main';
            case 'in-progress':
                return 'warning.main';
            case 'finished':
                return 'success.main';
            default:
                return 'primary.main';
        }
    };

    return (
        <CardMUI
            onClick={onClick}
            sx={{
                marginBottom: 2,
                cursor: 'grab',
                position: 'relative',
                overflow: 'visible',
                opacity: isDragging ? 0.5 : 1,
                transform: isDragging ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:active': {
                    cursor: 'grabbing',
                },
                '&:hover': {
                    transform: isDragging ? 'scale(0.95)' : 'translateY(-4px)',
                    '& .drag-indicator': {
                        opacity: 1,
                    },
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: `linear-gradient(180deg, var(--status-color), transparent)`,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    '--status-color': getStatusColor(),
                },
            }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <Box
                className="drag-indicator"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                }}
            >
                <DragIndicatorIcon fontSize="small" />
            </Box>
            <CardActionArea>
                <CardContent sx={{ pb: 1, pr: 5 }}>
                    <Typography
                        sx={{
                            whiteSpace: 'pre-line',
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            color: 'text.primary',
                            fontWeight: 500,
                        }}
                    >
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        pb: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
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
