import Home from "./components/Home";
import About from "./components/About";
import SigninRoute from "./components/OIDC/SigninRoute";
import PostLogoutRoute from "./components/OIDC/PostLogoutRoute";
import SilentRefreshRoute from "./components/OIDC/SilentRefreshRoute";
import Login from "./components/Login";
import AddMember from "./components/AddMember";
import CreateYourAccount from "./components/CreateYourAccount";

export const ROUTES = {
  home: {
    path: "/",
    extraProps: { exact: true },
    component: Home
  },
  login: {
    path: "/login",
    component: Login
  },
  createYourAccount: {
    path: "/creaza-ti-cont",
    component: CreateYourAccount
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
    component: AddMember
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
