import React from "react";
import PropTypes from "prop-types";
import ArrowRed from "../../../../images/arrow-red.svg";
import ArrowGreen from "../../../../images/arrow-green.svg";
import "./Percentage.scss";

const Percentage = ({ value, success }) => {
  const image = success ? ArrowGreen : ArrowRed;
  const style = success ? "success" : "danger";
  return (
    <div className={["percentage", style].join(" ")}>
      {value}%
      <img src={image} alt="" />
    </div>
  );
};

Percentage.propTypes = {
  value: PropTypes.number,
  success: PropTypes.bool
};

export default Percentage;
