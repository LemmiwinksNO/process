import React from 'react';
import { Link, browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import NavToolbar from './navToolbar'

const style = {
  margin: 12,
};

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

	handleNavToggle = () => this.setState({open: !this.state.open});
	
	render() {
		return (
			<div>
				<AppBar
					title='Process App'
					// iconClassNameRight='muidocs-icon-navigation-expand-more'
			    iconElementRight={
			      <IconMenu
			        iconButtonElement={
			          <IconButton><MoreVertIcon /></IconButton>
			        }
			        targetOrigin={{horizontal: 'right', vertical: 'top'}}
			        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			      >
			        <MenuItem primaryText="Refresh" />
			        <MenuItem primaryText="Help" />
			        <MenuItem primaryText="Sign out" />
			      </IconMenu>
			    }
					onLeftIconButtonTouchTap={this.handleNavToggle}
					// onRightIconButtonTouchTap={onRightIconButtonTouchTap}
					onTitleTouchTap={onTitleTouchTap}
				/>
				<NavToolbar/>
				<Drawer open={this.state.open}>
        	<MenuItem
					  containerElement={<Link to="/" />}
            onClick={this.handleNavToggle}
					  primaryText="Home"
					  leftIcon={<FontIcon className="material-icons">cloud</FontIcon>} />
          <MenuItem
            containerElement={<Link to="/qms" />}
            onClick={this.handleNavToggle}
            primaryText="QMS"
            leftIcon={<FontIcon className="material-icons">people</FontIcon>} />
        	<MenuItem
					  containerElement={<Link to="/dailytargets" />}
            onClick={this.handleNavToggle}
					  primaryText="Daily Targets"
					  leftIcon={<FontIcon className="material-icons">pages</FontIcon>} />
        </Drawer>
			</div>
		)
	}
}

function onLeftIconButtonTouchTap(){
	console.log('onLeftIconButtonTouchTap');
}
function onRightIconButtonTouchTap(){
	console.log('onRightIconButtonTouchTap');
}
function onTitleTouchTap(){
	console.log('onTitleTouchTap');
}

