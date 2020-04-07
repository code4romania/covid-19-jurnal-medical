import React from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import "./evalutation.scss";

const StartFormButton = ({ onClick }) => {
  return (
    <div className={"call-to-action"}>
      <Button onClick={onClick} size={"large"} type={"warning"}>
        Completeaza formularul
      </Button>
    </div>
  );
};

export default StartFormButton;

StartFormButton.propTypes = {
  onClick: PropTypes.func
};
