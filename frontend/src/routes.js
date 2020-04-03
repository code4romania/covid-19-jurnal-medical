import Home from "./components/Home";
import About from "./components/About";
import SigninRoute from "./components/OIDC/SigninRoute";
import PostLogoutRoute from "./components/OIDC/PostLogoutRoute";
import SilentRefreshRoute from "./components/OIDC/SilentRefreshRoute";
import AddMember from "./components/AddMember";
import RegisterCompleteRoute from "./components/OIDC/RegisterCompleteRoute";
import SelfEvaluation from "./components/SelfEvaluation";

export const ROUTES = {
  base: {
    despre: {
      path: "/despre",
      component: About
    },
    home: {
      path: "/",
      component: Home
    }
  },
  oidc: {
    signin: {
      path: "/signin-oidc",
      component: SigninRoute
    },
    postlogout: {
      path: "/post-logout",
      component: PostLogoutRoute
    },
    silentrefresh: {
      path: "/silent-refresh",
      component: SilentRefreshRoute
    },
    registercomplete: {
      path: "/register-complete",
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
