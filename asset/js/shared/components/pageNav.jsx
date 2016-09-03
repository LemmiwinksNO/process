import React, { PropTypes } from 'react';;

const PageNav = ({navItems}) => (
  <div className="container admin-tabs-wrap">
    <div className="admin-nav-bar">
      <ul className="admin-nav-wrap" role="tablist">
      {navItems.map((navItem) => (
        <PageNavItem key={navItem.label} url={navItem.url} active={navItem.active} label={navItem.label} />
      ))}
      </ul>
    </div>
  </div>
);

PageNav.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

const PageNavItem = ({url, active, label}) => (
  <li className={"admin-nav-tab " + (active ? "active" : "")}>
    <a href={url} className="admin-nav-item">{label}</a>
  </li>
);

PageNavItem.propTypes = {
  active: PropTypes.bool,
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default PageNav;
