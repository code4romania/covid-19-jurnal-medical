import axios from "axios";
import { getUserToken } from "./auth";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_IDP_URL}/api`
});

api.interceptors.request.use(async config => {
  const token = await getUserToken();
  if (token) {
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` }
    };
  }
  return config;
});

export default api;
