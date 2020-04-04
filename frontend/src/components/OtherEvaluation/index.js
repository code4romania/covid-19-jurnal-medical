import React, { useState } from "react";
import Evaluation from "../Evaluation";
import EvaluationApi from "../../api/EvaluationApi";
import { Form } from "@code4ro/taskforce-fe-components";
import IntroOtherEvaluation from "./introOtherEvaluation";

const OtherEvaluation = () => {
  const [started, setStarted] = useState(false);
  const [dependant, setDependant] = useState(undefined);
  const evaluateCallback = (formState, options) => {
    return options[0];
  };

  const onFinishingForm = result =>
    EvaluationApi.sendSelfEvaluationResults(result.formId, result);

  if (started) {
    const selfEvaluationForm = EvaluationApi.getSelfEvaluationForm();
    return (
      <Evaluation>
        <div className={"dependant"}>{dependant}</div>
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
