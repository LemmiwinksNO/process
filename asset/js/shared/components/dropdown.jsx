import React, { PropTypes } from 'react';

export default class Dropdown extends React.Component {
	constructor() {
		super();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
	}
	componentDidMount() {
		let gameSelect = document.querySelector('.game-select');
		gameSelect.addEventListener('change', this.props.onChange);
	}
	componentWillUnmount() {
		let gameSelect = document.querySelector('.game-select');
		gameSelect.removeEventListener('change', this.props.onChange);
	}
	render() {
		const { items } = this.props;
		return (
		  <span className="selectpicker-wrap">
		    <select className="selectpicker game-select bs-select-hidden" defaultValue="select-game">
					<option disabled value="select-game">Select Game</option>
		      {items.map((item) => (
		        <option key={item.id} value={item.id}>{item.label}</option>
		      ))}
		    </select>
		  </span>
		)
	}
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func
}
