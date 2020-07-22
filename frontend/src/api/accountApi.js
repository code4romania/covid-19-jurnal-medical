import axios from "axios";
import { Constants } from "../config/constants";

const api = axios.create({
  baseURL: `${Constants.idpUrl}/api`
});

const AccountApi = {
  deleteAccount: (user, password) =>
    api.post("/DeleteAccount", { Username: user, Password: password })
};

export default AccountApi;
