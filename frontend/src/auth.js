import {
  UserManager,
  // UserManagerSettings,
  WebStorageStateStore
} from "oidc-client";

const userManagerSettings = {
  authority: "https://localhost:5000",
  client_id: "js",
  redirect_uri: "http://localhost:3000/signin-oidc",
  // popup_redirect_uri: "http://localhost:3000/signin-oidc",
  // post_logout_redirect_uri: "http://localhost:3000/post-logout",
  // silent_redirect_uri: "http://localhost:5000/assets/silent-refresh.html",
  respone_type: "id_token token",
  scope: "openid email",
  // automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: sessionStorage }),
  checkSessionInterval: 10000
};

const userManager = new UserManager(userManagerSettings);

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
      console.log("ERROR");
      console.log(e);
    }
  }
};

export { AuthService };
