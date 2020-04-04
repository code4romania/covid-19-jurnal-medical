import axios from "axios";
import { AuthService } from "./auth";

const api = axios.create();
api.interceptors.request.use(async config => {
  const user = await AuthService.loadUser();
  const token = user ? user.access_token : null;
  if (token) {
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` }
    };
  }
  return config;
});

export default api;
