import React, { useState } from "react";
import Evaluation from "../Evaluation";
import EvaluationApi from "../../api/evaluationApi";
import { Form } from "@code4ro/taskforce-fe-components";
import IntroOtherEvaluation from "./introOtherEvaluation";

const OtherEvaluation = () => {
  const [started, setStarted] = useState(false);
  const [dependant, setDependant] = useState(undefined);
  const evaluateCallback = (formState, options) => {
    return options[0];
  };

  const onFinishingForm = result =>
    EvaluationApi.sendDependantEvaluationResult(dependant, result);

  if (started) {
    const otherEvaluationForm = EvaluationApi.getOtherEvaluationForm();
    return (
      <Evaluation>
        <Form
          data={otherEvaluationForm}
          evaluateForm={evaluateCallback}
          onFinishingForm={onFinishingForm}
        />
      </Evaluation>
    );
  } else {
    return (
      <Evaluation>
        <IntroOtherEvaluation
          onFinish={dependant => {
            setDependant(dependant);
            setStarted(true);
          }}
        />
      </Evaluation>
    );
  }
};

export default OtherEvaluation;
