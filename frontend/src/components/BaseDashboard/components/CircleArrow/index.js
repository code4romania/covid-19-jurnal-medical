import React from "react";
import PropTypes from "prop-types";
import "./CircleArrow.scss";

const CircleArrow = ({ type }) => (
  <div className={["circle", type].join(" ")}>
    <img src={require("../../../../images/arrow-right.svg")} alt="" />
  </div>
);

CircleArrow.propTypes = {
  type: PropTypes.oneOf(["error", "info"])
};

export default CircleArrow;
