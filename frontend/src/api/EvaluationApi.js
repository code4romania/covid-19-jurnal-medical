import selfEvaluation from "../data/personal-assesment.json";
import api from "../api";

const EvaluationApi = {
  getDependants: async () => {
    const result = await api.get("http://localhost:5008/api/profile/family");

    return result.data.map(member => member["fullName"]);
  },
  getSelfEvaluationForm: () => selfEvaluation,
  sendSelfEvaluationResults: (formId, formResults) => {
    api.post(`http://localhost:5008/api/form?id=${formId}`, formResults);
  }
};

export default EvaluationApi;
