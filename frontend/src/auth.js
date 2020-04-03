import { UserManager, WebStorageStateStore } from "oidc-client";

const userManagerSettings = {
  authority: "http://localhost:5001",
  client_id: "js",
  redirect_uri: "http://localhost:3000/signin-oidc",
  post_logout_redirect_uri: "http://localhost:3000/post-logout",
  automaticSilentRenew: true,
  silent_redirect_uri: "http://localhost:3000/silent-refresh",
  response_type: "id_token token",
  scope: "openid email answersApi",
  revokeAccessTokenOnSignout: true,

  userStore: new WebStorageStateStore({ store: sessionStorage }),
  checkSessionInterval: 10 * 1000
};

const userManager = new UserManager(userManagerSettings);
userManager.clearStaleState();

const AuthService = {
  user: null,
  isAuthenticated: () => {
    return AuthService.user !== null;
  },
  signin: async () => {
    await userManager.signinRedirect();
  },
  signinCallback: async () => {
    try {
      let user = await userManager.signinRedirectCallback();
      AuthService.user = user;
      return user;
    } catch (e) {
      console.log(e);
    }
  },
  signout: async () => {
    window.sessionStorage.removeItem("user");

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
