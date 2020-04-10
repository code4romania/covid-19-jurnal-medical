import React from "react";
import EvaluationApi from "../../../api/evaluationApi";
import EvaluationForm from "../evaluationForm";

const SelfEvaluation = () => {
  return (
    <EvaluationForm
      getForm={EvaluationApi.getEvaluationForm}
      sendResults={EvaluationApi.sendSelfEvaluationResults}
    />
  );
};

export default SelfEvaluation;
