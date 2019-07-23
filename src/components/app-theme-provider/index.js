// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {getThemeFromIdWithChanges} from '../../themes';

const mapStateToProps = state => ({
    theme: state.theme
});

type Props = {
    children: Node | Array<Node>,
    theme: Object
}

const AppThemeProvider = ({children, theme}: Props): Component => {
    const _theme = getThemeFromIdWithChanges(theme.id, theme);

    return (
        <ThemeProvider theme={_theme}>
            <CssBaseline>
                {children}
            </CssBaseline>
        </ThemeProvider>
    );
};

export default connect(mapStateToProps)(AppThemeProvider);
