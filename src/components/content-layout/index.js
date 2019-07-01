// @flow
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';

const handleSpacing = input => {
    switch (input) {
        case 0:
        default:
            return 0;
        case 1:
        case 8:
            return 1;
        case 2:
        case 16:
            return 2;
        case 3:
        case 24:
            return 3;
        case 4:
        case 32:
            return 4;
        case 5:
        case 40:
            return 5;
    }
};

type Props = {
    alignContent: string,
    alignItems: string,
    children: Array<Node> | Node,
    classes: Object,
    className: string,
    direction: string,
    enableBreakpointSpacing: boolean,
    justify: string,
    spacing: number,
    wrap: string,
    xs: string,
    sm: string,
    md: string,
    lg: string,
    xl: string
};

const ContentLayout = (
    {
        alignContent = 'flex-start',
        alignItems = 'stretch',
        children,
        classes,
        className,
        direction = 'column',
        enableBreakpointSpacing = false,
        justify = 'flex-start',
        spacing = 0,
        wrap = 'nowrap',
        xs = 'auto',
        sm = 'auto',
        md = 'auto',
        lg = 'auto',
        xl = 'auto'
    }: Props
): Component => {
    const spacingProp = handleSpacing(spacing);
    return (
        <Grid
            alignContent={alignContent}
            alignItems={alignItems}
            container={true}
            direction={direction}
            justify={justify}
            spacing={spacingProp}
            wrap={wrap}
        >
            {[].concat(children).map((child, index) => (
                <Grid
                    className={`${classes.centerContent} ${enableBreakpointSpacing ? classes.breakpointSpacing : ''} ${Boolean(className) ? className : ''}`}
                    item={true}
                    key={index}
                    lg={lg}
                    md={md}
                    sm={sm}
                    xl={xl}
                    xs={xs}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

const styles = (theme) => ({
    centerContent: {
        textAlign: 'center'
    },
    breakpointSpacing: {
        marginBottom: 0,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(1)
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(2)
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: theme.spacing(2.5)
        },
        [theme.breakpoints.up('xl')]: {
            marginBottom: theme.spacing(3)
        }
    }
});

export default withStyles(styles)(ContentLayout);
