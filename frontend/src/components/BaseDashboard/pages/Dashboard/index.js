import React from "react";
import DashboardWidget from "../../components/DashboardWidget";
import CazuriRedFlagTable from "../CazuriRedFlag/CazuriRedFlagTable";
import "./Dashboard.scss";
import AllUsersTable from "../AllUsers/AllUsersTable";

const Dashboard = () => (
  <>
    <strong>Date colectate</strong>
    <br />
    <br />
    <div className="columns is-desktop">
      <div className="column is-one-third-desktop">
        <div className="dashboard-box" style={{ padding: 0 }}>
          <DashboardWidget
            title={"Utilizatori red flag in ultimile 24 de ore"}
            data={[100, 200, 300, 200]}
          />
        </div>
      </div>
      <div className="column is-one-third-desktop">
        <div className="dashboard-box" style={{ padding: 0 }}>
          <DashboardWidget
            title={"Utilizatori logati in aplicatie"}
            data={[100, 200, 300, 200, 145, 510]}
          />
        </div>
      </div>
      <div className="column is-one-third-desktop">
        <div className="dashboard-box" style={{ padding: 0 }}>
          <DashboardWidget
            title={"Formulare completate"}
            data={[100, 200, 300, 200, 145, 160]}
          />
        </div>
      </div>
    </div>
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
