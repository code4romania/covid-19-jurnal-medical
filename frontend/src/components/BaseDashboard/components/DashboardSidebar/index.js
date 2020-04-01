import React from "react";
import "./DashboardSidebar.scss";
import dashboard_routes from "../../dashboard-routes";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const DashboardSidebar = () => {
  const instrumentsItems = dashboard_routes.map((item, index) => (
    <NavLink
      exact={true}
      key={index}
      to={item.path}
      activeClassName="dashboardActiveLink"
      className={classNames(item.className, "dashboardLink")}
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
