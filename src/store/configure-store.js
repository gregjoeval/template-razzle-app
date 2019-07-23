import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as R from 'ramda';

const logger = store => next => action => {
    if (process.env.NODE_ENV === 'development' || true) {
        // eslint-disable-next-line no-console
        console.log('dispatching', action);
        // eslint-disable-next-line prefer-reflect
        const result = R.call(next, action);
        // eslint-disable-next-line no-console
        console.log('next state', store.getState());
        return result;
    }

    return null;
};

const crashReporter = () => next => action => {
    if (process.env.NODE_ENV === 'development' || true) {
        try {
            return next(action);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Caught an exception!', err);
            throw err;
        }
    }

    return null;
};

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk, crashReporter, logger)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            // eslint-disable-next-line global-require
            // const nextRootReducer = require('../reducers').default;
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};

export default configureStore;