// @flow
import React, {Component, Fragment} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {AppBar} from '@material-ui/core';
import type ToolBar from '@material-ui/core/Toolbar';
import SectionLayout from '../section-layout';

// definition for when the layout displays a header
const hasHeader = (header) => Boolean(header);

// definition for when the layout displays a footer
const hasFooter = (footer) => Boolean(footer);

type Props = {
    children: Array<Node> | Node,
    classes: Object,
    footer: ToolBar,
    header: ToolBar
};

const ScreenLayout = ({children, classes, footer, header}: Props): Component => {
    // renders the header
    const renderHeader = (headerChildren: ToolBar) => (hasHeader(headerChildren)
        ? (
            <AppBar
                className={classes.header}
                position={'fixed'}
            >
                {headerChildren}
            </AppBar>
        )
        : null
    );

    // renders the footer
    const renderFooter = (footerChildren: ToolBar) => (hasFooter(footerChildren)
        ? (
            <AppBar
                className={classes.footer}
                position={'fixed'}
            >
                {footerChildren}
            </AppBar>
        )
        : null
    );

    return (
        <Fragment>
            {renderHeader(header)}
            <main className={`${classes.main} ${hasHeader(header) || hasFooter(footer) ? classes.hasHeaderOrFooter : ''}`}>
                <div className={classes.screenPadding}>
                    <SectionLayout
                        lg={7}
                        md={9}
                        sm={11}
                        xl={5}
                        xs={12}
                    >
                        {children}
                    </SectionLayout>
                </div>
            </main>
            {renderFooter(footer)}
        </Fragment>
    );
};

const styles = theme => ({
    main: {
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 2
    },
    hasHeaderOrFooter: {
        paddingTop: theme.spacing.unit * 9,
        paddingBottom: theme.spacing.unit * 9
    },
    screenPadding: {
        [theme.breakpoints.up('xs')]: {
            paddingTop: theme.spacing.unit * 3,
            paddingBottom: theme.spacing.unit * 3
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing.unit * 5,
            paddingBottom: theme.spacing.unit * 5
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing.unit * 7,
            paddingBottom: theme.spacing.unit * 7
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.spacing.unit * 9,
            paddingBottom: theme.spacing.unit * 9
        },
        [theme.breakpoints.up('xl')]: {
            paddingTop: theme.spacing.unit * 11,
            paddingBottom: theme.spacing.unit * 11
        }
    },
    header: {
        top: 0,
        bottom: 'auto',
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('xs')]: {
            paddingTop: theme.spacing.unit * 0.5,
            paddingBottom: theme.spacing.unit * 0.5
        }
    },
    footer: {
        top: 'auto',
        bottom: 0,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('xs')]: {
            paddingTop: theme.spacing.unit * 0.5,
            paddingBottom: theme.spacing.unit * 0.5
        }
    }
});

export default withStyles(styles)(ScreenLayout);
