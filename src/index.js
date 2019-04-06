// import http from 'http';
//
// let app = require('./server').default;
//
// const server = http.createServer(app);
//
// let currentApp = app;
//
// const port = process.env.PORT || 3000;
//
// server.listen(port, error => {
//   if (error) {
//     console.log(error);
//   }
//
//   console.log(`🚀 started on port ${port}`);
// });
//
// if (module.hot) {
//   console.log('✅  Server-side HMR Enabled!');
//
//   module.hot.accept('./server', () => {
//     console.log('🔁  HMR Reloading `./server`...');
//
//     try {
//       app = require('./server').default;
//       server.removeListener('request', currentApp);
//       server.on('request', app);
//       currentApp = app;
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }

import express from 'express';

let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });