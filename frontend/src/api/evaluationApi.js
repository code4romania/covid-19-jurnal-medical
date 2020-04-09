// import selfEvaluation from "../data/personal-assesment.json";
import otherEvaluation from "../data/other-assesment.json";
import api from "./api";

const EvaluationApi = {
  sendDependantEvaluationResult: (dependantId, formResults) =>
    api.post(`/form?id=${dependantId}`, formResults),

  getSelfEvaluationForm: async () => {
    const res = await api.get("/form/version");
    return JSON.parse(res.data.content);
  },

  //in preparation for an api call so that nothing outside this method will change
  // eslint-disable-next-line no-undef
  getOtherEvaluationForm: async () => Promise.resolve(otherEvaluation),

  sendSelfEvaluationResults: formResults => api.post("/form", formResults)
};

export default EvaluationApi;
