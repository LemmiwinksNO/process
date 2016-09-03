import React, { PropTypes } from 'react';

const ContentFiller = ({hidden = false, title}) => {
	let className = "content-fill " + hidden;
	if (hidden) className += ' hidden';
	return (
	  <div className={className}>
	    <p className="lead">{title}</p>
	  </div> 
	)
}

ContentFiller.propTypes = {
  title: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired
}

export default ContentFiller;
