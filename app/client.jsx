import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import getRoutes from './routes';
import configureStore from 'store/configureStore';


const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);


// Installs hooks that always keep react-router and redux store in sync
let history = syncHistoryWithStore(browserHistory, store);


render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes()}
    </Router>
  </Provider>, document.getElementById('app')
);
