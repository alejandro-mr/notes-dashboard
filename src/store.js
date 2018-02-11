import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from  './reducers';

export const history = createHistory();

const middleware = [
  routerMiddleware(history)
];


export default(initialState) => {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware)
  ));
}
