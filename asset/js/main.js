import React from 'react'
import { render } from 'react-dom'
import createStore from './shared/store'
// import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Endpoint Modules
import App from './app'
import Qms from './qms'
import DailyTargets from './daily_targets'

const store = createStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      	<Route path="qms" component={Qms}></Route>
      	<Route path="dailytargets" component={DailyTargets}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
