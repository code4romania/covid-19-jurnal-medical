import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import "./tabTitle.scss";

const TabTitle = ({ link, children }) => {
  const { pathname } = useLocation();
  return (
    <li className={link === pathname ? "is-active" : undefined}>
      <a href={link}>{children}</a>
    </li>
  );
};

export default TabTitle;

TabTitle.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired
};
