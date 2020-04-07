import React from "react";
import EvaluationApi from "../../api/evaluationApi";
import EvaluationForm from "../Evaluation/evaluationForm";

const OtherEvaluation = () => {
  return (
    <EvaluationForm
      getForm={EvaluationApi.getOtherEvaluationForm}
      sendResults={(formResults, formIntro) => {
        EvaluationApi.sendDependantEvaluationResult(formIntro, formResults);
      }}
      introType={"OTHER"}
    />
  );
};

export default OtherEvaluation;
