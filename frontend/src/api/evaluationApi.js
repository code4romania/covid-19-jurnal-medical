import api from "./api";

const EvaluationApi = {
  sendDependantEvaluationResult: (dependantId, formResults) =>
    api.post(`/form?id=${dependantId}`, formResults),

  getEvaluationForm: async () => {
    const res = await api.get("/form/version");
    return JSON.parse(res.data.content);
  },

  sendSelfEvaluationResults: formResults => api.post("/form", formResults),

  sendEvaluationResults: (formResults, id) =>
    api.post("/form", formResults, { params: { id } })
};

export default EvaluationApi;
