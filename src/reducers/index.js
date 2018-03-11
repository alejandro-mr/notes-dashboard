import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import notesReducer from './notes';
import topReducer from './top';

export default combineReducers({
  router: routerReducer,
  notes: notesReducer,
  top: topReducer
});
