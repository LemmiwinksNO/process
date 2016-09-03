import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducer';

export default function(initialState) {
  const logger = createLogger();
	const store = createStore(reducer, initialState, compose(
	  applyMiddleware(thunk, logger),
	  window.devToolsExtension ? window.devToolsExtension() : f => f
	));

  return store
}
