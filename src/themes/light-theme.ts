import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        primary: {
            main: '#2563eb',
            light: '#60a5fa',
            dark: '#1e40af',
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
            primary: '#1e293b',
            secondary: '#64748b',
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
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    borderBottom: '1px solid #e2e8f0',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
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
