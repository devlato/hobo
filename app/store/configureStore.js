import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';


export default function configureStore(initialState, browserHistory) {
  let getComposed = compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(browserHistory)),
      applyMiddleware(createLogger()));

  let createStoreWithMiddleware = getComposed(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
