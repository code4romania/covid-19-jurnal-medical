import React, { useState } from "react";
import { Form } from "@code4ro/taskforce-fe-components";
import Evaluation from "../Evaluation";
import IntroSelfEvaluation from "./introSelfEvaluation";
import EvaluationApi from "../../api/evaluationApi";

const SelfEvaluation = () => {
  const [started, setStarted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const evaluateCallback = (formState, options) => {
    return options[0];
  };

  const onFinishingForm = result =>
    EvaluationApi.sendSelfEvaluationResults(result);

  if (started) {
    const selfEvaluationForm = EvaluationApi.getSelfEvaluationForm();
    return (
      <Evaluation>
        <Form
          data={selfEvaluationForm}
          evaluateForm={evaluateCallback}
          onFinishingForm={onFinishingForm}
        />
      </Evaluation>
    );
  } else {
    return (
      <Evaluation>
        <IntroSelfEvaluation
          onFinish={() => {
            setStarted(true);
          }}
        />
      </Evaluation>
    );
  }
};

export default SelfEvaluation;
