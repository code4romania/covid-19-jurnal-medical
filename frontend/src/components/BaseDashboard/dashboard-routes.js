import Dashboard from "./pages/Dashboard";
import CazuriRedFlag from "./pages/CazuriRedFlag";

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
    icon: "user-icon.svg"
  },
  {
    name: "Rapoarte transmise",
    path: "/dashboard/reports",
    className: "reports-menu-item",
    icon: "reports-icon.svg"
  }
];
export default dashboard_routes;
