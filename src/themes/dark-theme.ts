import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        primary: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
        },
        secondary: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        error: {
            main: red.A400,
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
        },
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h6: {
            fontWeight: 600,
            letterSpacing: '-0.02em',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#1e293b',
                    borderBottom: '1px solid #334155',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 8,
                },
            },
        },
    },
});
