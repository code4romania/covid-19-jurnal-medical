import React from "react";
import { Route } from "react-router-dom";
import "./BaseDashboard.scss";
import DashboardSidebar from "./components/DashboardSidebar";
import dashboard_routes from "./dashboard-routes";
import DashboardHeader from "./components/DashboardHeader";

const BaseDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className={"header-wrapper"}>
        <DashboardHeader />
      </div>
      <div className="container-fluid">
        <div className="columns main-section">
          <div className="column is-one-quarter is-paddingless">
            <DashboardSidebar />
          </div>
          <div className="column is-paddingless">
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
    </div>
  );
};

export default BaseDashboard;
