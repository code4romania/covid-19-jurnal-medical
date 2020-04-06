import Dashboard from "./pages/Dashboard";
import CazuriRedFlag from "./pages/CazuriRedFlag";
import AllUsers from "./pages/AllUsers";

const dashboard_routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    className: "dashboard-menu-item",
    extraProps: { exact: true },
    component: Dashboard
  },
  {
    name: "Cazuri red flag",
    path: "/dashboard/cazuri-red-flag",
    className: "cazuri-red-flag-menu-item",
    component: CazuriRedFlag
  },
  {
    name: "Toti utilizatorii",
    path: "/dashboard/users",
    className: "users-menu-item",
    component: AllUsers
  },
  {
    name: "Rapoarte transmise",
    path: "/dashboard/reports",
    className: "reports-menu-item",
    icon: "reports-icon.svg"
  }
];
export default dashboard_routes;
