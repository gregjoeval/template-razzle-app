import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import AppThemeProvider from './components/app-theme-provider';
import configureStore from './store/configure-store';
import App from './App';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = Reflect.get(window, '__PRELOADED_STATE__');
// Allow the passed state to be garbage-collected
Reflect.deleteProperty(window, '__PRELOADED_STATE__');
// Create Redux store with initial state
const store = configureStore(preloadedState);

// // need to update state
// window.__PRELOADED_STATE__ = preloadedState;

hydrate(
    <BrowserRouter>
        <Provider store={store}>
            <AppThemeProvider>
                <App />
            </AppThemeProvider>
        </Provider>
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
