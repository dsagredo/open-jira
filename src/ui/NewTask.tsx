import React, { ChangeEvent, JSX, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useSupabase } from '@store/context';

const NewTask = (): JSX.Element => {
    const supabase = useSupabase();

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>): void =>
        setInputValue(event.target.value);

    const onSave = async (): Promise<void> => {
        if (!inputValue.trim()) return alert('Escribe una descripción');
        console.log('inputValue ', inputValue);
        try {
            await supabase
                .from('tasks')
                .insert([{ description: inputValue, status: 'pending' }]);

            setInputValue('');
            setIsAdding(false);
            setTouched(false);
        } catch (error: any) {
            console.error(error);
            console.log(
                error.response?.data?.message || 'Error al agregar tarea'
            );
        }
    };

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2, paddingTop: 2 }}>
            {isAdding ? (
                <>
                    <TextField
                        fullWidth
                        sx={{
                            marginBottom: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                        placeholder="Escribe tu nueva tarea aquí..."
                        autoFocus
                        multiline
                        rows={3}
                        label="Nueva tarea"
                        helperText={
                            inputValue.length <= 0 &&
                            touched &&
                            'Ingrese su nueva entrada'
                        }
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFieldChanged}
                        onBlur={(): void => setTouched(true)}
                    />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        gap={1}
                        sx={{ marginTop: 1, marginBottom: 2 }}
                    >
                        <Button
                            variant="outlined"
                            onClick={(): void => setIsAdding(false)}
                            sx={{ flex: 1 }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<SaveOutlinedIcon />}
                            onClick={onSave}
                            sx={{ flex: 1 }}
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon={<AddOutlinedIcon />}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(): void => setIsAdding(true)}
                    sx={{
                        py: 1.5,
                        fontWeight: 600,
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                        },
                    }}
                >
                    Agregar Tarea
                </Button>
            )}
        </Box>
    );
};

export default NewTask;
