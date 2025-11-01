import Layout from '@layouts/Layout';
import { JSX } from 'react';
import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material';
import NewTask from '@ui/NewTask';
import ListTask from '@ui/ListTask';

interface HomeT {
    toggleTheme: () => void;
    isTheme: {
        palette: {
            mode: string;
        };
    };
}

export default function Home({ toggleTheme, isTheme }: HomeT): JSX.Element {
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
                            'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                        gap: 2,
                    }}
                >
                    <Card>
                        <CardHeader
                            title="Pendientes"
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                bgcolor: 'primary.main',
                                color: 'white',
                                py: 2,
                                '& .MuiCardHeader-title': {
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                },
                            }}
                        />
                        <CardContent sx={{ p: 0 }}>
                            <NewTask />
                            <ListTask status="pending" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title="En Progreso"
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                bgcolor: 'warning.main',
                                color: 'white',
                                py: 2,
                                '& .MuiCardHeader-title': {
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                },
                            }}
                        />
                        <CardContent sx={{ flex: 1, overflow: 'hidden', p: 0 }}>
                            <ListTask status="in-progress" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title="Completadas"
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                bgcolor: 'secondary.main',
                                color: 'white',
                                py: 2,
                                '& .MuiCardHeader-title': {
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
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
