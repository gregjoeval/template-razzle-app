import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import {CssBaseline, MuiThemeProvider, createGenerateClassName} from "@material-ui/core";
import {SheetsRegistry, JssProvider } from "react-jss";
import {getThemeFromName} from "./themes";
import serialize from 'serialize-javascript';
import {THEMES} from "./constants";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

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
      <script>
        window.__PRELOADED_STATE__ = ${serialize(finalState)}
      </script>
    </body>
  </html>`;

function handleRender(req, res) {
  
  // This is needed in order to deduplicate the injection of CSS in the page.
  const sheetsManager = new WeakMap();
  
  // This is needed in order to inject the critical CSS.
  const sheetsRegistry = new SheetsRegistry();
  
  // Create a theme instance.
  const theme = getThemeFromName(THEMES.DEFAULT);
  
  // Create a new class name generator.
  const generateClassName = createGenerateClassName();
  
  const context = {};
  const html = renderToString(
    <StaticRouter context={context} location={req.url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  );
  
  const css = sheetsRegistry.toString();
  
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(renderFullPage(html, css));
  }
}

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(handleRender);

export default server;
