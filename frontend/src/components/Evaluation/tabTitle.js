import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import "./tabTitle.scss";

const TabTitle = ({ link, children }) => {
  const history = useHistory();
  const pathname = useLocation().pathname;
  return (
    <li
      className={link === pathname && "is-active"}
      onClick={() => history.push(link)}
    >
      <a>{children}</a>
    </li>
  );
};

export default TabTitle;

TabTitle.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired
};
