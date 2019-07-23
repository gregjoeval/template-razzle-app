// @flow
import * as R from 'ramda';
import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {getThemeFromIdWithChanges, getThemeFromId} from '../../themes';

const mapStateToProps = state => ({
    theme: state.theme
});

type Props = {
    children: Node | Array<Node>,
    theme: Object
}

const AppThemeProvider = ({children, theme}: Props): Component => {
    const themeDefaults = getThemeFromId(theme.id);
    const [currentTheme, setCurrentTheme] = useState(themeDefaults);

    useEffect(() => {
        const diffs = R.difference([theme], [currentTheme]);
        if (theme && diffs.length > 0) {
            console.log(diffs);
            console.log('theme change');
            const newTheme = getThemeFromIdWithChanges(theme.id, theme);
            setCurrentTheme(newTheme);
        }
    }, [theme]);


    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline>
                {children}
            </CssBaseline>
        </ThemeProvider>
    );
};

export default connect(mapStateToProps)(AppThemeProvider);
