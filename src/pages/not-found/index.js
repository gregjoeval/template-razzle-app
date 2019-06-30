import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link, Typography} from '@material-ui/core';
import ContentLayout from '../../components/content-layout';
import ScreenLayout from '../../components/screen-layout';

const NotFound = () => (
    <ScreenLayout>
        <ContentLayout>
            <Typography variant={'h5'}>
                {'Not Found'}
            </Typography>
            <Typography variant={'body1'}>
                {'Oops, we couldn\'t find the page you were looking for...'}
            </Typography>
            <Typography>
                <Link
                    component={RouterLink}
                    to={'/'}
                    underline={'hover'}
                >
                    {'Home'}
                </Link>
            </Typography>
        </ContentLayout>
    </ScreenLayout>
);

export default NotFound;