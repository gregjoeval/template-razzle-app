import React, {useEffect, useState} from 'react';
import {Typography, IconButton} from '@material-ui/core';
import {Brightness2 as DarkThemeIcon, Brightness5 as LightThemeIcon} from '@material-ui/icons';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import Header from '../../components/header';
import {STORAGE_KEYS, THEMES} from '../../constants';

const Home = () => {
    const [themeId, setThemeId] = useState(THEMES.DEFAULT);

    useEffect(() => {
        const themeIdStorage = window.localStorage.getItem(STORAGE_KEYS.THEME_ID);
        setThemeId(themeIdStorage);
    }, []);

    const header = (
        <Header
            alignItems={'center'}
            justify={'space-between'}
        >
            <Typography
                color={'textPrimary'}
                variant={'h5'}
            >
                {'Title'}
            </Typography>
            <IconButton
                onClick={() => {
                    const newThemeId = themeId === THEMES.EXAMPLE ? THEMES.DEFAULT : THEMES.EXAMPLE;
                    window.localStorage.setItem(STORAGE_KEYS.THEME_ID, newThemeId);
                    setThemeId(newThemeId);
                }}
            >
                {
                    themeId === THEMES.DEFAULT
                        ? <LightThemeIcon color={'action'}/>
                        : <DarkThemeIcon color={'action'}/>
                }
            </IconButton>
        </Header>
    );

    return (
        <ScreenLayout
            header={header}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={24}
            >
                <Typography variant={'h5'}>
                    {'Index'}
                </Typography>
                <Typography variant={'body1'}>
                    {'This is the index page.'}
                </Typography>
                <Typography variant={'body1'}>
                    {'Content goes here.'}
                </Typography>
            </ContentLayout>
        </ScreenLayout>
    );
};

export default Home;