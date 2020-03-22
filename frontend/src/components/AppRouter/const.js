import About from "../About";

export const ROUTES = {
  home: {
    path: "/",
    extraProps: { exact: true },
    component: () => "Placeholder home"
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
