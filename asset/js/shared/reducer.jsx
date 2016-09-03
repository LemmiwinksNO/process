import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// reducers
import qms from '../qms/duck';

export default combineReducers({
  qms,
  routing: routerReducer
});
