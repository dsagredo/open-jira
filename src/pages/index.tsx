import Layout from '@layouts/Layout';
import { JSX, useMemo } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, Chip } from '@mui/material';
import NewTask from '@ui/NewTask';
import ListTask from '@ui/ListTask';
import { useTasks } from '@store/context/SupabaseContext';

interface HomeT {
    toggleTheme: () => void;
    isTheme: {
        palette: {
            mode: string;
        };
    };
}

export default function Home({ toggleTheme, isTheme }: HomeT): JSX.Element {
    const { tasks } = useTasks();

    const taskCounts = useMemo(() => {
        return {
            pending: tasks.filter((t) => t.status === 'pending').length,
            'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
            finished: tasks.filter((t) => t.status === 'finished').length,
        };
    }, [tasks]);

    return (
        <Layout
            title="Home - OpenJira"
            toggleTheme={toggleTheme}
            isTheme={isTheme}
        >
            <Grid container spacing={3} sx={{ padding: 3 }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        height: 'calc(100vh - 120px)',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
                        gap: 3,
                    }}
                >
                    <Card
                        sx={{
                            overflow: 'visible',
                        }}
                    >
                        <CardHeader
                            title="Pendientes"
                            action={
                                <Chip
                                    label={taskCounts.pending}
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.25)',
                                        color: 'white',
                                        fontWeight: 700,
                                        backdropFilter: 'blur(10px)',
                                        minWidth: 32,
                                    }}
                                />
                            }
                            sx={{
                                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                                color: 'white',
                                py: 2.5,
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent 50%)',
                                    pointerEvents: 'none',
                                },
                                '& .MuiCardHeader-title': {
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    letterSpacing: '-0.01em',
                                },
                            }}
                        />
                        <CardContent sx={{ p: 0 }}>
                            <NewTask />
                            <ListTask status="pending" />
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            overflow: 'visible',
                        }}
                    >
                        <CardHeader
                            title="En Progreso"
                            action={
                                <Chip
                                    label={taskCounts['in-progress']}
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.25)',
                                        color: 'white',
                                        fontWeight: 700,
                                        backdropFilter: 'blur(10px)',
                                        minWidth: 32,
                                    }}
                                />
                            }
                            sx={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                py: 2.5,
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent 50%)',
                                    pointerEvents: 'none',
                                },
                                '& .MuiCardHeader-title': {
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    letterSpacing: '-0.01em',
                                },
                            }}
                        />
                        <CardContent sx={{ flex: 1, overflow: 'hidden', p: 0 }}>
                            <ListTask status="in-progress" />
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            overflow: 'visible',
                        }}
                    >
                        <CardHeader
                            title="Completadas"
                            action={
                                <Chip
                                    label={taskCounts.finished}
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.25)',
                                        color: 'white',
                                        fontWeight: 700,
                                        backdropFilter: 'blur(10px)',
                                        minWidth: 32,
                                    }}
                                />
                            }
                            sx={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                py: 2.5,
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent 50%)',
                                    pointerEvents: 'none',
                                },
                                '& .MuiCardHeader-title': {
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    letterSpacing: '-0.01em',
                                },
                            }}
                        />
                        <CardContent sx={{ flex: 1, overflow: 'hidden', p: 0 }}>
                            <ListTask status="finished" />
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Layout>
    );
}
