import Home from "./components/Home";
import About from "./components/About";
import AddMember from "./components/AddMember";
import UpdateProfile from "./components/UpdateProfile";
import Evaluation from "./components/Evaluation";
import Account from "./components/Account";
import {
  redirect,
  redirectPromise,
  redirectSignin,
  redirectSigninCallback
} from "./redirect";

import { signoutCallback, silentRefreshCallback } from "./api/auth";

import BaseDashboard from "./components/BaseDashboard";

export const ROUTES = {
  base: {
    despre: {
      path: "/despre",
      component: About
    },
    dashboard: {
      path: "/dashboard",
      component: BaseDashboard
    },
    home: {
      path: "/",
      component: Home
    }
  },
  oidc: {
    signin: {
      path: "/signin-oidc",
      method: redirectSigninCallback
    },
    redirect: {
      path: "/redirect",
      method: redirectSignin
    },
    postlogout: {
      path: "/post-logout",
      method: redirectPromise(signoutCallback, "/")
    },
    silentrefresh: {
      path: "/silent-refresh",
      method: redirectPromise(silentRefreshCallback)
    },
    registercomplete: {
      path: "/register-complete",
      method: redirect("/")
    }
  },
  home: {
    account: {
      path: "/account",
      component: Account
    },
    selfevaluation: {
      path: "/evaluation",
      component: Evaluation
    },
    addmember: {
      path: "/add-member",
      component: AddMember
    },
    updateprofile: {
      path: "/update-profile",
      component: UpdateProfile
    }
  }
};
