import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Hero } from "@code4ro/taskforce-fe-components";

import "./Tab.scss";

const Tab = ({ title, clickHandler, isActive, url }) => {
  return (
    <Link
      role="button"
      onClick={clickHandler}
      className={`tab ${isActive && "tab--active"}`}
      to={url}
    >
      <Hero title={title} useFallbackIcon={true} />
    </Link>
  );
};

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};

export default Tab;
