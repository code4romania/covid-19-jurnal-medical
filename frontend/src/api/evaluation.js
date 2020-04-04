import api from "./api";

export const submitFormResults = result =>
  api.post(`/form?id=${result.formId}`, result);
