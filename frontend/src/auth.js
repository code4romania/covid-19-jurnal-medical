import { UserManager, WebStorageStateStore } from "oidc-client";

const userManagerSettings = {
  authority: process.env.REACT_APP_IDP_URL,
  client_id: process.env.CLIENT_ID || "js",
  redirect_uri: `${process.env.REACT_APP_URL}/signin-oidc`,
  post_logout_redirect_uri: `${process.env.REACT_APP_URL}/post-logout`,
  automaticSilentRenew: true,
  silent_redirect_uri: `${process.env.REACT_APP_URL}/silent-refresh`,
  response_type: "id_token token",
  scope: "openid email answersApi",
  revokeAccessTokenOnSignout: true,

  userStore: new WebStorageStateStore({ store: sessionStorage }),
  checkSessionInterval: 10 * 1000
};

const userManager = new UserManager(userManagerSettings);
userManager.clearStaleState();

const AuthService = {
  isAuthenticated: async () => {
    let user = await userManager.getUser();
    return user !== null;
  },
  signin: async () => {
    await userManager.signinRedirect();
  },
  signinCallback: async () => {
    try {
      let user = await userManager.signinRedirectCallback();
      return user;
    } catch (e) {
      console.log(e);
    }
  },
  signout: async () => {
    await userManager.removeUser();
    await userManager.signoutRedirect();
  },
  signoutCallback: async () => {
    await userManager.signoutRedirectCallback();
  },
  silentRefreshCallback: async () => {
    try {
      let user = await userManager.signinSilentCallback();
      AuthService.user = user;
      return user;
    } catch (e) {
      console.log(e);
    }
  },
  loadUser: async () => {
    try {
      let user = await userManager.getUser();
      return user;
    } catch (e) {
      return null;
    }
  }
};

export { AuthService };
