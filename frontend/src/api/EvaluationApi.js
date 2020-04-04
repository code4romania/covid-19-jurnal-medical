import selfEvaluation from "../data/personal-assesment.json";
import api from "../api";

const EvaluationApi = {
  getSelfEvaluationForm: () => selfEvaluation,
  sendSelfEvaluationResults: (formId, formResults) => {
    api.post(`http://localhost:5008/api/form?id=${formId}`, formResults);
  }
};

export default EvaluationApi;
