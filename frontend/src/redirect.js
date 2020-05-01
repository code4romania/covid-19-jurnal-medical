import { signinSilent, signin, signinCallback } from "./api/auth";

export const redirectSigninCallback = async changeLocation => {
  const res = await signinCallback();
  if (res.state && res.state.uri && changeLocation) {
    changeLocation(`/${res.state.uri}`);
  } else {
    changeLocation("/account");
  }
};

export const redirectPromise = (promise, location = "/account") => {
  return async changeLocation => {
    await promise();
    if (changeLocation) {
      changeLocation(location);
    }
  };
};

export const redirect = (location = "/account") => {
  return changeLocation => {
    if (changeLocation) {
      changeLocation(location);
    }
  };
};

/** Add a redirect parameter to be accessed after signin (e.g. ~/redirect?uri=evaluation)*/
export const redirectSignin = () => {
  let data = null;
  let urlSearchParams = new URLSearchParams(document.location.search);
  if (urlSearchParams.has("uri")) {
    data = {
      state: { uri: urlSearchParams.get("uri") }
    };
  }

  signin(data);
};

export const redirectSilentSignin = async changeLocation => {
  changeLocation("/");
  await signinSilent();
  changeLocation("/account");
};
