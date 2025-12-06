import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0a0f1e',
            paper: '#1a1f35',
        },
        primary: {
            main: '#0ea5e9',
            light: '#38bdf8',
            dark: '#0284c7',
        },
        secondary: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
        },
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h6: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        body1: {
            lineHeight: 1.7,
        },
        body2: {
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(26, 31, 53, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
                        transform: 'translateY(-2px)',
                        border: '1px solid rgba(148, 163, 184, 0.15)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 10,
                    padding: '10px 20px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                        transform: 'translateY(-1px)',
                    },
                },
                contained: {
                    '&:active': {
                        transform: 'translateY(0px)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                        },
                        '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
    },
});
