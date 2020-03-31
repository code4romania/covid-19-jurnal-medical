import Home from "./components/Home";
import About from "./components/About";
import SigninRoute from "./components/OIDC/SigninRoute";
import PostLogoutRoute from "./components/OIDC/PostLogoutRoute";
import SilentRefreshRoute from "./components/OIDC/SilentRefreshRoute";
import Login from "./components/Login";
import AddMember from "./components/AddMember";
import RegisterCompleteRoute from "./components/OIDC/RegisterCompleteRoute";
import SelfEvaluation from "./components/SelfEvaluation";

export const ROUTES = {
  base: {
    homea: {
      path: "/",
      component: Home
    },
    login: {
      path: "/login",
      component: Login
    },
    despre: {
      path: "/despre",
      component: About
    }
  },
  oidc: {
    signin: {
      path: "/signin-oidc",
      extraProps: { exact: true },
      component: SigninRoute
    },
    postlogout: {
      path: "/post-logout",
      extraProps: { exact: true },
      component: PostLogoutRoute
    },
    silentrefresh: {
      path: "/silent-refresh",
      extraProps: { exact: true },
      component: SilentRefreshRoute
    },
    registercomplete: {
      path: "/register-complete",
      extraProps: { exact: true },
      component: RegisterCompleteRoute
    }
  },
  home: {
    selfevaluation: {
      path: "/self-evaluation",
      component: SelfEvaluation
    },
    addmember: {
      path: "/add-member",
      component: AddMember
    },
    account: {
      path: "/account",
      component: () => "Placeholder account"
    }
  }
};
