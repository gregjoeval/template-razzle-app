import express from 'express';

let app = require('./server').default;

if (module.hot) {
    module.hot.accept('./server', () => {
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
const host = process.env.HOST || '0.0.0.0';
const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
const url = `${protocol}://${host}:${port}`;

export default express()
    .use((req, res) => app.handle(req, res))
    .listen(port, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`> Started on ${url}`);
    });