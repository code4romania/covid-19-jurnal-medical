import React from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";

const IntroSelfEvaluation = ({ onFinish }) => {
  return (
    <div>
      <Button onClick={() => onFinish()}>Completeaza formularul</Button>
    </div>
  );
};

export default IntroSelfEvaluation;

IntroSelfEvaluation.propTypes = {
  onFinish: PropTypes.func.isRequired
};
