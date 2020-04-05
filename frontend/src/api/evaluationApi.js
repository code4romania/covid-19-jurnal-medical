import selfEvaluation from "../data/personal-assesment.json";
import otherEvaluation from "../data/other-assesment.json";
import api from "./api";

const EvaluationApi = {
  sendDependantEvaluationResult: (dependantId, formResults) =>
    api.post(`/form?id=${dependantId}`, formResults),

  //in preparation for an api call so that nothing outside this method will change
  // eslint-disable-next-line no-undef
  getSelfEvaluationForm: async () => Promise.resolve(selfEvaluation),

  //in preparation for an api call so that nothing outside this method will change
  // eslint-disable-next-line no-undef
  getOtherEvaluationForm: async () => Promise.resolve(otherEvaluation),

  sendSelfEvaluationResults: formResults => api.post("/form", formResults)
};

export default EvaluationApi;
