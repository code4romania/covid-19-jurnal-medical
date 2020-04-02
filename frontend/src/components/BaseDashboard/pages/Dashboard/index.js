import React from "react";
import DashboardWidget from "../../components/DashboardWidget";

const Dashboard = () => (
  <>
    <strong>Date colectate</strong>
    <br />
    <br />
    <div className="columns">
      <div className="column is-4">
        <DashboardWidget
          title={"Utilizatori red flag in ultimile 24 de ore"}
          data={[100, 200, 300, 200]}
        />
      </div>
      <div className="column is-4">
        <DashboardWidget
          title={"Utilizatori logati in aplicatie"}
          data={[100, 200, 300, 200, 145, 510]}
        />
      </div>
      <div className="column is-4">
        <DashboardWidget
          title={"Formulare completate"}
          data={[100, 200, 300, 200, 145, 510]}
        />
      </div>
    </div>
  </>
);

export default Dashboard;
