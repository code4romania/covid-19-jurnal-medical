import React from "react";
import PropTypes from "prop-types";
import { Hero } from "@code4ro/taskforce-fe-components";

import "./Tab.scss";

const Tab = ({ title, clickHandler, isActive }) => {
  return (
    <a
      role="button"
      onClick={clickHandler}
      className={`tab ${isActive && "tab--active"}`}
    >
      <Hero title={title} useFallbackIcon={true} />
    </a>
  );
};

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default Tab;
