import express from 'express';
import React from 'react';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import ReactDomServer from 'react-dom/server';
import {ServerStyleSheets} from '@material-ui/styles';
import AppThemeProvider from './components/app-theme-provider';
import configureStore from './store/configure-store';
import App from './App';
import favicon from '../public/favicon.ico';
import favicon16 from '../public/favicon-16x16.png';
import favicon32 from '../public/favicon-32x32.png';
import appleTouchIcon from '../public/apple-touch-icon.png';
import manifest from '../public/manifest.json';
import serialize from 'serialize-javascript';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

/* eslint-disable */
const renderFullPage = (html, css, preloadedState) => (`
  <!doctype html>
  <html lang="en">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Superb Owl</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
      <link rel="shorcut icon" type="image/png" sizes="32x32" href="${favicon32}">
      <link rel="shorcut icon" type="image/png" sizes="16x16" href="${favicon16}">
      <link rel="shorcut icon" type="image/ico" href="${favicon}">
      <!--<link rel="manifest" href="${manifest}">-->
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500">
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        css
          ? `<style id='jss-server-side'>${css}</style>`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
      </script>
    </body>
  </html>
`);
/* eslint-enable */

const handleRender = (req, res) => {

    // Create a new Redux store instance
    const initialState = {};
    const store = configureStore(initialState);

    // This is needed in order to inject the critical CSS.
    const sheets = new ServerStyleSheets();

    const context = {};
    const html = ReactDomServer.renderToString(
        sheets.collect(
            <StaticRouter
                context={context}
                location={req.url}
            >
                <Provider store={store}>
                    <AppThemeProvider>
                        <App />
                    </AppThemeProvider>
                </Provider>
            </StaticRouter>
        )
    );

    if (context.url) {
        res.redirect(context.url);
    } else {
        const css = sheets.toString();
        const preloadedState = store.getState();
        const renderedPage = renderFullPage(html, css, preloadedState);
        res.status(200).send(renderedPage);
    }
};

const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .use(handleRender);

export default server;
