import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./tabTitle.scss";

const TabTitle = ({ history, location: { pathname }, link, children }) => {
  return (
    <li
      className={link === pathname && "is-active"}
      onClick={() => history.push(link)}
    >
      <a>{children}</a>
    </li>
  );
};

export default withRouter(TabTitle);

TabTitle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired
};
