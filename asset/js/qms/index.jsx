// Question Management System

import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../shared/store';
import Application from '../shared/app';
import Qms from './container';
import { setGames, setHeaders, setNavItems, setTitle } from './duck';
import games from './games.json';
import headers from './headers.json';

// init store
const store = createStore();
store.dispatch(setGames(games));
store.dispatch(setHeaders(headers));
store.dispatch(setTitle('Admin Tools'))

ReactDOM.render(
  <Application store={store}><Qms/></Application>,
  document.getElementById('main')
)	
