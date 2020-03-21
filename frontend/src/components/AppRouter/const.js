import Home from "../Home";
import About from "../About";

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
  }
};
