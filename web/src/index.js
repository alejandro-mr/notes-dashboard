// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard';
//import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

//import Store, { history } from './store';

//import 'jquery';
//import 'popper.js/dist/popper.js';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';

import { ApolloProvider } from "react-apollo";
import client from './client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
//Removed for development bring back for production build
//registerServiceWorker();
