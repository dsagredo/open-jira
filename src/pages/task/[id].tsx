import React, { ChangeEvent, FC, JSX, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {
    capitalize,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Button,
    Box,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Layout from '@layouts/Layout';
import { formatDate } from '@utils/formatDate';
import { useSupabase, useTasks } from '@store/context';
import { createClient } from '@supabase/supabase-js';
import { TaskT } from '@models/tasks.types';
import { useSnackbar } from 'notistack';

const validStatus = [
    { title: 'pendiente', status: 'pending' },
    { title: 'en progreso', status: 'in-progress' },
    { title: 'completado', status: 'finished' },
];

interface TaskPageProps {
    task: TaskT;
    toggleTheme: () => void;
    isTheme: {
        palette: {
            mode: string;
        };
    };
}

const TaskPage: FC<TaskPageProps> = ({
    task,
    toggleTheme,
    isTheme,
}: TaskPageProps): JSX.Element => {
    const [inputValue, setInputValue] = useState(task.description);
    const [isStatus, setStatus] = useState(task.status);
    const [touched, setTouched] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();
    const supabase = useSupabase();
    const { tasks, setTasks } = useTasks();
    const { enqueueSnackbar } = useSnackbar();

    const isNotValid = useMemo(
        () => inputValue.length <= 0 && touched,
        [inputValue, touched]
    );

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>): void =>
        setInputValue(event.target.value);

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>): void =>
        setStatus(event.target.value as TaskT['status']);

    const onSave = async (): Promise<void> => {
        if (inputValue.trim().length === 0) return;

        try {
            setIsSaving(true);
            const { error } = await supabase
                .from('tasks')
                .update({ description: inputValue, status: isStatus })
                .eq('id', task.id);

            if (error) {
                enqueueSnackbar('Error al guardar la tarea', {
                    variant: 'error',
                });
            } else {
                setTasks((prev: TaskT[]): TaskT[] =>
                    prev.map(
                        (t: TaskT): TaskT =>
                            t.id === task.id
                                ? {
                                      ...t,
                                      description: inputValue,
                                      status: isStatus,
                                  }
                                : t
                    )
                );

                enqueueSnackbar('Tarea guardada correctamente', {
                    variant: 'success',
                });
                setTimeout((): Promise<boolean> => router.push('/'), 500);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            enqueueSnackbar('Error inesperado al guardar', {
                variant: 'error',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const onDelete = async (): Promise<void> => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', task.id);

        if (error) {
            enqueueSnackbar('Error al eliminar la tarea', { variant: 'error' });
        } else {
            setTasks((prev: TaskT[]): TaskT[] =>
                prev.filter((t: TaskT): boolean => t.id !== task.id)
            );
            router.push('/');
        }
    };

    return (
        <Layout
            title={inputValue.substring(0, 20) + '...'}
            toggleTheme={toggleTheme}
            isTheme={isTheme}
        >
            <>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 2,
                        alignItems: 'center',
                        height: 'calc(100vh - 80px)',
                    }}
                >
                    <Box sx={{ width: { xs: '100%', sm: '66%', md: '50%' } }}>
                        <Card>
                            <CardHeader
                                title={`Entrada: ${inputValue}`}
                                subheader={`Creada ${formatDate(
                                    task.created_at
                                )}`}
                            />
                            <CardContent>
                                <TextField
                                    sx={{ marginTop: 2, marginBottom: 1 }}
                                    fullWidth
                                    placeholder="Nueva entrada"
                                    autoFocus
                                    multiline
                                    label="Nueva entrada"
                                    value={inputValue}
                                    onBlur={() => setTouched(true)}
                                    onChange={onInputValueChanged}
                                    helperText={
                                        isNotValid && 'Ingresa un valor'
                                    }
                                    error={isNotValid}
                                />
                                <FormControl>
                                    <FormLabel>Estado:</FormLabel>
                                    <RadioGroup
                                        row
                                        value={isStatus}
                                        onChange={onStatusChanged}
                                    >
                                        {validStatus.map(
                                            (option: {
                                                status: string;
                                                title: string;
                                            }): JSX.Element => (
                                                <FormControlLabel
                                                    key={option.status}
                                                    value={option.status}
                                                    control={<Radio />}
                                                    label={capitalize(
                                                        option.title
                                                    )}
                                                />
                                            )
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlinedIcon />}
                                    variant="contained"
                                    fullWidth
                                    onClick={onSave}
                                    disabled={
                                        inputValue.length <= 0 || isSaving
                                    }
                                >
                                    {isSaving ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
                <IconButton
                    onClick={onDelete}
                    sx={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        backgroundColor: 'red',
                    }}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
    );

    const { data: task, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', Number(id))
        .maybeSingle();

    if (error || !task) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            task: {
                ...task,
                created_at: task.created_at,
            },
        },
    };
};

export default TaskPage;
