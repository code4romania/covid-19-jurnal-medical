import Home from "../Home";
import About from "../About";
import Login from "../Login";

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
  }
};
