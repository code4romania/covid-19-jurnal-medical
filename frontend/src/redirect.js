import { signin, signinCallback } from "./api/auth";

export const redirectSigninCallback = changeLocation => {
  signinCallback().then(res => {
    if (res.state && res.state.uri && changeLocation) {
      changeLocation(`/${res.state.uri}`);
    } else {
      changeLocation("/account");
    }
  });
};

export const redirectPromise = (promise, location = "/account") => {
  return changeLocation => {
    promise().then(() => {
      if (changeLocation) {
        changeLocation(location);
      }
    });
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
