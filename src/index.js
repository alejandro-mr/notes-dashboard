import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Store, { history } from './store';

import 'jquery';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
    <ConnectedRouter history={history}>
      <App />
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
