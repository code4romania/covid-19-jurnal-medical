import React from "react";
import CazuriRedFlagTable from "../CazuriRedFlag/CazuriRedFlagTable";
import "./Dashboard.scss";
import AllUsersTable from "../AllUsers/AllUsersTable";
import DashboardWidgets from "../../components/DashboardWidgets";

const Dashboard = () => (
  <>
    <DashboardWidgets />
    <div className="columns">
      <div className="column">
        <CazuriRedFlagTable />
      </div>
    </div>
    <div className="columns">
      <div className="column">
        <AllUsersTable />
      </div>
    </div>
  </>
);

export default Dashboard;
