import selfEvaluation from "../data/personal-assesment.json";
import api from "../api";

const EvaluationApi = {
  getProfile: async () => {
    const result = await api.get(
      `${process.env.REACT_APP_API_URL}/api/profile`
    );

    return result.data;
  },

  sendDependantEvaluationResult: (dependantId, formResults) => {
    api.post(
      `${process.env.REACT_APP_API_URL}/api/form?id=${dependantId}`,
      formResults
    );
  },
  getDependants: async () => {
    const result = await api.get(
      `${process.env.REACT_APP_API_URL}/api/profile/family`
    );

    return result.data.map(member => {
      return {
        fullName: member["fullName"],
        id: member["id"]
      };
    });
  },
  getSelfEvaluationForm: () => selfEvaluation,
  sendSelfEvaluationResults: (formId, formResults) => {
    api.post(
      `${process.env.REACT_APP_API_URL}/api/form?id=${formId}`,
      formResults
    );
  }
};

export default EvaluationApi;
