import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {getThemeFromName} from './themes';
import {STORAGE_KEYS, THEMES} from './constants';
import App from './App';

const themeIdStorage = window.localStorage.getItem(STORAGE_KEYS.THEME_ID);
const themeId = themeIdStorage || THEMES.DEFAULT;

if (!themeIdStorage || themeIdStorage !== themeId) {
    window.localStorage.setItem(STORAGE_KEYS.THEME_ID, themeId);
}

const theme = getThemeFromName(themeId);

hydrate(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <App />
            </CssBaseline>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root'),
    () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) { jssStyles.parentNode.removeChild(jssStyles); }
    }
);

if (module.hot) {
    module.hot.accept();
}
