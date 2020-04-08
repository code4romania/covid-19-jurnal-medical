import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ArrowRightSvg } from "../../../../images/filter-icon.svg";
import "./CircleArrow.scss";

const CircleArrow = ({ type }) => (
  <div className={["circle", type].join(" ")}>
    <ArrowRightSvg />
  </div>
);

CircleArrow.propTypes = {
  type: PropTypes.oneOf(["error", "info"])
};

export default CircleArrow;
