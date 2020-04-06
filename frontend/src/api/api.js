import axios from "axios";
import { getUserToken } from "./auth";
import { Constants } from "../config/constants";

const api = axios.create({
  baseURL: `${Constants.api}/api`
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
