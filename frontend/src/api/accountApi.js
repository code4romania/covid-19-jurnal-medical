import axios from "axios";
import { Constants } from "../config/constants";

const api = axios.create({
    baseURL: `${Constants.idpUrl}/api/`
});

const AccountApi = {
    deleteAccount: (password) =>api.post("delete", { password })
    
};

export default AccountApi;
