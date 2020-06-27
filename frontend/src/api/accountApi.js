import api from "./api";

const AccountApi = {
  deleteAccount: (user, password) =>
    api.post("/DeleteAccount", { Username: user, Password: password })
};

export default AccountApi;
