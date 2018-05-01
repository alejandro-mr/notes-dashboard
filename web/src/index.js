import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard';
//import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Store, { history } from './store';

import initialState from './notes-test.json';

//import 'jquery';
//import 'popper.js/dist/popper.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

/*
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDbbqVIWybNLInLWQ47xxt2xpmtUvhQrnw",
  authDomain: "notes-dashboard.firebaseapp.com",
  databaseURL: "https://notes-dashboard.firebaseio.com",
  projectId: "notes-dashboard",
  storageBucket: "",
  messagingSenderId: "440911898847"
};
firebase.initializeApp(config);

let notesRef = firebase.database().ref('/notes/');
notesRef.once('value').then(function(snapshot) {
  const StoreInstance = Store({ notes: snapshot.val()});
});
*/
const StoreInstance = Store(initialState);

ReactDOM.render(
  <Provider store={StoreInstance}>
    <ConnectedRouter history={history}>
      <Dashboard />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
//Removed for development bring back for production build
//registerServiceWorker();
