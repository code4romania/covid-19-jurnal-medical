import React from "react";
import "./Box.scss";
import PropTypes from "prop-types";

const Box = ({ children, ...extraProps }) => {
  return (
    <div className="box" {...extraProps}>
      {children}
    </div>
  );
};

Box.propTypes = {
  children: PropTypes.node.isRequired
};

export default Box;
