import axios from "axios";
import { Constants } from "../config/constants";

const api = axios.create({
  baseURL: `${Constants.idpUrl}/account/`
});

const AccountApi = {
  deleteAccount: (email, password) => api.post("delete", { email, password })
};

export default AccountApi;
