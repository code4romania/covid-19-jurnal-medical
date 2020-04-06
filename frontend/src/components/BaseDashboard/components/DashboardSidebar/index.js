import React from "react";
import "./DashboardSidebar.scss";
import dashboard_routes from "../../dashboard-routes";
import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  const instrumentsItems = dashboard_routes.map((item, index) => (
    <NavLink
      exact={true}
      key={index}
      to={item.path}
      activeClassName="dashboardActiveLink"
      className={[item.className, "dashboardLink"].join(" ")}
    >
      {item.name}
    </NavLink>
  ));

  return (
    <div className="dashboardSidebar">
      <ul className="sidebar-menu">{instrumentsItems}</ul>
    </div>
  );
};

export default DashboardSidebar;
