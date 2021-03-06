import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import history from '../routes/history';

import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

// const tronMiddleware = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer : createStore;

const store = createStore(
  connectRouter(history)(reducers),
  compose(
    applyMiddleware(...middlewares),
    // tronMiddleware(),
  ),
);

sagaMiddleware.run(sagas);

export default store;
