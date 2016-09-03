// Question Management System

import React from 'react';
import { connect } from 'react-redux';
import QmsContainer from './container';
import { setGames, setHeaders, setTitle } from './duck';
import games from './games.json';
import headers from './headers.json';

const Qms = ({dispatch}) => {
	dispatch(setGames(games));
	dispatch(setHeaders(headers));
	dispatch(setTitle('Admin Tools'));

	return <QmsContainer/>
}

const mapStateToProps = (state) => { return {} }

export default connect(mapStateToProps)(Qms);
