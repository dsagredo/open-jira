import React, { ChangeEvent, JSX, useState } from 'react';
import { Box, Button, TextField, Collapse, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useSupabase } from '@store/context';
import { useSnackbar } from 'notistack';

const NewTask = (): JSX.Element => {
    const supabase = useSupabase();
    const { enqueueSnackbar } = useSnackbar();

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>): void =>
        setInputValue(event.target.value);

    const onSave = async (): Promise<void> => {
        if (!inputValue.trim()) {
            enqueueSnackbar('Escribe una descripción', { variant: 'warning' });
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase
                .from('tasks')
                .insert([{ description: inputValue, status: 'pending' }]);

            if (error) throw error;

            setInputValue('');
            setIsAdding(false);
            setTouched(false);
            enqueueSnackbar('Tarea creada', {
                variant: 'success',
                autoHideDuration: 2000,
            });
        } catch (error: any) {
            console.error(error);
            enqueueSnackbar('Error al agregar tarea', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setInputValue('');
        setTouched(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            onSave();
        }
    };

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2, paddingTop: 2 }}>
            <Collapse in={isAdding}>
                <Box
                    sx={{
                        mb: 2,
                        p: 2,
                        bgcolor: 'action.hover',
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                        <IconButton
                            size="small"
                            onClick={handleCancel}
                            sx={{
                                opacity: 0.7,
                                '&:hover': { opacity: 1 },
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <TextField
                        fullWidth
                        sx={{
                            marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                            },
                        }}
                        placeholder="¿Qué necesitas hacer?"
                        autoFocus
                        multiline
                        rows={3}
                        label="Nueva tarea"
                        helperText={
                            inputValue.length <= 0 && touched
                                ? 'Ingrese una descripción'
                                : 'Cmd/Ctrl + Enter para guardar'
                        }
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFieldChanged}
                        onBlur={(): void => setTouched(true)}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                    />
                    <Box display="flex" justifyContent="space-between" gap={1.5}>
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{ flex: 1 }}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            endIcon={<SaveOutlinedIcon />}
                            onClick={onSave}
                            sx={{ flex: 1 }}
                            disabled={isLoading || !inputValue.trim()}
                        >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </Box>
                </Box>
            </Collapse>
            <Collapse in={!isAdding}>
                <Button
                    startIcon={<AddOutlinedIcon />}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(): void => setIsAdding(true)}
                    sx={{
                        py: 1.75,
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        '&:hover': {
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.15)',
                            transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Agregar Tarea
                </Button>
            </Collapse>
        </Box>
    );
};

export default NewTask;
