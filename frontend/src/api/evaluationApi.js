import selfEvaluation from "../data/personal-assesment.json";
import otherEvaluation from "../data/other-assesment.json";
import api from "./api";

const EvaluationApi = {
  sendDependantEvaluationResult: (dependantId, formResults) =>
    api.post(`/form?id=${dependantId}`, formResults),

  getSelfEvaluationForm: () => selfEvaluation,

  getOtherEvaluationForm: () => otherEvaluation,

  sendSelfEvaluationResults: formResults => api.post("/form", formResults)
};

export default EvaluationApi;
