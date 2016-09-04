import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Navigation from '../navigation'

const Home = ({ children }) => (
	<MuiThemeProvider>
	  <div>
	  	<Navigation />
	    {children}
	  </div>
	</MuiThemeProvider>
)

export default Home;
