import React from 'react'
import ReactDOM from 'react-dom'
import createStore from '../store'
// import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// Endpoint Modules
import QmsContainer from '../../qms'

const store = createStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={QmsContainer}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)