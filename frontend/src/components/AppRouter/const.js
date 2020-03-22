import Home from "../Home";
import About from "../About";
import SigninRoute from "../OIDC/SigninRoute";
import PostLogoutRoute from "../OIDC/PostLogoutRoute";
import SilentRefreshRoute from "../OIDC/SilentRefreshRoute";

export const ROUTES = {
  home: {
    path: "/",
    extraProps: { exact: true },
    component: Home
  },
  despre: {
    path: "/despre",
    component: About
  },
  account: {
    path: "/account",
    component: () => "Placeholder account"
  },
  selfevaluation: {
    path: "/self-evaluation",
    component: () => "Placeholder selfevaluation"
  },
  addmember: {
    path: "/add-member",
    component: () => "Placeholder addmember"
  },
  oidcSignin: {
    path: "/signin-oidc",
    component: SigninRoute
  },
  oidcPosLogout: {
    path: "/post-logout",
    component: PostLogoutRoute
  },
  oidcSilentRefresh: {
    path: "/silent-refresh",
    component: SilentRefreshRoute
  }
};
