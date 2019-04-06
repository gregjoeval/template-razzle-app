import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import {MuiThemeProvider, CssBaseline, createGenerateClassName} from "@material-ui/core";
import {getThemeFromName} from "./themes";
import {JssProvider } from "react-jss";
import {STORAGE_KEYS, THEMES} from "./constants";

const themeIdStorage = window.localStorage.getItem(STORAGE_KEYS.THEME_ID);
const themeId = themeIdStorage || THEMES.DEFAULT;

if (!themeIdStorage || themeIdStorage !== themeId) {
  window.localStorage.setItem(STORAGE_KEYS.THEME_ID, themeId);
}

const theme = getThemeFromName(themeId);

// Create a new class name generator.
const generateClassName = createGenerateClassName();

hydrate(
  <BrowserRouter>
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </MuiThemeProvider>
    </JssProvider>
  </BrowserRouter>,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
);

if (module.hot) {
  module.hot.accept();
}
