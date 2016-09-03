import React, { PropTypes } from 'react';;

const PageHeader = ({title}) => (
  <div className="ws-page-header dreamer-background">
    <h3>{title}</h3>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PageHeader;
