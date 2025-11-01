import Grid from '@mui/material/Grid';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { JSX } from 'react';

interface HeaderT {
    toggleTheme?: () => void;
    isTheme?: {
        palette: {
            mode: string;
        };
    };
}

export default function Header({ toggleTheme, isTheme }: HeaderT) {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ py: 1 }}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Grid>
                        <Link
                            href="/"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    background:
                                        'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                OpenJira
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid>
                        <IconButton
                            onClick={toggleTheme}
                            sx={{
                                bgcolor: 'action.hover',
                                '&:hover': { bgcolor: 'action.selected' },
                            }}
                        >
                            {isTheme?.palette.mode === 'dark' ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness4Icon />
                            )}
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
