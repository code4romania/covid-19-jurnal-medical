import React from "react";
import { Header as TFHeader } from "@code4ro/taskforce-fe-components";
import { NavLink, Route } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import "./BaseDashboard.scss";
import DashboardSidebar from "./components/DashboardSidebar";
import dashboard_routes from "./dashboard-routes";

const BaseDashboard = () => {
  const Logo = () => (
    <NavLink to="/">
      <LogoSvg />
    </NavLink>
  );
  const MenuItems = () => (
    <div className={"headerItems"}>
      <input type={"text"} placeholder={"Cauta"} className={"searchInput"} />
      <span className="account-items">User</span>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className={"header-wrapper"}>
        <TFHeader Logo={<Logo />} MenuItems={<MenuItems />} />
      </div>
      <div className="container-fluid">
        <div className="columns main-section">
          <DashboardSidebar />
          <div className="main">
            {dashboard_routes.map(({ path, component, extraProps }) => (
              <Route
                path={path}
                component={component}
                key={path}
                {...extraProps}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseDashboard;
