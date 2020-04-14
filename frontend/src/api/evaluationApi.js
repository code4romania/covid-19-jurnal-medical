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
    api.post("/form", formResults, { params: { id } }),

  getEvaluationResults: async () => {
    const { data } = await api.get("form");

    return data;
  }
};

export default EvaluationApi;
