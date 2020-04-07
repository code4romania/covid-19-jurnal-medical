import React from "react";
import EvaluationApi from "../../api/evaluationApi";
import EvaluationForm from "../Evaluation/evaluationForm";

const SelfEvaluation = () => {
  return (
    <EvaluationForm
      getForm={EvaluationApi.getSelfEvaluationForm}
      sendResults={formResults => {
        EvaluationApi.sendSelfEvaluationResults(formResults);
      }}
      introType={"SELF"}
    />
  );
};

export default SelfEvaluation;
