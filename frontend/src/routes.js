import Home from "./components/Home";
import About from "./components/About";
import AddMember from "./components/AddMember";
import UpdateProfile from "./components/UpdateProfile";
import Evaluation from "./components/Evaluation";
import Account from "./components/Account";

import {
  signinCallback,
  signoutCallback,
  silentRefreshCallback
} from "./api/auth";

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
      method: signinCallback
    },
    postlogout: {
      path: "/post-logout",
      redirect: "/",
      method: signoutCallback
    },
    silentrefresh: {
      path: "/silent-refresh",
      method: silentRefreshCallback
    },
    registercomplete: {
      path: "/register-complete",
      redirect: "/"
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
