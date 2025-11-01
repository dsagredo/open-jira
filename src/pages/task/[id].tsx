import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {
    capitalize,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Button,
    Grid,
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
import { useSupabase } from '@store/context';
import { createClient } from '@supabase/supabase-js';

const validStatus = ['pending', 'in-progress', 'finished'];

const TaskPage: FC = ({ task, toggleTheme, isTheme }) => {
    const [inputValue, setInputValue] = useState(task.description);
    const [isStatus, setStatus] = useState(task.status);
    const [touched, setTouched] = useState(false);
    const router = useRouter();
    const supabase = useSupabase();

    const isNotValid = useMemo(
        () => inputValue.length <= 0 && touched,
        [inputValue, touched]
    );

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) =>
        setInputValue(event.target.value);

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) =>
        setStatus(event.target.value);

    const onSave = async () => {
        if (inputValue.trim().length === 0) return;
        await supabase
            .from('tasks')
            .update({ description: inputValue, status: isStatus })
            .eq('id', task.id);
    };

    const onDelete = async () => {
        await supabase.from('tasks').delete().eq('id', task.id);

        router.push('/');
    };

    return (
        <Layout
            title={inputValue.substring(0, 20) + '...'}
            toggleTheme={toggleTheme}
            isTheme={isTheme}
        >
            <>
                <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
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
                                        {validStatus.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlinedIcon />}
                                    variant="contained"
                                    fullWidth
                                    onClick={onSave}
                                    disabled={inputValue.length <= 0}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
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
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    const { data: task, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
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
