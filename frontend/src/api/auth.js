import { UserManager, WebStorageStateStore } from "oidc-client";
import { Constants } from "../config/constants";

const userManagerSettings = {
  authority: Constants.idpUrl,
  client_id: Constants.clientId || "js",
  redirect_uri: `${Constants.appUrl}/signin-oidc`,
  post_logout_redirect_uri: `${Constants.appUrl}/post-logout`,
  automaticSilentRenew: true,
  silent_redirect_uri: `${Constants.appUrl}/silent-refresh`,
  response_type: "id_token token",
  scope: "openid email answersApi usersApi",
  revokeAccessTokenOnSignout: true,

  userStore: new WebStorageStateStore({ store: sessionStorage }),
  checkSessionInterval: 10 * 1000
};

const userManager = new UserManager(userManagerSettings);

export const clearStale = () => {
  userManager.clearStaleState();
};

export const registerUserLoaded = callback => {
  userManager.events.addUserLoaded(callback);
};
export const unregisterUserLoaded = callback => {
  userManager.events.removeUserLoaded(callback);
};

export const registerUserUnloaded = callback => {
  userManager.events.addUserUnloaded(callback);
};
export const unregisterUserUnloaded = callback => {
  userManager.events.removeUserUnloaded(callback);
};

export const signin = (data = null) => userManager.signinRedirect(data);
export const signinCallback = () => userManager.signinRedirectCallback();
export const signout = () => userManager.signoutRedirect();
export const signoutCallback = () => userManager.signoutRedirectCallback();
export const silentRefreshCallback = () => userManager.signinSilentCallback();
export const getUser = () => userManager.getUser();
export const getUserToken = async () => {
  const user = await userManager.getUser();
  if (!user) {
    return null;
  }
  if (user.expired) {
    const renewedUser = await silentRefreshCallback();
    if (renewedUser) {
      return renewedUser.access_token;
    }
  }
  return user.access_token;
};
