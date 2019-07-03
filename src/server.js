import express from 'express';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDomServer from 'react-dom/server';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider, ServerStyleSheets} from '@material-ui/styles';
import {getThemeFromName} from './themes';
import {THEMES} from './constants';
import App from './App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

/* eslint-disable */
const renderFullPage = (html, css) =>
 `<!doctype html>
  <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Superb Owl</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="apple-touch-icon" sizes="180x180" href="../public/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon-16x16.png">
      <link rel="icon" href="../public/favicon.ico">
      <link rel="manifest" href="../public/site.webmanifest">
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
    </body>
  </html>`;
/* eslint-enable */

const handleRender = (req, res) => {

    // This is needed in order to inject the critical CSS.
    const sheets = new ServerStyleSheets();

    // Create a theme instance.
    const theme = getThemeFromName(THEMES.DEFAULT);

    const context = {};
    const html = ReactDomServer.renderToString(
        sheets.collect(
            <StaticRouter
                context={context}
                location={req.url}
            >
                <ThemeProvider
                    theme={theme}
                >
                    <CssBaseline>
                        <App />
                    </CssBaseline>
                </ThemeProvider>
            </StaticRouter>
        )
    );

    if (context.url) {
        res.redirect(context.url);
    } else {
        const css = sheets.toString();
        const renderedPage = renderFullPage(html, css);
        res.status(200).send(renderedPage);
    }
};

const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .use(handleRender);

export default server;
