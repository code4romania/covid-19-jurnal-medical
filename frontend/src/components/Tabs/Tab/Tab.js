import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Hero } from "@code4ro/taskforce-fe-components";

import "./Tab.scss";

const Tab = ({ title, url }) => {
  return (
    <NavLink
      role="button"
      className="tab"
      activeClassName="tab--active"
      to={url}
    >
      <Hero title={title} useFallbackIcon={true} />
    </NavLink>
  );
};

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Tab;
