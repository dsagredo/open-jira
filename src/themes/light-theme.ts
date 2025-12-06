import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
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
            primary: '#0f172a',
            secondary: '#64748b',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: '#0f172a',
                    borderBottom: '1px solid #e2e8f0',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid #f1f5f9',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
                        transform: 'translateY(-2px)',
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
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
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
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.06)',
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
