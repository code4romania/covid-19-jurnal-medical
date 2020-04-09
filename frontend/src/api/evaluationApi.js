import api from "./api";

const EvaluationApi = {
  sendDependantEvaluationResult: (dependantId, formResults) =>
    api.post(`/form?id=${dependantId}`, formResults),

  getSelfEvaluationForm: async () => {
    const res = await api.get("/form/version");
    return JSON.parse(res.data.content);
  },

  sendSelfEvaluationResults: formResults => api.post("/form", formResults)
};

export default EvaluationApi;
