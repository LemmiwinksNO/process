import React, { PropTypes } from 'react';;
import { Provider } from 'react-redux';

const Application = ({store, children}) => {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

Application.propTypes = {
	children: PropTypes.element.isRequired,
	store: PropTypes.object.isRequired
}

export default Application;
