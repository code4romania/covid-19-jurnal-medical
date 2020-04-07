import DashboardWidget from "../DashboardWidget";
import React from "react";

const DashboardWidgets = () => (
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
  </>
);

export default DashboardWidgets;
