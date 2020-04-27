import React from "react";
import * as PropTypes from "prop-types";

const defaultText = "Datele se încarcă";

const LoadingPlaceholder = ({ text = defaultText }) => {
  return <div>{text}</div>;
};

export default LoadingPlaceholder;

LoadingPlaceholder.propTypes = {
  text: PropTypes.string
};
