import React, { FC, JSX } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import Header from '@components/Header';

interface LayoutT {
    title?: string;
    toggleTheme?: () => void;
    isTheme?: {
        palette: {
            mode: string;
        };
    };
    children: JSX.Element;
}

const Layout: FC<LayoutT> = ({
    title = 'OpenJira',
    toggleTheme,
    isTheme,
    children,
}: LayoutT): JSX.Element => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Header toggleTheme={toggleTheme} isTheme={isTheme} />
            <Box>{children}</Box>
        </Box>
    );
};

export default Layout;
