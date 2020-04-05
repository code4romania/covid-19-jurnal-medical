import React, { useEffect, useState } from "react";
import Evaluation from "../Evaluation";
import EvaluationApi from "../../api/evaluationApi";
import { Form } from "@code4ro/taskforce-fe-components";
import IntroOtherEvaluation from "./introOtherEvaluation";

const OtherEvaluation = () => {
  const [started, setStarted] = useState(false);
  const [dependant, setDependant] = useState(null);
  const [evaluationForm, setEvaluationForm] = useState(null);

  useEffect(() => {
    EvaluationApi.getOtherEvaluationForm().then(setEvaluationForm);
  }, []);
  const evaluateCallback = (formState, options) => {
    return options[0];
  };

  const onFinishingForm = result =>
    EvaluationApi.sendDependantEvaluationResult(dependant, result);

  if (started) {
    return (
      <Evaluation>
        <Form
          data={evaluationForm}
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
